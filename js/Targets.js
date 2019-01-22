class Chicken {
  constructor(x,y,imgName){
    this.x = x
    this.y = y
    this.width = 62
    this.height = 62
    this.direction = imgName
    this.img = new Image()
    // this.img.src = `images/chick${imgName}1.png`
    this.img.src = `images/chick${imgName}1.png`
  }
  midX() {return this.x +width/2}
  right() {return this.x + this.width}
  bottom() {return this.y + this.height}
  endGameEdge() {
    if (this.direction === 'left') {return this.x} 
    else if (this.direction === 'right') {return this.right()}
    }
  draw() {
    ctx.drawImage(this.img,this.x, this.y, this.width, this.height)
    // ctx.fillRect(this.x, this.y, this.width, this.height)
    // img.onload = function(){ 
    // }
  }
  
}

