const form  = document.getElementById('loginForm');

document.querySelector("button#modalOpenBtn").click();
document.querySelector("div#mBod.modal-body").innerHTML = "Meeparooo";


form.addEventListener('submit', (event) => {
    //let iname = form.elements['applicantName'].value ; 
    //let isurname = form.elements['applicantSurname'].value ;
    let iemail = form.elements['applicantEmail'].value ;
    //let iproficiency = form.elements['applicantProficiency'].value ;
    //let iinstitute = form.elements['applicantInstitute'].value ;
    //let idegree = form.elements['applicantDegree'].value ;

    
  /**  const d = new Date();

    const applicant = {
        Name: iname,
        Surname : isurname ,
        CurrentProficiency: iemail,
        DegreeForApplication: idegree,
        InstituteOfStudy: iinstitute,
        Email: iemail,
        SubmissionDate: d.getFullYear(),
        EasyScore: 0 ,
        MediumScore: 0,
        HardScore: 0 ,
        DarkScore: 0 
      };

      var json = JSON.stringify(applicant);
      console.log(json);
      alert(json); */

        //Remove existing session storage items
        sessionStorage.removeItem('email');

        //Initialize session storage
        sessionStorage.setItem('email', iemail);

      this.initializeSession();


});


function initializeSession(){

        sessionStorage.setItem('easyScore', 0);
        sessionStorage.setItem('mediumScore', 0);
        sessionStorage.setItem('hardScore', 0);
        sessionStorage.setItem('dsScore', 0);
        sessionStorage.setItem('currentLevel', 1);
  
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
  let total = Number(sessionStorage.getItem('easyScore'))+ Number(sessionStorage.getItem('mediumScore')) + Number(sessionStorage.getItem('hardScore')) + Number( sessionStorage.getItem('dsScore')); 
  document.querySelector("td#easyScoreTD").innerHTML = sessionStorage.getItem('easyScore').toString();
  document.querySelector("td#mediumScoreTD").innerHTML = sessionStorage.getItem('mediumScore').toString();
  document.querySelector("td#hardScoreTD").innerHTML = sessionStorage.getItem('hardScore').toString();
  document.querySelector("td#dsScoreTD").innerHTML = sessionStorage.getItem('dsScore').toString();
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
  //seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + " h:" + minutes + "m";//+ ":" + seconds + "." + milliseconds;
}