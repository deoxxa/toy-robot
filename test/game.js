var assert = require("chai").assert;

var path = global.__steamshovel ? "../lib-cov" : "../lib";

var Game = require(path + "/game"),
    Robot = require(path + "/robot");

describe("Game", function() {
  it("should be constructed successfully with no arguments", function() {
    var game = new Game();

    assert.equal(game.width, 5);
    assert.equal(game.height, 5);
    assert.isArray(game.robots);
    assert.lengthOf(game.robots, 0);
  });

  it("should be constructed successfully with correct arguments", function() {
    var game = new Game({
      width: 1,
      height: 1,
    });

    assert.equal(game.width, 1);
    assert.equal(game.height, 1);
    assert.isArray(game.robots);
    assert.lengthOf(game.robots, 0);
  });

  it("should fail to be constructed with incorrect argument types", function() {
    assert.throws(function() {
      var game = new Game({
        width: "what",
        height: "oh dear",
      });
    });
  });

  it("should fail to be constructed with non-integer argument values", function() {
    assert.throws(function() {
      var game = new Game({
        width: 1.5,
        height: 1.5,
      });
    });
  });

  it("should fail to be constructed with negative argument values", function() {
    assert.throws(function() {
      var game = new Game({
        width: -1,
        height: -1,
      });
    });
  });

  it("should successfully add a robot to the game", function() {
    var game = new Game();

    assert.lengthOf(game.robots, 0);
    game.addRobot(new Robot());
    assert.lengthOf(game.robots, 1);
  });

  it("should fail to add a non-robot to the game", function() {
    var game = new Game();

    assert.lengthOf(game.robots, 0);

    assert.throws(function() {
      game.addRobot({});
    });

    assert.lengthOf(game.robots, 0);
  });

  it("should report a valid position as such", function() {
    var game = new Game();

    assert.isTrue(game.validPosition({x: 2, y: 2}));
  });

  it("should report an invalid (too big) position as such", function() {
    var game = new Game();

    assert.isFalse(game.validPosition({x: 10, y: 10}));
  });

  it("should report an invalid (too small) position as such", function() {
    var game = new Game();

    assert.isFalse(game.validPosition({x: -10, y: -10}));
  });
});
