/////////////////////////// Initialization /////////////////////////////
// Tab 1
// The course combo box (dropdown list)
const courseCombo = document.getElementById("id-course-title");

const courseTitle = document.getElementById('tab1-lbl-coursename');
const courseLang  = document.getElementById('tab1-lbl-lang');
const courseLevel = document.getElementById('tab1-lbl-level');
const courseState = document.getElementById('tab1-lbl-coursestate');
const courseChkboxDefault = document.getElementById('tab1-chk-default');
// The course type
// const chkBoxCourseTypePaid = document.getElementById("id-cat-paid");
// const chkBoxCourseTypeFree = document.getElementById("id-cat-free");
const courseTitle_entry = document.getElementById("new-course-name");
const courseLang_entry = document.getElementById('course-lang');
const courseLevel_entry = document.getElementById('course-level');
// The course description field
// const textAreaCourseDesc = document.getElementById("id-course-description");
// Input fields - Course Description / Category
const txtbox_course_description = document.querySelector(
  "#id-course-description"
);
// Subject List
const btn_add_subject = document.querySelector("#add_subject");
// const btn_remove_subject = document.querySelector("#remove_subject");
const lst_subjects = document.querySelector("#id-subject");
const txt_subject_entry = document.querySelector("#txt_subject");

// Modules List
const btn_add_module = document.querySelector("#add_module");
// const btn_remove_module = document.querySelector("#remove_module");
const lst_modules = document.querySelector("#id-modules");
const txt_module_entry = document.getElementById("txt_module");


// Lessons List
const btn_add_lesson = document.querySelector("#add_lesson");
// const btn_remove_lesson = document.querySelector("#remove_lesson");
const lst_lessons = document.querySelector("#id-lessons");
const txt_lesson_entry = document.getElementById("txt_lesson");


// Skills
// const btn_add_skill = document.querySelector("#add_skill");
// const btn_remove_skill = document.querySelector("#remove_skill");
const lst_skills = document.querySelector("#id-skills");

const txt_skill_entry = document.getElementById("txt_skill");
const txt_skill_code_entry = document.getElementById("txt_skill_code");

// Scene Types
// const btn_add_sceneType = document.querySelector("#add_sceneType");
// const btn_remove_sceneType = document.querySelector("#remove_sceneType");
// const lst_sceneTypes = document.querySelector("#id-sceneTypes");


// const txt_sceneType_entry = document.getElementById("txt_sceneType");
// const txt_sceneType_code = document.getElementById("txt_sceneType_code");

// Elements
const btn_update_elements = document.getElementById("update_elements");
const txt_keywords = document.getElementById("id-keywords-list");
const txt_structure = document.getElementById("id-structure-list");
const txt_vocals = document.getElementById("id-vocals-list");
const txt_grammer = document.getElementById("id-grammer-list");


//// Tab 2

// Modules
const lst_modules_tab2 = document.querySelector("#id-units");

// Lessons
const lst_lessons_tab2 = document.querySelector("#id-lessons-tab2");

//const tab2Header = document.querySelector("#sceneInfoTab2");
// Scene
const btn_add_scene = document.querySelector("#add_sceneTitle");
// const btn_remove_scene = document.querySelector("#remove_sceneTitle");
const lst_scenes = document.querySelector("#id-scenes");

const txt_sceneTitle_entry = document.getElementById("txt_sceneTitle");


// Scene No
// const lbl_scene_no = document.querySelector("#id-scene-no");

// Scene Description
const textbox_scene_desc = document.querySelector("#id-scene-description");

// Scene Subjects
const lst_subjects_tab2 = document.querySelector("#id-select-subject");
const scene_subjects = document.querySelector("#id-lst-subjects");
const add_subj_scene = document.querySelector("#add_subject_to_scene");
const remove_subj_scene = document.querySelector("#remove_subject_from_scene");


// side nav1 - new course 
const show_addNewBtn = document.getElementById('new-course-btn');
const container_addNewBtn = document.getElementById('hidden-container');
const btn_addNewCourse = document.getElementById('sidenav1-btn-add');
const entry_newCourseTxt = document.getElementById('new-course-name');
// Scene Skills
//const lst_skills_tab2 = document.querySelector("#id-select-skill");

// //const scene_skills = document.querySelector("#id-lst-skills");
// const add_skill_scene = document.querySelector("#add_skill_to_scene");
// const remove_skill_scene = document.querySelector("#remove_skill_from_scene");

// Send to teacher
// const radiobtn_sendToTeacher = document.querySelector("#id-send-to-teacher");
// const radiotbtn_sendToTeacherNot = document.querySelector(
//   "#id-send-to-teacher-not"
// );

// Book Type
// const radiobtn_kursBuch = document.querySelector("#id-kursbook");
// const radiobtn_arbeitsBuch = document.querySelector("#id-Arbeitbook");


// Scene Type
// const lst_sceneTypes_tab2 = document.querySelector("#lst_scenesType_tab2");

///


// const radiobtn_course_category_paid = document.querySelector("#id-cat-paid");
// const radiobtn_course_category_free = document.querySelector("#id-cat-free");

// Elements Component
// const lst_elementsSkills_tab3 = document.querySelector('#id-select-elementSkills');
// const lst_elementsType_tab3 = document.querySelector('#id-select-elementType');
// const lst_elements_tab3 = document.querySelector('#id-select-element');

// Toast Msgs

function showError(msg) {
  console.log({ html: msg, classes: "toast-style" });
}

function showSuccess(msg){
  console.log({html:msg, classes: "toast-success"});
}



let CurrentElements = [];


///////////////////// Tab 1 /////////////////////


// Listener for Course Description 
txtbox_course_description.addEventListener("blur", (e) => {
  if (Courses.length > 0)  {
    _courses.c_list.find((item)=> item.id == _courses.currentCourse).Description = e.target.value;

  }
   
});



// Add Click event to update (Change the text value) of the list items
// and add Key listener for lists
//


// Modules list
//addLstHandlers(lst_modules,txt_module_entry,btn_add_module);
addModLstHandlers();

// Lessons list
addLesLstHandlers();

// Subject list 
addSubLstHandlers();

// addLstHandlers(lst_subjects,txt_subject_entry,btn_add_subject);


// addLstHandlers(lst_lessons, txt_lesson_entry, btn_add_lesson);

// Skills list
// addLstHandlersCase2(lst_skills, txt_skill_entry, txt_skill_code_entry, btn_add_skill);

//Scenes
addSceneLstHandlers();



// Enable updating of the selected item text
// And add handlers for key strokes (Enter, Escape)
// function addLstHandlers(lst, txt_entry, btn_add) {

//       lst.index = "-1";
//       lst.mode = "normal";
      
//       // When click on any item of the subject list
//       // store the id of the clicked item 
//       lst.addEventListener('click', function (e){
      
//             this.index = e.target.id;
//             txt_entry.value = e.target.textContent;
//             btn_add.textContent = "تعديل"
//             lst.mode = "update";
          


//       });

//       keyHandlers(lst, txt_entry, btn_add);

// }

function addModLstHandlers() {

        lst_modules.index = "-1";
        lst_modules.mode = "normal";
        // When click on any item of the module list
        // store the id of the clicked item 
        lst_modules.addEventListener('click', function (e){
       
              if (lst_modules.length <= 0) return;
              if (!e.target.classList.contains("buttons-in-list")) return;
               
              lst_modules.index = e.target.id;
              fillLessonsTab1();

              if (e.detail == 2) {
                txt_module_entry.value = e.target.textContent;
                btn_add_module.textContent = "تعديل"
                lst_modules.mode = "update";
              }else {
                resetAddBtn(lst_modules,txt_module_entry,btn_add_module);
              }
   
        });

        keyHandlers(lst_modules, txt_module_entry, btn_add_module);
}


function addLesLstHandlers() {

       

  lst_lessons.index = "-1";
  lst_lessons.mode = "normal";
  // When click on any item of the module list
  // store the id of the clicked item 
  lst_lessons.addEventListener('click', function (e){

        if (lst_lessons.length <= 0) return;
        if (!e.target.classList.contains("buttons-in-list")) return;
         
        lst_lessons.index = e.target.id;
       
        fillSubjectsTab1();
        
        if (e.detail == 2) {
          txt_lesson_entry.value = e.target.textContent;
          btn_add_lesson.textContent = "تعديل"
          lst_lessons.mode = "update";
        } else {
          resetAddBtn(lst_lessons, txt_lesson_entry, btn_add_lesson);
        }
        
      


  });
  
  keyHandlers(lst_lessons, txt_lesson_entry, btn_add_lesson);
}


