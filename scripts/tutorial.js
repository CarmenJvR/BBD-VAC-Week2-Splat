import { Converter } from "../blockly/converter.js";
import { Engine } from "../engine/engine.js";
import { Render } from "../engine/render.js";
import {  LEVEL_0 } from "../levels/level0.js"
import { Color } from "../models/color.js";
import { Command } from "../models/command.js";
import { Direction } from "../models/direction.js";

//Vars
var render;
var engine;
var firstTimeExec = true;

//Reset
reset();

initialBlock();

//Link buttons
document.getElementById("start").onclick = function() {  
    start();
};

document.getElementById("reset").onclick = function() {  
    firstTimeExec = true;
    reset();
};

document.getElementById("preview").onclick = function() {  
    //showSolution();
};

//Sandbox play buttons
document.getElementById("walkBtn").onclick = function() {  

    move("sxS[  new Command(Command.walk),]sxE", null);
};

document.getElementById("turnBtn").onclick = function() {  
    move("sxS[  new Command(Command.turn, Turn.left), ]sxE", null);
};

document.getElementById("depositBtn").onclick = function() {  
    let tile = String(engine.map[engine.player.y][engine.player.x]);
    if(tile.startsWith("Bank_A")) {
        let index = prompt("Deposit in number:");
        move("sxS[  new Command(Command.deposit, " + index + "), ]sxE", null);
    } else {
        Render.modalAlert("What are you doing?", "This is not the bank!");
    }
};

document.addEventListener('keydown', function(event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    switch (event.key) {
        case "ArrowLeft":
            event.preventDefault();
            //engine.player.dir = Direction.West;
            move("sxS[  new Command(Command.walk),]sxE", Direction.West);
            break;
        case "ArrowRight":
            event.preventDefault();
            move("sxS[  new Command(Command.walk),]sxE", Direction.East);
            // Right pressed
            break;
        case "ArrowUp":
            event.preventDefault();
            move("sxS[  new Command(Command.walk),]sxE", Direction.North);
            // Up pressed
            break;
        case "ArrowDown":
            event.preventDefault();
            move("sxS[  new Command(Command.walk),]sxE", Direction.South);
            // Down pressed
            break;
        case "a":
            event.preventDefault();
            //engine.player.dir = Direction.West;
            move("sxS[  new Command(Command.walk),]sxE", Direction.West);
            break;
        case "d":
            event.preventDefault();
            move("sxS[  new Command(Command.walk),]sxE", Direction.East);
            // Right pressed
            break;
        case "w":
            event.preventDefault();
            move("sxS[  new Command(Command.walk),]sxE", Direction.North);
            // Up pressed
            break;
        case "s":
            event.preventDefault();
            move("sxS[  new Command(Command.walk),]sxE", Direction.South);
            // Down pressed
            break;
        case "A":
            event.preventDefault();
            //engine.player.dir = Direction.West;
            move("sxS[  new Command(Command.walk),]sxE", Direction.West);
            break;
        case "D":
            event.preventDefault();
            move("sxS[  new Command(Command.walk),]sxE", Direction.East);
            // Right pressed
            break;
        case "W":
            event.preventDefault();
            move("sxS[  new Command(Command.walk),]sxE", Direction.North);
            // Up pressed
            break;
        case "S":
            event.preventDefault();
            move("sxS[  new Command(Command.walk),]sxE", Direction.South);
            // Down pressed
            break;
    }
});

document.getElementById("save").onclick = function() {
    saveBlocksAllLevels(); 
};

document.getElementById("load").onclick = function() {
    loadBlocksAllLevels();
};

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

    let isButton = false;
    if(dir === null) { //buttons not arrows
        isButton = true;
        if (firstTimeExec) dir = LEVEL_0.player.dir;
        else dir = engine.player.dir;
    }
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

    popups();
    render.changes = changes;
    render.messageState = res;
    await render.startRender();
    

    //--------------
    let tile = String(engine.map[engine.player.y][engine.player.x]);
    if(tile.startsWith("Bank_A") && !isButton) {
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

async function popups(){
    let x = engine.player.x;
    let y = engine.player.y;
    let col = engine.player.color;

    if(x==1 && y==3) {
        Render.modalAlert("What is this!?","I have encountered a paint splat! Wow!<br>Look what happened to me! I changed colour! I am no longer orange!  Yaayyy!");  
    } else if (x==1 && y==4) {
        Render.modalAlert("What is this!?", "This is a gate! But I can only pass if my colour matches the gate's colour.<br>Lucky me! I am the right colour!");
    }  else if (x==1 && y==6 && col == Color.red) {
        Render.modalAlert("What is this!?", "This is a mixer! Look what happened up a head. The colour in the jar changed. Now try to mix another colour here on the mixer.");
    } else if (x==1 && y==6 && col == Color.blue) {
        Render.modalAlert("I'm good!", "I have just mixed two colours! Look at the jar!<br>PURPLE!!!!! I WANT PURPLE!!!");
    } else if (x==1 && y==5 && col != Color.red) {
        Render.modalAlert("What am I doing!", "I am not the right colour to pass! Focus!");
    } else if (x==1 && y==8 && col == Color.purple) {
        Render.modalAlert("PURPLE!!", "LOOK! I AM PURPLE!<br>Now I match the gate ahead!");
    } else if (x==1 && y==8 && col == Color.purple) {
        Render.modalAlert("PURPLE!!", "LOOK! I AM PURPLE!<br>Now I match the gate ahead!");
    } 
    
}

async function initialBlock() {
    var xmlText = "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"start\" id=\"2q[CLUsfD]Az*ng^MuYP\" x=\"150\" y=\"50\"></block></xml>";
    var xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);
}

async function saveBlocks() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    localStorage.setItem("tutorialworkspace",Blockly.Xml.domToText(xml));
    Blockly.mainWorkspace.clear();
    console.log(localStorage.getItem("tutorialworkspace"));       
}

async function loadBlocks() {
    Blockly.mainWorkspace.clear();
    var nameOfProject = document.getElementById("tutorialworkspace");
    var xml = Blockly.Xml.textToDom(localStorage.getItem("tutorialworkspace"));
    Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);
    console.log("loaded");
}

async function saveBlocksAllLevels() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    localStorage.setItem("savedworkspace",Blockly.Xml.domToText(xml));
  //   Blockly.mainWorkspace.clear();
    console.log(localStorage.getItem("savedworkspace"));       
}

async function loadBlocksAllLevels() {
    Blockly.mainWorkspace.clear();
    var nameOfProject = document.getElementById("savedworkspace");
    var xml = Blockly.Xml.textToDom(localStorage.getItem("savedworkspace"));
    Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);
    console.log("loaded");
}
