import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QueryUtil from '../util/queryutil';

export default class CompetitionPicker extends Component {
  constructor(props) {
    super(props);

    this.onChangeCompetitioncode = this.onChangeCompetitioncode.bind(this);

    this.state = {
      competitioncode: '',
    }
  }

  onChangeCompetitioncode(e) {
    const competitionCode = e.target.value.toUpperCase();
    this.setState({
      competitioncode: competitionCode
    })

    if (competitionCode.length === 5) {
      console.log("Attempting to get id for " + competitionCode);
      QueryUtil.getCompetitionByCode(competitionCode, this.handleLookupResponse);
    }
  }

  handleLookupResponse(data) {
    if (data) {
      QueryUtil.cacheCompetitionName(data._id, data.name);
      window.location = '/c/' + data._id;
    } else {
      // TODO: ALert that no competition was available for this.
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
          <Card className="m-3 p-3" style={{ width: '20rem' }}>
            <Card.Img variant="top" src="../img/card-placeholder.svg" />
            <Card.Body>
              <Card.Title>Load Existing Competition</Card.Title>
              <Card.Text>
                Enter your Competition Code to load an existing set of players, scores and leaderboards.
              </Card.Text>
              <div className="form-group">
                <input type="text"
                        className="form-control input-lg"
                        size="5"
                        placeholder="Competition Code"
                        value={this.state.competitioncode}
                        onChange={this.onChangeCompetitioncode}
                        />
              </div>
            </Card.Body>
          </Card>
          <Card className="m-3 p-3" style={{ width: '20rem' }}>
            <Card.Img variant="top" src="../img/card-placeholder.svg" />
            <Card.Body>
              <Card.Title>Create New Competition</Card.Title>
              <Card.Text>
                Want to start collecting scores for a brand new set of events?
              </Card.Text>
              <Button variant="primary" as={Link} to="/new">Click Here</Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    )
  }
}
