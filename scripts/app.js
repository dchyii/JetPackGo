//Render screen
const renderHero = (hero) => {
  const $hero = $("#hero");
  $hero.css("bottom", `${hero.posY}px`);
};

const renderBlocks = (block) => {
  $(".block").remove();
  for (const obs of block) {
    const $newBlock = $("<div>");
    $newBlock.addClass("block");
    $newBlock.css("left", `${obs.posX}px`);
    $newBlock.css("bottom", `${obs.posY}px`);
    $newBlock.addClass(obs.type);
    $("#sky").append($newBlock);
  }
};

const renderHealth = (hero) => {
  const $health = $("#health");
  $health.text(hero.health);
};

const renderScore = (hero) => {
  const $score = $("#score");
  $score.text(hero.score);
};

const renderHighScores = (highScores) => {
  const $highScores = $("#highScores");
  $highScores.children().remove();
  for (const score of highScores) {
    const key = Object.keys(score);
    if (score[key]) {
      const $row = $("<p>");
      $row.text(`${key}: ${score[key]}`);
      $highScores.append($row);
    }
  }
};

const renderAll = (gameData) => {
  renderHero(gameData.hero);
  renderBlocks(gameData.block);
  renderHealth(gameData.hero);
  renderScore(gameData.hero);
};

//start game code
const gameStart = (gameData) => {
  // generate blocks code
  const generatingBlocks = setInterval(
    generateBlocks,
    gameData.gameStats.spawnRate,
    gameData.block
  );

  //make blocks scroll left
  const scrollingBlocks = setInterval(
    scrollLeft,
    gameData.gameStats.scrollRate,
    gameData.block
  );

  // hit obstacle or target code
  const hitTarget = setInterval(
    hitObstacle,
    gameData.gameStats.scrollRate,
    gameData
  );

  // clear intervals on game over
  const stopGame = setInterval(() => {
    if (gameData.gameStats.isGameOver) {
      clearInterval(scrollingBlocks);
      clearInterval(generatingBlocks);
    }
  }, 10);
};

//Execute game code
const main = () => {
  //render all on load
  renderAll(gameData);

  // start game
  $("body").on("keypress", (event) => {
    if (event.key === " " && gameData.gameStats.isGameStart === false) {
      gameData.gameStats.isGameStart = true;
      gameStart(gameData);
    }
  });

  // make hero jump
  $("#ground").on("click", () => {
    if (!gameData.gameStats.isGameOver) {
      jumpUp(gameData.hero);
    }
  });

  $("body").on("keypress", (event) => {
    if (event.key === " ") {
      if (!gameData.gameStats.isGameOver) {
        jumpUp(gameData.hero);
      }
    }
  });

  $("body").on("keypress", (event) => {
    if (event.key === " " && gameData.gameStats.isGameOver) {
      resetGame(gameData);
      renderAll(gameData);
    }
  });
};

$(main);
