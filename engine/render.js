import { Direction } from "../models/direction.js";
import { Change } from "../models/engineChange.js";
import { Engine } from "./engine.js";
import { Player } from "../models/player.js";

export class Render {

    mapElement;
    currentRender = [];
    changes = [];
    messageState = -1;
    stop = false;

    constructor(mapElement, changes, messageState) {
        this.mapElement = mapElement;
        this.changes = changes;
        this.messageState = messageState;
    }



    renderFirst() {
        this.stop = false;
        this.initMap(this.changes[0]);
    }

    resetTo(change) {
        this.stop = false;
        this.renderMap(change);
    }

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async startRender() {
        this.stop = false;

        sessionStorage.setItem('startExec', Date.now());

        let currentChange = this.changes[0];
        this.renderMap(currentChange);

        for (let i = 0; i < this.changes.length; i++) {

            if (this.stop) {
                return;
            }

            if (Change.equals(currentChange, this.changes[i])) {
                continue;
            }

            currentChange = this.changes[i];
            this.renderMap(this.changes[i]);

            await Render.sleep(200);
        }

       sessionStorage.setItem('endExec', Date.now());

        switch (this.messageState) {
            case 0: alert("Reached goal!"); this.GiveScore(); break;
            case 1: alert("Stuck in infinite loop");  break;
            case 2: alert("Did not reach the end"); break;
            case 3: alert("Invalid bank deposit"); break;
            default : alert("Invalid solution"); break;
        }

        
        
    }

    stopRender() {
        this.stop = true;
    }

    renderMap(change) {

        let player = change.player;
        let map = change.map;

        for (let y = 0; y < 18; y++) {

            for (let x = 0; x < 18; x++) {

                if (this.stop) {
                    return;
                }

                let tile = map[y][x];
                let src = "";
        
                if (player.x === x && player.y === y) {
                    src = `Player ${player.color} ${player.dir}`;

                } else if (tile.startsWith("Mixer_A")) {
                    src = tile.substring(0, tile.indexOf(" "));

                } else if (tile.startsWith("Mixer_B")) {
                    src = tile.substring(0, tile.lastIndexOf(" "));

                } else {
                    src = tile;
                }

                if (src !== this.currentRender[y][x]) {
                    this.currentRender[y][x] = src;

                    document.getElementById(`${y}_${x}`).src = `/assets/${src}.png`;
                }
            }
        }
    }


    initMap(change) {

        let player = change.player;
        let map = change.map;
    
        this.mapElement.innerHTML = "";
    
        for (let y = 0; y < 18; y++) {     
        
            let row = [];

            for (let x = 0; x < 18; x++) {
        
                if (this.stop) {
                    return;
                }

                let tile = map[y][x];
                let src = "";
        
                if (player.x === x && player.y === y) {
                    src = `Player ${player.color} ${player.dir}`;

                } else if (tile.startsWith("Mixer_A")) {
                    src = tile.substring(0, tile.indexOf(" "));

                } else if (tile.startsWith("Mixer_B")) {
                    src = tile.substring(0, tile.lastIndexOf(" "));

                } else {
                    src = tile;
                }
    
                this.mapElement.innerHTML += `<img id="${y}_${x}" class="image" src="/assets/${src}.png"/>`;
                row.push(src);
            }

            this.currentRender.push(row);
        }
    }

    GiveScore(){
       // alert("meep");
        let startExecution = sessionStorage.getItem('startExec');
        let endExecution = sessionStorage.getItem('endExec');

        let timeElapsed = endExecution - startExecution ;  

        /*  Time of Solution Execution

            Easy < 3700 ms
            Medium < 29900 ms
            Hard < 55200
            DarkSouls < 99200

            Formula: [ 1 - (TimeTaken - PerfectTime)/perfectTime/2 ] * 100 
        */


        let currentLevel =  Number(sessionStorage.getItem('currentLevel')) ;
        let solutionTime = 0 ;
        let maxMark = 0 ;

        switch ( currentLevel ) {
            case 1: solutionTime = 3700; maxMark = 5; break;           
            case 2: solutionTime = 29900; maxMark = 20;  break;          
            case 3: solutionTime = 55200; maxMark = 25; break;           
            case 4: solutionTime = 99200; maxMark = 40; break;          
            default :  break;          
        }
        
        let efficiencyScore = ( 1-((timeElapsed - solutionTime)/solutionTime/2) )*100 ;

        if(efficiencyScore > 100){
            efficiencyScore = 100;
        }else if(efficiencyScore < 20){
            efficiencyScore = 20;
        }

        efficiencyScore.toFixed(2);
        let scoreReceived = ( (efficiencyScore/100)*maxMark ).toFixed(2) ; 

        switch ( currentLevel ) {
            case 1: sessionStorage.setItem('easyScore', scoreReceived ) ; break;           
            case 2: sessionStorage.setItem('mediumScore', scoreReceived );  break;          
            case 3: sessionStorage.setItem('hardScore', scoreReceived ); break;           
            case 4: sessionStorage.setItem('dsScore', scoreReceived );           
            default :  break;          
        }

        document.querySelector("div#mBod.modal-body").innerHTML = "Memo Sulotion Time: "+ solutionTime.toString() + " ms<br>Provided Solution Time: " + timeElapsed.toString() + " ms<br>" + "Percentage Scored: " + efficiencyScore.toString() + "%<br>Score: " + scoreReceived.toString() + "\\" + maxMark.toString() ;
        document.querySelector("button#modalOpenBtn").click();

        //alert("Time Elapsed: " + timeElapsed.toString() + " ms\n" + "Percentage Scored: " + efficiencyScore.toString() + " %\n Score: " + scoreReceived.toString() + "\\" + maxMark.toString() );
        
    }


}