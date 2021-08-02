import { Color } from "../models/color.js";
import { Command } from "../models/command.js";
import { Direction } from "../models/direction.js";
import { Turn } from "../models/turn.js";

export class Converter {

    static convert(code) {

        let commands = null;

        try {
            commands = eval(code);
        
        } catch (error) {
            console.log(error);
        }

        return commands;
    }
}