
let colNumb;
let rowNumb;
let cellW;
let cellH;
let toggle;

let color;
let speedFactor;

let reloadTimeout; 

let objectList = []

function setup() {
  const quantityValue = localStorage.getItem("quantityValue") || 8;
  colNumb = parseInt(quantityValue, 10); 

  const contrastValue = localStorage.getItem('contrastValue') || 20;
  color = parseInt(contrastValue, 10)

  const speedValue = localStorage.getItem('speedValue') || 450;
  speedFactor = map(parseInt(speedValue, 10), 100, 600, 600, 100);

  let canvas = createCanvas(600, 600);
  canvas.parent('container');
  
  rowNumb = colNumb;
  cellW = width / colNumb;
  cellH = height / rowNumb;
  
  circleGrid = new CircleGrid(rowNumb, colNumb);

  noStroke()
}

function draw() {
  background("#ddd");
  circleGrid.updateAndShow(); 
  

  const contrastInput = document.getElementById('contrast');
  contrastInput.value = localStorage.getItem('contrastValue') || 20;
  const root = document.documentElement;

  contrastInput.addEventListener('input', () => {
    localStorage.setItem('contrastValue', contrastInput.value);
    color = parseInt(contrastInput.value, 10);
    if (color > 220) {
      root.style.setProperty('--currentColor', '#ffffff')
    } else {
      root.style.setProperty('--currentColor', '#141414')
    }
  })

  const speedInput = document.getElementById('speed');
  speedInput.value = localStorage.getItem('speedValue') || 450;
  
  speedInput.addEventListener('input', () => {
    localStorage.setItem('speedValue', speedInput.value);
    speedFactor = map(parseInt(speedInput.value, 10), 100, 600, 600, 100);
  })
}

  const quantitySlider = document.getElementById('quantity');
  quantitySlider.value = localStorage.getItem('quantityValue') || 8;

  quantitySlider.addEventListener('input', () => {
    clearTimeout(reloadTimeout);
    localStorage.setItem('quantityValue', quantitySlider.value);
    reloadTimeout = setTimeout(() => {
      location.reload();
  }, 500);
  })