function addSubLstHandlers(){
  
  lst_subjects.index = "-1";
  lst_subjects.mode = "normal";
  // When click on any item of the module list
  // store the id of the clicked item 
  lst_subjects.addEventListener('click', function (e){
 
        if (lst_subjects.length <= 0) return;
        if (!e.target.classList.contains("buttons-in-list")) return;
         
            lst_subjects.index = e.target.id;
            fillSubjElements(_courses.getSubject(lst_subjects.index));
            
            if (e.detail == 2) {
              txt_subject_entry.value = e.target.textContent;
              btn_add_subject.textContent = "تعديل"
              lst_subjects.mode = "update";
            } else {
              resetAddBtn(lst_subjects, txt_subject_entry, btn_add_subject);
            }

  });
  
  keyHandlers(lst_subjects, txt_subject_entry, btn_add_subject);
}
// Enable updating of the selected item text (Skills/SceneTypes)
// And add handlers for key strokes (Enter, Escape)
// function addLstHandlersCase2(lst, txt_entry, code_entry, btn_add) {

//   lst.index = "-1";
//   lst.mode = "normal";
//   // When click on any item of the subject list
//   // store the id of the clicked item 
//   lst.addEventListener('click', function (e){
 
//     this.index = e.target.id;
    
//     let content = e.target.textContent;
//     txt_entry.value =  content.slice(content.indexOf('|')+2);

//     code_entry.value = e.target.id;
//     btn_add.textContent = "تعديل"
//     lst.mode = "update";


//   });

  
// // select the text when its being clicked
// txt_entry.addEventListener('click', ()=> {
//   selectAllTxt(txt_entry);

// });

// code_entry.addEventListener('click', ()=> {
//     selectAllTxt(code_entry);
// });

// when press Enter key on the input of a list item
// fires add button
// when press Enter key on the input of a list item
// fires add button
// txt_entry.addEventListener('keydown', function (e) {

//   if (e.key === 'Enter') {
    
//     btn_add.dispatchEvent(new Event('click'));
  
//   // escape the update mode on the list
//   }else if (e.key  === 'Escape')  {

//     resetAddBtnCase2(lst, txt_entry, code_entry, btn_add)
//   }
// });


  // Enable click on the scene list
// update the tab2 content based on the selected scene
function addSceneLstHandlers(){

  lst_scenes.index = "-1";
  lst_scenes.mode = "normal";


  lst_scenes.addEventListener('click', function(e) {

    if (lst_scenes.length <= 0) return;
    if (!e.target.classList.contains("buttons-in-list")) return;
    
    lst_scenes.index = e.target.id;

    if (e.detail == 2) {
      txt_sceneTitle_entry.value = e.target.textContent;
      btn_add_scene.textContent = "تعديل"
      lst_scenes.mode = "update";
    }else {
      resetAddBtn(lst_scenes, txt_sceneTitle_entry, btn_add_scene);
    }
  
    //  if (_courses.currentScene != e.target.id) {
      _courses.currentScene = lst_scenes.index;
      
     
      fillSceneSubjects(_courses.getSceneSubjects(_courses.currentScene));

      updateSceneView();
    // }
    
  });
  
  keyHandlers(lst_scenes, txt_sceneTitle_entry, btn_add_scene);
}

function keyHandlers(lst, txt_entry, btn_add){
      // select the text when its being clicked
      txt_entry.addEventListener('click', ()=> {
        selectAllTxt(txt_entry);
      });

      // when press Enter key on the input of a list item
      // fires add button
      txt_entry.addEventListener('keydown', function (e) {

          if (e.key === 'Enter') {

          btn_add.dispatchEvent(new Event('click'));

          // escape the update mode on the list
          }else if (e.key  === 'Escape')  {

          resetAddBtn(lst, txt_entry, btn_add);
          }

      });
}

// select all text in an input box
function selectAllTxt(txt) {
  if (txt.value.length)  
      txt.select();
}
// Reset the add button (switch from update mode)
function resetAddBtn(lst, txt,btn){

  
  lst.mode = "normal";
  txt.value = "";
  btn.textContent = "إضافة";
}

// Reset the add button (switch from update mode) for Skills/SceneType list
function resetAddBtnCase2(lst, txt1, txt2, btn) {
  resetAddBtn(lst, txt1, btn);
  txt2.value = "";
}

// change the text of an option in a list
function updateOptionText(lst, index, txt){

  let result = false;
  Array.from(lst.options).forEach((element) => {
    if (element.value == index) {
        element.text = txt;
        result = true;
    }
  });
  return result;
}
// change the value of an option in a list
function updateOptionValue(lst, index, txt){

  Array.from(lst.options).forEach((element) => {
    if (element.value == index) {
      element.value = txt;
    }
  });

}

// change the text  of an item in a list
function updateListItemText(lst, txt){
  
  document.querySelector(`#${lst.index||lst}`).textContent = txt.value || txt;
}

// change the value of an item in a list
function updateListItemId(lst, _id){
  document.querySelector(`#${lst.index}`).id = _id;
}



// Add click handlers for all small close buttons within the lists




// function clearSkillsLst() {
//   lst_skills.innerHTML = "";
// }


// function clearRdBtnTab2() {
//   document.querySelector("#id-Arbeitbook").checked = false;
//   document.querySelector("#id-kursbook").checked = false;
//   radiobtn_sendToTeacher.checked = false;
//   radiotbtn_sendToTeacherNot.checked = false;
// }



//#region  Fill lists Tab1 and Tab2

// // update a skill from all scenes
// function updateSkFromScenes(oldValue, newValueCode, newValueTxt) {

//   let result = [];
//   SceneHeaders.forEach( function(item) {

//         if (item.Skills.find( x => x.SkillID == oldValue)) {
//             item.Skills.find( x => x.SkillID == oldValue).SkillText = newValueTxt;  
//             item.Skills.find( x => x.SkillID == oldValue).SkillID = newValueCode;
//             item._changed = true;
//             result.push(item.sceneID);
//         }
      
//   });

//   return result;

// }

function lst_modules_tab2_setIndex(indx) {
  if (lst_modules_tab2.options.length > 0) {
    lst_modules_tab2.options[indx].selected = true;
    lst_modules_tab2.dispatchEvent(new Event("change"));
  }
}



//update a scene type from all scenes
// function updateSTFromScenes(oldValue, newValue){
  
//   let result = [];

//   SceneHeaders.forEach( function(item) {

//     if (item.sceneTypeID == oldValue) {
//         item.sceneTypeID = newValue;
//         item._changed = true;  
//         result.push(item.sceneID);
//     }
  
// });

// return result;

// }



// delete subject from all scenes
function deleteSubjFromScenes(fid, _indx){

  let result = [];
  SceneHeaders.forEach( function(item) {

      if (item.CourseID == fid) {
        if (item.Subjects.find(x=> x.subjectID == _indx)) {
          item._changed = true;
          result.push(item.sceneID);
        }
      }
  });

  if (result.length > 0) {
    SceneHeaders.find(
      (st) => st.CourseID == fid
    ).Subjects = SceneHeaders.find(
      (st) => st.CourseID == fid
    ).Subjects.filter(function (item) {
      return item.subjectID != _indx;
    });
  }


  
  return result;
  
}



// // delete a skill from all scenes
// function deleteSkillFromScenes(fid, _indx){

//   let result = [];
//   SceneHeaders.forEach( function(item) {

//       if (item.CourseID == fid) {
//         if (item.Skills.find(x=> x.SkillID == _indx)) {
//           result.push(item.sceneID);
//         }
//       }
//   });
// // }

// function fillLessonsTab2() {
//   // clear the previous session
//   clearLessonsTab2();

//   if (result.length > 0) {
//     SceneHeaders.find(
//       (st) => st.CourseID == fid
//     ).Skills = SceneHeaders.find(
//       (st) => st.CourseID == fid
//     ).Skills.filter(function (item) {
//       return item.SkillID != _indx;
//     });
//   }


  
//   return result;
  
// }

// Remove subjects from the scene_subjects list
function rmSubjFromSubjLst( itemValue ){
  
  let selectedItem = -1;
  Array.from(scene_subjects.options).forEach(function (item,index){
      if (item.value == itemValue)
          selectedItem = index;
  });

  if (selectedItem != -1)
      scene_subjects.options[selectedItem].remove();

  

}



function checkSceneHeaderChanges(){

  let result = [];

  SceneHeaders.forEach( function (item) {

    if ((item._deleted && item._new)) {

        ScenesArray = ScenesArray.filter((scene) => scene.id != item.sceneID);
        result.push(item.sceneID);
    }
    if (item._new || item._deleted) {
        item._changed = false;
    }

  });


  result.forEach( item => {
    SceneHeaders = SceneHeaders.filter( sH => sH.sceneID != item);
  });
  

}

