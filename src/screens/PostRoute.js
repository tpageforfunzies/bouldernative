import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Input, TextLink, Button, Loading } from '../components/common'
import axios from 'axios'

class PostRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_obj: this.props.user_obj,
      name: '',
      grade: '',
      error: '',
      loading: false
    }

    console.log(this.props.user_obj)

    this.handleName = this.handleName.bind(this)
    this.handleGrade = this.handleGrade.bind(this)
    this.onSendRouteFail = this.onSendRouteFail.bind(this)
    this.sendRoute = this.sendRoute.bind(this)
  }

  handleName = (text) => {
    this.setState({
      name: text
    });
  }

  handleGrade = (text) => {
    this.setState({
      grade: text
    });
  }

  sendRoute() {
    const authheader = { "Authorization": "Bearer ".concat(this.props.jwt) }

    this.setState({
      loading: true
    });
    axios({
      method: 'post',
      url: 'https://www.hackcity.dev/v1/route/new',
      headers: authheader,
      data: {
        user_id: parseInt(this.state.user_obj.id),
        name: this.state.name,
        grade: this.state.grade
      }
    })
    .then((res) => {
      this.props.toggle()
    })
    .catch((err) => {
      this.onSendRouteFail();
      this.props.toggle()
    });

    this.setState({
      loading: false
    });

    
  }

  onSendRouteFail() {
    this.setState({ 
      error: 'Posting Route Failed',
      loading: false
    });
  }

  render() {
    const { form, section, title, errorTextStyle } = styles;
    const { name, grade, loading, error } = this.state;

    return (
      <View style={form}>
      <Text>{this.state.name}</Text>
      <Text>{this.state.grade}</Text>
        <View style={section}>
          <Input
            placeholder="Route Name"
            label="Route Name"
            value={name}
            onChangeText={this.handleName}
          />
        </View>
        <View style={section}>
          <Input
            placeholder="Grade"
            label="Grade"
            value={grade}
            onChangeText={this.handleGrade}
          />
        </View>

        <Text style={errorTextStyle}>
          {error}
        </Text>
        
        {!loading ?
        <Button title={'Post Route'} onPress={this.sendRoute}>
          Post Route
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export { PostRoute }