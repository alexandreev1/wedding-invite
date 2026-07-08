import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import Home from './pages/Home';
import AdminAuth from './pages/AdminAuth';
import AdminDashboard from './pages/AdminDashboard';
import Invitation from './pages/Invitation';
import NotFound from './pages/NotFound';
import GuestForm from './pages/GuestForm';
import { FullScreenLoader } from './shared/ui/Spinner';
import { ProtectedRoute } from './shared/ui/ProtectedRoute';
import PlanForGuests from './pages/PlanForGuests';

function App() {
    return (
        <BrowserRouter>
            <FullScreenLoader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/admin/auth"
                    element={
                        <MantineProvider defaultColorScheme="dark">
                            <AdminAuth />
                        </MantineProvider>
                    }
                />
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
                <Route
                    path="/invite/:token"
                    element={
                        <MantineProvider defaultColorScheme="light">
                            <ModalsProvider>
                                <Invitation />
                            </ModalsProvider>
                        </MantineProvider>
                    }
                />
                <Route
                    path="/guest-form/:id"
                    element={
                        <MantineProvider>
                            <Notifications />
                            <GuestForm />
                        </MantineProvider>
                    }
                />
                <Route
                    path="/plan/:id"
                    element={
                        <MantineProvider defaultColorScheme="light">
                            <PlanForGuests />
                        </MantineProvider>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
