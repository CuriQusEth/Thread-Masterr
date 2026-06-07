import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Providers } from './components/Providers';
import TitleScreen from './screens/TitleScreen';
import LoomScreen from './screens/LoomScreen';
import { useAccount, useSendTransaction } from 'wagmi';
import { Sun } from 'lucide-react';
import { encodeFunctionData, parseAbi } from 'viem';

function GMButton() {
  const { isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction();

  const sendGMTransaction = () => {
    try {
      const data = encodeFunctionData({
        abi: parseAbi(['function gm()']),
        functionName: 'gm',
      });
      
      sendTransaction({
        to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
        data,
      });
    } catch (e) {
      // Fallback
      sendTransaction({
        to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3'
      });
    }
  };

  if (!isConnected) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-auto">
      <button
        onClick={sendGMTransaction}
        className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
      >
        <Sun size={14} />
        Say GM
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <GMButton />
        <Routes>
          <Route path="/" element={<TitleScreen />} />
          <Route path="/loom" element={<LoomScreen />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

