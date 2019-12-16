import { Router } from "@reach/router";
import React from "react";

import { AuthManager, NotificationManager, AppHeader } from "./components";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import "./App.css";
import AdDetailsPage from "./pages/ad-details";

const App: React.FC = () => {
  return (
    <div className="app">
      <NotificationManager />
      <AppHeader />
      <Router className="app__content container-fluid py-3">
        <AuthManager
          check={user => !user || !user.accessToken}
          success={<SignUpPage />}
          fallback="/dashboard"
          path="/"
        />
        <AuthManager
          check={user => !user || !user.accessToken}
          success={<LoginPage />}
          fallback="/dashboard"
          path="/authorization"
        />
        <AuthManager
          check={user => !!user && !!user.accessToken}
          success={<DashboardPage />}
          fallback="/authorization"
          path="/dashboard"
        />
        <AuthManager
          check={user => !!user && !!user.accessToken}
          success={<AdDetailsPage />}
          fallback="/authorization"
          path="/dashboard/ads/:idx"
        />
        <AuthManager
          check={user => !!user && !!user.accessToken}
          success={<DashboardPage />}
          fallback="/authorization"
          path="/dashboard/:userId"
        />
      </Router>
    </div>
  );
};

export default App;
