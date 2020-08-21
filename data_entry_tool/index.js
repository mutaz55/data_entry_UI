
var currentCourse;
var logMsgs = [];
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


// save data into database
document.querySelector('#save-btn').addEventListener("click", (event)=> {
  event.preventDefault();

  if (Courses.length <= 0) return console.log("Courses has no changes");
    

    // Check if the Course Description or Course Category have been changed
    // And update the new values into the database.
    updateCourseInfo();

    
    // Check if Concepts have been changed and save the changes
    // Delete concepts
    deleteConcept();   
    
    // Add new Concepts
    AddConcept();


    // Check if the Modules info have been changed and save them

    // Delete Modules
    deleteModule();

    // Add new modules
    addModule();



    // Check if the lessons info have been changed and save them
    // Delete lessons
    deleteLesson();  
    
    // Add new lessons
    addLesson();



    

    // Check the skills info changes and save them
    //Delete skills
    deleteSkill();
    // Add new skills
    addSkill();


    // Check the scene types info changes and save them
    // Delete scene types
    deleteSceneType();
    // Add new scene types
    addSceneType();
    
   
});


function addSceneType() {

  SceneTypes.forEach(function (st) {


    
    if (originalSceneTypes.findIndex(stId => stId.SceneTypeID == st.SceneTypeID && stId.SceneTypeDesc == st.SceneTypeDesc) == -1) {
    
      // new Module has been added      
      
      db.collection("sceneTypes").add({
        
          'sceneT-ID': st.SceneTypeID,
          'sceneT-Text': st.SceneTypeDesc
        
      }).then(() => {

        originalSceneTypes.unshift(new SceneType(st.SceneTypeID, st.SceneTypeID, st.SceneTypeDesc));
        console.log(`Scene Type with Id : ${st.SceneTypeID} has been successuflly added!`);
      }).catch(err => 
        console.log(`Error while adding Scene Type with Id ${st.SceneTypeID}  
              Details:  ${err}`));

    }

  });
}

function addSkill() {

  Skills.forEach(function (sk) {


    
    if (originalSkills.findIndex(skId =>  skId.SkillID == sk.SkillID && skId.SkillText == sk.SkillText) == -1) {
    
      // new Module has been added      
      
      db.collection("skills").add({
        
          'Skill-ID': sk.SkillID,
          'Skill-Text': sk.SkillText
        
      }).then(() => {

        originalSkills.unshift(new Skill(sk.SkillID, sk.SkillID, sk.SkillText));
        console.log(`Skill with Id : ${sk.SkillID} has been successuflly added!`);
      }).catch(err => 
        console.log(`Error while adding skill with Id ${sk.SkillID}  
              Details:  ${err}`));

    }

  });
}


function addModule() {

  Modules.forEach(function (con) {


    
    if (originalModules.findIndex(conId => conId.id == con.id && conId.ModuleID == con.ModuleID && conId.ModuleTitle == con.ModuleTitle) == -1) {
    
      // new Module has been added      
      
      db.collection("courses").doc(con.id).update({
        'Modules': firebase.firestore.FieldValue.arrayUnion({
          'Module-ID': con.ModuleID,
          'Module-Title': con.ModuleTitle
        })
      }).then(() => {

        originalModules.unshift(new Module(con.id, con.ModuleID, con.ModuleTitle));
        console.log(`Module with Id : ${con.ModuleID} has been successuflly added!`);
      }).catch(err => 
        console.log(`Error while deleting concept with Id ${con.ModuleID}  
              Details:  ${err}`));

    }

  });
}


function addLesson() {

  Lessons.forEach(function (les) {


    
    if (originalLessons.findIndex(lesID => lesID.id == les.id && lesID.LessonID == les.LessonID && lesID.LessonTitle == les.LessonTitle) == -1) {
    
      // new Lesson has been added      
      
      db.collection("courses").doc(les.id).update({
        'Lessons': firebase.firestore.FieldValue.arrayUnion({
          'Lesson-ID': les.LessonID,
          'Lesson-Title': les.LessonTitle
        })
      }).then(() => {

        originalLessons.unshift(new Lesson(les.id, les.LessonID, les.LessonTitle));
        console.log(`Lesson with Id : ${les.LessonID} has been successuflly added!`);
      }).catch(err => 
        console.log(`Error while deleting lesson with Id ${les.LessonID}  
              Details:  ${err}`));

    }

  });
}



