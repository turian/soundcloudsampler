var currentSound = null;
var nextSound = null;
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
    // Set up the next track to play
    SC.stream("/tracks/294", function(sound){
      nextSound = sound;
    });
  });
});

startTrack = function(trackUrl) {
  Session.set("isPlaying", true);

/*
  // Wait until currentSound is ready
  // TODO: Don't wait indefinitely
  while(currentSound == null) { }
*/

  currentSound.options.whileplaying =
    function() {
      console.log(this.position + " " + Session.get("isHoldingPlay"));
    };
  currentSound.play();
}
