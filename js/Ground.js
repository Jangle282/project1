class Object { // small pieces that make up the ground and are in an array
  constructor(x,y,width,height,imgName) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    // this.img.src = 'file extension'+ imgName +'rest of files extension'
  }
  draw() {
    ctx.fillStyle = "black"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}


// create centre points for ground lines objects inclass
// use those centre points in the loop when drawing the grass to position the grass 