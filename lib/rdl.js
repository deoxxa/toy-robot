module.exports = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = /^[ \t]/,
        peg$c1 = { type: "class", value: "[ \\t]", description: "[ \\t]" },
        peg$c2 = [],
        peg$c3 = peg$FAILED,
        peg$c4 = "PLACE",
        peg$c5 = { type: "literal", value: "PLACE", description: "\"PLACE\"" },
        peg$c6 = /^[0-9]/,
        peg$c7 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c8 = ",",
        peg$c9 = { type: "literal", value: ",", description: "\",\"" },
        peg$c10 = "NORTH",
        peg$c11 = { type: "literal", value: "NORTH", description: "\"NORTH\"" },
        peg$c12 = "SOUTH",
        peg$c13 = { type: "literal", value: "SOUTH", description: "\"SOUTH\"" },
        peg$c14 = "EAST",
        peg$c15 = { type: "literal", value: "EAST", description: "\"EAST\"" },
        peg$c16 = "WEST",
        peg$c17 = { type: "literal", value: "WEST", description: "\"WEST\"" },
        peg$c18 = function(x, y, direction) {
          return {
            type: "place",
            x: parseInt(x.join(""), 10),
            y: parseInt(y.join(""), 10),
            direction: direction,
          }
        },
        peg$c19 = "MOVE",
        peg$c20 = { type: "literal", value: "MOVE", description: "\"MOVE\"" },
        peg$c21 = function() {
          return {
            type: "move",
          }  
        },
        peg$c22 = "LEFT",
        peg$c23 = { type: "literal", value: "LEFT", description: "\"LEFT\"" },
        peg$c24 = function() {
          return {
            type: "left",
          }  
        },
        peg$c25 = "RIGHT",
        peg$c26 = { type: "literal", value: "RIGHT", description: "\"RIGHT\"" },
        peg$c27 = function() {
          return {
            type: "right",
          }  
        },
        peg$c28 = "REPORT",
        peg$c29 = { type: "literal", value: "REPORT", description: "\"REPORT\"" },
        peg$c30 = function() {
          return {
            type: "report",
          }  
        },
        peg$c31 = "HELP",
        peg$c32 = { type: "literal", value: "HELP", description: "\"HELP\"" },
        peg$c33 = null,
        peg$c34 = /^[A-Z]/,
        peg$c35 = { type: "class", value: "[A-Z]", description: "[A-Z]" },
        peg$c36 = function(command) {
          return {
            type: "help",
            command: command ? command[1].join("") : null,
          }
        },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0;

      s0 = peg$parsecmd_place();
      if (s0 === peg$FAILED) {
        s0 = peg$parsecmd_move();
        if (s0 === peg$FAILED) {
          s0 = peg$parsecmd_left();
          if (s0 === peg$FAILED) {
            s0 = peg$parsecmd_right();
            if (s0 === peg$FAILED) {
              s0 = peg$parsecmd_report();
              if (s0 === peg$FAILED) {
                s0 = peg$parsecmd_help();
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parse_() {
      var s0;

      if (peg$c0.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c1); }
      }

      return s0;
    }

    function peg$parse__() {
      var s0, s1;

      s0 = [];
      s1 = peg$parse_();
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parse_();
      }

      return s0;
    }

    function peg$parsecmd_place() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c4) {
        s1 = peg$c4;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c5); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parse_();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parse_();
          }
        } else {
          s2 = peg$c3;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c6.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c7); }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c6.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c7); }
              }
            }
          } else {
            s3 = peg$c3;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s5 = peg$c8;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c9); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse__();
                if (s6 !== peg$FAILED) {
                  s7 = [];
                  if (peg$c6.test(input.charAt(peg$currPos))) {
                    s8 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s8 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c7); }
                  }
                  if (s8 !== peg$FAILED) {
                    while (s8 !== peg$FAILED) {
                      s7.push(s8);
                      if (peg$c6.test(input.charAt(peg$currPos))) {
                        s8 = input.charAt(peg$currPos);
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c7); }
                      }
                    }
                  } else {
                    s7 = peg$c3;
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse__();
                    if (s8 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 44) {
                        s9 = peg$c8;
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c9); }
                      }
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse__();
                        if (s10 !== peg$FAILED) {
                          if (input.substr(peg$currPos, 5) === peg$c10) {
                            s11 = peg$c10;
                            peg$currPos += 5;
                          } else {
                            s11 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c11); }
                          }
                          if (s11 === peg$FAILED) {
                            if (input.substr(peg$currPos, 5) === peg$c12) {
                              s11 = peg$c12;
                              peg$currPos += 5;
                            } else {
                              s11 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c13); }
                            }
                            if (s11 === peg$FAILED) {
                              if (input.substr(peg$currPos, 4) === peg$c14) {
                                s11 = peg$c14;
                                peg$currPos += 4;
                              } else {
                                s11 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c15); }
                              }
                              if (s11 === peg$FAILED) {
                                if (input.substr(peg$currPos, 4) === peg$c16) {
                                  s11 = peg$c16;
                                  peg$currPos += 4;
                                } else {
                                  s11 = peg$FAILED;
                                  if (peg$silentFails === 0) { peg$fail(peg$c17); }
                                }
                              }
                            }
                          }
                          if (s11 !== peg$FAILED) {
                            peg$reportedPos = s0;
                            s1 = peg$c18(s3, s7, s11);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$c3;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$c3;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c3;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c3;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c3;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c3;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c3;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c3;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c3;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c3;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c3;
      }

      return s0;
    }

    function peg$parsecmd_move() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c19) {
        s1 = peg$c19;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c20); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c21();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsecmd_left() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c22) {
        s1 = peg$c22;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c23); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c24();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsecmd_right() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c25) {
        s1 = peg$c25;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c27();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsecmd_report() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c28) {
        s1 = peg$c28;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c30();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsecmd_help() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c31) {
        s1 = peg$c31;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parse__();
        if (s3 !== peg$FAILED) {
          s4 = [];
          if (peg$c34.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c35); }
          }
          if (s5 !== peg$FAILED) {
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              if (peg$c34.test(input.charAt(peg$currPos))) {
                s5 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c35); }
              }
            }
          } else {
            s4 = peg$c3;
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c3;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c3;
        }
        if (s2 === peg$FAILED) {
          s2 = peg$c33;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c36(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c3;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c3;
      }

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();