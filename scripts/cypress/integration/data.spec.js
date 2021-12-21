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
    jumpHeight: 70,
    fallRate: 5,
  },
  block: [new Block("obstacle"), new Block("target")],
  gameStats: {
    scrollRate: 20,
    spawnRate: 2000,
  },
};

//* Controller Functions
const jumpUp = (gameData) => {
  const newPosY = (gameData.hero.posY -= gameData.hero.jumpHeight);
  console.log(gameData.hero.posY);
  return newPosY;
};

const fallDown = (gameData) => {
  const newPosY = (gameData.hero.posY += gameData.hero.fallRate);
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