// Check if the lesson with scenes or empty
function isDeleteLessonPossible(_id, _index){

  let condition1 = !(SceneHeaders.find(sh => sh.CourseID == _id && sh.LessonID == _index));
  let condition2 = !(Subjects.find(su => su.id == _id && su.LessonID == _index));

  return condition1 && condition2;
      
}

// Check if the module have lessons or empty
function isDeleteModulePossible(_id, _index){
  return !(Lessons.find(les => les.id == _id && les.ModuleID == _index));
}

// // Check if the skill being used by any scene
// function isDeleteSkillPossible( _index){

//       let result = null;

//       SceneHeaders.forEach( function (item) {

//         if (item.Skills.find( sk => sk.SkillID == _index)) {
//             result = item;
            
//         }
          
//       });
      
      
//       return (result != null)? false: true;
      
// }

// // Check if the scene type is being used by any scene
// function isDeleteSTypePossible(_index){

//   return !(SceneHeaders.find(sid => sid.sceneTypeID == _index));

// }

////#endregion



// Remove Subject (Button)
function lst_subjects_handler(id) {

  id = id.split('_')[1];

  if (isDeleteSubjectPossible(id)) {

    if (removeBtnFromLst(lst_subjects, id)) {

      // deleteSubjFromScenes(currentCourse.id, id);

      //remove it from scene subject list (tab 2)
      rmSubjFromSubjLst(id);
      
      removeOptionFromLst(lst_subjects_tab2, id)

      Subjects = removeItemFromArr(Subjects, 'subjectID', id);
  
      resetAddBtn(lst_subjects, txt_subject_entry, btn_add_subject);
 
      initAfterDel(lst_subjects, txt_subject_entry);
      // clearElementTxtarea();

      let firstSubjectId = activiateFirstBtn(Subjects);

      if (firstSubjectId) {
        let firstSub = document.getElementById(firstSubjectId);
        if (firstSub) {
          firstSub.focus();
          firstSub.click();
        }
      }

  }
  }else {
    showError("Can't delete subjects being used by scenes!");
  }
    
    
}


// Check if the subject being used by any scene
function isDeleteSubjectPossible(_index){

  let result = null;

  SceneHeaders.forEach( function (item) {

    if (item.Subjects.find( sub => sub.subjectID == _index)) {
        result = item;
        
    }
      
  });
  
  
  return (result == null)? true: false;
}



// to Add a new course 
// Add new Course (Button)
btn_addNewCourse.addEventListener('click', ()=> {



        //validation
        if (chkNewCourseValidation()){

          let newCourse = new Course();

          newCourse.CourseTitle = courseTitle_entry.value;
        
          newCourse.Lang = courseLang_entry.value;
          newCourse.Level = courseLevel_entry.value;
          newCourse.id = getCourseID();
          newCourse.Category = 0;

          if (_courses.validate(newCourse.id)) {
            _courses.addNewCourse(newCourse);
         
  
            addNewItemsTab2(newCourse.CourseTitle,newCourse.id,courseCombo,true);
            courseCombo.options[courseCombo.length-1].selected = true;
            
            clearNewCourseTxtValues();
            show_addNewBtn.dispatchEvent(new Event('click'));
            courseCombo.dispatchEvent(new Event('change'));
  
            showSuccess('add new course' + entry_newCourseTxt.value);

          }else {
            showError('The course is already exist!!');
          }
          
          
        }
        


  
});



function chkNewCourseValidation(){
  if (courseTitle_entry.value.length == 0) {
    showError("Please enter the course title!");
    return false;
  }
  if (courseLevel_entry.value.length == 0){
    showError("Please enter the course level!");
    return false;
  }
  if(courseLang_entry.value.length == 0){
    showError("Please enter the course langauge!")
    return false;
  }
  return true;
}
function clearNewCourseTxtValues(){
  courseTitle_entry.value = "";
  courseLang_entry.value = "";
  courseLevel_entry.value = "";
}
function getCourseID(){

    let course_id = "";

    switch (courseLang_entry.value) {
      case 'العربية' :
      case 'اللغة العربية' :
      case 'عربي' :
      case 'العربي': 
            course_id = "Arabic";
            break;
      case "english":
      case 'English':
            course_id = "English";
            break;

      default: course_id = "Unkown";

      
    }

    let lvl = courseLevel_entry.value.removeChar('.');

    lvl = courseTitle_entry.value.length + lvl;
    course_id += lvl;

    return course_id;
}

String.prototype.removeChar = function (i) {
  return this.split(i).join('');
  
  
}

show_addNewBtn.addEventListener('click', (e)=> {

  if (container_addNewBtn.style.display != "block" && container_addNewBtn.style.display != "none")
      container_addNewBtn.style.display = "none";

  if (container_addNewBtn.style.display == "none") {
      container_addNewBtn.style.display = "block";
  }
  else {
      container_addNewBtn.style.display = "none";
  }
    
  

  e.stopPropagation();
});


// Add Subject (Button)
btn_add_subject.addEventListener("click", () => {
   
  // check if the entry text isn't empty and if the entered subject isn't already exist
  if (checkValidation(txt_subject_entry.value, lst_subjects)) {
    
    
    if (lst_subjects.mode == "normal") {

      // generate a new id for the subject (based on the course id)
      let id_sub_key = get_id(Subjects, 'subjectID', 'J');

      
      // store the subject locally
      Subjects.push(
        new Subject(_courses.currentCourse, id_sub_key, txt_subject_entry.value, lst_lessons.index)
      );
      
    
      // add the new subject into the subjects list in tab 1
      addNewItems(txt_subject_entry.value, id_sub_key, lst_subjects, true);
      lst_subjects.index = id_sub_key;

      // add the new subject into the subjects list in tab 2
      addNewItemsTab2(txt_subject_entry.value, id_sub_key, lst_subjects_tab2, true);
      document.getElementById(id_sub_key)?.focus();
      document.getElementById(id_sub_key)?.click();
      
    }
    // mode is update
    else {


      // update the subject text locally
      Subjects.find(sub => sub.subjectID == lst_subjects.index).subjectText = txt_subject_entry.value;

      // update list item text 
      updateListItemText(lst_subjects, txt_subject_entry.value);

      
      // find if its being used by any scenes
      //let scenesHaveIt = updateConFromScenes(lst_subjects.index, txt_subject_entry.value, txt_skill_entry.value);

      //if (scenesHaveIt.length > 0) {
      
      updateOptionText(scene_subjects,lst_subjects.index, txt_subject_entry.value);
      //}

  
      // update subjects text tab2
      updateOptionText(lst_subjects_tab2,lst_subjects.index,txt_subject_entry.value);
      
      
      // Back to normal mode
      resetAddBtn(lst_subjects,txt_subject_entry,btn_add_subject);


    }
    
    // clear the subject input box (used to enter the subject text)
    document.getElementById("txt_subject").value = "";

    // make the subject input box focused
    txt_subject_entry.focus();

    // the selected subject of the subjects list is empty now.
    // lst_subjects.index = "-1";
  }

 

});

 


function activiateFirstBtn(arrObj) {

  if (arrObj?.length <= 0) return;

  let firstId = arrObj.find(element => element.id == _courses.currentCourse);
  if (firstId) {
    let requiredId =  firstId.subjectID || firstId.LessonID || firstId.ModuleID;
    return requiredId;
  }
  
  return "";

}

// Add Module (Button)
btn_add_module.addEventListener("click", () => {

  
  // check if the entry text isn't empty and if the entered module isn't already exist
  if (checkValidation(txt_module_entry.value, lst_modules)) {

    if (lst_modules.mode == "normal") {

      // generate a new id for the module (based on the course id)
      let id_mod_key = get_id(Modules, 'ModuleID', 'M');
    
      // store the module locally
      Modules.push(new Module(_courses.currentCourse, id_mod_key, txt_module_entry.value));

      // Add a new record of Modules
      //toAdd.push(new CRUD_Op(currentCourse.id, id_mod_key, addModule));

      // add the new module into the modules list in tab 1
      addNewItems(txt_module_entry.value, id_mod_key, lst_modules, true);

      // add the new module into the modules list in tab 2
      addNewItemsTab2(txt_module_entry.value, id_mod_key, lst_modules_tab2, true);

      lst_modules.index = id_mod_key;
      document.getElementById(id_mod_key)?.focus();
      document.getElementById(id_mod_key)?.click();

    }
    // mode is update
    else {

      // update the module text locally
      Modules.find(mod => mod.ModuleID == lst_modules.index).ModuleTitle = txt_module_entry.value;

      // update list item text 
      updateListItemText(lst_modules, txt_module_entry.value);

    
      // Update the option text in Tab2 
      updateOptionText(lst_modules_tab2,lst_modules.index, txt_module_entry.value);
            
      // Back to normal mode
      resetAddBtn(lst_modules,txt_module_entry,btn_add_module);

    }

    // clear the module input box (used to enter the module text)
    document.getElementById("txt_module").value = "";
    
    // make the module input box focused
    txt_module_entry.focus();

    // the selected module of the modules list is empty now.
    // lst_modules.index = "-1";
  }

  

});


