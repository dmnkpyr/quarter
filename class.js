class Circle {
  constructor(x, y){
    this.x = x
    this.y = y
    this.a = 0
    this.factor = 0
    this.toggle = false

    this.size_1 = random(5, cellW + cellW / 2)
    this.size_2 = random(5, cellW + cellW / 2)
    this.size_3 = random(5, cellW + cellW / 2)
    this.size_4 = random(5, cellW + cellW / 2)

    this.pauseDuration = 12
    this.pauseTimer = 0
    this.isPaused = false 
  }

  show() {
    fill(color)
    let THPI = PI + HALF_PI
    push()
    translate(this.x, this.y)
    rotate(TWO_PI * this.factor)
    arc(0, 0, this.size_1 * this.factor, this.size_1 * this.factor, 0, HALF_PI)
    arc(0, 0, this.size_2 * this.factor, this.size_2 * this.factor, HALF_PI, PI)
    arc(0, 0, this.size_3 * this.factor, this.size_3 * this.factor, PI, THPI)
    arc(0, 0, this.size_4 * this.factor, this.size_4 * this.factor, THPI, TAU)
    ellipse(0, 0, 5)
    pop();
  }

  update() {
    if (this.isPaused == false) {
      this.a += PI / speedFactor;
      this.factor = sin(this.a);

      
      if (this.factor >= 0.999) {
        this.isPaused = true;
        this.pauseTimer = this.pauseDuration;
      }
    } else {
      this.pauseTimer-=1;
      if (this.pauseTimer <= 0) {
        this.isPaused = false
      }
    }

    if (this.factor <= 0.001) {
      this.toggle = true
    } else {
      this.toggle = false
    }

  }
}



class CircleGrid {
  constructor(rows, cols){
    this.circles = []
    this.createGrid(rows, cols)
  }

  createGrid(rows, cols) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellW + cellW / 2
        const y = row * cellH + cellH / 2
        const newCircle = new Circle(x, y)
        this.circles.push(newCircle)
      }
    }
  }

  updateAndShow() {
    let allToggled = true;
    for (let circle of this.circles) {
      circle.update();
      circle.show();
      if (circle.toggle == false) {
        allToggled = false;
      }
    }

    if (allToggled == true) {
      this.circles = []; 
      this.createGrid(rowNumb, colNumb); 
    }
  }
}
