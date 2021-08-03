import { Converter } from "../blockly/converter.js";
import { Engine } from "../engine/engine.js";
import { Render } from "../engine/render.js";
import {  LEVEL_5 } from "../levels/level5.js"

//Vars
var render;

//Reset
reset();
var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;
function countTimer() {
           ++totalSeconds;
           var hour = Math.floor(totalSeconds /3600);
           var minute = Math.floor((totalSeconds - hour*3600)/60);
           var seconds = totalSeconds - (hour*3600 + minute*60);
           if(hour < 10)
             hour = "0"+hour;
           if(minute < 10)
             minute = "0"+minute;
           if(seconds < 10)
             seconds = "0"+seconds;
           document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
        }
//Link buttons
document.getElementById("start").onclick = function() {  
    start();
};

document.getElementById("reset").onclick = function() {  
    reset();
};

document.getElementById("preview").onclick = function() {  
    showSolution();
};

async function reset() {

    if (!!render) {
        render.stopRender();
        await Render.sleep(300);
        render.resetTo(LEVEL_5);

    } else {
        render = new Render(document.getElementById("map"), [LEVEL_5]);
        render.renderFirst();
    }
}

async function showSolution() {
    
    render.stopRender();
    let engine = new Engine( LEVEL_5.map, LEVEL_5.player, LEVEL_5.solution);
    let res = engine.start();
    let changes = engine.changes;

    render.changes = changes;
    render.messageState = res;
    await render.startRender();
}


async function start() {

    let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    let commands = Converter.convert(code);

    if (commands === null || commands === undefined) {
        alert("Cannot start an empty solution");
        return;
    }
    
    render.stopRender();
    let engine = new Engine( LEVEL_5.map, LEVEL_5.player, commands);
    let res = engine.start();
    let changes = engine.changes;

    render.changes = changes;
    render.messageState = res;
    await render.startRender();
}