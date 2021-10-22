
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

    //Buttons
    butNewMaze = createButton('New Maze');
    butNewMaze.mousePressed(createMaze);
    resetButton = createButton('Reset');
    resetButton.mousePressed(resetMaze);
    butSolve = createButton('BFS');
    butSolve.mousePressed(solveBFS);
}

function draw() {
    background(150);
    for (let column of maze)
        for (let node of column) {
            if (node.isStart)
                fill(0, 0, 255);
            else if (node.isTarget)
                fill(0, 255, 0);
            else if (openNodes.includes(node))
                fill(250, 200, 0);
            else if (pathNodes.includes(node))
                fill(200, 0, 0);
            else if (closedNodes.includes(node))
                fill(250);
            else if (!node.isFree)
                fill(0);
            else
                continue; //Background color

            square(node.x * nodeSize, node.y * nodeSize, nodeSize);
        }
}

function createMaze() {
    openNodes = [];
    closedNodes = [];
    maze = [];
    pathNodes = [];
    for (let i = 0; i < mazeSizeX; i++) {
        maze[i] = [];
        for (let j = 0; j < mazeSizeY; j++)
            maze[i][j] = new Node(i, j);
    }
    setStart();
    setTarget();
    updateMaze();
    redraw();
}

function updateMaze() {
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            setNeighbors(maze, i, j);
        }
    }
}

function resetMaze() {
    openNodes = [start];
    closedNodes = [];
    pathNodes = [];
    resetNeighbors();
    updateMaze();
    redraw();
}

function resetNeighbors() {
    for (let column of maze) {
        for (let node of column) {
            node.neighbors = [];
        }
    }
}

/**
 * 
 * @param {Node[][]} nodes - Node matrix
 * @param {number} i - x index
 * @param {number} j - y index
 */
function setNeighbors(nodes, i, j) {
    const node = nodes[i][j];

    if (i > 0 && nodes[i - 1][j].isFree) {
        node.neighbors.push(nodes[i - 1][j]);
    }

    if (i < nodes.length - 1 && nodes[i + 1][j].isFree) {
        node.neighbors.push(nodes[i + 1][j]);
    }

    if (j > 0 && nodes[i][j - 1].isFree) {
        node.neighbors.push(nodes[i][j - 1]);
    }

    if (j < nodes[i].length - 1 && nodes[i][j + 1].isFree) {
        node.neighbors.push(nodes[i][j + 1]);
    }
}

function setStart() {
    let i = parseInt(Math.random() * maze.length);
    let j = parseInt(Math.random() * maze[i].length);
    maze[i][j].isStart = true;
    maze[i][j].isFree = true;
    start = maze[i][j];
    openNodes.push(start);
}

function setTarget() {
    let i = parseInt(Math.random() * maze.length);
    let j = parseInt(Math.random() * maze[i].length);
    maze[i][j].isTarget = true;
    maze[i][j].isFree = true;
    target = maze[i][j];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
