import { useState, useCallback } from 'react';
import { Element } from '../components/PeriodicTable';
import compounds from '../molecular_formulas_named_1000.json';

export type GameStatus = 'playing' | 'correct' | 'incorrect';

export function useFormulaGame() {
  const [formulaParts, setFormulaParts] = useState<(Element | number)[]>([]);
  const [targetCompound, setTargetCompound] = useState(compounds[0]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [score, setScore] = useState(0);

  const getNewChallenge = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * compounds.length);
    setTargetCompound(compounds[randomIndex]);
    setFormulaParts([]);
    setGameStatus('playing');
  }, []);

  const handleElementSelect = useCallback((element: Element) => {
    if (gameStatus === 'correct') return;
    setFormulaParts(prev => [...prev, element]);
    setGameStatus('playing');
  }, [gameStatus]);

  const handleNumberSelect = useCallback((num: number) => {
    if (gameStatus === 'correct') return;
    setFormulaParts(prev => {
      if (prev.length > 0 && typeof prev[prev.length - 1] !== 'number') {
        return [...prev, num];
      }
      return prev;
    });
    setGameStatus('playing');
  }, [gameStatus]);

  const handleClear = useCallback(() => {
    setFormulaParts([]);
    setGameStatus('playing');
  }, []);

  const handleBackspace = useCallback(() => {
    setFormulaParts(prev => prev.slice(0, -1));
    setGameStatus('playing');
  }, []);

  const handleSkip = useCallback(() => {
    getNewChallenge();
  }, [getNewChallenge]);

  const handleCheckFormula = useCallback(() => {
    const userFormula = formulaParts.map(p => typeof p === 'number' ? p : p.symbol);
    if (JSON.stringify(userFormula) === JSON.stringify(targetCompound.formula)) {
      setGameStatus('correct');
      setScore(s => s + 1);
    } else {
      setGameStatus('incorrect');
    }
  }, [formulaParts, targetCompound]);

  return {
    formulaParts,
    targetCompound,
    gameStatus,
    score,
    getNewChallenge,
    handleElementSelect,
    handleNumberSelect,
    handleClear,
    handleBackspace,
    handleSkip,
    handleCheckFormula,
  };
}
