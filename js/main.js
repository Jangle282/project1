//GLOBAL VARIABLES
var canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
var width = 1000
var height = 600 
var mouseY = 0
var mouseX = 0
var groundEndY = 0
var groundStartY = height*0.85
var objectsArray = []
var chickenArray = []
var shotChickenArray = []
var deadChickenArray = []
var flyingChickenArray = []
var pointsArray = [{name: "Player1", points: 0}, {name: "Player1", points: 0},{name: "Player1", points: 0},{name: "Player1", points: 0},{name: "Player1", points: 0}]
var frameCounter = 0
var points = 0
var intervalId = 0
var state = 'start' // 'start' // 'over' // 'play'
var friction = 0.97
var gravity = 0.25

// ONSTART
window.onload = function() {
  canvas.style.cursor = "url(images/crosshairs2.png), crosshair";
  /* console.log(canvas.style.cursor) */
  createBackground()
  drawStartScreen()
};

// DRAW EVERYTHING during game play
function drawGame() {
  clearCanvas()
  drawSky()
  drawGround()
  drawPointsBox()
  drawGrass()
  drawChickens()
  calibration()
}

// UPDATE EVERYTHING during game play
function updateEverything() {
  frameCounter++; 
  // creating new chicken objects - could take out of this function?
  if (frameCounter % 20 === 0) {
    chickenArray.push(new Chicken(-29, groundStartY+this.height, 62, 62, 'right'))
    chickenArray.push(new Chicken(width, groundEndY+this.height, 62,62,'left'))
  } 
  if (frameCounter < 35) {
    drawInstructions(1)
  }
  if (frameCounter > 50 && frameCounter < 70) {
    drawInstructions(2)
  }
  if (frameCounter > 70 && frameCounter < 90) {
    drawInstructions(3)
  }
  if ((frameCounter > 100 && frameCounter < 125) || (frameCounter > 220 && frameCounter < 250)) {
    drawInstructions(4)
  }
  if ((frameCounter > 170 && frameCounter < 200) || (frameCounter > 270 && frameCounter < 300)){
    drawInstructions(5)
  }
  if ((points > 500) && (points < 530)) {
    drawInstructions(6)
  }
// updating states of live chickens and game over trigger
  for (var i =0; i < chickenArray.length; i++) {
    // creating random flying chickens
    if (chickenArray[i].rand === 3 && (chickenArray[i].x > width/4) && (chickenArray[i].x < width*0.75)) {
      var flyX = chickenArray[i].x
      var flyY = chickenArray[i].y
      var flyDir = chickenArray[i].direction
      chickenArray.splice(i, 1); 
      flyingChickenArray.push(new FlyingChicken(flyX, flyY, flyDir))}
    if (chickenArray[i].direction === 'left') { // updating the horizontal movement
      chickenArray[i].x -= 10} 
    else if (chickenArray[i].direction === 'right') {
      chickenArray[i].x += 10} 
    // else if (chickenArray[i].direction ==- "Dead") {}//TODO INSERT GRAVITY AND FRICTION LIKE IN BALL THING
    if ((chickenArray[i].endGameEdge() > 1030 ) || (chickenArray[i].endGameEdge() < -30)) {
      state = 'over' 
      pointsArray[4].points = points
    } // if the "endgameedge" of a chicken reaches the other side - stops game and shows game over screen 
    for (var j= 0; j < objectsArray.length; j++) {
      if (chickenArray[i].x + chickenArray[i].width/2 >= objectsArray[j].x) {
      chickenArray[i].y = objectsArray[j].y - chickenArray[i].height*1.15
      } // updating the vertical movement of chickens
    }
  } 
  // updating shot chickens size and location
  for (var i = 0; i < shotChickenArray.length; i++) {
    shotChickenArray[i].width -= 1 // could do this with a counter?
    shotChickenArray[i].height -= 1
    var deadX = shotChickenArray[i].x +35
    var deadY = shotChickenArray[i].y +35
    var deadDir = shotChickenArray[i].direction
    if (shotChickenArray[i].width < 99) {
      shotChickenArray.splice(i, 1); 
      deadChickenArray.push(new DeadChicken(deadX,deadY,deadDir))}
  }
  // updating dead chickens size and location
  for (var i = 0; i < deadChickenArray.length; i++) {
    // deadChickenArray[i].vx *= friction
    // if(deadChickenArray[i].direction === 'right') {
    //   deadChickenArray[i].x += deadChickenArray[i].vx
    // } else if (deadChickenArray[i].direction === 'left'){
    //   deadChickenArray[i].x -= deadChickenArray[i].vx
    // }
    // for (var j= 0; j < objectsArray.length; j++) {
    //   if (deadChickenArray[i].x + deadChickenArray[i].width/2 >= objectsArray[j].x) {
    //     if(objectsArray[j].yDiff < 0 ) {
    //       deadChickenArray[i].uphill = true
    //     } else if (objectsArray[j].yDiff > 0 ) {deadChickenArray[i].uphill = false}
    //     deadChickenArray[i].y = objectsArray[j].y - deadChickenArray[i].height*1.15
    //   }

    //     // deadChickenArray[i].y += deadChickenArray[i].vy
    //     // deadChickenArray[i].y += deadChickenArray[i].vy
    //   } // updating the vertical movement of chickens
    }
  // updating flying chickens size and location 
  for (var i =0; i<flyingChickenArray.length; i++){
    if (flyingChickenArray[i].direction === 'left') {
      flyingChickenArray[i].x -= flyingChickenArray[i].vx
      flyingChickenArray[i].y -= flyingChickenArray[i].vy
    }
    if (flyingChickenArray[i].direction === 'right') {
      flyingChickenArray[i].x += flyingChickenArray[i].vx
      flyingChickenArray[i].y -= flyingChickenArray[i].vy
    }
    flyingChickenArray[i].vy *= 1.03
    flyingChickenArray[i].vx *= 1.03
  }  
  if (state === 'over') {
    stopGame()
    reset()
    drawGameOver()
  }
}

