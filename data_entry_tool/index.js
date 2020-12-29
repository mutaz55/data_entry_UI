
var currentCourse;
var currentScene;
var _busy;
var save_busy;

var logMsgs = [];

 
const saveBtn = document.querySelector("#save-btn");
// get data from database

document.querySelector("#load-btn").addEventListener("click", (e) => {
  e.preventDefault();
 
    
    loadDataFromFireStore();
 
  
});

//#region Save Operation
// save data into database
saveBtn.addEventListener("click", (event) => {

  event.preventDefault();
  
  if (save_busy) return;
  save_busy = true;

  if (Courses.length <= 0) showError("Nothing to save");
  
  


  // Check if the Course Description or Course Category have been changed
  // And update the new values into the database.
  updateCourseInfo();

  // Check if Subjects  have been changed and save the changes
  // Delete Subjects
  //deleteConcept();
  deleteSubject();
  // Add new Subjects
  //AddConcept();
  AddSubject();
  
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

  // save new/changed scenes into DB
  addScenes();
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
          originalSceneTypes.push(
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
              `SceneHeader with Id:  ${del.id} has been successuflly deleted!`
            );
          })
          .catch((err) =>
            console.log(`Error while deleting sceneHeader with Id:  ${del.id} 
          Details:  ${err}`)
          )
      );

      AllPromises.push(
        deleteSceneFromDB(del.sceneID)
          .then(() => {
            console.log(
              `Scene with Id:  ${del.sceneID} has been successuflly deleted!`
            );
          })
          .catch((err) =>
            console.log(`Error while deleting scene with Id:  ${del.id} 
          Details:  ${err}`)
          )
      );

    }
  });

  Promise.all(AllPromises).then(() => {

    SceneHeaders.forEach (function (item ) {
        
      if (item._deleted) {
        
        ScenesArray = ScenesArray.filter((sc) => sc.id != item.sceneID);

      }

    });

    SceneHeaders = SceneHeaders.filter((sH) => sH._deleted == false);
  });
}

