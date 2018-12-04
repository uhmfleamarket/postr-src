import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Loader, Grid, Header, Comment, Form, Button, Card, Image } from 'semantic-ui-react';
import {AutoForm, SubmitField, ErrorsField, TextField, LongTextField, HiddenField} from 'uniforms-semantic'
import { NavLink } from 'react-router-dom';
import {Messages, MessageSchema } from '/imports/api/message/message'
import { Meteor } from 'meteor/meteor'

class Conversation extends React.Component {
  render() {
    if(this.props.ready)
      return this.renderPage()
    else
      return ("waiting")  // TODO: use loader
  }

  sendMessage = (data) => {
    Messages.insert(data, this.insertCallback);
    this.form.reset()
  }

  renderPage() {
    return (
        <Comment.Group>
          <Header as='h3' dividing>{this.props.parentMessage.subject}</Header>
          {this.props.messages.map((msg) => (
            <Comment>
              <Comment.Avatar src={msg.from === Meteor.user().username ? Meteor.user().profile.picture : this.props.otherUser.profile.picture} />
              <Comment.Content>
                <Comment.Author as="a" to="/">{msg.from}</Comment.Author>
                <Comment.Metadata>
                  <div>{msg.date}</div>
                </Comment.Metadata>
                <Comment.Text>{msg.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
          <AutoForm schema={MessageSchema} onSubmit={this.sendMessage} ref={node => this.form = node}>
            <HiddenField name="subject" value={this.props.parentMessage.subject} />
            <LongTextField name="body" label="Reply" />
            <HiddenField name="to" value={this.props.otherUser.username} />
            <HiddenField name="from" value={Meteor.user().username} />
            <HiddenField name="item" value={this.props.parentMessage.item} />
            <HiddenField name="parentMessage" value={this.props.parentMessage._id} />
            <HiddenField name="image" value={this.props.parentMessage.image} />
            <HiddenField name="date" value={new Date()} />
            <SubmitField value="Send" />
            <ErrorsField/>
          </AutoForm>
        </Comment.Group>
      )
  }
}

/** Require an array of Stuff documents in the props. */
Conversation.propTypes = {
  parentMessage: PropTypes.object.isRequired,
  otherUser: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker((props) => {
  // Get access to Stuff documents.
  const otherUsername = props.parentMessage.to === Meteor.user().username ? props.parentMessage.from : props.parentMessage.to;
  const subscription = Meteor.subscribe('Conversation', props.parentMessage._id);
  const sub2 = Meteor.subscribe("userdata")
  return {
    messages: Messages.find().fetch(),
    otherUser: Meteor.users.findOne({username: otherUsername}),
    ready: subscription.ready() && sub2.ready()
  };
})(Conversation);
