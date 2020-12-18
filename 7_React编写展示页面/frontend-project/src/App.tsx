import { HashRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
