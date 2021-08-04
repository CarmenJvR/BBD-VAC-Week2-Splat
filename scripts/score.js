
export class Score {
    constructor(){
        this.startExecution = Date.now();
        this.endExecution = Date.now();
    } 

    setStartExecution(){
        startExecution = Date.now();
    }

    setEndExecution(){
        endExecution = Date.now();

        let timeTaken = endExecution - startExecution ;
        console.log(timeTaken)
    }

}