function lst_modules_handler(id) {

  id = id.split('_')[1];
  // Check if there are no lessons within the Module
  if (isDeleteModulePossible(_courses.currentCourse, id)) {


    if (removeBtnFromLst(lst_modules, id)) {


      removeOptionFromLst(lst_modules_tab2, id);

      Modules = removeItemFromArr(Modules, 'ModuleID', id);

      resetAddBtn(lst_modules, txt_module_entry, btn_add_module);

      initAfterDel(lst_modules, txt_module_entry);

      let firstModuleId = activiateFirstBtn(Modules);
      if (firstModuleId) {
        let firstMod = document.getElementById(firstModuleId);
        if (firstMod) {
          firstMod.focus();
          firstMod.click();
        }
      }
      
    }

  }

  else {
    showError("Can't delete modules have lessons within it!");
  }

}
// Remove Lesson (Button)
function lst_lessons_handler(id) {

  id = id.split('_')[1];

  // Check if there are no scenes within the lesson
  if (isDeleteLessonPossible(_courses.currentCourse, id)) {

              
    // Check if its possible to delete a lesson
  if (removeBtnFromLst(lst_lessons, id)) {
      

      removeOptionFromLst(lst_lessons_tab2, id)
    
      Lessons = removeItemFromArr(Lessons, 'LessonID', id);

      resetAddBtn(lst_lessons, txt_lesson_entry, btn_add_lesson);

      initAfterDel(lst_lessons, txt_lesson_entry);


      let firstLessonId = activiateFirstBtn(Lessons);
      if (firstLessonId) {
        let firstLes = document.getElementById(firstLessonId);
        if (firstLes) {
          firstLes.focus();
          firstLes.click();
        }
      }

    }
  }
  else 
  {
  showError("Can't delete lessons have scenes or subjects within it!")
  }

}
  
  
    
        
          

       



// Add Lesson (Button)
btn_add_lesson.addEventListener("click", () => {

  if (checkValidation(txt_lesson_entry.value, lst_lessons)) {
    
    if (lst_lessons.mode == "normal"){

    // Add a lesson without connected it with a module isn't possible
    if (lst_modules.index  == "-1"){
        showError('Please choose a module first');
        return;
     }
    // generate a new id for the lesson (based on the course id)
    let id_less_key = get_id(Lessons, 'LessonID', 'L');
    
    // store the lesson locally 
    Lessons.push(new Lesson(_courses.currentCourse, id_less_key, txt_lesson_entry.value, lst_modules.index));

    
    addNewItems(txt_lesson_entry.value, id_less_key, lst_lessons, true).focus();

    // Add to tab2 only if the current module is displayed
    if (Modules.find(md=> md.id == _courses.currentCourse).ModuleID == lst_modules.index )
        addNewItemsTab2(txt_lesson_entry.value, id_less_key, lst_lessons_tab2, true);


        lst_modules.index = id_less_key;
        document.getElementById(id_less_key)?.focus();
        document.getElementById(id_less_key)?.click();
  
  }
  // mode is update
  else {

    // update the lesson text locally
    Lessons.find(les => les.LessonID == lst_lessons.index).LessonTitle = txt_lesson_entry.value;

    // update list item text Tab1
    updateListItemText(lst_lessons, txt_lesson_entry.value);

    
    // Update the option text in Tab2
    updateOptionText(lst_lessons_tab2,lst_lessons.index, txt_lesson_entry.value);
    
    
    // Back to normal mode
    resetAddBtn(lst_lessons,txt_lesson_entry.value,btn_add_lesson);

  }

  document.getElementById("txt_lesson").value = "";

  // make the lesson input box focused
  txt_lesson_entry.focus();

  // the selected lesson of the lessons list is empty now.
  // lst_lessons.index = "-1";
  }

});


// // Remove Skill (Button)
// btn_remove_skill.addEventListener("click", () => {
  
//   if (lst_skills.index != "-1") {


//       // Check if there are no scenes refer to the skill
//       if (isDeleteSkillPossible(lst_skills.index)){

//         if (removeBtnFromLst(lst_skills)) {
      
           
//             //remove it from scene skills list (tab 2)
            
        
//             // removeOptionFromLst(lst_elementsSkills_tab3, lst_skills.index)
            
//             Skills = removeItemFromArr(Skills, 'SkillID', lst_skills.index);
      
//             resetAddBtnCase2(lst_skills, txt_skill_entry, txt_skill_code_entry, btn_add_skill);
      
//             initAfterDelCase2(lst_skills, txt_skill_entry, txt_skill_code_entry);
      
//       }

//       }else {
//         showError("Skill can't be deleted, while a scene refers to it!")
//       }

// //}

//   }

// });

// // Add Skill (Button)
// btn_add_skill.addEventListener("click", () => {
 
//   // if non empty nor digit entries
//   if (
//     txt_skill_entry.value != 0 &&
//     txt_skill_code_entry.value != 0 &&
//     !txt_skill_code_entry.value.match(/^\d/)
//   ) {

//     if (!Skills.find((sk) => sk.SkillID == txt_skill_code_entry.value)) {

//     if (lst_skills.mode == "normal") {

      

//         Skills.push(
//           new Skill(txt_skill_code_entry.value, txt_skill_code_entry.value, txt_skill_entry.value)
//         );
        
        
//         const txt = `(${txt_skill_code_entry.value}) | ${txt_skill_entry.value}`;
         
//         addNewItems(txt, txt_skill_code_entry.value, lst_skills, true).focus();
//         // addNewItemsTab2(txt_skill_entry.value, txt_skill_code_entry.value, lst_elementsSkills_tab3, true);
        

      
      

//     }
//     // update mode
//     else {
      
//       // update the skill text locally
//       Skills.find(sk => sk.SkillID == lst_skills.index).SkillText = txt_skill_entry.value;
//       Skills.find(sk => sk.SkillID == lst_skills.index).SkillID = txt_skill_code_entry.value;
      
//       const txt = `(${txt_skill_code_entry.value}) | ${txt_skill_entry.value}`;
    
//       // update list item text 
//       updateListItemText(lst_skills, txt);
//       updateListItemId(lst_skills, txt_skill_code_entry.value);

      
//       // // find if its being used by any scenes
//       // let scenesHaveIt = updateSkFromScenes(lst_skills.index, txt_skill_code_entry.value, txt_skill_entry.value);

//       // if (scenesHaveIt.length > 0) {
      
       

//       //   updateOptionText(scene_skills,lst_skills.index, txt_skill_entry.value);
//       // }

      

//       // Update the option text in Tab2 skill & Scene skills if there are any
//       // updateOptionText(lst_elementsSkills_tab3,lst_skills.index, txt_skill_entry.value);
//       // updateOptionValue(lst_elementsSkills_tab3, lst_skills.index, txt_skill_code_entry.value);


//       // Back to normal mode
//       resetAddBtnCase2(lst_skills,txt_skill_entry,txt_skill_code_entry, btn_add_skill);


//     }
//   //
//     }else {
//       showError("The Code is already used!");
//     }
//     document.getElementById("txt_skill").value = "";
//     document.getElementById("txt_skill_code").value = "";
//     lst_skills.index = "-1";
//   }
 
// });


// Remove SceneType (Button)
// btn_remove_sceneType.addEventListener("click", () => {

//   if (lst_sceneTypes.index != "-1") {


//       if (isDeleteSTypePossible(lst_sceneTypes.index)){

//         if (removeBtnFromLst(lst_sceneTypes)) {

       
        
//         // remove it from scene type list 
        
      
//           removeOptionFromLst(lst_sceneTypes_tab2, lst_sceneTypes.index)
          
//           SceneTypes = removeItemFromArr(SceneTypes, 'SceneTypeID', lst_sceneTypes.index);
  
//           resetAddBtnCase2(lst_sceneTypes, txt_sceneType_entry, txt_sceneType_code, btn_add_sceneType);
  
//           initAfterDelCase2(lst_sceneTypes, txt_sceneType_entry, txt_sceneType_code);
  
      
  
//       }

//       }
//       else {
//         showError("Scene Type can't be deleted, while a scene refers to it!")
//       }

//    // }
    
    
//   }
// });

// Add SceneType (Button)
// btn_add_sceneType.addEventListener("click", () => {

//   // if non empty nor digit entries
//   if (
//     txt_sceneType_entry.value != 0 &&
//     txt_sceneType_code.value != 0 &&
//     !txt_sceneType_code.value.match(/^\d/)
//   ) {

