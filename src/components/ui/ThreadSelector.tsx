import { useGameStore, ThreadType, THREAD_COLORS } from '../../store/gameStore';
import { motion } from 'motion/react';

export function ThreadSelector() {
  const { inventory, activeType, setActiveType } = useGameStore();

  const types = Object.keys(inventory) as ThreadType[];

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col gap-4 pointer-events-none w-full max-w-3xl px-4 z-10">
      <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 text-center">The Thread Vault</h3>
      <div className="flex gap-4 justify-center overflow-x-auto pointer-events-auto">
        {types.map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveType(type)}
            className={`flex-shrink-0 aspect-square w-20 rounded-xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
              activeType === type 
                ? 'bg-white/5 border-2 border-white/20 shadow-[inset_0_0_15px_rgba(255,255,255,0.1)] opacity-100' 
                : 'bg-white/5 border border-white/10 opacity-60 hover:opacity-100'
            }`}
          >
            <div 
              className="w-8 h-[2px]" 
              style={{ 
                backgroundColor: THREAD_COLORS[type],
                boxShadow: activeType === type ? `0 0 10px ${THREAD_COLORS[type]}` : 'none'
              }} 
            />
            <span 
              className="text-[10px] uppercase font-bold" 
              style={{ color: THREAD_COLORS[type] }}
            >
              {type}
            </span>
            <span className="text-[10px] text-white/50">{inventory[type]}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
