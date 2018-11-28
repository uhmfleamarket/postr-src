import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class NavButtons extends React.Component {
  render() {
    return (
		<>
			<Button as={NavLink} exact to="/messages" floated="right">Messages</Button>
			<Button as={NavLink} exact to="/userprofilepage" floated="right">User</Button>
            <LogoutButton/>
		</>
    );
  }
}

/** Require a document to be passed to this component. */
NavButtons.propTypes = {
  //stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(NavButtons);