//     if (
//       !SceneTypes.find((st) => st.SceneTypeID == txt_sceneType_code.value)
//     ) {

//     if (lst_sceneTypes.mode == "normal") {

     
//         SceneTypes.push(
//           new SceneType(
//             txt_sceneType_code.value,
//             txt_sceneType_code.value,
//             txt_sceneType_entry.value
//           )
//         );
            

//         const txt = `(${txt_sceneType_code.value}) | ${txt_sceneType_entry.value}`;
//         addNewItems(txt, txt_sceneType_code.value, lst_sceneTypes, true).focus();
//         addNewItemsTab2(
//           txt_sceneType_entry.value,
//           txt_sceneType_code.value,
//           lst_sceneTypes_tab2,
//           true
//         );
        
      

//     // update mode
//     }else {

//       // update the sceneType text locally

//       SceneTypes.find(sty => sty.SceneTypeID == lst_sceneTypes.index).SceneTypeDesc = txt_sceneType_entry.value;
//       SceneTypes.find(sty => sty.SceneTypeID == lst_sceneTypes.index).SceneTypeID = txt_sceneType_code.value;
      
//       const txt = `(${txt_sceneType_code.value}) | ${txt_sceneType_entry.value}`;
    
//       // update list item text 
//       updateListItemText(lst_sceneTypes, txt);
//       updateListItemId(lst_sceneTypes, txt_sceneType_code.value);

//       updateSTFromScenes(lst_sceneTypes.index, txt_sceneType_code.value);
      
     
//       // Update the option text in Tab2 
//       updateOptionText(lst_sceneTypes_tab2,lst_sceneTypes.index, txt_sceneType_entry.value);
//       updateOptionValue(lst_sceneTypes_tab2, lst_sceneTypes.index, txt_sceneType_code.value);

//       // Back to normal mode
//       resetAddBtnCase2(lst_sceneTypes,txt_sceneType_entry,txt_sceneType_code, btn_add_sceneType);


//     }

//     } else {
//       showError("The Code is already used!");
//     }

//     document.getElementById("txt_sceneType").value = "";
//     document.getElementById("txt_sceneType_code").value = "";
//     lst_sceneTypes.index = "-1";
//   }
  
// });


// Remove Scene (Button)
function lst_scenes_handler(id){

    id = id.split('_')[1];

    // TODO : Check if its possible to delete a Scene and the scene header
    if (removeBtnFromLst(lst_scenes, id)) {
      

      SceneHeaders.find((sc) => sc.sceneID == id)._deleted = true;
      //SceneHeaders = removeItemFromArr(SceneHeaders, 'sceneID', lst_scenes.index);
      //ScenesArray=removeItemFromArr(ScenesArray,"",lst_scenes.index)

      checkSceneHeaderChanges();
      
      // TODO: Remove the scene from scene array objects
      resetAddBtn(lst_scenes, txt_sceneTitle_entry, btn_add_scene);

      initAfterDel(lst_scenes, txt_sceneTitle_entry);

    }

    _courses.currentScene = "";
    
    let firstSceneId = _courses.getFirstScene(_courses.currentLesson);
    
    if (firstSceneId) {
      let firstSc = document.getElementById(firstSceneId);
      if (firstSc) {
        firstSc.focus();
        firstSc.click();
      }
    }

}





// Add Scene (Button)
btn_add_scene.addEventListener("click", () => {
  
  //if (txt_sceneTitle_entry.value.length != 0) {
    if (checkValidation(txt_sceneTitle_entry.value, lst_scenes)) {
        
    if (lst_scenes.mode == "normal") {

    
    // Add a scene without connected it with a module and a lesson isn't possible
    if (getLessonValue() == null || getModuleValue() == null) {
      showError("No Lesson or Module selected!");
      return;
    }

    // generate a new id for the scene based on the course id and the lesson id
    let id_scene = get_sceneId();

    //TODO Change this
    let lessonNo = _courses.currentLesson.substring(_courses.currentLesson.indexOf('L'));
    let id_scene_key = _courses.currentCourse + lessonNo + "S" + id_scene;
    

    // Assign the current scene id
    _courses.currentScene = id_scene_key;
    // let _id = _courses.currentCourse + lessonNo + "S" + id_scene;

    // store the scene header locally
    SceneHeaders.push(
      new SceneHeader(
        id_scene_key,
        _courses.currentCourse,
        id_scene_key,
        _courses.currentModule,
        _courses.currentLesson,
        txt_sceneTitle_entry.value,
        "",
        lessonNo + id_scene,
        "",
        "",
        "",
        true
      )
    );
    
    // Add new record of a scene header
    ScenesArray.push(createEmptyScene(id_scene_key));


   
    addNewItems(txt_sceneTitle_entry.value, id_scene_key, lst_scenes, true);
    document.getElementById(id_scene_key)?.focus();
    document.getElementById(id_scene_key)?.click();


        
    updateSceneView();

    // radiotbtn_sendToTeacherNot.checked = true;
    // radiotbtn_sendToTeacherNot.dispatchEvent( new Event('change'));
    // radiobtn_kursBuch.checked = true;
    // radiobtn_kursBuch.dispatchEvent(new Event('change'));
    // lst_sceneTypes_tab2.selectedIndex = 0;
    // lst_sceneTypes_tab2.dispatchEvent(new Event('change'));

    }
    // Update mode
    else {
      
      // update the scene text locally
      SceneHeaders.find(sH => sH.sceneID == _courses.currentScene).sceneTitle = txt_sceneTitle_entry.value;
      SceneHeaders.find((st) => st.sceneID == _courses.currentScene)._changed = true;


      // update list item text Tab1
      updateListItemText(_courses.currentScene, txt_sceneTitle_entry.value);
      // Back to normal mode
      resetAddBtn(lst_scenes,txt_sceneTitle_entry,btn_add_scene);
    }
 
  }

});



// Add Subject to a scene
add_subj_scene.addEventListener("click", () => {
  if (_courses.currentScene == "" || _courses.currentScene == undefined || _courses.currentScene == null) {
    showError("You have first to select/create a scene!");
    return;

    }

  if (lst_subjects_tab2.selectedIndex != -1) {

    let subID =
      lst_subjects_tab2.options[lst_subjects_tab2.selectedIndex].value;

      if (SceneHeaders.find((st) => st.sceneID == _courses.currentScene)?.Subjects.find((sId) => sId.subjectID == subID) == undefined){

      
        // if ( SceneHeaders.find((st) => st.sceneID == _courses.currentScene).Subjects.length == 0 ) {
          let subTxt =
            lst_subjects_tab2.options[lst_subjects_tab2.selectedIndex].text;

          addNewItemsTab2(subTxt, subID, scene_subjects, true);

          const subObj = {
            
              subjectID : subID
            
          };
          SceneHeaders.find((st) => st.sceneID == _courses.currentScene).Subjects.push(
            subObj
          );

          
          // let Subjx =  SceneHeaders.find( value => value.sceneID == currentScene).Subjects;
          // fillSceneElementsType(Subjx, lst_elementsType_tab3);
          // fillSceneElements(Subjx);
          // lst_elementsType_tab3.dispatchEvent(new Event('change'));

          SceneHeaders.find((st) => st.sceneID == _courses.currentScene)._changed = true;
        
      }else {
        showError("The subject is already exist!")
      }
  }
});

// remove subject from a scene
remove_subj_scene.addEventListener("click", () => {
  if (scene_subjects.length <=0 ) return;

  if (scene_subjects.selectedIndex != -1) {
    
    const subID = scene_subjects.options[scene_subjects.selectedIndex].value;
    
    rmSubjFromSubjLst(subID);

    SceneHeaders.find(
      (st) => st.sceneID == _courses.currentScene
    ).Subjects = SceneHeaders.find(
      (st) => st.sceneID == _courses.currentScene
    ).Subjects.filter(function (item) {
      return item.subjectID != subID;
    });

    // clearSceneElementsLst();
    
    // let Subjx = SceneHeaders.find( value => value.sceneID == currentScene).Subjects;
    // fillSceneElementsType(Subjx, lst_elementsType_tab3);
    // fillSceneElements(Subjx);
    // lst_elementsType_tab3.dispatchEvent(new Event('change'));

    SceneHeaders.find((st) => st.sceneID ==  _courses.currentScene)._changed = true;
  }
});

// // Add Skill to a scene
// add_skill_scene.addEventListener("click", () => {
//   if (currentScene == undefined || currentScene == null) return;

//   if (lst_elementsSkills_tab3.selectedIndex != -1) {
//     let skID = lst_elementsSkills_tab3.options[lst_elementsSkills_tab3.selectedIndex].value;

