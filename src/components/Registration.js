import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, TextLink, Button, Loading } from './common'
import axios from 'axios'
import deviceStorage from '../services/deviceStorage'

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
      response: '',
      loading: false
    }

    this.registerUser = this.registerUser.bind(this)
    this.onRegistrationFail = this.onRegistrationFail.bind(this)
  }

  handleName = (text) => {
    this.setState({ name: text });
  }

  handleEmail = (text) => {
    this.setState({ email: text });
  }

  handlePassword = (text) => {
    this.setState({ password: text });
  }

  handleResponse = (response) => {
    this.setState({ response });
  }

  registerUser() {
    const { name, email, password, response } = this.state; 
    console.log(this.state);
    axios.post('http://hackcity.dev/v1/user/new', {
      name: name,
      email: email,
      password: password
    })
    .then((res) => {
      deviceStorage.saveItem("id_token", res.data.user.token);
      deviceStorage.saveItem('userID', res.data.user.ID.toString());
      this.props.newJWT(res.data.user.token);
      this.props.newID(res.data.user.ID.toString());
      this.handleResponse(res);
    })
    .catch((err) => {
      console.log(err);
      this.onRegistrationFail();
    });
    
    this.setState({ error: '', loading: true });
  }

  onRegistrationFail() {
    this.setState({
      error: 'Registration Failed',
      loading: false
    });
  }

  render() {
    const { name, email, password, password_confirmation, error, loading, response } = this.state;
    const { form, section, errorTextStyle } = styles;

    return (
      <View style={form}>

        <View style={section}>
          <Input
            placeholder="Name"
            label="Name"
            value={name}
            onChangeText={this.handleName}
          />
        </View>
        
        <View style={section}>
          <Input
            placeholder="user@email.com"
            label="Email"
            value={email}
            onChangeText={this.handleEmail}
          />
        </View>

        <View style={section}>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={password}
            onChangeText={this.handlePassword}
          />
        </View>

        {/* <View style={section}>
          <Input
            secureTextEntry
            placeholder="confirm password"
            label="Confirm Password"
            value={password_confirmation}
            onChangeText={password_confirmation => this.setState({ password_confirmation })}
          />
        </View> */}

        <Text style={errorTextStyle}>
          {error}
        </Text>

        {!loading ?
        <Button onPress={this.registerUser}>
          Register
        </Button>
        :
        <Loading size={'large'} />
        }

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10
  }
});

export { Registration }