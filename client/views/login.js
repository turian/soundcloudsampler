Template.login.events({
  'click': function(e) {
    e.preventDefault();
    SC.connect(function() {
      // if SoundCloud login is valid, simply 'log in' locally with the SC user's ID
      // it's a hack, but for now simple meteor-handled, SC-validated account & session management should suffice for now
      SC.get('/me', function(user) {
/*
        Meteor.loginWithPassword(user.username, user.id, function (error) {
          if (error)
            // create a new 'user' if they don't exist
            Accounts.createUser({username: user.username, password: user.id});
        });
*/
      });
    });
  }
});

