var Robot = require("./robot");

var Game = module.exports = function Game(options) {
  options = options || {};

  var width = 5,
      height = 5;

  if (typeof options.width === "string") {
    width = parseInt(options.width, 10);
  } else if (typeof options.width === "number") {
    width = options.width;
  }

  if (typeof options.height === "string") {
    height = parseInt(options.height, 10);
  } else if (typeof options.height === "number") {
    height = options.height;
  }

  if (typeof width !== "number" || typeof height !== "number" || Number.isNaN(width) || Number.isNaN(height)) {
    throw new Error("invalid width/height type(s)");
  }

  if (Math.round(width) !== width || Math.round(height) !== height || width < 1 || height < 1) {
    throw new Error("invalid width/height value(s)");
  }

  this.width = width;
  this.height = height;

  this.robots = [];
};

Game.prototype.addRobot = function addRobot(robot) {
  if (typeof robot.place !== "function" || typeof robot.move !== "function" || typeof robot.left !== "function" || typeof robot.right !== "function" || typeof robot.report !== "function") {
    throw new Error("robot doesn't support the methods required");
  }

  this.robots.push(robot);
};

Game.prototype.validPosition = function validPosition(position) {
  return position.x >= 0 && position.y >= 0 && position.x < this.width && position.y < this.height;
};
