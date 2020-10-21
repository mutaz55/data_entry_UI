var currentCourse;
var currentScene;
var _busy;
var save_busy;

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


const saveBtn = document.querySelector("#save-btn");
// get data from database

document.querySelector("#load-btn").addEventListener("click", (e) => {
  e.preventDefault();
  loadDataFromFireStore();
});

// save data into database
saveBtn.addEventListener("click", (event) => {

  event.preventDefault();
  
  if (save_busy) return;
  save_busy = true;

  if (Courses.length <= 0) showError("Nothing to save");
  
  


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

  // Check the scene Headers info changes and save them

  //Delete scene Header
  deleteSceneHeader();
  // Add new Scene Header
  addSceneHeader();


  save_busy = false;
});

function addSceneType() {
  SceneTypes.forEach(function (st) {
    if (
      originalSceneTypes.findIndex(
        (stId) =>
          stId.SceneTypeID == st.SceneTypeID &&
          stId.SceneTypeDesc == st.SceneTypeDesc
      ) == -1
    ) {
      // new Module has been added

      db.collection("sceneTypes")
        .add({
          "sceneT-ID": st.SceneTypeID,
          "sceneT-Text": st.SceneTypeDesc,
        })
        .then(() => {
          originalSceneTypes.unshift(
            new SceneType(st.SceneTypeID, st.SceneTypeID, st.SceneTypeDesc)
          );
          console.log(
            `Scene Type with Id : ${st.SceneTypeID} has been successuflly added!`
          );
        })
        .catch((err) =>
          console.log(`Error while adding Scene Type with Id ${st.SceneTypeID}  
              Details:  ${err}`)
        );
    }
  });
}

function deleteSceneHeader() {
  let AllPromises = [];

  SceneHeaders.forEach(function (del) {
    if (del._deleted) {
      AllPromises.push(
        deleteSceneHeaderFromDB(del)
          .then(() => {
            console.log(
              `Scene type with Id:  ${del.id} has been successuflly deleted!`
            );
          })
          .catch((err) =>
            console.log(`Error while deleting sceneHeader with Id:  ${del.id} 
          Details:  ${err}`)
          )
      );
    }
  });

  Promise.all(AllPromises).then(() => {
    SceneHeaders = SceneHeaders.filter((sH) => sH._deleted == false);
  });
}

