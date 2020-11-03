/////////////////////////// Initialization /////////////////////////////
// Tab 1
// The course combo box (dropdown list)
const courseCombo = document.getElementById("id-course-title");

// The course type
const chkBoxCourseTypePaid = document.getElementById("id-cat-paid");
const chkBoxCourseTypeFree = document.getElementById("id-cat-free");

// The course description field
const textAreaCourseDesc = document.getElementById("id-course-description");

// Concepts List
const btn_add_concept = document.querySelector("#add_concept");
const btn_remove_concept = document.querySelector("#remove_concept");
const lst_concepts = document.querySelector("#id-concepts");
const txt_concept_entry = document.querySelector("#txt_concept");

// Modules List
const btn_add_module = document.querySelector("#add_module");
const btn_remove_module = document.querySelector("#remove_module");
const lst_modules = document.querySelector("#id-modules");
const txt_module_entry = document.getElementById("txt_module");


// Lessons List
const btn_add_lesson = document.querySelector("#add_lesson");
const btn_remove_lesson = document.querySelector("#remove_lesson");
const lst_lessons = document.querySelector("#id-lessons");
const txt_lesson_entry = document.getElementById("txt_lesson");


// Skills
const btn_add_skill = document.querySelector("#add_skill");
const btn_remove_skill = document.querySelector("#remove_skill");
const lst_skills = document.querySelector("#id-skills");

const txt_skill_entry = document.getElementById("txt_skill");
const txt_skill_code_entry = document.getElementById("txt_skill_code");

// Scene Types
const btn_add_sceneType = document.querySelector("#add_sceneType");
const btn_remove_sceneType = document.querySelector("#remove_sceneType");
const lst_sceneTypes = document.querySelector("#id-sceneTypes");


const txt_sceneType_entry = document.getElementById("txt_sceneType");
const txt_sceneType_code = document.getElementById("txt_sceneType_code");


//// Tab 2

// Modules
const lst_modules_tab2 = document.querySelector("#id-units");

// Lessons
const lst_lessons_tab2 = document.querySelector("#id-lessons-tab2");

//const tab2Header = document.querySelector("#sceneInfoTab2");
// Scene
const btn_add_scene = document.querySelector("#add_sceneTitle");
const btn_remove_scene = document.querySelector("#remove_sceneTitle");
const lst_scenes = document.querySelector("#id-scenes");

const txt_sceneTitle_entry = document.getElementById("txt_sceneTitle");


// Scene No
const lbl_scene_no = document.querySelector("#id-scene-no");

// Scene Description
const textbox_scene_desc = document.querySelector("#id-scene-description");

// Scene Concepts
const lst_concepts_tab2 = document.querySelector("#id-select-concept");
const scene_concepts = document.querySelector("#id-lst-concepts");
const add_con_scene = document.querySelector("#add_concept_to_scene");
const remove_con_scene = document.querySelector("#remove_concept_from_scene");


// Scene Skills
const lst_skills_tab2 = document.querySelector("#id-select-skill");
const lst_elementsSkills_tab2 = document.querySelector('#id-select-elementSkills');
const scene_skills = document.querySelector("#id-lst-skills");
const add_skill_scene = document.querySelector("#add_skill_to_scene");
const remove_skill_scene = document.querySelector("#remove_skill_from_scene");

// Send to teacher
const radiobtn_sendToTeacher = document.querySelector("#id-send-to-teacher");
const radiotbtn_sendToTeacherNot = document.querySelector(
  "#id-send-to-teacher-not"
);

// Book Type
const radiobtn_kursBuch = document.querySelector("#id-kursbook");
const radiobtn_arbeitsBuch = document.querySelector("#id-Arbeitbook");


// Scene Type
const lst_sceneTypes_tab2 = document.querySelector("#lst_scenesType_tab2");

///

// Input fields - Course Description / Category
const txtbox_course_description = document.querySelector(
  "#id-course-description"
);
const radiobtn_course_category_paid = document.querySelector("#id-cat-paid");
const radiobtn_course_category_free = document.querySelector("#id-cat-free");


// Toast Msgs

function showError(msg) {
  M.toast({ html: msg, classes: "toast-style" });
}

function showSuccess(msg){
  M.toast({html:msg, classes: "toast-success"});
}






///////////////////// Tab 1 /////////////////////


// Listener for Course Description and Category

txtbox_course_description.addEventListener("input", (e) => {
  if (Courses.length > 0) currentCourse.Description = e.target.value;

});

radiobtn_course_category_paid.addEventListener("change", () => {
  if (Courses.length > 0) currentCourse.Category = 1;

});

radiobtn_course_category_free.addEventListener("change", () => {
  if (Courses.length > 0) currentCourse.Category = 0;

});


// Add Click event to update (Change the text value) of the list items
// and add Key listener for lists
//
// Concepts list 
addLstHandlers(lst_concepts,txt_concept_entry,btn_add_concept);

// Modules list
addLstHandlers(lst_modules,txt_module_entry,btn_add_module);

// Lessons list
addLstHandlers(lst_lessons, txt_lesson_entry, btn_add_lesson);

// Skills list
addLstHandlersCase2(lst_skills, txt_skill_entry, txt_skill_code_entry, btn_add_skill);

// SceneTypes list
addLstHandlersCase2(lst_sceneTypes, txt_sceneType_entry, txt_sceneType_code, btn_add_sceneType);

