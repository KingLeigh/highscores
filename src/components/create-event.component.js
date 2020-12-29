import Container from 'react-bootstrap/Container';
import React, { Component } from 'react';
import axios from 'axios';

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      compId: '',
    }
  }

  componentDidMount() {
    const compId = window.sessionStorage.getItem("compId");
    console.log("Create event page. CompId = " + compId);
    this.setState({
      compId: compId
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }  

  onSubmit(e) {
    e.preventDefault();

    const event = {
      name: this.state.name,
      competition: this.state.compId,
    }

    console.log(event);

    // TODO: Handle errors for creating event
    axios.post('/api/events/add', event)
      .then(res => console.log(res.data));

    this.setState({
      name: '',
    })
  }

  render() {
    return (
      <Container>
        <h2>Create New Event</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Event" className="btn btn-primary" />
          </div>
        </form>
      </Container>
    )
  }
}