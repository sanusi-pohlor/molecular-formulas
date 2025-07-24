
import data from './periodic-table.json';

export type Element = typeof data.elements[0];

interface PeriodicTableProps {
  onElementSelect: (element: Element) => void;
}

export default function PeriodicTable({ onElementSelect }: PeriodicTableProps) {
  const mainElements = data.elements.filter(el => el.category !== 'lanthanide' && el.category !== 'actinide');
  const lanthanides = data.elements.filter(el => el.category === 'lanthanide');
  const actinides = data.elements.filter(el => el.category === 'actinide');

  const ElementCell = ({ element }: { element: Element }) => (
    <div 
      key={element.name} 
      className={`p-1 text-center border rounded cursor-pointer hover:scale-110 hover:shadow-lg transition-all ${getCategoryColor(element.category)}`} 
      style={{ gridColumn: element.xpos, gridRow: element.ypos }}
      onClick={() => onElementSelect(element)}
    >
      <div className="text-xs font-light">{element.number}</div>
      <div className="text-sm font-bold">{element.symbol}</div>
      <div className="text-[8px] leading-tight">{element.name}</div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-18 gap-1">
        {mainElements.map(element => <ElementCell key={element.name} element={element} />)}
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-15 gap-1">
            {lanthanides.map((element, index) => (
                 <div 
                    key={element.name} 
                    className={`p-1 text-center border rounded cursor-pointer hover:scale-110 hover:shadow-lg transition-all ${getCategoryColor(element.category)}`} 
                    style={{ gridColumn: index + 1, gridRow: 1 }}
                    onClick={() => onElementSelect(element)}
                >
                    <div className="text-xs font-light">{element.number}</div>
                    <div className="text-sm font-bold">{element.symbol}</div>
                    <div className="text-[8px] leading-tight">{element.name}</div>
                </div>
            ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-15 gap-1">
            {actinides.map((element, index) => (
                 <div 
                    key={element.name} 
                    className={`p-1 text-center border rounded cursor-pointer hover:scale-110 hover:shadow-lg transition-all ${getCategoryColor(element.category)}`} 
                    style={{ gridColumn: index + 1, gridRow: 1 }}
                    onClick={() => onElementSelect(element)}
                >
                    <div className="text-xs font-light">{element.number}</div>
                    <div className="text-sm font-bold">{element.symbol}</div>
                    <div className="text-[8px] leading-tight">{element.name}</div>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
}

export function getCategoryColor(category: string) {
  if (category.includes('nonmetal')) return 'bg-green-200 border-green-400';
  if (category.includes('noble gas')) return 'bg-purple-200 border-purple-400';
  if (category.includes('alkali metal')) return 'bg-red-200 border-red-400';
  if (category.includes('alkaline earth metal')) return 'bg-orange-200 border-orange-400';
  if (category.includes('metalloid')) return 'bg-yellow-200 border-yellow-400';
  if (category.includes('transition metal')) return 'bg-blue-200 border-blue-400';
  if (category.includes('post-transition metal')) return 'bg-cyan-200 border-cyan-400';
  if (category.includes('lanthanide')) return 'bg-indigo-200 border-indigo-400';
  if (category.includes('actinide')) return 'bg-pink-200 border-pink-400';
  return 'bg-gray-200 border-gray-400';
}
