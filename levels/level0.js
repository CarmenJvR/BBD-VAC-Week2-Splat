import { Color } from "../models/color.js";
import { Command } from "../models/command.js";
import { Direction } from "../models/direction.js";
import { Player } from "../models/player.js";
import { Turn } from "../models/turn.js";

export const LEVEL_0 = {

map : [
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
    ["Wall", "Empty", "Wall", "Empty", "Splat 1", "Empty", "Splat 2", "Empty", "Splat 3",  "Empty", "Splat 4","Empty", "Splat 5", "Empty", "Splat 6", "Splat 9", "Empty",    "Wall"],
    ["Wall", "Empty", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Splat 1", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Gate 1", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Empty", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Mixer_A 0", "Splat 4", "Wall", "Mixer_A 1", "Wall_Pipe", "Mixer_B 0 1", "Empty", "Empty", "Empty", "Gate 1", "Gate 2", "Gate 9", "Gate 3", "Gate 4", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Empty", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Mixer_B 0 0", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Gate 5", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Empty", "Empty", "Empty", "Bank_B 0 3", "Empty", "Bank_A", "Empty", "Bank_B 0 4", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Splat 9", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Wall", "Wall" ,"Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Gate 9", "Wall", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Empty", "Wall", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall"],
    ["Wall", "Splat 2", "Empty", "Bank_A", "Empty","Splat 6","Empty" ,"Bank_B 0 1", "Empty", "Gate 2", "Empty", "Bank_B 0 2", "Empty", "Gate 6", "Empty", "Empty", "Empty", "Wall"],
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
],

player : new Player(1, 1, Direction.South, Color.orange), 

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