import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Messages } from '../../api/message/message.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding message: ${data.subject}`);
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
Meteor.publish('Conversation', function publish(parentMessage) {
  if(this.userId){
    const email = Meteor.users.findOne(this.userId).services.cas.id;
    return Messages.find({ parentMessage: parentMessage });
  }
});

Meteor.publish('Message', function publish() {
  if(this.userId){
    const email = Meteor.users.findOne(this.userId).services.cas.id;
    return Messages.find({ to: email });
  }
});
