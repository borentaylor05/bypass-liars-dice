var app = angular.module('myApp');

app.service('gameService', ['$http', function($http) {
  var BASE_URL = 'http://localhost:8080'; // would normally be in config
  var currentGame = null;

  return {
    getCurrentGame: getCurrentGame,
    setCurrentGame: setCurrentGame,
    startNewGame: startNewGame
  };

  function setCurrentGame(game) {
    currentGame = game; 
  }

  function getCurrentGame() {
    var gameId = currentGame && currentGame._id;
    var CURRENT_GAME_URL = BASE_URL + '/games/' + gameId;
    $http.get(CURRENT_GAME_URL)
      .then(function (game) {
        return game.data;
      });
  }
  
  // New Game - POST /games - num of players
  function startNewGame(gameOptions) {
    var NEW_GAME_URL = BASE_URL + '/games';
    var DEFAULT_NUM_PLAYERS = 4;
    var DEFAULT_NUM_DICE = 3;

    gameOptions.numPlayers = gameOptions.numPlayers || DEFAULT_NUM_PLAYERS;
    gameOptions.numDice = gameOptions.numDice || DEFAULT_NUM_DICE;

    return $http.post(NEW_GAME_URL, gameOptions)
      .then(function (game) {
        if (game.data && game.data.error) {
          throw new Error(game.data.error);
        }

        return game.data;
      });
  }
  // Make Move - player A put X number of dice with face Y on board
  // Cah
}]);