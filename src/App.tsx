
import { Router } from '@reach/router';
import React from 'react';

import { AuthManager, NotificationManager, AppHeader } from './components';
import DashboardPage from './pages/dashboard';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <NotificationManager />
      <AppHeader />
      <div className="spacer-60"></div>
      <Router className="app__content container-fluid py-3">
        <AuthManager check={user => !user || !user.accessToken} success={<SignUpPage />} path="/" />
        <AuthManager check={user => !user || !user.accessToken} success={<LoginPage />} path="/authorization" />
        <DashboardPage path="/dashboard" />
      </Router>
    </div>
  );
};

export default App;
