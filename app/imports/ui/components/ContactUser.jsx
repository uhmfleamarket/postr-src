import React from 'react';
import { Image, Modal, Button, Card } from 'semantic-ui-react';
import {AutoForm, SubmitField, ErrorsField, TextField, LongTextField, HiddenField} from 'uniforms-semantic'
import {Messages, MessageSchema } from '/imports/api/message/message'
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ContactUser extends React.Component {
  state = {open: false}

  close = () => {
    this.setState({open: false})
  }

  open = () => {
    this.setState({open:true})
  }

  insertCallback(error){
    if(error)
      Bert.alert({type: "danger", message: `Send failed: ${error.message}`});
    else
      Bert.alert({type: "success", message: "Message sent successfully." });
  }

  sendMessage = (data) => {
    Messages.insert(data, this.insertCallback);
    this.setState({open: false})
  }

  render() {
    return (
      <Modal 
        trigger={<Button onClick={this.open}>{this.props.children ? this.props.children : "Contact"}</Button>}
        open={this.state.open}
        onClose={this.close}
      >
        <Modal.Header>Contact Seller</Modal.Header>
        <Modal.Content image>
          {this.props.image ? <Image size="medium" fluid src={this.props.image} /> : "" }
          <Modal.Description>
            <AutoForm schema={MessageSchema} onSubmit={this.sendMessage} >
                <TextField name="subject" />
                <LongTextField name="body" />
                <HiddenField name="to" value={this.props.user} />
                <HiddenField name="from" value={Meteor.userId()} />
                <HiddenField name="item" value={this.props.item ? this.props.item : "NONE"} />
                <Button onClick={this.close}>Cancel</Button>
                <SubmitField value="Send" />
                <ErrorsField/>
            </AutoForm>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

/** Require a document to be passed to this component. */
ContactUser.propTypes = {
  image: PropTypes.string,
  item: PropTypes.string,
  user: PropTypes.string.isRequired,
  //stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ContactUser);
