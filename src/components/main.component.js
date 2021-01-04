import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import React, { Component } from 'react';
import QueryUtil from '../util/queryutil';
import HighScoreNavbar from "./highscore-navbar.component";
import CompHome from './comp-home.component';
import RecentScores from "./recent-scores.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Leaderboard from './leaderboard.component';

export default class MainComponent extends Component {

  constructor(props) {
    super(props);

    this.handleCompResponse = this.handleCompResponse.bind(this);

    // Load the competition ID specified in the URL, using the lookup cache if possible.
    const compId = this.props.match.params.id;
    const compName = QueryUtil.getCachedCompetitionName(compId);
    if (!compName) {
      // Go find the comp name, so we have it available.
      QueryUtil.getCompetitionById(compId, this.handleCompResponse);
    }

    this.state = {
      compId: compId,
      compName: compName,
    }
  }

  handleCompResponse(data) {
    if (data) {
      QueryUtil.cacheCompetitionName(data._id, data.name);
      this.setState({
        compName: data.name,
      });
    } else {
      // Unable to determine competition, go home.
      window.location = '/';
    }
  } 

  componentDidMount() {
    this.setState({
      compName: QueryUtil.getCachedCompetitionName(this.state.compId),
    });
  }

  render() {
    return (
      <div>
        <HighScoreNavbar compId={ this.state.compId } />
        <Container className="text-center">
        <Row>
          <Col>
            <h1>{this.state.compName}</h1>
          </Col>
        </Row>          
        <Switch>
          <Route path="/c/:id/recent" exact render={(props) => (
            <RecentScores {...props} listTitle="Recent Scores" byDate={true} compId={ this.state.compId } />
          )} />
          <Route path="/c/:id/leaderboard/:eventId" exact render={(props) => (
            <Leaderboard {...props} compId={ this.state.compId } />
          )} />          
          <Route path="/c/:id" exact render={(props) => (
            <CompHome {...props} compId={ this.state.compId } compName= { this.state.compName } />
          )} />          
        </Switch>
        </Container>
      </div>
    );
  }
}