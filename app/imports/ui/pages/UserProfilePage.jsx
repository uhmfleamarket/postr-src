import React from 'react';
import { Grid, Icon, Button, Image, Container, Card } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import StashItem from '../components/StashItem';

/** A simple static component to render some text for the landing page. */

class UserProfilePage extends React.Component {

  state = { EditingMode:  0, userProfile: {name: "Steven Shmleeven", address: "UH Manoa Wainani Dorm", number: "(808) 555-2324"}}

  editProfile = () => this.setState(previousState => ({ EditingMode: 1 }))

  editImage = () => this.setState(previousState => ({ EditingMode: 2 }))

  editContact = () => this.setState(previousState => ({ EditingMode: 3 }))

  finishEdits = () => this.setState(previousState => ({ EditingMode: 0 }))

  render() {
    console.log("oops");
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
                  Hi {this.state.userProfile.name},
                </p>
              </Grid.Column>
              <Grid.Column width={5}>
              </Grid.Column>
              <Grid.Column width={5} textalign='right'>
                <Button as={NavLink} exact to="/messages" floated="right">Messages</Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <ProfileCard EditingMode = {this.state.EditingMode} parentPage = {this}/>
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

class ProfileCard extends React.Component {
  render() {
    if (this.props.EditingMode == 0) {
      return (
          <Grid.Column width={3}>
            <Card textalign="center" style={{width:'100%'}}>
              <Card.Content>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
                <br />
                <Card.Header>
                  {this.props.parentPage.state.userProfile.name}
                </Card.Header>
                <Card.Description>
                  {this.props.parentPage.state.userProfile.address}
                </Card.Description>
                <Card.Meta>
                  {this.props.parentPage.state.userProfile.number}
                </Card.Meta>
              </Card.Content>
            </Card>
            <Button fluid onClick={this.props.parentPage.editProfile}>Edit Name</Button>
            <Button fluid onClick={this.props.parentPage.editImage}>Change Profile Image</Button>
            <Button fluid onClick={this.props.parentPage.editContact}>Edit Contact Info</Button>
          </Grid.Column>

      );
    } else if (this.props.EditingMode == 1) {
      return (
          <Grid.Column width={3}>
            <Card textalign="center" style={{width:'100%'}}>
              <Card.Content>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
                <br />
                  <input placeholder = {this.props.parentPage.state.userProfile.name} />
                <Card.Description>
                  {this.props.parentPage.state.userProfile.address}
                </Card.Description>
                <Card.Meta>
                  {this.props.parentPage.state.userProfile.number}
                </Card.Meta>
              </Card.Content>
            </Card>
            <Button fluid onClick={this.props.parentPage.finishEdits}>Submit changes</Button>
          </Grid.Column>

      );
    } else if (this.props.EditingMode == 2) {
      return (
          <Grid.Column width={3}>
            <Card textalign="center" style={{width:'100%'}}>
              <Card.Content>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
                <br />
                <Card.Header>
                  This is a placeholder. Here should contain the functionality to upload an image.
                </Card.Header>
              </Card.Content>
            </Card>
            <Button fluid onClick={this.props.parentPage.finishEdits}>Ok, got it, thanks</Button>
          </Grid.Column>

      );
    } else if (this.props.EditingMode == 3) {
      return (
          <Grid.Column width={3}>
            <Card textalign="center" style={{width:'100%'}}>
              <Card.Content>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
                <br />
                <Card.Header>
                  {this.props.parentPage.state.userProfile.name}
                </Card.Header>
                <input placeholder = {this.props.parentPage.state.userProfile.address} />
                <input placeholder = {this.props.parentPage.state.userProfile.number} />
              </Card.Content>
            </Card>
            <Button fluid onClick={this.props.parentPage.finishEdits}>Submit changes</Button>
          </Grid.Column>

      );
    }

  }
}


export default UserProfilePage;
