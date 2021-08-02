import { Color } from "./color.js";
import { Direction } from "./direction.js";

export class Player {
    x = 0;
    y = 0;
    dir = Direction.North;
    color = Color.orange;

    constructor(x, y, dir, color) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.color = color;
    }

    static equals(p1, p2) {
        return p1.x === p2.x &&
        p1.y === p2.y &&
        p1.dir === p2.dir &&
        p1.color === p2.color;
    }

    tryWalk() {

        switch(this.dir) {
            case Direction.North: return new Player(this.x, this.y-1, this.dir, this.color);

            case Direction.East: return new Player(this.x+1, this.y, this.dir, this.color);

            case Direction.South: return new Player(this.x, this.y+1, this.dir, this.color);

            case Direction.West: return new Player(this.x-1, this.y, this.dir, this.color);

            default: return new Player(this.x, this.y, this.dir, this.color);
        }
    }

    turn(val) {
        //Ensure that dir gets wrapped around 3
        this.dir = this.mod(this.dir + val, 4);

        if (this.dir < 0 || this.dir > 3) {
            alert("Val ")
        }
    }

    mod(n, m) {
        var remain = n % m;
        return Math.floor(remain >= 0 ? remain : remain + m);
    };
}