function addSceneHeader() {
  SceneHeaders.forEach(function (sH) {
    if (sH._new) {
      db.collection("sceneHeaders")
        .doc(sH.id)
        .set({
          "Course-ID": sH.CourseID,
          "Book-Type": sH.BookType,
          "Lesson-ID": sH.LessonID,
          "Module-ID": sH.ModuleID,
          Points: 0,
          Scene_Desc: sH.sceneDesc,
          "Scene-ID": sH.sceneID,
          "Scene-Seq": sH.sceneSeq,
          "Scene-Title": sH.sceneTitle,
          "Scene-Type": sH.sceneTypeID,
          Score: 0,
          "Send-To-Teacher": sH.sendToTeacher,
          "flag-available": false,
          "flag-finished": false,
          "flag-review": false,
        })
        .then(() => {
          sH.Concepts.forEach(function (con) {
            db.collection("sceneHeaders")
              .doc(sH.id)
              .update({
                Concepts: firebase.firestore.FieldValue.arrayUnion({
                  "Concept-ID": con.ConceptID,
                  "Concept-Text": con.ConceptText,
                }),
              });
          });

          sH.Skills.forEach(function (sk) {
            db.collection("sceneHeaders")
              .doc(sH.id)
              .update({
                Skills: firebase.firestore.FieldValue.arrayUnion({
                  "Skill-ID": sk.SkillID,
                  "Skill-Text": sk.SkillText,
                }),
              });
          });

          console.log(
            ` SceneHeader with id: ${sH.id} has been successuflly added!`
          );
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      sH._new = false;
      return;
    }

    if (sH._changed) {
      db.collection("sceneHeaders")
        .doc(sH.id)
        .update({
          "Course-ID": sH.CourseID,
          "Book-Type": sH.BookType,
          "Lesson-ID": sH.LessonID,
          "Module-ID": sH.ModuleID,
          Points: 0,
          Scene_Desc: sH.sceneDesc,
          "Scene-ID": sH.sceneID,
          "Scene-Seq": sH.sceneSeq,
          "Scene-Title": sH.sceneTitle,
          "Scene-Type": sH.sceneTypeID,
          Score: 0,
          "Send-To-Teacher": sH.sendToTeacher,
          "flag-available": false,
          "flag-finished": false,
          "flag-review": false,
        })
        .then(() => {
          db.collection("sceneHeaders").doc(sH.id).update({
            Concepts: firebase.firestore.FieldValue.delete(),
          });

          sH.Concepts.forEach(function (con) {
            db.collection("sceneHeaders")
              .doc(sH.id)
              .update({
                Concepts: firebase.firestore.FieldValue.arrayUnion({
                  "Concept-ID": con.ConceptID,
                  "Concept-Text": con.ConceptText,
                }),
              });
          });

          db.collection("sceneHeaders").doc(sH.id).update({
            Skills: firebase.firestore.FieldValue.delete(),
          });

          sH.Skills.forEach(function (sk) {
            db.collection("sceneHeaders")
              .doc(sH.id)
              .update({
                Skills: firebase.firestore.FieldValue.arrayUnion({
                  "Skill-ID": sk.SkillID,
                  "Skill-Text": sk.SkillText,
                }),
              });
          });

          console.log(
            ` SceneHeader with id: ${sH.id} has been successuflly updated!`
          );
        })
        .catch(function (error) {
          console.error("Error updating document: ", error);
        });

      sH._changed = false;
    }
  });
}

function addSkill() {
  Skills.forEach(function (sk) {
    if (
      originalSkills.findIndex(
        (skId) => skId.SkillID == sk.SkillID && skId.SkillText == sk.SkillText
      ) == -1
    ) {
      // new Module has been added

      db.collection("skills")
        .add({
          "Skill-ID": sk.SkillID,
          "Skill-Text": sk.SkillText,
        })
        .then(() => {
          originalSkills.unshift(
            new Skill(sk.SkillID, sk.SkillID, sk.SkillText)
          );
          console.log(
            `Skill with Id : ${sk.SkillID} has been successuflly added!`
          );
        })
        .catch((err) =>
          console.log(`Error while adding skill with Id ${sk.SkillID}  
              Details:  ${err}`)
        );
    }
  });
}

function addModule() {
  Modules.forEach(function (con) {
    if (
      originalModules.findIndex(
        (conId) =>
          conId.id == con.id &&
          conId.ModuleID == con.ModuleID &&
          conId.ModuleTitle == con.ModuleTitle
      ) == -1
    ) {
      // new Module has been added

      db.collection("courses")
        .doc(con.id)
        .update({
          Modules: firebase.firestore.FieldValue.arrayUnion({
            "Module-ID": con.ModuleID,
            "Module-Title": con.ModuleTitle,
          }),
        })
        .then(() => {
          originalModules.unshift(
            new Module(con.id, con.ModuleID, con.ModuleTitle)
          );
          console.log(
            `Module with Id : ${con.ModuleID} has been successuflly added!`
          );
        })
        .catch((err) =>
          console.log(`Error while deleting concept with Id ${con.ModuleID}  
              Details:  ${err}`)
        );
    }
  });
}

function addLesson() {
  Lessons.forEach(function (les) {
    if (
      originalLessons.findIndex(
        (lesID) =>
          lesID.id == les.id &&
          lesID.LessonID == les.LessonID &&
          lesID.LessonTitle == les.LessonTitle
      ) == -1
    ) {
      // new Lesson has been added

      db.collection("courses")
        .doc(les.id)
        .update({
          Lessons: firebase.firestore.FieldValue.arrayUnion({
            "Lesson-ID": les.LessonID,
            "Lesson-Title": les.LessonTitle,
            "Module-ID": les.ModuleID,
          }),
        })
        .then(() => {
          originalLessons.unshift(
            new Lesson(les.id, les.LessonID, les.LessonTitle, les.ModuleID)
          );
          console.log(
            `Lesson with Id : ${les.LessonID} has been successuflly added!`
          );
        })
        .catch((err) =>
          console.log(`Error while deleting lesson with Id ${les.LessonID}  
              Details:  ${err}`)
        );
    }
  });
}

function updateCourseInfo() {
  Courses.forEach(function (cour) {
    if (
      cour.Description !=
      originalCourses.find((courID) => courID.id == cour.id).Description
    ) {
      db.collection("courses")
        .doc(cour.id)
        .update({
          Description: cour.Description,
        })
        .then(function () {
          originalCourses.find((courID) => courID.id == cour.id).Description =
            cour.Description;
          console.log(
            `Course Description successfully updated! / Course ID =  ${cour.id}`
          );
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.log(`Error updaing Course Description!  Course ID =  ${cour.id}
               Error >> : ${error}
               `);
        });
    }

    if (
      cour.Category !=
      originalCourses.find((courID) => courID.id == cour.id).Category
    ) {
      db.collection("courses")
        .doc(cour.id)
        .update({
          Category: cour.Category,
        })
        .then(function () {
          originalCourses.find((courID) => courID.id == cour.id).Category =
            cour.Category;
          console.log(
            `Course Category successfully updated! / Course ID = ${cour.id}`
          );
        })
        .catch(function (error) {
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
    if (
      originalConcepts.findIndex(
        (conId) =>
          conId.ConceptID == con.ConceptID &&
          conId.ConceptText == con.ConceptText
      ) == -1
      //con._new 
    ) {
      // new concept has been added
      db.collection("courses")
        .doc(con.id)
        .update({
          Concepts: firebase.firestore.FieldValue.arrayUnion({
            "Concept-ID": con.ConceptID,
            "Concept-Text": con.ConceptText,
          }),
        })
        .then(() => {
           originalConcepts.unshift(
             new Concept(con.id, con.ConceptID, con.ConceptText)
           );
          //con._new = false;
          let msg = `Concept with Id:  ${con.ConceptID} has been successuflly added!`;
          showSuccess(msg);
        })
        .catch((err) =>
          showSuccess(`Error while deleting concept with Id: ${con.ConceptID} 
                           "Details:  ${err}`)
        );
    }
  });
}

function deleteConcept() {

  let AllPromises = [];

  originalConcepts.forEach(function (del) {
    if (
      Concepts.findIndex(
        (conId) =>
          conId.ConceptID == del.ConceptID &&
          conId.ConceptText == del.ConceptText
      ) == -1
    ) {
      AllPromises.push(
        deleteConceptFromDB(del)
          .then(() => {
            console.log(
              `Concept with Id:  ${del.ConceptID} has been successuflly deleted!`
            );
            del.id = "-1";
          })
          .catch((err) =>
            console.log(`Error while deleting concept with Id: ${del.ConceptID} 
       Details:  ${err}`)
          )
      );
    }
  });

  Promise.all(AllPromises).then(() => {
    clearOriginalConcepts();
  });

  // let AllPromises = [];

  // Concepts.forEach(function (del) {

  //   if (del._deleted) {
     
  //     AllPromises.push(

  //       deleteConceptFromDB(del)

  //         .then(() => {
  //           showSuccess(
  //             `Concept with Id:  ${del.ConceptID} has been successuflly deleted!`
  //           );
  //         })
  //         .catch((err) =>
  //           showError(`Error while deleting concept with Id: ${del.ConceptID} 
  //           Details:  ${err}`)
  //         )
  //       );

  //   }

  // });

  // Promise.all(AllPromises).then(() => {
  //    clearConcepts();
  // });

}

function deleteModule() {
  let AllPromises = [];

  originalModules.forEach(function (del) {
    if (
      Modules.findIndex(
        (modId) =>
          modId.id == del.id &&
          modId.ModuleID == del.ModuleID &&
          modId.ModuleTitle == del.ModuleTitle
      ) == -1
    ) {
      AllPromises.push(
        deleteModuleFromDB(del)
          .then(() => {
            console.log(
              `Module with Id:  ${del.ModuleID} has been successuflly deleted!`
            );
            del.ModuleID = "-1";
          })
          .catch((err) =>
            console.log(`Error while deleting Module with Id:  ${del.ModuleID} 
          Details:  ${err}`)
          )
      );
    }
  });

  Promise.all(AllPromises).then(() => {
    clearOringinalModules();
  });
}

function deleteLesson() {
  let AllPromises = [];

  originalLessons.forEach(function (del) {
    if (
      Lessons.findIndex(
        (lesId) =>
          lesId.id == del.id &&
          lesId.LessonID == del.LessonID &&
          lesId.LessonTitle == del.LessonTitle
      ) == -1
    ) {
      AllPromises.push(
        deleteLessonFromDB(del)
          .then(() => {
            console.log(
              `Lesson with Id:  ${del.LessonID} has been successuflly deleted!`
            );
            del.LessonID = "-1";
          })
          .catch((err) =>
            console.log(`Error while deleting Lesson with Id:  ${del.LessonID} 
          Details:  ${err}`)
          )
      );
    }
  });

  Promise.all(AllPromises).then(() => {
    clearOringinalLessons();
  });
}

function deleteSkill() {
  let AllPromises = [];

  originalSkills.forEach(function (del) {
    if (Skills.findIndex((skId) => skId.id == del.id) == -1) {
      AllPromises.push(
        deleteSkillFromDB(del)
          .then(() => {
            console.log(
              `Skill with Id:  ${del.id} has been successuflly deleted!`
            );
            del.id = "-1";
          })
          .catch((err) =>
            console.log(`Error while deleting skill with Id:  ${del.id} 
          Details:  ${err}`)
          )
      );
    }
  });

  Promise.all(AllPromises).then(() => {
    clearOriginalSkills();
  });
}

function deleteSceneType() {
  let AllPromises = [];

  originalSceneTypes.forEach(function (del) {
    if (SceneTypes.findIndex((skId) => skId.id == del.id) == -1) {
      AllPromises.push(
        deleteSceneTypeFromDB(del)
          .then(() => {
            console.log(
              `Scene type with Id:  ${del.id} has been successuflly deleted!`
            );
            del.id = "-1";
          })
          .catch((err) =>
            console.log(`Error while deleting scene type with Id:  ${del.id} 
          Details:  ${err}`)
          )
      );
    }
  });

  Promise.all(AllPromises).then(() => {
    clearOriginalSceneTypes();
  });
}

function deleteSceneHeaderFromDB(del) {
  return db.collection("sceneHeaders").doc(del.id).delete();
}

function deleteSceneTypeFromDB(del) {
  return db.collection("sceneTypes").doc(del.id).delete();
}
function deleteSkillFromDB(del) {
  return db.collection("skills").doc(del.id).delete();
}

function deleteLessonFromDB(del) {
  return db
    .collection("courses")
    .doc(del.id)
    .update({
      Lessons: firebase.firestore.FieldValue.arrayRemove({
        "Lesson-ID": del.LessonID,
        "Lesson-Title": del.LessonTitle,
        "Module-ID": del.ModuleID,
      }),
    });
}

function deleteModuleFromDB(del) {

  return db
    .collection("courses")
    .doc(del.id)
    .update({
      Modules: firebase.firestore.FieldValue.arrayRemove({
        "Module-ID": del.ModuleID,
        "Module-Title": del.ModuleTitle,
      }),
    });
}

function deleteConceptFromDB(del) {
  
  return db
    .collection("courses")
    .doc(del.id)
    .update({
      Concepts: firebase.firestore.FieldValue.arrayRemove({
        "Concept-ID": del.ConceptID,
        "Concept-Text": del.ConceptText,
      }),
    });
}

function clearOriginalSceneTypes() {
  originalSceneTypes = originalSceneTypes.filter((conId) => conId.id != "-1");
}
function clearOriginalSkills() {
  originalSkills = originalSkills.filter((conId) => conId.id != "-1");
}
//function clearConcepts() {
function clearOriginalConcepts(){
  Concepts = Concepts.filter((conId) => conId.id != "-1");
  //Concepts = Concepts.filter((con) => con._deleted == false);
}

function clearOringinalModules() {
  originalModules = originalModules.filter((conId) => conId.ModuleID != "-1");
}

function clearOringinalLessons() {
  originalLessons = originalLessons.filter((lesId) => lesId.LessonID != "-1");
}
// Course combo box

// re-init the array of obejcts
function initArrays(){
  // toDelete.length = 0;
  // toAdd.length = 0;
  // toUpdate.length = 0;
  Concepts.length  = 0;
  originalConcepts.length = 0;
}

function loadDataFromFireStore() {
  
  // to prevent user of clicking too many times load button.
  if (_busy) return;
  _busy = true;

  
  // re-initialize = when user clicks on load button while there are already data into objects.
  initArrays();
  
  Courses = [];
  originalCourses = [];

  Lessons = [];
  originalLessons = [];

  Modules = [];
  originalModules = [];



  Skills = [];
  originalSkills = [];

  SceneTypes = [];
  originalSceneTypes = [];

  SceneHeaders = [];
  originalSceneHeaders = [];

  let AllPromises = [];


  var docRef = db.collection("courses");
  AllPromises.push(
    docRef
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          
          // get Courses Info
            Courses.push(storeDataLocally(doc.id, doc.data(), "courses"));
            originalCourses.unshift(
              storeDataLocally(doc.id, doc.data(), "courses")
            );
          

          // get Concept Info
          if (doc.data()["Concepts"])
            doc.data()["Concepts"].forEach(function (con) {

                Concepts.push(storeDataLocally(doc.id, con, "concepts"));
               originalConcepts.unshift(
                 storeDataLocally(doc.id, con, "concepts")
               );
            
            });

          // get Modules Info
          if (doc.data()["Modules"])
            doc.data()["Modules"].forEach(function (mod) {
              Modules.push(storeDataLocally(doc.id, mod, "modules"));
              originalModules.unshift(storeDataLocally(doc.id, mod, "modules"));
            });

          // get Lessons Info
          if (doc.data()["Lessons"])
            doc.data()["Lessons"].forEach(function (les) {
              
              Lessons.push(storeDataLocally(doc.id, les, "lessons"));
              originalLessons.unshift(storeDataLocally(doc.id, les, "lessons"));
            });
        });
      })
      .catch((er) =>
        console.log("Error while loading course info data..." + er)
      )
  );

  var docRef_sk = db.collection("skills");
  AllPromises.push(
    docRef_sk
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          Skills.push(storeDataLocally(doc.id, doc.data(), "skills"));
          originalSkills.unshift(
            storeDataLocally(doc.id, doc.data(), "skills")
          );
        });
      })
      .catch((er) =>
        console.log("Error while loading skills info data..." + er)
      )
  );

  var docRef_st = db.collection("sceneTypes");
  AllPromises.push(
    docRef_st
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          SceneTypes.push(
            storeDataLocally(doc.id, doc.data(), "sceneTypes")
          );
          originalSceneTypes.unshift(
            storeDataLocally(doc.id, doc.data(), "sceneTypes")
          );
        });
      })
      .catch((er) => console.log(er))
  );

  var docRef_SHeaders = db.collection("sceneHeaders");

  AllPromises.push(
    docRef_SHeaders
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let sceneH = storeDataLocally(doc.id, doc.data(), "sceneHeaders");

          if (doc.data()["Concepts"])
            doc.data()["Concepts"].forEach(function (con) {
              sceneH.Concepts.push(storeDataLocally(null, con, "concepts"));
            });

          if (doc.data()["Skills"])
            doc.data()["Skills"].forEach(function (sk) {
              sceneH.Skills.push(storeDataLocally(null, sk, "skills"));
            });

          SceneHeaders.push(sceneH);
        });
      })
      .catch((er) => console.log(er))
  );

  Promise.all(AllPromises).then(() => {
    
    // Sort all objects Array
    SortObjArrays();  
    // fill courses Info
    fillCourseInfo();
  });
}