//     if (
//       SceneHeaders.find((st) => st.sceneID == currentScene).Skills.length ==
//         0 ||
//       SceneHeaders.find((st) => st.sceneID == currentScene).Skills.find(
//         (coId) => coId.SkillID == skID
//       ) == undefined
//     ) {
//       let skTxt = lst_elementsSkills_tab3.options[lst_elementsSkills_tab3.selectedIndex].text;
//       addNewItemsTab2(skTxt, skID, scene_skills, false);

//       SceneHeaders.find((st) => st.sceneID == currentScene).Skills.push(
//         new Skill(currentCourse.id, skID, skTxt)
//       );
     
//       SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
//     }
//   }
// });

// // remove skill from a scene
// remove_skill_scene.addEventListener("click", () => {
//   if (scene_skills.selectedIndex != -1) {
//     const skID = scene_skills.options[scene_skills.selectedIndex].value;
//     scene_skills.options[scene_skills.selectedIndex].remove();

//     SceneHeaders.find(
//       (st) => st.sceneID == currentScene
//     ).Skills = SceneHeaders.find(
//       (st) => st.sceneID == currentScene
//     ).Skills.filter(function (item) {
//       return item.SkillID != skID;
//     });

//     SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
    
    
//   }
// });




function splitLines (st) {

  return st.split(/\r?\n|\r/g);
}


//update the elements
function updateElements (val, type){

  if (lst_subjects.index != undefined && lst_subjects.index != "-1"){

      // find the selected subject object
      let subj = _courses.getSubject(lst_subjects.index);
        
      createElements(subj, val, type);
      
  }
  else {

   showError('You must at first select a subject! ');

  }

}

txt_keywords.addEventListener("blur", ()=> {

  updateElements(txt_keywords.value, LingElementType.KeyWords);

});

txt_structure.addEventListener("blur", () => {

  updateElements(txt_structure.value, LingElementType.Structure);

});

txt_vocals.addEventListener("blur", () => {

  updateElements(txt_vocals.value, LingElementType.Vocals);

});

txt_grammer.addEventListener("blur", () => {

  updateElements(txt_grammer.value, LingElementType.Grammer);

});


// Choose Scene type for the current scene
// lst_sceneTypes_tab2.addEventListener("change", (e) => {

//   if (currentScene == undefined || currentScene == null) return;

//   if (lst_sceneTypes_tab2.selectedIndex != -1) {
//     SceneHeaders.find((st) => st.sceneID == currentScene).sceneTypeID =
//       e.target.value;

    
//     SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;

//   }
// });


//#region scene radio buttons
// Listener for send to teacher
//
// radiotbtn_sendToTeacherNot.addEventListener("change", () => {
//   if (currentScene != undefined && currentScene != null) {
//     SceneHeaders.find((sid) => sid.sceneID == currentScene).sendToTeacher = 0;
   
//     SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
//   }
// });

// radiobtn_sendToTeacher.addEventListener("change", () => {
//   if (currentScene != undefined && currentScene != null) {

//     SceneHeaders.find((sid) => sid.sceneID == currentScene).sendToTeacher = 1;
    
//     SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
//   }
// });


// Listener for book type
//
// radiobtn_arbeitsBuch.addEventListener("change", () => {
//   if (currentScene != undefined && currentScene != null) {
//     SceneHeaders.find((sid) => sid.sceneID == currentScene).BookType =
//       "Workbook";
      
//       SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
//   }
// });

// radiobtn_kursBuch.addEventListener("change", () => {
//   if (currentScene != undefined && currentScene != null) {
//     SceneHeaders.find((sid) => sid.sceneID == currentScene).BookType = "Course";
    
//     SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
//   }
// });


///// Listener for Scene Description

textbox_scene_desc.addEventListener("blur", (e) => {
  if (_courses.currentScene != undefined && _courses.currentScene != null) {
    SceneHeaders.find((st) => st.sceneID == _courses.currentScene).sceneDesc =
      e.target.value;
    SceneHeaders.find((st) => st.sceneID == _courses.currentScene)._changed = true;
    

  }
});



function createElements(sub, values, lingType) {

      let Arr = splitLines(values).filter(item => item.length > 0);
 
      sub.elements.filter(x => x.elementType == lingType).forEach( function (elem) {
          
        let indx = Arr.findIndex( x => x == elem.elementText);
        
        
        if (indx == -1)
            {
              elem.id = "-1";
            }
            else {
              Arr[indx] = -1;
            }
      });
      
      sub.elements = sub.elements.filter(x => x.id != "-1" );
      Arr = Arr.filter(x => x != -1);
      

      Arr.forEach(function (elementTxt) {
        if ( sub.elements.findIndex(x => x.elementTxt == elementTxt && x.elementType == lingType) == -1) {
             sub.elements.push(new LingElement(get_element_id(sub), sub.subjectID, elementTxt, lingType));
        }
      });

      

}

//#endregion


// remove a button (item) from the list 
// return false if there was not found otherwise true
function removeBtnFromLst(lst, id){

  const removed = document.getElementById(`${id}`).parentNode;

  if (removed != undefined){
    
      lst.removeChild(removed);
      return true;

  }else {
    return false;
  }
}

// remove an option from a list (tab2 combobox)
function removeOptionFromLst(lst, elem){
  Array.from(lst.options).forEach((element) => {
    if (element.value == elem) {
      element.remove();
    }
  });
}

// Remove an item from a local array of objects which represent the classes being used
function removeItemFromArr(Arr, _id, elem){
  
  return Arr.filter(function (item) {
    return item[_id] != elem;
  });
  


}

// re-init the values after delete an item frm a list
function initAfterDel(lst, elem){
  
  lst.index = "-1";
  elem.value = "";
  
  // const firstChild = lst.firstChild;
  // if (firstChild != undefined) firstChild.focus();

}


// re-init the values after delete an item from a list (skills/sceneTypes)
function initAfterDelCase2(lst, elem1, elem2){
  
  initAfterDel(lst,elem1);
  elem2.value = "";
  
}

// The text entry field must not be empty
// The entried text must be unique (no duplicate entries on the list are allowed)
function checkValidation(txtEntry, lst) {

  if (txtEntry.length == 0) return false;

  if (lst.children != undefined) {

    for (let i = 0; i < lst.children.length; i++) {

      if (lst.children[i].textContent == txtEntry) {

          showError (` ${txtEntry} is already exist!`);

          return false;

      }      
    }
  }

  return true;
}



// Get automated generated id based on a the course id
// Where the id increased sequentially. based on the last store id value.
function get_id(obj, _objID, char) {

  let id_obj = 1;
  let cCourse = _courses.currentCourse;
  if (obj.filter(function (item) {
    return item.id == cCourse;
  }).length > 0) {
    id_obj =
      Math.max.apply(
        Math,
        obj.filter(function (item) {
          return item.id == cCourse;
        }).map(function (objId) {
          return objId[_objID].substring(
            objId[_objID].indexOf(char) + 1,
            objId[_objID].length
          );
        })
      ) + 1;
  }

  let id_obj_key = cCourse + char + id_obj;

  return id_obj_key;
}

function get_element_id(sub) {

  let id_obj = 1;

  if (sub.elements.filter(function (item) {
    return item.subjID == sub.subjectID;
  }).length > 0) {
    id_obj =
      Math.max.apply(
        Math,
        sub.elements.filter(function (item) {
          return  item.subjID == sub.subjectID;
        }).map(function (objId) {
          return objId['id'].substring(
            objId['id'].indexOf('E') + 1,
            objId['id'].length
          );
        })
      ) + 1;
  }

  let id_obj_key = sub.subjectID + 'E' + id_obj;

  return id_obj_key;


}

function get_sceneId(){
  let id_scene = 1;
  
    if (
      SceneHeaders.filter(function (item) {
        return item.CourseID == _courses.currentCourse && item.LessonID == _courses.currentLesson;
      }).length > 0
    ) {
      id_scene =
        Math.max.apply(
          Math,
          SceneHeaders.filter(function (item) {
            return item.CourseID == _courses.currentCourse && item.LessonID == _courses.currentLesson;
          }).map(function (scene) {
            return scene.sceneID.substring(
              scene.sceneID.indexOf("S") + 1,
              scene.sceneID.length
            );
          })
        ) + 1;
    }

    return id_scene;
}

// Add new item to the list (includes subjects, modules, lessons, skills, scene types)
function addNewItems(txt, id_c, lst_type, added) {
  
 

  const container = document.createElement("div");
  container.className = "buttons-wrapper";

  const button_list = document.createElement("button");
  button_list.type = "button";
  button_list.className = "buttons-in-list";
  button_list.id = id_c;

  const button_list_text = document.createTextNode(txt);
  button_list.appendChild(button_list_text);

  const close_button = document.createElement("button");
  close_button.type = "button";
  close_button.className = "small-close";
  close_button.id = "c_" + id_c;
  button_list.appendChild(close_button);

  close_button.addEventListener('click', function (e) {
    e.preventDefault(); 
    e.stopImmediatePropagation();
     lst_type.handler(e.target.id);
    }
  );

  

  container.appendChild(button_list);
  container.appendChild(close_button);

  (added)? lst_type.appendChild(container) : lst_type.prepend(container);
    
  return container;
}

