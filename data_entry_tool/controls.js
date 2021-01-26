/////////////////////////// Initialization /////////////////////////////

// Main Tab buttons
const sceneInfo_tabBtn = document.getElementById('tab-scenes');

// side nav1 - new course 
const show_addNewBtn = document.getElementById('new-course-btn');
const container_addNewBtn = document.getElementById('hidden-container');
const btn_addNewCourse = document.getElementById('sidenav1-btn-add');
const courseTitle_entry = document.getElementById("new-course-name");
const courseLang_entry = document.getElementById('course-lang');
const courseLevel_entry = document.getElementById('course-level');
const courseType_entry = document.getElementById('course-type');

// The course combo box (dropdown list)
const courseCombo = document.getElementById("id-course-title");

// Skills
const lst_skills = document.querySelector("#id-skills");


//
// Tab 1
const courseTitle = document.getElementById('tab1-lbl-coursename');
const courseLang  = document.getElementById('tab1-lbl-lang');
const courseLevel = document.getElementById('tab1-lbl-level');
const courseType = document.getElementById('tab1-lbl-courseType');
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
const sceneTypeCombo = document.getElementById("scene_type_combo");

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

// Templates List
const templates_lst = document.getElementById('insert__template').getElementsByTagName("ul")[0];


// Scene Interface
const scene_title = document.getElementById('info_scene-title');
const slide_container = document.getElementById('id-slide-menu');
const add_new_slide_btn = document.getElementById('add-new-slide');

const itemsButtons_container = document.getElementById('id-item-menu');

const interfaceContainer = document.getElementById("interface-container");


// 


// Toast Msgs

function showError(msg) {
  console.log('Erorr: ' + msg);
  showToast(msg, "error");

}

function showSuccess(msg){
  console.log('Sucess: ' + msg);
  showToast(msg, "toast-sucess");
  
}

function showToast(msg, classes) {
  var x = document.getElementById("toast-msg");
  
  x.textContent = msg;
  x.classList.add(classes);
  // Add the "show" class to DIV
  x.classList.add("show");
  
  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ 
    x.className = x.className.replace("show", ""); 
    x.className = x.className.replace(classes, ""); 
  }, 3000);

}

// Observable Variables
var Scene_change = new Observable();
var Slide_add = new Observable();
var Slide_change = new Observable();
var Icon_add = new Observable();
var Item_changed = new Observable();
var Template_save = new Observable();
var AddonsQuiz_add = new Observable();

var course_changed = new Observable();
var module_changed = new Observable();
var lesson_changed = new Observable();

let CurrentElements = [];

///

//Scene Type Enums
const SceneTypeEnums = {
  train: 0,
  review: 1,
  test: 2,
  assignment: 3,
  tutorials: 4,
  summary: 5

}


// Dialog
const templateDialog = document.getElementById('template_Dialog');
const select_values = document.getElementById('template_type');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn_template = document.getElementById('cancelBtn_template');
const template_name = document.getElementById('template_name');
const save_template = document.getElementById('save-template');


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

//Slides
slidesLstHandlers();


function addModLstHandlers() {

        lst_modules.index = "-1";
        lst_modules.mode = "normal";
        // When click on any item of the module list
        // store the id of the clicked item 
        lst_modules.addEventListener('click', function (e){
       
              if (lst_modules.length <= 0) return;
              if (!e.target.classList.contains("buttons-in-list")) return;
              
              if (lst_modules.index != e.target.id) {
                lst_modules.index = e.target.id;
                fillLessonsTab1();
              }
              

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
         
        if (lst_lessons.index != e.target.id) {
            lst_lessons.index = e.target.id;
            fillSubjectsTab1();
        }
        
        
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
         
        if (lst_subjects.index != e.target.id) {
            lst_subjects.index = e.target.id;
            fillSubjElements(_courses.getSubject(lst_subjects.index));
        }
          
            
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
      //resetAddBtn(lst_scenes, txt_sceneTitle_entry, btn_add_scene);
    }
  
      if (_courses.currentScene != lst_scenes.index) {
          cleanSlidesStyle("buttons-in-list--selected");
          e.target.classList.add ("buttons-in-list--selected");
          _courses.currentScene = lst_scenes.index;
      }
        
      
     

      
    
  });
  
  keyHandlers(lst_scenes, txt_sceneTitle_entry, btn_add_scene);
}

