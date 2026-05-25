'use client';

import { useEffect, useState } from 'react';
import PeriodicTable from './components/PeriodicTable';
import NumberSelector from './components/NumberSelector';
import FormulaDisplay from './components/FormulaDisplay';
import { useFormulaGame } from './hooks/useFormulaGame';

export default function Home() {
  const {
    formulaParts,
    targetCompound,
    gameStatus,
    score,
    handleElementSelect,
    handleNumberSelect,
    handleClear,
    handleBackspace,
    handleSkip,
    handleCheckFormula,
    getNewChallenge
  } = useFormulaGame();

  const [mounted, setMounted] = useState(false);

  // Start the first challenge on mount
  useEffect(() => {
    getNewChallenge();
    setMounted(true);
  }, [getNewChallenge]);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 font-sans text-slate-800 selection:bg-indigo-200">
      
      {/* Header & Score */}
      <header className="w-full p-4 md:px-8 flex justify-between items-center bg-white/70 backdrop-blur-md shadow-sm border-b border-indigo-100/50 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
            🧪
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
            Molecular Game
          </h1>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Score</span>
          <div className="text-2xl md:text-3xl font-black text-indigo-600 leading-none">
            {score}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 flex flex-col xl:flex-row gap-6 mt-4">
        
        {/* Left Column: Game Area */}
        <div className="flex-1 flex flex-col gap-4 max-w-3xl mx-auto w-full">
          
          {/* Challenge Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-indigo-100/50 border border-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                  Target Compound
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight">
                  {targetCompound.name}
                </h2>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-stretch mb-6">
                <FormulaDisplay parts={formulaParts} status={gameStatus} />
                
                <div className="flex md:flex-col gap-2 shrink-0">
                  <button 
                    onClick={handleBackspace} 
                    disabled={gameStatus === 'correct' || formulaParts.length === 0}
                    className="flex-1 px-4 py-2 bg-amber-100 text-amber-700 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold rounded-xl transition-colors flex items-center justify-center"
                    title="ลบตัวล่าสุด"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                    </svg>
                  </button>
                  <button 
                    onClick={handleClear} 
                    disabled={gameStatus === 'correct' || formulaParts.length === 0}
                    className="flex-1 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold rounded-xl transition-colors flex items-center justify-center"
                    title="ล้างทั้งหมด"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Action Area */}
              <div className="flex flex-col items-center min-h-[80px] justify-center">
                {gameStatus === 'playing' && (
                  <div className="flex gap-4 w-full">
                    <button 
                      onClick={handleSkip} 
                      className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold text-lg rounded-2xl hover:bg-gray-200 transition-colors"
                    >
                      ข้ามโจทย์
                    </button>
                    <button 
                      onClick={handleCheckFormula} 
                      disabled={formulaParts.length === 0}
                      className="flex-[2] py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-lg rounded-2xl hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all transform active:scale-[0.98]"
                    >
                      ตรวจคำตอบ
                    </button>
                  </div>
                )}
                
                {gameStatus === 'correct' && (
                  <div className="w-full flex flex-col items-center animate-fade-in-up">
                    <div className="flex items-center gap-2 text-green-600 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-2xl font-black">ถูกต้อง ยอดเยี่ยม!</p>
                    </div>
                    <button 
                      onClick={getNewChallenge} 
                      className="w-full py-4 bg-green-500 text-white font-bold text-xl rounded-2xl hover:bg-green-600 shadow-lg shadow-green-200 transition-all transform active:scale-95 animate-pulse"
                    >
                      ไปโจทย์ถัดไป ➔
                    </button>
                  </div>
                )}
                
                {gameStatus === 'incorrect' && (
                  <div className="w-full flex items-center justify-between bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 animate-shake">
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-lg font-bold">สูตรยังไม่ถูกต้อง</p>
                    </div>
                    <button 
                      onClick={() => handleBackspace()}
                      className="px-4 py-2 bg-white text-red-600 rounded-lg shadow-sm hover:bg-red-50 font-semibold text-sm transition-colors"
                    >
                      ลองแก้ใหม่
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Number Selector */}
        <div className="xl:w-80 shrink-0">
          <NumberSelector onNumberSelect={handleNumberSelect} disabled={gameStatus === 'correct'} />
        </div>
      </div>

      {/* Bottom Area: Periodic Table */}
      <div className="mt-8 pb-12 px-4">
        <PeriodicTable onElementSelect={handleElementSelect} />
      </div>

    </main>
  );
}