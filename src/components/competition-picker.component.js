import Container from 'react-bootstrap/Container';
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
      console.log("Found id" + data._id);
      window.sessionStorage.setItem("compId", data._id);
      window.location = '/events';
    } else {
      console.log("No competition found.");
    }
  } 

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col>
            <h1>HighScores.app</h1>
          </Col>
        </Row>
        <Row className="justify-content-around">
          <Col xs={5}>
            <h4>Load an existing Competition</h4>
            <div className="form-group">
              <input  type="text"
                      className="form-control input-lg col-3"
                      size="5"
                      value={this.state.competitioncode}
                      onChange={this.onChangeCompetitioncode}
                      />
            </div>
          </Col>
          <Col xs={5}>
            <h4>
              <Link to="/new-competition">Create New Competition</Link>
            </h4>
          </Col>
        </Row>
      </Container>
    )
  }
}