var SECONDS_FOR_INTRO_SNIPPET = 3.;
var SECONDS_FOR_MIDDLE_SNIPPET = 3.;

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
    Session.set("currentTrack.url", sound.url);
    // Set up the next track to play
    SC.stream("/tracks/294", function(sound){
      nextSound = sound;
    });
  });
});

startTrack = function() {
/*
  // Wait until currentSound is ready
  // TODO: Don't wait indefinitely
  while(currentSound == null) { }
*/

  currentSound.options.whileplaying =
    function() {
      if (!Session.get("isHoldingPlay")) {
        if (this.position > SECONDS_FOR_INTRO_SNIPPET) {
        } else {
          // We're still at the beginning of the track
        }
      } else {
        // if end of track ..
      }
//    if (this.position > SECONDS_FOR_INTRO_SNIPPET && !Session.get("isHoldingPlay"))
//    console.log(this.position + " " + Session.get("isHoldingPlay"));
    };
  currentSound.play();
}
