import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import HighScoreNavbar from './highscore-navbar.component';

export default class CreateCompetition extends Component {
  constructor(props) {
    super(props);

    this.onChangeCompetitioncode = this.onChangeCompetitioncode.bind(this);
    this.onChangeName = this.onChangeName.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      competitioncode: '',
      name: '',
    }
  }

  onChangeCompetitioncode(e) {
    const competitionCode = e.target.value.toUpperCase();
    this.setState({
      competitioncode: competitionCode
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }  

  onSubmit(e) {
    e.preventDefault();

    const competition = {
      competitioncode: this.state.competitioncode,
      name: this.state.name,
    }

    console.log(competition);

    axios.post('/api/competitions/add', competition)
      .then(res => this.handleCreateResponse(res.data))
      .catch((error) => {
        console.log(error);
        alert("Unable to create new competition.");
      })

    this.setState({
      competitioncode: '',
      name: '',
    })
  }

  handleCreateResponse(data) {
    if (data !== "") {
      console.log("Found id" + data._id);
      window.sessionStorage.setItem("compId", data._id);
      window.location = '/event';
    } else {
      console.log("No competition found.");
    }
  }  

  render() {
    return (
      <div>
        <HighScoreNavbar compId="" />
        <Container className="text-center">
          <Row className="justify-content-center">
            <Col>
              <h1>HighScores.app</h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col>
              <h2>Create New Competition</h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={6}>
            <form className="m-3" onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Competition Code: </label>
                <input  type="text"
                    required
                    maxLength={5}
                    placeholder="5 Characters"
                    pattern="[A-Za-z0-9]{5}"
                    className="form-control"
                    value={this.state.competitioncode}
                    onChange={this.onChangeCompetitioncode}
                    />
                    <br />
                <label>Competition Name: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    />
              </div>
              <div className="form-group">
                <input type="submit" value="Create Competition" className="btn btn-primary" />
              </div>
            </form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}