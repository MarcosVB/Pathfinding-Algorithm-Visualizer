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
}