// Sorting based on the object ID ( Ascending order)
function SortObjArrays(){

  if (Lessons.length > 0) {
    Lessons = Lessons.sort((a,b) => compareObjID( ConvetToDec(a.LessonID), ConvetToDec(b.LessonID)));
  }

  if (Modules.length > 0) {
    Modules = Modules.sort((a,b) => compareObjID(ConvetToDec(a.ModuleID), ConvetToDec(b.ModuleID)));
  }

  if (Concepts.length > 0 ) {
    Concepts = Concepts.sort((a,b) => compareObjID(ConvertToHexa(a.ConceptID), ConvertToHexa(b.ConceptID)));
  }
}

// The Compare function being used
function compareObjID( a, b ) {
  if ( a < b ){
    return -1;
  }
  if ( a > b ){
    return 1;
  }
  return 0;
}

// Convert the passed id to an equivaluent number (base 16) - when id has valid characters
// to be represent in 16 system
function ConvertToHexa(id){

  return parseInt(id.slice(7),16);
}

// Convert the passed id to an equivalent number (base 10) - when id has invalid characters
// to be represent in 10 system
function ConvetToDec(id){
  return parseInt(id.slice(10));
}

// Clear drop down items (Combobox Courses)
function clearCombo(combo) {

  if (combo.options.length > 0) {

    combo.removeEventListener("change",courseComboChangeHandler, true);
    combo.options.length = 0;

  }
}

