var util = require("util");

var DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];

var Robot = module.exports = function Robot(options) {
  options = options || {};

  this.name = options.name;

  this.x = 0;
  this.y = 0;
  this.direction = "NORTH";
};

Robot.prototype.toString = function toString() {
  return util.format("X: %d, Y: %d, FACING: %s", this.x, this.y, this.direction);
};

Robot.prototype.place = function place(x, y, direction, dryRun) {
  if (typeof x === "string") {
    x = parseInt(x, 10);
  }

  if (typeof y === "string") {
    y = parseInt(y, 10);
  }  

  var newPosition = {
    x: x,
    y: y,
  };

  console.log(newPosition)

  if (!dryRun) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  return newPosition;
};

Robot.prototype.move = function move(dryRun) {
  var newPosition = {
    x: this.x,
    y: this.y,
  };

  switch (this.direction) {
  case "NORTH":
    newPosition.y++;
    break;
  case "SOUTH":
    newPosition.y--;
    break;
  case "EAST":
    newPosition.x++;
    break;
  case "WEST":
    newPosition.x--;
    break;
  }

  if (!dryRun) {
    this.place(newPosition.x, newPosition.y, this.direction);
  }

  return newPosition;
};

Robot.prototype.left = function left() {
  // if the index is 0, we'll pretend it's 4, so we can wrap back around to 3.
  // sneaky, right?
  this.direction = DIRECTIONS[(DIRECTIONS.indexOf(this.direction) || 4) - 1];
};

Robot.prototype.right = function right() {
  this.direction = DIRECTIONS[(DIRECTIONS.indexOf(this.direction) + 1) % 4];
};
