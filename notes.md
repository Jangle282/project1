set up sheets and folders
basic structure (look at prev solutions for tresure and memory)
research other games with same movements. 
practise with animation ratehr than set interval 

get movements across landscape
  maxence solution with with the angles in it ??
create landscap
create click-kill functionality - maybe maxdamage
find images - how big are they??
title & design start screen 
animationframe versus interval - animation is msoother but too fast - howto slow it down? and modualte the speed
randomise entry times
make landscape uneven 
make opposite direction targets


js sheets for classes - one for targets one for ground
main js sheet
  - globals
  - create targets
  - indidivdual functions for drawing and clearing
  - creating new target in update everything every certain number of frames, draw them in draw everything
  -one function for draw everything
    - clears everything
    - draws background
    - draws obejcts / playesr
  - a function for update everythign 
    - that take parameters of inputted infor(e,=.g. key codes, clicks)
    - updates the objects / players information based on the input
  keydown / click events call update everything function passing info from the evnet   
  - set timeout for draw everything after 500ms to ensure all images are loaded in an arrow funciton so vailable. 
  - set interval in arrow function or animation frames



  // // Solution 1 for animation: With setInterval (easier)
// setInterval(()=> { (commented out in metal slug clone)
//   updateEverything()
//   drawEverything()
// }, 1000/60)
function animation() { (car rotation )
  updateEverything()
  drawEverything()
  window.requestAnimationFrame(animation)
}
animation()


background - Axels grid system
use an array with characters to determine what the diff blocks are
loop through the array to draw the right images for that position - sky, ground turf...

or generate canvas items stored in an array - the line of the ground 





devices
mobile landscape / desktop

start screen 
title

starting game

play

ending game

points

highscores

difficulty
  - speed of targets
  - number of targets
components
- targets
    - left adn right facing
    - teh right shape for targetareas
    - veggie and meat mode
- cursor
- screens
  - start screen with optiosn and start button
  - game screen 
  - Game over screen
  - high scores screen 

  

test questions

how to show it landscape on a mobile 
  make a live link to test on mob

how to use sprites

background moving image