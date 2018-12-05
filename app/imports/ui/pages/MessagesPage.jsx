import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Loader, Grid, Header, Comment, Form, Button, Card, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Messages } from '/imports/api/message/message'
import NavBar from '/imports/ui/components/NavBar'
import Conversation from '/imports/ui/components/Conversation'
import ConversationList from '/imports/ui/components/ConversationList'

class MessagesPage extends React.Component {

  render() {
    if(this.props.ready)
      return this.renderPage()
    else
      return <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <div className='user-home'>
        <NavBar>
          <Button as={NavLink} exact to="/userhome">{'<'} Browse Items</Button>
        </NavBar>
        <Grid padded>
          <Grid.Column width={4}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Your Conversations</Card.Header>
              </Card.Content>
              <Card.Content>
                <ConversationList messages={this.props.messages} />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            {this.renderConvo(this.props.convo)}
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  renderConvo(convo) {
    if(convo === null)
      return ( 
        <Comment.Group>
          <Header as='h3' dividing>No conversation selected</Header>
          <Comment>
            <Comment.Content>
              <Comment.Text>Select a conversation from the list on the left.</Comment.Text>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      )
    else
      return (
        <Conversation parentMessage={convo} />
      )
  }
}

/** Require an array of Stuff documents in the props. */
MessagesPage.propTypes = {
  messages: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({match}) => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Message');
  const messages = Messages.find({parentMessage:"NONE"}).fetch()
  let convo = null
  if(messages){
    const c = messages.filter((msg) => msg._id === match.params._id)
    if(c.length > 0)
      convo = c[0]
  }
  return {
    convo: !!convo ? convo : null,
    messages: messages,
    ready: subscription.ready(),
  };
})(MessagesPage);
