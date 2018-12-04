import React from 'react';
import { Grid, Header, Comment, Form, Button, Card, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import NavBar from '/imports/ui/components/NavBar'

class Messages extends React.Component {
  render() {
    return (
      <div className='user-home'>
        <NavBar title=<Header as="h2">Messages</Header> />
        <Grid padded>
          <Grid.Column width={4}>
            <Button as={NavLink} exact to="/userhome">{'<'} Browse Items</Button>
            <Card fluid>
              <Card.Content>
                <Card.Header>Your Meetups</Card.Header>
              </Card.Content>
              <Card.Content>
                {/*Placeholder stuff. By M2, should reflect actual data.*/}
                <Card as={NavLink} exact to="/messages">
                  <Card.Content>
                    <Image floated='left' size='tiny' src='/images/poof22.png'/>
                    <Card.Header>[OTHER USER]</Card.Header>
                    <Card.Header>[RATING]</Card.Header>
                  </Card.Content>
                </Card>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            <Comment.Group>
              <Header as='h3' dividing>Your conversation with [OTHER USER]</Header>
              <Comment>
                <Comment.Avatar src='/images/poof22.png' />
                <Comment.Content>
                  <Comment.Author as='a'>[OTHER USER]</Comment.Author>
                  <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                  </Comment.Metadata>
                  <Comment.Text>Thanks for reaching out! What time can you meet to pick up the spam?</Comment.Text>
                </Comment.Content>
              </Comment>
              <Form reply>
                <Form.TextArea />
                <Button inverted content='Send' labelPosition='left' icon='telegram plane' primary />
              </Form>
            </Comment.Group>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Messages;
