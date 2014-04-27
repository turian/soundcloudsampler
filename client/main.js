var container = $('#tracklist'),
    CLIENT_ID = '?client_id=c77badb5b68bb339edd72aeb1048266c>';

var audio5js = new Audio5js({
  swf_path:'/swf/audio5js.swf',
  throw_errors: true,
  ready: function () {
    player = this;

    SC.initialize({
      client_id: "c77badb5b68bb339edd72aeb1048266c"
    });

    player.on('canplay', function(){
      player.play();
    });
  }
});
