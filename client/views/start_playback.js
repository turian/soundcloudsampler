Template.startPlayback.helpers({
  isPlaying: function() { return Session.get('isPlaying'); }
});

Template.startPlayback.events({
  "click": function(e) {
    player.load("http://api.soundcloud.com/tracks/146289130/stream?client_id=c77badb5b68bb339edd72aeb1048266c");
    Session.set("isPlaying", true);
  }
});
