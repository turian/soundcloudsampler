Template.startPlayback.helpers({
  isPlaying: function() { return Session.get('isPlaying'); }
});

Template.startPlayback.events({
  "click": function(e) {
    startTrack();
  }
});
