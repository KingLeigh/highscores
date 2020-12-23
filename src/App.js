import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ScoreList from "./components/score-list.component";
import InputScore from "./components/input-score.component";
import CreateUser from "./components/create-user.component";
import CreateEvent from "./components/create-event.component";
import EventPicker from "./components/event-picker.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={EventPicker} />
      <Route path="/leaderboard/:id"  render={(props) => (
        <ScoreList {...props} listTitle="Leaderboard"/>
      )} />      
      <Route path="/recent" exact  render={(props) => (
        <ScoreList {...props} listTitle="Recent Scores" byDate={true} />
      )} />
      <Route path="/record" component={InputScore} />
      <Route path="/user" component={CreateUser} />
      <Route path="/event" component={CreateEvent} />      
      </div>
    </Router>
  );
}

export default App;