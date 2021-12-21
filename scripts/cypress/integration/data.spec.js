//* Generate obstacles
class Block {
  constructor(type) {
    const damage = { obstacle: -1, target: 0 };
    const score = { obstacle: 0, target: 10 };
    this.type = type;
    this.damage = damage[type];
    this.score = score[type];
    this.posY = Math.ceil(Math.random() * 180) + 120;
  }
}

//* Main Game Data
const gameData = {
  hero: {
    name: "hero",
    health: 5,
    score: 0,
    posY: 300,
    jumpHeight: 140,
    fallRate: 5,
  },
  block: [new Block("obstacle"), new Block("target")],
  gameStats: {
    scrollRate: 20,
    spawnRate: 2000,
  },
};

//* Controller Functions
const jumpUp = (hero) => {
  let newPosY = hero.posY;
  if (hero.posY > 160) {
    hero.posY -= hero.jumpHeight;
    console.log("jump", newPosY);
  } else {
    hero.posY = 90;
  }
  renderHero(hero);
  return newPosY;
};

const fallDown = (hero) => {
  let newPosY = hero.posY;
  if (hero.posY <= 298) {
    hero.posY += hero.fallRate;
    console.log("fall", newPosY);
  }
  renderHero(hero);
  return newPosY;
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
