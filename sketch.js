var open, close, path; //Array
var maze; //Matrix
var nodeSize, mazeSizeX, mazeSizeY, delay; //int
var butNewMaze, butSolve; //Buttons

function setup() {
  nodeSize = 20;
  delay = 1;
  mazeSizeX = parseInt(windowWidth / nodeSize);
  mazeSizeY = parseInt((windowHeight * 0.95) / nodeSize);

  //Draw settings  
  createCanvas(mazeSizeX * nodeSize, mazeSizeY * nodeSize);
  noLoop();
  noStroke();

  //Functions
  createMaze();
  solve();

  //Buttons
  butNewMaze = createButton('New Maze');
  butNewMaze.mousePressed(createMaze);
  butSolve = createButton('Solve');
  butSolve.mousePressed(solve);
}

function draw() {
  background(150);
  for (let i = 0; i < maze.length; i++)
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j].isStart)
        fill(0, 0, 255);
      else if (maze[i][j].isTarget)
        fill(0, 255, 0);
      else if (open.includes(maze[i][j]))
        fill(250, 200, 0);
      else if (path.includes(maze[i][j]))
        fill(200, 0, 0);
      else if (close.includes(maze[i][j]))
        fill(250);
      else if (!maze[i][j].isFree)
        fill(0);
      else
        continue; //Background color

      square(maze[i][j].x * nodeSize, maze[i][j].y * nodeSize, nodeSize);
    }
}

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.neighbors = [];
    this.isFree = Math.random() > 0.7 ? false : true;
    this.isStart = false;
    this.isTarget = false;
    this.previous = null;
  }
}

function createMaze() {
  open = [];
  close = [];
  maze = [];
  path = [];
  for (let i = 0; i < mazeSizeX; i++) {
    maze[i] = [];
    for (let j = 0; j < mazeSizeY; j++)
      maze[i][j] = new Node(i, j);
  }
  setRandomStart();
  setRandomTarget();
  updateMaze();
  redraw();
}

function updateMaze() {
  for (let i = 0; i < maze.length; i++)
    for (let j = 0; j < maze[i].length; j++) {
      if (i > 0)
        if (maze[i - 1][j].isFree)
          maze[i][j].neighbors.push(maze[i - 1][j]);
      if (i < maze.length - 1)
        if (maze[i + 1][j].isFree)
          maze[i][j].neighbors.push(maze[i + 1][j]);
      if (j > 0)
        if (maze[i][j - 1].isFree)
          maze[i][j].neighbors.push(maze[i][j - 1]);
      if (j < maze[i].length - 1)
        if (maze[i][j + 1].isFree)
          maze[i][j].neighbors.push(maze[i][j + 1]);
    }
}

function setRandomStart() {
  let i = parseInt(Math.random() * maze.length);
  let j = parseInt(Math.random() * maze[i].length);
  maze[i][j].isStart = true;
  maze[i][j].isFree = true;
  open.push(maze[i][j]);
}

function setRandomTarget() {
  let i = parseInt(Math.random() * maze.length);
  let j = parseInt(Math.random() * maze[i].length);
  maze[i][j].isTarget = true;
  maze[i][j].isFree = true;
}

async function solve() {
  let n, n2;
  while (open.length > 0) {
    n = open.shift(0);
    if (n.isTarget) {
      printTrace(n);
      return;
    }
    for (let i = 0; i < n.neighbors.length; i++) {
      n2 = n.neighbors[i];
      if (!close.includes(n2)) {
        n2.previous = n;
        open.push(n2);
        close.push(n2);
      }
    }
    redraw();
    await sleep(delay);
  }
  console.log("No path available.");
}

function printTrace(node) {
  //console.log("x: " + node.x + " y: " + node.y); //Debug log
  path.push(node);
  if (node.isStart) {
    redraw();
    return;
  }
  printTrace(node.previous);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}