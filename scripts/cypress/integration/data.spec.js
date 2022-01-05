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

//* Main Game Data
const gameData = {
  hero: {
    name: "hero",
    health: 1,
    score: 0,
    posY: 0,
    jumpHeight: 70,
    fallRate: 10,
    isJumping: false,
  },
  block: [],
  gameStats: {
    scrollRate: 50,
    spawnRate: 2000,
    isGameStart: false,
    isGameOver: false,
  },
  defaultValues: {
    health: 2,
    score: 0,
    posY: 0,
  },
  highScores: [{}, {}, {}],
};

//* Controller Functions
// make hero jump
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

const fall = (hero) => {
  if (!hero.isJumping) {
    const heroFalling = setInterval(() => {
      hero.posY -= hero.fallRate;
      renderHero(hero);
      if (hero.posY <= 0) {
        clearInterval(heroFalling);
        hero.posY = 0;
        renderHero(hero);
      } else if (hero.isJumping) {
        clearInterval(heroFalling);
      }
    }, 50);
  }
};

//generate blocks
const generateBlocks = (block) => {
  const blockTypes = ["obstacle", "target"];
  const randNum = Math.round(Math.random());
  block.push(new Block(blockTypes[randNum]));
};

//make blocks scroll left
const scrollLeft = (block) => {
  for (const obs of block) {
    if (obs.posX > -60) {
      obs.posX -= obs.scrollPx;
    } else if (obs.posX <= -60) {
      block.splice(0, 1);
    }
  }
  renderBlocks(block);
};

//when hero hit obstacle
const hitObstacle = (gameData) => {
  for (const blk of gameData.block) {
    if (
      blk.posX < 160 &&
      blk.posX + 50 > 100 &&
      gameData.hero.posY <= blk.posY + 50 &&
      gameData.hero.posY + 50 >= blk.posY
    ) {
      if (blk.type === "obstacle") {
        gameData.hero.health -= blk.damage;
        blk.type = "obstacle hit";
        renderHealth(gameData.hero);
        if (gameData.hero.health === 0) {
          gameOver(gameData);
        }
      }
      if (blk.type === "target") {
        gameData.hero.score += blk.score;
        blk.type = "targetHit";
        renderScore(gameData.hero);
      }
    }
  }
};

//game over
const gameOver = (gameData) => {
  gameData.gameStats.isGameOver = true;
  let currentName = gameData.hero.name;
  let currentScore = gameData.hero.score;
  //iterate through the 3 highest score
  for (let i = 0; i < 3; i++) {
    const obj = gameData.highScores[i];
    const key = Object.keys(obj);
    const val = obj[key];
    //enter code if this placing is not defined
    //or if current score is higher than this placing
    if (currentScore >= val || !val) {
      if (currentScore >= 0) {
        delete obj[key];
        obj[currentName] = currentScore;
        //assign displaced score to compare with next row
        currentName = key;
        currentScore = val;
      }
    }
  }
  renderGameScore(gameData.hero);
  renderHighScores(gameData.highScores);
};

//reset game
const resetGame = (gameData) => {
  gameData.hero.health = gameData.defaultValues.health;
  gameData.hero.score = gameData.defaultValues.score;
  gameData.hero.posY = gameData.defaultValues.posY;
  gameData.gameStats.isGameStart = false;
  gameData.gameStats.isGameOver = false;
  gameData.block = [];
};

//* Cypress Testing Codes
describe("Generate obstacle", () => {
  it("generate target", () => {
    const expected = {
      type: "target",
      damage: 0,
      score: 10,
      posX: 112,
    };
    const result = new Block("target");
    expect(result.type).to.eql(expected.type);
    expect(result.damage).to.eql(expected.damage);
    expect(result.score).to.eql(expected.score);
  });
  it("generate obstacle", () => {
    const expected = {
      type: "obstacle",
      damage: -1,
      score: 0,
      posX: 112,
    };
    const result = new Block("obstacle");
    expect(result.type).to.eql(expected.type);
    expect(result.damage).to.eql(expected.damage);
    expect(result.score).to.eql(expected.score);
  });
});
