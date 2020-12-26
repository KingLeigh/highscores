import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateCompetition extends Component {
  constructor(props) {
    super(props);

    this.onChangeCompetitioncode = this.onChangeCompetitioncode.bind(this);

    this.state = {
      competitioncode: '',
    }
  }

  onChangeCompetitioncode(e) {
    const competitionCode = e.target.value.toUpperCase();
    this.setState({
      competitioncode: competitionCode
    })

    if (competitionCode.length == 5) {
      console.log("Attempting to get id for " + competitionCode);
      axios.get('/api/competitions/lookup/' + competitionCode)
        .then(res => this.handleLookupResponse(res.data));      
    }
  }

  handleLookupResponse(data) {
    if (data != "") {
      console.log("Found id" + data._id);
    } else {
      console.log("No competition found.");
    }
  } 

  render() {
    return (
      <div>
        <h3>Load Your Competition</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Competition Code: </label>
            <input  type="text"
                type="text"
                className="form-control"
                value={this.state.competitioncode}
                onChange={this.onChangeCompetitioncode}
                />
          </div>
        </form>
        <Link to="/new-competition">Create New Competition (link)</Link>
      </div>
    )
  }
}