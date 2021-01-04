import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import CreateCompetition from "./components/create-competition.component";
import MainComponent from "./components/main.component";
import LandingPage from "./components/landing-page.component";

function App() {
  return (
    <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/c/:id" component={MainComponent} />
        <Route path="/new" exact component={CreateCompetition} />        
    </Router>
  );
}

export default App;