import { Converter } from "../blockly/converter.js";
import { Engine } from "../engine/engine.js";
import { Render } from "../engine/render.js";
import { LEVEL_2 } from "../levels/level2.js"

//Vars
var render;

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
    showSolution();
};

document.getElementById("save").onclick = function() {
    saveBlocks(); 
}

document.getElementById("load").onclick = function() {
    loadBlocks();
}

async function reset() {

    if (!!render) {
        render.stopRender();
        await Render.sleep(300);
        render.resetTo(LEVEL_2);

    } else {
        render = new Render(document.getElementById("map"), [LEVEL_2]);
        render.renderFirst();
    }
}

async function showSolution() {
    
    render.stopRender();
    let engine = new Engine( LEVEL_2.map, LEVEL_2.player, LEVEL_2.solution);
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
    let engine = new Engine(LEVEL_2.map, LEVEL_2.player, commands);
    let res = engine.start();
    let changes = engine.changes;

    render.changes = changes;
    render.messageState = res;
    await render.startRender();
}

async function saveBlocks() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    localStorage.setItem("mediumworkspace",Blockly.Xml.domToText(xml));
    Blockly.mainWorkspace.clear();
    console.log(localStorage.getItem("mediumworkspace"));       
}

async function loadBlocks() {
    Blockly.mainWorkspace.clear();
    var nameOfProject = document.getElementById("mediumworkspace");
    var xml = Blockly.Xml.textToDom(localStorage.getItem("mediumworkspace"));
    Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);
    console.log("loaded");
}