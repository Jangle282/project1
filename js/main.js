//GLOBAL VARIABLES
var canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
var width = 600
var height = 300
var objectsArray = []
var chickenArray = []
var frameCounter = 0

// ONSTART
function createBackground(){
  var startY = 220
  var startX = 0
  var tileWidth = 5
  var noTiles = width / tileWidth
  for (var i=0; i < noTiles; i++) {
    objectsArray.push(new Object(startX,startY,tileWidth,5))  
    startX += tileWidth
    if (i % 15 === 0) {
    startY -= 5}
  }
}

// DRAW EVERYTHING
function drawEverything() {
  clearCanvas()
  drawGround()
  drawChickens()
}


// UPDATE EVERYTHING
function updateEverything() {
  frameCounter++
  console.log(frameCounter)
  for (var i =0; i < chickenArray.length; i++) {
    chickenArray[i].x += 5
    if (chickenArray[i].x > width) {
      stopGame()
    }
    for (var j= 0; j < objectsArray.length; j++) {
      if (chickenArray[i].x +chickenArray[i].width/2 >= objectsArray[j].x) {
      console.log('collision')
      chickenArray[i].y = objectsArray[j].y - chickenArray[i].height
      }
    }
  }
  if (frameCounter % 20 === 0) {
    chickenArray.push(new Chicken(0,200))
    console.log('bawk new chicken')
    } // creating new chickens every x frames
  }

// FUNCTIONS

function collision() {

}

function clearCanvas() {
  ctx.clearRect(0,0,width,height)
}

function stopGame() {
  // window.cancelAnimationFrame(cancelAnimation)
  clearInterval(intervalId)
} // how do you stop the animation?

function drawGround() {
  for (var i=0; i<objectsArray.length;i++){
    objectsArray[i].draw()
  }
}

function drawChickens() {
  for (var i=0; i< chickenArray.length;i++){
    chickenArray[i].draw()
  }
}

// ANIMATION / interval 
// function animation() {
//   updateEverything()
//   drawEverything()
//   var cancelAnimation = window.requestAnimationFrame(animation)
// }
var intervalId = setInterval(() => {
  updateEverything()
  drawEverything()
}, 100)

// FUNCTION CALLS
createBackground()
// drawGround()
// animation()








// GRAVEYARD

// setting and interval 
