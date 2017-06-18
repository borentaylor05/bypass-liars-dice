var app = angular.module('myApp');

app.controller('NewGameController', ['$rootScope', '$scope', 'gameService', function($rootScope, $scope, gameService) {
  // Public vars
  $rootScope.currentGameView = 'default';
  $scope.playersSelectOptions = _initPlayers();
  $scope.diceSelectOptions = _initDice();
  $scope.error = null;

  // Public functions
  $scope.startNewGame = startNewGame;
  $scope.checkValid = checkValid;

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
        // terrible, but I didn't want to implement a router
        $rootScope.currentGameView = 'currentGame';
      })
      .catch(function (err) {
        $scope.error = err.toString();
      });
  }

  function checkValid(selection) {
    if (selection) $scope.error = null;
  }

  // Helpers
  function _initPlayers() {
    var MAX_PLAYERS = 10;
    var MIN_PLAYERS = 2;
    var numPlayers = [];
    for (var i = MIN_PLAYERS; i <= MAX_PLAYERS; i++) {
      numPlayers.push(i);
    }

    return numPlayers;
  }

  function _initDice() {
    var MAX_DICE = 5;
    var MIN_DICE = 2;
    var numDice = [];
    for (var i = MIN_DICE; i <= MAX_DICE; i++) {
      numDice.push(i);
    }

    return numDice;
  }
}]);


// $scope.games = [
//     {
//       _id: '12345abcde',
//       numPlayers: 5,
//       numDice: 5,
//       actions: [
//         {
//           player: 1,
//           actionType: 'claim',
//           claimNumber: 4,
//           claimFace: 5
//         },
//         {
//           player: 0,
//           actionType: 'claim',
//           claimNumber: 3,
//           claimFace: 5
//         }
//       ],
//       playerHands: [
//         [1,2,3,4,5],
//         [5,4,3,2,1],
//         [1,1,1,1,1],
//         [3,3,3,3,3],
//         [6,3,6,1,2]
//       ]
//     }
//   ];