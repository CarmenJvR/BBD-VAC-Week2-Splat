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
var bankFlag = false ; 
var allowKeyboard = true;


//Reset
reset();

initialBlock();

//Link buttons
document.getElementById("start").onclick = function() {  
    firstTimeExec = true;
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
    if(!allowKeyboard) return;
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

//allow keyboard after pop up is closed
document.onclick = function() {  
    allowKeyboard = true;

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
        sessionStorage.setItem("bankFlag","false"); 
        document.querySelector("button#modalPromptOpenBtn").click();
        //let index = prompt("Deposit in number:");
        while(sessionStorage.getItem("bankFlag") != "true"){
            await new Promise(r => setTimeout(r, 500));
            
        }
        let index = sessionStorage.getItem("bankNumber");
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
    let dir = engine.player.dir;
    
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
    } else if (x==1 && y==9 && col != Color.purple) {
        Render.modalAlert("No", "I have to be purple");
    } else if (x==1 && y==12) {
        Render.modalAlert("Not paint", "Oh no! I am not PURPLE!<br>I am now acid. On the bright side, maybe I can get through that locked gate.");
    } else if (x==1 && y==11 && col != Color.purple) {
        Render.modalAlert("No", "I am cearly not PURPLE!");
    } else if (x==1 && y==14 && col == Color.acid) {
        Render.modalAlert("Mwahaha", "When I am acid, I can melt through locked gates!<br>Mwahahaha!");
    } else if (x==1 && y==16) {
        Render.modalAlert("Yellow", "It's a colour");
    } else if (x==2 && y==16 && col == Color.yellow && dir == Direction.East) {
        Render.modalAlert("What is that up ahead!?", "That must be a bank.<br>From the bank, I can deposit my current colour in one of the numbered collection sites and collect it there later.<br>Maybe I should store yellow in number 1. Yes!!! And then I should fetch the green splat! I am so smart!");
    } else if (x==4 && y==16 && col == Color.green && dir == Direction.West) {
        Render.modalAlert("Deposit time", "I wonder where I should deposit this green paint splat.");
    } else if (x==13 && y==16 && dir == Direction.East) {
        Render.modalAlert("Finally", "I am free.  Now I can go and play around and test whatever I want!");
    } else if (x==13 && y==16 && dir == Direction.West) {
        Render.modalAlert("Why", "Just why would I go back. I was free...");
    } else {
        return;
    }
    allowKeyboard = false;
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


function setFlag(){
    bankFlag = !bankFlag;
    console.log("in");
}



