## Approach and Process

1. What in my process and approach to this project would I do differently next time?

- The readme provided some structures as to how to approach the development. But as development goes on, I seldom referred back to the readme and the development deviates slightly from the readme structure.

2. What in my process and approach to this project went well that I would repeat next time?

- Have a thought-through of how the game will be, what are the variables required to generate the different portions of the game even before starting to code.
- Focused on creating the main portion of the game before moving onto the intro screen (instead of creating it sequentially). If I had started from the intro screen, it would have been more confusing where and how to place the main game codes.
- Breaking down the game into very small parts, so that I can focus on creating one part every single day.

## Code and Code Design

1. What in my code and program design in the project would I do differently next time?

- Instead of hardcoding some variables which are dependent on the actual screen size, these info could be retrived via jQuery and stored as a variable. (For example, the max height of 210 is hardcoded, but the div height could have been retrived via jQuery.)

```
const jumpUp = (hero) => {
  hero.isJumping = true;
  if (hero.posY < 210 - hero.jumpHeight) {
    hero.posY += hero.jumpHeight / 2;
    renderHero(hero);
    setTimeout(() => {
      hero.posY += hero.jumpHeight / 2;
      renderHero(hero);
      setTimeout(() => {
        hero.isJumping = false;
        setTimeout(fall, 50, hero);
      }, 50);
    }, 50);
  } else {
    hero.posY = 210;
    renderHero(hero);
    setTimeout(() => {
      hero.isJumping = false;
      setTimeout(fall, 50, hero);
    }, 50);
  }
};
```

2. What in my code and program design in the project went well? Is there anything I would do the same next time?

- Storing all the variables required within 1 main variable, which makes it easy to locate and identify them.

```
//* Main Game Data
const gameData = {
  hero: {
    name: "Hero",
    health: 5,
    score: 0,
    posY: 0,
    jumpHeight: 70,
    fallRate: 10,
    isJumping: false,
  },
  block: [],
  gameStats: {
    scrollRate: 50,
    spawnRate: 1500,
    isGameStart: false,
    isGameOver: false,
  },
  defaultValues: {
    health: 5,
    score: 0,
    posY: 0,
    spawnRate: 1500,
  },
  highScores: [{}, {}, {}],
};
```

- Using of class to create obstacles and targets simplified the implementation to randomly generate them.

```
//* Generate obstacles
class Block {
  constructor(type) {
    const damage = { obstacle: 1, target: 0 };
    const score = { obstacle: 0, target: 1 };
    this.type = type;
    this.damage = damage[type];
    this.score = score[type];
    this.posY = Math.ceil(Math.random() * 210);
    this.posX = 800;
    this.scrollPx = 10;
  }
}
```

## SEI Post Mortem

1. What habits did I use during this unit that helped me?

- Breaking down the problems into smaller parts, and focus on tackling one at a time.
- Creating the end result using HTML first, and then use it as a basis to create the JS codes.

2. What habits did I have during this unit that I can improve on?

- Scared of committing and not sure when to commit. After a part of the code runs, I will commit. But when I start to improve on it and it still works, I do not dare to commit as I want to improve more, and then things fail and I have to restart from the last commit.
- Not checking through the codes before committing. Many times after I commit, I read through and found parts of the code which I have already mark to be removed but they are still there.

3. How is the overall level of the course during this unit? (instruction, course materials, etc.)

- Overall I feel the course has taught me how to creating a running application from scratch. This is a huge achievement to me, from knowing nothing to being able to create something that runs. Although I feel that the implementation of the codes could be more elegant.
