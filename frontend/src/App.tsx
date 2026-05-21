import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import Home from './pages/Home';
import AdminAuth from './pages/AdminAuth';
import AdminDashboard from './pages/AdminDashboard';
import Invitation from './pages/Invitation';
import NotFound from './pages/NotFound';
import GuestForm from './pages/GuestForm';
import { FullScreenLoader } from './shared/ui/Spinner';
import { ProtectedRoute } from './shared/ui/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <FullScreenLoader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/auth" element={<AdminAuth />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <MantineProvider defaultColorScheme="light">
                                <ModalsProvider>
                                    <AdminDashboard />
                                </ModalsProvider>
                            </MantineProvider>
                        </ProtectedRoute>
                    }
                />
                <Route path="/invite/:token" element={<Invitation />} />
                <Route
                    path="/guest-form/:id"
                    element={
                        <MantineProvider defaultColorScheme="light">
                            <GuestForm />
                        </MantineProvider>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
