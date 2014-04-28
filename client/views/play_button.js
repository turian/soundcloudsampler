Template.playButton.helpers({
  isPlaying: function() { return Session.get('isPlaying'); },
  isHoldingPlay: function() { return Session.get('isHoldingPlay'); }
});

Template.playButton.configure_touch_control = function() {
    Meteor.defer(function() {
        var options = {
          dragLockToAxis: true,
          dragBlockHorizontal: true
        };
        hammertime = $('#play-btn').hammer(options);
        hammertime.on("dragright swiperight", function(event){
            event.preventDefault();
            event.gesture.preventDefault();
            nextTrack();
        });
        hammertime.on("dragleft swipeleft", function(event){
            event.preventDefault();
            event.gesture.preventDefault();
            previousTrack();
        });
        hammertime.on("hold", function(event) {
            event.preventDefault();
            event.gesture.preventDefault();
            Session.set("isHoldingPlay", true);
            console.log("hold");
//            hold();
        });
        hammertime.on("release", function(event) {
            event.preventDefault();
            event.gesture.preventDefault();
            Session.set("isHoldingPlay", false);
            console.log("release");
//            hold();
        });
    });
};
