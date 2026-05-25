import { Element } from './PeriodicTable';

interface FormulaDisplayProps {
  parts: (Element | number)[];
  status: 'playing' | 'correct' | 'incorrect';
}

export default function FormulaDisplay({ parts, status }: FormulaDisplayProps) {
  if (parts.length === 0) {
    return (
      <div className="flex-1 min-h-[5rem] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50">
        <span className="text-xl text-gray-400 font-medium">กดเลือกธาตุจากตารางด้านล่าง</span>
      </div>
    );
  }

  let statusColorClass = 'text-gray-800';
  if (status === 'correct') statusColorClass = 'text-green-600 animate-pulse';
  if (status === 'incorrect') statusColorClass = 'text-red-600 animate-shake';

  return (
    <div className={`flex-1 min-h-[5rem] flex items-center justify-center flex-wrap px-4 py-2 border-2 border-transparent rounded-xl bg-white shadow-inner ${statusColorClass} transition-colors duration-300`}>
      <div className="flex items-baseline space-x-[1px]">
        {parts.map((part, index) => {
          if (typeof part === 'number') {
            return (
              <sub key={index} className="text-3xl font-bold translate-y-2 opacity-0 animate-fade-in" style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}>
                {part}
              </sub>
            );
          } else {
            return (
              <span 
                key={index} 
                className="text-5xl font-extrabold opacity-0 animate-pop-in" 
                style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}
              >
                {part.symbol}
              </span>
            );
          }
        })}
      </div>
    </div>
  );
}
