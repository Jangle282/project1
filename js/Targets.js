class Chicken {
  constructor(x,y,chickWidth,chickHeight,direction){
    this.x = x
    this.y = y
    this.width = chickWidth
    this.height = chickHeight
    this.direction = direction
    this.img = new Image()
    this.vx = 5 //*** */
    this.vy = 2 //*** */
    // this.img.src = `images/chick${direction}1.png`
    this.img.src = `images/chick${direction}1.png`
  }
  midX() {return this.x +width/2}
  right() {return this.x + this.width}
  bottom() {return this.y + this.height}
  endGameEdge() {
    if (this.direction === 'left') {return this.x} 
    if (this.direction === 'right') {return this.right()}
    if (this.direction === "Dead") {return 500}
    }
  draw() {
    ctx.drawImage(this.img,this.x, this.y, this.width, this.height)
    // ctx.fillRect(this.x, this.y, this.width, this.height)
    // img.onload = function(){ 
    // }
  }

  
}

