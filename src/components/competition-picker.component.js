import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CompetitionPicker extends Component {
  constructor(props) {
    super(props);

    this.onChangeCompetitioncode = this.onChangeCompetitioncode.bind(this);

    this.state = {
      competitioncode: '',
    }
  }

  componentDidMount() {
    const hideableElements = document.getElementsByClassName("hide-on-home");
    for (let i = 0; i < hideableElements.length; i++) {
      hideableElements[i].style.visibility = 'hidden';
    }
  }

  componentWillUnmount() {
    const hideableElements = document.getElementsByClassName("hide-on-home");
    for (let i = 0; i < hideableElements.length; i++) {
      hideableElements[i].style.visibility = 'visible';
    }
  }

  onChangeCompetitioncode(e) {
    const competitionCode = e.target.value.toUpperCase();
    this.setState({
      competitioncode: competitionCode
    })

    if (competitionCode.length === 5) {
      console.log("Attempting to get id for " + competitionCode);
      axios.get('/api/competitions/lookup/' + competitionCode)
        .then(res => this.handleLookupResponse(res.data));      
    }
  }

  handleLookupResponse(data) {
    if (data !== "") {
      window.sessionStorage.setItem("compId", data._id);
      window.location = '/events';
    }
  } 

  render() {
    return (
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col>
            <h1>HighScores.app</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Card className="m-3" style={{ width: '20rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Load Existing Scores</Card.Title>
              <Card.Text>
                Enter your Competition Code to load an existing set of Leaderboards
              </Card.Text>
              <div className="form-group">
                <input  type="text"
                        className="form-control input-lg"
                        size="5"
                        value={this.state.competitioncode}
                        onChange={this.onChangeCompetitioncode}
                        />
              </div>
            </Card.Body>
          </Card>
          <Card className="m-3" style={{ width: '20rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Create New Leaderboard</Card.Title>
              <Card.Text>
                Want to start collecting scores for a new set of events?
              </Card.Text>
              <Button variant="primary" as={Link} to="/new-competition">Click Here</Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    )
  }
}
