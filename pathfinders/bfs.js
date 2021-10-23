
function solveBFS() {
    let steps = 0;
    let n, n2;
    while (openNodes.length > 0) {
        steps++;
        n = openNodes.shift(0);
        if (n.isTarget) {
            console.log(`Total steps (BFS): ${steps}`);
            printTrace(n);
            return;
        }
        for (let neighbor of n.neighbors) {
            n2 = neighbor;
            if (!closedNodes.includes(n2)) {
                n2.previous = n;
                openNodes.push(n2);
                closedNodes.push(n2);
            }
        }
    }
    redraw();
    console.log("No path available.");
}
