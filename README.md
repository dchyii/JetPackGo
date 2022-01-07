# JetPack GO

[SEI34 Project 1] Jetpack GO is a side scrolling runner game where the user will control a Hero and guides it to hit targets and avoid obstacles.

## Game Mechanics

The game screen will scroll from right to left, along with randomly generated obstacles and targets. Only 1 obstacle or target will be generated on every Y-plane at a 2 seconds interval (to be reduced as the game progresses).

The user will control a Hero which is running statically and decide when to jump to avoid the obstacle/hit the target in the air by pressing the space bar, or run into the targets on the ground.

### Game Data

The game will comprise of 3 main elements (to be scalable to include other elements in future):
**On Screen**

1. Hero

- Health
- Score
- y-position

2. Obstacles

- Type {flying: y-position > 0, ground: y-position = 0}
- Damage {Obstacle: -1, Target: 0}
- Score {Obstacle: 0, Target: +1}
- x-position

3. Game Data

- Scroll rate

## User Story

**Introduction**

1. The user should be able to key in his/her name at the start.
2. The user should be able to see up the introduction story.

**Game play**

3. The user should be able to press the spacebar and make the Hero jump.
4. The user should be able to see the obstacles or targets moving across the screen from right to left.

**Game over**

5. The user should be able to see his/her score.
6. If the user's score is within the 3 highest score, the user should be able to see his/her score updated in the high score list.

## Minimum Viable Product

1. MVP1

- Hero jumps on pressing space bar, and fall back to the ground
- Obstacles generate on the right of the screen and scroll towards the left

2. MVP2

- Score +1 if Hero hits obstacle labelled "target".
- Health -1 if Hero hits obstacle labelled "obstacle".

3. MVP3

- Game over when health =< 0.

4. MVP4

- Introduction screen to enter player name.
- Introduction screen to show 3 highest score.

5. MVP5

- Update high score list if player score is within highest 3 score.

## Wire Frames

### Start Screen

1. Player enter his/her name
   ![Enter Player Name](/misc/RunningGameWF1.jpeg)

2. Introduction Story
   ![Introduction Story](/misc/RunningGameWF2.jpeg)

### Game Play

![Game Play](/misc/RunningGameWF3.jpeg)

### Game Over Screen

![Game Over Screen](/misc/RunningGameWF4.jpeg)
