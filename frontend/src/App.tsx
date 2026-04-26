import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminAuth from './pages/AdminAuth';
import AdminDashboard from './pages/AdminDashboard';
import Invitation from './pages/Invitation';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/auth" element={<AdminAuth />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/invite/:token" element={<Invitation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
