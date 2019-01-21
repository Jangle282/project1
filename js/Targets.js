class Chicken {
  constructor(x,y,){
    this.x = x
    this.y = y
    this.width = 20
    this.height = 20
  }
  midX() {return this.x +width/2}
  right() {return this.x + this.width}
  bottom() {return this.y + this.height}
  draw() {
    ctx. fillRect(this.x, this.y, this.width, this.height)
  }
}