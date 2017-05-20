/* globals angular, SC, console */

angular.module('appController', [])
  .controller('mainController', function ($scope, $http, soundcloud) {
    var searchCallback = function (data) {
      $scope.$apply(function () {
        $scope.tracks = data;
        $scope.query = '';
      });
    };

    soundcloud.init();

    $scope.search = function () {
      var q = $scope.query;
      if(q.length>0)
        soundcloud.search($scope.query, searchCallback);
    };
    
    $scope.play = function(track_id){
      soundcloud.play(track_id);
      //Change icon
      $scope.clicked = true;
    };
    
    $scope.pause = function(track_id){
      soundcloud.pause();
      //Change icon
      $scope.clicked = false;
    };
  });