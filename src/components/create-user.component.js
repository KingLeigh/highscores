import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
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
    console.log("Create user page. CompId = " + compId);
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

    const user = {
      name: this.state.name,
      competition: this.state.compId,
    }

    console.log(user);

    // TODO: Handle errors for creating user
    axios.post('/api/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      name: '',
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
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
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}