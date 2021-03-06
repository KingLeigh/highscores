import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import axios from 'axios';

export default class EventPicker extends Component {
  constructor(props) {
    super(props);

    this.onChangeEventcode = this.onChangeEventcode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      eventId: '',
      eventObj: [],
    }
  }

  componentDidMount() {
    const compId = this.props.compId;

    // Populate the event states
    axios.get('/api/events/' + compId)
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          eventId: response.data[0]._id,
          eventObj: response.data,
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeEventcode(e) {
    this.setState({
      eventId: e.target.value
    })   
  }

  onSubmit(e) {
    e.preventDefault();

    window.location = '/c/' + this.props.compId + '/leaderboard/' + this.state.eventId;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <select
                required
                className="form-control"
                value={this.state.eventId}
                onChange={this.onChangeEventcode}>
                {
                  this.state.eventObj.map(function(event) {
                    return <option
                      key={event._id}
                      value={event._id}>{event.name}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <Button variant="primary" type="submit" block>Show Board</Button>
          </div>

          <div className="form-group">
            <Button variant="outline-secondary" href={"/c/" + this.props.compId + "/recent"}>View/Edit All</Button>
          </div>
        </form>
        
      </div>
    )
  }
}