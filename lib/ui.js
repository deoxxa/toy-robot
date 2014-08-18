var events = require("events"),
    readline = require("readline"),
    wordwrap = require("wordwrap");

var RDL = require("./rdl");

var commands = {
  PLACE: {
    syntax: "PLACE X,Y,DIRECTION",
    help: "PLACE WILL PUT THE TOY ROBOT ON THE TABLE IN POSITION X,Y AND FACING NORTH, SOUTH, EAST OR WEST",
  },
  MOVE: {
    help: "MOVE WILL MOVE THE TOY ROBOT ONE UNIT FORWARD IN THE DIRECTION IT IS CURRENTLY FACING",
  },
  LEFT: {
    help: "LEFT WILL ROTATE THE ROBOT 90 DEGREES COUNTERCLOCKWISE WITHOUT CHANGING THE POSITION OF THE ROBOT",
  },
  RIGHT: {
    help: "RIGHT WILL ROTATE THE ROBOT 90 DEGREES CLOCKWISE WITHOUT CHANGING THE POSITION OF THE ROBOT",
  },
  REPORT: {
    help: "REPORT WILL ANNOUNCE THE X, Y, AND F OF THE ROBOT",
  },
  HELP: {
    syntax: "HELP <COMMAND>",
    help: "SERIOUSLY? COME ON. IT'S A HELP COMMAND.",
  },
};

var UI = module.exports = function UI(options) {
  events.EventEmitter.call(this);

  options = options || {};

  this.game = options.game;
  this.robot = options.robot;
  this.input = options.input;
  this.output = options.output;

  this.rl = readline.createInterface({
    input: this.input,
    output: this.output,
  });

  this.rl.on("line", this.onLine.bind(this));
};
UI.prototype = Object.create(events.EventEmitter.prototype, {constructor: {value: UI}});

UI.prototype.onLine = function onLine(line) {
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
  for (var k in commands) {
    this.line("  " + (commands[k].syntax || k) + "");
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
  } else if (commands[cmd.command] && commands[cmd.command].help) {
    this.line("[!] HELP FOR COMMAND `" + cmd.command + "`");
    this.line();
    this.line("SYNTAX: " + (commands[cmd.command].syntax || cmd.command) + "");
    this.line();
    this.line(wordwrap(80)(commands[cmd.command].help) + "");
  } else {
    this.line("[!] COMMAND `" + cmd.command + "` DOESN'T EXIST");
  }

  this.line();

  this.rl.prompt();
};

UI.prototype.place = function place(cmd) {
  if (!this.game.validPosition(this.robot.place(cmd.x, cmd.y, cmd.direction, true))) {
    return this.error(Error("place would result in invalid position"));
  }

  this.robot.place(cmd.x, cmd.y, cmd.direction);

  this.report();
};

UI.prototype.move = function move(cmd) {
  if (!this.game.validPosition(this.robot.move(true))) {
    return this.error(Error("move would result in invalid position"));
  }

  this.robot.move();

  this.report();
};

UI.prototype.left = function left(cmd) {
  this.robot.left();

  this.report();
};

UI.prototype.right = function right(cmd) {
  this.robot.right();

  this.report();
};

UI.prototype.report = function report(cmd) {
  this.line();
  this.line(this.robot.toString());
  this.line();

  this.rl.prompt();
};
