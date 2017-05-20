/* globals angular*/

angular.module('appService', []).
factory('soundcloud', function ($http) {
  var api_key = 'ed593614e385ae1af9a2b0ab27792dfa';
  var currentSound;
  //  var mytracks = [];

  return {
    init: function () {
      // Here actually load the third party sdk and initialize it with api key
      SC.initialize({
        client_id: api_key
      });
      //User history tracks
      //      return myTracks;
    },
    search: function (query, callback) {
      SC.get('/tracks/', {
        q: query
      }, callback);
    },
    play: function (track_id) {
      this.stop();
      SC.stream('/tracks/' + track_id, function (sound) {
        sound.play();
        currentSound = sound;
      });
    },
    pause: function () {
      if (currentSound) {
        currentSound.pause();
      }
    },
    stop: function () {
      if (currentSound) {
        currentSound.stop();
      }
    }
  };
});