'use client';

import { useState, useEffect } from 'react';
import MainContent from './pages/MainContent';
import HistoryPanel from './pages/HistoryPanel';
import { Character } from './types/character';

interface HomeProps {
  initialCharacters: Character[];
}

export default function Home({ initialCharacters }: HomeProps) {
  const HISTORY_STORAGE_KEY = process.env.NEXT_PUBLIC_HISTORY_STORAGE_KEY || 'rickmorty_history';
  const [history, setHistory] = useState<Character[]>([]);
  const [, setSelectedFromHistory] = useState<Character | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const loadHistory = () => {
      try {
        const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error('Error loading history from localStorage:', error);
      } finally {
        setIsHydrated(true);
      }
    };
    
    loadHistory();
  }, []);

  const handleAddToHistory = (character: Character) => {
    setHistory((prev) => {
      const filtered = prev.filter((c) => c.id !== character.id);
      const newHistory = [character, ...filtered].slice(0, 10);
    
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
      
      return newHistory;
    });
  };

  const handleSelectFromHistory = (character: Character) => {
    setSelectedFromHistory(character);
  };

  return (
    <div className="main-container">
      <div className="history-sidebar">
        <HistoryPanel history={isHydrated ? history : []} onSelectCharacter={handleSelectFromHistory} />
      </div>
      <div className="main-content-wrapper">
        <MainContent
          initialCharacters={initialCharacters}
          onAddToHistory={handleAddToHistory}
          showError={showError}
          onShowError={setShowError}
        />
      </div>
    </div>
  );
}
