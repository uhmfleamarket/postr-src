import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Messages } from '../../api/message/message.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding message: ${data.name}`);
  Messages.insert(data);
}

/** Initialize the collection if empty. */
if (Messages.find().count() === 0) {
  if (Meteor.settings.defaultMessages) {
    console.log('Creating default messages.');
    Meteor.settings.defaultMessages.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Message', function publish() {
  return Messages.find();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('MessageAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Messages.find();
  }
  return this.ready();
});
