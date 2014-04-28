var SECONDS_FOR_INTRO_SNIPPET = 3.;
var SECONDS_FOR_SECOND_SNIPPET = 3.;

var currentSound = null;
var nextSound = null;

var tracks = [
  "https://api.soundcloud.com/tracks/146289130",
  "https://api.soundcloud.com/tracks/145872358",
  "https://api.soundcloud.com/tracks/144665776",
  "https://api.soundcloud.com/tracks/143727661",
  "https://api.soundcloud.com/tracks/143947786",
  "https://api.soundcloud.com/tracks/138238151",
  "https://api.soundcloud.com/tracks/125338757",
  "https://api.soundcloud.com/tracks/142368545",
  "https://api.soundcloud.com/tracks/137695095",
  "https://api.soundcloud.com/tracks/91868931",
  "https://api.soundcloud.com/tracks/141162101",
  "https://api.soundcloud.com/tracks/140502175",
  "https://api.soundcloud.com/tracks/141829358",
  "https://api.soundcloud.com/tracks/106351074",
  "https://api.soundcloud.com/tracks/105660632",
  "https://api.soundcloud.com/tracks/17072745",
  "https://api.soundcloud.com/tracks/136065979",
  "https://api.soundcloud.com/tracks/131971137",
  "https://api.soundcloud.com/tracks/116246725",
  "https://api.soundcloud.com/tracks/131827025",
  "https://api.soundcloud.com/tracks/132098028",
  "https://api.soundcloud.com/tracks/130676015",
  "https://api.soundcloud.com/tracks/130919378",
  "https://api.soundcloud.com/tracks/131885125",
  "https://api.soundcloud.com/tracks/131641157",
  "https://api.soundcloud.com/tracks/25772654",
  "https://api.soundcloud.com/tracks/66571969",
  "https://api.soundcloud.com/tracks/129802881",
  "https://api.soundcloud.com/tracks/25437633",
  "https://api.soundcloud.com/tracks/128280453",
  "https://api.soundcloud.com/tracks/120983698",
  "https://api.soundcloud.com/tracks/128745123",
  "https://api.soundcloud.com/tracks/128762398",
  "https://api.soundcloud.com/tracks/67113901",
  "https://api.soundcloud.com/tracks/126290539",
  "https://api.soundcloud.com/tracks/115471049",
  "https://api.soundcloud.com/tracks/125535516",
  "https://api.soundcloud.com/tracks/125535514",
  "https://api.soundcloud.com/tracks/122780669",
  "https://api.soundcloud.com/tracks/113701897",
  "https://api.soundcloud.com/tracks/124286209",
  "https://api.soundcloud.com/tracks/123045835",
  "https://api.soundcloud.com/tracks/122411977",
  "https://api.soundcloud.com/tracks/29013182",
  "https://api.soundcloud.com/tracks/120106438",
  "https://api.soundcloud.com/tracks/116681216",
  "https://api.soundcloud.com/tracks/77514322",
  "https://api.soundcloud.com/tracks/118710272",
  "https://api.soundcloud.com/tracks/49816643",
];
var trackNo = 0;

Meteor.startup(function() {
  Session.set("isInitialized", false);
  Session.set("isPlaying", false);          // Because there's no autoplay until a user event
  Session.set("isHoldingPlay", false);

  SC.initialize({
    client_id: "c77badb5b68bb339edd72aeb1048266c",
    redirect_uri: Meteor.absoluteUrl("server/soundcloud-callback.html")
  });

  // Set up the first track to play
  SC.stream(tracks[trackNo], function(sound){
    Session.set("isInitialized", true);
    currentSound = sound;
    Session.set("currentTrack.url", sound.url);
  });
});

nextTrack = function() {
  currentSound.stop();
  trackNo += 1

  SC.stream(tracks[trackNo], function(sound){
    Session.set("isInitialized", true);
    currentSound = sound;
    Session.set("currentTrack.url", sound.url);
    startTrack();
  });
}

startTrack = function() {
/*
  // Wait until currentSound is ready
  // TODO: Don't wait indefinitely
  while(currentSound == null) { }
*/

  Session.set("isPlaying", true);

  Session.set("currentTrack.haveSecondSnippetPosition", false);
  Session.set("currentTrack.playedSecondSnippet", false);

  currentSound.options.whileplaying =
    function() {
      Session.set("currentTrack.position", currentSound.position);
      if (!Session.get("isHoldingPlay")) {
        if (this.position > SECONDS_FOR_INTRO_SNIPPET * 1000.) {
          if (!Session.get("currentTrack.haveSecondSnippetPosition")) {
            Session.set("currentTrack.haveSecondSnippetPosition", true);
            // Second snippet starts at halfway into the track
            // todo: Get the duration from the soundcloud API against the track URL?
            // todo: Pick the most commented portion of the song?
            Session.set("currentTrack.secondSnippetStart", currentSound.durationEstimate / 1000. / 2);
            Session.set("currentTrack.secondSnippetEnd",
              Session.get("currentTrack.secondSnippetStart") + SECONDS_FOR_SECOND_SNIPPET);
          }

          if (this.position < Session.get("currentTrack.secondSnippetStart") * 1000. &&
              !Session.get("currentTrack.playedSecondSnippet")) {
            Session.set("currentTrack.playedSecondSnippet", true);  // Only want to try playing the second snippet once

            // TODO: What to do if currentSound.duration < secondSnippetStart * 1000.
            // i.e. the sound isn't loaded enough?
            currentSound.setPosition(Session.get("currentTrack.secondSnippetStart") * 1000.);
          }

          if (this.position > Session.get("currentTrack.secondSnippetEnd") * 1000.) {
            console.log("next track");
            nextTrack();
          }
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
