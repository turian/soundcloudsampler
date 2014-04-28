Template.startPlayback.helpers({
  isInitialized: function() { return Session.get('isInitialized'); },
  isPlaying: function() { return Session.get('isPlaying'); }
});

Template.startPlayback.events({
  "click": function(e) {
    startTrack();
  }
});
