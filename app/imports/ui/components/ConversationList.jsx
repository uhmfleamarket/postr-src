import React from 'react';
import PropTypes from 'prop-types';
import { Loader, Grid, Header, Comment, Form, Button, Card, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Conversation extends React.Component {
  render() {
    return (<>
        {this.props.messages.map((convo) => (
          <Card as={NavLink} to="/messages">
            <Card.Content>
              <Image floated='left' size='tiny' src={convo.image}/>
              <Card.Header>{convo.subject}</Card.Header>
              <Card.Meta>{convo.from}</Card.Meta>
            </Card.Content>
          </Card>
        ))}
    </>)
  }
}

/** Require an array of Stuff documents in the props. */
Conversation.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default Conversation
