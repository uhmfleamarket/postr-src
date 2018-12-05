import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Icon, Button, Image, Container, Card } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import StashItem from '../components/StashItem';
import NavBar from '/imports/ui/components/NavBar'

/** A simple static component to render some text for the landing page. */

class UserProfilePage extends React.Component {

  state = { EditingMode:  0 }

  editProfile = () => this.setState(previousState => ({ EditingMode: 1 }))

  editImage = () => this.setState(previousState => ({ EditingMode: 2 }))

  editContact = () => this.setState(previousState => ({ EditingMode: 3 }))

  finishEdits = () => this.setState(previousState => ({ EditingMode: 0 }))

  render() {
    return (
      <div className='profile-bg'>
        <NavBar>
          <Button as={NavLink} exact to="/userhome">{'<'} Browse Items</Button>
        </NavBar>
        <Container centered>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={5}>
                <p className = 'name'>
                  Hi {Meteor.user().profile.name},
                </p>
              </Grid.Column>
              <Grid.Column width={10}>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3}>
                <Card textalign="center" style={{width:'100%'}}>
                  <Card.Content>
                    <Image src={Meteor.user().profile.picture} />
                    <br />
                    <Card.Header>
                      {Meteor.user().profile.name}
                    </Card.Header>
                    <Card.Description>
                      {Meteor.user().profile.address}
                    </Card.Description>
                    <Card.Meta>
                      {Meteor.user().profile.phone}
                    </Card.Meta>
                  </Card.Content>
                </Card>
                <Button fluid onClick={this.editProfile}>Edit Name</Button>
                <Button fluid onClick={this.editImage}>Change Profile Image</Button>
                <Button fluid onClick={this.editContact}>Edit Contact Info</Button>
              </Grid.Column>
              <Grid.Column width={4}>
                <Card>
                  <Card.Header>Past Meetups</Card.Header>
                  <Card.Content>
                    {/*<StashItem></StashItem>*/}
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={4}>
                <Card>
                  <Card.Header>Your Posts</Card.Header>
                  <Card.Content>
                    {/*<StashItem></StashItem>*/}
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={4} textalign='center'>
                <Button fluid as={NavLink} to="/newpost">New Post</Button>
                <Button fluid>Edit / Remove a Post</Button>
                <Button fluid>Contact Admin</Button>
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default UserProfilePage;
