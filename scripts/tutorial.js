import { Converter } from "../blockly/converter.js";
import { Engine } from "../engine/engine.js";
import { Render } from "../engine/render.js";
import {  LEVEL_0 } from "../levels/level0.js"
import { Command } from "../models/command.js";
import { Direction } from "../models/direction.js";

//Vars
var render;
var engine;
var firstTimeExec = true;

//Reset
reset();

//Link buttons
document.getElementById("start").onclick = function() {  
    start();
};

document.getElementById("reset").onclick = function() {  
    reset();
};

document.getElementById("preview").onclick = function() {  
    //showSolution();
};

//Sandbox play buttons
document.getElementById("walkBtn").onclick = function() {  
    move("sxS[  new Command(Command.walk),]sxE");
};

document.getElementById("turnBtn").onclick = function() {  
    move("sxS[  new Command(Command.turn, Turn.left), ]sxE");
};

document.getElementById("depositBtn").onclick = function() {  
    let tile = String(engine.map[engine.player.y][engine.player.x]);
    if(tile.startsWith("Bank_A")) {
        let index = prompt("Deposit in number:");
        move("sxS[  new Command(Command.deposit, " + index + "), ]sxE");
    } else {
        Render.modalAlert("What are you doing?", "This is not the bank!")
    }
};

document.addEventListener('keydown', function(event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    switch (event.key) {
        case "ArrowLeft":
            //engine.player.dir = Direction.West;
            move("sxS[  new Command(Command.walk),]sxE", Direction.West);
            break;
        case "ArrowRight":
            move("sxS[  new Command(Command.walk),]sxE", Direction.East)
            // Right pressed
            break;
        case "ArrowUp":
            move("sxS[  new Command(Command.walk),]sxE", Direction.North)
            // Up pressed
            break;
        case "ArrowDown":
            move("sxS[  new Command(Command.walk),]sxE", Direction.South)
            // Down pressed
            break;
    }
});

async function reset() {

    if (!!render) {
        render.stopRender();
        await Render.sleep(300);
        render.resetTo(LEVEL_0);

    } else {
        render = new Render(document.getElementById("map"), [LEVEL_0]);
        render.renderFirst();
    }
}

async function showSolution() {
    
    render.stopRender();
    let engine = new Engine( LEVEL_0.map, LEVEL_0.player, LEVEL_0.solution);
    let res = engine.start();
    let changes = engine.changes;

    render.changes = changes;
    render.messageState = res;
    await render.startRender();
}


async function start() {

    let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    // alert(code);
    let commands = Converter.convert(code);
    // alert(commands);

    if (commands === null || commands === undefined) {
        Render.modalAlert('<span style="color:red">Unsuccessful Attempt</span>',"Cannot start an empty solution");
        return;
    }
    
    render.stopRender();
    let engine = new Engine( LEVEL_0.map, LEVEL_0.player, commands);
    let res = engine.start(0);
    let changes = engine.changes;

    render.changes = changes;
    render.messageState = res;
    await render.startRender();
}

async function move(code, dir) {

    //let code = "sxS[  new Command(Command.walk),]sxE";
    let commands = Converter.convert(code);
    // alert(commands);
    
    render.stopRender();
    if(firstTimeExec){
        LEVEL_0.player.dir = dir;
        engine = new Engine( LEVEL_0.map, LEVEL_0.player, commands);
    }else {
        engine.player.dir = dir;
        engine = new Engine( engine.map, engine.player, commands);
    }
    let res = engine.start(1);
    let changes = engine.changes;

    render.changes = changes;
    render.messageState = res;
    await render.startRender();
    
    //--------------
    let tile = String(engine.map[engine.player.y][engine.player.x]);
    if(tile.startsWith("Bank_A")) {
        let index = prompt("Deposit in number:");
        code = "sxS[  new Command(Command.deposit, " + index + "), ]sxE";
        commands = Converter.convert(code);
        engine = new Engine( engine.map, engine.player, commands);
        res = engine.start(1);
        changes = engine.changes;
        render.changes = changes;
        render.messageState = res;
        await render.startRender();
    }
    
//-------------

    if (res === 6) { //if reach finish in freeplay
        reset(); 
        firstTimeExec = true;
    } else {
        firstTimeExec = false;
    }
}    