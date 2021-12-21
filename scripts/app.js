//Render screen
const renderHero = (hero) => {
  const $hero = $("#hero").css("margin-top", `${hero.posY}px`);
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
  // set html tags as variables
  $("#hero").on("click", renderBlocks);
  renderAll(gameData);
};
$(main);
