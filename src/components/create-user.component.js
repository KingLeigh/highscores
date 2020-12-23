import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsercode = this.onChangeUsercode.bind(this);
    this.onChangeName = this.onChangeName.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      usercode: '',
      name: '',
    }
  }

  onChangeUsercode(e) {
    this.setState({
      usercode: e.target.value
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }  

  onSubmit(e) {
    e.preventDefault();

    const user = {
      usercode: this.state.usercode,
      name: this.state.name,
    }

    console.log(user);

    // TODO: Pull out base url as an arg.
    // TODO: Handle errors for creating user
    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      usercode: '',
      name: '',
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Usercode: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.usercode}
                onChange={this.onChangeUsercode}
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
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}