import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CreateUser from "./create-user.component";
import CreateEvent from "./create-event.component";
import Col from 'react-bootstrap/Col';
import EventPicker from "./event-picker.component";
import InputScore from "./input-score.component";
import Row from 'react-bootstrap/Row';
import React, { Component } from 'react';
import QueryUtil from '../util/queryutil';

export default class MainComponent extends Component {

  constructor(props) {
    super(props);

    this.handleCompResponse = this.handleCompResponse.bind(this);

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
      <Container className="text-center">
        <Row>
          <Col>
            <h1>{this.state.compName}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Quick Links</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Card className="m-3 p-3" style={{ width: '20rem' }}>
            <Card.Title>View Leaderboard</Card.Title>
              <Card.Body>
                <EventPicker />
              </Card.Body>
          </Card>
          <Card className="m-3 p-3" style={{ width: '20rem' }}>
            <Card.Title>Record A Score</Card.Title>
              <Card.Body>
                <InputScore />
              </Card.Body>
          </Card>          
        </Row>
        <hr />
        <Row>
          <Col>
            <h2>Competition Setup</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Card className="m-3 p-3" style={{ width: '20rem' }}>
            <Card.Title>Add New Player</Card.Title>
              <Card.Body>
                <CreateUser />
              </Card.Body>
          </Card>
          <Card className="m-3 p-3" style={{ width: '20rem' }}>
            <Card.Title>Add New Event</Card.Title>
              <Card.Body>
                <CreateEvent />
              </Card.Body>
          </Card>
        </Row>        
      </Container>
    );
  }
}