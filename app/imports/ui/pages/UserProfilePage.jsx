import React from 'react';
import { Grid, Icon, Button, Image, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='profile-bg'>
        {/*BUFFER*/}
        <Container className='landing-buffer'></Container>

        {/*TOP ICONS*/}
        <Container centered>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={5}>
                <p className = 'name'>
                  Hi Steven,
                </p>
              </Grid.Column>
              <Grid.Column width={5}>
              </Grid.Column>
              <Grid.Column width={5}>
                <Icon inverted className='landing-icon' name='chat' size='huge'></Icon>
                <Icon inverted className='landing-icon' name='circle' size='huge'></Icon>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3}>
                <p className = 'name'>
                  Hi Steven,
                </p>
              </Grid.Column>
              <Grid.Column width={4}>
              </Grid.Column>
              <Grid.Column width={4}>
                <Icon inverted className='landing-icon' name='chat' size='huge'></Icon>
                <Icon inverted className='landing-icon' name='circle' size='huge'></Icon>
              </Grid.Column>
              <Grid.Column width={4}>
                <Icon inverted className='landing-icon' name='chat' size='huge'></Icon>
                <Icon inverted className='landing-icon' name='circle' size='huge'></Icon>
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Landing;
