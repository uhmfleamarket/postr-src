import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Items } from '../../api/item/item.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding item: ${data.name}`);
  Items.insert(data);
}

/** Initialize the collection if empty. */
if (Items.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default items.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Item', function publish() {
  return Items.find({ active: true });
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('ItemAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Items.find();
  }
  return this.ready();
});
