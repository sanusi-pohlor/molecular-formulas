'use client';

import { useState, useEffect } from 'react';
import PeriodicTable, { Element } from './elements';
import compounds from './molecular_formulas_named_1000.json';
import data from './periodic-table.json';
// --- Data ---
// const compounds = [
//   { name: 'Water', formula: ['H', 2, 'O'] },
//   { name: 'Carbon Dioxide', formula: ['C', 'O', 2] },
//   { name: 'Methane', formula: ['C', 'H', 4] },
//   { name: 'Ammonia', formula: ['N', 'H', 3] },
//   { name: 'Sulfuric Acid', formula: ['H', 2, 'S', 'O', 4] },
//   { name: 'Sodium Chloride', formula: ['Na', 'Cl'] },
//   { name: 'Glucose', formula: ['C', 6, 'H', 12, 'O', 6] },
// ];

// --- Components ---
function NumberSelector({ onNumberSelect }: { onNumberSelect: (num: number) => void }) {
  const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
  return (
    <div>
      <h2 className="text-xl font-bold text-center">ตัวเลขสำหรับสูตร</h2>
      <div className="grid grid-cols-3 gap-2">
        {numbers.map(num => (
          <div
            key={num}
            className="p-4 w-17 h-17 flex items-center justify-center text-2xl font-bold border rounded cursor-pointer hover:bg-gray-200 transition-all"
            onClick={() => onNumberSelect(num)}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}

function FormulaDisplay({ parts }: { parts: (Element | number)[] }) {
  if (parts.length === 0) {
    return <div className="text-2xl text-gray-400 h-16 flex items-center">สร้างสูตร</div>;
  }
  return (
    <div className="text-5xl font-bold h-16 flex items-center flex-wrap">
      {parts.map((part, index) => {
        if (typeof part === 'number') {
          return <sub key={index} className="text-4xl ml-[-2px]">{part}</sub>;
        } else {
          return <span key={index}>{part.symbol}</span>;
        }
      })}
    </div>
  );
}

// --- Main Page ---
export default function Home() {
  const [formulaParts, setFormulaParts] = useState<(Element | number)[]>([]);
  const [targetCompound, setTargetCompound] = useState(compounds[0]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'correct' | 'incorrect'>('playing');
  const [score, setScore] = useState(0);

  const getNewChallenge = () => {
    const randomIndex = Math.floor(Math.random() * compounds.length);
    setTargetCompound(compounds[randomIndex]);
    setFormulaParts([]);
    setGameStatus('playing');
  };

  // Start the first challenge on mount
  useEffect(() => {
    getNewChallenge();
  }, []);

  const handleElementSelect = (element: Element) => {
    if (gameStatus === 'correct') return; // Don't modify after correct answer
    setFormulaParts([...formulaParts, element]);
    setGameStatus('playing');
  };

  const handleNumberSelect = (num: number) => {
    if (gameStatus === 'correct') return;
    if (formulaParts.length > 0 && typeof formulaParts[formulaParts.length - 1] !== 'number') {
      setFormulaParts([...formulaParts, num]);
      setGameStatus('playing');
    }
  };

  const handleClear = () => {
    setFormulaParts([]);
    setGameStatus('playing');
  };

  const handleBackspace = () => {
    setFormulaParts(formulaParts.slice(0, -1));
    setGameStatus('playing');
  };

  const handleCheckFormula = () => {
    const userFormula = formulaParts.map(p => typeof p === 'number' ? p : p.symbol);
    if (JSON.stringify(userFormula) === JSON.stringify(targetCompound.formula)) {
      setGameStatus('correct');
      setScore(score + 1);
    } else {
      setGameStatus('incorrect');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-10xl p-1 flex justify-center items-center gap-4">
          <h1 className="text-4xl font-bold my-2 text-blue-600">คะแนน: {score}</h1>
        {/* Formula Builder Area */}
        <div className="w-full max-w-2xl p-4 border-2 rounded-lg shadow-lg bg-white">
          {/* Challenge Area */}
          <div className="w-full max-w-2xl text-center">
            <h1 className="text-2xl font-bold my-2">เกมทายสูตรโมเลกุล</h1>

            <p className="text-4xl font-extrabold text-indigo-600">{targetCompound.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <FormulaDisplay parts={formulaParts} />
            <div className="flex gap-2">
              <button onClick={handleBackspace} className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">ลบ</button>
              <button onClick={handleClear} className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600">ล้าง</button>
            </div>
          </div>
          <div className="w-full max-w-2xl p-4 text-center">

            {/* Action & Feedback Area */}
            {gameStatus !== 'correct' ? (
              <button onClick={handleCheckFormula} className="px-8 py-3 bg-blue-600 text-white font-bold text-xl rounded-lg hover:bg-blue-700 transition-transform hover:scale-105">
                ตรวจคำตอบ
              </button>
            ) : (
              <button onClick={getNewChallenge} className="px-8 py-3 bg-green-600 text-white font-bold text-xl rounded-lg hover:bg-green-700 transition-transform hover:scale-105">
                โจทย์ถัดไป!
              </button>
            )}
            {gameStatus === 'correct' && <p className="text-2xl font-bold text-green-600">ถูกต้อง!</p>}
            {gameStatus === 'incorrect' && <p className="text-2xl font-bold text-red-600">ลองอีกครั้ง</p>}
          </div>
        </div>
        <div>
          <NumberSelector onNumberSelect={handleNumberSelect} />
        </div>
      </div>

      <PeriodicTable onElementSelect={handleElementSelect} />

    </main>
  );
}