//Scenes
addLstHandlersCase3(lst_scenes, txt_sceneTitle_entry, btn_add_scene);


      
// Enable updating of the selected item text
// And add handlers for key strokes (Enter, Escape)
function addLstHandlers(lst, txt_entry, btn_add) {

      lst.index = "-1";
      lst.mode = "normal";
      // When click on any item of the concept list
      // store the id of the clicked item 
      lst.addEventListener('click', function (e){
      
        if (!lst.children.length) return;

        this.index = e.target.id;
        txt_entry.value = e.target.textContent;
        btn_add.textContent = "تعديل"
        lst.mode = "update";

      });

      keyHandlers(lst, txt_entry, btn_add);

}


// Enable updating of the selected item text (Skills/SceneTypes)
// And add handlers for key strokes (Enter, Escape)
function addLstHandlersCase2(lst, txt_entry, code_entry, btn_add) {

  lst.index = "-1";
  lst.mode = "normal";
  // When click on any item of the concept list
  // store the id of the clicked item 
  lst.addEventListener('click', function (e){
 
    if (!lst.children.length) return;
    
    this.index = e.target.id;
    
    let content = e.target.textContent;
    txt_entry.value =  content.slice(content.indexOf('|')+2);

    code_entry.value = e.target.id;
    btn_add.textContent = "تعديل"
    lst.mode = "update";


  });

  
  // select the text when its being clicked
  txt_entry.addEventListener('click', ()=> {
    selectAllTxt(txt_entry);

  });

  code_entry.addEventListener('click', ()=> {
      selectAllTxt(code_entry);
  });

  // when press Enter key on the input of a list item
  // fires add button
  // when press Enter key on the input of a list item
  // fires add button
  txt_entry.addEventListener('keydown', function (e) {

    if (e.key === 'Enter') {
      
      btn_add.dispatchEvent(new Event('click'));
    
    // escape the update mode on the list
    }else if (e.key  === 'Escape')  {

      resetAddBtnCase2(lst, txt_entry, code_entry, btn_add)
    }
  });

}
  // Enable click on the scene list
