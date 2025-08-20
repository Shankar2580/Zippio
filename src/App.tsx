import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector } from './hooks';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadPage from './pages/UploadPage';
import ProcessingStatusPage from './pages/ProcessingStatusPage';
import ResultsPage from './pages/ResultsPage';
import DashboardPage from './pages/DashboardPage';
import SocialMediaPage from './pages/SocialMediaPage';
import SettingsPage from './pages/SettingsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/upload" element={
                <ProtectedRoute>
                  <UploadPage />
                </ProtectedRoute>
              } />
              <Route path="/processing-status" element={
                <ProtectedRoute>
                  <ProcessingStatusPage />
                </ProtectedRoute>
              } />
              <Route path="/results" element={
                <ProtectedRoute>
                  <ResultsPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/social-media" element={
                <ProtectedRoute>
                  <SocialMediaPage />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;