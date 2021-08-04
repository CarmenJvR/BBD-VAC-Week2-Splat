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

        var count = 1;
        
        let executeCode = startCode;
        // alert("executeCode: " + executeCode);
        let funcCode = "";

        // alert("preWhile");
        // alert(code);
        while (code.search("f"+count+"S") != -1) {
            // alert("count: " + count);
            let fex = "f"+count+"E";
            let fsx = "f"+count+"S";
            let indexfE = code.search(fex);
            let indexfS = code.search(fsx);
            let flen = indexfE - indexfS;
            funcCode = code.substr(indexfS+fsx.length+1, flen-fex.length-2);
            // alert(funcCode);

            while (executeCode.search("function_caller_"+count+"_") != -1) {
                // alert("executeCode: " + executeCode);
                executeCode = executeCode.replace("function_caller_"+count+"_,", funcCode);
            }

            // alert("executeCode: " + executeCode);

            count = count + 1;
        }
        // alert("postWhile");

        // let indexfE = code.search("fE");
        // let indexfS = code.search("fS");
        // let flen = indexfE - indexfS;
        // let funcCode = code.substr(indexfS+4, flen-5);
        // alert(funcCode);

        // let indexFuncCall1 = startCode.search("function_caller_1");
        // alert("FuncCall1 at index " + indexFuncCall1);

        count = 1;
        // alert("replace while count: ");

        // while (executeCode.search("function_caller_"+count) != -1) {
        //     while (executeCode.search("function_caller_"+count) != -1) {
        //         alert("executeCode: " + executeCode);
        //         executeCode = executeCode.replace("function_caller_"+count+",", funcCode);
        //     }
        //     count = count + 1;
        // }

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