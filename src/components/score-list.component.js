import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

// TODO: Define different Score components for the score editor and the scoreboard
const RecentScore = props => (
  <tr>
    <td>{props.score.username}</td>
    <td>{props.score.eventname}</td>
    <td>{props.score.score}</td>
    <td>{props.score.date.toLocaleString()}</td>
    <td>
      <a href="#" onClick={() => { props.deleteScore(props.score._id) }}>delete</a>
    </td>
  </tr>
)

const LeaderScore = props => (
  <tr>
    <td>{props.score.rank}</td>
    <td>{props.score.username}</td>
    <td>{props.score.score}</td>
    <td>{props.score.date.toLocaleString()}</td>
  </tr>
)


// TODO: Per-event filter

export default class ScoreList extends Component {
  constructor(props) {
    super(props);

    this.pageTitle = props.listTitle;
    this.isLeaderboard = !props.byDate;
    this.eventToShow = this.props.match.params.id;

    this.deleteScore = this.deleteScore.bind(this);
    this.getNameFromCode = this.getNameFromCode.bind(this);
    this.getEventNameFromCode = this.getEventNameFromCode.bind(this);
    this.updateScores = this.updateScores.bind(this); 
    this.sortScoresFn = this.sortScoresFn.bind(this);

    this.updateFrequency = 10000;
    this.leaderboardSize = 5;
    this.totalItems = this.isLeaderboard ? this.leaderboardSize : Number.MAX_VALUE;

    this.state = {
      scores: [],
      usermap: {},
      eventmap: {},
      lastUpdated: new Date(),
    };
  }

  getNameFromCode(code) {
    return this.state.usermap[code] || code;
  }

  getEventNameFromCode(code) {
    return this.state.eventmap[code] || code;
  }  

  componentDidMount() {
    // TODO: Consider a slower update rate for new Users/Events?
    // Populate the user map
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          const newUserMap = {};
          response.data.forEach(user => newUserMap[user.usercode] = user.name);
          this.setState({
            usermap: newUserMap,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });

      // Populate the events map
      axios.get('http://localhost:5000/events/')
      .then(response => {
        if (response.data.length > 0) {
          const newEventMap = {};
          response.data.forEach(event => newEventMap[event.eventcode] = event.name);
          this.setState({
            eventmap: newEventMap,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });

      this.updateScores();
      this.timerID = setInterval(
        () => this.updateScores(),
        this.updateFrequency
      );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateScores() {
    // Fetch the scores object
    axios.get('http://localhost:5000/scores/')
      .then(response => {
        this.setState({ 
          scores: response.data,
          lastUpdated: new Date(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteScore(id) {
    axios.delete('http://localhost:5000/scores/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      scores: this.state.scores.filter(el => el._id !== id)
    })
  }

  sortScoresFn(a, b) {
    if (this.isLeaderboard) {
      return this.sortScoresByScore(a, b);
    } else {
      return this.sortScoresByDate(a, b);
    }
  }

  sortScoresByDate(a, b) {
    return Date.parse(b.date) - Date.parse(a.date);
  }

  sortScoresByScore(a, b) {
    return b.score - a.score;
  }  

  scoreList(sortFn) {
    let displayScores = this.state.scores.slice();

    if (this.isLeaderboard) {
      // TODO: Move the filter to the server eventually.
      displayScores = displayScores.filter(score => score.eventcode === this.eventToShow);
    }

    const sortedScores = displayScores.sort(sortFn);

    sortedScores.length = Math.min(sortedScores.length, this.totalItems);
    // Update the score array with additional metadata.
    // TODO: Include things like New and Delta in here.
    sortedScores.forEach((score, index) => {
      score.eventname = this.getEventNameFromCode(score.eventcode);
      score.username = this.getNameFromCode(score.usercode);
      score.rank = index + 1;
    });

    // TODO: Add a filter by dropdown and/or URL i.e. an actual score table.
    return sortedScores.map(currentscore => {
      if (this.isLeaderboard) {
        return <LeaderScore score={currentscore} 
            deleteScore={this.deleteScore} key={currentscore._id}/>;
      } else {
        return <RecentScore score={currentscore} 
            deleteScore={this.deleteScore} key={currentscore._id}/>;
      }
    })
  }

  renderLeaderboard() {
    return (
      <div>
        <h3>{this.pageTitle}</h3>
        <h3>{this.getEventNameFromCode(this.eventToShow)}</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            { this.scoreList(this.sortScoresFn) }
          </tbody>
        </table>
        <span className="lastUpdated">Last updated: { this.state.lastUpdated.toLocaleString() }</span>
      </div>
    )
  }

  renderRecent() {
    return (
      <div>
        <h3>{this.pageTitle}</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>User</th>
              <th>Event</th>
              <th>Score</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.scoreList(this.sortScoresFn) }
          </tbody>
        </table>
        <span className="lastUpdated">Last updated: { this.state.lastUpdated.toLocaleString() }</span>
      </div>
    )
  }

  render() {
    return this.isLeaderboard ? this.renderLeaderboard() : this.renderRecent();
  }
}