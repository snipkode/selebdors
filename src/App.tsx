import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useAuthStore } from './stores/authStore';
import './lib/i18n';

// function PrivateRoute({ children }: { children: React.ReactNode }) {
//   const user = useAuthStore((state) => state.user);
//   return !user ? <>{children}</> : <Navigate to="/login" />;
// }

function App() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'id' : 'en');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <button
          onClick={toggleLanguage}
          className="fixed top-4 right-4 bg-white px-4 py-2 rounded-md shadow-sm"
        >
          {i18n.language === 'en' ? 'ID' : 'EN'}
        </button>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard/*"
            element={
              <>
                <Dashboard />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;