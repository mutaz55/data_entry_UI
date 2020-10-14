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

let selected_lesson_index = "-1";

// Skills
const btn_add_skill = document.querySelector("#add_skill");
const btn_remove_skill = document.querySelector("#remove_skill");
const lst_skills = document.querySelector("#id-skills");

let selected_skill_index = "-1";

// Scene Types
const btn_add_sceneType = document.querySelector("#add_sceneType");
const btn_remove_sceneType = document.querySelector("#remove_sceneType");
const lst_sceneTypes = document.querySelector("#id-sceneTypes");

let selected_sceneType_index = "-1";

//// Tab 2

const tab2Header = document.querySelector("#sceneInfoTab2");
// Scene
const btn_add_scene = document.querySelector("#add_sceneTitle");
const btn_remove_scene = document.querySelector("#remove_sceneTitle");
const lst_scenes = document.querySelector("#id-scenes");

let selected_scene_index = "-1";

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

const scene_skills = document.querySelector("#id-lst-skills");
const add_skill_scene = document.querySelector("#add_skill_to_scene");
const remove_skill_scene = document.querySelector("#remove_skill_from_scene");

// Lessons
const lst_lessons_tab2 = document.querySelector("#id-lessons-tab2");

// Send to teacher
const radiobtn_sendToTeacher = document.querySelector("#id-send-to-teacher");
const radiotbtn_sendToTeacherNot = document.querySelector(
  "#id-send-to-teacher-not"
);

// Book Type
const radiobtn_kursBuch = document.querySelector("#id-kursbook");
const radiobtn_arbeitsBuch = document.querySelector("#id-Arbeitbook");

///////////////////////////////////////////////////////////////
// Scene Type
const lst_sceneTypes_tab2 = document.querySelector("#lst_scenesType_tab2");

///

// Input fields - Course Description / Category
const txtbox_course_description = document.querySelector(
  "#id-course-description"
);
const radiobtn_course_category_paid = document.querySelector("#id-cat-paid");
const radiobtn_course_category_free = document.querySelector("#id-cat-free");

// Toast

function showError(msg) {
  M.toast({ html: msg, classes: "toast-style" });
}

///// Listener for Course Description and Category

txtbox_course_description.addEventListener("input", (e) => {
  if (Courses.length > 0) currentCourse.Description = e.target.value;
});

radiobtn_course_category_paid.addEventListener("change", () => {
  if (Courses.length > 0) currentCourse.Category = 1;
});

radiobtn_course_category_free.addEventListener("change", () => {
  if (Courses.length > 0) currentCourse.Category = 0;
});

/////
radiotbtn_sendToTeacherNot.addEventListener("change", () => {
  if (currentScene != undefined && currentScene != null) {
    SceneHeaders.find((sid) => sid.sceneID == currentScene).sendToTeacher = 0;
  }
});

radiobtn_sendToTeacher.addEventListener("change", () => {
  if (currentScene != undefined && currentScene != null) {
    SceneHeaders.find((sid) => sid.sceneID == currentScene).sendToTeacher = 1;
  }
});

radiobtn_arbeitsBuch.addEventListener("change", () => {
  if (currentScene != undefined && currentScene != null) {
    SceneHeaders.find((sid) => sid.sceneID == currentScene).BookType =
      "Workbook";
  }
});

radiobtn_kursBuch.addEventListener("change", () => {
  if (currentScene != undefined && currentScene != null) {
    SceneHeaders.find((sid) => sid.sceneID == currentScene).BookType = "Course";
  }
});

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

    fillSceneConcepts(
      Concepts.filter((con) => con.id == currentCourse.id),
      "concepts_lst"
    );

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
    addNewItemsTab2(txt_concept_entry, id_con_key, "concepts_lst", false);
    document.getElementById("txt_concept").value = "";
  }
  selected_concept_index = "-1";
});

// Select Module - and filter the lessons based on it
lst_modules_tab2.addEventListener("change", (e) => {
  //clearLessonsTab2();
  fillLessonsTab2(Lessons.filter((les) => les.ModuleID == getModuleValue()));

  clearScenesLst();
  currentScene = null;
  updateSceneView();
  if (lst_lessons_tab2.options.length > 0) {
    lst_lessons_tab2.dispatchEvent(new Event("change"));
  }
});