// to handle clicks on the slides
// and to change the current slide based on it.
function slidesLstHandlers(){

  slide_container.index = "-1";


  slide_container.addEventListener('click', function(e) {

    if (slide_container.length <= 0) return;
    if (!e.target.classList.contains("buttons-in-slide-menu")) return;
    // the user clicked the same slide
    if (e.target.classList.contains("buttons-in-slide-menu--selected")) return;
    
   
        slide_container.index = e.target.id;
        cleanSlidesStyle("buttons-in-slide-menu--selected");
        e.target.classList.add ("buttons-in-slide-menu--selected");
        _courses.currentSlide = slide_container.index;
   
    
    
      
    console.log(' slide id = ' + _courses.currentSlide);
     
      
    
  });
  
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


// to clean the clicked style of the slides
function cleanSlidesStyle(_class){

  const allElements = document.getElementsByClassName(_class);
  if (allElements) {
    Array.from(allElements).forEach( element => {
      element.classList.remove(_class);
    })
  }
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
      newCourse.Category = 0;
      newCourse.type = courseType_entry.value;
      newCourse.id = getCourseID();

      _courses.addNewCourse(newCourse);
  

      addNewItemsTab2(newCourse.CourseTitle, newCourse.id, courseCombo, true);
      courseCombo.options[courseCombo.length-1].selected = true;
      
      clearNewCourseTxtValues();
      show_addNewBtn.dispatchEvent(new Event('click'));

      showSuccess('New course has been created!' + courseTitle_entry.value);

      _courses.currentCourse = newCourse.id;
   
    
    
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
                course_id = "Ar";
                break;
          case "english":
          case 'English':
                course_id = "En";
                break;

          default: course_id = "Un";


  }

  let lvl = courseLevel_entry.value.removeChar('.');

  lvl = courseType_entry.value + lvl;
  course_id += lvl + "_";

   
  course_id_tail = 1;
  
  if (_courses.getCourseLst()?.length > 0) {

    let partOfcoursesID = _courses.getCourseLst().map( function (course) {
            if (course.id.indexOf(course_id) != -1) {
                return course.id.substring(course.id.indexOf(course_id) + course_id.length, course.id.length );
            }else return -1;
      
    } );
    partOfcoursesID = partOfcoursesID.filter( x => x != -1);

    if (partOfcoursesID?.length > 0) {
      course_id_tail = Math.max(...partOfcoursesID) + 1;
    }else {
      course_id_tail = 1;
    }
      
   
  }
    
  course_id += course_id_tail;

  return  course_id ;

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

        Scenes = Scenes.filter((scene) => scene.id != item.sceneID);
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

  id = id.split('-')[1];

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

      //activateAfterDelete(Subjects)
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

  id = id.split('-')[1];
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

  id = id.split('-')[1];

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

    id = id.split('-')[1];

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

    
    
    let firstSceneId = _courses.getFirstScene(_courses.currentLesson);
    
    if (firstSceneId) {
      let firstSc = document.getElementById(firstSceneId);
      if (firstSc) {
        firstSc.focus();
        firstSc.click();
      }
    }else {
      _courses.currentScene = "";
    }

}


