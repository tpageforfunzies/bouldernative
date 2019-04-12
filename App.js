import React, { Component } from 'react';
import { Loading } from './src/components/common/';
import Auth from './src/screens/Auth';
import LoggedIn from './src/screens/LoggedIn';
import deviceStorage from './src/services/deviceStorage'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      jwt: '',
      id: '',
      loading: true
    }

    this.newID = this.newID.bind(this)
    this.newJWT = this.newJWT.bind(this);
    this.deleteID = deviceStorage.deleteID.bind(this)
    this.loadID = deviceStorage.loadID.bind(this)
    this.deleteJWT = deviceStorage.deleteJWT.bind(this)
    this.loadJWT = deviceStorage.loadJWT.bind(this)
    this.loadID();
    this.loadJWT();
  }

  newJWT(jwt) {
    this.setState({
      jwt: jwt
    });
  }

  newID(id) {
    this.setState({
      id: parseInt(id)
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading size={'large'} />
       );
    } else if (!this.state.jwt) {
      return (
        <Auth newJWT={this.newJWT} newID={this.newID} />
      );
    } else if (this.state.jwt) {
      return (
        <LoggedIn deleteJWT={this.deleteJWT} id={this.state.id} jwt={this.state.jwt} />
      );
    }
  }
}