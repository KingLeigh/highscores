import React, { Component } from 'react';
import axios from 'axios';

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.onChangeEventcode = this.onChangeEventcode.bind(this);
    this.onChangeName = this.onChangeName.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      eventcode: '',
      name: '',
    }
  }

  onChangeEventcode(e) {
    this.setState({
      eventcode: e.target.value
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }  

  onSubmit(e) {
    e.preventDefault();

    const event = {
      eventcode: this.state.eventcode,
      name: this.state.name,
    }

    console.log(event);

    // TODO: Pull out base url as an arg.
    // TODO: Handle errors for creating event
    axios.post('http://localhost:5000/events/add', event)
      .then(res => console.log(res.data));

    this.setState({
      eventcode: '',
      name: '',
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Event</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Eventcode: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.eventcode}
                onChange={this.onChangeEventcode}
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
            <input type="submit" value="Create Event" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}