// Select Lesson - and filter scenes based on it
lst_lessons_tab2.addEventListener("change", (e) => {
  console.log("change");
  currentScene = null;
  updateSceneView();

  fillScenes(
    SceneHeaders.filter(
      (item) =>
        item.CourseID == currentCourse.id && item.LessonID == e.target.value
    )
  );

  if (lst_scenes.firstChild) {
    lst_scenes.firstChild.focus();
    lst_scenes.firstChild.dispatchEvent(new Event("click"));
  }
});

// Select Tab2
tab2Header.addEventListener("click", () => {});

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
      case "scenes_lst":
        selected_scene_index = id_c;
        currentScene = id_c;
        updateSceneView();
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

    case "scenes_lst":
      if (added) lst_scenes.appendChild(new_item);
      else lst_scenes.prepend(new_item);

      break;
  }

  return new_item;
}

// Clear lists
function clearConceptsLst() {
  removeAllChildNodes(lst_concepts);
  clearSceneConceptsLst();
}

function clearSceneConceptsLst() {
  lst_concepts_tab2.innerHTML = "";
}

function clearSceneSkillsLst() {
  removeAllChildNodes(lst_skills_tab2);
}

function clearSceneTypesTab2() {
  lst_sceneTypes_tab2.innerHTML = "";
}

