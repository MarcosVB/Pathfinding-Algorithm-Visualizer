
function solveAStar() {

    let steps = 0;

    while (openNodes.length > 0) {

        steps++;
        let currentNode = getSmallestCostNode(openNodes);

        if (currentNode.isTarget) {
            console.log(`Total steps (A Star): ${steps}`);
            printTrace(currentNode);
            return;
        }

        for (let neighbor of currentNode.neighbors) {

            let distance = currentNode.distance + Math.sqrt(Math.pow(neighbor.x - currentNode.x, 2) + Math.pow(neighbor.y - currentNode.y, 2));

            if (distance < neighbor.distance) {
                neighbor.distance = distance;
                neighbor.previous = currentNode;

                if (!closedNodes.includes(neighbor)) {
                    openNodes.push(neighbor);
                    closedNodes.push(neighbor);
                }
            }
        }
    }

    redraw();
    console.log("No path available.");
}

function getSmallestCostNode(nodeList) {
    let index = 0;
    for (let i = 1; i < nodeList.length; i++) {
        if (nodeList[i].distance + nodeList[i].heuristic < nodeList[index].distance + nodeList[index].heuristic) {
            index = i;
        }
    }
    return nodeList.splice(index, 1).pop();
}
