import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Loader, Grid, Header, Comment, Form, Button, Card, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Messages } from '/imports/api/message/message'
import Conversation from '/imports/ui/components/Conversation'

class MessagesPage extends React.Component {
  state = { currentConvo: null }

  setConvo = (convo) => {
    return function() {
      this.setState({currentConvo: convo})
    }.bind(this)
  }

  render() {
    if(this.props.ready)
      return this.renderPage()
    else
      return <Loader active>Getting data</Loader>;
  }

  renderPage() {
    console.log(Meteor.user())
    return (
      <div className='user-home'>
        <Grid padded>
          <Grid.Column width={4}>
            <Button as={NavLink} exact to="/userhome">{'<'} Browse Items</Button>
            <Card fluid>
              <Card.Content>
                <Card.Header>Your Conversations</Card.Header>
              </Card.Content>
              <Card.Content>
                {this.props.messages.map((convo) => (
                  <Card onClick={this.setConvo(convo)}>
                    <Card.Content>
                      <Image floated='left' size='tiny' src={convo.image}/>
                      <Card.Header>{convo.subject}</Card.Header>
                      <Card.Meta>{convo.from}</Card.Meta>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            {this.renderConvo(this.state.currentConvo)}
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
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Message');
  return {
    messages: Messages.find({parentMessage:"NONE"}).fetch(),
    ready: subscription.ready(),
  };
})(MessagesPage);
