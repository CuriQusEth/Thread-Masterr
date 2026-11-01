import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { pollStatus, readScoreViaMcp } from '../lib/baseMcp';
import { useState } from 'react';

export function SaveScoreModal({ 
  onClose, 
  approvalUrl, 
  requestId,
  playerAddress,
  onSuccess
}: { 
  onClose: () => void;
  approvalUrl: string;
  requestId: string;
  playerAddress: string;
  onSuccess: (score: string) => void;
}) {
  const [status, setStatus] = useState<"pending" | "completed" | "failed">("pending");

  const handleConfirm = async () => {
    setStatus("pending");
    const result = await pollStatus(requestId);
    if (result === "completed") {
      const score = await readScoreViaMcp(playerAddress);
      onSuccess(score?.toString() || "");
      setStatus("completed");
    } else {
      setStatus("failed");
    }
  };

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-auto p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-sm w-full text-center"
      >
        <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-3 opacity-80" />
        <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] uppercase tracking-wider font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
          Base Account Tools • Base MCP
        </span>
        <h2 className="text-xl font-light mb-1">Confirm On-Chain Record</h2>
        <p className="text-xs text-white/60 mb-5">
          Record your score on Base Mainnet with ERC-8021 Builder Code attribution. Please review and confirm this write operation.
        </p>
        
        {status === "failed" && (
          <p className="text-sm text-red-400 mb-4">Transaction failed. Please try again.</p>
        )}

        {status === "completed" ? (
          <div className="flex flex-col gap-3">
            <p className="text-green-400 font-medium">Score saved onchain ✓</p>
            <button onClick={onClose} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm">Close</button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <a 
              href={approvalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-medium w-full block"
            >
              Approve Transaction →
            </a>
            <button 
              onClick={handleConfirm}
              className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/5 text-sm font-medium w-full"
            >
              I have approved it
            </button>
            <button 
              onClick={onClose} 
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm mt-2"
            >
              Cancel
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
