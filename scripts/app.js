//Render screen
const renderHero = (hero) => {
  const $hero = $("#hero");
  $hero.css("bottom", `${hero.posY}px`);
};

//! kiv for block first
// const renderBlocks = () => {
//   const $block = $(".block");
//   $block.css("border", "red 10px solid");
//   return $block;
// };

const renderAll = (gameData) => {
  renderHero(gameData.hero);
};

//Execute game code
const main = () => {
  //render all on load
  renderAll(gameData);
  // make hero jump
  //! check out the keypress function
  $("#ground").on("click", () => {
    //limit jump function to activate at 160px
    // if (gameData.hero.posY >= 160) {
    jumpUp(gameData.hero);
    // }
  });

  //make hero drop after jump
  setInterval(fallDown, 50, gameData.hero);
};

$(main);
