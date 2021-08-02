import { Player } from "./player.js";

export class Change {
    
    map = [];
    player = null;

    constructor(map, player) {

        this.player = new Player(player.x, player.y, player.dir, player.color);

        for (let y = 0; y < map.length; y++) {

            let row = [];

            for (let x = 0; x < map[0].length; x++) {
                row.push(map[y][x]);
            }

            this.map.push(row);
        }
    }

    static equals(c1, c2) {

        if (c1.map.length !== c2.map.length) {
            return false;
        }

        for(let y = 0; y < c1.map.length; y++) {

            for (let x = 0; x < c1.map[0].length; x++) {

                if (c1.map[y][x] !== c2.map[y][x]) {
                    return false;
                }
            }
        }

        return Player.equals(c1.player, c2.player);
    }
}