// FUNCTIONS
function startGame() {
  // canvas.requestFullscreen()
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
  deadChickenArray.splice(0, deadChickenArray.length)
  flyingChickenArray.splice(0, deadChickenArray.length)
  groundStartY = height*0.85
}

function createBackground(){
  var startX = 0
  var resolution = 10 // between 1 and width - high the less resolution 
  var gradient = -5
  var noTiles = width / resolution  // = 100
  var tileWidth = width / noTiles // = 10
  var tileHeight = 5
  var prevY = groundStartY
  for (var i=0; i < noTiles ; i++) { // generates landscape
    objectsArray.push(new Object(startX,groundStartY,tileWidth,tileHeight))  
    startX += tileWidth // 0 +10
    groundStartY += gradient
    groundEndY =  objectsArray[objectsArray.length-1].y
    objectsArray[i].yDiff = objectsArray[i].y - prevY
    prevY = objectsArray[i].y
    if ((i !== 0) && (i % (noTiles/4) === 0)) { 
      gradient *= -1.25
    }
  }
}

function killChicken(index, type) {
  if (type === 'ground') {
    points += 10
    var shotX = chickenArray[index].x - 15
    var shotY = chickenArray[index].y - 15
    var shotDir = chickenArray[index].direction
    shotChickenArray.push(new ShotChicken(shotX,shotY,shotDir,'blood'))
    chickenArray.splice(index, 1)
  }
  if (type === 'flying') {
    points += 50
    var shotX = flyingChickenArray[index].x - 15
    var shotY = flyingChickenArray[index].y - 15
    var shotDir = flyingChickenArray[index].direction
    shotChickenArray.push(new ShotChicken(shotX,shotY,shotDir,'blood'))
    flyingChickenArray.splice(index, 1)
    console.log('flying chicken killed')
  }
 
}

// DRAWING FUNCTIONS
function drawInstructions(number) {
  if (number ===1) {
  ctx.fillStyle = 'black'
  ctx.font = "45px Gameover"
  ctx.fillText(`Click the Chickens!`, 50, 80)
  }
  if (number ===2) {
    ctx.fillStyle = 'black'
    ctx.font = "45px Gameover"
    ctx.fillText(`Click 'em Quick!`, 50, 80)
  }
  if (number ===3) {
    ctx.fillStyle = 'black'
    ctx.font = "45px Gameover"
    ctx.fillText(`Before they get away!`, 50, 80)
  }
  if (number ===4) {
    ctx.fillStyle = 'black'
    ctx.font = "45px Gameover"
    ctx.fillText(`Keep clickin'!`, 50, 80)
  }
  if (number ===5) {
    ctx.fillStyle = 'black'
    ctx.font = "45px Gameover"
    ctx.fillText(`Don't stop!`, 50, 80)
  }
  if (number ===6) {
    ctx.fillStyle = 'black'
    ctx.font = "65px Gameover"
    ctx.fillText(`mutha clucker!`, 50, 80)
  }
}

