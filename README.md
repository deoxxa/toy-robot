ROBOT SIMULATOR 5000
====================

INTRODUCING TO YOU THE LATEST IN CASUAL ROBOT SIMULATION SOFTWARE. IF YOU'RE NOT
IN A POSITION TO OWN YOUR OWN ROBOT, THIS SOFTWARE CAN ACT AS A REPLACEMENT FOR
THAT, PROVIDING ENTIRE SECONDS OR EVEN MINUTES OF FUN WHILE YOU PRETEND TO MOVE
A ROBOT AROUND A TABLETOP.

HOLD ONTO YOUR HATS, FOLKS. THINGS ARE ABOUT TO GET REAL.

Example Session
---------------

```
[!] WELCOME TO ROBOT SIMULATOR 5000

SUPPORTED COMMANDS ARE:

  PLACE X,Y,DIRECTION
  MOVE
  LEFT
  RIGHT
  REPORT
  HELP <COMMAND>

> MOVE

[!] ERROR: CAN'T MOVE WITHOUT BEING PLACED

> HELP PLACE

[!] HELP FOR COMMAND `PLACE`

SYNTAX: PLACE X,Y,DIRECTION

PLACE WILL PUT THE ROBOT ON THE TABLE IN POSITION X,Y AND FACING NORTH, SOUTH,
EAST OR WEST

> PLACE 0, 0, WEST

X: 0, Y: 0, FACING: WEST

> MOVE

[!] ERROR: MOVE WOULD RESULT IN INVALID POSITION

> RIGHT

X: 0, Y: 0, FACING: NORTH

> MOVE

X: 0, Y: 1, FACING: NORTH

> REPORT

X: 0, Y: 1, FACING: NORTH
```

What?
-----

You get to control a virtual robot, roaming around a tabletop with a 5x5 grid of
fixed positions. You can tell it to go to a specific place and face a specific
direction, to turn left or right, to move one position forward, or to tell you
about its position. If you tell it to move, it'll make sure that it won't fall
to its death. Clever little bugger.

Architecture
------------

The program is split up into four pieces. The first is the `RDL` parser, which
is implemented as a PEG grammar (see `src/rdl.peg`). The second is the `Robot`
object, which keeps track of the position and orientation of the virtual robot.
The third is the `Game` object, which keeps a list of robots and validates the
potential moves of a robot. The fourth is the UI, which is implemented as a
readline-based text interface, feeding input to the RDL parser.

The UI can be driven by any duplex stream and this is shown with the programs in
the `bin` directory. The `bin/rbs5k` program ties the UI to your terminal's
stdin and stdout, and the `bin/server` program exposes it via a TCP socket.

There is an additional implementation to be found in `mini.js`, to show that
another angle of how this project might have been realised in more of an "MVP"
kind of situation. It's the kind of implementation that's very quick to write,
but close to impossible to test in any granular fashion, and difficult to add
features to.

Testing
-------

The codebase is well-tested, as evidenced by the `test` directory. I'm using
[mocha](http://mochajs.org/) and [chai](http://chaijs.com/) for
the unit tests, [stream-expect](https://github.com/rsolomo/node-stream-expect)
for the integration tests, and [SteamShovel](https://github.com/cgiffard/SteamShovel)
for code coverage. SteamShovel reports a coverage rate of about 50%, but much of
the negative score there comes from indirection in the generated RDL parser and
using a stream to talk to the UI instead of direct method invocation. There is
very little code left unexecuted during the test suite (even error handling code
is exercised).

Commenting
----------

There are very few comments in the codebase, and I instead strove to make the
code self-documenting as much as I could. There is one comment in `robot.js`
that explains a single non-obvious operation. Aside from this one instance, I
believe that the code is clear enough to not require comments. Descriptive
variable and function names go a long way in negating the purpose of comments.

RDL (Robot Direction Language)
------------------------------

The user drives with the program via a language I've dubbed *Robot Direction
Language*, or *RDL* (pronounced like "riddle"). It's a plaintext language and
follows the following specification:

### PLACE

Syntax:

```
PLACE X, Y, DIRECTION
```

`PLACE` will put the toy robot on the table in position `X,Y` facing `NORTH`,
`SOUTH`, `EAST`, or `WEST`.

### MOVE

Syntax:

```
MOVE
```

`MOVE` will move the toy robot one unit forward in the direction that it is
currently facing.

### LEFT

Syntax:

```
LEFT
```

`LEFT` will rotate the robot 90 degrees counterclockwise without changing the
position of the robot.

### RIGHT

Syntax:

```
RIGHT
```

`RIGHT` will rotate the robot 90 degrees counterclockwise without changing the
position of the robot.

### REPORT

Syntax:

```
REPORT
```

`REPORT` will announce the x, y, and direction of the robot.
