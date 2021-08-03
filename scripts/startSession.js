const form  = document.getElementById('loginForm');

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
      sessionStorage.setItem('easyScore', 0);
      sessionStorage.setItem('mediumScore', 0);
      sessionStorage.setItem('hardScore', 0);
      sessionStorage.setItem('dsScore', 0);

      //get starting time
      const start = Date.now();
      sessionStorage.setItem('startTime', start);

      //redirect to easy
      //window.location = "easy.html";

});