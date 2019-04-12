import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Login, Registration } from '../components'

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true
    }

    this.authSwitch = this.authSwitch.bind(this)
  }

  // Define state of showLogin
  authSwitch() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  // Decide whether to show Registration or Login form depending on the presence on the device of a JWT token
  whichForm() {
    if(!this.state.showLogin){
      return(
        <Registration authSwitch={this.authSwitch} newJWT={this.props.newJWT} newID={this.props.newID} />
      );
    } else {
      return(
        <Login authSwitch={this.authSwitch} newJWT={this.props.newJWT} newID={this.props.newID} />
      );
    }
  }

  render() {
    return(
      <View style={styles.container}>
        {this.whichForm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
