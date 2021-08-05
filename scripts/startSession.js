const form  = document.getElementById('loginForm');

document.querySelector("button#modalOpenBtn").click();
document.querySelector("div#mBod.modal-body").innerHTML = "Meeparooo";


form.addEventListener('submit', (event) => {
    let iemail = form.elements['applicantEmail'].value ;


        //Remove existing session storage items
     //   sessionStorage.removeItem('email');

        //Initialize session storage
      //  sessionStorage.setItem('email', iemail);

      this.initializeSession();


});


function initializeSession(){

        sessionStorage.setItem('easyScore', 0);
        sessionStorage.setItem('mediumScore', 0);
        sessionStorage.setItem('hardScore', 0);
        sessionStorage.setItem('dsScore', 0);
        sessionStorage.setItem('normalScore', 0);
        sessionStorage.setItem('rookieScore', 0);
        sessionStorage.setItem('currentLevel', 0);
  
        /**
         * 1 : Easy
         * 2 : Medium
         * 3 : Hard
         * 4 : Dark Souls  
         */
  
        //get starting time
        const start = Date.now();
        sessionStorage.setItem('startTime', start);
}

function setLevel(lvl){
  sessionStorage.setItem('currentLevel', lvl);
};

function setScoreTable(){
  let total = Number(sessionStorage.getItem('easyScore'))+ Number(sessionStorage.getItem('normalScore'))+ Number(sessionStorage.getItem('rookieScore')) + Number(sessionStorage.getItem('mediumScore')) + Number(sessionStorage.getItem('hardScore')) + Number( sessionStorage.getItem('dsScore')); 
  document.querySelector("td#easyScoreTD").innerHTML = sessionStorage.getItem('easyScore').toString();
  document.querySelector("td#mediumScoreTD").innerHTML = sessionStorage.getItem('mediumScore').toString();
  document.querySelector("td#hardScoreTD").innerHTML = sessionStorage.getItem('hardScore').toString();
  document.querySelector("td#dsScoreTD").innerHTML = sessionStorage.getItem('dsScore').toString();
  document.querySelector("td#normalScoreTD").innerHTML = sessionStorage.getItem('normalScore').toString();
  document.querySelector("td#rookieScoreTD").innerHTML = sessionStorage.getItem('rookieScore').toString();
  document.querySelector("td#totalScoreTD").innerHTML = total.toString() ;

  let timeElapsed = Date.now() -  sessionStorage.getItem('startTime');
  timeElapsed = this.msToTime(timeElapsed);
  document.querySelector("#timeElapsedLabel").innerHTML = "Time Elapsed: " + timeElapsed.toString() ;
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
 // seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + " h:" + minutes + "m" ;//+ ":" + seconds + "." + milliseconds;
}