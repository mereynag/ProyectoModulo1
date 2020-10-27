/*const $button = document.querySelector("#start-button")

function startGame(){
    if (intervalId) return
    intervalId = setInterval(updateGame, 1000 / 60)

}

function updateGame() {
    if(intervalId){
      frames++
      checkKeys()
      player.changePos()  
      //clearObstacles()
      //generateObstacles()
      clearCanvas()
      //checkCollitions()
      board.draw()
      player.draw()
      console.log('hola')
    }
      
      //drawObstacles()
      //printScore()
      if (!intervalId){
          alert('game over')
      }    
  }*/

const $canvas = document.querySelector("canvas")
const ctx = $canvas.getContext("2d")
const gravity = 0.98
const friction = 0.9
let keys = []
let platforms = []
let frames = 0

class Board{
    constructor(){
    this.x = 0
    this.y = -4300
    this.width = $canvas.width
    this.height = 5000
    this.img = new Image()
    this.img.src = './images/P1_Fondo.jpg'
    this.img.onload = () => {
        this.draw()}
    }
    draw(){
         //if(this.y > $canvas.height) this.y = 0
        if(p1.jumping && this.y < 0){
          this.y+= 2
        } else if (p1.jumping && this.y == 0){
          this.y == 0
        }
        // if (this.y = 0){
        //   this.y = 0
        //   //p1.jumping = true
        // }

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        //ctx.drawImage(this.img, this.x, this.y - $canvas.height, this.width, this.height)
    }
  }

class Character {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 50
    this.height = 65
    this.velX = 0
    this.velY = 0
    this.speed = 5
    this.jumpStrength = 17
    this.jumps = 0
    this.jumping = false
    this.grounded = false
    this.img = new Image()
    this.img.src = './images/P1_Character.png'
    this.img.onload = () => {
        this.draw()
      }
  }
  draw() {
      //TODO: limitar personaje a la derecha
    if (this.x < 0) this.x = 0
    if (this.x > $canvas.width) this.x = 0
    if(this.y > 580 && this.grounded == true){
      this.y = $canvas.height
    }
    if (this.y > 580 && this.jumps == 0) {
      this.y = 580
      this.jumps = 0
      this.jumping = false 
    }

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height) 
    //ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  changePos() {
    this.y += this.velY
    this.velY += gravity
    this.x += this.velX
    this.velX *= friction
  }
  jump() {

    //Flappy Boy
    /*this.jumping = false
    if (this.jumps >= 5) {
      this.jumping = true
      
    }*/
    if (!this.jumping) {
      this.velY = -this.jumpStrength
      this.jumping = true
      this.jumps++
      console.log(this.jumps)
      console.log(this.grounded)
      console.log(this.jumping)

      
    }
    /*if (!this.jumping) {
      this.jumps++
      this.velY = -this.jumpStrength
    }*/
  }
}

//Platforms
platforms.push({
  x: 150,
  y: 0,
  width: 100,
  height: 20
})

platforms.push({
  x: 150,
  y: 233.32,
  width: 100,
  height: 20
})

platforms.push({
  x: 150,
  y: 466.64,
  width: 100,
  height: 20
})

platforms.push({
  x: 450,
  y: 116.66,
  width: 100,
  height: 20
})

platforms.push({
  x: 450,
  y: 349.98,
  width: 100,
  height: 20
})

platforms.push({
  x: 450,
  y: 583.3,
  width: 100,
  height: 20
})

const board = new Board()
const p1 = new Character(320, 500)

function update() {
  frames++
  clearCanvas()
  board.draw()
  p1.draw()
  p1.changePos()
  drawPlatforms()
  checkKeys()
  bounds()
  //if(gameOver())return

}

function clearCanvas() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height)
}

setInterval(update, 1000 / 60)

//control

function checkKeys() {
    if (keys[32] || keys[38]) {
      p1.jump()
    }
    if (keys[37]) {
      p1.velX--
    }
    if (keys[39]) {
      p1.velX++
    }
  /*if (keys["ArrowUp"]) {
    p1.jump()
  }
  if (keys["ArrowLeft"]) {
    p1.velX--
  }
  if (keys["ArrowRight"]) {
    p1.velX++
  }*/
}
document.addEventListener("keydown", event => {
  keys[event.keyCode] = true
})
document.addEventListener("keyup", event => {
  keys[event.keyCode] = false
})
/*
document.onkeydown = e => {
  keys[e.key] = true
}

document.onkeyup = e => {
  keys[e.key] = false
}*/

// -------------Plataformas y colision--------------
function drawPlatforms() {
  ctx.fillStyle = "#333333"
  platforms.forEach(platform => {
    if(platform.y > $canvas.height){
      platform.y = 0
    }
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
    if(p1.jumping){
      platform.y+= 3.2
    }
  })
}

function bounds() {
  p1.grounded = false
  platforms.forEach(platform => {
    var direction = collisionCheck(p1, platform)
    if (direction == "left" || direction == "right") {
      p1.velX = 0
    } else if (direction == "bottom") {
      p1.jumping = false
      p1.grounded = true
    } else if (direction == "top") {
      p1.velY *= -1
    }
  })

  if (p1.grounded) {
    p1.velY = 0
  }
}
// Colision para plataformas
function collisionCheck(char, plat) {
  var vectorX = char.x + char.width / 2 - (plat.x + plat.width / 2)
  var vectorY = char.y + char.height / 2 - (plat.y + plat.height / 2)

  var halfWidths = char.width / 2 + plat.width / 2
  var halfHeights = char.height / 2 + plat.height / 2

  var collisionDirection = null

  if (Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights) {
    var offsetX = halfWidths - Math.abs(vectorX)
    var offsetY = halfHeights - Math.abs(vectorY)
    if (offsetX < offsetY) {
      if (vectorX > 0) {
        collisionDirection = "left"
        char.x += offsetX
      } else {
        collisionDirection = "right"
        char.x -= offsetX
      }
    } else {
      if (vectorY > 0) {
        collisionDirection = "top"
        char.y += offsetY
      } else {
        collisionDirection = "bottom"
        char.y -= offsetY
      }
    }
  }
  return collisionDirection
}

function gameOver(){
  if(p1.y > $canvas.height){
    console.log('Perdiste')
  }
}


