
// Array
let openNodes, closedNodes, pathNodes;
// Matrix
let maze;
// Nodes
let start, target;
// int
let nodeSize, mazeSizeX, mazeSizeY, delay;
// Buttons
let butNewMaze, butSolve, resetButton;

function setup() {
    nodeSize = 8;
    delay = 1;
    mazeSizeX = parseInt(windowWidth / nodeSize);
    mazeSizeY = parseInt((windowHeight * 0.95) / nodeSize);

    //Draw settings
    createCanvas(mazeSizeX * nodeSize, mazeSizeY * nodeSize);
    noLoop();
    noStroke();

    //Functions
    newMaze();

    //Buttons
    butNewMaze = createButton('New Maze');
    butNewMaze.mousePressed(newMaze);
    resetButton = createButton('Reset');
    resetButton.mousePressed(resetMaze);
    butSolve = createButton('BFS');
    butSolve.mousePressed(solveBFS);
    butSolve = createButton('DFS');
    butSolve.mousePressed(solveDFS);
    butSolve = createButton('Dijkstra');
    butSolve.mousePressed(solveDijkstra);
    butSolve = createButton('A Star');
    butSolve.mousePressed(solveAStar);
}

function draw() {
    background(150);
    maze.forEach(array => { array.forEach(node => { node.paint() }) });
}

function newMaze() {
    openNodes = [];
    closedNodes = [];
    maze = [];
    pathNodes = [];
    createMaze();
    setStart();
    setTarget();
    updateMaze();
    draw();
}

function createMaze() {
    for (let i = 0; i < mazeSizeX; i++) {
        maze[i] = [];
        for (let j = 0; j < mazeSizeY; j++) {
            maze[i][j] = new Node(i, j);
        }
    }
}

function updateMaze() {
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            setNeighbors(i, j);
            maze[i][j].heuristic = Math.sqrt(Math.pow(target.x - i, 2) + Math.pow(target.y - j, 2));
        }
    }
}

function resetMaze() {
    openNodes = [start];
    closedNodes = [];
    pathNodes = [];
    resetNodes();
    redraw();
}

function resetNodes() {
    maze.forEach(array => { array.forEach(node => { node.reset() }) });
    start.distance = 0;
}

/**
 * 
 * @param {number} i - x index
 * @param {number} j - y index
 */
function setNeighbors(i, j) {
    const node = maze[i][j];

    if (i > 0 && maze[i - 1][j].isFree) {
        node.neighbors.push(maze[i - 1][j]);
    }

    if (i < maze.length - 1 && maze[i + 1][j].isFree) {
        node.neighbors.push(maze[i + 1][j]);
    }

    if (j > 0 && maze[i][j - 1].isFree) {
        node.neighbors.push(maze[i][j - 1]);
    }

    if (j < maze[i].length - 1 && maze[i][j + 1].isFree) {
        node.neighbors.push(maze[i][j + 1]);
    }

    if (i > 0 && j > 0 && maze[i - 1][j - 1].isFree) {
        node.neighbors.push(maze[i - 1][j - 1]);
    }

    if (i > 0 && j < maze[i].length - 1 && maze[i - 1][j + 1].isFree) {
        node.neighbors.push(maze[i - 1][j + 1]);
    }

    if (i < maze.length - 1 && j > 0 && maze[i + 1][j - 1].isFree) {
        node.neighbors.push(maze[i + 1][j - 1]);
    }

    if (i < maze.length - 1 && j < maze[i].length - 1 && maze[i + 1][j + 1].isFree) {
        node.neighbors.push(maze[i + 1][j + 1]);
    }
}

function setStart() {
    let i = parseInt(Math.random() * maze.length);
    let j = parseInt(Math.random() * maze[i].length);
    start = maze[i][j];
    start.isStart = true;
    start.isFree = true;
    start.distance = 0;
    openNodes.push(start);
}

function setTarget() {
    let i = parseInt(Math.random() * maze.length);
    let j = parseInt(Math.random() * maze[i].length);
    target = maze[i][j];
    target.isTarget = true;
    target.isFree = true;
}

function printTrace(node) {
    pathNodes.push(node);
    if (node.isStart) {
        redraw();
        console.log(`Path size: ${pathNodes.length}`)
        return;
    }
    printTrace(node.previous);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
