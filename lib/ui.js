var readline = require("readline"),
    util = require("util"),
    wordwrap = require("wordwrap");

var RDL = require("./rdl");

var COMMANDS = {
  PLACE: {
    syntax: "PLACE X,Y,DIRECTION",
    help: "PLACE WILL PUT THE ROBOT ON THE TABLE IN POSITION X,Y AND FACING NORTH, SOUTH, EAST OR WEST",
  },
  MOVE: {
    help: "MOVE WILL MOVE THE ROBOT ONE UNIT FORWARD IN THE DIRECTION IT IS CURRENTLY FACING",
  },
  LEFT: {
    help: "LEFT WILL ROTATE THE ROBOT 90 DEGREES COUNTERCLOCKWISE WITHOUT CHANGING THE POSITION OF THE ROBOT",
  },
  RIGHT: {
    help: "RIGHT WILL ROTATE THE ROBOT 90 DEGREES CLOCKWISE WITHOUT CHANGING THE POSITION OF THE ROBOT",
  },
  REPORT: {
    help: "REPORT WILL ANNOUNCE THE X, Y, AND DIRECTION OF THE ROBOT",
  },
  HELP: {
    syntax: "HELP <COMMAND>",
    help: "WHAT ARE YOU, 5 YEARS OLD? \"HELP HELP?\" \"NO NO.\"",
  },
};

var UI = module.exports = function UI(options) {
  options = options || {};

  this.game = options.game;
  this.robot = options.robot;
  this.input = options.input;
  this.output = options.output;

  this.rl = readline.createInterface({
    input: this.input,
    output: this.output,
  });

  this.rl.on("line", function onLine(line) {
    try {
      cmd = RDL.parse(line);
    } catch (e) {
      return this.commandError(e);
    }

    switch (cmd.type) {
      case "help": return this.help(cmd);
      case "place": return this.place(cmd);
      case "move": return this.move(cmd);
      case "left": return this.left(cmd);
      case "right": return this.right(cmd);
      case "report": return this.report(cmd);
      default: return this.unknownCommand(cmd);
    }
  }.bind(this));
};

UI.prototype.send = function send(data) {
  this.output.write(data);
};

UI.prototype.line = function line(line) {
  this.send((line || "") + "\n");
};

UI.prototype.init = function init() {
  this.line();
  this.line("[!] WELCOME TO ROBOT SIMULATOR 5000");
  this.line();
  this.sendCommandList();
  this.line();

  this.rl.prompt();
};

UI.prototype.sendCommandList = function sendCommandList() {
  this.line("SUPPORTED COMMANDS ARE:");
  this.line();
  for (var k in COMMANDS) {
    this.line("  " + (COMMANDS[k].syntax || k) + "");
  }
};

UI.prototype.sendError = function error(err, message) {
  this.line("[!] " + (message || "ERROR") + ": " + err.message.toUpperCase() + "");
};

UI.prototype.commandError = function commandError(err) {
  this.line();
  this.sendError(err, "ERROR PARSING COMMAND");
  this.line();
  this.sendCommandList();
  this.line();

  this.rl.prompt();
};

UI.prototype.error = function error(err, message) {
  this.line();
  this.sendError(err, message);
  this.line();

  this.rl.prompt();
};

UI.prototype.unknownCommand = function unknownCommand(cmd) {
  return this.error(Error("unrecognised command"), "UNKNOWN COMMAND `" + cmd.type.toUpperCase() + "`");
};

UI.prototype.help = function help(cmd) {
  this.line();

  if (cmd.command === null) {
    this.line("[!] SILLY HUMAN, SPECIFY WHAT YOU WANT HELP WITH");
    this.line();
    this.sendCommandList();
  } else if (COMMANDS[cmd.command] && COMMANDS[cmd.command].help) {
    this.line("[!] HELP FOR COMMAND `" + cmd.command + "`");
    this.line();
    this.line("SYNTAX: " + (COMMANDS[cmd.command].syntax || cmd.command) + "");
    this.line();
    this.line(wordwrap(80)(COMMANDS[cmd.command].help) + "");
  } else {
    this.line("[!] COMMAND `" + cmd.command + "` DOESN'T EXIST");
  }

  this.line();

  this.rl.prompt();
};

UI.prototype.place = function place(cmd) {
  try {
    if (!this.game.validPosition(this.robot.place(cmd.x, cmd.y, cmd.direction, true))) {
      return this.error(Error("place would result in invalid position"));
    }

    this.robot.place(cmd.x, cmd.y, cmd.direction);
  } catch (e) {
    return this.error(e);
  }

  this.report();
};

UI.prototype.move = function move(cmd) {
  try {
    if (!this.game.validPosition(this.robot.move(true))) {
      return this.error(Error("move would result in invalid position"));
    }

    this.robot.move();
  } catch (e) {
    return this.error(e);
  }

  this.report();
};

UI.prototype.left = function left(cmd) {
  try {
    this.robot.left();
  } catch (e) {
    return this.error(e);
  }

  this.report();
};

UI.prototype.right = function right(cmd) {
  try {
    this.robot.right();
  } catch (e) {
    return this.error(e);
  }

  this.report();
};

UI.prototype.report = function report(cmd) {
  var position = this.robot.report();

  this.line();
  this.line(util.format("X: %s, Y: %s, FACING: %s", position.x, position.y, position.direction));
  this.line();

  this.rl.prompt();
};
