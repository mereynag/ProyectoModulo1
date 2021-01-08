
  window.onload = () => {
  const $canvas = document.querySelector("canvas")
  const ctx = $canvas.getContext("2d")
  const gravity = 0.98
  const friction = 0.9
  let intervalId;
  let keys = []
  let platforms = []
  let score = 0;

  function startGame() {
    if (intervalId) return
    intervalId = setInterval(update, 1000 / 60)
  }
  startGame()


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
        if(p1.jumping && this.y < 0){
          this.y+= 5
        } else if (p1.jumping && this.y == 0){
          this.y == 0
        }

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

class Platform {
  constructor(){
    this.x = this.x
    this.y = this.y
    this.width = this.width
    this.height = this.height
    this.img = new Image()
    this.img.src = './images/P1_Plataformas.png'
  }
}

class FlyingObject{
  constructor(y,width,height){
    this.x = $canvas.width
    this.y = y
    this.width = width
    this.height = height
    this.img = new Image()
    
  }
  draw(source){
    this.x-=2
    this.img.src = source
    ctx.drawImage(this.img,this.x, this.y, this.width, this.height)
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
    this.jumpStrength = 17.5
    this.jumps = 0
    this.jumping = false
    this.grounded = false
    this.img = new Image()
  }
  draw(src) {
    this.img.src = src
    if (this.x < 0) this.x = 0
    if (this.x > $canvas.width) this.x = 0
    if(this.y > 580 && this.grounded == true){
      this.y = $canvas.height
    }
    if (this.y > 0 && this.jumps == 0) {
      this.y = 580
      this.jumps = 0
      this.jumping = false 
    }

    ctx.drawImage(this.img, this.x,this.y, this.width, this.height)
  }
  changePos() {
      this.y += this.velY
      this.velY += gravity
      this.x += this.velX
      this.velX *= friction
  }
  jump() {
    if (!this.jumping) {
      this.velY = -this.jumpStrength
      this.jumping = true
      this.jumps++
    }
  }

  isTouching(obj){
    return(this.x < obj.x + obj.width &&
    this.x + this.width > obj.x &&
    this.y < obj.y + obj.height &&
    this.y + this.height > obj.y)
  }
}

//-------Platforms-------
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
const avion = new FlyingObject(400, 110, 50)
const meteorito = new FlyingObject(350,70,70)
const bird = new FlyingObject(400,75,50)
const cometa = new FlyingObject(350,120,90)
const p1 = new Character(320, 500)

function update() {
  frames++
  startGame()
  clearCanvas()
  board.draw()
  if (board.y > -1500){
      p1.draw('./images/P1_CharacterAstro.png')
  }else{
      p1.draw('/images/P1_Character.png')
  }
  p1.changePos()
  drawPlatforms()
  checkKeys()
  bounds()
  printScore()
  drawObjects()
  if(p1.y > $canvas.height +1200){
    gameOver()
  }
  checkCollitions()
   youWin()
}

function clearCanvas() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height)
}

//-------------Control--------------
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
}
document.addEventListener("keydown", event => {
  keys[event.keyCode] = true
})
document.addEventListener("keyup", event => {
  keys[event.keyCode] = false
})

// -------------Plataformas y colision--------------
function drawPlatforms() {
  platforms.forEach(platform => {
    if(board.y < 0){
      if(platform.y > $canvas.height){
        platform.y = 0
      }
    }
    const platImage = new Image()
    platImage.src = './images/P1_Plataformas.png'
    ctx.drawImage(platImage, platform.x, platform.y, platform.width, platform.height)
    if(board.y < 0){
      if(p1.jumping){
        platform.y+=3.2
      }
    }
  })}

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
//-----------Colision para plataformas-----------
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
    clearInterval(intervalId)
    console.log(score)
    printGameOver()

}

function printScore() {

  if(board.y % 175 == 0 && p1.jumping) score++
  ctx.font = "20px monospace"
  ctx.fillStyle = "white"
  ctx.fillText(`Score: ${score}`, $canvas.width - 100, 30)

}

function checkCollitions(){
  if(p1.isTouching(avion) || p1.isTouching(bird)|| p1.isTouching(cometa) || p1.isTouching(meteorito)){
    gameOver()
    console.log('Adios')
  }
}

function printGameOver(){
  ctx.fillStyle = '#0f2a37ff'
  ctx.fillRect(200,200,300, 300)
  ctx.font = '45px monospace'
  ctx.fillStyle = 'red'
  ctx.fillText(`GAME OVER`,230, 325)
  ctx.font = '20px monospace'
  ctx.fillStyle = 'white'
  ctx.fillText(`Your final score: ${score}`, 235, 400)
}

function drawObjects(){
  if(board.y > -4200 && board.y < -3000){
    bird.draw('./images/P1_Bird.png')
  }
  if(board.y > -3000 && board.y < -2000){
    avion.draw('./images/P1_Avion.png')
  }
  if(board.y > -1000 && board.y < -500){
    meteorito.draw('./images/P1_Meteor.png')
  }
  if(board.y > -500 && board.y < 0){
    cometa.draw('./images/P1_Comet.png')
  }
}

function printYouWin(){
  ctx.fillStyle = 'white';
  ctx.fillRect(200,200,300, 300)
  ctx.font = '45px monospace'
  ctx.fillStyle = 'red'
  ctx.fillText(`YOU WIN!!`,230, 325)
  ctx.font = '20px monospace'
  ctx.fillStyle = '#0f2a37ff'
  ctx.fillText(`Your final score: ${score}`, 225, 400)
}

function youWin(){
  if(p1.y < -5){
    clearInterval(intervalId)
    printYouWin()
  }
}
}
