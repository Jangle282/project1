class FlyingChicken {
  constructor(x,y,direction,pic='Dead'){
    this.x = x
    this.y = y
    this.width = 62
    this.height = 62
    this.centreX = this.x + 0.5 * this.width
    this.centreY = this.y + 0.5 * this.height
    this.direction = direction
    this.img = new Image()
    this.vx = 5 //*** */
    this.vy = 5 //*** */
    this.uphill = true
    this.img.src = `images/chick${this.direction}fly1.png`
  }
  midX() {return this.x +width/2}
  right() {return this.x + this.width}
  bottom() {return this.y + this.height}
  draw() {
    ctx.drawImage(this.img,this.x, this.y, this.width, this.height)
  }
}

class DeadChicken {
  constructor(x,y,direction,pic='Dead'){
    this.x = x
    this.y = y
    this.width = 70
    this.height = 70
    this.centreX = this.x + 0.5 * this.width
    this.centreY = this.y + 0.5 * this.height
    this.direction = direction
    this.img = new Image()
    this.vx = 10 //*** */
    this.vy = 1 //*** */
    this.uphill = true
    // this.img.src = `images/chick${direction}1.png`
    this.img.src = `images/chick${pic}${this.direction}1.png`
  }
  midX() {return this.x +width/2}
  right() {return this.x + this.width}
  draw() {
    if ((this.x < width/4) || (this.x > width/2) && (this.x <width*0.75) ) {
      ctx.save()
      ctx.translate(this.centreX,this.centreY);
      ctx.rotate((Math.PI / 180) * 310);
      ctx.translate(-this.centreX,-this.centreY)
      ctx.drawImage(this.img,this.x, this.y, this.width, this.height)
      ctx.restore()
    }
    if (((this.x < width/2) && (this.x > width/4)) || (this.x > width*0.75)) {
      ctx.save()
      ctx.translate(this.centreX,this.centreY);
      ctx.rotate((Math.PI / 180) * 100);
      ctx.translate(-this.centreX,-this.centreY)
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      console.log('drew one!')
      ctx.restore()
    }
  }

  
}

class ShotChicken {
  constructor(x,y,direction,pic='blood'){
    this.x = x
    this.y = y
    this.width = 120
    this.height = 120
    this.direction = direction
    this.img = new Image()
    this.vx = 5 //*** */
    this.vy = 2 //*** */
    // this.img.src = `images/chick${direction}1.png`
    this.img.src = `images/chick${pic}${this.direction}1.png`
  }
  midX() {return this.x +width/2}
  right() {return this.x + this.width}
  draw() {
    ctx.drawImage(this.img,this.x, this.y, this.width, this.height)
    // ctx.fillRect(this.x, this.y, this.width, this.height)
    // img.onload = function(){ 
    // }
  }

  
}

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
    this.rand = Math.floor(Math.random()*5)
    this.img.src = `images/chick${direction}1.png`
  }
  midX() {return this.x +width/2}
  right() {return this.x + this.width}
  bottom() {return this.y + this.height}
  // rand() {return Math.floor(Math.random()*200)}
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