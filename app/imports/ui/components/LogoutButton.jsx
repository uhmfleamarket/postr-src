import React from 'react';
import { Button } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class LogoutButton extends React.Component {

  casLogout(event) {
    event.preventDefault();
    Meteor.logout();
    return false;
  }

  render() {
    return (
        <div>{
          <Button floated="right" onClick={this.casLogout}>Logout</Button>
        }</div>
    );
  }
}

/** Require a document to be passed to this component. */
LogoutButton.propTypes = {
  //stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(LogoutButton);
