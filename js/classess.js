class Board{
    constructor(){
    this.x = 0
    this.y = 0
    this.width = $canvas.width
    this.height = 5000
    this.img = new Image()
    this.img.src = './images/P1_Fondo.jpg'
    this.img.onload = () => {
        // console.log(this)
        this.draw()}
    }
    draw(){
        //if(this.y >$canvas.height) this.y = 0
        //this.y++
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    // ctx.drawImage(this.img, this.x, this.y - $canvas.height, this.width, this.height)
    }
  }

  

  
  class Player {
    constructor(x,y){
      this.x = x
      this.y = y
      this.width = 30
      this.height = 5000
      this.img = new Image()
      this.img.src = './images/P1_Character.png'
      this.img.onload = () => {
        this.draw()
      }
    }
    draw(){
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    moveLeft(){
      this.x -= 5
    }
    moveRight(){
      this.x += 5
    }

    /*isTouching(obstacle) {
      return (
        this.x < obstacle.x + obstacle.width &&
        this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height &&
        this.y + this.height > obstacle.y
      )
    }*/
  }

  const board = new Board()
  const player = new Player()
  /*
  class Obstacle {
    constructor(x, width) {
      this.x = x
      this.y = 0
      this.width = width
      this.height = 20
    }
    draw() {
      this.y++
      ctx.fillStyle = "darkred"
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }
  function generateObstacles() {
    // if (frames % 150 === 0) ratio -= 10
    if (frames % ratio === 0) {
      const min = 100
      const max = $canvas.width - 100
      const randomWidth = Math.floor(Math.random() * (max - min))
      const gap = 100
      randomWidth2 = Math.floor(Math.random() * (max - min))
      //obstacles.push(new Obstacle(randomWidth1 +100, randomWidth2 - 200))
     obstacles.push(
        new Obstacle(randomWidth + gap, $canvas.width - randomWidth - gap)
        //new Obstacle(randomHeight + gap, $canvas.height - randomHeight - gap)
      );
    }
  }
  //let obstacle = new Obstacle(0,500 )
  function drawObstacles() {
    obstacles.forEach(obs => obs.draw())
    //obstacle.draw()
  }
  
  function clearObstacles() {
    obstacles = obstacles.filter(obs => obs.y <= $canvas.height)
  }
  */