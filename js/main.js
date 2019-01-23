//GLOBAL VARIABLES
var canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
var width = 1000
var height = 600 
var mouseY = 0
var mouseX = 0
var groundEndY = 0
var groundStartY = height*0.65
var objectsArray = []
var chickenArray = []
var frameCounter = 0
var points = 0
var intervalId = 0
var state = 'start' // 'start' // 'over' // 'play'

// ONSTART
window.onload = function() {
  createBackground()
  drawStartScreen()
  // canvas.style.cursor = "url(images/crosshairs.png), crosshair";
};

// DRAW EVERYTHING during game play
function drawGame() {
  clearCanvas()
  drawSky()
  drawGround()
  drawPointsBox()
  drawGrass()
  drawChickens()
}

// UPDATE EVERYTHING during game play
function updateEverything() {
  frameCounter++; 
  // creating new chicken objects - could take out of this function?
  if (frameCounter % 20 === 0) {
    chickenArray.push(new Chicken(-29, groundStartY+this.height, 62, 62, 'right'))
    chickenArray.push(new Chicken(width, groundEndY+this.height, 62,62,'left'))
  } 
  // updating states of things in chickenArray - x and y and reaching the edge
  for (var i =0; i < chickenArray.length; i++) {
    if (chickenArray[i].direction === 'left') {// updating the horizontal movement
      chickenArray[i].x -= 10} 
    else if (chickenArray[i].direction === 'right') {
      chickenArray[i].x += 10} 
    // else if (chickenArray[i].direction ==- "Dead") {}//TODO INSERT GRAVITY AND FRICTION LIKE IN BALL THING
    if ((chickenArray[i].endGameEdge() > 1030 ) || (chickenArray[i].endGameEdge() < -30)) {
      state = 'over' 
    } // if the "endgameedge" of a chicken reaches the other side - stops game and shows game over screen 
    for (var j= 0; j < objectsArray.length; j++) {
      if (chickenArray[i].x + chickenArray[i].width/2 >= objectsArray[j].x) {
      chickenArray[i].y = objectsArray[j].y - chickenArray[i].height*1.15
      } // updating the vertical movement of chickens
    }
  } 
  if (state === 'over') {
    stopGame()
    reset()
    drawGameOver()
  }
}

// FUNCTIONS
function startGame() {
  state === 'play'
  intervalId = setInterval(function() {
    drawGame()
    updateEverything()
  }, 100)
}

function stopGame() {
  clearInterval(intervalId)
} 

function reset() {
  frameCounter = 0
  points = 0
  intervalId = 0
  objectsArray.splice(0, objectsArray.length)
  chickenArray.splice(0, chickenArray.length)
}

function createBackground(){
  var startX = 0
  var resolution = 10 // between 1 and width - high the less resolution 
  var gradient = -5
  var noTiles = width / resolution  // = 100
  var tileWidth = width / noTiles // = 10
  var tileHeight = 5
  for (var i=0; i < noTiles ; i++) { // generates landscape
    objectsArray.push(new Object(startX,groundStartY,tileWidth,tileHeight))  
    startX += tileWidth // 0 +10
    groundStartY += gradient
    groundEndY =  objectsArray[objectsArray.length-1].y
    if ((i !== 0) && (i % (noTiles/4) === 0)) { 
      gradient *= -1.125
    }

  }
}

function killChicken(index) {
  points += 10
  var deadX = chickenArray[index].x
  var deadY = chickenArray[index].y
  chickenArray.splice(index, 1)
  chickenArray.push(new Chicken(deadX, deadY, 50, 50, 'Dead'))
}

// DRAWING FUNCTIONS
function drawStartScreen() {
  ctx.fillStyle = 'black'
  ctx.fillRect(0,0,width,height)
  ctx.fillStyle = 'darkred'
  ctx.font = "100px Gameover"
  var stScTextWidth = ctx.measureText('Chicken Clickin').width;
  var stScTextX = (width/2) - (stScTextWidth/2)
  ctx.fillText(`Chicken Clicken`, stScTextX, 240, width)
  ctx.fillStyle = 'azure'
  ctx.font = "70px Gameover"
  var stScTextWidth = ctx.measureText('Click to Start').width;
  var stScTextX = (width/2) - (stScTextWidth/2)
  ctx.fillText('Click to Start', stScTextX, 340, width)
  }
  
