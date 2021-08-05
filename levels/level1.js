import { Color } from "../models/color.js";
import { Command } from "../models/command.js";
import { Direction } from "../models/direction.js";
import { Player } from "../models/player.js";
import { Turn } from "../models/turn.js";

export const LEVEL_1 = {

map : [
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Splat 4", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Mixer_A 0", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Splat 1", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Mixer_B 0 0", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Goal 5", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
],

player : new Player(2, 1, Direction.South, Color.orange), 

solution : [

    new Command(Command.repeat_until, new Command(Command.reached_end), [

        new Command(Command.if_do_else, new Command(Command.and, new Command(Command.is_color, Color.blue), [new Command(Command.is_tile_ahead, "Splat")]), [
            new Command(Command.walk),
            new Command(Command.turn, Turn.back)

        ]),

        new Command(Command.if_do_else, new Command(Command.and, new Command(Command.is_color, Color.red), [new Command(Command.is_tile_current, "Mixer")]), [
            new Command(Command.turn, Turn.back)
        ]),

        new Command(Command.walk)
    ])
]

};