import { Color } from "../models/color.js";
import { Command } from "../models/command.js";
import { Direction } from "../models/direction.js";
import { Turn } from "../models/turn.js";

export class Converter {

    static convert(code) {

        let commands = null;

        // alert(code);
        let indexSS = code.search("sxS");
        let indexSE = code.search("sxE");
        let slen = indexSE - indexSS;

        let startCode = code.substr(indexSS+3, slen-3);

        // alert(startCode);

        let indexfE = code.search("fxE");
        let indexfS = code.search("fxS");
        let flen = indexfE - indexfS;
        let funcCode = code.substr(indexfS+4, flen-5);
        // alert(funcCode);

        let executeCode = startCode;

        let indexFuncCall1 = startCode.search("function_caller_1");
        // alert("FuncCall1 at index " + indexFuncCall1);

        while (executeCode.search("function_caller_1") != -1) {
            // alert("executeCode: " + executeCode);
            executeCode = executeCode.replace("function_caller_1,", funcCode);
        }
        
        // alert("executeCode: " + executeCode);

        // try {
        //     let indexFuncCall1 = startCode.search("function_caller_1");
        //     alert("FuncCall1 at index " + indexFuncCall1);
        //     executeCode = startCode.replace("function_caller_1, ", funcCode);
        //     alert("executeCode: " + executeCode);
        // } catch (error) {
        //     executeCode = startCode;
        // }

        try {
            commands = eval(executeCode);
        
        } catch (error) {
            console.log(error);
        }

        return commands;
    }
}