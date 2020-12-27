import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCompetition extends Component {
  constructor(props) {
    super(props);

    this.onChangeCompetitioncode = this.onChangeCompetitioncode.bind(this);
    this.onChangeName = this.onChangeName.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      competitioncode: '',
      name: '',
    }
  }

  componentDidMount() {
    document.getElementsByClassName("navbar-collapse")[0].style.visibility = 'hidden';
  }

  componentWillUnmount() {
    document.getElementsByClassName("navbar-collapse")[0].style.visibility = 'visible';
  }  

  onChangeCompetitioncode(e) {
    this.setState({
      competitioncode: e.target.value
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }  

  onSubmit(e) {
    e.prcompetitionDefault();

    const competition = {
      competitioncode: this.state.competitioncode,
      name: this.state.name,
    }

    console.log(competition);

    // TODO: Handle errors for creating competition
    axios.post('/api/competitions/add', competition)
      .then(res => console.log(res.data));

    this.setState({
      competitioncode: '',
      name: '',
    })

    // TODO: Redirect to the Create Event page for this competition, once we have that feature.
  }

  // TODO: Add validation for the competition code.
  render() {
    return (
      <div>
        <h3>Create New Competition</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Competition Code (5 chars): </label>
            <input  type="text"
                required
                maxLength={5}
                pattern="[A-Za-z0-9]{5}"
                className="form-control"
                value={this.state.competitioncode}
                onChange={this.onChangeCompetitioncode}
                />
            <label>Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Competition" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}