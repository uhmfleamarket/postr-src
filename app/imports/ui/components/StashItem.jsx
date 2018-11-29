import React from 'react';
import ConditionBar from '/imports/ui/components/ConditionBar';
import { Grid, Card, Image, Header, Icon, Button } from 'semantic-ui-react';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Items } from '/imports/api/item/item';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StashItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // update is a switch that triggers the state change which refreshes the page.
      // the value of the boolean does not matter, just the fact that it changes is what updates the page.
      update: false,
    };
    this.removeFromStash = this.removeFromStash.bind(this);
  }

  removeFromStash() {
    Items.update(this.props.item._id, { $set: { stashed: false } }, (error) => (error ?
      console.log(error.message) :
      console.log('Success.')));
    this.setState({ update: !this.state.update });
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={12}>
          <Card as={NavLink} exact to="/itemview">
            <Card.Content>
              <Image floated='left' size='tiny' src={this.props.item.images[0]}/>
              <Card.Header>{this.props.item.name}</Card.Header>
              <Card.Header>{this.props.item.owner}</Card.Header>
              <Card.Header> <Header as='h3' color='green'>${this.props.item.price}</Header> </Card.Header>
             </Card.Content>
            <ConditionBar health={this.props.item.quality.toString}/>
          </Card>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button color='red' icon onClick={this.removeFromStash}>
            <Icon inverted name='minus' />
          </Button>
        </Grid.Column>
      </Grid>
    );
  }
}

/** Require a document to be passed to this component. */
StashItem.propTypes = {
  item: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StashItem);
