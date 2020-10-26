const $canvas = document.querySelector("canvas")
const ctx = $canvas.getContext("2d")

let intervalId
let frames = 0
let obstacles = []
const gravity = 0.98

/*window.onload = () => {
  const $canvas = document.querySelector('#canvas')
  const ctx = $canvas.getContext('2d')
  const $btn = document.querySelector('#start-button')
  let gameInterval;
  
  document.getElementById('start-button').onclick = () => {
    startGame();
  }

}
*/