function clearCanvas() {
  ctx.clearRect(0,0,width,height)
}

function drawGameOver() {
  clearCanvas()
  ctx.fillStyle = 'black'
  ctx.fillRect(0,150,width,300)
  ctx.fillStyle = 'darkred'
  ctx.font = "110px Gameover"
  var textWidth = ctx.measureText("GAME OVER").width;
  var textX = (width/2) - (textWidth/2)
  ctx.fillText('GAME OVER', textX, 310, width)
  ctx.fillStyle = 'white'
  ctx.font = "50px Gameover"
  var ScTextWidth = ctx.measureText(`Score: ${points}`).width;
  var ScTextX = (width/2) - (ScTextWidth/2)
  ctx.fillText(`Score: ${points}`, ScTextX, 390, width)
  ctx.fillStyle = 'black'
  ctx.font = "35px Gameover"
  var rsTextWidth = ctx.measureText('Click to Restart').width;
  var rsTextX = (width/2) - (rsTextWidth/2)
  ctx.fillText('Click to Restart', rsTextX, 550, width)
}

function drawGrass() {
  img = new Image()
  img.src = 'images/greenCircle.png'
  for (var i =0; i < objectsArray.length; i++) {
    if (i % 1 === 0) {
    var grassW = 17
    var grassH = 17
    var grassY = objectsArray[i].centerY() - grassH/2
    var grassX = objectsArray[i].centerX() - grassW/2
    ctx.drawImage(img,grassX,grassY, grassW, grassH)
    }
  }
}

function drawSky() {
  ctx.fillStyle = "lightBlue"
  ctx.fillRect(0,0,width,height)
}

function drawGround() {
  for (var i=0; i<objectsArray.length;i++){
    objectsArray[i].draw()
    ctx.fillStyle = "saddleBrown"
    ctx.fillRect(objectsArray[i].x, objectsArray[i].y, 10, 600)
  }
} // DEBUG - draws the objects making the ground line

function drawPointsBox() {
  ctx.fillStyle = "black"
  ctx.fillText(`Score: ${points}`, 680, 80, 1000)
  ctx.font = "50px Gameover"
}

function drawChickens() {
  for (var i=0; i< chickenArray.length;i++){
    chickenArray[i].draw()
  }
}

// KEYDOWN?CLICK EVENTS
canvas.addEventListener('click', (e) => {
  if (state === 'start') {
    state = 'play'
    startGame()
  }
})

canvas.addEventListener('click', (e) => {
  // e.preventDefault()
  if (state === 'over') {
    createBackground()
    drawStartScreen()
    state = 'start'
  }
})

canvas.addEventListener('click', (e) => {
  mouseX =  e.pageX - 60
  mouseY = e.pageY - 52
  // console.log(mouseX)
  // console.log(mouseY)
  if (state === 'play') {
    for (var i = 0; i < chickenArray.length; i++) {
      if (!((mouseX < chickenArray[i].x)        || 
            (mouseX > chickenArray[i].right())  || 
            (mouseY > chickenArray[i].bottom()) || 
            (mouseY < chickenArray[i].y)
           ) ) {
            killChicken(i)
        }
    }  
  }
})


// color picker for sky and ground colors


// GRAVEYARD

// setting and interval 

// ANIMATION / interval 
// function animation() {
//   updateEverything()
//   drawEverything()
//   var cancelAnimation = window.requestAnimationFrame(animation)
// }

// document.getElementById("canvas").onclick = function() {
//   if (frameCounter === 0) {
//   startGame()
//   console.log('clicked start screen')
//   }
// }


// var img = new Image() // create new image element
// img.src = 'images/crosshairs.png'
// img.onload = function(){ 
//   ctx.drawImage(img,10,10,10,10) // which image, where to draw 
// }
