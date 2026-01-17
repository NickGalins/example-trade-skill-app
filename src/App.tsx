import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Loading } from './components/Loading';
import { HomeScreen } from './screens/HomeScreen';
import { MiningSelectionScreen } from './screens/MiningSelectionScreen';
import { EventPlayerInfoScreen } from './screens/EventPlayerInfoScreen';
import { MiningSkillModifiersScreen } from './screens/MiningSkillModifiersScreen';
import { MineCardResultScreen } from './screens/MineCardResultScreen';
import {
  ScreenType,
  EventPlayerInfo,
  MiningSkillInfo,
  MineCard,
  Modifiers,
} from './types';
import { calculateAllValues } from './utils/calculations';
import { rollMineType, rollUsesRemaining, generateRandomDigits } from './utils/probabilities';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [eventPlayerInfo, setEventPlayerInfo] = useState<EventPlayerInfo>({
    eventCode: '',
    playerNumber: '',
  });
  const [miningSkillInfo, setMiningSkillInfo] = useState<MiningSkillInfo>({
    miningSkill: null,
    modifiers: {
      noModifiers: true,
      fastWorker: false,
      slowWorker: false,
      efficientWorker: false,
      inefficientWorker: false,
      miscBonusPlus2: false,
      miscBonusPlus1: false,
      miscPenaltyMinus1: false,
      miscPenaltyMinus2: false,
      eventBonusPlus1: false,
      eventPenaltyMinus1: false,
    },
  });
  const [mineCard, setMineCard] = useState<MineCard | null>(null);

  // Navigation handlers
  const handleSelectMining = () => {
    setCurrentScreen('mining-selection');
  };

  const handleSelectOpenMine = () => {
    setCurrentScreen('event-player-info');
  };

  const handleEventPlayerInfoNext = () => {
    setCurrentScreen('mining-skill-modifiers');
  };

  const handleMiningSkillSubmit = () => {
    setCurrentScreen('loading');

    // Simulate loading delay
    setTimeout(() => {
      generateMineCard();
      setCurrentScreen('mine-card-result');
    }, 2000);
  };

  const generateMineCard = () => {
    if (miningSkillInfo.miningSkill === null) return;

    const calculatedValues = calculateAllValues(
      miningSkillInfo.miningSkill,
      miningSkillInfo.modifiers
    );

    const rolledMineType = rollMineType(calculatedValues.effectiveMineLevel);
    const usesRemaining = rollUsesRemaining();
    const randomDigits = generateRandomDigits();
    const mineNumber = `${eventPlayerInfo.eventCode}${randomDigits}`;

    const newMineCard: MineCard = {
      mineNumber,
      openedByPlayer: eventPlayerInfo.playerNumber,
      mineType: rolledMineType.type,
      skillRequired: rolledMineType.skillRequired,
      usesRemaining,
      shopkeeper: '003',
      timeToOpen: calculatedValues.timeToOpen,
    };

    setMineCard(newMineCard);
  };

  const handleDone = () => {
    // Reset state and return to home
    setCurrentScreen('home');
    setEventPlayerInfo({ eventCode: '', playerNumber: '' });
    setMiningSkillInfo({
      miningSkill: null,
      modifiers: {
        noModifiers: true,
        fastWorker: false,
        slowWorker: false,
        efficientWorker: false,
        inefficientWorker: false,
        miscBonusPlus2: false,
        miscBonusPlus1: false,
        miscPenaltyMinus1: false,
        miscPenaltyMinus2: false,
        eventBonusPlus1: false,
        eventPenaltyMinus1: false,
      },
    });
    setMineCard(null);
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleBackToMiningSelection = () => {
    setCurrentScreen('mining-selection');
  };

  const handleBackToEventPlayerInfo = () => {
    setCurrentScreen('event-player-info');
  };

  return (
    <>
      <Header />
      <main>
        {currentScreen === 'home' && (
          <HomeScreen onSelectMining={handleSelectMining} />
        )}

        {currentScreen === 'mining-selection' && (
          <MiningSelectionScreen
            onSelectOpenMine={handleSelectOpenMine}
            onBack={handleBackToHome}
          />
        )}

        {currentScreen === 'event-player-info' && (
          <EventPlayerInfoScreen
            data={eventPlayerInfo}
            onUpdate={setEventPlayerInfo}
            onNext={handleEventPlayerInfoNext}
            onBack={handleBackToMiningSelection}
          />
        )}

        {currentScreen === 'mining-skill-modifiers' && (
          <MiningSkillModifiersScreen
            data={miningSkillInfo}
            onUpdate={setMiningSkillInfo}
            onSubmit={handleMiningSkillSubmit}
            onBack={handleBackToEventPlayerInfo}
          />
        )}

        {currentScreen === 'loading' && <Loading />}

        {currentScreen === 'mine-card-result' && mineCard && (
          <MineCardResultScreen mineCard={mineCard} onDone={handleDone} />
        )}
      </main>
    </>
  );
}

export default App;
