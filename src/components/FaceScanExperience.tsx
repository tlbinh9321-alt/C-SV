import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, CameraOff, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { ENERGY_PROFILES } from '../data/cards';
import { EnergyProfileType, EnergyProfileInfo } from '../types/card';
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

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera helper
  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

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
          width: { ideal: 640 },
          height: { ideal: 640 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraState('active');
      startScanningProcess();
    } catch {
      setCameraState('denied');
    }
  };

  // Start the 5s scanning process (or fallback scan without camera)
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

  // Conclude scan: pick a random symbolic energy profile
  const finishScan = () => {
    stopCameraStream();

    const profiles = Object.values(ENERGY_PROFILES);
    const chosen = profiles[Math.floor(Math.random() * profiles.length)];
    setDetectedProfile(chosen);
    setScanStep('result');
    soundEngine.playCardReveal();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center text-center">
      <AnimatePresence mode="wait">
        {/* STEP 1: INTRO / CAMERA REQUEST */}
        {scanStep === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center w-full"
          >
            {/* Mascot welcoming */}
            <div className="mb-4">
              <Mascot state="idle" size="md" withSpeechBubble="Tớ sẽ giúp vũ trụ cảm nhận bạn!" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bước 01: Nhận Diện Năng Lượng</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-wide mb-3">
              TRƯỚC KHI GẶP NGÔI SAO...
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
              Hãy để vũ trụ nhận diện nguồn năng lượng độc bản của bạn trong chương trình Chào! Sinh Viên 2026.
            </p>

            {/* Circular Camera Preview Frame */}
            <div className="relative w-64 h-64 rounded-full p-2 mb-8 bg-gradient-to-tr from-cyan-500 via-pink-400 to-amber-300 shadow-[0_0_35px_rgba(0,240,255,0.35)] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#070a1e] overflow-hidden relative flex flex-col items-center justify-center border-2 border-white/20">
                {cameraState === 'active' ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                ) : cameraState === 'denied' ? (
                  <div className="p-4 flex flex-col items-center text-center">
                    <CameraOff className="w-10 h-10 text-pink-400 mb-2 animate-bounce" />
                    <p className="text-xs text-pink-200">
                      Camera chưa được bật
                    </p>
                    <span className="text-[11px] text-slate-400 mt-1">
                      Chúng ta vẫn có thể kết nối với các vì sao!
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <Camera className="w-12 h-12 text-cyan-300 mb-2 animate-pulse" />
                    <span className="text-xs font-medium text-slate-300">Khung quét năng lượng</span>
                  </div>
                )}

                {/* Rotating scanner rings */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/40 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-4 rounded-full border border-pink-400/30" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {cameraState !== 'denied' ? (
                <button
                  onClick={handleStartCamera}
                  disabled={cameraState === 'requesting'}
                  className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 text-slate-950 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>{cameraState === 'requesting' ? 'ĐANG KẾT NỐI...' : 'BẮT ĐẦU QUÉT (5 GIÂY)'}</span>
                </button>
              ) : (
                <button
                  onClick={startScanningProcess}
                  className="px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-slate-950 shadow-[0_0_25px_rgba(255,133,179,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>TIẾP TỤC QUÉT VŨ TRỤ</span>
                </button>
              )}

              {/* Skip or fallback button */}
              <button
                onClick={() => {
                  startScanningProcess();
                }}
                className="text-xs text-slate-400 hover:text-cyan-300 py-2 px-4 transition-colors underline underline-offset-4 cursor-pointer"
              >
                Quét không dùng camera
              </button>
            </div>

            <p className="text-[11px] text-slate-400 mt-6 max-w-sm">
              ✦ Trải nghiệm mang tính biểu trưng nghệ thuật. Không lưu trữ, nhận diện khuôn mặt hay gửi hình ảnh lên máy chủ.
            </p>
          </motion.div>
        )}

        {/* STEP 2: ACTIVE SCANNING (5 SECONDS COUNTDOWN) */}
        {scanStep === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col items-center w-full"
          >
            {/* Mascot scanning */}
            <div className="mb-4">
              <Mascot state="scanning" size="sm" withSpeechBubble="Đang hội tụ năng lượng sao..." />
            </div>

            <h3 className="font-display font-extrabold text-2xl text-cyan-300 mb-1">
              ĐANG QUÉT NĂNG LƯỢNG
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Vũ trụ đang đồng điệu tần số cùng bạn...
            </p>

            {/* Scanning Ring with Countdown */}
            <div className="relative w-64 h-64 rounded-full p-2 mb-6 flex items-center justify-center">
              {/* Outer pulsing laser rings */}
              <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-ping opacity-30" />
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-pink-400/50 animate-spin" style={{ animationDuration: '6s' }} />

              {/* Inner Video or Fallback Cosmic Orb */}
              <div className="w-full h-full rounded-full bg-[#090d29] overflow-hidden relative flex items-center justify-center border-4 border-cyan-300 shadow-[0_0_40px_rgba(0,240,255,0.7)]">
                {streamRef.current ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1] opacity-75"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950">
                    <Sparkles className="w-16 h-16 text-cyan-300 animate-spin" style={{ animationDuration: '4s' }} />
                  </div>
                )}

                {/* Laser Sweep line moving up and down */}
                <motion.div
                  animate={{ y: [-110, 110, -110] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_#00f0ff]"
                />

                {/* Big Countdown Number */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[1px]">
                  <motion.span
                    key={countdown}
                    initial={{ scale: 1.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="font-display font-black text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-cyan-300 drop-shadow-[0_0_20px_rgba(255,216,77,0.9)]"
                  >
                    {countdown}
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Constellation Nodes Progress Bar */}
            <div className="flex items-center gap-3">
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

            <div className="text-xs font-bold uppercase tracking-widest text-cyan-300 mb-1">
              NGUỒN NĂNG LƯỢNG CỦA BẠN ĐÃ ĐƯỢC XÁC ĐỊNH
            </div>

            <h3
              className="font-display font-black text-3xl sm:text-4xl tracking-wide mb-2"
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
                ĐANG CHỜ BẠN RÚT RA TỪ CUỐN SỔ KỲ DIỆU.
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
