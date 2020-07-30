
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
//const mainMsg = document.querySelector('#mainMsg');

const setupUI = (user) => {
    if (user) {
        loggedInLinks.forEach (item => item.style.display = "block");
        loggedOutLinks.forEach(item => item.style.display = "none");
       // mainMsg.style.display = "none";
    }else {
        loggedInLinks.forEach (item => item.style.display = "none");
        loggedOutLinks.forEach(item => item.style.display = "block");
        //mainMsg.style.display = "block";
    }
}
// setup materialize components
document.addEventListener("DOMContentLoaded", function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

});

 // get data from database

document.querySelector('#load-btn').addEventListener('click', (e)=> {
e.preventDefault();
loadDataFromFireStore();


// fill courses Info
fillCourseInfo();


});


function loadDataFromFireStore() {
    
    // re-initialize = when user clicks on load button while there are already data into objects.
    Courses = []; Lessons = [];
    Modules = []; Concepts = [];
    Skills = []; SceneTypes = [];


    var docRef = db.collection("courses");
    docRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
           
            // get Courses Info
            Courses.unshift(storeDataLocally(doc.id,doc.data(),'courses'));

            // get Concept Info
            if (doc.data()['Concepts'])
                (doc.data()['Concepts']).forEach( function(con) {
                    Concepts.unshift(storeDataLocally(doc.id,con,'concepts'));     
                });
                
            // get Modules Info
            if (doc.data()['Modules'])
                (doc.data()['Modules']).forEach (function(mod) {
                 Modules.unshift(storeDataLocally(doc.id,mod,'modules'));
                });
            

            // get Lessons Info
            if (doc.data()['Lessons'])
                (doc.data()['Lessons']).forEach(function(les) {
                Lessons.unshift(storeDataLocally(doc.id,les,'lessons'));
            });

            // get Skills Info
            if (doc.data()['Skills'])
                (doc.data()['Skills']).forEach(function(sk) {
                    Skills.unshift(storeDataLocally(doc.id,sk,'skills'));
                });

            
            // get Scene Types Info
            if (doc.data()['Scene-Types'])
                (doc.data()['Scene-Types']).forEach(function (scType) {
                    SceneTypes.unshift(storeDataLocally(doc.id, scType, 'sceneTypes'));
                });
        });
    });
    
  

}

function fillCourseInfo(){

    const courseCombo = document.getElementById('id-course-title');
    const courseTitleOption = document.createElement("option");
    courseTitleOption.text = " مرحبا ";
    courseCombo.add(courseTitleOption,courseCombo[0]);

    const textAreaCourseDesc = document.getElementById('id-course-description');
    textAreaCourseDesc.value = "السلام عليكم ورحمة الله وبركاته";

    const chkBoxCourseType = document.getElementById('id-cat-paid');
    chkBoxCourseType.checked = true;


   // const divConceptsList = document.getElementById('list-concepts');
    //const x = document.createElement("input");
    // Assigning the attributes 
    // to created checkbox 
   // x.type = "checkbox"; 
   // x.name = "name"; 
    //x.value = "value"; 
    //x.className  = "form-check-input";
   // x.id = "id"; 
    // creating label for checkbox 
    //var label = document.createElement('label'); 
              
    // assigning attributes for  
    // the created label tag  
    
   // label.className = "form-check-label";
    //label.htmlFor = "id"; 
    // appending the created text to  
    // the created label tag  
   // label.appendChild(document.createTextNode('This is the label for checkbox.')); 
      
 
    
    
    
    // appending the checkbox 
    // and label to div 
    //divConceptsList.appendChild(x); 
    //divConceptsList.appendChild(label); 
    //divConceptsList.innerHTML = '<label> <input type="checkbox" /> <span>Red</span> </label><label> <input type="checkbox" /> <span>Red</span> </label><br>';
    //divConceptsList.innerHTML += '<input type="checkbox" id="vehicle1" value="Bike"><label for="vehicle1"> I have a bike</label><br>';
    
}