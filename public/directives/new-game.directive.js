'use strict';

angular.module('myApp')
  .directive('newGame', newGame);

/* @ngInject */
function newGame() {
  return {
    templateUrl: 'templates/new-game.html',
    restrict: 'E',
    controller: 'NewGameController'
  };
}
