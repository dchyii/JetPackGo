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

const renderGameScore = (hero) => {
  $("#gameScore").text(hero.score);
};

const renderHighScores = (highScores) => {
  const $highScores = $("#highScores");
  $highScores.children().remove();
  for (const score of highScores) {
    const key = Object.keys(score);
    if (score[key] >= 0) {
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
  generateBlocksInt();

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
      clearInterval(hitTarget);
      showGameOver();
      clearInterval(stopGame);
    }
  }, 10);
};

//get player name
const getName = (hero) => {
  const $playerName = $("#playerName").val();
  if ($playerName) {
    hero.name = $playerName;
  }
};

//hide input name
const hideInputName = () => {
  $("#inputName").addClass("hide");
};

//show input name
const showInputName = () => {
  $("#inputName").removeClass("hide");
  $("#playerName").val("");
};

//hide intro screen
const hideIntro = () => {
  $("#intro").addClass("hide");
};

//show intro screen
const showIntro = () => {
  $("#intro").removeClass("hide");
  $("#name").text(gameData.hero.name);
};

//hide game over screen
const hideGameOver = () => {
  $("#gameOver").addClass("hide");
};

//show game over screen
const showGameOver = () => {
  $("#gameOver").removeClass("hide");
};

//Execute game code
const main = () => {
  //render all on load
  renderAll(gameData);

  //get player name
  $("#submitButton").on("click", () => {
    getName(gameData.hero);
    hideInputName();
    showIntro();
  });

  $("#inputName").on("keydown", (event) => {
    if (event.key === "Enter") {
      getName(gameData.hero);
      hideInputName();
      showIntro();
    }
  });

  // start game
  $("body").on("keydown", (event) => {
    if (event.key === " " && gameData.gameStats.isGameStart === false) {
      gameData.gameStats.isGameStart = true;
      hideInputName();
      hideIntro();
      gameStart(gameData);
    }
  });

  $("#ground").on("click", () => {
    if (gameData.gameStats.isGameStart === false) {
      gameData.gameStats.isGameStart = true;
      hideInputName();
      hideIntro();
      gameStart(gameData);
    }
  });

  // make hero jump
  $("#ground").on("click", () => {
    if (!gameData.gameStats.isGameOver) {
      jumpUp(gameData.hero);
    }
  });

  $("body").on("keydown", (event) => {
    if (event.key === " ") {
      if (!gameData.gameStats.isGameOver) {
        jumpUp(gameData.hero);
      }
    }
  });

  //reset game after game over
  $("body").on("keydown", (event) => {
    if (event.key === " " && gameData.gameStats.isGameOver) {
      resetGame(gameData);
      renderAll(gameData);
      hideGameOver();
      showIntro();
    }
  });

  $("#ground").on("click", () => {
    if (gameData.gameStats.isGameOver) {
      resetGame(gameData);
      renderAll(gameData);
      hideGameOver();
      showIntro();
    }
  });

  //change player
  $("body").on("keydown", (event) => {
    if (event.key === "Escape" && gameData.gameStats.isGameOver) {
      resetGame(gameData);
      renderAll(gameData);
      hideGameOver();
      showInputName();
    }
  });
};

$(main);
