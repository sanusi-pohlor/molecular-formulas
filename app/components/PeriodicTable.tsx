import data from '../periodic-table.json';

export type Element = typeof data.elements[0];

interface PeriodicTableProps {
  onElementSelect: (element: Element) => void;
}

export default function PeriodicTable({ onElementSelect }: PeriodicTableProps) {
  const mainElements = data.elements.filter(el => el.category !== 'lanthanide' && el.category !== 'actinide');
  const lanthanides = data.elements.filter(el => el.category === 'lanthanide');
  const actinides = data.elements.filter(el => el.category === 'actinide');

  const ElementCell = ({ element, style }: { element: Element, style?: React.CSSProperties }) => (
    <div 
      className={`relative group p-1 text-center border-2 rounded-md cursor-pointer 
        hover:scale-110 hover:z-10 hover:shadow-xl transition-all duration-200 
        ${getCategoryColor(element.category)} backdrop-blur-sm bg-opacity-70`} 
      style={style || { gridColumn: element.xpos, gridRow: element.ypos }}
      onClick={() => onElementSelect(element)}
    >
      <div className="absolute top-0.5 left-1 text-[10px] font-medium opacity-70">{element.number}</div>
      <div className="mt-2 text-sm md:text-base font-bold">{element.symbol}</div>
      <div className="text-[8px] md:text-[9px] leading-tight truncate px-0.5">{element.name}</div>
      
      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 shadow-lg">
        {element.name} ({element.symbol}) - {element.category}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50">
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-18 gap-1 md:gap-1.5">
            {mainElements.map(element => <ElementCell key={element.name} element={element} />)}
          </div>

          <div className="mt-6 flex justify-end">
            <div className="grid grid-cols-15 gap-1 md:gap-1.5 w-[83.33%]">
                {lanthanides.map((element, index) => (
                    <ElementCell 
                      key={element.name} 
                      element={element} 
                      style={{ gridColumn: index + 1, gridRow: 1 }} 
                    />
                ))}
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <div className="grid grid-cols-15 gap-1 md:gap-1.5 w-[83.33%]">
                {actinides.map((element, index) => (
                    <ElementCell 
                      key={element.name} 
                      element={element} 
                      style={{ gridColumn: index + 1, gridRow: 1 }} 
                    />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function getCategoryColor(category: string) {
  if (category.includes('nonmetal')) return 'bg-green-100 border-green-300 hover:bg-green-200 text-green-900';
  if (category.includes('noble gas')) return 'bg-purple-100 border-purple-300 hover:bg-purple-200 text-purple-900';
  if (category.includes('alkali metal')) return 'bg-red-100 border-red-300 hover:bg-red-200 text-red-900';
  if (category.includes('alkaline earth metal')) return 'bg-orange-100 border-orange-300 hover:bg-orange-200 text-orange-900';
  if (category.includes('metalloid')) return 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200 text-yellow-900';
  if (category.includes('transition metal')) return 'bg-blue-100 border-blue-300 hover:bg-blue-200 text-blue-900';
  if (category.includes('post-transition metal')) return 'bg-cyan-100 border-cyan-300 hover:bg-cyan-200 text-cyan-900';
  if (category.includes('lanthanide')) return 'bg-indigo-100 border-indigo-300 hover:bg-indigo-200 text-indigo-900';
  if (category.includes('actinide')) return 'bg-pink-100 border-pink-300 hover:bg-pink-200 text-pink-900';
  return 'bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-900';
}
