import React, { Component } from 'react';
import axios from 'axios';

export default class InputScore extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsercode = this.onChangeUsercode.bind(this);
    this.onChangeEventcode = this.onChangeEventcode.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userId: '',
      eventId: '',
      score: 0,
      date: new Date(),
      userObj: [],
      eventObj: [],
      compId: '',
    }
  }

  componentDidMount() {
    const compId = window.sessionStorage.getItem("compId");
    this.setState({
      compId: compId
    });
    // Populate the user states
    axios.get('/api/users/' + compId)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            userId: response.data[0]._id,
            userObj: response.data,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

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

  onChangeUsercode(e) {
    this.setState({
      userId: e.target.value
    })

    // TODO: Retrieve user-event state.
  }

  onChangeEventcode(e) {
    this.setState({
      eventId: e.target.value
    })

    // TODO: Retrieve user-event state.    
  }

  onChangeScore(e) {
    this.setState({
      score: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const score = {
      userId: this.state.userId,
      eventId: this.state.eventId,
      score: this.state.score,
      competition: this.state.compId,
      date: new Date()
    }

    console.log(score);

    axios.post('/api/scores/add', score)
      .then(res => console.log(res.data));

    this.setState({
      score: 0,
    });
  }

  render() {
    return (
    <div>
      <h3>Record Score</h3>
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
          <label>Player: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.userId}
              onChange={this.onChangeUsercode}>
              {
                this.state.userObj.map(function(user) {
                  return <option 
                    key={user._id}
                    value={user._id}>{user.name}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Score: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.score}
              onChange={this.onChangeScore}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Record Score" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}