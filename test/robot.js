var assert = require("chai").assert;

var path = global.__steamshovel ? "../lib-cov" : "../lib";

var Robot = require(path + "/robot");

describe("Robot", function() {
  it("should be constructed correctly with no arguments", function() {
    var robot = new Robot();

    assert.isNull(robot.x);
    assert.isNull(robot.y);
    assert.isNull(robot.direction);
  });

  it("should report its location correctly", function() {
    var robot = new Robot();

    robot.place(1, 2, "SOUTH");

    var report = robot.report();

    assert.equal(report.x, 1);
    assert.equal(report.y, 2);
    assert.equal(report.direction, "SOUTH");
  });

  it("should report an empty location correctly", function() {
    var robot = new Robot();

    var report = robot.report();

    assert.isNull(report.x);
    assert.isNull(report.y);
    assert.isNull(report.direction);
  });

  it("should be placed correctly", function() {
    var robot = new Robot();

    robot.place(1, 2, "SOUTH");

    var report = robot.report();

    assert.equal(report.x, 1);
    assert.equal(report.y, 2);
    assert.equal(report.direction, "SOUTH");
  });

  it("should convert string arguments in placement correctly", function() {
    var robot = new Robot();

    robot.place("1", "2", "SOUTH");

    var report = robot.report();

    assert.equal(report.x, 1);
    assert.equal(report.y, 2);
    assert.equal(report.direction, "SOUTH");
  });

  it("should perform a dry run placement correctly", function() {
    var robot = new Robot();

    robot.place(0, 0, "NORTH");

    var newPosition = robot.place(1, 2, "SOUTH", true);

    assert.equal(newPosition.x, 1);
    assert.equal(newPosition.y, 2);

    var report = robot.report();

    assert.equal(report.x, 0);
    assert.equal(report.y, 0);
    assert.equal(report.direction, "NORTH");
  });

  it("should refuse to move without being placed first", function() {
    var robot = new Robot();

    assert.throws(function() {
      robot.move();
    });
  });

  it("should move north correctly", function() {
    var robot = new Robot();

    robot.place(1, 1, "NORTH");

    robot.move();

    var report = robot.report();

    assert.equal(report.x, 1);
    assert.equal(report.y, 2);
  });

  it("should move south correctly", function() {
    var robot = new Robot();

    robot.place(1, 1, "SOUTH");

    robot.move();

    var report = robot.report();

    assert.equal(report.x, 1);
    assert.equal(report.y, 0);
  });

  it("should move east correctly", function() {
    var robot = new Robot();

    robot.place(1, 1, "EAST");

    robot.move();

    var report = robot.report();

    assert.equal(report.x, 2);
    assert.equal(report.y, 1);
  });

  it("should move west correctly", function() {
    var robot = new Robot();

    robot.place(1, 1, "WEST");

    robot.move();

    var report = robot.report();

    assert.equal(report.x, 0);
    assert.equal(report.y, 1);
  });

  it("should perform a dry run movement correctly", function() {
    var robot = new Robot();

    robot.place(0, 0, "NORTH");

    var newPosition = robot.move(true);

    assert.equal(newPosition.x, 0);
    assert.equal(newPosition.y, 1);

    var report = robot.report();

    assert.equal(report.x, 0);
    assert.equal(report.y, 0);
    assert.equal(report.direction, "NORTH");
  });

  it("should turn right correctly", function() {
    var pairs = [["NORTH", "EAST"], ["EAST", "SOUTH"], ["SOUTH", "WEST"], ["WEST", "NORTH"]];

    var robot = new Robot();

    robot.place(0, 0, "NORTH");

    pairs.forEach(function(pair) {
      var reportBefore = robot.report();
      robot.right();
      var reportAfter = robot.report();

      assert.equal(reportBefore.direction, pair[0]);
      assert.equal(reportAfter.direction, pair[1]);
    });
  });

  it("should refuse to turn right without being placed first", function() {
    var robot = new Robot();

    assert.throws(function() {
      robot.right();
    });
  });

  it("should turn left correctly", function() {
    var pairs = [["NORTH", "WEST"], ["WEST", "SOUTH"], ["SOUTH", "EAST"], ["EAST", "NORTH"]];

    var robot = new Robot();

    robot.place(0, 0, "NORTH");

    pairs.forEach(function(pair) {
      var reportBefore = robot.report();
      robot.left();
      var reportAfter = robot.report();

      assert.equal(reportBefore.direction, pair[0]);
      assert.equal(reportAfter.direction, pair[1]);
    });
  });

  it("should refuse to turn left without being placed first", function() {
    var robot = new Robot();

    assert.throws(function() {
      robot.left();
    });
  });
});
