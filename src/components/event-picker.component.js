import Container from 'react-bootstrap/Container';
import React, { Component } from 'react';
import axios from 'axios';

export default class EventPicker extends Component {
  constructor(props) {
    super(props);

    this.onChangeEventcode = this.onChangeEventcode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      eventId: '',
      eventObj: [],
      compName: '',
    }
  }

  componentDidMount() {
    const compId = window.sessionStorage.getItem("compId");
    this.setState({
      compName: window.sessionStorage.getItem("compName")
    });

    // Populate the event states
    axios.get('/api/events/' + compId)
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          eventId: response.data[0]._id,
          eventObj: response.data,
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeEventcode(e) {
    this.setState({
      eventId: e.target.value
    })   
  }

  onSubmit(e) {
    e.preventDefault();

    window.location = '/leaderboard/' + this.state.eventId;
  }

  render() {
    return (
    <Container>
      <h1>{this.state.compName}</h1>
      <h2>Select A Leaderboard</h2>
      <form onSubmit={this.onSubmit}>
      <div className="form-group"> 
          <label>Event: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.eventId}
              onChange={this.onChangeEventcode}>
              {
                this.state.eventObj.map(function(event) {
                  return <option 
                    key={event._id}
                    value={event._id}>{event.name}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <input type="submit" value="Show Board" className="btn btn-primary" />
        </div>
      </form>
    </Container>
    )
  }
}