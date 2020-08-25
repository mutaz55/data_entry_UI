/////////////////////////// Initialization /////////////////////////////
// Concepts List
const btn_add_concept = document.querySelector("#add_concept");
const btn_remove_concept = document.querySelector("#remove_concept");
const lst_concepts = document.querySelector("#id-concepts");

let selected_concept_index = "-1";

// Modules List
const btn_add_module = document.querySelector("#add_module");
const btn_remove_module = document.querySelector("#remove_module");
const lst_modules = document.querySelector("#id-modules");

const lst_modules_tab2 = document.querySelector("#id-units");

let selected_module_index = "-1";

// Lessons List
const btn_add_lesson = document.querySelector("#add_lesson");
const btn_remove_lesson = document.querySelector("#remove_lesson");
const lst_lessons = document.querySelector("#id-lessons");

const lst_lessons_tab2 = document.querySelector("#id-lessons-tab2");

let selected_lesson_index = "-1";

// Skills
const btn_add_skill = document.querySelector("#add_skill");
const btn_remove_skill = document.querySelector("#remove_skill");
const lst_skills = document.querySelector("#id-skills");


let selected_skill_index = "-1";


// Scene Types
const btn_add_sceneType = document.querySelector("#add_sceneType");
const btn_remove_sceneType = document.querySelector("#remove_sceneType");
const lst_sceneTypes = document.querySelector("#id-sceneTypes")

let selected_sceneType_index = "-1";

///////////////////////////////////////////////////////////////

// Input fields - Course Description / Category
const txtbox_course_description = document.querySelector("#id-course-description");
const radiobtn_course_category_paid = document.querySelector("#id-cat-paid");
const radiobtn_course_category_free = document.querySelector("#id-cat-free");


// Toast

function showError(msg)
{
    M.toast({html: msg, classes: 'toast-style'});

}

///// Listener for Course Description and Category

txtbox_course_description.addEventListener('input', (e) => {

    if (Courses.length > 0 ) 
        currentCourse.Description = e.target.value;
});

radiobtn_course_category_paid.addEventListener('change', ()=> {

    if (Courses.length > 0 ) 
        currentCourse.Category = 1;
});

radiobtn_course_category_free.addEventListener('change', ()=> {
    if (Courses.length > 0 ) 
        currentCourse.Category = 0;
});

/////


// Remove Concept (Button)
btn_remove_concept.addEventListener("click", (e) => {
  if (selected_concept_index != "-1") {
    const removed = document.querySelector(`#${selected_concept_index}`);

    if (removed != undefined) {
      lst_concepts.removeChild(removed);

      Concepts = Concepts.filter(function (item) {
        return item.ConceptID !== selected_concept_index;
      });
    }

    selected_concept_index = "-1";

    const firstChild = lst_concepts.firstChild;
    if (firstChild != undefined) firstChild.focus();
  }
});


// Add Concept (Button)
btn_add_concept.addEventListener("click", (e) => {
    const txt_concept_entry = document.getElementById("txt_concept").value;
  
    if (txt_concept_entry != 0) {
      let id_con = 1;
  
      if (
        Concepts.filter(function (item) {
          return item.id == currentCourse.id;
        }).length > 0
      ) {
        id_con =
          Math.max.apply(
            Math,
            Concepts.filter(function (item) {
              return item.id == currentCourse.id;
            }).map(function (conId) {
              return conId.ConceptID.substring(
                conId.ConceptID.indexOf("C") + 1,
                conId.ConceptID.length
              );
            })
          ) + 1;
      }
  
      let id_con_key = currentCourse.CourseTitle + "C" + id_con;
  
      Concepts.unshift(
        new Concept(currentCourse.id, id_con_key, txt_concept_entry)
      );
      addNewItems(txt_concept_entry, id_con_key, "concepts_lst", true).focus();
      document.getElementById("txt_concept").value = "";
    }
    selected_concept_index = "-1";
  });
  
// Add new item to the list (includes concepts, modules, lessons, skills, scene types)
function addNewItems(txt, id_c, lst_type, added) {
  const new_item = document.createElement("button");
  const new_item_txt = document.createTextNode(txt);

  new_item.type = "button";
  new_item.className = "list-group-item list-group-item-action";
  new_item.id = id_c;
  new_item.addEventListener("click", (e) => {
    switch (lst_type) {
      case "concepts_lst":
        selected_concept_index = id_c;
        break;
      case "modules_lst":
        selected_module_index = id_c;
        break;
      case "lessons_lst":
        selected_lesson_index = id_c;
        break;
        
      case "skills_lst":
          selected_skill_index = id_c;
          break;
      case "sceneType_lst":
          selected_sceneType_index = id_c;
          break;
    }
  });
  new_item.appendChild(new_item_txt);

  switch (lst_type) {
    case "concepts_lst":
      if (added) lst_concepts.appendChild(new_item);
      else lst_concepts.prepend(new_item);
      break;

    case "modules_lst":
      if (added) lst_modules.appendChild(new_item);
      else lst_modules.prepend(new_item);

      break;

    case "lessons_lst":
      if (added) lst_lessons.appendChild(new_item);
      else lst_lessons.prepend(new_item);
      break;

    case "skills_lst":
        if (added) lst_skills.appendChild(new_item);
        else lst_skills.prepend(new_item);
        break;
    case "sceneType_lst":
        if (added) lst_sceneTypes.appendChild(new_item);
        else lst_sceneTypes.prepend(new_item);
        break;
  }

  return new_item;
}

