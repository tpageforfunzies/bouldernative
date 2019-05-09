import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../components/common'
import { Comments } from '../components'
import axios from 'axios';
import Moment from 'moment';

class SingleRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_obj: this.props.user_obj,
      route: this.props.route,
      route_obj: {},
      routeComments: []
    }
    this.deleteRoute = this.deleteRoute.bind(this)
    this.gatherRoute = this.gatherRoute.bind(this)
    this.handleRes = this.handleRes.bind(this)
    this.gatherRoute()
    
  }

  deleteRoute() {
    const bearer = "Bearer ".concat(this.props.jwt)
    const authheader = { "Authorization": bearer }

    axios.delete('https://www.hackcity.dev/v1/route/'.concat(this.state.route), {
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
    // console.log(obj.route.Comments)
    this.setState({
      route_obj: obj.route,
      routeComments: obj.route.Comments
    });
  } 

  gatherRoute() {
    const authheader = { "Authorization": "Bearer ".concat(this.props.jwt) }
    const requrl = 'https://www.hackcity.dev/v1/route/'.concat(this.state.route);

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
    let stuff = this.state.routeComments;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.route_obj.name}</Text>
        <Text style={styles.subtitle}>V{this.state.route_obj.grade}</Text>
        <Text style={styles.subtitle}>Sent: {Moment(this.state.route_obj.CreatedAt).format('ddd MMMM Do, YYYY')} </Text>
        <Button onPress={this.props.resetFocus}>
          Go Back
        </Button>
        <Button onPress={this.deleteRoute} style={styles.dangerbutton}>
          Delete Route
        </Button>
        <Comments comments={stuff} />
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