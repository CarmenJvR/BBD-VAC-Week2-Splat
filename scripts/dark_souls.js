import { Converter } from "../blockly/converter.js";
import { Engine } from "../engine/engine.js";
import { Render } from "../engine/render.js";
import { LEVEL_4 } from "../levels/level4.js"

//Vars
var render;

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

//Reset
reset();

initialBlock();

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

document.getElementById("save").onclick = function() {
    Render.modalAlert("","Your solution has been saved.");
    saveBlocksAllLevels(); 
};

document.getElementById("load").onclick = function() {
    loadBlocksAllLevels();
};

async function reset() {

    if (!!render) {
        render.stopRender();
        await Render.sleep(300);
        render.resetTo(LEVEL_4);

    } else {
        render = new Render(document.getElementById("map"), [LEVEL_4]);
        render.renderFirst();
    }
}

async function showSolution() {
    
    render.stopRender();
    let engine = new Engine( LEVEL_4.map, LEVEL_4.player, LEVEL_4.solution);
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
        Render.modalAlert("Cannot start an empty solution");
        return;
    }
    
    render.stopRender();
    let engine = new Engine(LEVEL_4.map, LEVEL_4.player, commands);
    let res = engine.start();
    let changes = engine.changes;

    render.changes = changes;
    render.messageState = res;
    await render.startRender();
}

async function initialBlock() {
    var xmlText = "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"start\" id=\"2q[CLUsfD]Az*ng^MuYP\" x=\"150\" y=\"50\"></block></xml>";
    var xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);
}

async function saveBlocks() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    localStorage.setItem("darksoulsworkspace",Blockly.Xml.domToText(xml));
    Blockly.mainWorkspace.clear();
    console.log(localStorage.getItem("darksoulsworkspace"));       
}

async function loadBlocks() {
    Blockly.mainWorkspace.clear();
    var nameOfProject = document.getElementById("darksoulsworkspace");
    var xml = Blockly.Xml.textToDom(localStorage.getItem("darksoulsworkspace"));
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