// Clear lists
function clearConceptsLst() {
  lst_concepts.innerHTML = "";
}

function clearModulesLst() {
  lst_modules.innerHTML = "";
  lst_modules_tab2.innerHTML = "";
}

function clearLessonsLst() {
  lst_lessons.innerHTML = "";
  lst_lessons_tab2.innerHTML = "";
}

function clearSkillsLst() {
    lst_skills.innerHTML = "";
}

function clearSceneTypes() {
    lst_sceneTypes.innerHTML = "";
}

// Add new items to select (Combobox) - includes Modules, lessons....
function addNewItemsTab2(txt, id_c, type, added) {
  const newOption = document.createElement("option");
  const optionText = document.createTextNode(txt);
  // set option text
  newOption.appendChild(optionText);
  // and option value
  newOption.setAttribute("value", id_c);
  // add the option to the select box

  switch (type) {
    case "modules_lst":
      if (added) lst_modules_tab2.appendChild(newOption);
      else lst_modules_tab2.prepend(newOption);
      break;
    case "lessons_lst":
      if (added) lst_lessons_tab2.appendChild(newOption);
      else lst_lessons_tab2.prepend(newOption);
      break;
  }
}

function fillConcepts(con) {
  if (con.length != 0) {
    con.forEach((element) => {
      addNewItems(
        element.ConceptText,
        element.ConceptID,
        "concepts_lst",
        false
      );
    });
  }

  selected_concept_index = "-1";
}


function lst_modules_tab2_setIndex(indx) {
  if (lst_modules_tab2.options.length > 0)
    lst_modules_tab2.options[indx].selected = true;
}

function lst_lessons_tab2_setIndex(indx) {
  if (lst_lessons_tab2.options.length > 0)
    lst_lessons_tab2.options[indx].selected = true;
}

function fillModules(mod) {
  if (mod.length != 0) {
    mod.forEach((element) => {
      addNewItems(element.ModuleTitle, element.ModuleID, "modules_lst", false);
      addNewItemsTab2(
        element.ModuleTitle,
        element.ModuleID,
        "modules_lst",
        false
      );
    });
  }
  lst_modules_tab2_setIndex(0);
  selected_module_index = "-1";
}

function fillLessons(less) {
  if (less.length != 0) {
    less.forEach((element) => {
      addNewItems(element.LessonTitle, element.LessonID, "lessons_lst", false);
      addNewItemsTab2(
        element.LessonTitle,
        element.LessonID,
        "lessons_lst",
        false
      );
    });
  }
  lst_lessons_tab2_setIndex(0);
  selected_lesson_index = "-1";
}

function fillSkills(sk) {
    
    if (sk.length != 0) {
        sk.forEach((element) => {
            const txt = `(${element.SkillID}) | ${element.SkillText}`;
            addNewItems(txt, element.SkillID, "skills_lst", false);
            
        });
    }

    selected_skill_index = "-1";
}

function fillSceneTypes(sceneT) {

    if (sceneT.length != 0) {
        sceneT.forEach((element) => { 
            const txt = `(${element.SceneTypeID}) | ${element.SceneTypeDesc}`;
            addNewItems(txt, element.SceneTypeID, "sceneType_lst", false)
        });
    }

    selected_sceneType_index = "-1";
}


// Remove Module (Button)
btn_remove_module.addEventListener("click", (e) => {
  if (selected_module_index != "-1") {
    const removed = document.querySelector(`#${selected_module_index}`);

    if (removed != undefined) {
      lst_modules.removeChild(removed);

      Array.from(lst_modules_tab2.options).forEach((element) => {
        if (element.value == selected_module_index) {
          element.remove();
        }
      });

      Modules = Modules.filter(function (item) {
        return item.ModuleID !== selected_module_index;
      });
    }

    selected_module_index = "-1";

    const firstChild = lst_modules.firstChild;
    if (firstChild != undefined) firstChild.focus();
  }
});


// Add Module (Button)
btn_add_module.addEventListener("click", (e) => {
  const txt_module_entry = document.getElementById("txt_module").value;

  if (txt_module_entry != 0) {
    let id_mod = 1;

    if (
      Modules.filter(function (item) {
        return item.id == currentCourse.id;
      }).length > 0
    ) {
      id_mod =
        Math.max.apply(
          Math,
          Modules.filter(function (item) {
            return item.id == currentCourse.id;
          }).map(function (modId) {
            return modId.ModuleID.substring(
              modId.ModuleID.indexOf("M") + 1,
              modId.ModuleID.length
            );
          })
        ) + 1;
    }

    let id_mod_key = currentCourse.CourseTitle + "M" + id_mod;
    Modules.unshift(new Module(currentCourse.id, id_mod_key, txt_module_entry));
    addNewItems(txt_module_entry, id_mod_key, "modules_lst", true).focus();
    addNewItemsTab2(txt_module_entry, id_mod, true);
    document.getElementById("txt_module").value = "";
  }
  selected_module_index = "-1";
});


