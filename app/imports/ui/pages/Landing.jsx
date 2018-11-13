import React from 'react';
import { Grid, Icon, Button, Image, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='landing-bg'>
        {/*BUFFER*/}
        <Container className='landing-buffer'></Container>

        {/*TOP ICONS*/}
        <Grid centered>
          <Grid centered verticalAlign='middle' columns={3}>
            <Grid.Column>
              <Icon inverted className='landing-icon' name='twitter' size='huge'></Icon>
              <Icon inverted className='landing-icon' name='instagram' size='huge'></Icon>
              <Icon inverted className='landing-icon' name='facebook f' size='huge'></Icon>
              <Icon inverted className='landing-icon' name='github' size='huge'></Icon>
            </Grid.Column>
            <Grid.Column>
              <Image centered
                src='http://manoa.hawaii.edu/confuciusinstitute/wp-content/uploads/2017/03/manoaseal_transparent.png'
                size='small'
              />
            </Grid.Column>
            <Grid.Column floated='right'>
              <Button floated='right' inverted size='huge'>Sign Up</Button>
              <Button floated='right' inverted size='huge'>Login</Button>
            </Grid.Column>
          </Grid>
        </Grid>

        {/*LOGO*/}
        <Image className='postr-logo' centered src='/images/postr_logo.png'/>
      </div>
    );
  }
}

export default Landing;
