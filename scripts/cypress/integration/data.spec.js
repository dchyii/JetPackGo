//* Generate obstacles
class Block {
  constructor(type) {
    const damage = { obstacle: -1, target: 0 };
    const score = { obstacle: 0, target: 10 };
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
    health: 5,
    score: 0,
    posY: 0,
    jumpHeight: 70,
    fallRate: 10,
    isJumping: false,
  },
  block: [new Block("obstacle")],
  gameStats: {
    scrollRate: 50,
    spawnRate: 2000,
  },
};

//* Controller Functions
// make hero jump
//! current jump code
// const jumpUp = (hero) => {
// if (hero.posY < 210 - hero.jumpHeight) {
//   hero.posY += hero.jumpHeight;
//   console.log("jump", hero.posY);
// } else {
//   hero.posY = 210;
//   console.log("max jump", hero.posY);
// }

//   renderHero(hero);
// };

//make hero fall
// const fallDown = (hero) => {
//   if (hero.posY >= hero.fallRate) {
//     hero.posY -= hero.fallRate;
//     console.log("fall", hero.posY);
//   }
//   renderHero(hero);
// };
//! end of current jump code

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

//make blocks scroll left
const scrollLeft = (block) => {
  for (const obs of block) {
    if (obs.posX > -60) {
      obs.posX -= obs.scrollPx;
    }
  }
  renderBlocks(block);
};

//generate blocks
const generateBlocks = (block) => {
  const blockTypes = ["obstacle", "target"];
  const randNum = Math.round(Math.random());
  block.push(new Block(blockTypes[randNum]));
  if (block[0].posX === -60) {
    block.shift();
  }
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
