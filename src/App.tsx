import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Providers } from './components/Providers';
import TitleScreen from './screens/TitleScreen';
import LoomScreen from './screens/LoomScreen';

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TitleScreen />} />
          <Route path="/loom" element={<LoomScreen />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}