function addScenes(){
  let AllPromises = [];

  SceneHeaders.forEach( function (sHeader) {
    
    if (sHeader._new || sHeader._changed) {

      AllPromises.push(db.collection("Scenes").doc(sHeader.sceneID).set(JSON.parse(JSON.stringify(ScenesArray.find(sc => sc.id == sHeader.sceneID)))));

    }
    
  });

  Promise.all(AllPromises);
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
          sH.Subjects.forEach(function (sub) {
            db.collection("sceneHeaders")
              .doc(sH.id)
              .update({
                Subjects: firebase.firestore.FieldValue.arrayUnion({
                  "subjectID": sub.subjectID,
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
      sH._changed = false;
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
            Subjects: firebase.firestore.FieldValue.delete(),
          });

          sH.Subjects.forEach(function (sub) {
            db.collection("sceneHeaders")
              .doc(sH.id)
              .update({
                Subjects: firebase.firestore.FieldValue.arrayUnion({
                  "subjectID": sub.subjectID,
                  
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
      // new Skill has been added

      db.collection("skills")
        .add({
          "Skill-ID": sk.SkillID,
          "Skill-Text": sk.SkillText,
        })
        .then(() => {
          originalSkills.push(
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
  Modules.forEach(function (mod) {
    if (
      originalModules.findIndex(
        (modId) =>
            modId.id == mod.id &&
            modId.ModuleID == mod.ModuleID &&
            modId.ModuleTitle == mod.ModuleTitle
      ) == -1
    ) {
      // new Module has been added

      db.collection("courses")
        .doc(mod.id)
        .update({
          Modules: firebase.firestore.FieldValue.arrayUnion({
            "Module-ID": mod.ModuleID,
            "Module-Title": mod.ModuleTitle,
          }),
        })
        .then(() => {
          originalModules.push(
            new Module(mod.id, mod.ModuleID, mod.ModuleTitle)
          );
          
          showSuccess(`Module with Id : ${mod.ModuleID} has been successuflly added!`);
          
        })
        .catch((err) =>
          
          showError(`Error while deleting module with Id ${mod.ModuleID}  
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
          originalLessons.push(
            new Lesson(les.id, les.LessonID, les.LessonTitle, les.ModuleID)
          );

          showSuccess(`Lesson with Id : ${les.LessonID} has been successuflly added!`);
          
        })
        .catch((err) =>
          
          showError(`Error while deleting lesson with Id ${les.LessonID}  
          Details:  ${err}`)
          
        );
    }
  });
}


function updateCourseInfo() {

_courses.getCourseLst().forEach(function (course) {

  let doesExist =  Courses.find( (courseItem) => courseItem.id == course.id);

  // update the course
  if (doesExist) {

    if (
      course.Description !=
      Courses.find((courID) => courID.id == course.id).Description
    ) {
      db.collection("courses")
        .doc(course.id)
        .update({
          Description: course.Description,
        })
        .then(function () {
          Courses.find((courID) => courID.id == course.id).Description =
          course.Description;
            showSuccess(`Course Description successfully updated! / Course ID =  ${cour.id}`);
          
        })
        .catch(function (error) {
          
          // The document probably doesn't exist.
          showError(`Error updaing Course Description!  Course ID =  ${cour.id}
          Error >> : ${error}
          `);
          
        });
    }
  
  }
  // New Course has been added
  else 
  {
    db.collection("courses").doc(course.id).set(JSON.parse(JSON.stringify(course)))

  }


});

}


function AddSubject() {
  Subjects.forEach(function (sub) {

    let currentSub =  originalSubjects.find( (subId) => subId.subjectID == sub.subjectID && subId.subjectText == sub.subjectText);
    
    //TODO: Check if the elements have been changed before
    if (!currentSub  || !(JSON.stringify(sub.elements)==JSON.stringify(originalSubjects.find(subId => subId.subjectID == currentSub.subjectID).elements)) )
    {
      // new subject has been added
     
        db.collection("courses").doc(sub.id).collection("Subjects").doc(sub.subjectID).set(JSON.parse(JSON.stringify(sub)))
        
     
        .then(() => {
           
          if (!currentSub)
            {
              let newSub =  new Subject(sub.id, sub.subjectID, sub.subjectText);
              newSub.elements = [...sub.elements];
              originalSubjects.push(newSub);

           
              let msg = `Subject with Id:  ${sub.subjectID} has been successuflly added!`;
              showSuccess(msg);
            }else {
              originalSubjects.find(subId => subId.subjectID == currentSub.subjectID).elements = [...sub.elements];
              let msg = `Elements in subject with Id:  ${sub.subjectID} have been successuflly added!`;
              showSuccess(msg);
            }
        })
        .catch((err) => function() {
          if (!currentSub) {
            showError(`Error while adding a subject with Id: ${sub.subjectID} 
            "Details:  ${err}`)
          }else {
            showError(`Error while adding Elements in subject with Id: ${sub.subjectID} 
            "Details:  ${err}`)
          }
        }
          
          
        
        );
    }
  });
}


function deleteSubject() {

  let AllPromises = [];

  originalSubjects.forEach(function (del) {
    if (
      Subjects.findIndex(
        (subId) =>
          subId.subjectID == del.subjectID
      ) == -1
    ) {
      AllPromises.push(
        deleteSubjectFromDB(del)
          .then(() => {
            console.log(
              `Subject with Id:  ${del.subjectID} has been successuflly deleted!`
            );
            del.id = "-1";
          })
          .catch((err) =>
            console.log(`Error while deleting subject with Id: ${del.subjectID} 
       Details:  ${err}`)
          )
      );
    }
  });

  Promise.all(AllPromises).then(() => {
    clearOriginalSubjects();
  });



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

            showSuccess(`Module with Id:  ${del.ModuleID} has been successuflly deleted!`);
            
            del.ModuleID = "-1";
          })
          .catch((err) =>

            showError(`Error while deleting Module with Id:  ${del.ModuleID} 
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
            
            showSuccess(`Lesson with Id:  ${del.LessonID} has been successuflly deleted!`);
            
            del.LessonID = "-1";
          })
          .catch((err) =>
            
            showError(`Error while deleting Lesson with Id:  ${del.LessonID} 
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

function deleteSceneFromDB(del) {
  return db.collection("Scenes").doc(del.id).delete();
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


function deleteSubjectFromDB(del) {
  
  return db
    .collection("courses")
    .doc(del.id)
    .collection("Subjects")
    .doc(del.subjectID).delete();

}


function clearOriginalSceneTypes() {
  originalSceneTypes = originalSceneTypes.filter((conId) => conId.id != "-1");
}
function clearOriginalSkills() {
  originalSkills = originalSkills.filter((conId) => conId.id != "-1");
}


function clearOriginalSubjects(){
  originalSubjects = originalSubjects.filter((subId) => subId.id != "-1");
}

function clearOringinalModules() {
  originalModules = originalModules.filter((conId) => conId.ModuleID != "-1");
}

function clearOringinalLessons() {
  originalLessons = originalLessons.filter((lesId) => lesId.LessonID != "-1");
}
//#endregion


// Course combo box



// re-init the array of obejcts
function initArrays(){
  
  Courses.length = 0;
  // originalCourses.length = 0;
  Subjects.length  =  0;
  originalSubjects.length = 0;
  Lessons.length = 0;
  originalLessons.length = 0;
  Modules.length = 0;
  originalModules.length = 0;
  Skills.length = 0;
  originalSkills.length = 0;
  SceneTypes.length = 0;
  originalSceneTypes.length = 0;
  SceneHeaders.length = 0;
  originalSceneHeaders.length = 0;
  ScenesArray.length = 0;

}

function loadDataFromFireStore() {
  // to prevent user of clicking too many times load button.
  if (_busy) return;
  _busy = true;

  
  // re-initialize = when user clicks on load button while there are already data into objects.
  initArrays();
  
  

  let AllPromises = [];

  var docRef = db.collection("courses");
  AllPromises.push(
    docRef
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (docu) {
          
          
          // get Courses Info
            Courses.push(storeDataLocally(docu.id, docu.data(), "courses"));
            // originalCourses.push(
            //   storeDataLocally(docu.id, docu.data(), "courses")
            // );
            

          // get Modules Info
          if (docu.data()["Modules"])
              docu.data()["Modules"].forEach(function (mod) {
              Modules.push(storeDataLocally(docu.id, mod, "modules"));
              originalModules.push(storeDataLocally(docu.id, mod, "modules"));
            });

          // get Lessons Info
          if (docu.data()["Lessons"])
              docu.data()["Lessons"].forEach(function (les) {
              
              Lessons.push(storeDataLocally(docu.id, les, "lessons"));
              originalLessons.push(storeDataLocally(docu.id, les, "lessons"));
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
          originalSkills.push(
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
          originalSceneTypes.push(
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

          if (doc.data()["Subjects"])
            doc.data()["Subjects"].forEach(function (sub) {
              console.log(sub);
              const subObj = {
                subjectID : sub["subjectID"],
              };
              sceneH.Subjects?.push(subObj);
            });

          if (doc.data()["Skills"])
            doc.data()["Skills"].forEach(function (sk) {
              sceneH.Skills?.push(storeDataLocally(null, sk, "skills"));
            });

          if (sceneH)
            SceneHeaders.push(sceneH);
        });
      })
      .catch((er) => console.log(er))
  );

  var docRef_Scenes = db.collection("Scenes");

  AllPromises.push(
    docRef_Scenes
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          
          let scene = storeDataLocally(doc.id, doc.data(), "scene");
          
          let hintObj = doc.data()["exerciseHintObj"];
          if(hintObj) {
            scene.exerciseHintObj = new HintObj(hintObj.id, hintObj.text);
            scene.exerciseHintObj.draggableHint = hintObj.draggableHint;
            scene.exerciseHintObj.previousHelp = new PreviousHelpObj(hintObj["previousHelp"].id, hintObj["previousHelp"].description, hintObj["previousHelp"].fileName);
            
          }
        
          if (doc.data()["questions"]) {
              doc.data()["questions"].forEach(function (qu) {

                let quest = new Question(qu.id);

                qu["mediaObjects"].forEach(function (md) {

                  let mdObj = new MediaObjectData(md.id, md.text, md.filename, md.type);

                  quest.mediaObjects.push(mdObj);

                });
                
                qu["statementsAnswers"].forEach(function (sAns) {

                  let stateAns = new statementAnswersObj(sAns.id, sAns.statement);

                  if (sAns["Answers"]) {
                      sAns["Answers"].forEach( function (ans){

                        let answer = new Answers(ans.answerId, ans.answerText, ans.mediaAnswer, ans.correct);
                        stateAns.Answers.push(answer);

                      });
                    
                  }

                  quest.statementsAnswers.push(stateAns);

                });

                scene.questions.push(quest);
                  
              });
              
          }


          ScenesArray.push(scene);
        });
      })
      .catch((er) => console.log(er))
  );

  Promise.all(AllPromises).then(() => {
    
    
    AllPromises = [];
    Courses.forEach( function (courseItem) {

      const subRef = docRef.doc(courseItem.id).collection("Subjects");

      AllPromises.push(
      subRef.get().then(function (query) {

        query.forEach( function (subjDoc) {
          let sub = storeDataLocally(courseItem.id, subjDoc.data(), "subjects");
          let sub1 = storeDataLocally(courseItem.id, subjDoc.data(), "subjects");

          if (subjDoc.data()['elements']){
              subjDoc.data()['elements'].forEach( function(elm){
                
                let newElm = new LingElement(elm.id, elm.subjID, elm.elementText,elm.elementType);
                let newElm1 = new LingElement(elm.id, elm.subjID, elm.elementText,elm.elementType);
                
                sub.elements.push(newElm);
                sub1.elements.push(newElm1);

              });
          }


          Subjects.push(sub);
          originalSubjects.push( sub1);
          
        });
      })
      .catch((er) =>
      console.log("Error while loading subjects info data..." + er)
      )
      )
    })
      
    Promise.all(AllPromises).then(() => {

      if (Courses.length > 0) {
        _courses = new C(Courses, Courses[0].id);
      }
          
      // if there are no courses
      else {
        _courses = new C(Courses, "");
      }
      
      // Sort all objects Array
      SortObjArrays();  
     
      
      fillSkills(Skills);

      // fill courses Info
      fillCourseInfo();
      newCourseSelected();

    })
    
  });
}

// Sorting based on the object ID ( Ascending order)
function SortObjArrays(){

  if (Lessons.length > 0) {
    Lessons = Lessons.sort((a,b) => compareObjID( ConvertToDec(a.LessonID), ConvertToDec(b.LessonID)));
  }

  if (Modules.length > 0) {
    Modules = Modules.sort((a,b) => compareObjID(ConvertToDec(a.ModuleID), ConvertToDec(b.ModuleID)));
  }

  if (Subjects.length > 0) {
    Subjects = Subjects.sort((a,b) => compareObjID(ConvertToDec(a.subjectID), ConvertToDec(b.subjectID)));
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
function ConvertToDec(id){
  return parseInt(id.slice(10));
}

// Clear drop down items (Combobox Courses)
function clearCombo(combo) {
  if (combo.options.length > 0) {
    combo.options.length = 0;
  }
}

// clear all text entries boxes and reset add/update buttons
// for all lists in tab1/tab2
function clearTxtEntries(){

  resetAddBtn(lst_modules, txt_module_entry, btn_add_module);
  resetAddBtn(lst_lessons, txt_lesson_entry, btn_add_lesson);
  resetAddBtn(lst_subjects, txt_subject_entry, btn_add_subject);
  resetAddBtn(lst_scenes, txt_sceneTitle_entry, btn_add_scene);
  clearSceneDesc();
  clearElementTxtarea();

  
}


function courseComboChangeHandler(e) {


  _courses.currentCourse = e.target.value;
  // _courses.currentModule = _courses.getFirstModule();
  // _courses.currentLesson = _courses.getFirstLesson();
  // _courses.currentScene = _courses.getFirstScene();

  newCourseSelected();

  // Select first module in Tab 2
  // lst_modules_tab2_setIndex(0);
}

function fillCourseInfo() {
  // clear the course in combobox if there is any
  clearCombo(courseCombo);
  courseCombo.addEventListener('change',courseComboChangeHandler );
  
  // Fetch the default course
  // if default is not exist
  // then 
  // if there are courses

  fillCourseTitleCombo();

 
  // //courseCombo.outerHTML = courseCombo.outerHTML;
  

  // newCourseSelected();

 
  // _courses.currentModule = _courses.getFirstModule();
  // _courses.currentLesson = _courses.getFirstLesson();
  // _courses.currentScene = _courses.getFirstScene();
  console.log('first time current scene' + _courses.currentScene);

}


function fillCourseTitleCombo(){

  _courses.getCourseTitles().forEach((x) => {
    addNewItemsTab2(_courses.getCourseTitle(x.id),x.id,courseCombo,true);
  });


  // courseCombo.addEventListener("change", comboChangeCourse);

  // if (courseCombo.options.length > 0) {
  //   courseCombo.dispatchEvent(new Event("change"));
  // }

}

// When a course selected from the drop down list (courses combo box)
// a Change event fires and the following function executes.
function newCourseSelected() {
  // Find the current course based on the selected item from the course list combo
  // currentCourse = Courses.find((courseID) => courseID.id == event.target.value);
  
  // clear all text fields
  clearTxtEntries();
  
  // Fill the course description
  txtbox_course_description.value = _courses.getCourseDesc();
  courseTitle.textContent = _courses.getCourseObj().CourseTitle;
  courseLang.value  = _courses.getCourseObj().Lang;
  courseLevel.value = _courses.getCourseObj().Level;
  courseState.value = "نشط";
  // courseChkboxDefault

   
  // Clear tab2 fields
  //clearScenesLst();
  //register event handler for all lists
  registerHandlers();
  // Fill info in different sections
  fillModules(_courses.getModules());
  fillLessons(_courses.getLessons());
  // fillSubjects(Subjects.filter((subj) => subj.id == currentCourse.id));
  
  fillSubjects(_courses.getSubjects());
  fillSubjectsTab2(_courses.getSubjects(), lst_subjects_tab2);

  fillSubjElements(_courses.getSubject());
  activiateFirstBtn(Modules);
  document.getElementById(activiateFirstBtn(Modules))?.click();

  fillScenes(_courses.getScenes()); 
  console.log('_courses.getScenes()' + _courses.getScenes());
  console.log('currentCourse' + _courses.currentCourse);

  textbox_scene_desc.value = _courses.getSceneDesc();
  fillSceneSubjects(_courses.getSceneSubjects());
  // fillSkills(Skills);
  // fillSceneTypes(SceneTypes);
  //TODO: check if the course is default one
  // 
  // The course is not the default one
  _courses.currentModule = _courses.getFirstModule();
  _courses.currentLesson = _courses.getFirstLesson();
  _courses.currentScene = _courses.getFirstScene();

  // Now user can press load button again.
  _busy = false;
}

// Side Nav Section

function OpenSideNavCourses() {
  document.getElementById("side-nav-courses").style.width = "75%";
}

function CloseSideNavCourses() {
  document.getElementById("side-nav-courses").style.width = "0";
}

function OpenSideNavScenes() {
  document.getElementById("side-nav-scenes").style.width = "75%";
}

function CloseSideNavScenes() {
  document.getElementById("side-nav-scenes").style.width = "0";
}

function registerHandlers() {
  //register the click event of small close buttons for all lists
  lst_modules.handler = lst_modules_handler;
  lst_lessons.handler = lst_lessons_handler;
  lst_subjects.handler = lst_subjects_handler;
  lst_scenes.handler = lst_scenes_handler;
}