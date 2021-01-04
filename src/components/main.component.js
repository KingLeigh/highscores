import React, { Component } from 'react';
import QueryUtil from '../util/queryutil';
import HighScoreNavbar from "./highscore-navbar.component";
import CompHome from './comp-home.component';
import ScoreList from "./score-list.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class MainComponent extends Component {

  constructor(props) {
    super(props);

    this.handleCompResponse = this.handleCompResponse.bind(this);

    // Load the competition ID specified in the URL, using the lookup cache if possible.
    const urlCompId = this.props.match.params.id;
    const compLoaded = window.sessionStorage.getItem("compLoaded");
    let compId;
    let compName;
    if (urlCompId) {
      compId = urlCompId;

      if (!compLoaded || window.sessionStorage.getItem("compId") != compId) {
        // Comp not loaded, or changed via url - load it by id.
        QueryUtil.getCompetitionById(compId, this.handleCompResponse);
      }
    } else if (compLoaded) {
      compId = window.sessionStorage.getItem("compId");
      compName = window.sessionStorage.getItem("compName");
    } else {
      // Unable to determine competition, go home.
      window.location = '/';
    }

    this.state = {
      compId: compId,
      compName: compName,
    }
  }

  handleCompResponse(data) {
    if (data) {
      window.sessionStorage.setItem("compLoaded", true);
      window.sessionStorage.setItem("compId", data._id);
      window.sessionStorage.setItem("compName", data.name);
      window.sessionStorage.setItem("compCode", data.competitioncode);
      this.setState({
        compId: data._id,
        compName: data.name,
      });
    } else {
      // Unable to determine competition, go home.
      window.location = '/';
    }
  } 

  componentDidMount() {
    // Check whether we already have the comp info, e.g from the landing page.
    const compName = window.sessionStorage.getItem("compName");
    if (compName) {
      this.setState({
        compName: compName,
      });
    } else {
      console.log("XYZ No comp name available, need to look it up and save it!");
    }
  }

  render() {
    return (
      <div>
        <HighScoreNavbar compId={ this.state.compId } />
        <Switch>
          <Route path="/c/:id/recent" exact render={(props) => (
            <ScoreList {...props} listTitle="Recent Scores" byDate={true} compId={ this.state.compId } />
          )} />
          <Route path="/c/:id" exact render={(props) => (
            <CompHome {...props} compId={ this.state.compId } compName= { this.state.compName } />
          )} />          
        </Switch>
      </div>
    );
  }
}