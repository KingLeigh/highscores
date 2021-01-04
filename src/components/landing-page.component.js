import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import CompetitionPicker from "./competition-picker.component";
import HighScoreNavbar from "./highscore-navbar.component";

export default class LandingPage extends Component {
  render() {
    return (
      <div>
          <HighScoreNavbar compId={""} />
          <CompetitionPicker />
      </div>
    );
  }
}