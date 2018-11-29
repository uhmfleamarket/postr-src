import React from 'react';
import { Grid, Icon, Button, Image, Container, Card } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

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
                <Button as={NavLink} exact to="/userhome">{'<'} Browse Items</Button>
                <p className = 'name'>
                  Hi Steven,
                </p>
              </Grid.Column>
              <Grid.Column width={5}>
              </Grid.Column>
              <Grid.Column width={5} textAlign='right'>
                <Icon inverted className='landing-icon' name='chat' size='big'></Icon>
                <Icon inverted className='landing-icon' name='circle' size='big'></Icon>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3}>
                <p className = 'profile-body'>
                  Profile
                </p>
                <Button as={NavLink} to="/newpost" fluid>New Post</Button>
                <Button fluid>Contact Admin</Button>
                <Button fluid>Other Option</Button>
              </Grid.Column>
              <Grid.Column width={4}>
                <p className = 'profile-body'>
                  Past Meetups
                </p>
                <Card>
                  <Card.Header>Example Listing</Card.Header>
                  <Card.Meta>Example Owner</Card.Meta>
                  <Card.Description>Example decription</Card.Description>
                </Card>
              </Grid.Column>
              <Grid.Column width={4}>
                <p className = 'profile-body'>
                  Your Posts
                </p>
                <Card>
                  <Card.Header>Example Listing</Card.Header>
                  <Card.Meta>Example Owner</Card.Meta>
                  <Card.Description>Example decription</Card.Description>
                </Card>
              </Grid.Column>
              <Grid.Column width={4} textAlign='center'>
                <Button fluid>New Post</Button>
                <Button fluid>Contact Admin</Button>
                <Button fluid>Other Option</Button>
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Landing;
