let xoff = 0;
let yoff = 0;
let terrain = [];
let flying = 0;
let cols, rows;
let scl = 20;
let cloudX = 0; // Initialize the x position of the clouds


var myFont;
function preload() {
  myFont = loadFont('assets/Roboto-Light.ttf');
}

function setup() {
  console.log("setup", myFont)
  textFont(myFont);
  frameRate(60);
  textSize(scl / 2); // Set the text size

  createCanvas(windowWidth, windowHeight); // Use 2D rendering
  const w = windowWidth;
  const h = windowHeight;
  let extraWidth = 200; // Extra width to extend beyond the visible area
  cols = Math.floor((windowWidth + extraWidth) / scl);
  rows = Math.floor(h / scl);
}



function draw() {
  background(220);
  translate(0, 35); // Adjust the second argument to move the terrain lower or higher
//   / Draw the clouds
  push(); // Save the current transformation matrix
  translate(cloudX, -50); // Move the clouds
  drawClouds();
  pop(); // Restore the transformation matrix

  // Draw the terrain
  // Continue with your existing code...

  // Move the clouds
  cloudX += 0.5; // Adjust this value to change the speed of the clouds
  if (cloudX > width) {
    cloudX = -200; // Reset the position of the clouds when they move off the canvas
  }
// }
}
// for (let x = 0; x < cols - 1; x++) {
//     for (let y = 0; y < rows - 1; y++) {
//       let size = map(y, 0, rows, scl / 2, scl);
//       let posX = x * size;
//       let posY = map(y, 0, rows, height / 2, height);
  
//       // Calculate the color based on the height
//       let avgHeight = (heights[x][y] + heights[x+1][y] + heights[x][y+1] + heights[x+1][y+1]) / 4;
//       let colorVal = map(avgHeight, -100, 100, 0, 255); // Map the height to a value between 0 and 255
  
//       // Set the color and draw two triangles to form a square
//       fill(colorVal);
//       triangle(posX, posY + heights[x][y], posX + size / 2, posY + size + heights[x+1][y+1], posX + size, posY + heights[x+1][y]);
//       triangle(posX, posY + heights[x][y], posX + size / 2, posY + size + heights[x+1][y+1], posX, posY + size + heights[x][y+1]);
//     }
//   }
function drawClouds() {
    let cloudSize = 200; // Adjust this value to change the size of the clouds
    let cloudDetail = 0.02; // Adjust this value to change the detail of the clouds
    let heights = Array(cloudSize).fill().map(() => Array(cloudSize).fill(0));
  
    // Calculate the heights
    for (let x = 0; x < cloudSize; x++) {
      for (let y = 0; y < cloudSize; y++) {
        let noiseVal = noise(x * cloudDetail, y * cloudDetail);
        heights[x][y] = map(noiseVal, 0, 1, -100, 100);
      }
    }
  
    // Draw the clouds as a grid of triangles
    for (let x = 0; x < cloudSize - 1; x++) {
      for (let y = 0; y < cloudSize - 1; y++) {
        let size = map(y, 0, cloudSize, scl / 2, scl);
        let posX = x * size;
        let posY = map(y, 0, cloudSize, height / 2, height);
  
        // Calculate the color based on the height
        let avgHeight = (heights[x][y] + heights[x+1][y] + heights[x][y+1] + heights[x+1][y+1]) / 4;
        let colorVal = map(avgHeight, -100, 100, 255, 255); // Map the height to a value between 0 and 255
  
        // Interpolate the heights
        let h1 = lerp(heights[x][y], heights[x+1][y], 0.5);
        let h2 = lerp(heights[x][y+1], heights[x+1][y+1], 0.5);
  
        // Set the color and draw two triangles to form a square
        fill(colorVal);
        triangle(posX, posY + size + h1, posX + size / 2, posY + heights[x+1][y], posX + size, posY + size + h2);
        triangle(posX, posY + size + h1, posX + size / 2, posY + heights[x+1][y], posX, posY + heights[x][y]);
      }
    }
  }