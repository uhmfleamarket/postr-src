import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import {Redirect} from 'react-router';
import { withRouter, NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class LoginButton extends React.Component {

  casLogin(event) {
    event.preventDefault();
    const callback = function loginCallback(error) {
      if (error) {
        console.log(error);
      }
    };
    Meteor.loginWithCas(callback);

    return false;
  }

  render() {
    const loggedIn = (Meteor.userId() !== null);

    return (
        <div>{loggedIn ? 
              <Redirect to =  "/userhome"/> 
              : 
              <Button floated = "right " size = "huge" inverted onClick={this.casLogin}>Login</Button>
        }</div>
    );
  }
}

/** Require a document to be passed to this component. */
LoginButton.propTypes = {
  //stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(LoginButton);
