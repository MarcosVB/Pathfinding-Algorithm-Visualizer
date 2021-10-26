
async function solveBFS() {

    let steps = 0;

    while (openNodes.length > 0) {

        steps++;
        let currentNode = openNodes.shift(0);

        if (currentNode.isTarget) {
            console.log(`Total steps (BFS): ${steps}`);
            printTrace(currentNode);
            return;
        }

        for (let neighbor of currentNode.neighbors) {

            if (!closedNodes.includes(neighbor)) {
                neighbor.previous = currentNode;
                openNodes.push(neighbor);
                closedNodes.push(neighbor);
            }
        }

        if (steps % (mazeSizeX * mazeSizeY * 0.005) == 0) {
            redraw();
            await sleep(delay);
        }
    }

    draw();
    console.log("No path available.");
}
