# Boom Boy

Boom Boy is a multiplayer action game inspired by the Bomberman
series. 

## Functionality & MVP
This project will, at a minimum, have:
  - Randomly generated stages with obstacles
  - Characters accepting player input
  - Collision detection between players and other players or bombs
  - Artificial intelligence to allow single-player experience

Additionally, this project will include:
  - An About page describing the rules of the game
  - A production README
  
## Wireframes

![wireframe](raw.githubusercontent.com/djrothblatt/boom-boy/master/boom-boy-layout.png)

## Architecture & Technologies
The project will be implemented with the following technologies:
  - JavaScript for game logic
  - HTML5 Canvas element to contain and render the stage

This project will include an entry file, plus:

`player.js`: This script will handle inputs from the player(s),
including movement. 

`board.js`: This script will contain the logic for rendering and
updating the necessary elements to the DOM. It will include the logic
for randomly generating obstacles in the stage. A board will be a 2D
array of positions. 

`bomb.js`: This small script will handle the logic for a bomb. A bomb
will have a `range` (an integer) and a `time` (also an integer),
specifying how far and when the bomb explodes.

`ai_player.js`: This script will simulate a human player.

## Implementation Timeline

**Day 1:** Write a basic entry file with the basic outline of all four
of the above scripts. Understand the basics of HTML5 Canvas.
  Goal for the day:
  - Learn enough Canvas to render a basic object

**Day 2:** Create the board and accept movement from players. Then add
  obstacles to the board and detect when a player is attempting to
  move into them.
  Goals for the day:
  - Render square board using Canvas
  - Render players on board, accepting user input to move
  - Generate random obstacles on board
  - Prevent player from moving into obstacles

**Day 3:** Add bombs and collision detection between players, bombs
  and explosions. Create basic AI players.
  Goals for the day:
  - Have bombs and explosions on the board
  - Register if player has been hit by a bomb

## Bonus Features

There are many things to add to this project. Some potential updates
include:
  - Powerups changing player speed, bomb range, bomb timing, or other
  things
  - "Chain reactions" between bombs, where one bomb's explosion sets
    another bomb off
