import React from 'react';
import { Grid, Dropdown, Input, Card, Image } from 'semantic-ui-react';
import NavBar from '/imports/ui/components/NavBar';
import DummyItemCard from '/imports/ui/components/DummyItemCard';
import { NavLink } from 'react-router-dom';
import StashItem from '../components/StashItem';

// For M2, redefine alot of the things here as components for modularity's sake. The stash item, item cards, etc.

class UserHome extends React.Component {
  render() {
    //TEMPORARY DATA FOR CATEGORY OPTIONS; TO BE REPLACED BY M2
    const categories = [
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
          title={(<Dropdown fluid placeholder='choose a category' selection options={categories} />
        )}
          center_width="9"
        >
          <Input fluid icon='search' placeholder='Search...'/>
        </NavBar>

        {/*STASH AND ITEMS*/}
        <Grid padded>
          <Grid.Column width={4}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Your Stash</Card.Header>
              </Card.Content>
              <Card.Content>
                <StashItem/>
                <StashItem/>
                <StashItem/>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            <Card.Group itemsPerRow={3}>
              <DummyItemCard/>
              <DummyItemCard/>
              <DummyItemCard/>
              <DummyItemCard/>
            </Card.Group>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default UserHome;
