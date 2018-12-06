import React from 'react';
import { Button } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class LogoutButton extends React.Component {

  constructor(props) {
    super(props)
    this.state = {loggedIn: true}
    this.casLogout = this.casLogout.bind(this)
  }

  casLogout(event) {
    event.preventDefault();
    Meteor.logout(((error) => {
      if(error)
        console.log(error)
        //TODO: use Bert error
      else
        this.setState({loggedIn:false})
    }).bind(this));
    return false;
  }

  render() {
    return Meteor.userId() !== null ?
          <Button color='yellow' floated="right" onClick={this.casLogout}>Logout</Button>
          :
          <Redirect to="/" />
  }
}

/** Require a document to be passed to this component. */
LogoutButton.propTypes = {
  //stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(LogoutButton);
