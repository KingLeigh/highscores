import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import EventPicker from "./event-picker.component";
import Row from 'react-bootstrap/Row';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MainComponent extends Component {

  constructor(props) {
    super(props);

    const compId = this.props.match.params.id;
    window.sessionStorage.setItem("compId", compId);

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
        <Row>
        <Card className="m-3 p-3" style={{ width: '20rem' }}>
          <Card.Title>View Leaderboard</Card.Title>
            <Card.Body>
              <EventPicker />
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}