import Card from 'react-bootstrap/Card';
import CreateUser from "./create-user.component";
import CreateEvent from "./create-event.component";
import Col from 'react-bootstrap/Col';
import EventPicker from "./event-picker.component";
import InputScore from "./input-score.component";
import Row from 'react-bootstrap/Row';
import React, { Component } from 'react';

export default class CompHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      compId: this.props.compId
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h2>Quick Links</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Card className="m-3 p-3" style={{ width: '20rem' }}>
            <Card.Title>View Leaderboard</Card.Title>
              <Card.Body>
                <EventPicker compId={this.state.compId}/>
              </Card.Body>
          </Card>
          <Card className="m-3 p-3" style={{ width: '20rem' }}>
            <Card.Title>Record A Score</Card.Title>
              <Card.Body>
                <InputScore compId={this.state.compId} />
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
                <CreateUser compId={this.state.compId} />
              </Card.Body>
          </Card>
          <Card className="m-3 p-3" style={{ width: '20rem' }}>
            <Card.Title>Add New Event</Card.Title>
              <Card.Body>
                <CreateEvent compId={this.state.compId} />
              </Card.Body>
          </Card>
        </Row>        
      </div>
    );
  }
}