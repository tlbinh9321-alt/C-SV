import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { StarCursorTrail } from './components/StarCursorTrail';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroLanding } from './components/HeroLanding';
import { FaceScanExperience } from './components/FaceScanExperience';
import { CardDeckDraw } from './components/CardDeckDraw';
import { StarResultView } from './components/StarResultView';
import { ConstellationUniverse } from './components/ConstellationUniverse';
import { JourneyHistory } from './components/JourneyHistory';
import { AboutView } from './components/AboutView';
import { StoryGeneratorModal } from './components/StoryGeneratorModal';
import { StarCardData, DrawnHistoryItem, EnergyProfileInfo } from './types/card';
import { soundEngine } from './utils/audio';

type ActiveView = 'landing' | 'scan' | 'draw' | 'result' | 'universe' | 'history' | 'about';

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveView>('landing');
  const [currentCard, setCurrentCard] = useState<StarCardData | null>(null);
  const [detectedEnergy, setDetectedEnergy] = useState<EnergyProfileInfo | null>(null);
  const [history, setHistory] = useState<DrawnHistoryItem[]>([]);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('csv_star_finder_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      setIsSoundMuted(soundEngine.getIsMuted());
    } catch {
      // Ignore local storage parse error
    }
  }, []);

  // Save history to localStorage
  const saveCardToHistory = (card: StarCardData, energy?: EnergyProfileInfo) => {
    const newItem: DrawnHistoryItem = {
      id: `${Date.now()}-${card.id}`,
      cardId: card.id,
      drawnAt: new Date().toISOString(),
      energyDetected: energy?.type,
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem('csv_star_finder_history', JSON.stringify(updated));
      } catch {
        // Ignore quota error
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('csv_star_finder_history');
    } catch {
      // Ignore
    }
  };

  const handleToggleSound = () => {
    const newMuted = !soundEngine.toggleMute();
    setIsSoundMuted(newMuted);
  };

  // Flow handlers
  const handleScanComplete = (profile: EnergyProfileInfo) => {
    setDetectedEnergy(profile);
    setCurrentView('draw');
  };

  const handleCardDrawn = (card: StarCardData) => {
    setCurrentCard(card);
    saveCardToHistory(card, detectedEnergy || undefined);
    setCurrentView('result');
  };

  const handleRedraw = () => {
    setCurrentView('draw');
  };

  const drawnCardIds = history.map((item) => item.cardId);

  return (
    <div className="min-h-screen flex flex-col bg-[#070a1e] text-[#fffdf5] relative overflow-x-hidden selection:bg-cyan-500 selection:text-white">
      {/* 60fps Interactive Cosmic Background Canvas */}
      <CosmicBackground />

      {/* Lightweight Desktop Star Cursor Trail */}
      <StarCursorTrail />

      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1 relative z-10 flex flex-col justify-center">
        {currentView === 'landing' && (
          <HeroLanding
            onStartScan={() => setCurrentView('scan')}
            onExploreUniverse={() => setCurrentView('universe')}
          />
        )}

        {currentView === 'scan' && (
          <FaceScanExperience
            onScanComplete={handleScanComplete}
            onSkip={() => setCurrentView('draw')}
          />
        )}

        {currentView === 'draw' && (
          <CardDeckDraw
            onCardDrawn={handleCardDrawn}
            previouslyDrawnIds={drawnCardIds}
          />
        )}

        {currentView === 'result' && currentCard && (
          <StarResultView
            card={currentCard}
            onRedraw={handleRedraw}
            onOpenStoryModal={() => setIsStoryModalOpen(true)}
            onOpenUniverse={() => setCurrentView('universe')}
          />
        )}

        {currentView === 'universe' && (
          <ConstellationUniverse
            drawnCardIds={drawnCardIds}
            onSelectCardToDraw={() => setCurrentView('scan')}
          />
        )}

        {currentView === 'history' && (
          <JourneyHistory
            history={history}
            onClearHistory={handleClearHistory}
            onDrawNewCard={() => setCurrentView('scan')}
          />
        )}

        {currentView === 'about' && (
          <AboutView onStartExperience={() => setCurrentView('scan')} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(view) => setCurrentView(view)} />

      {/* 1080x1920 Story Export Modal */}
      {currentCard && (
        <StoryGeneratorModal
          isOpen={isStoryModalOpen}
          onClose={() => setIsStoryModalOpen(false)}
          card={currentCard}
        />
      )}
    </div>
  );
}
