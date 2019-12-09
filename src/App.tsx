import React from "react";

import "./App.css";
import LoginPage from "./pages/login";
import { Router } from "@reach/router";

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app__header d-flex p-3">Missing Pet</header>
      <Router className="app__content container-fluid">
        <LoginPage path="/" />
      </Router>
    </div>
  );
};

export default App;
