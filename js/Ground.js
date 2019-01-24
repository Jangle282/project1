class Object { // small pieces that make up the ground and are in an array
  constructor(x,y,width,height,imgName) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.yDiff = 0
    // this.img.src = 'file extension'+ imgName +'rest of files extension'
  }
  draw() {
    ctx.fillStyle = "black"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  centerX() {return this.x + this.width/2}
  centerY() {return this.y - this.height/2}
}