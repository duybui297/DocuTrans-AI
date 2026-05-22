import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Translate from './pages/Translate';
import History from './pages/History';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';

export default function App() {
  return (
    <Router>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/translate" element={<Translate />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Sidebar>
    </Router>
  );
}