function drawStartScreen() {
  ctx.fillStyle = '#181818'
  ctx.fillRect(0,0,width,height)
  ctx.fillStyle = 'darkred'
  ctx.font = "100px Gameover"
  var stScTextWidth = ctx.measureText('Chicken Clickin').width;
  var stScTextX = (width/2) - (stScTextWidth/2)
  ctx.fillText(`Chicken Clickin`, stScTextX, 240, width)
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
  ctx.fillStyle = '#181818'
  ctx.fillRect(0,150,width,300)
  ctx.fillStyle = 'darkred'
  ctx.font = "110px Gameover"
  var textWidth = ctx.measureText("GAME OVER").width;
  var textX = (width/2) - (textWidth/2)
  ctx.fillText('GAME OVER', textX, 310, width)
  ctx.fillStyle = 'white'
  ctx.font = "50px Gameover"
  var ScTextWidth = ctx.measureText(`Score: ${pointsArray[4].points}`).width;
  var ScTextX = (width/2) - (ScTextWidth/2)
  ctx.fillText(`Score: ${pointsArray[4].points}`, ScTextX, 390, width)
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

function calibration() {
  ctx.fillStyle = "red"
  ctx.fillRect(25,25,1,1,)
}

function drawGround() {
  for (var i=0; i<objectsArray.length;i++){
    objectsArray[i].draw()
    ctx.fillStyle = "saddleBrown"
    ctx.fillRect(objectsArray[i].x, objectsArray[i].y, 10, 600)
  }
} 

function drawPointsBox() {
  ctx.fillStyle = "black"
  ctx.fillText(`Score: ${points}`, 690, 80, 1000)
  ctx.font = "45px Gameover"
}

function drawChickens() {
  for (var i = 0; i < deadChickenArray.length; i++) {
    deadChickenArray[i].x
    if (deadChickenArray[i].uphill === true ) {deadChickenArray[i].draw('incline')}
    if (deadChickenArray[i].uphill === false ) {deadChickenArray[i].draw('decline')}
  }
  for (var i = 0; i < shotChickenArray.length; i++) {
    shotChickenArray[i].draw()
  }
  for (var i=0; i< chickenArray.length;i++){
    chickenArray[i].draw()
  }
  for (var i=0; i < flyingChickenArray.length;i++) {
    flyingChickenArray[i].draw()
  }
}

// KEYDOWN?CLICK EVENTS
canvas.addEventListener('click', (e) => {
  // e.preventDefault()
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
  var BB = canvas.getBoundingClientRect();
  var offsetX=BB.left;
  var offsetY=BB.top;        
  mouseX = parseInt(e.clientX-offsetX) + 20;
  mouseY = parseInt(e.clientY-offsetY) + 20;
  // console.log(mouseX)
  // console.log(mouseY)
  if (state === 'play') {
    // console.log('click')
    for (var i = 0; i < chickenArray.length; i++) {
      if (!((mouseX < chickenArray[i].x)        || 
            (mouseX > chickenArray[i].right())  || 
            (mouseY > chickenArray[i].bottom()) || 
            (mouseY < chickenArray[i].y)
           ) ) {
            killChicken(i, 'ground')
        }
    }
    for (var i = 0; i < flyingChickenArray.length; i++) {
      if (!((mouseX < flyingChickenArray[i].x - 10)        || 
            (mouseX > flyingChickenArray[i].right()+ 10)  || 
            (mouseY > flyingChickenArray[i].bottom() +10) || 
            (mouseY < flyingChickenArray[i].y -10)
           ) ) {
            killChicken(i, 'flying')
            console.log("got a flying one!")
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

  // mouseX =  e.pageX  //- 45
  // mouseY = e.pageY //- 27
  // var rect = this.getBoundingClientRect(),
  // x = e.clientX - rect.left,
  // y = e.clientY - rect.top;
