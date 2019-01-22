//GLOBAL VARIABLES
var canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
var width = 1000
var height = 600 
var objectsArray = []
var chickenArray = []
var frameCounter = 0
var mouseX = 0
var mouseY = 0
var points = 0
var gameOver = false
var intervalId = 0
var freqChick = 45
// var colorArray = [
//                 {
//                   name: 'darkgreen',
//                   hex: '#006400'
//                 }
//                 {
//                   name: 'cornflowerBlue',
//                   hex: '#6495ED'
//                 }

//                 }]

// ONSTART
window.onload = function() {
  createBackground()
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
};


// DRAW EVERYTHING
function drawEverything() {
  clearCanvas()
  drawPointsBox()
  drawGround()
  drawChickens()
  drawGrass()

  
}

// UPDATE EVERYTHING
function updateEverything() {
  frameCounter++
  // console.log(frameCounter)
  for (var i =0; i < chickenArray.length; i++) {
    if (chickenArray[i].direction === 'left') {chickenArray[i].x -= 10} 
    else {chickenArray[i].x += 10}
    if ((chickenArray[i].endGameEdge() > width+10 ) || (chickenArray[i].endGameEdge() < -10)) {
      gameOver = true
      stopGame()
      if (gameOver === true) {drawGameOver()}
      // console.log('game stopped')
    }
    for (var j= 0; j < objectsArray.length; j++) {
      if (chickenArray[i].x +chickenArray[i].width/2 >= objectsArray[j].x) {
      // console.log('collision')
      chickenArray[i].y = objectsArray[j].y - chickenArray[i].height
      }
    }
  }
  if (frameCounter % 20 === 0) {
    chickenArray.push(new Chicken(0,200, 'right'))
    chickenArray.push(new Chicken(width,200, 'left'))
    console.log('bawk new right chicken')
    console.log('bawk new left chicken')
  }   // creating new chickens every x frames
  }

// FUNCTIONS
document.getElementById("canvas").onclick = function() {
  if (frameCounter === 0) {
  startGame()
  console.log('clicked')
  }
}

function startGame() {
  intervalId = setInterval(function() {
    updateEverything()
    drawEverything()
  }, 10)
}

function drawGrass() {
  img = new Image()
  img.src = 'images/grass.png'
  for (var i =0; i < objectsArray.length; i++) {
    if (i % 1 === 0) {
    grassY =  objectsArray[i].y - 15
    x = objectsArray[i].x
    ctx.drawImage(img,x,grassY, 20, 15)
    }
  }
}

function createBackground(){
  var startY = height*0.75
  var startX = 0
  var resolution = 10 // between 1 and width - high the less resolution 
  var gradient = -5
  var noTiles = width / resolution  // = 100
  var tileWidth = width / noTiles // = 10
  var tileHeight = 5
  for (var i=0; i < noTiles ; i++) { // generates landscape
    objectsArray.push(new Object(startX,startY,tileWidth,tileHeight))  
    startX += tileWidth // 0 +10
    startY += gradient
    if ((i !== 0) && (i % (noTiles/4) === 0)) { 
    gradient *= -1.3
    }
  }
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
  // console.log('draw game over')
}

function collision() {
}

function clearCanvas() {
  ctx.clearRect(0,0,width,height)
}

function stopGame() {
  clearInterval(intervalId)
  frameCounter = 0
  gameOver === false
  chickenArray.splice(chickenArray[0], chickenArray.length)
  document.getElementById("canvas").onclick = function() {
    if (frameCounter === 0) {
    clearCanvas()
    startGame()
    console.log('clicked')
    }
  }
} // how do you stop the animation?

function drawGround() {
  for (var i=0; i<objectsArray.length;i++){
    objectsArray[i].draw()
    // if (i % 2 === 0) {
    //   objectsArray[i].drawGrass()
    // }
  }
} // unneeded???

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

function killChicken(index) {
  chickenArray.splice(index, 1)
  points += 10
  console.log(`chicken down!, ${points} added, chicken spliced`)
}

// KEYDOWN?CLICK EVENTS
canvas.addEventListener('click', (e) => {
  e.preventDefault()
  mouseX =  e.pageX - 60
  mouseY = e.pageY - 52
  // console.log(mouseX)
  // console.log(mouseY)
  for (var i = 0; i < chickenArray.length; i++) {
    if (!((mouseX < chickenArray[i].x)        || 
          (mouseX > chickenArray[i].right())  || 
          (mouseY > chickenArray[i].bottom()) || 
          (mouseY < chickenArray[i].y)
          ) ) {
            killChicken(i)
            console.log('kill the chicken')
      }
  }  
})



// ANIMATION / interval 
// function animation() {
//   updateEverything()
//   drawEverything()
//   var cancelAnimation = window.requestAnimationFrame(animation)
// }


//on load
  // - create background
  // draw start screen
  // 
  // load images

//on start click - 
// startGame()

// drawGround()
// animation()








// GRAVEYARD

// setting and interval 
