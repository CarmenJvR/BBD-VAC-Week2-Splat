import { Color } from "../models/color.js";
import { Command } from "../models/command.js";
import { Direction } from "../models/direction.js";
import { Player } from "../models/player.js";
import { Turn } from "../models/turn.js";

export const LEVEL_1 = {

map : [
    ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall"],
    ["Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall"],
    ["Mixer_B 0 0", "Wall", "Splat 1", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall", "Empty", "Wall"],
    ["Empty", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall"],
    ["Empty", "Wall", "Empty", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall"],
    ["Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall"],
    ["Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall"],
    ["Empty", "Wall", "Empty", "Wall", "Splat 2", "Wall", "Empty", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall"],
    ["Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall"],
    ["Empty", "Wall","Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall"],
    ["Empty", "Wall",  "Empty", "Wall", "Empty", "Wall", "Empty", "Empty", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall"],
    ["Empty", "Wall", "Empty", "Wall", "Mixer_A 0", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall"],
    ["Empty", "Wall", "Empty", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall"],
    ["Empty", "Wall", "Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall"],
    ["Empty", "Wall", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall", "Empty", "Wall", "Empty", "Wall"],
    ["Empty", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Empty", "Wall", "Empty", "Wall"],
    ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Wall", "Goal 3", "Wall"],
    ["Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall", "Wall"],
    
],

player : new Player(8, 8, Direction.South, Color.red),

solution : [

    // new Command(Command.repeat_until, new Command(Command.reached_end), [

    //     // new Command(Command.if_do_else, new Command(Command.and, new Command(Command.is_color, Color.yellow), [new Command(Command.is_tile_ahead, "Mixer")]), [
    //     //     new Command(Command.walk),
    //     //     new Command(Command.turn, Turn.back)
            
    //     // ]),
    //     // new Command(Command.if_do_else, new Command(Command.and, new Command(Command.is_color, Color.red), [new Command(Command.is_tile_current, "Splat")]), [
    //     //     new Command(Command.turn, Turn.right),
    //     //     new Command(Command.walk),
    //     // ]),
    //     // // new Command(Command.if_do_else, new Command(Command.is_tile_ahead, "Wall"), [
    //     // //     new Command(Command.turn, Turn.right),
    //     // //     new Command(Command.walk)
    //     // // ]),

       

    //     new Command(Command.walk)
    // ])
    new Command(Command.repeat_until , new Command (Command.is_tile_ahead ,"wall"),[
        new Command(Command.walk),
        
    ]),
    new Command(Command.turn,Turn.right)
    
]

};