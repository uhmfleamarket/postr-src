import React from 'react';
import { Card, Image, Header, Button, Icon } from 'semantic-ui-react';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ConditionBar from '/imports/ui/components/ConditionBar';
import { Items } from '/imports/api/item/item';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class DummyItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // update is a switch that triggers the state change which refreshes the page.
      // the value of the boolean does not matter, just the fact that it changes is what updates the page.
      update: false,
    };
    this.addToStash = this.addToStash.bind(this);
  }

  addToStash() {
    Items.update(this.props.item._id, { $set: { stashed: true } }, (error) => (error ?
      console.log(error.message) :
      console.log('Success.')));
    this.setState({ update: !this.state.update });
  }

  render() {
    console.log(
      Meteor.users
        .find({ _id: Meteor.users
            .find({ username: this.props.item.owner })
            .fetch()[0]._id })
        .fetch()[0].profile.picture
    );

    return (
        <Card>
          <Card.Content as={NavLink} exact to={"/itemview/"+this.props.item._id} >
            <Card.Header>{this.props.item.name}</Card.Header>
          </Card.Content>
            <Image as={NavLink} exact to={"/itemview/"+this.props.item._id} src={this.props.item.images[0]}/>
          <Card.Content as={NavLink} exact to={"/itemview/"+this.props.item._id}>
            <Image
              circular
              floated='left'
              size='mini'
              src={
                Meteor.users
                  .find({ _id: Meteor.users
                      .find({ username: this.props.item.owner })
                      .fetch()[0]._id })
                  .fetch()[0].profile.picture
              }
            />
            <Card.Header>{this.props.item.owner}</Card.Header>
            <ConditionBar health={this.props.item.quality.toString}/>
            <Header color='green' floated='right' size='huge'>${this.props.item.price}</Header>
          </Card.Content>
          <Button color='green' icon onClick={this.addToStash}>
            <Icon inverted name='plus' />
          </Button>
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
