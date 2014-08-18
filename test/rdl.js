var assert = require("chai").assert;

var path = global.__steamshovel ? "../lib-cov" : "../lib";

var RDL = require(path + "/rdl");

describe("RDL Parser", function() {
  it("should parse a PLACE command", function() {
    var cmd = RDL.parse("PLACE 1,2,NORTH");

    assert.equal(cmd.type, "place");
    assert.equal(cmd.x, "1");
    assert.equal(cmd.y, "2");
    assert.equal(cmd.direction, "NORTH");
  });

  it("should refuse to parse an invalid PLACE command", function() {
    assert.throws(function() {
      var cmd = RDL.parse("PLACE X,Y,Z");
    });
  });

  it("should parse a MOVE command", function() {
    var cmd = RDL.parse("MOVE");

    assert.equal(cmd.type, "move");
  });

  it("should parse a LEFT command", function() {
    var cmd = RDL.parse("LEFT");

    assert.equal(cmd.type, "left");
  });

  it("should parse a RIGHT command", function() {
    var cmd = RDL.parse("RIGHT");

    assert.equal(cmd.type, "right");
  });

  it("should parse a REPORT command", function() {
    var cmd = RDL.parse("REPORT");

    assert.equal(cmd.type, "report");
  });

  it("should parse a HELP command with no arguments", function() {
    var cmd = RDL.parse("HELP");

    assert.equal(cmd.type, "help");
    assert.isNull(cmd.command);
  });

  it("should parse a HELP command with an argument", function() {
    var cmd = RDL.parse("HELP TEST");

    assert.equal(cmd.type, "help");
    assert.equal(cmd.command, "TEST");
  });
});
