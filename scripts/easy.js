import { Converter } from "../blockly/converter.js";
import { Engine } from "../engine/engine.js";
import { Render } from "../engine/render.js";
import {  LEVEL_1 } from "../levels/level1.js"

//Vars
var engine;
var render;
var firstTimeExec = true;

//Reset
reset();

//Link buttons
document.getElementById("start").onclick = function() {  
    start();
};

document.getElementById("reset").onclick = function() {  
    firstTimeExec = true;
    reset();
};

document.getElementById("preview").onclick = function() {  
    showSolution();
};

//Sandbox play buttons
document.getElementById("walk").onclick = function() {  
    walk();
    firstTimeExec = false;
};

async function reset() {

    if (!!render) {
        render.stopRender();
        await Render.sleep(300);
        render.resetTo(LEVEL_1);

    } else {
        render = new Render(document.getElementById("map"), [LEVEL_1]);
        render.renderFirst();
    }
}

async function showSolution() {
    
    render.stopRender();
    let engine = new Engine( LEVEL_1.map, LEVEL_1.player, LEVEL_1.solution);
    let res = engine.start();
    let changes = engine.changes;

    render.changes = changes;
    render.messageState = res;
    await render.startRender();
}


async function start() {

    let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    let commands = Converter.convert(code);
    // alert(commands);

    if (commands === null || commands === undefined) {
        Render.modalAlert("Cannot start an empty solution");
        return;
    }
    
    render.stopRender();
    let engine = new Engine( LEVEL_1.map, LEVEL_1.player, commands);
    let res = engine.start(0);
    let changes = engine.changes;

    render.changes = changes;
    render.messageState = res;
    await render.startRender();
}

async function walk() {

    let code = "sxS[  new Command(Command.walk),]sxE";
    let commands = Converter.convert(code);
    // alert(commands);
    
    render.stopRender();
    if(firstTimeExec){
        engine = new Engine( LEVEL_1.map, LEVEL_1.player, commands);
    }else {
        engine = new Engine( engine.map, engine.player, commands);
    }
    let res = engine.start(1);
    let changes = engine.changes;

    render.changes = changes;
    render.messageState = res;
    await render.startRender();
}