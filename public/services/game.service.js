var app = angular.module('myApp');

app.service('gameService', ['$http', '$rootScope', function($http, $rootScope) {
  var BASE_URL = 'http://localhost:8080'; // would normally be in config
  var currentGame = null;
  var hasPreviousClaim = false;
  var gameState = {};

  return {
    challenge: challenge,
    getCurrentGame: getCurrentGame,
    getPlayerMoves: getPlayerMoves,
    getHasPreviousClaim: getHasPreviousClaim,
    makeClaim: makeClaim,
    setCurrentGame: setCurrentGame,
    setGameView: setGameView,
    startNewGame: startNewGame
  };

  /////////////////////////////////////

  function challenge(playerId) {
    var CHALLENGE_URL = BASE_URL + '/games/' + currentGame._id + '/challenge';
    
    return $http.post(CHALLENGE_URL, { player: playerId })
      .then(function (results) {
        _checkError(results);
        
        _addMove('challenge', playerId, { success: results.data });

        return results.data;
      });
  }

  function getCurrentGame() {
    var gameId = currentGame && currentGame._id;
    var CURRENT_GAME_URL = BASE_URL + '/games/' + gameId;

    return $http.get(CURRENT_GAME_URL)
      .then(function (game) {
        _checkError(game);

        return game.data;
      });
  }

  function getHasPreviousClaim() {
    return hasPreviousClaim;
  }

  function getPlayerMoves(playerId) {
    return gameState[playerId] || [];
  }

  function makeClaim(options) {
    var CLAIM_URL = BASE_URL + '/games/' + currentGame._id + '/claim';
    
    return $http.post(CLAIM_URL, options)
      .then(function (results) {
        _checkError(results);
        
        _addMove('claim', options.player, options);
        hasPreviousClaim = true;

        return results.data;
      });
  }

  function setGameView(view) {
    // terrible, but I didn't want to implement a router
    $rootScope.gameView = view;
  }

  function setCurrentGame(game) {
    currentGame = game; 
  }
  
  function startNewGame(gameOptions) {
    var NEW_GAME_URL = BASE_URL + '/games';
    var DEFAULT_NUM_PLAYERS = 4;
    var DEFAULT_NUM_DICE = 2;

    gameOptions.numPlayers = gameOptions.numPlayers || DEFAULT_NUM_PLAYERS;
    gameOptions.numDice = gameOptions.numDice || DEFAULT_NUM_DICE;

    return $http.post(NEW_GAME_URL, gameOptions)
      .then(function (game) {
        _checkError(game);

        return game.data;
      });
  }

  // Helpers
  function _addMove(type, playerId, moveInfo) {
    console.log(gameState);
    if (!gameState[playerId]) {
      gameState[playerId] = {
        moves: [
          { type: type, details: moveInfo }
        ]
      };

      return;
    }

    return gameState[playerId].moves.push({ type: type, details: moveInfo });
  }

  function _checkError(results) {
    if (results.data && results.data.error) {
      throw new Error(results.data.error);
    }
  }
}]);