function clearModulesLst() {
  removeAllChildNodes(lst_modules);

  removeAllChildNodes(lst_modules_tab2);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function clearLessonsLst() {
  lst_lessons.innerHTML = "";
  clearLessonsTab2();
}

function clearLessonsTab2() {
  lst_lessons_tab2.innerHTML = "";
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

function clearSceneTypes() {
  lst_sceneTypes.innerHTML = "";
  clearSceneTypesTab2();
}

function clearRdBtnTab2() {
  document.querySelector("#id-Arbeitbook").checked = false;
  document.querySelector("#id-kursbook").checked = false;
  radiobtn_sendToTeacher.checked = false;
  radiotbtn_sendToTeacherNot.checked = false;
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
    case "concepts_lst":
      if (added) lst_concepts_tab2.appendChild(newOption);
      else lst_concepts_tab2.prepend(newOption);
      break;
    case "skills_lst":
      if (added) lst_skills_tab2.appendChild(newOption);
      else lst_skills_tab2.prepend(newOption);
      break;
    case "scene_concepts":
      if (added) scene_concepts.appendChild(newOption);
      else scene_concepts.prepend(newOption);
      break;
    case "scene_skills":
      if (added) scene_skills.appendChild(newOption);
      else scene_skills.prepend(newOption);
      break;
    case "scene_types":
      if (added) lst_sceneTypes_tab2.appendChild(newOption);
      else lst_sceneTypes_tab2.prepend(newOption);
      break;
  }
}

function fillConcepts(con) {
  // Clear the previous session
  clearConceptsLst();

  if (con.length != 0) {
    con.forEach((element) => {
      addNewItems(
        element.ConceptText,
        element.ConceptID,
        "concepts_lst",
        false
      );
    });
    fillSceneConcepts(con, "concepts_lst");
  }

  selected_concept_index = "-1";
}

function fillSceneConcepts(con, type) {
  if (type == "concepts_lst") clearSceneConceptsLst();

  if (con.length != 0) {
    con.forEach((element) => {
      addNewItemsTab2(element.ConceptText, element.ConceptID, type, false);
    });
  }
}

function lst_skills_tab2_setIndex(indx) {
  if (lst_skills_tab2.options.length > 0)
    lst_skills_tab2.options[indx].selected = true;
}

function lst_concepts_tab2_setIndex(indx) {
  if (lst_concepts_tab2.options.length > 0)
    lst_concepts_tab2.options[indx].selected = true;
}

function lst_modules_tab2_setIndex(indx) {
  if (lst_modules_tab2.options.length > 0) {
    lst_modules_tab2.options[indx].selected = true;
    lst_modules_tab2.dispatchEvent(new Event("change"));
  }
}

function lst_lessons_tab2_setIndex(indx) {
  if (lst_lessons_tab2.options.length > 0)
    lst_lessons_tab2.options[indx].selected = true;
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

  selected_module_index = "-1";
}

function fillLessons(less) {
  // clear the previous session
  clearLessonsLst();

  if (less.length != 0) {
    less.forEach((element) => {
      addNewItems(element.LessonTitle, element.LessonID, "lessons_lst", false);
    });
    //fillLessonsTab2(Lessons.filter(les => les.ModuleID == lst_modules_tab2.options[0].value));
  }

  selected_lesson_index = "-1";
}

function fillLessonsTab2(less) {
  // clear the previous session
  clearLessonsTab2();

  if (less.length != 0) {
    less.forEach((element) => {
      addNewItemsTab2(
        element.LessonTitle,
        element.LessonID,
        "lessons_lst",
        true
      );
    });
    currentScene = null;
    updateSceneView();
    lst_lessons_tab2_setIndex(0);
  }
}

function fillScenes(sc) {
  // clear the previous session
  clearScenesLst();

  if (sc.length != 0) {
    sc.forEach((element) => {
      if (!element._deleted)
        addNewItems(element.sceneTitle, element.sceneID, "scenes_lst", false);
    });
  }
}

function fillSkills(sk) {
  // clear the previous session
  clearSkillsLst();

  if (sk.length != 0) {
    sk.forEach((element) => {
      const txt = `(${element.SkillID}) | ${element.SkillText}`;
      addNewItems(txt, element.SkillID, "skills_lst", false);
    });

    fillSceneSkills(sk, "skills_lst");

    lst_skills_tab2_setIndex(0);
  }

  selected_skill_index = "-1";
}

function fillSceneSkills(sk, type) {
  if (type == "skills_lst")
    // clear the previous session
    clearSceneSkillsLst();

  if (sk.length != 0) {
    sk.forEach((element) => {
      addNewItemsTab2(element.SkillText, element.SkillID, type, false);
    });
  }
}

function fillSceneTypesTab2(sk, type) {
  // clear the previous session
  clearSceneTypesTab2();

  if (sk.length != 0) {
    sk.forEach((element) => {
      addNewItemsTab2(element.SceneTypeDesc, element.SceneTypeID, type, false);
    });
  }
}

function fillSceneTypes(sceneT) {
  // clear the previous session
  clearSceneTypes();

  if (sceneT.length != 0) {
    sceneT.forEach((element) => {
      const txt = `(${element.SceneTypeID}) | ${element.SceneTypeDesc}`;
      addNewItems(txt, element.SceneTypeID, "sceneType_lst", false);
    });
  }

  if (sceneT.length != 0) {
    sceneT.forEach((element) => {
      const txt = `(${element.SceneTypeID}) | ${element.SceneTypeDesc}`;
      addNewItems(txt, element.SceneTypeID, "sceneType_lst", false);
    });

    fillSceneTypesTab2(sceneT, "scene_types");
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
  if (selected_module_index == -1) return;

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
      new Lesson(
        currentCourse.id,
        id_less_key,
        txt_lesson_entry,
        selected_module_index
      )
    );
    addNewItems(txt_lesson_entry, id_less_key, "lessons_lst", true).focus();
    addNewItemsTab2(txt_lesson_entry, id_less_key, "lessons_lst", true);
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

      Array.from(lst_lessons_tab2.options).forEach((element) => {
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

      fillSceneSkills(Skills, "skills_lst");
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

  if (
    txt_skill_entry != 0 &&
    txt_skill_code_entry != 0 &&
    !txt_skill_code_entry.match(/^\d/)
  ) {
    Skills.unshift(
      new Skill(txt_skill_code_entry, txt_skill_code_entry, txt_skill_entry)
    );
    const txt = `(${txt_skill_code_entry}) | ${txt_skill_entry}`;
    addNewItems(txt, txt_skill_code_entry, "skills_lst", true).focus();
    addNewItemsTab2(txt_skill_entry, txt_skill_code_entry, "skills_lst", false);
    document.getElementById("txt_skill").value = "";
    document.getElementById("txt_skill_code").value = "";
  }
  selected_skill_index = "-1";

  const firstChild = lst_skills.firstChild;
  if (firstChild != undefined) firstChild.focus();
});

// Add Skill (Button)
btn_add_skill.addEventListener("click", (e) => {
  const txt_skill_entry = document.getElementById("txt_skill").value;
  const txt_skill_code_entry = document.getElementById("txt_skill_code").value;

  if (
    txt_skill_entry != 0 &&
    txt_skill_code_entry != 0 &&
    !txt_skill_code_entry.match(/^\d/)
  ) {
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

      fillSceneTypesTab2(SceneTypes, "scene_types");
    }

    selected_sceneType_index = "-1";

    const firstChild = lst_sceneTypes.firstChild;
    if (firstChild != undefined) firstChild.focus();
  }
});

// Add SceneType (Button)
btn_add_sceneType.addEventListener("click", (e) => {
  const txt_sceneType_entry = document.getElementById("txt_sceneType").value;
  const txt_sceneType_code = document.getElementById("txt_sceneType_code")
    .value;

  if (
    txt_sceneType_entry != 0 &&
    txt_sceneType_code != 0 &&
    !txt_sceneType_code.match(/^\d/)
  ) {
    if (
      SceneTypes.find((st) => st.SceneTypeID == txt_sceneType_code) == undefined
    ) {
      SceneTypes.unshift(
        new SceneType(
          txt_sceneType_code,
          txt_sceneType_code,
          txt_sceneType_entry
        )
      );

      const txt = `(${txt_sceneType_code}) | ${txt_sceneType_entry}`;
      addNewItems(txt, txt_sceneType_code, "sceneType_lst", true).focus();
      addNewItemsTab2(
        txt_sceneType_entry,
        txt_sceneType_code,
        "scene_types",
        false
      );
      document.getElementById("txt_sceneType").value = "";
      document.getElementById("txt_sceneType_code").value = "";
    } else {
      showError("The Code is already used!");
    }
  }
  selected_sceneType_index = "-1";
});

// Add Scene (Button)
btn_add_scene.addEventListener("click", (e) => {
  if (getLessonValue() == null || getModuleValue() == null) {
    showError("No Lesson or Module selected!");
    return;
  }

  const txt_sceneTitle_entry = document.getElementById("txt_sceneTitle").value;

  if (txt_sceneTitle_entry != 0) {
    let id_scene = 1;

    if (
      SceneHeaders.filter(function (item) {
        return item.CourseID == currentCourse.id;
      }).length > 0
    ) {
      id_scene =
        Math.max.apply(
          Math,
          SceneHeaders.filter(function (item) {
            return item.CourseID == currentCourse.id;
          }).map(function (scene) {
            return scene.sceneID.substring(
              scene.sceneID.indexOf("S") + 1,
              scene.sceneID.length
            );
          })
        ) + 1;
    }

    let id_scene_key = currentCourse.CourseTitle + "S" + id_scene;
    currentScene = id_scene_key;
    SceneHeaders.push(
      new SceneHeader(
        currentCourse.id + "S" + id_scene,
        currentCourse.id,
        id_scene_key,
        getModuleValue(),
        getLessonValue(),
        txt_sceneTitle_entry,
        "",
        id_scene,
        "",
        "",
        "",
        true
      )
    );
    //************************* Code added by Taha to Create Empty Scene and push it to the SceneArray **************************************** */

    ScenesArray.push(createEmptyScene(id_scene_key));

    //***************************************************************************************************************************************** */
    addNewItems(txt_sceneTitle_entry, id_scene_key, "scenes_lst", true).focus();
    document.getElementById("txt_sceneTitle").value = "";
    updateSceneView();
  }

  selected_scene_index = "-1";
});

// Remove Scene (Button)
btn_remove_scene.addEventListener("click", (e) => {
  if (selected_scene_index != "-1") {
    const removed = document.querySelector(`#${selected_scene_index}`);

    if (removed != undefined) {
      lst_scenes.removeChild(removed);

      SceneHeaders.find(
        (st) => st.sceneID == selected_scene_index
      )._deleted = true;
    }

    selected_scene_index = "-1";

    const firstChild = lst_scenes.firstChild;
    if (firstChild != undefined) firstChild.focus();

    currentScene = null;
    updateSceneView();
  }
});

function getLessonValue() {
  if (lst_lessons_tab2.selectedIndex == -1) return null;
  else return lst_lessons_tab2.options[lst_lessons_tab2.selectedIndex].value;
}

function getModuleValue() {
  if (lst_modules_tab2.selectedIndex == -1) return null;
  else return lst_modules_tab2.options[lst_modules_tab2.selectedIndex].value;
}

function updateSceneView() {
  lbl_scene_no.textContent = "";
  textbox_scene_desc.value = "";
  scene_concepts.innerHTML = "";
  scene_skills.innerHTML = "";
  clearRdBtnTab2();
  lst_sceneTypes_tab2.selectedIndex = -1;

  if (currentScene != undefined && currentScene != null) {
    // retrieve the header of the current scene
    cScene = SceneHeaders.find((sid) => sid.sceneID == currentScene);

    // display the scene name
    lbl_scene_no.textContent =
      `${Modules.find((mid) => mid.ModuleID == cScene.ModuleID).ModuleTitle}` +
      ` < ${Lessons.find((ls) => ls.LessonID == cScene.LessonID).LessonTitle}` +
      ` < ${cScene.sceneTitle} [${SceneHeaders.length}] | ${cScene.sceneID}`;

    textbox_scene_desc.value = cScene.sceneDesc;

    fillSceneConcepts(cScene.Concepts, "scene_concepts");

    fillSceneSkills(cScene.Skills, "scene_skills");

    lst_sceneTypes_tab2.selectedIndex = getSceneTypeLstIndex(cScene);

    if (lst_sceneTypes_tab2.selectedIndex != -1) {
      document.querySelector("#id-scene-selected").innerHTML =
        lst_sceneTypes_tab2.options[lst_sceneTypes_tab2.selectedIndex].text;
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

// get the index of the stored scene type
function getSceneTypeLstIndex(sc) {
  for (let i = 0; i < lst_sceneTypes_tab2.options.length; i++) {
    if (lst_sceneTypes_tab2.options[i].value == sc.sceneTypeID) return i;
  }
  return -1;
}

///// Listener for Scene Description

textbox_scene_desc.addEventListener("input", (e) => {
  if (currentScene != undefined && currentScene != null) {
    SceneHeaders.find((st) => st.sceneID == currentScene).sceneDesc =
      e.target.value;
    SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
  }
});

// Add Concept to a scene
add_con_scene.addEventListener("click", (e) => {
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
      addNewItemsTab2(conTxt, conID, "scene_concepts", false);

      SceneHeaders.find((st) => st.sceneID == currentScene).Concepts.push(
        new Concept(currentCourse.id, conID, conTxt)
      );
      SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
    }
  }
});

// remove concept from a scene
remove_con_scene.addEventListener("click", (e) => {
  if (scene_concepts.selectedIndex != -1) {
    const conID = scene_concepts.options[scene_concepts.selectedIndex].value;
    scene_concepts.options[scene_concepts.selectedIndex].remove();

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
add_skill_scene.addEventListener("click", (e) => {
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
      addNewItemsTab2(skTxt, skID, "scene_skills", false);

      SceneHeaders.find((st) => st.sceneID == currentScene).Skills.push(
        new Skill(currentCourse.id, skID, skTxt)
      );
      SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
    }
  }
});

// remove skill from a scene
remove_skill_scene.addEventListener("click", (e) => {
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
  console.log(e.target.value);

  if (currentScene == undefined || currentScene == null) return;

  if (lst_sceneTypes_tab2.selectedIndex != -1) {
    SceneHeaders.find((st) => st.sceneID == currentScene).sceneTypeID =
      e.target.value;
    SceneHeaders.find((st) => st.sceneID == currentScene)._changed = true;
  }
});

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