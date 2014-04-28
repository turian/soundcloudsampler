Meteor.startup(function() {
  Session.set("isPlaying", false);          // Because there's no autoplay until a user event
  Session.set("isHoldingPlay", false);
});

var container = $('#tracklist'),
    CLIENT_ID = '?client_id=c77badb5b68bb339edd72aeb1048266c>';

var audio5js = new Audio5js({
  swf_path:'/swf/audio5js.swf',
  throw_errors: true,
  ready: function () {
    player = this;

    SC.initialize({
      client_id: "c77badb5b68bb339edd72aeb1048266c",
      redirect_uri: Meteor.absoluteUrl("server/soundcloud-callback.html")
    });

    player.on('canplay', function(){
      player.play();
    });
  }
});

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
