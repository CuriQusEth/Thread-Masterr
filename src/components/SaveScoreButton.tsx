import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useSaveScore } from '../hooks/useSaveScore';
import { saveScoreViaMcp } from '../lib/baseMcp';
import { SaveScoreModal } from './SaveScoreModal';

export function SaveScoreButton({ score, className }: { score: number; className?: string }) {
  const { address, isConnected } = useAccount();
  const { saveScore, isPending, isSuccess } = useSaveScore(address || "0x5352cfCAbA75F2A9fA85bDe5cE6B81ea1ebc0000"); // placeholder address when offline

  const [modalData, setModalData] = useState<{ approvalUrl: string; requestId: string } | null>(null);
  const [mcpSuccess, setMcpSuccess] = useState(false);
  const [isMcpPending, setIsMcpPending] = useState(false);

  const handleClick = async () => {
    if (isConnected) {
      saveScore(score);
    } else {
      try {
        setIsMcpPending(true);
        const { approvalUrl, requestId } = await saveScoreViaMcp(score);
        setModalData({ approvalUrl, requestId });
      } catch (err) {
        console.error("MCP Save Error:", err);
      } finally {
        setIsMcpPending(false);
      }
    }
  };

  const pending = isPending || isMcpPending;
  const success = isSuccess || mcpSuccess;

  return (
    <>
      <button
        onClick={handleClick}
        disabled={pending || success}
        className={className || "px-4 md:px-6 py-2 border border-white/20 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white/5 transition-all disabled:opacity-50"}
      >
        {pending ? 'Saving...' : success ? 'Score saved onchain ✓' : 'Save Score'}
      </button>
      
      {modalData && (
        <SaveScoreModal 
          approvalUrl={modalData.approvalUrl}
          requestId={modalData.requestId}
          playerAddress={address || "0x0000000000000000000000000000000000000000"} 
          onClose={() => setModalData(null)}
          onSuccess={() => {
            setMcpSuccess(true);
            setModalData(null);
          }}
        />
      )}
    </>
  );
}
