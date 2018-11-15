import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { withRouter, NavLink } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StashItem extends React.Component {
  render() {
    return (
<<<<<<< HEAD
        <Card as={NavLink} exact to="/itemview">
          <Card.Content>
            <Image floated='left' size='tiny' src='/images/poof22.png'/>
            <Card.Header>[Item Title]</Card.Header>
            <Card.Header>[Condition]</Card.Header>
            <Card.Header>[Seller]</Card.Header>
            <Card.Header>[Price]</Card.Header>
          </Card.Content>
        </Card>
=======
      <Card as={NavLink} exact to="/itemview">
        <Card.Content>
          <Image floated='left' size='tiny' src='/images/poof22.png'/>
          <Card.Header>[Item Title]</Card.Header>
          <Card.Header>[Condition]</Card.Header>
          <Card.Header>[Seller]</Card.Header>
          <Card.Header>[Price]</Card.Header>
        </Card.Content>
      </Card>
>>>>>>> master

    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StashItem);
