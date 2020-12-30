import React, { Component } from 'react';
import axios from 'axios';

export default class InputScore extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsercode = this.onChangeUsercode.bind(this);
    this.onChangeEventcode = this.onChangeEventcode.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.processUserEventInfo = this.processUserEventInfo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userId: '',
      eventId: '',
      userEventAttempts: "--",
      userEventHigh: "--",      
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

    this.getUserEventInfo(e.target.value, this.state.eventId);
  }

  onChangeEventcode(e) {
    this.setState({
      eventId: e.target.value
    })

    this.getUserEventInfo(this.state.userId, e.target.value);
  }

  getUserEventInfo(user, event) {
    if (user == "" || event == "") {
      this.setState({
        userEventAttempts: 0,
        userEventHigh: '--'
      });      
      return;
    }
    // Fetch the scores object
    axios.get(`/api/scores/user/${user}/event/${event}`)
      .then(response => {
        this.processUserEventInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  processUserEventInfo(data) {
    const attempts = data.length;
    let highScore = '--';
    if (attempts > 0) {
      highScore = 0;
      data.forEach(score => highScore = Math.max(highScore, score.score));
    }
    this.setState({
      userEventAttempts: attempts,
      userEventHigh: highScore
    });
  }

  onChangeScore(e) {
    this.setState({
      score: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.userId == "blank" || this.state.eventId == "blank") {
      return;
    }    

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
      <form onSubmit={this.onSubmit}>
      <div className="form-group"> 
          <label>Event: </label>
          <select
              required
              className="form-control"
              value={this.state.eventId}
              onChange={this.onChangeEventcode}>
              <option key="" value="" />
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
          <select
              required
              className="form-control"
              value={this.state.userId}
              onChange={this.onChangeUsercode}>
              <option key="" value="" />                
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
          <span className="scoreLabel">Previous Attempts: </span> 
          <span className="scoreResult">{this.state.userEventAttempts}</span>
          <br />
          <span className="scoreLabel">Personal Best: </span>
          <span className="scoreResult">{this.state.userEventHigh}</span>
        </div>
        <div className="form-group">
          <label>New Score: </label>
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