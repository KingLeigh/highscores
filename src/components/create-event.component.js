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
    const compId = this.props.compId;
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

    window.location = '/c/' + this.state.compId;    
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Event Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Event" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}