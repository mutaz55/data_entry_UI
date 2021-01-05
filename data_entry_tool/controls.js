/////////////////////////// Initialization /////////////////////////////

// side nav1 - new course 
const show_addNewBtn = document.getElementById('new-course-btn');
const container_addNewBtn = document.getElementById('hidden-container');
const btn_addNewCourse = document.getElementById('sidenav1-btn-add');
const courseTitle_entry = document.getElementById("new-course-name");
const courseLang_entry = document.getElementById('course-lang');
const courseLevel_entry = document.getElementById('course-level');

// The course combo box (dropdown list)
const courseCombo = document.getElementById("id-course-title");

// Skills
const lst_skills = document.querySelector("#id-skills");

// Tab 1
const courseTitle = document.getElementById('tab1-lbl-coursename');
const courseLang  = document.getElementById('tab1-lbl-lang');
const courseLevel = document.getElementById('tab1-lbl-level');
const courseState = document.getElementById('tab1-lbl-coursestate');
const courseChkboxDefault = document.getElementById('tab1-chk-default');


// Input fields - Course Description
const txtbox_course_description = document.querySelector("#id-course-description");

// Modules List
const btn_add_module = document.querySelector("#add_module");
const lst_modules = document.querySelector("#id-modules");
const txt_module_entry = document.getElementById("txt_module");

// Lessons List
const btn_add_lesson = document.querySelector("#add_lesson");
const lst_lessons = document.querySelector("#id-lessons");
const txt_lesson_entry = document.getElementById("txt_lesson");

// Subject List
const btn_add_subject = document.querySelector("#add_subject");
const lst_subjects = document.querySelector("#id-subject");
const txt_subject_entry = document.querySelector("#txt_subject");

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

// Scene
const btn_add_scene = document.querySelector("#add_sceneTitle");
const lst_scenes = document.querySelector("#id-scenes");
const txt_sceneTitle_entry = document.getElementById("txt_sceneTitle");


// Scene Description
const textbox_scene_desc = document.querySelector("#id-scene-description");

// Scene Subjects
const lst_subjects_tab2 = document.querySelector("#id-select-subject");
const scene_subjects = document.querySelector("#id-lst-subjects");
const add_subj_scene = document.querySelector("#add_subject_to_scene");
const remove_subj_scene = document.querySelector("#remove_subject_from_scene");


// Addons list
const addons_list = document.getElementById('insert__addons').getElementsByTagName("ul")[0];

// Quiz List
const quiz_list = document.getElementById('insert__quiz').getElementsByTagName("ul")[0];

// Gen Addons List
const gaddons_list = document.getElementById('g-addons-section').getElementsByTagName("ul")[0];

// Scene Interface
const scene_title = document.getElementById('info_scene-title');

const slide_container = document.getElementById('id-slide-menu');

// Toast Msgs

function showError(msg) {
  console.log({ html: msg, classes: "toast-style" });
}

function showSuccess(msg){
  console.log({html:msg, classes: "toast-success"});
}



// Observable Variables
var Scene_change = new Observable();
var Slide_add = new Observable();
var Slide_change = new Observable();
var Icon_add = new Observable();
var Item_change = new Observable();
var Template_save = new Observable();
var AddonsQuiz_add = new Observable();

var course_changed = new Observable();
var module_changed = new Observable();
var lesson_changed = new Observable();

let CurrentElements = [];




///////////////////// Tab 1 /////////////////////

// Listener for Course Description 
txtbox_course_description.addEventListener("blur", (e) => {

  if (_courses.c_list.length > 0)  {
      _courses.c_list.find((item)=> item.id == _courses.currentCourse).Description = e.target.value;
  }
   
});



// Add Click event to update (Change the text value) of the list items
// and add Key listener for lists
//
//#region Lists Handlers

// Modules list
addModLstHandlers();

// Lessons list
addLesLstHandlers();

// Subject list 
addSubLstHandlers();

//Scenes
addSceneLstHandlers();


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
  
      if (_courses.currentScene != lst_scenes.index)
          _courses.currentScene = lst_scenes.index;
      
     
      
    
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

//#endregion





//#region  Add / Remove Operation on lists
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

          showSuccess('add new course' + courseTitle_entry.value);

    }else {
          showError('The course is already exist!!');
    }
    
    
  }
  
});


// Check conditions before adding a new course
function chkNewCourseValidation(){

  if  (courseTitle_entry.value.length == 0) {
      showError("Please enter the course title!");
      return false;
  }
  if  (courseLevel_entry.value.length == 0){
      showError("Please enter the course level!");
      return false;
  }
  if  (courseLang_entry.value.length == 0){
      showError("Please enter the course langauge!")
      return false;
  }

  return true;
}


function clearNewCourseTxtValues(){
  courseTitle_entry.value  = "";
  courseLang_entry.value  = "";
  courseLevel_entry.value  = "";
}

// get an id automatically for the new courses 
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

