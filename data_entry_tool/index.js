var currentCourse;

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
//const mainMsg = document.querySelector('#mainMsg');

const setupUI = (user) => {
  if (user) {
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
    // mainMsg.style.display = "none";
  } else {
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
    //mainMsg.style.display = "block";
  }
};
// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
});

// get data from database

document.querySelector("#load-btn").addEventListener("click", (e) => {
  e.preventDefault();
  loadDataFromFireStore();
});



// Course combo box
const courseCombo = document.getElementById("id-course-title");



function loadDataFromFireStore() {
  // re-initialize = when user clicks on load button while there are already data into objects.
  Courses = [];
  Lessons = [];
  Modules = [];
  Concepts = [];
  Skills = [];
  SceneTypes = [];

  // Clear Course combo box
  clearCombo(courseCombo);
  // Clear concepts list
  clearConceptsLst();
  // Clear modules list
  clearModulesLst();


  var docRef = db.collection("courses");
  docRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // get Courses Info
      Courses.unshift(storeDataLocally(doc.id, doc.data(), "courses"));

      // get Concept Info
      if (doc.data()["Concepts"])
        doc.data()["Concepts"].forEach(function (con) {
          Concepts.unshift(storeDataLocally(doc.id, con, "concepts"));
        });

      // get Modules Info
      if (doc.data()["Modules"])
        doc.data()["Modules"].forEach(function (mod) {
          Modules.unshift(storeDataLocally(doc.id, mod, "modules"));
        });

      // get Lessons Info
      if (doc.data()["Lessons"])
        doc.data()["Lessons"].forEach(function (les) {
          Lessons.unshift(storeDataLocally(doc.id, les, "lessons"));
        });

      // get Skills Info
      if (doc.data()["Skills"])
        doc.data()["Skills"].forEach(function (sk) {
          Skills.unshift(storeDataLocally(doc.id, sk, "skills"));
        });

      // get Scene Types Info
      if (doc.data()["Scene-Types"])
        doc.data()["Scene-Types"].forEach(function (scType) {
          SceneTypes.unshift(storeDataLocally(doc.id, scType, "sceneTypes"));
        });
    });

    // fill courses Info
    fillCourseInfo();

 
   
  });
}



function clearCombo(combo){
  const length = combo.options.length;
  for (i = length-1; i >= 0; i--) {
          combo.options[i] = null;

}



}
function fillCourseInfo() {
  
  // clear the course in combobox if there is any
  clearCombo(courseCombo);
  if (Courses.length != 0) {
    Courses.forEach( x => {
      const newOption = document.createElement('option');
      const optionText = document.createTextNode(x.CourseTitle);
      // set option text
      newOption.appendChild(optionText);
      // and option value
      newOption.setAttribute('value',x.id);
      // add the option to the select box
      courseCombo.appendChild(newOption);

    });

    courseCombo.addEventListener('change', (event)=> {

      
      // Clear concepts list
      clearConceptsLst();
      // Clear Modules list
      clearModulesLst();
      // Clear Lessons list
      clearLessonsLst();
      // Clear Skills list
      clearSkillsLst();
      // Clear Scene Types List
      clearSceneTypes();

      
      currentCourse = Courses.find( courseID => courseID.id == event.target.value);
      const textAreaCourseDesc = document.getElementById("id-course-description");
      textAreaCourseDesc.value = currentCourse.Description;


      if (currentCourse.Category == 1) {

        const chkBoxCourseTypePaid = document.getElementById("id-cat-paid");
        chkBoxCourseTypePaid.checked = true;

      }else {

        const chkBoxCourseTypeFree = document.getElementById("id-cat-free");
        chkBoxCourseTypeFree.checked = true;

      }
      
   
      fillConcepts(Concepts.filter( con => con.id == currentCourse.id ));
      fillModules(Modules.filter(mod => mod.id == currentCourse.id));
      fillLessons(Lessons.filter(les => les.id == currentCourse.id));
      fillSkills(Skills.filter(sk => sk.id == currentCourse.id));
      fillSceneTypes(SceneTypes.filter(sT => sT.id == currentCourse.id));
      
    });
    
    if (courseCombo.options.length > 0) {
        courseCombo.dispatchEvent(new Event('change'));
      
    }
      
  }
  


  

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
