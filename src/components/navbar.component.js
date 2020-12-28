import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">HighScores</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
          <li className="navbar-item">
            <Link to="/events" className="nav-link">Leaderboards</Link>
            </li>            
            <li className="navbar-item">
            <Link to="/recent" className="nav-link">Recent Scores</Link>
            </li>
            <li className="navbar-item">
            <Link to="/record" className="nav-link">Record New Score</Link>
            </li>
            <li className="navbar-item">
            <Link to="/user" className="nav-link">Create User</Link>
            </li>
            <li className="navbar-item">
            <Link to="/event" className="nav-link">Create Event</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}