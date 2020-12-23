import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">HighScores</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/recent" className="nav-link">Recent</Link>
          </li>
          <li className="navbar-item">
          <Link to="/record" className="nav-link">Add Score</Link>
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