var assert = require("chai").assert,
    expect = require("stream-expect"),
    stream = require("stream");

var path = global.__steamshovel ? "../lib-cov" : "../lib";

var Game = require(path + "/game"),
    Robot = require(path + "/robot"),
    UI = require(path + "/ui");

describe("UI", function() {
  var s = null;

  before(function() {
    var game = new Game(),
        robot = new Robot(),
        input = new stream.PassThrough(),
        output = new stream.PassThrough();

    game.addRobot(robot);

    var ui = new UI({
      game: game,
      robot: robot,
      input: input,
      output: output,
    });

    ui.init();

    s = expect.createExpect(output, input);
  });

  it("should show the welcome message", function(done) {
    s.expect(/WELCOME TO ROBOT SIMULATOR 5000/, function(err, output, match) {
      return done(err);
    });
  });

  it("should return an error for invalid input", function(done) {
    s.expect(/ERROR PARSING COMMAND/, function(err, output, match) {
      return done(err);
    }).send("INVALIDCOMMAND\n");
  });

  it("should be snarky if we ask for help", function(done) {
    s.expect(/SILLY HUMAN, SPECIFY WHAT YOU WANT HELP WITH/, function(err, output, match) {
      return done(err);
    }).send("HELP\n");
  });

  it("should help us with the PLACE command", function(done) {
    s.expect(/PLACE WILL PUT THE ROBOT ON THE TABLE IN POSITION/, function(err, output, match) {
      return done(err);
    }).send("HELP PLACE\n");
  });

  it("should help us with the MOVE command", function(done) {
    s.expect(/MOVE WILL MOVE THE ROBOT ONE UNIT FORWARD/, function(err, output, match) {
      return done(err);
    }).send("HELP MOVE\n");
  });

  it("should help us with the LEFT command", function(done) {
    s.expect(/LEFT WILL ROTATE THE ROBOT 90 DEGREES COUNTERCLOCKWISE/, function(err, output, match) {
      return done(err);
    }).send("HELP LEFT\n");
  });

  it("should help us with the RIGHT command", function(done) {
    s.expect(/RIGHT WILL ROTATE THE ROBOT 90 DEGREES CLOCKWISE/, function(err, output, match) {
      return done(err);
    }).send("HELP RIGHT\n");
  });

  it("should help us with the REPORT command", function(done) {
    s.expect(/REPORT WILL ANNOUNCE THE X, Y, AND DIRECTION OF THE ROBOT/, function(err, output, match) {
      return done(err);
    }).send("HELP REPORT\n");
  });

  it("should be a jerk about the HELP command", function(done) {
    s.expect(/WHAT ARE YOU, 5 YEARS OLD\?/, function(err, output, match) {
      return done(err);
    }).send("HELP HELP\n");
  });

  it("should return an error if a MOVE command is entered without placement", function(done) {
    s.expect(/ERROR: CAN'T MOVE WITHOUT BEING PLACED/, function(err, output, match) {
      return done(err);
    }).send("MOVE\n");
  });

  it("should return an error if a LEFT command is entered without placement", function(done) {
    s.expect(/ERROR: CAN'T TURN WITHOUT BEING PLACED/, function(err, output, match) {
      return done(err);
    }).send("LEFT\n");
  });

  it("should return an error if a RIGHT command is entered without placement", function(done) {
    s.expect(/ERROR: CAN'T TURN WITHOUT BEING PLACED/, function(err, output, match) {
      return done(err);
    }).send("RIGHT\n");
  });

  it("should report a null position if a placement hasn't been made yet", function(done) {
    s.expect(/X: null, Y: null, FACING: null/, function(err, output, match) {
      return done(err);
    }).send("REPORT\n");
  });

  it("should place the robot correctly", function(done) {
    s.expect(/X: 0, Y: 0, FACING: NORTH/, function(err, output, match) {
      return done(err);
    }).send("PLACE 0,0,NORTH\n");
  });

  it("should move the robot correctly", function(done) {
    s.expect(/X: 0, Y: 1, FACING: NORTH/, function(err, output, match) {
      return done(err);
    }).send("PLACE 0,0,NORTH\nMOVE\n");
  });

  it("should turn the robot left correctly", function(done) {
    s.expect(/X: 0, Y: 0, FACING: WEST/, function(err, output, match) {
      return done(err);
    }).send("PLACE 0,0,NORTH\nLEFT\n");
  });

  it("should turn the robot right correctly", function(done) {
    s.expect(/X: 0, Y: 0, FACING: EAST/, function(err, output, match) {
      return done(err);
    }).send("PLACE 0,0,NORTH\nRIGHT\n");
  });
});