function slides_container_handler(id){
  
  
  id = id.split('-')[1];
  

  if (removeBtnFromLst(slide_container, id)) {


       activateAfterDelete(_courses.getSlides(), id);
      _courses.removeSlide(id);
      if (_courses.getSlides().length == 0)  _courses.currentSlide = "";

      
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
    let id_scene_key = `${_courses.currentCourse + lessonNo}S${id_scene}`;
    

    // store the scene locally
    _courses.addNewScene(id_scene_key,lessonNo + id_scene,sceneTypeCombo.value, txt_sceneTitle_entry.value);
   
    addNewItems(txt_sceneTitle_entry.value, id_scene_key, lst_scenes, true);

    activateCurrentBtn(id_scene_key);
    
    }
    // Update mode
    else {
      
      // update the scene text locally
      _courses.updateSceneTitle(txt_sceneTitle_entry.value);
      
      // update list item text Tab1
      updateListItemText(_courses.currentScene, txt_sceneTitle_entry.value);

    
      // Back to normal mode
      resetAddBtn(lst_scenes,txt_sceneTitle_entry,btn_add_scene);

      activateCurrentBtn(_courses.currentScene);
    }
 
  }

});


function activateCurrentBtn(_id) {

    document.getElementById(_id)?.click();
    document.getElementById(_id)?.focus();


}

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

  console.log('id = ' + id) ;
  console.log('lst' + lst);
  console.log(' parent node ' + document.getElementById(`${id}`).parentNode);

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

