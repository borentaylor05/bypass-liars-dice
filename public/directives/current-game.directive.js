'use strict';

angular.module('myApp')
  .directive('currentGame', currentGame);

/* @ngInject */
function currentGame() {
  return {
    templateUrl: 'templates/current-game.html',
    restrict: 'E',
    controller: 'CurrentGameController'
  };
}