// remove a specific char from a string
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
    // _courses.currentScene = id_scene_key;
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
    // ScenesArray.push(createEmptyScene(id_scene_key));

    _courses.addNewScene(id_scene_key);
   
    addNewItems(txt_sceneTitle_entry.value, id_scene_key, lst_scenes, true);
    document.getElementById(id_scene_key)?.focus();
    document.getElementById(id_scene_key)?.click();


        
    // updateSceneView();

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




///// Listener for Scene Description

textbox_scene_desc.addEventListener("blur", (e) => {

  if (_courses.currentScene != undefined && _courses.currentScene != null) {
    sh = SceneHeaders.find((st) => st.sceneID == _courses.currentScene);

    if (sh) {
      sh.sceneDesc = e.target.value;
      sh._changed = true;
    }

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

function get_slideId(sId){
  let id_slide = 1;
  
  let cScene =  Scenes.find( item => item.id == sId);
  
  if (cScene) {

    id_slide =
        Math.max.apply(
          Math,
          cScene.filter(function (item) {
            return item.sID == sId
          }).map(function (scene) {
            return scene.sID.substring(
              scene.sID.indexOf("SL") + 1,
              scene.sID.length
            );
          })
        ) + 1;

  }else {
    id_slide = sId + "SL" + 1;

  }
    

    return id_slide;
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


// TODO : Change the name to be more generic
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
}


function clearSceneElementsLst() {

}

function clearSkillsLst() {
  
  removeAllChildNodes(lst_skills);

}


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

  // _courses.currentScene = "";
}


function removeAllChildNodes(parent) {

  if (parent.firstChild) {
      while (parent.firstChild) {
         parent.removeChild(parent.firstChild);
    }
  }
  
  
}


function clearSubjectsTab2(){
  removeAllChildNodes(lst_subjects_tab2);
  removeAllChildNodes(scene_subjects);
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
    
  

  }

}


// Modules Tab1 / Tab2
function fillModulesTab1(mod) {

  // clear the previous session
  removeAllChildNodes(lst_modules);

  if (mod?.length != 0) {
      mod.forEach((element) => {
      addNewItems(element.ModuleTitle, element.ModuleID, lst_modules, true);
     
    });

  }

  lst_modules.index = "-1";
  
}

function fillModulesTab2(mod){

  removeAllChildNodes(lst_modules_tab2);

  if(mod?.length != 0) {

     mod.forEach((element) => {
        addNewItemsTab2(element.ModuleTitle, element.ModuleID, lst_modules_tab2, true );
    });

    lst_modules_tab2.options[0].selected = true;
    _courses.currentModule = lst_modules_tab2.options[0].value;
  }
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

// function fillLessons(less) {

//   // clear the previous session
//   removeAllChildNodes(lst_lessons);

//   if (less?.length != 0) {

//     less.forEach((element) => {
//       addNewItems(element.LessonTitle, element.LessonID, lst_lessons, true);
//       // addNewItemsTab2(element.LessonTitle,element.LessonID, lst_lessons_tab2, true);
//     });

    
//   }
//   lst_lessons.index = "-1";

// }

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


function fillFixedLists () {

  fillAddonsLst();
  fillQuizLst();
  fillGenAddonsLst();

}

function fillAddonsLst(){
  
  removeAllChildNodes(addons_list);

  if (addOns.length > 0) {

      addOns.forEach( addon => {

          createIcons(addons_list, addon);
      });

  }

}

function fillQuizLst(){
  removeAllChildNodes(quiz_list);

    if (quizs.length > 0) {

      quizs.forEach( q => {
        createIcons(quiz_list, q);
    });
  }
}

function fillGenAddonsLst(){
  
  removeAllChildNodes(gaddons_list);

  if (gaddons.length > 0) {

        gaddons.forEach( Ga => {
        createIcons(gaddons_list, Ga);
      });

  }
}

function createIcons(lst, item) {
  
  let newItem = document.createElement("li");
  let text = document.createElement("span");
  let newIcon = document.createElement("i");



  newIcon.className = item.icon;

  text.className = "icon-name";
  text.textContent = item.text;

  newItem.dataset.addon_name = item.name;


  newItem.appendChild(newIcon);
  newItem.appendChild(text);

  newItem.addEventListener("click", () => {
      console.log(item.action);
  })

  lst.appendChild(newItem);
}
//#endregion




// Select Module - and filter the lessons based on it
lst_modules_tab2.addEventListener("change", () => {

  let selectedValue = getModuleValue();
  if (selectedValue) {
    _courses.currentModule = selectedValue;
  }
  
});


function module_changedHandler_tab2() {
  
  // clearLessonsTab2();
  
  // _courses.currnetLesson = null;

  fillLessonsTab2(_courses.getLessons(_courses.currentModule));
  clearScenesLst();
  initSceneView();
  if (lst_lessons_tab2.options.length > 0) {
      lst_lessons_tab2.options[0].selected = true;
        _courses.currentLesson = lst_lessons_tab2.options[0].value;
  }else {
    _courses.currentLesson = "";
  }

}

function lesson_changeHandler_tab2(){

  initSceneView();
  fillScenes(_courses.getScenes(_courses.currentLesson));
  
  fillSubjectsTab2(_courses.getSubjects(_courses.currentLesson),lst_subjects_tab2);

  if (lst_scenes.childNodes.length > 0) {

    document.getElementById(_courses.getFirstScene(_courses.currentLesson))?.click();

  }else 
  {
    _courses.currentScene = "";
  }
  
}

// Select Lesson - and filter scenes based on it
lst_lessons_tab2.addEventListener("change", () => {
  
  _courses.currentLesson = getLessonValue();

 

  // getFirstSceneActive();

});


function scene_changeHandler_tab2(){

      fillSceneSubjects(_courses.getSceneSubjects(_courses.currentScene));

      updateSceneView();

}

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
  textbox_scene_desc.value = _courses.getSceneDesc();
  // if (_courses.currentScene != undefined && _courses.currentScene != null && _courses.currentScene!= "") {
    
    // retrieve the header of the current scene
    //const cScene = _courses.getScene();
  
    // display the scene name
    // lbl_scene_no.textContent =
      
    //   `${Modules.find(mid => mid.ModuleID == cScene.ModuleID).ModuleTitle}` +
    //   ` > ${Lessons.find(ls => ls.LessonID == cScene.LessonID).LessonTitle}` + 
    //   ` > ${cScene.sceneTitle} [${SceneHeaders.length}] | ${cScene.sceneID}`;

    
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
    

    
//  }
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

function addNewSlideBtn(id_c){
  
  const container = document.createElement("div");
  container.className = "slide-menu-buttons-wrapper";

  const button_list = document.createElement("button");
  button_list.type = "button";
  button_list.className = "buttons-in-slide-menu";
  button_list.id = id_c;

  const button_list_text = document.createTextNode(id_c.substring(id_c.indexOf('SL') + 2 ,id_c.length));
  button_list.appendChild(button_list_text);

  const close_button = document.createElement("button");
  close_button.type = "button";
  close_button.className = "small-close";
  close_button.id = "c_" + id_c;
  button_list.appendChild(close_button);

  close_button.addEventListener('click', function (e) {
    e.preventDefault(); 
    e.stopImmediatePropagation();
    //  lst_type.handler(e.target.id);
    }
  );

  
  container.appendChild(button_list);
  container.appendChild(close_button);

  // (added)? lst_type.appendChild(container) : lst_type.prepend(container);
    
  return container;
}

//**********************____{ Taha }____********************************* */

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

// Subscribing
course_changed.subscribe(newCourseSelected);
module_changed.subscribe(module_changedHandler_tab2);
lesson_changed.subscribe(lesson_changeHandler_tab2);


Scene_change.subscribe(scene_changeHandler_tab2);
Scene_change.subscribe(Fill_Info);
Scene_change.subscribe(Fill_SlideMenu);
// Scene_change.subscribe(Fill_ItemsMenu);
// Scene_change.subscribe(Fill_Interface);

Slide_add.subscribe(Fill_SlideMenu);
Slide_add.subscribe(Fill_ItemsMenu);
Slide_add.subscribe(Fill_Interface);

Slide_change.subscribe(Fill_ItemsMenu);
Slide_change.subscribe(Fill_Interface);

Icon_add.subscribe(Fill_ItemsMenu);
Icon_add.subscribe(Fill_Interface);

Item_change.subscribe(Fill_Interface);

Template_save.subscribe(Fill_templateList);

AddonsQuiz_add.subscribe(Fill_Insert);


function Fill_Info(){
  console.log("Fill Infor");
  // implement the Fill Info Code.
  scene_title.textContent = "اسم المشهد";
  if (_courses.currentScene.length == 0) return;
  scene_title.textContent = _courses.getSceneTitle();
  
}
function Fill_SlideMenu(){

  // clear the slide menu
  // removeAllChildNodes(slide_container);

  // let slides = _courses.getSlides();

  // if (slides) {
  //     slides.forEach ( slide => {

  //       slide_container.appendChild(addNewSlideBtn(slide.id));


  //     });

  //     if (slides.length == 0){
  //       console.log('here');
  //       _courses.addNewSlide(_courses.currentScene);
  //     }
  //}
   
  

  // implement the Fill Slide Menu Code.
  console.log("Fill SlideMenu");

}
function Fill_ItemsMenu(){
  console.log("Fill ItemsMenu");
  // implement the Fill Item Menu Code.
}
function Fill_Interface(){
  console.log("Fill Interface");
  // implement the Fill Interface Code.
}
function Fill_templateList(){
  console.log("Fill templateList");
  // implement the Fill template List Code.
}
function Fill_Insert(){
  console.log("Fill Insert")
  // implement the Fill Addons Quiz Code.
}
