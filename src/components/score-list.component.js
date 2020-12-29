import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

const RecentScore = props => (
  <tr className="d-flex">
    <td className="col-3">{props.score.username}</td>
    <td className="col-3">{props.score.eventname}</td>
    <td className="col-2">{props.score.score}</td>
    <td className="col-3">{props.score.date}</td>
    <td className="col-1">
      <a href="#" onClick={() => { props.deleteScore(props.score._id) }}>delete</a>
    </td>
  </tr>
)

const LeaderScore = props => (
  <tr className="d-flex">
    <th scope="row" className="col-2">{props.score.rank}</th>
    <td className="col-4">{props.score.username}</td>
    <td className="col-3">{props.score.score}</td>
    <td className="col-3">{props.score.date}</td>
  </tr>
)

export default class ScoreList extends Component {
  constructor(props) {
    super(props);

    this.pageTitle = props.listTitle;
    this.isLeaderboard = !props.byDate;
    this.eventToShow = this.props.match.params.id;

    this.deleteScore = this.deleteScore.bind(this);
    this.getNameFromId = this.getNameFromId.bind(this);
    this.getEventNameFromId = this.getEventNameFromId.bind(this);
    this.updateScores = this.updateScores.bind(this); 
    this.sortScoresFn = this.sortScoresFn.bind(this);
    this.formatDate = this.formatDate.bind(this);

    // Update the board every 5 minutes. Consider changing this post-testing.
    this.updateFrequency = 5 * 60 * 1000;
    this.leaderboardSize = 10;
    this.totalItems = this.isLeaderboard ? this.leaderboardSize : Number.MAX_VALUE;

    this.state = {
      scores: [],
      usermap: {},
      eventmap: {},
      lastUpdated: new Date(),
    };
  }

  getNameFromId(code) {
    return this.state.usermap[code] || code;
  }

  getEventNameFromId(code) {
    return this.state.eventmap[code] || code;
  }  

  componentDidMount() {
    const compId = window.sessionStorage.getItem("compId");    
    // TODO: Consider a slower update rate for new Users/Events?
    // Populate the user map
    axios.get('/api/users/' + compId)
      .then(response => {
        if (response.data.length > 0) {
          const newUserMap = {};
          response.data.forEach(user => newUserMap[user._id] = user.name);
          this.setState({
            usermap: newUserMap,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });

      // Populate the events map
      axios.get('/api/events/' + compId)
      .then(response => {
        if (response.data.length > 0) {
          const newEventMap = {};
          response.data.forEach(event => newEventMap[event._id] = event.name);
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
    axios.get('/api/scores/comp/' + window.sessionStorage.getItem("compId"))
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
    axios.delete('/api/scores/'+id)
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

  formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString();
  }

  scoreList(sortFn) {
    let displayScores = this.state.scores.slice();

    if (this.isLeaderboard) {
      // TODO: Move the filter to the server eventually.
      displayScores = displayScores.filter(score => score.eventId === this.eventToShow);
    }

    const sortedScores = displayScores.sort(sortFn);

    sortedScores.length = Math.min(sortedScores.length, this.totalItems);
    // Update the score array with additional metadata.
    // TODO: Include things like New and Delta in here.
    sortedScores.forEach((score, index) => {
      score.eventname = this.getEventNameFromId(score.eventId);
      score.username = this.getNameFromId(score.userId);
      score.date = this.formatDate(score.date)
      score.rank = index + 1;
    });

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
      <Container className="text-center">
        <h2>High Scores</h2>
        <h3>{this.getEventNameFromId(this.eventToShow)}</h3>
        <Row>
          <table className="table table-striped mt-3">
            <thead className="thead-light">
              <tr className="d-flex">
                <th scope="col" className="col-2">Rank</th>
                <th scope="col" className="col-4">Player</th>
                <th scope="col" className="col-3">Score</th>
                <th scope="col" className="col-3">Date</th>
              </tr>
            </thead>
            <tbody>
              { this.scoreList(this.sortScoresFn) }
            </tbody>
            <caption>Last updated: { this.state.lastUpdated.toLocaleString() }</caption>              
          </table>
        </Row>
      </Container>
    )
  }

  renderRecent() {
    return (
      <Container className="text-center">
        <h2>{this.pageTitle}</h2>
        <table className="table table-striped mt-3">
          <thead className="thead-light">
            <tr className="d-flex">
              <th className="col-3">Player</th>
              <th className="col-3">Event</th>
              <th className="col-2">Score</th>
              <th className="col-3">Date</th>
              <th className="col-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.scoreList(this.sortScoresFn) }
          </tbody>
          <caption>Last updated: { this.state.lastUpdated.toLocaleString() }</caption>          
        </table>
      </Container>
    )
  }

  render() {
    return this.isLeaderboard ? this.renderLeaderboard() : this.renderRecent();
  }
}