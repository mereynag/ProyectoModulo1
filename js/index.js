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
const keys = []

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
        // if(this.y >$canvas.height) this.y = 0
        // this.y++
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
    this.jumpStrength = 12
    this.jumps = 0
    this.jumping = false
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
    if (this.y > 580) {
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
    console.log(this.jumps)
    this.jumping = false
    if (this.jumps >= 10) {
      this.jumping = true
      
    }
    if (!this.jumping) {
      this.jumps++
      this.velY = -this.jumpStrength
    }
  }
}

const board = new Board()
const p1 = new Character(320, 500)

function update() {
  checkKeys()
  p1.changePos()
  clearCanvas()
  board.draw()
  p1.draw()
}

function clearCanvas() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height)
}

setInterval(update, 1000 / 60)

//control

function checkKeys() {
  if (keys["ArrowUp"]) {
    p1.jump()
  }
  if (keys["ArrowLeft"]) {
    p1.velX--
  }
  if (keys["ArrowRight"]) {
    p1.velX++
  }
}

document.onkeydown = e => {
  keys[e.key] = true
}

document.onkeyup = e => {
  keys[e.key] = false
}

// document.onkeydown = e => {
//   console.log(e.key)
//   switch (e.key) {
//     case "ArrowUp":
//       return p1.jump()
//     case "ArrowLeft":
//       return p1.velX--
//     case "ArrowRight":
//       return p1.velX++
//     default:
//       break
//   }
// }
