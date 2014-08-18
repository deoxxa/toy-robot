#!/usr/bin/env node

var readline = require("readline");

var parse = function parse(line) {
  switch (line) {
    case "MOVE":   return {type: "move"};
    case "LEFT":   return {type: "left"};
    case "RIGHT":  return {type: "right"};
    case "REPORT": return {type: "report"};
  }

  var matches = line.match(/^PLACE\s+(\d+),\s*(\d+),\s*(NORTH|SOUTH|EAST|WEST)$/);
  if (matches) {
    return {
      type: "place",
      x: parseInt(matches[1], 10),
      y: parseInt(matches[2], 10),
      direction: matches[3],
    };
  }

  return new Error("invalid command");
};

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var robot = {
  x: null,
  y: null,
  direction: null,
};

rl.on("line", function(line) {
  var parsed = parse(line);

  if (parsed instanceof Error) {
    console.log("[!] error: " + parsed.message);

    return rl.prompt();
  }

  if (parsed.type === "report") {
    if (robot.direction === null) {
      console.log("[!] error: must place robot first");

      return rl.prompt();
    }

    console.log("facing %s at %s,%s", robot.direction, robot.x, robot.y);

    return rl.prompt();
  }

  if (parsed.type === "place") {
    if (parsed.x < 0 || parsed.x >= 5 || parsed.y < 0 || parsed.y >= 5) {
      console.log("[!] error: place would result in invalid position");
      return rl.prompt();
    }

    robot.x = parsed.x;
    robot.y = parsed.y;
    robot.direction = parsed.direction;

    console.log("placed facing %s at %s,%s", robot.direction, robot.x, robot.y);

    return rl.prompt();
  }

  if (parsed.type === "move") {
    if (robot.direction === null) {
      console.log("[!] error: must place robot first");

      return rl.prompt();
    }

    var x = robot.x,
        y = robot.y;

    switch (robot.direction) {
      case "NORTH": y++; break;
      case "SOUTH": y--; break;
      case "EAST":  x++; break;
      case "WEST":  x--; break;
    }

    if (x < 0 || x >= 5 || y < 0 || y >= 5) {
      console.log("[!] error: move would result in an invalid position");
    } else {
      robot.x = x;
      robot.y = y;

      console.log("moved %s to %s, %s", robot.direction, robot.x, robot.y);
    }

    return rl.prompt();
  }

  if (parsed.type === "left") {
    if (robot.direction === null) {
      console.log("[!] error: must place robot first");

      return rl.prompt();
    }

    switch (robot.direction) {
      case "NORTH": robot.direction = "WEST";  break;
      case "WEST":  robot.direction = "SOUTH"; break;
      case "SOUTH": robot.direction = "EAST";  break;
      case "EAST":  robot.direction = "NORTH"; break;
    }

    console.log("turned to face %s", robot.direction);

    return rl.prompt();
  }

  if (parsed.type === "right") {
    if (robot.direction === null) {
      console.log("[!] error: must place robot first");

      return rl.prompt();
    }

    switch (robot.direction) {
      case "NORTH": robot.direction = "EAST";  break;
      case "EAST":  robot.direction = "SOUTH"; break;
      case "SOUTH": robot.direction = "WEST";  break;
      case "WEST":  robot.direction = "NORTH"; break;
    }

    console.log("turned to face %s", robot.direction);

    return rl.prompt();
  }
});

rl.prompt();
