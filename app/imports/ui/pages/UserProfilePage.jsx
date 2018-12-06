import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Loader, Grid, Icon, Button, Image, Container, Card } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-semantic'
import { NavLink } from 'react-router-dom';
import StashItem from '../components/StashItem';
import NavBar from '/imports/ui/components/NavBar'
import SimpleSchema from 'simpl-schema';
import { Messages, MessageSchema } from '/imports/api/message/message'
import { Items } from '/imports/api/item/item';
import DummyItemCard from '/imports/ui/components/DummyItemCard';
import ConversationList from '/imports/ui/components/ConversationList'

/** A simple static component to render some text for the landing page. */

const ProfileSchema = new SimpleSchema({
    name: { type: String },
    picture: { type: String },
    phone: { type: String },
    address: { type: String },
  })

class UserProfilePage extends React.Component {
  state = {edit: false}

  editProfile = (e) => {
    e.preventDefault()
    this.setState({edit:true})
  }

  saveChanges = (data) => {
    Meteor.users.update(Meteor.userId(), {$set: {
      "profile.name":data.name,
      "profile.picture":data.picture,
      "profile.phone":data.phone,
      "profile.address":data.address,
    }})
    this.setState({edit:false})
  }

  username() {
    return this.state.edit ? (
        <TextField name="name" />
    ) : (
      <Card.Header>
        {Meteor.user().profile.name}
      </Card.Header>
    )
  }

  address() {
    return this.state.edit ? (
        <TextField name="address" />
    ) : (
      <Card.Description>
        {Meteor.user().profile.address}
      </Card.Description>
    )
  }

  phone() {
    return this.state.edit ? (
        <TextField name="phone" />
    ) : (
      <Card.Meta>
        {Meteor.user().profile.phone}
      </Card.Meta>
    )
  }

  picture() {
    return this.state.edit ? (
        <TextField name="picture" />
    ) : (
      <Image src={Meteor.user().profile.picture} />
    )
  }

  render() {
    if(this.props.ready)
      return this.renderPage()
    else
      return <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <div className='profile-bg'>
      <AutoForm schema={ProfileSchema} model={Meteor.user().profile} onSubmit={this.saveChanges}>
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
                      {this.picture()}
                    <br />
                      {this.username()}
                      {this.address()}
                      {this.phone()}
                  </Card.Content>
                </Card>
                {this.state.edit ? (
                    <Button fluid>Save</Button>
                  ):(
                    <Button fluid onClick={this.editProfile}>Edit Profile</Button>
                )}
              </Grid.Column>
              <Grid.Column width={4}>
                <Card>
                  <Card.Header>Conversations</Card.Header>
                  <Card.Content>
                    <ConversationList messages={this.props.messages} />
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={4}>
                <Card>
                  <Card.Header>Your Posts</Card.Header>
                  <Card.Content>
                    {this.props.items.map((item, index) => <DummyItemCard key={index} item={item} hideStash={true} />)
                    }
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
      </AutoForm>
      </div>
    );
  }
}

UserProfilePage.propTypes = {
  messages: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const msgsub = Meteor.subscribe('Message');
  const itemsub = Meteor.subscribe('AllItems');
  return {
    messages: Messages.find({parentMessage:"NONE"}).fetch(),
    items: Items.find({owner: "foo"}).fetch(),
    ready: msgsub.ready() && itemsub.ready(),
  };
})(UserProfilePage);