function updateCourseInfo() {

  Courses.forEach(function (cour) {
    if (cour.Description != originalCourses.find(courID => courID.id == cour.id).Description) {
      db.collection("courses").doc(cour.id).update({
        "Description": cour.Description
      })
        .then(function () {
          originalCourses.find(courID => courID.id == cour.id).Description = cour.Description;
          console.log(`Course Description successfully updated! / Course ID =  ${cour.id}`);

        }).catch(function (error) {
          // The document probably doesn't exist.
          console.log(`Error updaing Course Description!  Course ID =  ${cour.id}
               Error >> : ${error}
               `);
        });

    }

    if (cour.Category != originalCourses.find(courID => courID.id == cour.id).Category) {
      db.collection("courses").doc(cour.id).update({
        "Category": cour.Category
      })
        .then(function () {
          originalCourses.find(courID => courID.id == cour.id).Category = cour.Category;
          console.log(`Course Category successfully updated! / Course ID = ${cour.id}`);
        }).catch(function (error) {
          // The document probably doesn't exist.
          console.log(`Error updaing Course Category!  / Course ID =  ${cour.id}
            Error >> : ${error}
            `);
        });

    }


  });
}

function AddConcept() {
  Concepts.forEach(function (con) {


         
    if (originalConcepts.findIndex(conId => conId.ConceptID == con.ConceptID && conId.ConceptText == con.ConceptText) == -1) {

      // new concept has been added 
      db.collection("courses").doc(con.id).update({
        'Concepts': firebase.firestore.FieldValue.arrayUnion({
          'Concept-ID': con.ConceptID,
          'Concept-Text': con.ConceptText
        })
      }).then(() => {

        originalConcepts.unshift(new Concept(con.id, con.ConceptID, con.ConceptText));
        console.log(`Concept with Id:  ${con.ConceptID} has been successuflly added!`);
      }).catch(err => console.log(`Error while deleting concept with Id: ${con.ConceptID} 
                           "Details:  ${err}`));

    }

  });
}

function deleteConcept() {

  let AllPromises =[];

  originalConcepts.forEach(function (del) {


    if (Concepts.findIndex(conId => conId.ConceptID == del.ConceptID && conId.ConceptText == del.ConceptText) == -1) {

      AllPromises.push(deleteConceptFromDB(del).then(() => {
        console.log(`Concept with Id:  ${del.ConceptID} has been successuflly deleted!`);
        del.id = "-1";
      }).catch(err =>  console.log(`Error while deleting concept with Id: ${del.ConceptID} 
       Details:  ${err}`))
    );

    }
   
  });

  Promise.all(AllPromises).then(()=> {
    clearOriginalConcepts();

  })

}

function deleteModule() {

  let AllPromises =[];

  originalModules.forEach(function (del) {

    if (Modules.findIndex(modId => modId.id == del.id && modId.ModuleID == del.ModuleID && modId.ModuleTitle == del.ModuleTitle) == -1) {

      AllPromises.push ( deleteModuleFromDB(del).then(() => {
        console.log(`Module with Id:  ${del.ModuleID} has been successuflly deleted!`);
        del.ModuleID = "-1";
      }).catch(err => console.log(`Error while deleting Module with Id:  ${del.ModuleID} 
          Details:  ${err}`))
      );
      

    }


  });

  Promise.all(AllPromises).then(()=> {
    clearOringinalModules();
   
  })
}


function deleteLesson() {

  let AllPromises =[];

  originalLessons.forEach(function (del) {

    if (Lessons.findIndex(lesId => lesId.id == del.id && lesId.LessonID == del.LessonID && lesId.LessonTitle == del.LessonTitle) == -1) {

      AllPromises.push ( deleteLessonFromDB(del).then(() => {
        console.log(`Lesson with Id:  ${del.LessonID} has been successuflly deleted!`);
        del.LessonID = "-1";
      }).catch(err => console.log(`Error while deleting Lesson with Id:  ${del.LessonID} 
          Details:  ${err}`))
      );
      

    }


  });

  Promise.all(AllPromises).then(()=> {
    clearOringinalLessons();
   
  })
}


function deleteSkill() {

  let AllPromises =[];

  originalSkills.forEach(function (del) {

    if (Skills.findIndex(skId => skId.id == del.id) == -1) {

      AllPromises.push ( deleteSkillFromDB(del).then(() => {
        console.log(`Skill with Id:  ${del.id} has been successuflly deleted!`);
        del.id = "-1";
      }).catch(err => console.log(`Error while deleting skill with Id:  ${del.id} 
          Details:  ${err}`))
      );
      

    }


  });

  Promise.all(AllPromises).then(()=> {
    clearOriginalSkills();
   
  })
}


function deleteSceneType() {

  let AllPromises =[];

  originalSceneTypes.forEach(function (del) {

    if (SceneTypes.findIndex(skId => skId.id == del.id) == -1) {

      AllPromises.push ( deleteSceneTypeFromDB(del).then(() => {
        console.log(`Scene type with Id:  ${del.id} has been successuflly deleted!`);
        del.id = "-1";
      }).catch(err => console.log(`Error while deleting scene type with Id:  ${del.id} 
          Details:  ${err}`))
      );
      

    }


  });

  Promise.all(AllPromises).then(()=> {
    clearOriginalSceneTypes();
   
  })
}


