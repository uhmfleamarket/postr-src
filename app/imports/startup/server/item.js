import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Items } from '/imports/api/item/item.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding item: ${data.name}`);
  Items.insert(data);
}

/** Initialize the collection if empty. */
if (Items.find().count() === 0) {
  if (Meteor.settings.defaultItems) {
    console.log('Creating default items.');
    Meteor.settings.defaultItems.map(data => addData(data));
  }
}

/** This subscription publishes all documents in the collection Items */
Meteor.publish('AllItems', function publish() {
    return Items.find();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Item', function publish() {
  return Items.find()
});

Meteor.publish('OwnerRating', function (owner) {
  console.log("getting user profile for "+owner)
  return Meteor.users.find({username:owner}, {fields: {profile:true}});
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('ItemAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Items.find();
  }
  return this.ready();
});
