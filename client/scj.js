(function () {
  var container = $('#tracklist'),
      CLIENT_ID = '?client_id=c77badb5b68bb339edd72aeb1048266c>';

  var audio5js = new Audio5js({
    swf_path:'../../swf/audio5js.swf',
    throw_errors: true,
    ready: function () {
      var player = this;

      SC.initialize({
        client_id: "c77badb5b68bb339edd72aeb1048266c"
      });

      player.on('canplay', function(){
        player.play();
      });

      // get last 10 tracks from SoundCloud and show them
      SC.get("/tracks", { limit: 10 }, function (tracks) {
        var html = "";
        tracks.forEach(function (track) {
          html += [
            '<li class=track data-stream=', track.stream_url, CLIENT_ID,
              '<b>', track.title, '</b>',
            '</li>'
          ].join('');
        });
        console.log(html);
        container.html(html);
      });

//      container.click(function (e) {
      console.log($('#tl2'));
      $('#tl2').click(function (e) {
        var track = e.target.parentNode;
        console.log(track);
        if (track.className.indexOf('track') !== -1) {
          var url = track.getAttribute('data-stream');
          if(player.playing){
            player.pause();
          }
          player.load(url);
        }
      });
    }
  });
}());
