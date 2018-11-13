import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class NavButtons extends React.Component {
  render() {
    return (
		<><Button>Messages</Button><Button>User</Button></>
    );
  }
}

/** Require a document to be passed to this component. */
NavButtons.propTypes = {
  //stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(NavButtons);
