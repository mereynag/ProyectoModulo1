const $button = document.querySelector("#start-button")

function startGame(){
    if (gameInterval) return
    gameInterval = setInterval(updateGame, 1000 / 60)

}

function updateGame() {
    if (gameInterval){
      frames++
      //clearObstacles()
      //generateObstacles()
      clearCanvas()
      //checkCollitions()
      board.draw()
      drawObstacles()
      player.draw()  
      //printScore()
  }    
  }