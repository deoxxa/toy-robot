var Robot = require("./robot");

var Game = module.exports = function Game(options) {
  options = options || {};

  this.width = options.width || 5;
  this.height = options.height || 5;

  this.robots = [];
};

Game.prototype.addRobot = function addRobot(robot) {
  this.robots.push(robot);
};

Game.prototype.validPosition = function validPosition(position) {
  return position.x >= 0 && position.y >= 0 && position.x < this.width && position.y < this.height;
};
