import React from 'react';
import { Button, Grid, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import LogoutButton from './LogoutButton';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class NavBar extends React.Component {
  render() {
    if(!!this.props.center_width)
      var center_width = this.props.center_width;
    else
      var center_width = 8;
    console.log(center_width);
    return (
        <Grid container>
          <Grid.Row>
            <Grid.Column width={12-center_width}>
              {this.props.children}
            </Grid.Column>
            <Grid.Column width={center_width}>
              {this.props.title}
            </Grid.Column>
            <Grid.Column width="1" floated="right">
              <LogoutButton/>
              <Button color='yellow' as={NavLink} exact to="/messages" floated="right">
                <Icon name='chat'/>
              </Button>
              <Button color='yellow' as={NavLink} exact to="/userprofilepage" floated="right">
                <Icon name='user'/>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require a document to be passed to this component. */
NavBar.propTypes = {
  //stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(NavBar);