// Add Lesson (Button)
btn_add_lesson.addEventListener("click", (e) => {
  const txt_lesson_entry = document.getElementById("txt_lesson").value;

  if (txt_lesson_entry != 0) {
    let id_les = 1;

    if (
      Lessons.filter(function (item) {
        return item.id == currentCourse.id;
      }).length > 0
    ) {
      id_les =
        Math.max.apply(
          Math,
          Lessons.filter(function (item) {
            return item.id == currentCourse.id;
          }).map(function (lessId) {
            return lessId.LessonID.substring(
              lessId.LessonID.indexOf("L") + 1,
              lessId.LessonID.length
            );
          })
        ) + 1;
    }

    let id_less_key = currentCourse.CourseTitle + "L" + id_les;
    Lessons.unshift(
      new Lesson(currentCourse.id, id_less_key, txt_lesson_entry)
    );
    addNewItems(txt_lesson_entry, id_less_key, "lessons_lst", true).focus();
    addNewItemsTab2(txt_lesson_entry, id_less_key,"lessons_lst", true);
    document.getElementById("txt_lesson").value = "";
  }
  selected_lesson_index = "-1";
});


// Remove Lesson (Button)
btn_remove_lesson.addEventListener("click", (e) => {
  if (selected_lesson_index != "-1") {
    const removed = document.querySelector(`#${selected_lesson_index}`);

    if (removed != undefined) {
      lst_lessons.removeChild(removed);

       Array.from(lst_lessons_tab2.options).forEach (element => {
           if (element.value == selected_lesson_index) {
               element.remove();
           }

       });

      Lessons = Lessons.filter(function (item) {
        return item.LessonID !== selected_lesson_index;
      });
    }

    selected_lesson_index = "-1";

    const firstChild = lst_lessons.firstChild;
    if (firstChild != undefined) firstChild.focus();
  }
});


// Remove Skill (Button)
btn_remove_skill.addEventListener("click", (e) => {
    if (selected_skill_index != "-1") {
      const removed = document.querySelector(`#${selected_skill_index}`);
  
      if (removed != undefined) {
        lst_skills.removeChild(removed);
  
        Skills = Skills.filter(function (item) {
          return item.SkillID !== selected_skill_index;
        });
      }
  
      selected_skill_index = "-1";
  
      const firstChild = lst_skills.firstChild;
      if (firstChild != undefined) firstChild.focus();
    }
  });
  
  
  // Add Skill (Button)
  btn_add_skill.addEventListener("click", (e) => {
      const txt_skill_entry = document.getElementById("txt_skill").value;
      const txt_skill_code_entry = document.getElementById("txt_skill_code").value;

      if ((txt_skill_entry != 0) && (txt_skill_code_entry != 0) && (!txt_skill_code_entry.match(/^\d/))){
        
        Skills.unshift(
          new Skill(txt_skill_code_entry, txt_skill_code_entry, txt_skill_entry)
        );
        const txt = `(${txt_skill_code_entry}) | ${txt_skill_entry}`;
        addNewItems(txt, txt_skill_code_entry, "skills_lst", true).focus();
        document.getElementById("txt_skill").value = "";
        document.getElementById("txt_skill_code").value = "";
      }
      selected_skill_index = "-1";
    });
  

    
// Remove SceneType (Button)
btn_remove_sceneType.addEventListener("click", (e) => {
    if (selected_sceneType_index != "-1") {
      const removed = document.querySelector(`#${selected_sceneType_index}`);
  
      if (removed != undefined) {
        lst_sceneTypes.removeChild(removed);
  
        SceneTypes = SceneTypes.filter(function (item) {
          return item.SceneTypeID !== selected_sceneType_index;
        });
      }
  
      selected_sceneType_index = "-1";
  
      const firstChild = lst_sceneTypes.firstChild;
      if (firstChild != undefined) firstChild.focus();
    }
  });
  
  
  // Add SceneType (Button)
  btn_add_sceneType.addEventListener("click", (e) => {
      const txt_sceneType_entry = document.getElementById("txt_sceneType").value;
      const txt_sceneType_code = document.getElementById("txt_sceneType_code").value;

      if ((txt_sceneType_entry != 0) && (txt_sceneType_code != 0) && (!txt_sceneType_code.match(/^\d/))) {
            
        if (SceneTypes.find( st => st.SceneTypeID == txt_sceneType_code ) == undefined) {

            SceneTypes.unshift(
                new SceneType(txt_sceneType_code, txt_sceneType_code, txt_sceneType_entry)
              );
      
              const txt = `(${txt_sceneType_code }) | ${txt_sceneType_entry}`;
              addNewItems(txt, txt_sceneType_code , "sceneType_lst", true).focus();
              document.getElementById("txt_sceneType").value = "";
              document.getElementById("txt_sceneType_code").value = "";

        }else {

            showError('The Code is already used!');
            
        }
        
        
      }
      selected_sceneType_index = "-1";
    });
  