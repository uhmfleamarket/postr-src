import React from 'react';
import ConditionBar from '/imports/ui/components/ConditionBar';
import { Card, Image, Header } from 'semantic-ui-react';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StashItem extends React.Component {
  render() {
    return (
      <Card as={NavLink} exact to="/itemview">
        <Card.Content>
          <Image floated='left' size='tiny' src={this.props.item.images[0]}/>
          <Card.Header>{this.props.item.name}</Card.Header>
          <Card.Header>{this.props.item.owner}</Card.Header>
          <Card.Header> <Header as='h3' color='green'>${this.props.item.price}</Header> </Card.Header>
         </Card.Content>
        <ConditionBar health={this.props.item.quality.toString}/>
      </Card>
    );
  }
}

/** Require a document to be passed to this component. */
StashItem.propTypes = {
  item: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StashItem);
