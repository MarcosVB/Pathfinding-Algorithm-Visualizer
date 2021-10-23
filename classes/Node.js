/**
 * @class
 */
class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.neighbors = [];
        this.isFree = Math.random() > 0.7 ? false : true;
        this.isStart = false;
        this.isTarget = false;
        this.previous = null;
        this.distance = Infinity;
        this.heuristic = 0;
    }

    reset() {
        this.previous = null;
        this.distance = Infinity;
    }

    paint() {
        if (this.isStart)
            fill(0, 0, 255);
        else if (this.isTarget)
            fill(0, 255, 0);
        else if (openNodes.includes(this))
            fill(250, 200, 0);
        else if (pathNodes.includes(this))
            fill(200, 0, 0);
        else if (closedNodes.includes(this))
            fill(250);
        else if (!this.isFree)
            fill(0);
        else
            return; //Background color

        square(this.x * nodeSize, this.y * nodeSize, nodeSize);
    }
}
