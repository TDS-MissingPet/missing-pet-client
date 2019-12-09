import React from "react";

import "./App.css";
import LoginPage from "./pages/login";
import { Router } from "@reach/router";
import SignUpPage from "./pages/signup";

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app__header d-flex p-3">Missing Pet</header>
      <div className="spacer-60"></div>
      <Router className="app__content container-fluid py-3">
        <SignUpPage path="/" />
        <LoginPage path="/authorization" />
      </Router>
    </div>
  );
};

export default App;
