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
    this.scroll = 10;
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
    scrollRate: 50,
    spawnRate: 2000,
  },
};

//* Controller Functions
// make hero jump
const jumpUp = (hero) => {
  if (hero.posY < 210 - hero.jumpHeight) {
    hero.posY += hero.jumpHeight;
    console.log("jump", hero.posY);
  } else {
    hero.posY = 210;
    console.log("max jump", hero.posY);
  }
  renderHero(hero);
};

//make hero fall
const fallDown = (hero) => {
  if (hero.posY >= hero.fallRate) {
    hero.posY -= hero.fallRate;
    console.log("fall", hero.posY);
  }
  renderHero(hero);
};

//make blocks scroll left
const scrollLeft = (block) => {
  for (const obs of block) {
    if (obs.posX > -60) {
      obs.posX -= obs.scroll /*gameData.gameStats.scrollRate*/;
      // console.log("blockX", obs.posX);
    }
  }
  const newBlock = block.filter((block) => block.posX > -60);
  block = newBlock;
  renderBlocks(block);
  return block;
};

//generate blocks
const generateBlocks = (block) => {
  const blockTypes = ["obstacle", "target"];
  const randNum = Math.round(Math.random());
  block.push(new Block(blockTypes[randNum]));
  console.log(block.length);
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
