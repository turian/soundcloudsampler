Template.trackList.events({
  "click": function(e) {
    alert("click");
    player.load("http://api.soundcloud.com/tracks/146663487/stream?client_id=c77badb5b68bb339edd72aeb1048266c");
  }
});
