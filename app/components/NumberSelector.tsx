interface NumberSelectorProps {
  onNumberSelect: (num: number) => void;
  disabled?: boolean;
}

export default function NumberSelector({ onNumberSelect, disabled = false }: NumberSelectorProps) {
  const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
  return (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
      <h2 className="text-lg font-bold text-center text-gray-700 mb-4">ตัวเลขห้อย</h2>
      <div className="grid grid-cols-3 gap-2 flex-grow">
        {numbers.map(num => (
          <button
            key={num}
            disabled={disabled}
            className={`flex items-center justify-center text-2xl font-bold border-2 rounded-lg transition-all
              ${disabled 
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 active:scale-95 shadow-sm hover:shadow-md'
              }`}
            onClick={() => onNumberSelect(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