// Add new items to select (Combobox) - includes Modules, lessons....
function addNewItemsTab2(txt, id_c, lst_type, added) {

  const newOption = document.createElement("option");
  const optionText = document.createTextNode(txt);
  // set option text
  newOption.appendChild(optionText);
  // and option value
  newOption.setAttribute("value", id_c);
  // add the option to the select box
  (added)? lst_type.appendChild(newOption): lst_type.prepend(newOption);
  
}


////////////////////////
//#region Clear lists


function clearSubjectsLst() {
  removeAllChildNodes(lst_subjects);
  // clearSubjectsTab2();
  // clearSceneElementsLst();
}


function clearSceneElementsLst() {
  // removeAllChildNodes(lst_elementsType_tab3);
  // removeAllChildNodes(lst_elements_tab3);
}

function clearSkillsLst() {
  
  removeAllChildNodes(lst_skills);
  // removeAllChildNodes(lst_elementsSkills_tab3);
  //clearSceneSkillsLst();
}

// function clearSceneSkillsLst() {
//   removeAllChildNodes(scene_skills);
// }

// function clearSceneTypesTab2() {
//   removeAllChildNodes(lst_sceneTypes_tab2);
// }

function clearModulesLst() {
  removeAllChildNodes(lst_modules);
  removeAllChildNodes(lst_modules_tab2)
}

function clearLessonsLst() {
  removeAllChildNodes(lst_lessons);
  clearLessonsTab2();
}

function clearLessonsTab2() {
  removeAllChildNodes(lst_lessons_tab2);
}

function clearScenesLst() {
  
  // Clear the scenes list
  removeAllChildNodes(lst_scenes);
  
  // Clear the scene description
  textbox_scene_desc.value = "";
  
  removeAllChildNodes(scene_subjects);
  //clearSceneSkillsLst();

  _courses.currentScene = "";
}

// function clearSceneTypes() {
//   removeAllChildNodes(lst_sceneTypes);
//   // clearSceneTypesTab2();
// }

// function clearRdBtnTab2() {
//   document.querySelector("#id-Arbeitbook").checked = false;
//   document.querySelector("#id-kursbook").checked = false;
//   radiobtn_sendToTeacher.checked = false;
//   radiotbtn_sendToTeacherNot.checked = false;
// }

function removeAllChildNodes(parent) {

  if (parent.firstChild) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
  }
  
  
}

//#endregion
////////////////////////


//#region  Fill lists Tab1 and Tab2

// Skills Tab1
function fillSkills(sk) {
  
  // clear the previous session
  clearSkillsLst();
 
  if (sk.length != 0) {
    sk.forEach((element) => {

      const skill_item = document.createElement("button");
      skill_item.type = "button";
      skill_item.className = "buttons-in-list";
      skill_item.id = element.SkillID;
    
      const skill_item_text = document.createTextNode(element.SkillText);
      skill_item.appendChild(skill_item_text);
    
      lst_skills.appendChild(skill_item)
              

    });
    
    
    // fillSceneSkills(sk, lst_elementsSkills_tab3);
    
    // lst_elementsSkills_tab3_setIndex(0);

  }

}

// Subjects Tab1
function fillSubjectsTab1() {

  // Clear the previous session
  removeAllChildNodes(lst_subjects);
  resetAddBtn(lst_subjects, txt_subject_entry, btn_add_subject);
  clearElementTxtarea();
  
  let sub = _courses.getSubjects(lst_lessons.index);

  if (sub?.length != 0) {
      sub.forEach((element) => {
     
      addNewItems(
        element.subjectText,
        element.subjectID,
        lst_subjects,
        true
      );
    });
    
  }
  
  lst_subjects.index = "-1";
  document.getElementById(_courses.getFirstSubject(lst_lessons.index))?.click();
}
function fillSubjects(sub) {

  // Clear the previous session
  clearSubjectsLst();
    
  if (sub?.length != 0) {
      sub.forEach((element) => {
     
      addNewItems(
        element.subjectText,
        element.subjectID,
        lst_subjects,
        true
      );
    });
    
  }
  
  lst_subjects.index = "-1";
}

// Subjects Tab2 (combobox and listbox)
function fillSubjectsTab2(sub, lst_type) {

  removeAllChildNodes(lst_type);

  if (sub) {
    if (sub.length != 0) {
      sub.forEach((element) => {
        
      addNewItemsTab2(element.subjectText, element.subjectID, lst_type , true);
   });
  }
  }
  
}

function clearSubjectsTab2(){
  removeAllChildNodes(lst_subjects_tab2);
  removeAllChildNodes(scene_subjects);




}
function fillSceneSubjects(sub){

  removeAllChildNodes(scene_subjects);

  if (sub) {
     if (sub.length != 0) {
        sub.forEach((element) => {
        addNewItemsTab2(Subjects.find(sId => sId.subjectID == element.subjectID)?.subjectText, element.subjectID, scene_subjects , true);
      });
      }

  }
  
}

// Modules Tab1 / Tab2
function fillModules(mod) {

  // clear the previous session
  clearModulesLst();

  if (mod?.length != 0) {
      mod.forEach((element) => {
      addNewItems(element.ModuleTitle, element.ModuleID, lst_modules, true);
      addNewItemsTab2(
        element.ModuleTitle,
        element.ModuleID,
        lst_modules_tab2,
        true
      );
    });

    // document.getElementById(mod[0].ModuleID).click();

  }

  lst_modules.index = "-1";
  
}

// Lessons Tab1
function fillLessonsTab1() {

  removeAllChildNodes(lst_lessons);
  resetAddBtn(lst_lessons, txt_lesson_entry, btn_add_lesson);
  clearSubjectsLst();
  clearElementTxtarea();
 
  let less = _courses.getLessons(lst_modules.index);
  if ( less?.length != 0) {
    less.forEach((element) => {
      addNewItems(element.LessonTitle, element.LessonID, lst_lessons, true);
    });
  }
  lst_lessons.index = "-1";

  document.getElementById(_courses.getFirstLesson(lst_modules.index))?.click();


}
function fillLessons(less) {

  // clear the previous session
  clearLessonsLst();
  

  if (less?.length != 0) {

    less.forEach((element) => {
      addNewItems(element.LessonTitle, element.LessonID, lst_lessons, true);
      addNewItemsTab2(element.LessonTitle,element.LessonID, lst_lessons_tab2, true);
    });

    
  }
  lst_lessons.index = "-1";

}

// Lessons Tab2
function fillLessonsTab2(less) {

  // clear the previous session
  clearLessonsTab2()

  if (less.length != 0) {
    less.forEach((element) => {
      addNewItemsTab2(
        element.LessonTitle,
        element.LessonID,
        lst_lessons_tab2,
        true
      );
    });

    // currentScene = null;
    // lst_lessons_tab2_setIndex(0);
  }
}

// Scenes Tab2
function fillScenes(sc) {

  // clear the previous session
  clearScenesLst();
  
  if (sc.length != 0) {
    sc.forEach((element) => {
      if (!element._deleted)
        addNewItems(element.sceneTitle, element.sceneID, lst_scenes, true);
    });

    


  }

}


// function fillSceneElements(subjs){

  
//   if(!subjs) return;
//   removeAllChildNodes(lst_elements_tab3);
//   CurrentElements.length = 0;
  
//   let subArr = [];
//   if (Array.isArray(subjs)) {
//     subArr = [...subjs];
//   }else {
//     subArr.push(subjs);
//   }
  
//   subArr.forEach((subjectX) => {
    
//     let subj = Subjects.find(x => x.subjectID == subjectX.subjectID);

//     if (subj.elements) {

//       subj.elements.forEach ( function(elm) {

//         CurrentElements.push(elm);

//       });
//     }
   

//    });
// }




function fillSubjElements(sub){
      
  clearElementTxtarea();

  
  sub?.elements?.forEach( function (element) {
  
  switch (element.elementType) {

    case LingElementType.KeyWords:
          txt_keywords.value += element.elementText + '\n';
          break;
    
    case LingElementType.Structure:
          txt_structure.value += element.elementText + '\n';
          break;
    
    case LingElementType.Vocals:
          txt_vocals.value += element.elementText + '\n';
          break;
    
    case LingElementType.Grammer:
          txt_grammer.value += element.elementText + '\n';

  }


});
}


//#endregion




