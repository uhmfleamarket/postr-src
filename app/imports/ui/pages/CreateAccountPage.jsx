import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
export default class CreateAccountPage extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', error: '' };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { name, picture, address, phone } = this.state;
    let profile = {name: name, picture: picture, rating: 3, isSetup: true, address: address, phone:phone}
    Meteor.users.update(Meteor.userId(), {$set: {profile: profile}})
    this.setState({ isSetup: true})
  }

  /** Display the signup form. */
  render() {
    return (
        <Container>
          {Meteor.user() && Meteor.user().profile && Meteor.user().profile.isSetup ? <Redirect to="/" /> : ""}
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center" color = "green">
                Create an Account to buy and sell as a UH Student!
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment>
                  <Form.Input
                      label="Full Name"
                      icon="user"
                      iconPosition="left"
                      name="name"
                      type="username"
                      placeholder="Full Name"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Profile Picture URL"
                      icon="user"
                      iconPosition="left"
                      name="picture"
                      placeholder="URL to profile picture"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Address"
                      icon="user"
                      iconPosition="left"
                      name="address"
                      placeholder="Address"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Phone Number"
                      icon="user"
                      iconPosition="left"
                      name="phone"
                      placeholder="Phone Number"
                      onChange={this.handleChange}
                  />
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}
