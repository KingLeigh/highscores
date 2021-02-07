import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QueryUtil from '../util/queryutil';

export default class CompetitionPicker extends Component {
  constructor(props) {
    super(props);

    this.onChangeCompetitioncode = this.onChangeCompetitioncode.bind(this);
    this.onChangePin = this.onChangePin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      competitioncode: '',
      pin: '',
    }
  }

  onChangeCompetitioncode(e) {
    const competitionCode = e.target.value.toUpperCase();
    this.setState({
      competitioncode: competitionCode
    })
  }

  onChangePin(e) {
    this.setState({
      pin: e.target.value
    })
  }  

  onSubmit(e) {
    e.preventDefault();

    if (this.state.competitioncode.length === 5) {
      QueryUtil.getCompetitionByCode(
        this.state.competitioncode, this.state.pin, this.handleLookupResponse);
    }    
  }

  handleLookupResponse(data) {
    if (data) {
      QueryUtil.cacheCompetitionName(data._id, data.name);
      QueryUtil.cacheCompetitionPermission(data._id, data.permission);
      window.location = '/c/' + data._id;
    } else {
      // TODO: ALert that no competition was available for this.
    }
  }

  render() {
    return (
      <div>
      <Jumbotron>
        <Container>
          <h1>HighScores<span class="text-muted">.app</span></h1>
          <p>
            A free, lightweight system for managing competitions. Configure teams and players; 
            add events; record scores and display auto-updating leaderboards. All with just a couple of clicks.   
          </p>
          <p>
            <Button variant="primary" as={Link} to="/new" size="lg">Get started</Button>
          </p>
        </Container>
      </Jumbotron>
      <Container>
        <Row>
          <Col>
            <h2>Load Existing</h2>
            <p>Enter your Competition Code to load an existing set of players, scores and leaderboards.</p>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="text"
                          className="form-control input-lg"
                          maxLength={5}
                          placeholder="Competition Code"
                          value={this.state.competitioncode}
                          onChange={this.onChangeCompetitioncode}
                          />
                </div>
                <div className="form-group">
                  <input type="text"
                      placeholder="PIN"
                      maxLength={4}
                      pattern="[0-9]{4}"
                      className="form-control"
                      value={this.state.pinCode}
                      onChange={this.onChangePin}
                      />
                  <small class="form-text text-muted">Optional</small>
  
                </div>
                <div className="form-group">
                  <input type="submit" value="Let's Go" className="btn btn-primary btn-block" />
                </div>
              </form>
          </Col>
          <Col>
            <h2>Create New</h2>
            <p>Want to start collecting scores for a brand new set of events?</p>
            <Button variant="primary" as={Link} to="/new" block>Get Started</Button>
          </Col>
          <Col>
          <h3>"Losers focus on winners. Winners focus on winning."</h3>
          </Col>
        </Row>
      </Container>
      </div>
    )
  }
}
