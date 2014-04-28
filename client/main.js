var SECONDS_FOR_INTRO_SNIPPET = 3.;
var SECONDS_FOR_SECOND_SNIPPET = 3.;

var currentSound = null;
var nextSound = null;

Meteor.startup(function() {
  Session.set("isInitialized", false);
  Session.set("isPlaying", false);          // Because there's no autoplay until a user event
  Session.set("isHoldingPlay", false);

  SC.initialize({
    client_id: "c77badb5b68bb339edd72aeb1048266c",
    redirect_uri: Meteor.absoluteUrl("server/soundcloud-callback.html")
  });

  // Set up the first track to play
  SC.stream("/tracks/293", function(sound){
    Session.set("isInitialized", true);
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

  secondSnippetStart = null;
  currentSound.options.whileplaying =
    function() {
      if (!Session.get("isHoldingPlay")) {
        if (this.position > SECONDS_FOR_INTRO_SNIPPET) {
          if (secondSnippetStart == null) {
            // Second snippet starts at halfway into the track
            // todo: Get the duration from the soundcloud API against the track URL?
            // todo: Pick the most commented portion of the song?
            secondSnippetStart = currentSound.durationEstimate / 1000. / 2;
            secondSnippetEnd = secondSnippetStart + SECONDS_FOR_SECOND_SNIPPET
            console.log(secondSnippetStart);
          }

/*
          if (this.position < secondSnippetStart) {
            sound.seek(secondSnippetStart * 1000.);
          }
          */
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
