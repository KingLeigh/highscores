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
    this.onChangeAdminPin = this.onChangeAdminPin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      competitioncode: '',
      name: '',
      adminPin: '',
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

  onChangeAdminPin(e) {
    this.setState({
      adminPin: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const competition = {
      competitioncode: this.state.competitioncode,
      name: this.state.name,
      adminPin: this.state.adminPin,
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
      window.location = '/c/' + data._id;
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
                <input type="text"
                    required
                    maxLength={5}
                    placeholder="5 Characters"
                    pattern="[A-Za-z0-9]{5}"
                    className="form-control"
                    value={this.state.competitioncode}
                    onChange={this.onChangeCompetitioncode}
                    />
              </div>
              <div className="form-group">
                <label>Competition Name: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    />
              </div>
              <div className="form-group">
                <label>Admin PIN (Optional): </label>
                <input type="text"
                    placeholder="4 Digits"
                    maxLength={4}
                    pattern="[0-9]{4}"
                    className="form-control"
                    value={this.state.adminPin}
                    onChange={this.onChangeAdminPin}
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