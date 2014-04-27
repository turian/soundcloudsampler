(function () {
  var container = document.querySelector('ul'),
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
          alert(track.title);
          html += [
            '<li class=track data-stream=', track.stream_url, CLIENT_ID,
              '<b>', track.title, '</b>',
            '</li>'
          ].join('');
        });
        container.innerHTML = html;
      });

      container.addEventListener('click', function (e) {
        var track = e.target.parentNode;
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
