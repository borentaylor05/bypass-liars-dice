var app = angular.module('myApp');

app.controller('NewGameController', ['$scope', 'gameService', function($scope, gameService) {
  // Public vars
  $scope.playersSelectOptions = _initPlayers();
  $scope.diceSelectOptions = _initDice();
  $scope.error = null;

  // Public functions
  $scope.checkValid = checkValid;
  $scope.startNewGame = startNewGame;

  activate();

  /////////////////////////////////////

  function activate() {
    gameService.setGameView('startGame');
  }

  function checkValid(selection) {
    if (selection) $scope.error = null;
  }

  function startNewGame(numPlayers, numDice) {
    $scope.error = null; // reset error
    if (!numPlayers) {
      $scope.error = 'You must select the number of players';
      return;
    }

    if (!numDice) {
      $scope.error = 'You must select the number of dice per player';
      return;
    }
    
    var options = {
      numPlayers: numPlayers,
      numDice: numDice
    };

    gameService.startNewGame(options)
      .then(function (game) {
        gameService.setCurrentGame(game);
        gameService.setGameView('currentGame');
      })
      .catch(function (err) {
        $scope.error = err.toString();
      });
  }

  // Helpers
  function _initDice() {
    var MAX_DICE = 5;
    var MIN_DICE = 2;
    var numDice = [];
    for (var i = MIN_DICE; i <= MAX_DICE; i++) {
      numDice.push(i);
    }

    return numDice;
  }

  function _initPlayers() {
    var MAX_PLAYERS = 10;
    var MIN_PLAYERS = 2;
    var numPlayers = [];
    for (var i = MIN_PLAYERS; i <= MAX_PLAYERS; i++) {
      numPlayers.push(i);
    }

    return numPlayers;
  }
}]);
