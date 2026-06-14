import { GrandLoom } from '../components/canvas/GrandLoom';
import { ThreadSelector } from '../components/ui/ThreadSelector';
import { useGameStore } from '../store/gameStore';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Hexagon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useSendTransaction } from 'wagmi';
import { buildAttributionPayload } from '../lib/erc8021';
import { useState } from 'react';
import { SaveScoreButton } from '../components/SaveScoreButton';

export default function LoomScreen() {
  const { harmonyScore } = useGameStore();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { sendTransaction, isPending } = useSendTransaction();
  const [showRecordModal, setShowRecordModal] = useState(false);

  const handleSayGM = () => {
    if (!isConnected) return alert('Please connect wallet first!');
    // Real transaction simulation with ERC-8021 attribution data
    const calldata = buildAttributionPayload('SAY_GM');
    sendTransaction({
      to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3', // GM contract address
      value: 0n,
      data: calldata
    });
  };

  const handleRecordTapestry = () => {
    if (!isConnected) return setShowRecordModal(true);
    const calldata = buildAttributionPayload('RECORD_TAPESTRY');
    sendTransaction({
      to: address, 
      value: 0n,
      data: calldata
    }, {
      onSuccess: () => setShowRecordModal(false)
    });
  };

  return (
    <div className="relative w-full h-[100dvh] bg-[#03010a] text-white overflow-hidden font-sans select-none z-0">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/20 blur-[140px] rounded-full"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-amber-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')]"></div>
      </div>

      <GrandLoom />

      {/* HUD Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-20 flex justify-between items-center px-4 md:px-8 border-b border-white/10 backdrop-blur-md bg-black/20 pointer-events-none z-10 w-full">
        
        <div className="flex flex-col gap-2 pointer-events-auto">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm uppercase tracking-widest font-medium">Return</span>
          </motion.button>

          <div className="flex flex-col ml-4">
            <span className="text-[10px] text-white/40 uppercase tracking-widest leading-tight">Harmony Resonance</span>
            <span className="text-xl font-mono text-amber-300">
              {harmonyScore.toLocaleString()} <span className="text-xs text-white/60">HR</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 pointer-events-auto">
          {isConnected ? (
            <div className="hidden md:flex px-4 py-2 bg-white/5 rounded-full border border-white/10 items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
              <span className="text-xs font-mono text-white/70">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </div>
          ) : (
            <div className="hidden md:block text-xs text-white/40 uppercase tracking-widest font-mono">
              Offline
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleSayGM}
              disabled={isPending || !isConnected}
              className="px-4 md:px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-widest hover:brightness-125 transition-all disabled:opacity-50"
            >
              {isPending ? '...' : 'GM'}
            </button>

            <SaveScoreButton score={harmonyScore} />
          </div>
        </div>

      </div>

      <ThreadSelector />

      {/* Basic Connection Modal for Demo */}
      {showRecordModal && !isConnected && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-auto p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-sm w-full text-center"
          >
            <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-4 opacity-80" />
            <h2 className="text-xl font-light mb-2">Connect to Record</h2>
            <p className="text-sm text-white/50 mb-6">You must connect your Base wallet to memorialize this tapestry on-chain.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowRecordModal(false)} className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm">Cancel</button>
              {/* In a real app with standard rainbowkit/web3modal we'd trigger it here. We will tell them to return to title for now */}
              <button onClick={() => { setShowRecordModal(false); navigate('/'); }} className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-medium">Go to Wallet Connect</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