// clear all text entries boxes and reset add/update buttons
// for all lists in tab1/tab2
function clearTxtEntries(){

  resetAddBtn(lst_concepts, txt_concept_entry, btn_add_concept);
  resetAddBtn(lst_modules, txt_module_entry, btn_add_module);
  resetAddBtn(lst_lessons, txt_lesson_entry, btn_add_lesson);
  
  resetAddBtnCase2
  (lst_skills, txt_skill_entry, txt_skill_code_entry, btn_add_skill);
  
  resetAddBtnCase2
  (lst_sceneTypes, txt_sceneType_entry, txt_sceneType_code, btn_add_sceneType);

  resetAddBtn(lst_scenes, txt_sceneTitle_entry, btn_add_scene);
}
// function clearLsts() {
//   // Clear concepts list
//   clearConceptsLst();
//   // Clear Modules list
//   clearModulesLst();
//   // Clear Lessons list
//   clearLessonsLst();
//   // Clear Skills list
//   clearSkillsLst();
//   // Clear Scene Types List
//   clearSceneTypes();
//   // Clear Scenes List
//   clearScenesLst();
// }


function courseComboChangeHandler(e) {
  newCourseSelected(e);

  // Select first module in Tab 2
  lst_modules_tab2_setIndex(0);
  
}


