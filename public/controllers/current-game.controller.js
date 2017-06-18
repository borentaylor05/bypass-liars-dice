var app = angular.module('myApp');

app.controller('CurrentGameController', ['$rootScope', '$scope', 'gameService', function($rootScope, $scope, gameService) {
  // Public vars
  $scope.game = null;
  $scope.visibleMoves = {};
  $scope.title = 'Click Button to View Current Game';

  // Public functions
  $scope.getCurrentGame = getCurrentGame;
  $scope.makeClaim = makeClaim;
  $scope.makeChallenge = makeChallenge;
  $scope.setVisibility = setVisibility;
  $scope.showPlayerMoves = showPlayerMoves;
  $scope.startNewGame = startNewGame;

  /////////////////////////////////////

  function getCurrentGame() {
    gameService.getCurrentGame()
      .then(function (game) {
        $scope.game = game;
        $scope.currentTurn = 0;
        $scope.currentPlayer = 0;
        $scope.title = 'Current Game';
      })
      .catch(_handleError);
  }

  function makeClaim(playerId, claim) {
    var options = {
      player: playerId,
      moveNumber: $scope.currentTurn + 1,
      moveFace: $scope.currentTurn + 1, // not sure what this is
      claimNumber: claim.value,
      claimFace: claim.face
    };

    gameService.makeClaim(options)
      .then(function (results) {
        $scope.hasPreviousClaim = gameService.getHasPreviousClaim();
        _nextTurn();
      })
      .catch(_handleError);
  }

  function makeChallenge(currentPlayer) {
    gameService.challenge(currentPlayer)
      .then(function (result) {
        var status = result ? 'CORRECT!' : 'INCORRECT!';
        $scope.challengeResult = 'Player ' + (currentPlayer + 1) + ' challenged and was ' + status;
        _nextTurn();
      })
      .catch(_handleError);
  }

  function showPlayerMoves(playerId) {
    setVisibility(playerId, true);
    $scope.playerMoves = gameService.getPlayerMoves(playerId);
  }

  function setVisibility(playerId, isVisible) {
    $scope.visibleMoves[playerId] = isVisible;
  }

  function startNewGame() {
    gameService.setGameView('startGame');
  }

  // Helpers

  function _nextTurn() {
    $scope.currentTurn++;
    $scope.currentPlayer = $scope.currentTurn % parseInt($scope.game.numPlayers);
  }

  function _handleError(err) {
    $scope.error = err.toString();
  }
}]);
