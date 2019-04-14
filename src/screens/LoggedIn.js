import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import { ListItem, Header, Icon } from 'react-native-elements'
import { Button } from '../components/common/Button'
import { HeaderButton } from '../components/common/HeaderButton'
import axios from 'axios';

import { PostRoute, SingleRoute } from '../screens'
import { LogoutButton } from '../components/common/LogoutButton';

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_obj: {},
      routes: [],
      posting: false,
      focusRoute: 0
    }

    this.handleUser = this.handleUser.bind(this);
    this.gatherUser = this.gatherUser.bind(this);
    this.gatherUser();
    this.gatherRoutes = this.gatherRoutes.bind(this);
    this.handleRoutes = this.handleRoutes.bind(this);
    this.noRoutes = this.noRoutes.bind(this)
    this.togglePostRoute = this.togglePostRoute.bind(this)
    this.changeFocus = this.changeFocus.bind(this)
    this.resetFocus = this.resetFocus.bind(this)
  }

  handleUser(user) {
    this.setState({
      user_obj: {
        id: user.ID,
        name: user.name,
        email: user.email
      }
    });
  }

  gatherUser() {
    const numId = parseInt(this.props.id);
    const authheader = { "Authorization": "Bearer ".concat(this.props.jwt) }

    const requrl = 'https://www.hackcity.dev/v1/user/'.concat(this.props.id);

    axios(requrl, {
      headers: authheader
    })
    .then((res) => {
      this.handleUser(res.data.user);
      this.gatherRoutes();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleRoutes(routes) {
    this.setState({
      routes
    });
  }

  changeFocus(routeID) {
    this.setState({
      focusRoute: routeID
    });
  }

  resetFocus() {
    this.setState({
      focusRoute: 0
    });
    this.gatherRoutes()
  }

  noRoutes() {
    this.setState({
      routes: []
    });
  }

  togglePostRoute() {
    this.setState({
      posting: !this.state.posting
    });
    this.gatherRoutes();
  }

  gatherRoutes() {
    const backurl = this.props.id.toString().concat('/routes');
    const requrl = 'https://www.hackcity.dev/v1/user/'.concat(backurl);
    const bearer = "Bearer ".concat(this.props.jwt)
    const authheader = { "Authorization": bearer }

    axios(requrl, {
      headers: authheader
    })
    .then((res) => {
      this.handleRoutes(res.data.routes);
    })
    .catch((err) => {
      console.log('Gather Routes Error: ', err);
      this.noRoutes();
    });
  }

  render() {
    if(!this.state.posting) {
      if(this.state.focusRoute == 0) {
        const routes = this.state.routes;

        return (
          <View style={styles.wrapper}>
            <Header
              leftComponent={<LogoutButton onPress={this.props.deleteJWT} />}
              centerComponent={{ text: 'Boulder Tracker', style: { color: '#fff', fontWeight: 'bold', fontSize: 24 }}}
              rightComponent={<HeaderButton onPress={this.togglePostRoute}/>}
            />
            <ScrollView>
              {/* TODO: Figure out how to change the timestamp to something human readable*/}
              {
                routes.map((l, i) => (
                  <ListItem
                    style={styles.listitem}
                    onPress={() => this.changeFocus(l.ID)}
                    key={i}
                    title={l.name}
                    titleStyle={{ color: 'black', fontWeight: 'bold' }}
                    subtitleStyle={{ color: '#444' }}
                    subtitle={`${l.grade} - Put Date Here`} />
                ))
              }
            </ScrollView>
          </View>
        );
      } else {
        return (
          <SingleRoute user_obj={this.state.user_obj} jwt={this.props.jwt} route={this.state.focusRoute} resetFocus={this.resetFocus}/>
        );
      }
    } else {
      return (
        <PostRoute user_obj={this.state.user_obj} jwt={this.props.jwt} toggle={this.togglePostRoute} />
      );
    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '90%',
    top: '10%'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  listitem: {
    width: '100%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#ccc'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 36
  }
});