// update the tab2 content based on the selected scene
function addLstHandlersCase3(lst,txt_entry, btn_add){
  lst.index = "-1";
  lst.mode = "normal";
  currentScene = null;

  lst.addEventListener('click', function(e) {
    
    if (!lst.children.length) return;

    this.index = e.target.id;
    txt_entry.value = e.target.textContent;
    btn_add.textContent = "تعديل"
    lst.mode = "update";

    console.log(lst.index);
    if (currentScene != e.target.id) {
      currentScene = e.target.id;
      updateSceneView();
    }
    
  });
  
  keyHandlers(lst, txt_entry, btn_add);
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

function clearScenesLst() {
  // Clear the scenes list
  removeAllChildNodes(lst_scenes);
  // clear the scene no.
  lbl_scene_no.textContent = "";
  // Clear the scene description
  textbox_scene_desc.value = "";
  // clear tab2 radio buttons
  clearRdBtnTab2();
}


function clearSkillsLst() {
  lst_skills.innerHTML = "";
}


function clearRdBtnTab2() {
  document.querySelector("#id-Arbeitbook").checked = false;
  document.querySelector("#id-kursbook").checked = false;
  radiobtn_sendToTeacher.checked = false;
  radiotbtn_sendToTeacherNot.checked = false;
}



//#region  Fill lists Tab1 and Tab2
// Concepts Tab1
function fillConcepts(con) {

  // Clear the previous session
  clearConceptsLst();
  
  if (con.length != 0) {
    con.forEach((element) => {
     
      addNewItems(
        element.ConceptText,
        element.ConceptID,
        lst_concepts,
        true
      );
    });
    fillSceneConcepts(con, lst_concepts_tab2);
  }
  
  lst_concepts.index = "-1";
}

// Concepts Tab2 (combobox and listbox)
function fillSceneConcepts(con, lst_type) {

  if (con.length != 0) {
   con.forEach((element) => {
     
     addNewItemsTab2(element.ConceptText, element.ConceptID, lst_type , true);
   });
 }
}

// update a skill from all scenes
function updateSkFromScenes(oldValue, newValueCode, newValueTxt) {

  let result = [];
  SceneHeaders.forEach( function(item) {

        if (item.Skills.find( x => x.SkillID == oldValue)) {
            item.Skills.find( x => x.SkillID == oldValue).SkillText = newValueTxt;  
            item.Skills.find( x => x.SkillID == oldValue).SkillID = newValueCode;
            item._changed = true;
            result.push(item.sceneID);
        }
      
  });

  return result;

}

function lst_modules_tab2_setIndex(indx) {
  if (lst_modules_tab2.options.length > 0) {
    lst_modules_tab2.options[indx].selected = true;
    lst_modules_tab2.dispatchEvent(new Event("change"));
  }
}



//update a scene type from all scenes
function updateSTFromScenes(oldValue, newValue){
  
  let result = [];

  SceneHeaders.forEach( function(item) {

    if (item.sceneTypeID == oldValue) {
        item.sceneTypeID = newValue;
        item._changed = true;  
        result.push(item.sceneID);
    }
  
});

return result;

}

function fillModules(mod) {
  // clear the previous session
  clearModulesLst();

  if (mod.length != 0) {
    mod.forEach((element) => {
      addNewItems(element.ModuleTitle, element.ModuleID, "modules_lst", true);
      addNewItemsTab2(
        element.ModuleTitle,
        element.ModuleID,
        "modules_lst",
        true
      );
    });
  }

}


// delete concepts from all scenes
function deleteConFromScenes(fid, _indx){

  let result = [];
  SceneHeaders.forEach( function(item) {

      if (item.CourseID == fid) {
        if (item.Concepts.find(x=> x.ConceptID == _indx)) {
          item._changed = true;
          result.push(item.sceneID);
        }
      }
  });

  if (result.length > 0) {
    SceneHeaders.find(
      (st) => st.CourseID == fid
    ).Concepts = SceneHeaders.find(
      (st) => st.CourseID == fid
    ).Concepts.filter(function (item) {
      return item.ConceptID != _indx;
    });
  }


  
  return result;
  
}

// update a concept txt from all scenes
function updateConFromScenes(_id, newValue){

  let result = [];
  SceneHeaders.forEach( function(item) {

        if (item.Concepts.find( x => x.ConceptID == _id)) {
            item.Concepts.find( x => x.ConceptID == _id).ConceptText = newValue;  
            item._changed = true;
            result.push(item.sceneID);
        }
      
  });

  return result;
}

function fillLessons(less) {
  // clear the previous session
  clearLessonsLst();

  let result = [];
  SceneHeaders.forEach( function(item) {

        if (item.Concepts.find( x => x.ConceptID == _id)) {
            item.Concepts.find( x => x.ConceptID == _id).ConceptText = newValue;  
            result.push(item.sceneID);
        }
      
  });

  return result;
}
// delete a skill from all scenes
function deleteSkillFromScenes(fid, _indx){

  let result = [];
  SceneHeaders.forEach( function(item) {

      if (item.CourseID == fid) {
        if (item.Skills.find(x=> x.SkillID == _indx)) {
          result.push(item.sceneID);
        }
      }
  });
}

function fillLessonsTab2(less) {
  // clear the previous session
  clearLessonsTab2();

  if (result.length > 0) {
    SceneHeaders.find(
      (st) => st.CourseID == fid
    ).Skills = SceneHeaders.find(
      (st) => st.CourseID == fid
    ).Skills.filter(function (item) {
      return item.SkillID != _indx;
    });
  }


  
  return result;
  
}

// Remove concepts from the scene_concepts list
function rmConFromConLst( itemValue ){
  
    let selectedItem = -1;
    Array.from(scene_concepts.options).forEach(function (item,index){
        if (item.value == itemValue)
            selectedItem = index;
    });

    if (selectedItem != -1)
        scene_concepts.options[selectedItem].remove();

    

}

// Remove concepts from the scene_concepts list
function rmSkillFromLst( itemValue ){
  
  let selectedItem = -1;

  Array.from(scene_skills.options).forEach(function (item,index){
      if (item.value == itemValue)
          selectedItem = index;
  });

  if (selectedItem != -1)
      scene_skills.options[selectedItem].remove();

  

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

  console.log(result);

  result.forEach( item => {
    SceneHeaders = SceneHeaders.filter( sH => sH.sceneID != item);
  });
  

}

// Check if the lesson with scenes or empty
function isDeleteLessonPossible(_id, _index){

  return !(SceneHeaders.find(sh => sh.CourseID == _id && sh.LessonID == _index));
      
}

// Check if the module have lessons or empty
function isDeleteModulePossible(_id, _index){
  return !(Lessons.find(les => les.id == _id && les.ModuleID == _index));
}

// Check if the skill being used by any scene
function isDeleteSkillPossible( _index){

      let result = null;

      SceneHeaders.forEach( function (item) {

        if (item.Skills.find( sk => sk.SkillID == _index)) {
            result = item;
            
        }
          
      });
      
      
      return (result != null)? false: true;
      
}

// Check if the scene type is being used by any scene
function isDeleteSTypePossible(_index){

  return !(SceneHeaders.find(sid => sid.sceneTypeID == _index));

}

////#endregion

// Remove Concept (Button)
btn_remove_concept.addEventListener("click", () => {
 
  if (lst_concepts.index != "-1") {

      if (removeBtnFromLst(lst_concepts)) {

            deleteConFromScenes(currentCourse.id, lst_concepts.index);

            //remove it from scene concept list (tab 2)
            rmConFromConLst(lst_concepts.index);
            
            removeOptionFromLst(lst_concepts_tab2, lst_concepts.index)
      
            Concepts = removeItemFromArr(Concepts, 'ConceptID', lst_concepts.index);
       
      }
      
      resetAddBtn(lst_concepts, txt_concept_entry, btn_add_concept);

      initAfterDel(lst_concepts, txt_concept_entry);
    
  }

});

// Add Concept (Button)
btn_add_concept.addEventListener("click", () => {
   
  // check if the entry text isn't empty and if the entered concept isn't already exist
  if (checkValidation(txt_concept_entry.value, lst_concepts)) {
    
    
    if (lst_concepts.mode == "normal") {

      // generate a new id for the concept (based on the course id)
      let id_con_key = get_id(Concepts, 'ConceptID', 'C');


      // store the concept locally
      Concepts.push(
        new Concept(currentCourse.id, id_con_key, txt_concept_entry.value)
      );
      
    
      // add the new concept into the concepts list in tab 1
      addNewItems(txt_concept_entry.value, id_con_key, lst_concepts, true).focus();

      // add the new concept into the concepts list in tab 2
      addNewItemsTab2(txt_concept_entry.value, id_con_key, lst_concepts_tab2, true);

      
    }
    // mode is update
    else {


      // update the concept text locally
      Concepts.find(con => con.ConceptID == lst_concepts.index).ConceptText = txt_concept_entry.value;

      // update list item text 
      updateListItemText(lst_concepts, txt_concept_entry.value);

      
      // find if its being used by any scenes
      let scenesHaveIt = updateConFromScenes(lst_concepts.index, txt_concept_entry.value, txt_skill_entry.value);

      if (scenesHaveIt.length > 0) {
      
         updateOptionText(scene_concepts,lst_concepts.index, txt_concept_entry.value);
      }

  
      // update concepts text tab2
      updateOptionText(lst_concepts_tab2,lst_concepts.index,txt_concept_entry.value);
      
      
      // Back to normal mode
      resetAddBtn(lst_concepts,txt_concept_entry,btn_add_concept);


    }
    
    // clear the concept input box (used to enter the concept text)
    document.getElementById("txt_concept").value = "";

    // make the concept input box focused
    txt_concept_entry.focus();

    // the selected concept of the concepts list is empty now.
    lst_concepts.index = "-1";
  }

 

});


// Remove Module (Button)
btn_remove_module.addEventListener("click", () => {

  if (lst_modules.index != "-1") {
    
   
      // Check if there are no lessons within the Module
      if (isDeleteModulePossible(currentCourse.id, lst_modules.index)) {


        if (removeBtnFromLst(lst_modules)) {
        
         
          removeOptionFromLst(lst_modules_tab2, lst_modules.index)
          
          Modules = removeItemFromArr(Modules, 'ModuleID', lst_modules.index);
  
          resetAddBtn(lst_modules, txt_module_entry, btn_add_module);
  
          initAfterDel(lst_modules, txt_module_entry);
        }

      }
      else 
      {
        showError("Can't delete modules have lessons within it!")
      }

  }
});


// Add Module (Button)
btn_add_module.addEventListener("click", () => {

  
  // check if the entry text isn't empty and if the entered module isn't already exist
  if (checkValidation(txt_module_entry.value, lst_modules)) {

    if (lst_modules.mode == "normal") {

      // generate a new id for the module (based on the course id)
      let id_mod_key = get_id(Modules, 'ModuleID', 'M');

      // store the module locally
      Modules.push(new Module(currentCourse.id, id_mod_key, txt_module_entry.value));

      // Add a new record of Modules
      //toAdd.push(new CRUD_Op(currentCourse.id, id_mod_key, addModule));

      // add the new module into the modules list in tab 1
      addNewItems(txt_module_entry.value, id_mod_key, lst_modules, true).focus();

      // add the new module into the modules list in tab 2
      addNewItemsTab2(txt_module_entry.value, id_mod_key, lst_modules_tab2, true);

      

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
    
    // make the concept input box focused
    txt_module_entry.focus();

    // the selected module of the modules list is empty now.
    lst_modules.index = "-1";
  }

  

});


// Remove Lesson (Button)
btn_remove_lesson.addEventListener("click", () => {
  
  if (lst_lessons.index != "-1") {
  
    
        
          // Check if there are no scenes within the lesson
          if (isDeleteLessonPossible(currentCourse.id, lst_lessons.index)) {

            
               // Check if its possible to delete a lesson
              if (removeBtnFromLst(lst_lessons)) {
                  

                  removeOptionFromLst(lst_lessons_tab2, lst_lessons.index)
                
                  Lessons = removeItemFromArr(Lessons, 'LessonID', lst_lessons.index);
            
                  resetAddBtn(lst_lessons, txt_lesson_entry, btn_add_lesson);
            
                  initAfterDel(lst_lessons, txt_lesson_entry);
                }
          }
          else 
          {
            showError("Can't delete lessons have scenes within it!")
          }

       
  }
});


// Add Lesson (Button)
btn_add_lesson.addEventListener("click", () => {

  if (checkValidation(txt_lesson_entry.value, lst_lessons)) {
    
    if (lst_lessons.mode == "normal"){

    // Add a lesson without connected it with a module isn't possible
    if (lst_modules.index  == "-1") {
        showError('Please choose a module first');
        return;
     }
    // generate a new id for the lesson (based on the course id)
    let id_less_key = get_id(Lessons, 'LessonID', 'L');
    
    // store the lesson locally 
    Lessons.push(new Lesson(currentCourse.id, id_less_key, txt_lesson_entry.value, lst_modules.index));

    
    addNewItems(txt_lesson_entry.value, id_less_key, lst_lessons, true).focus();

    // Add to tab2 only if the current module is displayed
    if (Modules.find(md=> md.id == currentCourse.id).ModuleID == lst_modules.index )
        addNewItemsTab2(txt_lesson_entry.value, id_less_key, lst_lessons_tab2, true);

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

  // make the concept input box focused
  txt_lesson_entry.focus();

  // the selected lesson of the lessons list is empty now.
  lst_lessons.index = "-1";
  }

});


// Remove Skill (Button)
btn_remove_skill.addEventListener("click", () => {
  
  if (lst_skills.index != "-1") {


      // Check if there are no scenes refer to the skill
      if (isDeleteSkillPossible(lst_skills.index)){

        if (removeBtnFromLst(lst_skills)) {
      
           
            //remove it from scene skills list (tab 2)
            rmSkillFromLst(lst_skills.index);
        
            removeOptionFromLst(lst_skills_tab2, lst_skills.index)
            
            Skills = removeItemFromArr(Skills, 'SkillID', lst_skills.index);
      
            resetAddBtnCase2(lst_skills, txt_skill_entry, txt_skill_code_entry, btn_add_skill);
      
            initAfterDelCase2(lst_skills, txt_skill_entry, txt_skill_code_entry);
      
      }

      }else {
        showError("Skill can't be deleted, while a scene refers to it!")
      }

//}

  }

});

// Add Skill (Button)
btn_add_skill.addEventListener("click", () => {
 
  // if non empty nor digit entries
  if (
    txt_skill_entry.value != 0 &&
    txt_skill_code_entry.value != 0 &&
    !txt_skill_code_entry.value.match(/^\d/)
  ) {

    if (!Skills.find((sk) => sk.SkillID == txt_skill_code_entry.value)) {

    if (lst_skills.mode == "normal") {

      

        Skills.push(
          new Skill(txt_skill_code_entry.value, txt_skill_code_entry.value, txt_skill_entry.value)
        );
        
        
        const txt = `(${txt_skill_code_entry.value}) | ${txt_skill_entry.value}`;
         
        addNewItems(txt, txt_skill_code_entry.value, lst_skills, true).focus();
        addNewItemsTab2(txt_skill_entry.value, txt_skill_code_entry.value, lst_skills_tab2, true);
        

      
      

    }
    // update mode
    else {
      
      // update the concept text locally
      Skills.find(sk => sk.SkillID == lst_skills.index).SkillText = txt_skill_entry.value;
      Skills.find(sk => sk.SkillID == lst_skills.index).SkillID = txt_skill_code_entry.value;
      
      const txt = `(${txt_skill_code_entry.value}) | ${txt_skill_entry.value}`;
    
      // update list item text 
      updateListItemText(lst_skills, txt);
      updateListItemId(lst_skills, txt_skill_code_entry.value);

      
      // find if its being used by any scenes
      let scenesHaveIt = updateSkFromScenes(lst_skills.index, txt_skill_code_entry.value, txt_skill_entry.value);

      if (scenesHaveIt.length > 0) {
      
       

        updateOptionText(scene_skills,lst_skills.index, txt_skill_entry.value);
      }

      

      // Update the option text in Tab2 concept & Scene Concepts if there are any
      updateOptionText(lst_skills_tab2,lst_skills.index, txt_skill_entry.value);
      updateOptionValue(lst_skills_tab2, lst_skills.index, txt_skill_code_entry.value);


      // Back to normal mode
      resetAddBtnCase2(lst_skills,txt_skill_entry,txt_skill_code_entry, btn_add_skill);


    }
  //
    }else {
      showError("The Code is already used!");
    }
    document.getElementById("txt_skill").value = "";
    document.getElementById("txt_skill_code").value = "";
    lst_skills.index = "-1";
  }
 
});


// Remove SceneType (Button)
btn_remove_sceneType.addEventListener("click", () => {

  if (lst_sceneTypes.index != "-1") {


      if (isDeleteSTypePossible(lst_sceneTypes.index)){

        if (removeBtnFromLst(lst_sceneTypes)) {

       
        
        // remove it from scene type list 
        
      
          removeOptionFromLst(lst_sceneTypes_tab2, lst_sceneTypes.index)
          
          SceneTypes = removeItemFromArr(SceneTypes, 'SceneTypeID', lst_sceneTypes.index);
  
          resetAddBtnCase2(lst_sceneTypes, txt_sceneType_entry, txt_sceneType_code, btn_add_sceneType);
  
          initAfterDelCase2(lst_sceneTypes, txt_sceneType_entry, txt_sceneType_code);
  
      
  
      }

      }
      else {
        showError("Scene Type can't be deleted, while a scene refers to it!")
      }

   // }
    
    
  }
});

// Add SceneType (Button)
btn_add_sceneType.addEventListener("click", () => {

  // if non empty nor digit entries
  if (
    txt_sceneType_entry.value != 0 &&
    txt_sceneType_code.value != 0 &&
    !txt_sceneType_code.value.match(/^\d/)
  ) {

    if (
      !SceneTypes.find((st) => st.SceneTypeID == txt_sceneType_code.value)
    ) {

    if (lst_sceneTypes.mode == "normal") {

     
        SceneTypes.push(
          new SceneType(
            txt_sceneType_code.value,
            txt_sceneType_code.value,
            txt_sceneType_entry.value
          )
        );
            

        const txt = `(${txt_sceneType_code.value}) | ${txt_sceneType_entry.value}`;
        addNewItems(txt, txt_sceneType_code.value, lst_sceneTypes, true).focus();
        addNewItemsTab2(
          txt_sceneType_entry.value,
          txt_sceneType_code.value,
          lst_sceneTypes_tab2,
          true
        );
        
      

    // update mode
    }else {

      // update the sceneType text locally

      SceneTypes.find(sty => sty.SceneTypeID == lst_sceneTypes.index).SceneTypeDesc = txt_sceneType_entry.value;
      SceneTypes.find(sty => sty.SceneTypeID == lst_sceneTypes.index).SceneTypeID = txt_sceneType_code.value;
      
      const txt = `(${txt_sceneType_code.value}) | ${txt_sceneType_entry.value}`;
    
      // update list item text 
      updateListItemText(lst_sceneTypes, txt);
      updateListItemId(lst_sceneTypes, txt_sceneType_code.value);

      updateSTFromScenes(lst_sceneTypes.index, txt_sceneType_code.value);
      
     
      // Update the option text in Tab2 
      updateOptionText(lst_sceneTypes_tab2,lst_sceneTypes.index, txt_sceneType_entry.value);
      updateOptionValue(lst_sceneTypes_tab2, lst_sceneTypes.index, txt_sceneType_code.value);

      // Back to normal mode
      resetAddBtnCase2(lst_sceneTypes,txt_sceneType_entry,txt_sceneType_code, btn_add_sceneType);


    }

    } else {
      showError("The Code is already used!");
    }

    document.getElementById("txt_sceneType").value = "";
    document.getElementById("txt_sceneType_code").value = "";
    lst_sceneTypes.index = "-1";
  }
  
});


// Remove Scene (Button)
btn_remove_scene.addEventListener("click", () => {

  if (lst_scenes.index != "-1") {
    
    // TODO : Check if its possible to delete a Scene and the scene header
    if (removeBtnFromLst(lst_scenes)) {
          
        SceneHeaders.find((sc) => sc.sceneID == lst_scenes.index)._deleted = true;
        //SceneHeaders = removeItemFromArr(SceneHeaders, 'sceneID', lst_scenes.index);
        //ScenesArray=removeItemFromArr(ScenesArray,"",lst_scenes.index)

        checkSceneHeaderChanges();
        
        // TODO: Remove the scene from scene array objects
        resetAddBtn(lst_scenes, txt_sceneTitle_entry, btn_add_scene);

        initAfterDel(lst_scenes, txt_sceneTitle_entry);

    }

    currentScene = null;
    updateSceneView();

    getFirstSceneActive();
  }
});


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
    let lessonNo = getLessonValue().slice(9);
    let id_scene_key = currentCourse.CourseTitle + lessonNo + "S" + id_scene;

    // Assign the current scene id
    currentScene = id_scene_key;
    let _id = currentCourse.id + lessonNo + "S" + id_scene;

    // store the scene header locally
    SceneHeaders.push(
      new SceneHeader(
        _id,
        currentCourse.id,
        id_scene_key,
        getModuleValue(),
        getLessonValue(),
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


   
    addNewItems(txt_sceneTitle_entry.value, id_scene_key, lst_scenes, true).focus();
        
    updateSceneView();

    radiotbtn_sendToTeacherNot.checked = true;
    radiotbtn_sendToTeacherNot.dispatchEvent( new Event('change'));
    radiobtn_kursBuch.checked = true;
    radiobtn_kursBuch.dispatchEvent(new Event('change'));
    lst_sceneTypes_tab2.selectedIndex = 0;
    lst_sceneTypes_tab2.dispatchEvent(new Event('change'));

    }
    // Update mode
    else {
      
      // update the scene text locally
      SceneHeaders.find(sH => sH.sceneID == currentScene).sceneTitle = txt_sceneTitle_entry.value;
      SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;


      // update list item text Tab1
      updateListItemText(currentScene, txt_sceneTitle_entry.value);
      // Back to normal mode
      resetAddBtn(lst_scenes,txt_sceneTitle_entry,btn_add_scene);
    }
 
  }

});



// Add Concept to a scene
add_con_scene.addEventListener("click", () => {
  if (currentScene == undefined || currentScene == null) return;

  if (lst_concepts_tab2.selectedIndex != -1) {
    let conID =
      lst_concepts_tab2.options[lst_concepts_tab2.selectedIndex].value;

    if (
      SceneHeaders.find((st) => st.sceneID == currentScene).Concepts.length ==
        0 ||
      SceneHeaders.find((st) => st.sceneID == currentScene).Concepts.find(
        (coId) => coId.ConceptID == conID
      ) == undefined
    ) {
      let conTxt =
        lst_concepts_tab2.options[lst_concepts_tab2.selectedIndex].text;

      addNewItemsTab2(conTxt, conID, scene_concepts, true);

      SceneHeaders.find((st) => st.sceneID == currentScene).Concepts.push(
        new Concept(currentCourse.id, conID, conTxt)
      );

     
      SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
    }
  }
});

// remove concept from a scene
remove_con_scene.addEventListener("click", () => {
  if (scene_concepts.selectedIndex != -1) {
    
    const conID = scene_concepts.options[scene_concepts.selectedIndex].value;
    
    rmConFromConLst(conID);

    SceneHeaders.find(
      (st) => st.sceneID == currentScene
    ).Concepts = SceneHeaders.find(
      (st) => st.sceneID == currentScene
    ).Concepts.filter(function (item) {
      return item.ConceptID != conID;
    });

    SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
  }
});

// Add Skill to a scene
add_skill_scene.addEventListener("click", () => {
  if (currentScene == undefined || currentScene == null) return;

  if (lst_skills_tab2.selectedIndex != -1) {
    let skID = lst_skills_tab2.options[lst_skills_tab2.selectedIndex].value;

    if (
      SceneHeaders.find((st) => st.sceneID == currentScene).Skills.length ==
        0 ||
      SceneHeaders.find((st) => st.sceneID == currentScene).Skills.find(
        (coId) => coId.SkillID == skID
      ) == undefined
    ) {
      let skTxt = lst_skills_tab2.options[lst_skills_tab2.selectedIndex].text;
      addNewItemsTab2(skTxt, skID, scene_skills, false);

      SceneHeaders.find((st) => st.sceneID == currentScene).Skills.push(
        new Skill(currentCourse.id, skID, skTxt)
      );
     
      SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
    }
  }
});

// remove skill from a scene
remove_skill_scene.addEventListener("click", () => {
  if (scene_skills.selectedIndex != -1) {
    const skID = scene_skills.options[scene_skills.selectedIndex].value;
    scene_skills.options[scene_skills.selectedIndex].remove();

    SceneHeaders.find(
      (st) => st.sceneID == currentScene
    ).Skills = SceneHeaders.find(
      (st) => st.sceneID == currentScene
    ).Skills.filter(function (item) {
      return item.SkillID != skID;
    });

    SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
    
    
  }
});



// Choose Scene type for the current scene
lst_sceneTypes_tab2.addEventListener("change", (e) => {

  if (currentScene == undefined || currentScene == null) return;

  if (lst_sceneTypes_tab2.selectedIndex != -1) {
    SceneHeaders.find((st) => st.sceneID == currentScene).sceneTypeID =
      e.target.value;

    
    SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;

  }
});


//#region scene radio buttons
// Listener for send to teacher
//
radiotbtn_sendToTeacherNot.addEventListener("change", () => {
  if (currentScene != undefined && currentScene != null) {
    SceneHeaders.find((sid) => sid.sceneID == currentScene).sendToTeacher = 0;
   
    SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
  }
});

radiobtn_sendToTeacher.addEventListener("change", () => {
  if (currentScene != undefined && currentScene != null) {

    SceneHeaders.find((sid) => sid.sceneID == currentScene).sendToTeacher = 1;
    
    SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
  }
});


// Listener for book type
//
radiobtn_arbeitsBuch.addEventListener("change", () => {
  if (currentScene != undefined && currentScene != null) {
    SceneHeaders.find((sid) => sid.sceneID == currentScene).BookType =
      "Workbook";
      
      SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
  }
});

radiobtn_kursBuch.addEventListener("change", () => {
  if (currentScene != undefined && currentScene != null) {
    SceneHeaders.find((sid) => sid.sceneID == currentScene).BookType = "Course";
    
    SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
  }
});


///// Listener for Scene Description

textbox_scene_desc.addEventListener("input", (e) => {
  if (currentScene != undefined && currentScene != null) {
    SceneHeaders.find((st) => st.sceneID == currentScene).sceneDesc =
      e.target.value;
    SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
    

  }
});
//#endregion


// remove a button (item) from the list 
// return false if there was not found otherwise true
function removeBtnFromLst(lst){

  const removed = document.querySelector(`#${lst.index}`);
  
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
  
  const firstChild = lst.firstChild;
  if (firstChild != undefined) firstChild.focus();

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

  if (obj.filter(function (item) {
    return item.id == currentCourse.id;
  }).length > 0) {
    id_obj =
      Math.max.apply(
        Math,
        obj.filter(function (item) {
          return item.id == currentCourse.id;
        }).map(function (objId) {
          return objId[_objID].substring(
            objId[_objID].indexOf(char) + 1,
            objId[_objID].length
          );
        })
      ) + 1;
  }

  let id_obj_key = currentCourse.CourseTitle + char + id_obj;

  return id_obj_key;
}

function get_sceneId(){
  let id_scene = 1;

    if (
      SceneHeaders.filter(function (item) {
        return item.CourseID == currentCourse.id && item.LessonID == getLessonValue();
      }).length > 0
    ) {
      id_scene =
        Math.max.apply(
          Math,
          SceneHeaders.filter(function (item) {
            return item.CourseID == currentCourse.id && item.LessonID == getLessonValue();
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

// Add new item to the list (includes concepts, modules, lessons, skills, scene types)
function addNewItems(txt, id_c, lst_type, added) {
  
  const new_item = document.createElement("button");
  const new_item_txt = document.createTextNode(txt);

  new_item.type = "button";
  new_item.className = "list-group-item list-group-item-action";
  new_item.id = id_c;
  
  new_item.appendChild(new_item_txt);

  (added)? lst_type.appendChild(new_item) : lst_type.prepend(new_item);
    
  return new_item;
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

function clearConceptsLst() {
  removeAllChildNodes(lst_concepts);
  removeAllChildNodes(lst_concepts_tab2);
  clearSceneConceptsLst();
}

function clearSceneConceptsLst() {
  removeAllChildNodes(scene_concepts);
}

function clearSkillsLst() {
  removeAllChildNodes(lst_skills);
  removeAllChildNodes(lst_skills_tab2);
  clearSceneSkillsLst();
}

function clearSceneSkillsLst() {
  removeAllChildNodes(scene_skills);
}

function clearSceneTypesTab2() {
  removeAllChildNodes(lst_sceneTypes_tab2);
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
  // clear the scene no.
  lbl_scene_no.textContent = "";
  // Clear the scene description
  textbox_scene_desc.value = "";
  // clear tab2 radio buttons
  clearRdBtnTab2();
  
  txt_sceneTitle_entry.value = "";

  clearSceneConceptsLst();
  
  clearSceneSkillsLst();

  currentScene = null;
}

function clearSceneTypes() {
  removeAllChildNodes(lst_sceneTypes);
  clearSceneTypesTab2();
}

function clearRdBtnTab2() {
  document.querySelector("#id-Arbeitbook").checked = false;
  document.querySelector("#id-kursbook").checked = false;
  radiobtn_sendToTeacher.checked = false;
  radiotbtn_sendToTeacherNot.checked = false;
}

function removeAllChildNodes(parent) {

  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
  
}

//#endregion
////////////////////////


//#region  Fill lists Tab1 and Tab2
// Concepts Tab1
function fillConcepts(con) {

  // Clear the previous session
  clearConceptsLst();
  
  if (con.length != 0) {
    con.forEach((element) => {
     
      addNewItems(
        element.ConceptText,
        element.ConceptID,
        lst_concepts,
        true
      );
    });
    fillSceneConcepts(con, lst_concepts_tab2);
  }
  
  lst_concepts.index = "-1";
}
// Concepts Tab2 (combobox and listbox)
function fillSceneConcepts(con, lst_type) {

   if (con.length != 0) {
    con.forEach((element) => {
      
      addNewItemsTab2(element.ConceptText, element.ConceptID, lst_type , true);
    });
  }
}

// Modules Tab1 / Tab2
function fillModules(mod) {

  // clear the previous session
  clearModulesLst();

  if (mod.length != 0) {
    mod.forEach((element) => {
      addNewItems(element.ModuleTitle, element.ModuleID, lst_modules, true);
      addNewItemsTab2(
        element.ModuleTitle,
        element.ModuleID,
        lst_modules_tab2,
        true
      );
    });

    
  }

  lst_modules.index = "-1";
}

// Lessons Tab1
function fillLessons(less) {

  // clear the previous session
  clearLessonsLst();
  

  if (less.length != 0) {

    less.forEach((element) => {
      addNewItems(element.LessonTitle, element.LessonID, lst_lessons, true);
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

    currentScene = null;
    lst_lessons_tab2_setIndex(0);
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

// Skills Tab1
function fillSkills(sk) {

  // clear the previous session
  clearSkillsLst();

  if (sk.length != 0) {
    sk.forEach((element) => {
      const txt = `(${element.SkillID}) | ${element.SkillText}`;
      addNewItems(txt, element.SkillID, lst_skills, true);
    });
    
    
    fillSceneSkills(sk, lst_skills_tab2);
    fillSceneSkills(sk, lst_elementsSkills_tab2);
    lst_skills_tab2_setIndex(0);

  }

  lst_skills.index = "-1";
}

// Skills Tab2 (combobox and listbox)
function fillSceneSkills(sk, lst_type) {

   if (sk.length != 0) {
    sk.forEach((element) => {
      addNewItemsTab2(element.SkillText, element.SkillID, lst_type , true);

    });
  }
}

// SceneType Tab1
function fillSceneTypes(sceneT) {
  
  // clear the previous session
  clearSceneTypes();

  if (sceneT.length != 0) {
    sceneT.forEach((element) => {
      const txt = `(${element.SceneTypeID}) | ${element.SceneTypeDesc}`;
      addNewItems(txt, element.SceneTypeID, lst_sceneTypes, true);
    });

    fillSceneTypesTab2(sceneT);
  }


  lst_sceneTypes.index = "-1";
}

// SceneType Tab2
function fillSceneTypesTab2(sk) {

  // clear the previous session

  if (sk.length != 0) {
    sk.forEach((element) => {
      addNewItemsTab2(element.SceneTypeDesc, element.SceneTypeID, lst_sceneTypes_tab2, true);
    });
  }

}

//#endregion


// Select Module - and filter the lessons based on it
lst_modules_tab2.addEventListener("change", () => {
  clearLessonsTab2();
  fillLessonsTab2(Lessons.filter((les) => les.ModuleID == getModuleValue()));

  clearScenesLst();
  currentScene = null;
 
  if (lst_lessons_tab2.options.length > 0) {
    lst_lessons_tab2.dispatchEvent(new Event("change"));
  }
});



// Select Lesson - and filter scenes based on it
lst_lessons_tab2.addEventListener("change", (e) => {
  
  currentScene = null;

  fillScenes(
    SceneHeaders.filter(
      (item) =>
        item.CourseID == currentCourse.id && item.LessonID == e.target.value
    )
  );

  
  getFirstSceneActive();

});


// Select the first scene automatically when the lesson changed
function getFirstSceneActive(){
  
  if (lst_scenes.firstChild) {
    
    lst_scenes.firstChild.focus();
    currentScene = lst_scenes.firstChild.id;
    updateSceneView();
    resetAddBtn(lst_scenes,txt_sceneTitle_entry, btn_add_scene);
  } else {
    initSceneView();
  }
}



// Select the first element from the list
function lst_skills_tab2_setIndex(indx) {
  if (lst_skills_tab2.options.length > 0)
    lst_skills_tab2.options[indx].selected = true;
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


// Run when the current scene is changed
function updateSceneView() {
  
  initSceneView();

  if (currentScene != undefined && currentScene != null) {
    
    // retrieve the header of the current scene
    cScene = SceneHeaders.find((sid) => sid.sceneID == currentScene);
    
    // display the scene name
    lbl_scene_no.textContent =
      
      `${Modules.find(mid => mid.ModuleID == cScene.ModuleID).ModuleTitle}` +
      ` > ${Lessons.find(ls => ls.LessonID == cScene.LessonID).LessonTitle}` + 
      ` > ${cScene.sceneTitle} [${SceneHeaders.length}] | ${cScene.sceneID}`;

    textbox_scene_desc.value = cScene.sceneDesc;

    fillSceneConcepts( cScene.Concepts, scene_concepts);
    
    fillSceneSkills(cScene.Skills, scene_skills);

    lst_sceneTypes_tab2.selectedIndex = getSceneTypeLstIndex(cScene);

    if (lst_sceneTypes_tab2.selectedIndex != -1) {
      document.querySelector("#id-scene-selected").innerHTML =
        lst_sceneTypes_tab2.options[lst_sceneTypes_tab2.selectedIndex].text;
        document.querySelector("#id-scene-code").innerHTML =
        lst_sceneTypes_tab2.options[lst_sceneTypes_tab2.selectedIndex].value;
    }
    

    if (
      SceneHeaders.find((sid) => sid.sceneID == currentScene).BookType ==
      "Course"
    ) {
      radiobtn_kursBuch.checked = true;
    } else {
      radiobtn_arbeitsBuch.checked = true;
    }

    if (
      SceneHeaders.find((sid) => sid.sceneID == currentScene).sendToTeacher == 1
    ) {
      radiobtn_sendToTeacher.checked = true;
    } else {
      radiotbtn_sendToTeacherNot.checked = true;
    }
  }
}

//re-init the different values of a scene
function initSceneView(){

  lbl_scene_no.textContent = "";
  txt_sceneTitle_entry.value = "";
  textbox_scene_desc.value = "";
  scene_concepts.innerHTML = "";
  scene_skills.innerHTML = "";
  clearRdBtnTab2();
  clearSceneConceptsLst();
  clearSceneSkillsLst();

  txt_sceneTitle_entry.value = "";
  resetAddBtn(lst_scenes,txt_sceneTitle_entry,  btn_add_scene );
  lst_sceneTypes_tab2.selectedIndex = -1;
  document.querySelector("#id-scene-selected").innerHTML = "xxx";
  document.querySelector("#id-scene-code").innerHTML = "xxx";
}

// get the index of the stored scene type
function getSceneTypeLstIndex(sc) {
  for (let i = 0; i < lst_sceneTypes_tab2.options.length; i++) {
    if (lst_sceneTypes_tab2.options[i].value == sc.sceneTypeID) return i;
  }
  return -1;
}


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
