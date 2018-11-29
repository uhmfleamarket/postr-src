import React from 'react';
import { Grid, Dropdown, Input, Card, Loader, Image } from 'semantic-ui-react';
import NavButtons from '/imports/ui/components/NavButtons';
import NavBar from '/imports/ui/components/NavBar';
import DummyItemCard from '/imports/ui/components/DummyItemCard';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import StashItem from '../components/StashItem';
import { Items } from '/imports/api/stuff/item';

// For M2, redefine alot of the things here as components for modularity's sake. The stash item, item cards, etc.

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: 'All',
      currentSearch: '',
    };
    this.refreshCategory = this.refreshCategory.bind(this);
    this.refreshSearch = this.refreshSearch.bind(this);
  }

  refreshCategory(e, { value }) {
    this.setState({ currentCategory: value });
  }

  refreshSearch(e, value) {
    this.setState({ currentSearch: value.value });
    console.log(this.state.currentSearch);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    //TEMPORARY DATA FOR CATEGORY OPTIONS; TO BE REPLACED BY M2
    const categories = [
      {
        text: 'All',
        value: 'All',
      },
      {
        text: 'Textbooks',
        value: 'Textbooks',
      },
      {
        text: 'Appliances',
        value: 'Appliances',
      },
      {
        text: 'Furniture',
        value: 'Furniture',
      },
      {
        text: 'Vehicles',
        value: 'Vehicles',
      },
      {
        text: 'Tech',
        value: 'Tech',
      },
      {
        text: 'Clothes',
        value: 'Clothes',
      },
      {
        text: 'Tools',
        value: 'Tools',
      },
   ];

    return (
      <div className='user-home'>
        {/*TOP COMPONENTS*/}
        <NavBar 
          title={(<Dropdown
              onChange={this.refreshCategory}
              fluid
              placeholder='choose a category'
              selection
              options={categories}
              defaultValue=
              {
                {
                text: 'All',
                value: 'All',
                }
              }
            />
        )}
          center_width="9"
        >
          <Input fluid icon='search' placeholder='Search...' onChange={this.refreshSearch}/>
        </NavBar>

        {/*STASH AND ITEMS*/}
        <Grid padded>
          <Grid.Column width={4}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Your Stash</Card.Header>
              </Card.Content>
              <Card.Content>
                {
                  this.props.items
                    .filter((item) => (item.stashed === true))
                    .map((item, index) => <StashItem key={index} item={item}/>)
                }
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            <Card.Group itemsPerRow={3}>
              {
                (this.state.currentCategory === 'All') ?
                  this.props.items
                    .filter((item) => (item.name.toLowerCase().includes(this.state.currentSearch)))
                    .map((item, index) => <DummyItemCard key={index} item={item}/>)
                  :
                  this.props.items
                    .filter((item) => (this.state.currentCategory === item.category))
                    .filter((item) => (item.name.toLowerCase().includes(this.state.currentSearch)))
                    .map((item, index) => <DummyItemCard key={index} item={item}/>)
              }
            </Card.Group>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserHome.propTypes = {
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('AllItems');
  return {
    items: Items.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserHome);
