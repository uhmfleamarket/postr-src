import React from 'react';
import { Grid, Dropdown } from 'semantic-ui-react';

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
      <div>
        {/*TOP COMPONENTS*/}
        <Grid>
          <Grid.Column width={4}>
            <Dropdown placeholder='choose a category' selection options={categories} />
          </Grid.Column>
          <Grid.Column width={8}>

          </Grid.Column>
          <Grid.Column width={4}>

          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default UserHome;
