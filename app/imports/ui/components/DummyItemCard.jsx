import React from 'react';
import { Card, Image, Header } from 'semantic-ui-react';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ConditionBar from '/imports/ui/components/ConditionBar';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class DummyItemCard extends React.Component {
  render() {
    return (
      <Card as={NavLink} exact to="/itemview">
        <Card.Content>
          <Card.Header>{this.props.item.name}</Card.Header>
        </Card.Content>
        <Image src={this.props.item.images[0]}/>
        <Card.Content>
          <Image circular floated='left' size='mini' src='/images/poof22.png'/>
          <Card.Header>{this.props.item.owner}</Card.Header>
          <ConditionBar health={this.props.item.quality.toString}/>
          <Header color='green' floated='right' size='huge'>${this.props.item.price}</Header>
        </Card.Content>
      </Card>
    );
  }
}

/** Require a document to be passed to this component. */
DummyItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(DummyItemCard);
