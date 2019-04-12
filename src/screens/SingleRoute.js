import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../components/common'
import axios from 'axios';

class SingleRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_obj: this.props.user_obj,
      route: this.props.route,
      route_obj: {}
    }
    this.deleteRoute = this.deleteRoute.bind(this)
    this.gatherRoute = this.gatherRoute.bind(this)
    this.handleRes = this.handleRes.bind(this)
    this.gatherRoute()
    
  }

  deleteRoute() {
    const bearer = "Bearer ".concat(this.props.jwt)
    const authheader = { "Authorization": bearer }

    axios.delete('http://hackcity.dev/v1/route/'.concat(this.state.route), {
      headers: authheader
    })
    .then((res) => {
      console.log('delete route res: ', res)
      this.props.resetFocus()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleRes = (obj) => {
    this.setState({
      route_obj: obj.route
    });
  } 

  gatherRoute() {
    const authheader = { "Authorization": "Bearer ".concat(this.props.jwt) }
    const requrl = 'http://hackcity.dev/v1/route/'.concat(this.state.route);

    axios(requrl, {
      headers: authheader
    })
    .then((res) => {
      this.handleRes(res.data)
    })
    .catch((err) => {
      console.log('SingleRoute.gatherRoute(): ', err);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.route_obj.name}</Text>
        <Text style={styles.subtitle}>{this.state.route_obj.grade}</Text>
        <Button onPress={this.props.resetFocus}>
          Go Back
        </Button>
        <Button onPress={this.deleteRoute} style={styles.dangerbutton}>
          Delete Route
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 36
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 24
  },
  dangerbutton: {
    backgroundColor: 'red'
  }
})

export { SingleRoute }