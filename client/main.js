var currentSound;
Meteor.startup(function() {
  Session.set("isPlaying", false);          // Because there's no autoplay until a user event
  Session.set("isHoldingPlay", false);

  SC.initialize({
    client_id: "c77badb5b68bb339edd72aeb1048266c",
    redirect_uri: Meteor.absoluteUrl("server/soundcloud-callback.html")
  });

  // Set up the first track to play
  SC.stream("/tracks/293", function(sound){
    currentSound = sound;
  });
});

startTrack = function(trackUrl) {
  Session.set("isPlaying", true);
  currentSound.play();
}
