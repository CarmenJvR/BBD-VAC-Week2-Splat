import { Color } from "../models/color.js";
import { Command } from "../models/command.js";
import { Direction } from "../models/direction.js";
import { Player } from "../models/player.js";
import { Turn } from "../models/turn.js";

export const LEVEL_7 = {

map : [
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
    ["Wall", "Empty", "Empty", "Wall", "Splat 1", "Wall", "Splat 9", "Wall", "Splat 2", "Wall", "Splat 9", "Wall", "Bank_A", "Wall", "Wall", "Wall", "Wall", "Wall"],
    ["Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall"],
    ["Wall", "Wall", "Splat 3", "Empty", "Junction", "Empty", "Junction", "Empty", "Junction", "Empty", "Junction", "Empty", "Junction", "Gate 9", "Empty", "Empty", "Bank_B 0 1", "Wall"],
    ["Wall", "Wall", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Wall", "Wall"],
    ["Wall", "Splat 4", "Empty", "Junction", "Wall", "Empty", "Empty", "Empty", "Bank_B 0 3", "Empty", "Empty", "Empty", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall"],
    ["Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall"],
    ["Wall", "Splat 9", "Empty", "Junction", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall"],
    ["Wall", "Wall", "Wall", "Empty", "Wall", "Junction", "Gate 2", "Empty", "Empty", "Goal 2", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall"],
    ["Wall", "Splat 2", "Empty", "Junction", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall"],
    ["Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall"],
    ["Wall", "Splat 9", "Empty", "Junction", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall"],
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Gate 4", "Wall", "Wall", "Wall"],
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Gate 1", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Wall", "Wall"],
    ["Wall", "Wall", "Wall", "Wall", "Bank_B 0 2", "Empty", "Junction", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall", "Wall", "Wall"],
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
],

player : new Player(1, 1, Direction.East, Color.orange),

solution : [

  /*  new Command(Command.repeat_until, new Command(Command.reached_end), [

        new Command(Command.if_do_else, new Command(Command.and, new Command(Command.is_color, Color.blue), [new Command(Command.is_tile_ahead, "Splat")]), [
            new Command(Command.walk),
            new Command(Command.turn, Turn.back)

        ]),

        new Command(Command.if_do_else, new Command(Command.and, new Command(Command.is_color, Color.red), [new Command(Command.is_tile_current, "Mixer")]), [
            new Command(Command.turn, Turn.back)
        ]),

        new Command(Command.walk)
    ]) */



    new Command(Command.walk),
    new Command(Command.turn, Turn.right),
    new Command(Command.walk),
    new Command(Command.walk),
    new Command(Command.turn, Turn.left),
    new Command(Command.walk),
    new Command(Command.turn, Turn.right),
    new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.right),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Splat"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.back),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.left),
     new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Wall"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.right),
     new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Gate"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.left),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Bank"), [
        new Command(Command.walk)
     ]),
     new Command(Command.deposit, 1),
     new Command(Command.turn, Turn.back),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.right),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
     ]),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
     ]),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
     ]),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.right),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Splat"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.back),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.left),
     new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Gate"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.left),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Bank"), [
        new Command(Command.walk)
     ]),
     new Command(Command.deposit, 2),
     new Command(Command.turn, Turn.back),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.right),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
     ]),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.right),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Splat"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.back),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.left),
     new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Gate"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.left),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Bank"), [
        new Command(Command.walk)
     ]),
     new Command(Command.deposit, 3),
     new Command(Command.turn, Turn.back),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.right),
     new Command(Command.walk),
     new Command(Command.walk),
     new Command(Command.turn, Turn.right),
     new Command(Command.walk),
     new Command(Command.walk),
     new Command(Command.turn, Turn.back),
     new Command(Command.walk),
     new Command(Command.walk),
     new Command(Command.turn, Turn.left),
   //   new Command(Command.repeat_until, new Command(Command.is_tile_current, "Splat"), [
   //      new Command(Command.walk)
   //   ]),
   //   new Command(Command.turn, Turn.back),
     new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Wall"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.back),
     new Command(Command.walk),
     new Command(Command.walk),
     new Command(Command.turn, Turn.left),
     new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Wall"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.right),
     new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Wall"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.back),
     new Command(Command.walk),
     new Command(Command.walk),
     new Command(Command.turn, Turn.left),
     new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Wall"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.right),
     new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Wall"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.left),
     new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Wall"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.left),
     new Command(Command.repeat_until, new Command(Command.is_tile_ahead, "Wall"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.left),
     new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
     ]),
     new Command(Command.turn, Turn.left),
     new Command(Command.repeat_until, new Command(Command.reached_end), [
        new Command(Command.walk)
     ])
] 

};