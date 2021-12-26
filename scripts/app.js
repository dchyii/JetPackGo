//Render screen
const renderHero = (hero) => {
  const $hero = $("#hero");
  $hero.css("bottom", `${hero.posY}px`);
};

//! kiv for block first
const renderBlocks = (block) => {
  $(".block").remove();
  for (const obs of block) {
    const $newBlock = $("<div>");
    $newBlock.addClass("block");
    $newBlock.css("left", `${obs.posX}px`);
    $newBlock.css("bottom", `${obs.posY}px`);
    $newBlock.addClass(obs.type);
    $("#sky").append($newBlock);
    // console.log($newBlock);
  }
};

const renderAll = (gameData) => {
  renderHero(gameData.hero);
  renderBlocks(gameData.block);
};

//Execute game code
const main = () => {
  //render all on load
  renderAll(gameData);

  // make hero jump
  //! check out the keypress function
  $("#ground").on("click", () => {
    jumpUp(gameData.hero);
  });

  //make hero drop after jump
  setInterval(fallDown, 50, gameData.hero);

  //make blocks scroll left
  const scrollingBlocks = setInterval(
    scrollLeft,
    gameData.gameStats.scrollRate,
    gameData.block
  );
  const generatingBlocks = setInterval(
    generateBlocks,
    gameData.gameStats.spawnRate,
    gameData.block
  );

  // setTimeout(generateBlocks, 3000, gameData.block);
  // setTimeout(generateBlocks, 6000, gameData.block);
  // setTimeout(generateBlocks, 9000, gameData.block);

  // $("#hero").on("click", () => {
  //   scrollLeft(gameData);
  // });
};

$(main);
