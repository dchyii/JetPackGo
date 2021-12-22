//* Generate obstacles
class Block {
  constructor(type) {
    const damage = { obstacle: -1, target: 0 };
    const score = { obstacle: 0, target: 10 };
    this.type = type;
    this.damage = damage[type];
    this.score = score[type];
    this.posY = Math.ceil(Math.random() * 210);
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
  },
  block: [new Block("obstacle"), new Block("target")],
  gameStats: {
    scrollRate: 20,
    spawnRate: 2000,
  },
};

//* Controller Functions
const jumpUp = (hero) => {
  if (hero.posY < 210 - hero.jumpHeight) {
    hero.posY += hero.jumpHeight / 2;
    setTimeout(() => {
      hero.posY += hero.jumpHeight / 2;
    }, 25);
    console.log("jump", hero.posY);
  } else {
    hero.posY = 210;
    console.log("max jump", hero.posY);
  }
  renderHero(hero);
};

const fallDown = (hero) => {
  // let newPosY = hero.posY;
  if (hero.posY >= hero.fallRate) {
    hero.posY -= hero.fallRate;
    console.log("fall", hero.posY);
  }
  renderHero(hero);
  // return newPosY;
};

// console.log("jump", jumpUp(gameData));
// console.log("fall", fallDown(gameData));

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