function deleteSceneTypeFromDB(del) {
  return db.collection("sceneTypes").doc(del.id).delete();
}
function deleteSkillFromDB(del) {
  return db.collection("skills").doc(del.id).delete();
}

function deleteLessonFromDB(del) {
  return db.collection("courses").doc(del.id).update({
    'Lessons': firebase.firestore.FieldValue.arrayRemove({
      'Lesson-ID': del.LessonID,
      'Lesson-Title': del.LessonTitle
    })
  });
}

function deleteModuleFromDB(del) {
  return db.collection("courses").doc(del.id).update({
    'Modules': firebase.firestore.FieldValue.arrayRemove({
      'Module-ID': del.ModuleID,
      'Module-Title': del.ModuleTitle
    })
  });
}

function deleteConceptFromDB(del) {
  return db.collection("courses").doc(del.id).update({
    'Concepts': firebase.firestore.FieldValue.arrayRemove({
      'Concept-ID': del.ConceptID,
      'Concept-Text': del.ConceptText
    })
  });
}



function clearOriginalSceneTypes (){
  originalSceneTypes = originalSceneTypes.filter( conId => conId.id != "-1");
  
}
function clearOriginalSkills (){
  originalSkills = originalSkills.filter( conId => conId.id != "-1");
  
}
function clearOriginalConcepts (){
  originalConcepts = originalConcepts.filter( conId => conId.id != "-1");
  
}
function clearOringinalModules (){
  originalModules = originalModules.filter( conId => conId.ModuleID != "-1");

}

function clearOringinalLessons (){
  originalLessons = originalLessons.filter( lesId => lesId.LessonID != "-1");

}
// Course combo box
const courseCombo = document.getElementById("id-course-title");



function loadDataFromFireStore() {
  // re-initialize = when user clicks on load button while there are already data into objects.
  Courses = [];
  originalCourses = [];

  Lessons = [];
  originalLessons = [];

  Modules = [];
  originalModules = [];

  Concepts = [];
  originalConcepts = [];
  
  Skills = [];
  originalSkills = [];

  SceneTypes = [];
  originalSceneTypes = [];


  // Clear Course combo box
  clearCombo(courseCombo);
  // Clear concepts list
  clearConceptsLst();
  // Clear modules list
  clearModulesLst();

  let AllPromises =[];

  var docRef = db.collection("courses");
  AllPromises.push(
  docRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // get Courses Info
      Courses.unshift(storeDataLocally(doc.id, doc.data(), "courses"));
      originalCourses.unshift(storeDataLocally(doc.id, doc.data(), "courses"));

      // get Concept Info
      if (doc.data()["Concepts"])
        doc.data()["Concepts"].forEach(function (con) {
          Concepts.unshift(storeDataLocally(doc.id, con, "concepts"));
          originalConcepts.unshift(storeDataLocally(doc.id, con, "concepts"));
        });

      // get Modules Info
      if (doc.data()["Modules"])
        doc.data()["Modules"].forEach(function (mod) {
          Modules.unshift(storeDataLocally(doc.id, mod, "modules"));
          originalModules.unshift(storeDataLocally(doc.id,mod,"modules"));
        });

      // get Lessons Info
      if (doc.data()["Lessons"])
        doc.data()["Lessons"].forEach(function (les) {
          Lessons.unshift(storeDataLocally(doc.id, les, "lessons"));
          originalLessons.unshift(storeDataLocally(doc.id, les, "lessons"));
        });

     
    });

    

 
   
  }).catch( er =>  console.log("Error while loading course info data..." + er)   ) 
  );

  var docRef_sk = db.collection("skills");
  AllPromises.push(
  docRef_sk.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {

      Skills.unshift(storeDataLocally(doc.id,doc.data(),"skills"));
      originalSkills.unshift(storeDataLocally(doc.id,doc.data(),"skills"));


    });
    
  }).catch( er =>  console.log("Error while loading skills info data..." + er)   )
  );

  
  var docRef_st = db.collection("sceneTypes");
  AllPromises.push(
  docRef_st.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      
      SceneTypes.unshift(storeDataLocally(doc.id,doc.data(),"sceneTypes"));
      originalSceneTypes.unshift(storeDataLocally(doc.id,doc.data(),"sceneTypes"));
    });
    
  }).catch(er => console.log(er))

  );

 Promise.all(AllPromises).then(()=> {
     
  // fill courses Info
  fillCourseInfo();

  })


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

      لهف
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
      fillSkills(Skills);
      fillSceneTypes(SceneTypes);
      

    
    });
    
    if (courseCombo.options.length > 0) {
        courseCombo.dispatchEvent(new Event('change'));
      
    }
      
  }
  


}
