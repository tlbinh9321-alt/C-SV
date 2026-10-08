import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, CameraOff, Sparkles, ArrowRight, UserCheck, Scan } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { ENERGY_PROFILES } from '../data/cards';
import { EnergyProfileInfo } from '../types/card';
import { Mascot } from './Mascot';

interface FaceScanExperienceProps {
  onScanComplete: (profile: EnergyProfileInfo) => void;
  onSkip?: () => void;
}

export const FaceScanExperience: React.FC<FaceScanExperienceProps> = ({
  onScanComplete,
  onSkip,
}) => {
  const [cameraState, setCameraState] = useState<'idle' | 'requesting' | 'active' | 'denied'>('idle');
  const [scanStep, setScanStep] = useState<'intro' | 'scanning' | 'result'>('intro');
  const [countdown, setCountdown] = useState(5);
  const [detectedProfile, setDetectedProfile] = useState<EnergyProfileInfo | null>(null);

  // Real face detection status
  const [hasRealFace, setHasRealFace] = useState(false);
  const [faceConfidence, setFaceConfidence] = useState<number>(0);
  const [scanMetrics, setScanMetrics] = useState({
    luminance: 0,
    warmth: 0,
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const detectorRef = useRef<any>(null);

  // Stop camera helper
  const stopCameraStream = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Check if Browser native FaceDetector API is available (Chromium/Android)
    if (typeof window !== 'undefined' && 'FaceDetector' in window) {
      try {
        const FaceDetectorClass = (window as any).FaceDetector;
        detectorRef.current = new FaceDetectorClass({ fastMode: true, maxDetectedFaces: 2 });
      } catch {
        detectorRef.current = null;
      }
    }

    return () => {
      stopCameraStream();
    };
  }, [stopCameraStream]);

  // Real-time video frame analyzer
  const analyzeVideoFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) {
      animFrameRef.current = requestAnimationFrame(analyzeVideoFrame);
      return;
    }

    const width = 160;
    const height = 160;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      animFrameRef.current = requestAnimationFrame(analyzeVideoFrame);
      return;
    }

    ctx.drawImage(video, 0, 0, width, height);

    // If native FaceDetector is supported in browser
    if (detectorRef.current) {
      detectorRef.current
        .detect(video)
        .then((faces: any[]) => {
          if (faces && faces.length > 0) {
            setHasRealFace(true);
            setFaceConfidence(Math.min(99, 86 + Math.floor(faces.length * 5)));
          } else {
            fallbackPixelAnalysis(ctx, width, height);
          }
        })
        .catch(() => {
          fallbackPixelAnalysis(ctx, width, height);
        });
    } else {
      fallbackPixelAnalysis(ctx, width, height);
    }

    animFrameRef.current = requestAnimationFrame(analyzeVideoFrame);
  }, []);

  const fallbackPixelAnalysis = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    try {
      const startX = Math.floor(width * 0.2);
      const startY = Math.floor(height * 0.2);
      const sampleW = Math.floor(width * 0.6);
      const sampleH = Math.floor(height * 0.6);

      const frameData = ctx.getImageData(startX, startY, sampleW, sampleH).data;
      let skinPixels = 0;
      let totalLuminance = 0;
      let totalWarmth = 0;
      const totalPixels = frameData.length / 4;

      for (let i = 0; i < frameData.length; i += 4) {
        const r = frameData[i];
        const g = frameData[i + 1];
        const b = frameData[i + 2];

        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        totalLuminance += lum;
        totalWarmth += (r - b);

        if (
          r > 60 &&
          g > 40 &&
          b > 20 &&
          r > g &&
          r > b &&
          r - g >= 10 &&
          Math.abs(r - g) > 15 &&
          lum > 40 &&
          lum < 240
        ) {
          skinPixels++;
        }
      }

      const skinRatio = skinPixels / totalPixels;
      const avgLum = Math.round(totalLuminance / totalPixels);
      const avgWarmth = Math.round(totalWarmth / totalPixels);

      if (skinRatio > 0.12) {
        setHasRealFace(true);
        const confidence = Math.min(99, Math.round(65 + skinRatio * 50));
        setFaceConfidence(confidence);
      } else {
        setHasRealFace(false);
        setFaceConfidence(Math.round(skinRatio * 80));
      }

      setScanMetrics({
        luminance: avgLum,
        warmth: avgWarmth,
      });
    } catch {
      // Ignore
    }
  };

  // Attach stream to persistent video element
  const attachStreamToVideo = useCallback((stream: MediaStream) => {
    const video = videoRef.current;
    if (video) {
      if (video.srcObject !== stream) {
        video.srcObject = stream;
      }
      video
        .play()
        .then(() => {
          if (!animFrameRef.current) {
            animFrameRef.current = requestAnimationFrame(analyzeVideoFrame);
          }
        })
        .catch(() => {});
    }
  }, [analyzeVideoFrame]);

  // Request camera and start
  const handleStartCamera = async () => {
    setCameraState('requesting');
    soundEngine.playSparkle();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraState('denied');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 1280 },
        },
        audio: false,
      });

      streamRef.current = stream;
      setCameraState('active');
      attachStreamToVideo(stream);

      // Start 5s countdown
      startScanningProcess();
    } catch {
      setCameraState('denied');
    }
  };

  // Start the 5s scanning process
  const startScanningProcess = () => {
    setScanStep('scanning');
    setCountdown(5);
    soundEngine.playBeep(5);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishScan();
          return 0;
        }
        soundEngine.playBeep(prev - 1);
        return prev - 1;
      });
    }, 1000);
  };

  // Conclude scan
  const finishScan = () => {
    stopCameraStream();

    const profiles = Object.values(ENERGY_PROFILES);
    let chosen = profiles[0];
    if (scanMetrics.warmth > 40) {
      chosen = ENERGY_PROFILES.CREATOR || profiles[2];
    } else if (scanMetrics.luminance > 140) {
      chosen = ENERGY_PROFILES.LEADER || profiles[4];
    } else if (hasRealFace) {
      chosen = ENERGY_PROFILES.EXPLORER || profiles[1];
    } else {
      chosen = profiles[Math.floor(Math.random() * profiles.length)];
    }

    setDetectedProfile(chosen);
    setScanStep('result');
    soundEngine.playCardReveal();
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center text-center">
      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Persistent Single Video Element Mounted Unconditionally (Never unmounts or gets covered!) */}
      <div
        className={`relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-full p-2.5 sm:p-3 mb-6 bg-gradient-to-tr from-cyan-400 via-pink-400 to-amber-300 shadow-[0_0_60px_rgba(0,240,255,0.55)] flex items-center justify-center transition-all ${
          scanStep === 'result' ? 'hidden' : 'block'
        }`}
      >
        {/* Pulsing Outer Astral Ring */}
        <div
          className="absolute -inset-3 rounded-full border-2 border-dashed border-cyan-400/50 animate-spin pointer-events-none"
          style={{ animationDuration: scanStep === 'scanning' ? '12s' : '30s' }}
        />

        {/* Circular Viewport Holding the Camera Video */}
        <div className="w-full h-full rounded-full bg-[#070a1e] overflow-hidden relative flex items-center justify-center border-4 border-cyan-300 shadow-inner">
          {/* Real Camera Video (Completely unobstructed, 100% full view) */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover scale-x-[-1] absolute inset-0 z-0 ${
              cameraState === 'active' ? 'block' : 'hidden'
            }`}
          />

          {/* Idle Placeholder when camera not active yet */}
          {cameraState === 'idle' && (
            <div className="relative z-10 flex flex-col items-center justify-center p-6 text-slate-300">
              <div className="w-20 h-20 rounded-full bg-cyan-500/10 border-2 border-cyan-400/40 flex items-center justify-center mb-3">
                <Camera className="w-10 h-10 text-cyan-300 animate-pulse" />
              </div>
              <span className="text-sm font-bold text-white">Khung Tròn Quét Mặt Thật</span>
              <span className="text-xs text-cyan-300/80 mt-1">Bấm nút bên dưới để mở camera</span>
            </div>
          )}

          {/* Camera Requesting */}
          {cameraState === 'requesting' && (
            <div className="relative z-10 flex flex-col items-center justify-center p-6 text-cyan-300">
              <Sparkles className="w-12 h-12 text-cyan-300 animate-spin mb-3" />
              <span className="text-sm font-bold">Đang kết nối camera...</span>
            </div>
          )}

          {/* Camera Denied */}
          {cameraState === 'denied' && (
            <div className="relative z-10 p-6 flex flex-col items-center text-center max-w-xs text-pink-200">
              <CameraOff className="w-12 h-12 text-pink-400 mb-3 animate-bounce" />
              <p className="text-sm font-bold mb-1">Chưa bật quyền Camera</p>
              <span className="text-xs text-slate-300">
                Hãy cho phép camera để thấy mặt thật, hoặc bấm tiếp tục ngay bên dưới!
              </span>
            </div>
          )}

          {/* Laser Scanner Line (Thin non-blocking sweep line only in scanning step) */}
          {scanStep === 'scanning' && cameraState === 'active' && (
            <motion.div
              animate={{ y: [-150, 150, -150] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_#00f0ff] pointer-events-none z-10"
            />
          )}

          {/* Clean Thin Corner Target Marks (Zero view blockage) */}
          <div className="absolute inset-4 rounded-full border border-cyan-400/25 pointer-events-none z-10" />

          {/* Countdown Pill at Bottom of Circle during scanning */}
          {scanStep === 'scanning' && (
            <div className="absolute bottom-4 flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-4 py-1 rounded-full border border-cyan-400/40 z-20 shadow-lg">
              <span className="text-[10px] font-mono font-bold text-slate-300">QUÉT:</span>
              <motion.span
                key={countdown}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-display font-black text-lg text-yellow-300"
              >
                {countdown}S
              </motion.span>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: INTRO / CAMERA REQUEST */}
        {scanStep === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col items-center w-full"
          >
            {/* Mascot welcoming */}
            <div className="mb-3">
              <Mascot state="idle" size="md" withSpeechBubble="Tớ sẽ giúp vũ trụ cảm nhận bạn!" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bước 01: Nhận Diện Khuôn Mặt Thật & Năng Lượng</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-wide mb-2">
              TRƯỚC KHI GẶP NGÔI SAO...
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto mb-6 leading-relaxed">
              Nhìn thẳng vào khung tròn để camera hiển thị khuôn mặt thật và đồng bộ năng lượng trong chương trình Chào! Sinh Viên 2026.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {cameraState !== 'denied' ? (
                <button
                  onClick={handleStartCamera}
                  disabled={cameraState === 'requesting'}
                  className="px-9 py-4 rounded-full font-black text-sm tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 text-slate-950 shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>{cameraState === 'requesting' ? 'ĐANG MỞ CAMERA...' : 'MỞ CAMERA QUÉT MẶT THẬT (5S)'}</span>
                </button>
              ) : (
                <button
                  onClick={startScanningProcess}
                  className="px-9 py-4 rounded-full font-black text-sm tracking-wider uppercase bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-slate-950 shadow-[0_0_25px_rgba(255,133,179,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>TIẾP TỤC QUÉT VŨ TRỤ</span>
                </button>
              )}

              {/* Skip or fallback button */}
              <button
                onClick={() => {
                  soundEngine.playSparkle();
                  if (onSkip) {
                    onSkip();
                  } else {
                    startScanningProcess();
                  }
                }}
                className="text-xs text-slate-400 hover:text-cyan-300 py-2.5 px-4 transition-colors underline underline-offset-4 cursor-pointer"
              >
                Bỏ qua, kết nối năng lượng ngay →
              </button>
            </div>

            <p className="text-[11px] text-slate-400 mt-5 max-w-md">
              ✦ Khuôn mặt hiển thị trực tiếp ngay trên màn hình thiết bị bạn, bảo mật 100% không lưu trữ hình ảnh.
            </p>
          </motion.div>
        )}

        {/* STEP 2: ACTIVE SCANNING (5 SECONDS COUNTDOWN WITH REAL FACE FULLY VISIBLE) */}
        {scanStep === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col items-center w-full"
          >
            {/* Mascot scanning */}
            <div className="mb-2">
              <Mascot state="scanning" size="sm" withSpeechBubble={hasRealFace ? "Đã nhìn thấy khuôn mặt thật của bạn!" : "Đang căn chỉnh diện mạo..."} />
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-cyan-300 mb-1">
              ĐANG QUÉT DIỆN MẠO THẬT
            </h3>

            {/* Real Face Status Indicator Tag */}
            <div className="mb-4">
              {hasRealFace ? (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/50 text-emerald-300 text-xs font-bold shadow-[0_0_15px_rgba(52,211,153,0.4)]">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ĐÃ BẮT TRỌN KHUÔN MẶT ({faceConfidence}%)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 text-xs font-bold animate-pulse">
                  <Scan className="w-3.5 h-3.5 text-cyan-400" />
                  <span>HÃY NHÌN VÀO TRUNG TÂM KHUNG TRÒN...</span>
                </span>
              )}
            </div>

            {/* Constellation Nodes Progress Bar */}
            <div className="flex items-center gap-3 mt-2">
              {[5, 4, 3, 2, 1].map((step) => (
                <div
                  key={step}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                    countdown <= step
                      ? 'bg-cyan-400 shadow-[0_0_12px_#00f0ff] scale-125'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 3: RESULT ENERGY PROFILE IDENTIFIED */}
        {scanStep === 'result' && detectedProfile && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center w-full"
          >
            {/* Mascot Celebrating */}
            <div className="mb-3">
              <Mascot state="celebrating" size="md" withSpeechBubble="Tuyệt vời! Vũ trụ đã sẵn sàng!" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <UserCheck className="w-3.5 h-3.5" />
              <span>DIỆN MẠO ĐÃ ĐỒNG BỘ THÀNH CÔNG VỚI TẦN SỐ VŨ TRỤ</span>
            </div>

            <h3
              className="font-display font-black text-3xl sm:text-4xl tracking-wide mb-1"
              style={{
                color: detectedProfile.color,
                textShadow: `0 0 25px ${detectedProfile.glowColor}`,
              }}
            >
              {detectedProfile.title}
            </h3>

            <div className="text-sm font-semibold text-amber-200 mb-3">
              {detectedProfile.subtitle}
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md text-sm text-slate-300 mb-6 leading-relaxed">
              "{detectedProfile.description}"
            </div>

            {/* Mystery Hook */}
            <div className="space-y-1 mb-8">
              <p className="text-xs text-slate-400 font-medium">
                NHƯNG NGÔI SAO THẬT SỰ CỦA BẠN...
              </p>
              <p className="font-display font-bold text-xl text-white">
                ĐANG CHỜ BẠN RÚT RA TỪ BỘ BÀI VŨ TRỤ.
              </p>
            </div>

            {/* CTA to Draw Card */}
            <button
              onClick={() => {
                soundEngine.playSparkle();
                onScanComplete(detectedProfile);
              }}
              className="px-10 py-4 rounded-full font-black text-base tracking-wider uppercase bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-slate-950 shadow-[0_0_30px_rgba(255,133,179,0.6)] hover:shadow-[0_0_45px_rgba(255,216,77,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
            >
              <span>RÚT LÁ BÀI CỦA BẠN</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
