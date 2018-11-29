import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';

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
            <Grid.Column width="4" floated="right">
              <LogoutButton/>
              <Button as={NavLink} exact to="/messages" floated="right">Messages</Button>
              <Button as={NavLink} exact to="/userprofilepage" floated="right">User</Button>
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
