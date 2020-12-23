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
      usercode: '',
      eventcode: '',
      score: 0,
      date: new Date(),
      userObj: [],
      eventObj: [],
    }
  }

  componentDidMount() {
    // Populate the user states
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            usercode: response.data[0].usercode,
            userObj: response.data,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

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

  onChangeUsercode(e) {
    this.setState({
      usercode: e.target.value
    })

    // TODO: Retrieve user-event state.
  }

  onChangeEventcode(e) {
    this.setState({
      eventcode: e.target.value
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
      usercode: this.state.usercode,
      eventcode: this.state.eventcode,
      score: this.state.score,
      date: new Date()
    }

    console.log(score);

    axios.post('http://localhost:5000/scores/add', score)
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
          <label>Player: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.usercode}
              onChange={this.onChangeUsercode}>
              {
                this.state.userObj.map(function(user) {
                  return <option 
                    key={user.usercode}
                    value={user.usercode}>{user.name}
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