// Select Module - and filter the lessons based on it
lst_modules_tab2.addEventListener("change", () => {
  
  clearLessonsTab2();
  
  _courses.currentModule = getModuleValue();
  _courses.currnetLesson = null;

  fillLessonsTab2(_courses.getLessons(_courses.currentModule));

  clearScenesLst();
 
  if (lst_lessons_tab2.options.length > 0) {
    lst_lessons_tab2.dispatchEvent(new Event("change"));
  }
});



// Select Lesson - and filter scenes based on it
lst_lessons_tab2.addEventListener("change", () => {
  
  _courses.currentLesson = getLessonValue();

  fillScenes(_courses.getScenes(_courses.currentLesson));
  
  fillSubjectsTab2(_courses.getSubjects(_courses.currentLesson),lst_subjects_tab2);


  document.getElementById(_courses.getFirstScene(_courses.currentLesson))?.click();

  // getFirstSceneActive();

});


// Change the contents of elements select based on the subject and the element type
// lst_elementsType_tab3.addEventListener('change', function(e) {

//   removeAllChildNodes(lst_elements_tab3);

//   if (CurrentElements.length > 0) {


//     CurrentElements.forEach( function (element){

//       if (element.elementType == e.target.value) {
//         addNewItemsTab2(element.elementText, element.id, lst_elements_tab3, true);
//       }
//     });

//   }

// });


// Select the first scene automatically when the lesson changed
// function getFirstSceneActive(){
//   if (lst_scenes.firstChild) {
//       _courses.currentScene = lst_scenes.firstChild.firstChild.id;
//       updateSceneView();
//       resetAddBtn(lst_scenes,txt_sceneTitle_entry, btn_add_scene);
//   } else {
//     initSceneView();
//   }
// }



// // Select the first element from the list
// function lst_elementsSkills_tab3_setIndex(indx) {
//   if (lst_elementsSkills_tab3.options.length > 0)
//     lst_elementsSkills_tab3.options[indx].selected = true;
// }

// change the selected item from the module list programmatically
// and fire the change event
function lst_modules_tab2_setIndex(indx) {
  if (lst_modules_tab2.options.length > 0) {
    lst_modules_tab2.options[indx].selected = true;
    lst_modules_tab2.dispatchEvent(new Event("change"));
  }
    
}

// Select an item from the lessons list programmatically
function lst_lessons_tab2_setIndex(indx) {
  if (lst_lessons_tab2.options.length > 0)
    lst_lessons_tab2.options[indx].selected = true;
}


// return the value of the selected lesson (the lessonID)
function getLessonValue() {
  if (lst_lessons_tab2.selectedIndex == -1) return null;
  else return lst_lessons_tab2.options[lst_lessons_tab2.selectedIndex].value;
}

// return the value of the selected module (the ModuleID)
function getModuleValue() {
  if (lst_modules_tab2.selectedIndex == -1) return null;
  else return lst_modules_tab2.options[lst_modules_tab2.selectedIndex].value;
}

// // fill elements of the scene
// function fillSceneElementsType(sub, lst_type) {

//   if (!sub) return;
//   removeAllChildNodes(lst_type);

//   let subArr = [];
//   if (Array.isArray(sub)) {
//     subArr = [...sub];
//   }else {
//     subArr.push(sub);
//   }

//   let elementTypeArray = ['كلمات مفتاحية','التراكيب والتعابير','الأصوات','القواعد']
//   let elementTypeSet = new Set();

//   subArr.forEach((element) => {
    
//     let subj = Subjects.find(x => x.subjectID == element.subjectID);

//     if (subj.elements) {

//       subj.elements.forEach ( function(elm) {

//         switch (elm.elementType) {
          
//           case LingElementType.KeyWords:
//                 elementTypeSet.add(0);
//                 break;
//           case LingElementType.Structure:
//                 elementTypeSet.add(1);
//                 break;
//           case LingElementType.Vocals:
//                 elementTypeSet.add(2);
//                 break;
//           case LingElementType.Grammer:
//                 elementTypeSet.add(3);
//                 break;
//         }
  
//       });
//     }
   

//    });

//    elementTypeSet.forEach( function(item){

//     addNewItemsTab2(elementTypeArray[item], item, lst_type , true);

//    });
   

 
// }



// Run when the current scene is changed
function updateSceneView() {
  
  initSceneView();
  
  if (_courses.currentScene != undefined && _courses.currentScene != null && _courses.currentScene!= "") {
    
    // retrieve the header of the current scene
    const cScene = _courses.getScene();
  
    // display the scene name
    // lbl_scene_no.textContent =
      
    //   `${Modules.find(mid => mid.ModuleID == cScene.ModuleID).ModuleTitle}` +
    //   ` > ${Lessons.find(ls => ls.LessonID == cScene.LessonID).LessonTitle}` + 
    //   ` > ${cScene.sceneTitle} [${SceneHeaders.length}] | ${cScene.sceneID}`;

    textbox_scene_desc.value = cScene.sceneDesc;
    
    // fillSceneElements(cScene.Subjects);
    // fillSceneElementsType(cScene.Subjects, lst_elementsType_tab3);
    
    // lst_sceneTypes_tab2.selectedIndex = getSceneTypeLstIndex(cScene);
    // lst_elementsType_tab3.dispatchEvent(new Event('change'));
    // if (lst_sceneTypes_tab2.selectedIndex != -1) {
    //   document.querySelector("#id-scene-selected").innerHTML =
    //     lst_sceneTypes_tab2.options[lst_sceneTypes_tab2.selectedIndex].text;
    //     document.querySelector("#id-scene-code").innerHTML =
    //     lst_sceneTypes_tab2.options[lst_sceneTypes_tab2.selectedIndex].value;
    //}
    

    
  }
}

function clearElementTxtarea(){
  txt_keywords.value = "";
  txt_structure.value = "";
  txt_vocals.value = "";
  txt_grammer.value = "";
}

function clearSceneDesc() {
  textbox_scene_desc.value = "";
}


// lst_subjects.addEventListener('click', function () {

//   if (lst_subjects.length <= 0) return;
//   clearElementTxtarea();
  
//   console.log("lst_subjects" + lst_subjects.index);
//   let sub = Subjects.find( x => x.subjectID == lst_subjects.index);
//       console.log(sub);
//       sub.elements?.forEach( function (element) {
      
//       switch (element.elementType) {

//         case LingElementType.KeyWords:
//              txt_keywords.value += element.elementText + '\n';
//              break;
        
//         case LingElementType.Structure:
//              txt_structure.value += element.elementText + '\n';
//              break;
        
//         case LingElementType.Vocals:
//              txt_vocals.value += element.elementText + '\n';
//              break;
        
//         case LingElementType.Grammer:
//              txt_grammer.value += element.elementText + '\n';
             
        



//       }



//   });

// });


//re-init the different values of a scene
function initSceneView(){

  // lbl_scene_no.textContent = "";
  // txt_sceneTitle_entry.value = "";
  clearSceneDesc();
  // scene_skills.innerHTML = "";
  // clearRdBtnTab2();
  // clearSceneElementsLst();
  //clearSceneSkillsLst();
  // CurrentElements.length = 0;
  // txt_sceneTitle_entry.value = "";
  resetAddBtn(lst_scenes,txt_sceneTitle_entry,  btn_add_scene );
  // lst_sceneTypes_tab2.selectedIndex = -1;
  // document.querySelector("#id-scene-selected").innerHTML = "xxx";
  // document.querySelector("#id-scene-code").innerHTML = "xxx";
}

// get the index of the stored scene type
// function getSceneTypeLstIndex(sc) {
//   for (let i = 0; i < lst_sceneTypes_tab2.options.length; i++) {
//     if (lst_sceneTypes_tab2.options[i].value == sc.sceneTypeID) return i;
//   }
//   return -1;
// }


//**********************Taha ********************************* */

function createEmptyScene(newSceneId) {
  let emptyScene = new Scene(newSceneId, "", "", "");

  // create first question and push it to Scene.
  let firstQuestion = new Question("id-question-1"); //id will be changed as per naming policy of the objects the Ask Mutaz
  let firstHintObj = new HintObj("id-hintObj-Q1-1"); //id will be changed as per naming policy of the objects the Ask Mutaz
  let firstPreviousHelpObj = new PreviousHelpObj("id-prevHelp-Q1-1"); //id will be changed as per naming policy of the objects the Ask Mutaz



  // Test Data to be changed with real datafrom DBs
  emptyScene.exerciseText = "Test-data 1";
  emptyScene.translation = "Test-data 2";
  firstHintObj.text = "Test-data 3";
  firstPreviousHelpObj.description = "Test-data 4";

  firstHintObj.previousHelp = firstPreviousHelpObj;
      emptyScene.exerciseHintObj = firstHintObj;

  emptyScene.questions.push(firstQuestion);

  return emptyScene;
}

//***************************************************** */

