import React, { Component } from 'react';
import axios from 'axios';

export default class EventPicker extends Component {
  constructor(props) {
    super(props);

    this.onChangeEventcode = this.onChangeEventcode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      eventcode: '',
      eventObj: [],
    }
  }

  componentDidMount() {
    // Populate the event states
    axios.get('http://localhost:5000/events/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          eventcode: response.data[0].eventcode,
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
      eventcode: e.target.value
    })   
  }

  onSubmit(e) {
    e.preventDefault();

    window.location = '/leaderboard/' + this.state.eventcode;
  }

  render() {
    return (
    <div>
      <h3>Choose your leaderboard</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-group"> 
          <label>Event: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.eventcode}
              onChange={this.onChangeEventcode}>
              {
                this.state.eventObj.map(function(event) {
                  return <option 
                    key={event.eventcode}
                    value={event.eventcode}>{event.name}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <input type="submit" value="Show Board" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}