/*document.onkeydown = e => {
    if(!intervalId) return
    
    if(e.key === ' '){
        console.log('espacio')
        player.jump()
    }
}*/

function checkKeys() {
    if (keys["ArrowUp"]) {
        console.log('brinco')
      player.jump()
    }
    if (keys["ArrowLeft"]) {
      player.velX--
    }
    if (keys["ArrowRight"]) {
      player.velX++
    }
}
  
  document.onkeydown = e => {
    keys[e.key] = true
  }
  
  document.onkeyup = e => {
    keys[e.key] = false
  }