function get_template_id(obj, _objID, char) {

  let id_obj = 1;
  let cCourse = _courses.currentCourse;
  if (obj.length > 0) {
    id_obj =
      Math.max.apply(
        Math,
        obj.map(function (objId) {
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
  
  if (cScene.slides?.length > 0) {

    slides = cScene.slides.map( slide =>  slide.id.substring(slide.id.indexOf("SL") + 2, slide.id.length ));
    id_slide = Math.max(...slides) + 1;
   
  }
    
    return  sId + "SL" + id_slide;
}

function get_ItemId(slideId,itemarray, typeChar){

  let id_item = 1;
  
  let cSlide =  _courses.getSlides()?.find( slide => slide.id == slideId);
  
  
  if (cSlide[itemarray]?.length > 0) {

    let items = cSlide[itemarray].map( function (item) {
    
      if (item.id.indexOf(typeChar) != -1 ) {
          return item.id.substring(item.id.indexOf(typeChar) + typeChar.length, item.id.length );
      }else return 0;
      
    });
    id_item = Math.max(...items) + 1;
   
    
  }
    
    
    return  slideId + typeChar + id_item;
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
  close_button.id = "c-" + id_c;
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



// create Factory & Register PlugIns (Addons/Quizes) for view
var viewFactory = new RegisterPressFactory();

//Quizes
// s_sorting_quiz
// l_sorting_quiz
// t_or_f_quiz
// category_quiz
// dragdrop_quiz
// m_choices_quiz
// fib_quiz
// h_word_quiz
// s_question_quiz

viewFactory.register(s_sorting_quiz);
viewFactory.register(l_sorting_quiz);
viewFactory.register(t_or_f_quiz);
viewFactory.register(category_quiz);
viewFactory.register(dragdrop_quiz);
viewFactory.register(m_choices_quiz);
viewFactory.register(fib_quiz);
viewFactory.register(h_word_quiz);
viewFactory.register(s_question_quiz);

//Addons

// (text_addons)
// text_read_addons 
// text_array_addons
// (pic_addons) 
// drawing_addons
// pic_hotspot_addons
// (sound_addons) 
// sound_Effect_addons
// table_addons
// (video_photo_addons)
//video_slideShow_addons
//video_anim_addons
//video_Interactive_addons
// animation_addons
// MemoryGame_addons
// Sendto_addons
// OnlineOTO_addons
// OnlineClass_addons

viewFactory.register(text_addons);
viewFactory.register(text_read_addons);

viewFactory.register(text_array_addons);
viewFactory.register(pic_addons);
viewFactory.register(drawing_addons);

viewFactory.register(pic_hotspot_addons);
viewFactory.register(sound_addons);
viewFactory.register(sound_Effect_addons);

viewFactory.register(table_addons);
viewFactory.register(video_photo_addons);
viewFactory.register(video_slideShow_addons);
viewFactory.register(video_anim_addons);
viewFactory.register(video_Interactive_addons);

viewFactory.register(animation_addons);
viewFactory.register(MemoryGame_addons);
viewFactory.register(Sendto_addons);
viewFactory.register(OnlineOTO_addons);
viewFactory.register(OnlineClass_addons);


//General
// AnimSlideTrans_GAaddons
// Question_title_GAddons
// Question_hint_GAddons
// Previous_link_GAddons
// Objectives_GAddons
// TestTime_GAddons
// qustion_score_GAddons
viewFactory.register(AnimSlideTrans_GAddons);
viewFactory.register(Question_title_GAddons);
viewFactory.register(Question_hint_GAddons);
viewFactory.register(Previous_link_GAddons);
viewFactory.register(Objectives_GAddons);
viewFactory.register(TestTime_GAddons);
viewFactory.register(qustion_score_GAddons);



// create Factory & Register PlugIns (Addons/Quizes) for Data
var dataItemsFactory = new RegisterPressFactory();

///Quizes
// Quiz (Quiz_DObj)
dataItemsFactory.register(Quiz_DObj);


///Addons & GA Addons
// mediaObjData (mediaObjData_DObj)
// TextWordArray (TextWordArray_DObj)
// PicWithHotSpot (PicWithHotSpot_DObj)
// TableObj (TableObj_DObj)
// VideoObj (VideoObj_DObj)
// AnimationClipObj (AnimationClipObj_DObj)
// MemoryGame (MemoryGame_DObj)
// Feedback (Feedback_DObj)
//SlideTransitionObj (SlideTransitionObj_DObj)
// ObjectiveObj (ObjectiveObj_DObj)

dataItemsFactory.register(mediaObjData_DObj);
dataItemsFactory.register(TextWordArray_DObj);
dataItemsFactory.register(PicWithHotSpot_DObj);
dataItemsFactory.register(TableObj_DObj);
dataItemsFactory.register(VideoObj_DObj);
dataItemsFactory.register(AnimationClipObj_DObj);
dataItemsFactory.register(MemoryGame_DObj);
dataItemsFactory.register(Feedback_DObj);
dataItemsFactory.register(SlideTransitionObj_DObj);
dataItemsFactory.register(ObjectivesList_DObj);


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
  fillTemplateLst();
}

function fillAddonsLst(){
  
  removeAllChildNodes(addons_list);

  if (addOns.length > 0) {

      addOns.forEach( addon => {

          createIconsAddons(addons_list, addon);
      });

  }

}

function fillQuizLst(){
  removeAllChildNodes(quiz_list);

    if (quizs.length > 0) {

      quizs.forEach( q => {
        createIconsQuiz(quiz_list, q);
    });
  }
}

function fillTemplateLst(){
   removeAllChildNodes(templates_lst);

   if (_projLib.templates?.length > 0) {

      _projLib.templates.forEach( temp => {
          createTemplateIcon(templates_lst, temp);
      });

   }
}


function fillGenAddonsLst(){
  
  removeAllChildNodes(gaddons_list);

  if (gaddons.length > 0) {

        gaddons.forEach( Ga => {
          gaddons_list.appendChild(createIconsGenAddons(Ga));
      });

  }
}

function createIconsAddons(lst, item) {
  

  let newItem = createIconHTML(item);

  newItem.addEventListener("click", () => {
      console.log(item.Action);
      
          let _currentItem = _courses.addNewItem(item, "Items", 'I');
          
          if (_currentItem?.id.length > 0) {
              
              createItemHTML(_currentItem);

    
              addSelectStyle(_currentItem.id);
              _courses.currentItem = _currentItem.id;
              console.log('item has been saved in the slide ... Item Id : ' + _currentItem);

          }else {
            showError(` Addon ${item.Name} could not be added!`);
          }
      
  })

  lst.appendChild(newItem);
}

function createTemplateIcon(lst, tempItem){

  
  let newItem = createTemplateIconHTML(tempItem);

  newItem.addEventListener("click", () => {
      
    //TODO: Are you sure dialog?

          console.log('Are you sure ');
        _courses.overwriteScene(_projLib.templates.find( temp => temp.id == newItem.id));
  });

  lst.appendChild(newItem);

}

function createTemplateIconHTML(tempItem) {
  
  let newItem = document.createElement("li");
  let text = document.createElement("span");
  let newIcon = document.createElement("i");



  newIcon.className = "fab fa-wpforms";

  
  text.textContent = tempItem.name;
  text.className = "icon-name";

  newItem.id = tempItem.id;


  newItem.appendChild(newIcon);
  newItem.appendChild(text);

  return newItem;
}

function addSelectStyle( _id) {

  if (_id) {
    
    cleanSlidesStyle("buttons-in-item-menu--selected");
    
    let newItem = document.querySelector(`[data-item-id=${_id}]`);

    if (newItem) {
      newItem.classList.add("buttons-in-item-menu--selected");
      newItem.focus();
    }
    
  }

}
function createIconsGenAddons(item) {
  

  let newItem = createIconHTML(item);

  newItem.addEventListener("click", () => {
      console.log(item.Action); 
      

      if (newItem.classList.contains('g-addons--selected')) {
      // the genItem is already exist  
         if (_courses.currentItem != newItem.dataset.id)
            _courses.currentItem = newItem.dataset.id;
      }else {
      // create a new genItem
        console.log('create new');
        let _currentGenItem = _courses.addNewGenItem(item);

        if (_currentGenItem?.id.length > 0) {
            
            newItem.classList.add('g-addons--selected');
            _courses.currentItem = _currentGenItem.id;
            newItem.dataset.id = _currentGenItem.id;
            console.log('Gen item has been saved in the slide ... GenItem Id : ' + _currentGenItem);

        }else {
          showError(` GenAddon ${item.Name} could not be added!`);
        }
        
      }
      //let _currentGItem  = _courses.addNewItem(item, "Items", 'Q');
  })
  return newItem;
}

function createIconsQuiz(lst, item) {
  

  let newItem = createIconHTML(item);

  newItem.addEventListener("click", () => {
      console.log(item.Action);
      
          let _currentItem = _courses.addNewItem(item, "Items", 'Q');

          if (_currentItem?.id.length > 0) {
              
              createItemHTML(_currentItem);

              // Add addons button
              
              addSelectStyle(_currentItem.id);
              _courses.currentItem = _currentItem.id;
              console.log('item has been saved in the slide ... Item Id : ' + _currentItem);

          }else {
            showError(` Addon ${item.Name} could not be added!`);
          }
      
  })

  lst.appendChild(newItem);
}




function createIconHTML (item){
  
  let newItem = document.createElement("li");
  let text = document.createElement("span");
  let newIcon = document.createElement("i");



  newIcon.className = item.Icon;

  // text.className = "icon-name";
  text.textContent = item.Text;

  newItem.dataset.addon_name = item.Name;


  newItem.appendChild(newIcon);
  newItem.appendChild(text);

  return newItem;
}
//#endregion


function createItemHTML(item) {

  let wrapper = document.createElement("div");
  wrapper.className = "item-menu-buttons-wrapper";

  
  const item_button = document.createElement("button");
  item_button.type = "button";
  
  
  // item_button.id = item.id;
  let addonsFromArr = null;

  

  if (item.id.includes('I')) {
      item_button.className = "buttons-in-item-menu";
      addonsFromArr = addOns.find( _addons => _addons.Name == item.name);
  }else {
      item_button.className = "buttons-q-in-item-menu";
      addonsFromArr = quizs.find( _addons => _addons.Name == item.name);
  }

 
  let Item_text = document.createElement("span");
  let Item_icon = document.createElement("i");
  
  Item_icon.className = addonsFromArr.Icon; //|| addonsFromArr.getAddonsIcon();
  Item_text.className = "icon-name";
  Item_text.textContent = addonsFromArr.Text;  //prototype.getAddonsText() || addonsFromArr.getAddonsText();

  item_button.dataset.itemId = item.id;
  item_button.appendChild(Item_icon);
  item_button.appendChild(Item_text);
 

  item_button.addEventListener('click', function (e){
    //e.stopPropagation();
    if (_courses.currentItem != e.currentTarget.dataset.itemId) {
        // remove selected class style
        cleanSlidesStyle("buttons-in-item-menu--selected");
        // add selected class style
        e.currentTarget.classList.add("buttons-in-item-menu--selected");
        _courses.currentItem = e.currentTarget.dataset.itemId;

      console.log('clicked');
    }
      

  });
  
  const close_button = document.createElement("button");
  close_button.type = "button";
  close_button.className = "small-close--items";
  close_button.id = item.id;

  close_button.addEventListener('click', function (e) {
    e.preventDefault(); 
    e.stopImmediatePropagation();
     
    activateAfterDelete2(_courses.getItems(), e.target.id);
     itemsButtons_container.removeChild(e.target.parentNode);
     // remove from slide items array
     _courses.removeItem(e.target.id);
     if (_courses.getItems().length == 0) _courses.currentItem = "";



    }
  );
  

  wrapper.appendChild(item_button);
  wrapper.appendChild(close_button);

  itemsButtons_container.appendChild(wrapper);
}

// Select Module - and filter the lessons based on it
lst_modules_tab2.addEventListener("change", () => {

  let selectedValue = getModuleValue();
  if (selectedValue) {
    _courses.currentModule = selectedValue;
  }
  
});


function module_changedHandler_tab2() {
  
  // clearLessonsTab2();
  

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
  fillScenes(_courses.getScenesHeader(_courses.currentLesson));
  
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

// Change scene type
sceneTypeCombo.addEventListener('change', function(event) {
  
  if (lst_scenes.index == -1) return;
  // update the scene type locally  
  _courses.updateSceneType(sceneTypeCombo.value);
  
});


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
  document.getElementById(_courses.currentScene)?.focus();
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
add_new_slide_btn.addEventListener('click' , () =>{

  let newSlide_id = _courses.addNewSlide();
  console.log('new slide is = ' + newSlide_id);
  if (newSlide_id) {
    slide_container.appendChild(addNewSlideLstBtn(newSlide_id));
    activateLasttBtn(_courses.getSlides());
  }
  
  
});

function addNewSlideLstBtn(id_c){
  
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
  close_button.id = "c-" + id_c;
  button_list.appendChild(close_button);

  close_button.addEventListener('click', function (e) {
    e.preventDefault(); 
    e.stopImmediatePropagation();
    slide_container.handler(e.target.id);
    }
  );

  
  container.appendChild(button_list);
  container.appendChild(close_button);

  // (added)? lst_type.appendChild(container) : lst_type.prepend(container);
    
  return container;
}


function activateFirstBtn(arrObj){
  
  if (arrObj?.length <= 0) return;

  let firstId = arrObj[0];

  let requiredId =  firstId.subjectID || firstId.LessonID || firstId.ModuleID || firstId.id;
  
  if (requiredId) {
    let HTMLElement = document.getElementById(requiredId);
    if (HTMLElement) {
      HTMLElement.focus();
      HTMLElement.click();
    }
  }
  
}


function activateLasttBtn(arrObj){
  
  if (arrObj?.length <= 0) return;

  let lastId = arrObj[arrObj.length - 1];

  let requiredId =  lastId.subjectID || lastId.LessonID || lastId.ModuleID || lastId.id;
  
  if (requiredId) {
    let HTMLElement = document.getElementById(requiredId);
    if (HTMLElement) {
      HTMLElement.focus();
      HTMLElement.click();
    }
  }
  
}

function activateAfterDelete(arrObj, _id){
  
  if (arrObj?.length <= 0) return;
  if (_id != _courses.currentSlide) return;
  
  

  let currentId_index = arrObj.findIndex( arrObjItem => arrObjItem.id == _id);

  if (currentId_index  >= 0) {

    let lastId = "";
    if (((currentId_index - 1) < 0) &&  (arrObj[1]))
        lastId = arrObj[1];
    else if ((currentId_index - 1) == 0) 
        lastId = arrObj[0];
    else if ((currentId_index - 1) > 0) 
        lastId = arrObj[currentId_index - 1];
    else return;


    let requiredId =  lastId.id;
  
    if (requiredId) {
      let HTMLElement = document.getElementById(requiredId);
      if (HTMLElement) {
          HTMLElement.focus();
          HTMLElement.click();
      }
    }
  }

  
}


function activateAfterDelete2(arrObj, _id){
  
  if (arrObj?.length <= 0) return;
  if (_id != _courses.currentItem) return;
  
  

  let currentId_index = arrObj.findIndex( arrObjItem => arrObjItem.id == _id);

  if (currentId_index  >= 0) {

    let lastId = "";
    if (((currentId_index - 1) < 0) &&  (arrObj[1]))
        lastId = arrObj[1];
    else if ((currentId_index - 1) == 0) 
        lastId = arrObj[0];
    else if ((currentId_index - 1) > 0) 
        lastId = arrObj[currentId_index - 1];
    else return;


    let requiredId =  lastId.id;
  
    if (requiredId) {
      let HTMLElement = document.body.querySelector(`[data-item-id="${requiredId}"]`);
      if (HTMLElement) {
          HTMLElement.focus();
          HTMLElement.click();
      }
    }
  }

  
}

function activateFirstItem(){

  if (_courses.getCurrentSlideObj().Items?.length > 0) {
    let requiredId = _courses.getCurrentSlideObj().Items[0].id;

    if (requiredId) {
      let HTMLElement = document.body.querySelector(`[data-item-id="${requiredId}"]`);
      if (HTMLElement) {
          HTMLElement.focus();
          HTMLElement.click();
      }
    }
  }
}

//***************************************************** */
// Subscribing

course_changed.subscribe(newCourseSelected);
module_changed.subscribe(module_changedHandler_tab2);
lesson_changed.subscribe(lesson_changeHandler_tab2);



Scene_change.subscribe(Fill_Info);
Scene_change.subscribe(Fill_SlideMenu);
Scene_change.subscribe(scene_changeHandler_tab2);
// Scene_change.subscribe(Fill_ItemsMenu);
// Scene_change.subscribe(Fill_Interface);

// Slide_add.subscribe(Fill_SlideMenu);
// Slide_add.subscribe(Fill_ItemsMenu);
// Slide_add.subscribe(Fill_Interface);

Slide_change.subscribe(Fill_ItemsMenu);

Item_changed.subscribe(Fill_Interface);

// Slide_change.subscribe(Fill_Interface);
// Item_change.subscribe(Fill_Interface);

// Icon_add.subscribe(Fill_ItemsMenu);
// Icon_add.subscribe(Fill_Interface);



Template_save.subscribe(Fill_templateList);

// AddonsQuiz_add.subscribe(Fill_Insert);


function Fill_Info(){
  console.log("Fill Info");
  // implement the Fill Info Code.

  scene_title.textContent = "اسم المشهد";
  if (_courses.currentScene.length == 0) return;
  
  scene_title.textContent = _courses.getSceneTitle();
  
}

function Fill_SlideMenu(){

  // implement the Fill Slide Menu Code.
  console.log("Fill SlideMenu");

  // clear the slide menu
  removeAllChildNodes(slide_container);
  removeAllChildNodes(itemsButtons_container);

  if (_courses.currentScene) {

    
    let slides = _courses.getSlides();

    if (slides) {

        // add the stored scene slides into the slide menu
        slides.forEach ( slide => {

          slide_container.appendChild(addNewSlideLstBtn(slide.id));


        });

        // a new Scene which has no slides yet
        if (slides.length == 0){
          
          let newSlideId = _courses.addNewSlide();
          if (newSlideId)
              slide_container.appendChild(addNewSlideLstBtn(newSlideId));
          

        }

        // Activate the first slide
        activateFirstBtn(slides);
    }
    
  
}

}
function Fill_ItemsMenu(){
  removeAllChildNodes(itemsButtons_container);

  
  _courses.currentItem = "";
  if (_courses.currentSlide) {

      
      _courses.getCurrentSlideObj().Items?.forEach( function(item) {

      createItemHTML(item);
      console.log("Fill ItemsMenu");
      

    });

    cleanSlidesStyle("buttons-in-item-menu--selected");
    activateFirstItem();

    gaddons_list.childNodes.forEach( function (node) {
      console.log('node -> : ' + node);
        node.classList.remove("g-addons--selected");
        if (node.dataset.id)
         delete node.dataset.id;
    });

    _courses.getCurrentSlideObj().GenItems.forEach( function (genItem) {
 
      let HTMLElement = document.body.querySelector(`[data-addon_name="${genItem.name}"]`);
      HTMLElement.dataset.id = genItem.id;
      HTMLElement.classList.add("g-addons--selected");
    });

  }

}


function Fill_Interface(){

  //clear interface view from any previous session
  removeAllChildNodes(interfaceContainer);
  console.log("Fill Interface");

  if (_courses.currentItem) {
    console.log('currentItem is not empty');
    console.log("Interface Action Clicked" + _courses.getCurrentItem().viewAction);
    interfaceContainer.innerHTML="";
    let newItem = viewFactory.press(_courses.getCurrentItem().viewAction);
    console.log(newItem.create());
    interfaceContainer.appendChild(newItem.create());
  }

  

  
  // implement the Fill Interface Code.
}
function Fill_templateList(){
  console.log("Fill templateList");
  fillTemplateLst();
}



courseChkboxDefault.addEventListener('change', (e)=> {

  if (e.isTrusted) {
    if (courseChkboxDefault.checked) {
      user_settings.savedCourse = _courses.currentCourse;
    }else {
      user_settings.savedCourse = "";
    }

    console.log('changed event fire');
  }
    
});



save_template.addEventListener('click', function onOpen() {

    if (typeof templateDialog.showModal === "function") {
      templateDialog.showModal();

    } else {

      alert("The <dialog> API is not supported by this browser");
    }
});

select_values.addEventListener('change', function onSelect(e) {
  if (template_name.length != 0) {
    confirmBtn.value = [select_values.value, template_name.value].join(';');
  }else {
    confirmBtn.value = "default";
  }
});

template_name.addEventListener('change', function onBlur(e) {
  if (template_name.length != 0) {
    confirmBtn.value = [select_values.value, template_name.value].join(';');
  }else {
    confirmBtn.value = "default";
  }
  
});

templateDialog.addEventListener('close', function onClose() {
    
    if ((templateDialog.returnValue) && (templateDialog.returnValue != 'cancel') && (templateDialog.returnValue != 'default')) {

      let result = templateDialog.returnValue.split(';');
      let newTemplate = new Template(get_template_id(_projLib.templates,'id','T'), result[1], result[0], JSON.parse(JSON.stringify(_courses.getScene()))  );
      _projLib.templates.push(newTemplate);
      template_name.value = "";
      // templateDialog.returnValue = "";
      libChanges.add('templates');
      Template_save.fire();
    
    }


});

cancelBtn_template.addEventListener('click', (e) => { 
  templateDialog.returnValue= 'cancel';

  templateDialog.close()
})
