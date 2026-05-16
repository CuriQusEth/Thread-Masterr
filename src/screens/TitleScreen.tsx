import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Hexagon, Play, Sparkles } from 'lucide-react';

export default function TitleScreen() {
  const navigate = useNavigate();
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="relative w-full h-[100dvh] bg-[#03010a] text-white flex flex-col justify-center items-center overflow-hidden font-sans select-none">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/20 blur-[140px] rounded-full"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-amber-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')]"></div>
      </div>

      <div className="z-10 flex flex-col items-center text-center p-6 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-6">
            <Hexagon className="w-20 h-20 text-white/10 absolute -top-2 -left-2" />
            <Hexagon className="w-20 h-20 text-white/5 absolute -bottom-2 -right-2" />
            <Hexagon className="w-20 h-20 text-amber-300 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)] relative z-10" />
            <Sparkles className="w-6 h-6 text-amber-200 absolute -top-4 -right-4 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-indigo-300">
            Thread Master
          </h1>
          <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase max-w-sm mb-12">
            Tapestry of the Stars
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col w-full gap-4"
        >
          <button
            onClick={() => navigate('/loom')}
            className="group relative flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white text-black font-semibold uppercase tracking-widest overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <Play className="w-5 h-5 relative z-10 fill-current" />
            <span className="relative z-10">Enter The Loom</span>
          </button>

          {!isConnected ? (
            <button
              onClick={() => connect({ connector: injected() })}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-medium uppercase tracking-widest border border-white/10 transition-colors"
            >
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              Connect Base Wallet
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-mono text-center">
                Connected: {address?.slice(0,6)}...{address?.slice(-4)}
              </div>
              <button
                onClick={() => disconnect()}
                className="text-white/30 text-xs uppercase hover:text-white/60 tracking-wider transition-colors py-2"
              >
                Disconnect
              </button>
            </div>
          )}
        </motion.div>

      </div>

      <div className="absolute bottom-6 flex items-center gap-2 text-white/20 text-[10px] uppercase tracking-widest font-mono">
        <span>Base Mainnet</span>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span>ERC-8021</span>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span>ERC-8004</span>
      </div>

    </div>
  );
}
