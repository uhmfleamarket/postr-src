import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';

/* eslint-disable no-console */

function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profile: {rating: 3, picture: "https://react.semantic-ui.com/images/avatar/large/matthew.png"},
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');}
}

/* Validate username, sending a specific error message on failure. */
Accounts.validateNewUser(function (user) {
  if (user) {
    const username = user.services.cas.id;
    if (username ) {
      return true;
    }
  }
  throw new Meteor.Error(403, 'User not in the allowed list');
});


if (!Meteor.settings.cas) {
  console.log('CAS settings not found! Hint: "meteor --settings ../config/settings.development.json"');
}