function fillCourseInfo() {
    

  // clear the course in combobox if there is any
  clearCombo(courseCombo);
  //courseCombo.outerHTML = courseCombo.outerHTML;

  if (Courses.length != 0) {

    Courses.forEach((x) => {
      const newOption = document.createElement("option");
      const optionText = document.createTextNode(x.CourseTitle);
      // set option text
      newOption.appendChild(optionText);
      // and option value
      newOption.setAttribute("value", x.id);
      // add the option to the select box
      courseCombo.appendChild(newOption);
    });

    courseCombo.addEventListener("change",  courseComboChangeHandler);

    if (courseCombo.options.length > 0) {
      
      courseCombo.dispatchEvent(new Event("change"));
    }
  }
}


// A course selectes from the drop down list (courses combo box)
// then a Change event fires and the following function executes.
function newCourseSelected(event) {
 

  // Find the current course based on the selected item from the course list combo
  currentCourse = Courses.find(
    (courseID) => courseID.id == event.target.value
  );

  // Fill the course description
  
  textAreaCourseDesc.value = currentCourse.Description;

  // Fill the course type (free or paid)
  if (currentCourse.Category == 1) {
    
      chkBoxCourseTypePaid.checked = true;

  } else {

      chkBoxCourseTypeFree.checked = true;
  }


  // clear all text fields tab1
  clearTxtEntries();
  // Clear tab2 fields
  clearScenesLst();

  // Fill info in different sections
  fillConcepts(Concepts.filter((con) => con.id == currentCourse.id));
  fillModules(Modules.filter((mod) => mod.id == currentCourse.id));
  fillLessons(Lessons.filter((les) => les.id == currentCourse.id));
  fillSkills(Skills);
  fillSceneTypes(SceneTypes);

   // Now user can press load button again.
  _busy = false;

}

