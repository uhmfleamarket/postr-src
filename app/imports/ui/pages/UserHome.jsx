import React from 'react';
import { Grid, Dropdown, Input, Card, Image } from 'semantic-ui-react';
import NavButtons from '/imports/ui/components/NavButtons';
import DummyItemCard from '/imports/ui/components/DummyItemCard';
import { NavLink } from 'react-router-dom';

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
        <Grid padded>
          <Grid.Column width={4}>
            <Dropdown fluid placeholder='choose a category' selection options={categories} />
          </Grid.Column>
          <Grid.Column width={9}>
            <Input fluid icon='search' placeholder='Search...'/>
          </Grid.Column>
          <Grid.Column width={3}>
            <NavButtons/>
          </Grid.Column>
        </Grid>

        {/*STASH AND ITEMS*/}
        <Grid padded>
          <Grid.Column width={4}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Your Stash</Card.Header>
              </Card.Content>
              <Card.Content>
                {/*Placeholder stuff. By M2, should reflect actual data.*/}
                <Card  as={NavLink} exact to="/itemview">
                  <Card.Content>
                    <Image floated='left' size='tiny' src='/images/poof22.png'/>
                    <Card.Header>[Item Title]</Card.Header>
                    <Card.Header>[Condition]</Card.Header>
                    <Card.Header>[Seller]</Card.Header>
                    <Card.Header>[Price]</Card.Header>
                  </Card.Content>
                </Card>
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
