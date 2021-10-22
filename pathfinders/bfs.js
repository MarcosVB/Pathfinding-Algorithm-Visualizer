
async function solveBFS() {
    let n, n2;
    while (openNodes.length > 0) {
        n = openNodes.shift(0);
        if (n.isTarget) {
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
        redraw();
        await sleep(delay);
    }
    redraw();
    console.log("No path available.");
}

function printTrace(node) {
    pathNodes.push(node);
    if (node.isStart) {
        redraw();
        return;
    }
    printTrace(node.previous);
}
