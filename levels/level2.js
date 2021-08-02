import { Player } from "../models/player.js";
import { Direction } from "../models/direction.js";
import { Color } from "../models/color.js";
import { Command } from "../models/command.js";
import { Turn } from "../models/turn.js";

export const LEVEL_2 = {

map : [
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Goal 2", "Wall", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Junction", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Gate 1", "Wall", "Wall", "Wall"],
    ["Wall", "Empty", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Junction", "Gate 2", "Splat 1", "Wall"],
    ["Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
    ["Wall", "Empty", "Wall", "Empty", "Empty", "Empty", "Junction", "Empty", "Junction", "Empty", "Empty", "Empty", "Empty", "Empty", "Splat 2", "Wall", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Gate 2", "Wall", "Gate 4", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Junction", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Splat 4", "Empty", "Empty", "Empty", "Empty", "Wall", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Gate 1", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall"],
    ["Wall", "Junction", "Empty", "Empty", "Empty", "Empty", "Junction", "Wall", "Junction", "Empty", "Empty", "Empty", "Empty", "Empty", "Splat 1", "Wall", "Empty", "Wall"],
    ["Wall", "Gate 2", "Wall", "Wall", "Wall", "Wall", "Gate 2", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Splat 4", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
],

player : new Player(16, 8, Direction.South, Color.green),

solution : [
    new Command(Command.repeat_until, new Command(Command.is_color, Color.red), [
        new Command(Command.walk),

        new Command(Command.if_do_else, new Command(Command.or, new Command(Command.is_tile_ahead, "Wall"), [new Command(Command.is_tile_ahead, "Gate")]), [
            new Command(Command.turn, Turn.right)
        ])
    ]),

    new Command(Command.turn, Turn.back),

    new Command(Command.repeat_until, new Command(Command.is_color, Color.blue), [
        new Command(Command.walk),

        new Command(Command.if_do_else, new Command(Command.or, new Command(Command.is_tile_current, "Junction"), [new Command(Command.is_tile_ahead, "Wall")]), [
            new Command(Command.turn, Turn.right)
        ])
    ]),

    new Command(Command.turn, Turn.back),

    new Command(Command.repeat_until, new Command(Command.is_color, Color.yellow), [
        new Command(Command.walk),

        new Command(Command.if_do_else, new Command(Command.is_tile_current, "Junction"), [
            new Command(Command.turn, Turn.right)
        ]),

        new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"), [
            new Command(Command.turn, Turn.left)
        ])
    ]),

    new Command(Command.turn, Turn.left),

    new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
    ]),
    new Command(Command.repeat_until, new Command(Command.is_tile_current, "Junction"), [
        new Command(Command.walk)
    ]),
    new Command(Command.turn, Turn.left),


    new Command(Command.repeat_until, new Command(Command.reached_end), [
        new Command(Command.walk),

        new Command(Command.if_do_else, new Command(Command.or, new Command(Command.is_tile_current, "Junction"), [new Command(Command.is_tile_ahead, "Wall")]), [
            new Command(Command.turn, Turn.right)
        ])
    ])
]

};