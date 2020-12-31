import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CreateUser from "./create-user.component";
import CreateEvent from "./create-event.component";
import Col from 'react-bootstrap/Col';
import EventPicker from "./event-picker.component";
import InputScore from "./input-score.component";
import Row from 'react-bootstrap/Row';
import React, { Component } from 'react';

export default class MainComponent extends Component {

  constructor(props) {
    super(props);

    const urlCompId = this.props.match.params.id;
    let compId;
    if (urlCompId) {
      compId = urlCompId;
      window.sessionStorage.setItem("compId", compId);
      // TODO: Get competition name if needed.
    } else if (window.sessionStorage.getItem("compId")) {
      compId = window.sessionStorage.getItem("compId");
    } else {
      // Unable to determine competition, go home.
      window.location = '/';
    }

    this.state = {
      compId: compId,
      compName: '',
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