class ExerciseTextOrTranslate {
  constructor(labelText, idTextarea, rows) {
    this.Div = document.createElement("div");
    this.Label = document.createElement("label");
    this.textarea = document.createElement("textarea");

    this.Div.classList.add("form-group");
    this.Div.classList.add("group-element");
    this.Div.style.marginTop = "20px";

    this.Label.classList.add("label-course");
    this.Label.classList.add("col-lg-3");
    this.Label.innerHTML = labelText;
    this.textarea.classList.add("form-control");
    this.textarea.classList.add("under-label");
    this.textarea.id = idTextarea;
    this.textarea.rows = rows;
  }
  appendTo(container) {
    this.Div.appendChild(this.Label);
    this.Div.appendChild(this.textarea);
    container.appendChild(this.Div);
  }
  toString() {
    return "Done";
  }
}

/// Media Object Classes

class MediaObject {
  constructor() {
    // create HTML objects
    this.MainDiv = document.createElement("div");
    this.titleLabel = document.createElement("label");
    this.checkBoxDiv = document.createElement("div");
    this.checkBoxLabel = document.createElement("label");
    this.checkBoxInput = document.createElement("input");
    this.checkBoxSpan = document.createElement("span");
    this.hasListner = false;
  }

  AssingNamesAndAttr(
    subSectionTitle,
    checkBoxTitle,
    checkBoxLabelId,
    checkBoxId
  ) {
    //create Texts
    this.titleLabel.innerHTML = subSectionTitle;
    this.checkBoxSpan.innerHTML = checkBoxTitle;

    // Assign Atrributes to Html objects
    this.titleLabel.classList.add("label-course");
    this.titleLabel.classList.add("col-lg-3");

    this.checkBoxLabel.id = checkBoxLabelId;

    this.checkBoxDiv.classList.add("form-control");
    this.checkBoxDiv.classList.add("under-label");

    this.checkBoxInput.id = checkBoxId;
    this.checkBoxInput.type = "checkbox";

    this.checkBoxSpan.style.fontSize = "1.5rem";
    this.checkBoxSpan.style.color = "rgb(68, 67, 67)";
  }
  Build() {
    this.MainDiv.appendChild(this.titleLabel);
    this.MainDiv.appendChild(this.checkBoxDiv);

    this.checkBoxDiv.appendChild(this.checkBoxLabel);
    this.checkBoxLabel.appendChild(this.checkBoxInput);
    this.checkBoxLabel.appendChild(this.checkBoxSpan);
  }
  ReturnContainerDiv() {
    return this.MainDiv;
  }
  addHiddenDiv(HiddenDiv) {
    this.HiddenDiv = HiddenDiv;
    // console.log(this.HiddenDiv.id);
    this.MainDiv.appendChild(HiddenDiv);
  }
  addListener(obj) {
    $(`#${obj.checkBoxInput.id}`).click(function () {
      // console.log("entered function checkbox click");

      if ($(`#${obj.checkBoxInput.id}`).is(":checked")) {
        // document.getElementById(obj.HiddenDiv.id).classList.add("shown-tab");
        document
          .getElementById(obj.HiddenDiv.id)
          .classList.remove("hidden-tab");
      } else {
        // document.getElementById(obj.HiddenDiv.id).classList.remove("shown-tab");
        document.getElementById(obj.HiddenDiv.id).classList.add("hidden-tab");
      }
    });
  }

  toString() {
    console.log(this);
  }
}

class HiddenMediaDiv {
  constructor() {
    this.mainHiddenDiv = document.createElement("div");
    this.containerHiddenDiv = document.createElement("div");
    this.labelTitleHiddenDive = document.createElement("label");
    this.textareaHiddenDiv = document.createElement("textarea");
    this.radioContainerDiv = document.createElement("div");
  }

  AssingNamesAndAttr(mainHiddenDivId, TitleOfHiddenDiv, textareaId) {
    this.mainHiddenDiv.id = mainHiddenDivId;
    this.mainHiddenDiv.classList.add("hidden-tab");

    this.containerHiddenDiv.classList.add("form-group");
    this.containerHiddenDiv.classList.add("group-element");
    this.containerHiddenDiv.style.marginTop = "30px";

    this.labelTitleHiddenDive.classList.add("label-hidden");
    this.labelTitleHiddenDive.classList.add("col-lg-2");
    this.labelTitleHiddenDive.textContent = TitleOfHiddenDiv;

    this.textareaHiddenDiv.classList.add("form-control");
    this.textareaHiddenDiv.classList.add("control-hidden");
    this.textareaHiddenDiv.id = textareaId;
    this.textareaHiddenDiv.rows = 3;

    this.radioContainerDiv.classList.add("form-control");
    this.radioContainerDiv.classList.add("control-hidden");
  }

  AddRadioOfHiddenMediaDiv(RadioElements) {
    this.radioContainerDiv.appendChild(RadioElements);
    // console.log(this.radioContainerDiv);
    // console.log(this.containerHiddenDiv);
  }

  Build() {
    this.mainHiddenDiv.appendChild(this.containerHiddenDiv);
    this.containerHiddenDiv.appendChild(this.labelTitleHiddenDive);
    this.containerHiddenDiv.appendChild(this.textareaHiddenDiv);
    this.containerHiddenDiv.appendChild(this.radioContainerDiv);
  }
  ReturnContainerDiv() {
    // console.log(this.mainHiddenDiv);
    return this.mainHiddenDiv;
  }
}

class RadioOfHiddenMediaDiv {
  constructor() {
    this.labelRadio = document.createElement("label");
    this.inputRadio = document.createElement("input");
    this.spanRadio = document.createElement("span");
  }
  AssingNamesAndAttr(radioButtonName, RadioId, RadioTitle) {
    this.labelRadio.classList.add("radio-margin");
    this.inputRadio.type = "radio";
    this.inputRadio.name = radioButtonName;
    this.inputRadio.id = RadioId;
    this.spanRadio.style.fontSize = "2rem";
    this.spanRadio.style.color = "rgb(68, 67, 67)";
    this.spanRadio.textContent = RadioTitle;
  }
  Build() {
    this.labelRadio.appendChild(this.inputRadio);
    this.labelRadio.appendChild(this.spanRadio);
    // console.log(this.labelRadio);
  }
  ReturnContainerDiv() {
    return this.labelRadio;
  }
}

////////////////////// Organize Statements Class ////////////////////////////////////
class OrganizeStatements {
  constructor() {
    this.divWarning = document.createElement("div");
    this.labelWarning = document.createElement("label");
    this.divOrganizeInsertStatement = document.createElement("div");
    this.labelOrganizeInsertStatement = document.createElement("label");
    this.textOrganizeInsertStatement = document.createElement("input");
    this.divOverall = document.createElement("div");
    this.insertOrganizeStatement = document.createElement("a");
  }
  AssingNamesAndAttr() {
    this.divWarning.id = "div-label-warning";
    this.divWarning.classList.add("form-group");
    this.divWarning.classList.add("group-element");

    this.labelWarning.id = "id-label-warning";
    this.labelWarning.classList.add("label-war");
    this.labelWarning.classList.add("col-lg-12");
    this.labelWarning.textContent = "الرجاء ادخال العبارات بالترتيب الصحيح";

    this.divOrganizeInsertStatement.id = "div-org-statement";
    this.divOrganizeInsertStatement.classList.add("form-group");
    this.divOrganizeInsertStatement.classList.add("group-element");

    this.labelOrganizeInsertStatement.classList.add("label-course");
    this.labelOrganizeInsertStatement.classList.add("col-lg-3");
    this.labelOrganizeInsertStatement.textContent = "أدخل العبارة";

    this.textOrganizeInsertStatement.id = "id-org-statement";
    this.textOrganizeInsertStatement.type = "text";
    this.textOrganizeInsertStatement.classList.add("form-control");
    this.textOrganizeInsertStatement.classList.add("under-label");

    this.insertOrganizeStatement.id = "id-insert";
    this.insertOrganizeStatement.classList.add("statement-btn");
    this.insertOrganizeStatement.innerHTML = " موافق ";
    this.insertOrganizeStatement.style.color = "#fff";
  }
  Build() {
    this.divWarning.appendChild(this.labelWarning);
    this.divOrganizeInsertStatement.appendChild(
      this.labelOrganizeInsertStatement
    );
    this.divOrganizeInsertStatement.appendChild(
      this.textOrganizeInsertStatement
    );
    this.divOrganizeInsertStatement.appendChild(this.insertOrganizeStatement);
    this.divOverall.appendChild(this.divWarning);
    this.divOverall.appendChild(this.divOrganizeInsertStatement);
  }
  ReturnContainerDiv() {
    return this.divOverall;
  }
}

////////////////////// common Class statement ////////////////////////////////////

class CommonClassStatements {
  constructor() {
    this.divCommonStatement = document.createElement("div");
    this.labelCommonStatement = document.createElement("label");
    this.textCommonStatement = document.createElement("input");
    this.insertCommonStatement = document.createElement("a");
  }
  AssingNamesAndAttr() {
    this.divCommonStatement.id = "div-common-statement";
    this.divCommonStatement.classList.add("form-group");
    this.divCommonStatement.classList.add("group-element");

    this.labelCommonStatement.classList.add("label-course");
    this.labelCommonStatement.classList.add("col-lg-3");
    this.labelCommonStatement.textContent = "أدخل العبارة";

    this.textCommonStatement.id = "id-common-statement";
    this.textCommonStatement.type = "text";
    this.textCommonStatement.classList.add("form-control");
    this.textCommonStatement.classList.add("under-label");

    this.insertCommonStatement.id = "id-insert";
    this.insertCommonStatement.classList.add("statement-btn");
    this.insertCommonStatement.innerHTML = " موافق ";
    this.insertCommonStatement.style.color = "#fff";
  }
  Build() {
    this.divCommonStatement.appendChild(this.labelCommonStatement);
    this.divCommonStatement.appendChild(this.textCommonStatement);
    this.divCommonStatement.appendChild(this.insertCommonStatement);
  }
  ReturnContainerDiv() {
    return this.divCommonStatement;
  }
}

////////////////////// Fill in blank Class statement ////////////////////////////////////
class FillinBlankStatement {
  constructor() {
    this.divFillinBlankStatement = document.createElement("div");
    this.labelFillinBlankStatement = document.createElement("label");
    this.insertEmptyFillingBlankStatement = document.createElement("a");
    this.inputFillinBlankStatement = document.createElement("input");
    this.insertFillingBlankStatement = document.createElement("a");

    // this.divRadioDraggable = document.createElement("div");
    // this.labelRadioDraggable = document.createElement("label");
    // this.radioDraggable = document.createElement("input");
    // this.spanDraggable = document.createElement("span");

    // this.labelRadioWrite = document.createElement("label");
    // this.radioWrite = document.createElement("input");
    // this.spanWrite = document.createElement("span");
  }
  AssingNamesAndAttr() {
    this.divFillinBlankStatement.id = "div-FiB-statement";
    this.divFillinBlankStatement.classList.add("form-group");
    this.divFillinBlankStatement.classList.add("group-element");

    this.labelFillinBlankStatement.classList.add("label-course");
    this.labelFillinBlankStatement.classList.add("col-lg-3");
    this.labelFillinBlankStatement.textContent = "أدخل العبارة";

    this.insertEmptyFillingBlankStatement.id = "id-insert-empty";
    this.insertEmptyFillingBlankStatement.classList.add("btn");
    this.insertEmptyFillingBlankStatement.classList.add("btn-info");
    this.insertEmptyFillingBlankStatement.textContent = "أدخل فراغ";

    this.inputFillinBlankStatement.type = "text";
    this.inputFillinBlankStatement.id = "id-FiB-statement";
    this.inputFillinBlankStatement.classList.add("form-control");
    this.inputFillinBlankStatement.classList.add("under-label");

    this.insertFillingBlankStatement.id = "id-insert";
    this.insertFillingBlankStatement.classList.add("statement-btn");
    this.insertFillingBlankStatement.innerHTML = " موافق ";
    this.insertFillingBlankStatement.style.color = "#fff";

    // this.divRadioDraggable.classList.add("form-control");
    // this.divRadioDraggable.classList.add("control-hidden");

    // this.labelRadioDraggable.classList.add("radio-margin");

    // this.radioDraggable.id = "id-draggable";
    // this.radioDraggable.name = "FiB-DraggableOrWrite";
    // this.radioDraggable.type = "radio";
    // this.spanDraggable.style.fontSize = "2rem";
    // this.spanDraggable.style.color = "rgb(68, 67, 67)";
    // this.spanDraggable.textContent = "سحب وادراج";

    // this.labelRadioWrite.classList.add("radio-margin");

    // this.radioWrite.id = "id-draggable";
    // this.radioWrite.name = "FiB-DraggableOrWrite";
    // this.radioWrite.type = "radio";
    // this.spanWrite.style.fontSize = "2rem";
    // this.spanWrite.style.color = "rgb(68, 67, 67)";
    // this.spanWrite.textContent = "ادخال كتابي";
  }
  Build() {
    this.divFillinBlankStatement.appendChild(this.labelFillinBlankStatement);
    this.divFillinBlankStatement.appendChild(this.inputFillinBlankStatement);
    // this.divFillinBlankStatement.appendChild(this.divRadioDraggable);
    this.divFillinBlankStatement.appendChild(this.insertFillingBlankStatement);

    this.labelFillinBlankStatement.appendChild(
      this.insertEmptyFillingBlankStatement
    );

    // this.divRadioDraggable.appendChild(this.labelRadioDraggable);
    // this.divRadioDraggable.appendChild(this.labelRadioWrite);

    // this.labelRadioDraggable.appendChild(this.radioDraggable);
    // this.labelRadioDraggable.appendChild(this.spanDraggable);

    // this.labelRadioWrite.appendChild(this.radioWrite);
    // this.labelRadioWrite.appendChild(this.spanWrite);
  }
  ReturnContainerDiv() {
    return this.divFillinBlankStatement;
  }
}
////////////////////// DragDrop Class statement ////////////////////////////////////

class DragAndDropClassStatements {
  constructor() {
    this.divDragAndDropStatement = document.createElement("div");

    this.labelDragAndDropStatement1 = document.createElement("label");
    this.textDragAndDropStatement1 = document.createElement("input");

    this.labelDragAndDropStatement2 = document.createElement("label");
    this.textDragAndDropStatement2 = document.createElement("input");

    this.insertDragAndDropStatement = document.createElement("a");
    this.br = document.createElement("br");
  }
  AssingNamesAndAttr() {
    this.divDragAndDropStatement.id = "div-dragAnddrop1-statement";
    this.divDragAndDropStatement.classList.add("form-group");
    this.divDragAndDropStatement.classList.add("group-element");

    this.labelDragAndDropStatement1.classList.add("label-course");
    this.labelDragAndDropStatement1.classList.add("col-lg-3");
    this.labelDragAndDropStatement1.textContent = "أدخل العبارة";

    this.labelDragAndDropStatement2.classList.add("label-course");
    this.labelDragAndDropStatement2.classList.add("col-lg-3");
    this.labelDragAndDropStatement2.textContent = "أدخل العبارة المقابلة";

    this.textDragAndDropStatement1.id = "id-dragAnddrop1-statement";
    this.textDragAndDropStatement1.type = "text";
    this.textDragAndDropStatement1.classList.add("form-control");
    this.textDragAndDropStatement1.classList.add("under-label");

    this.textDragAndDropStatement2.id = "id-dragAnddrop2-statement";
    this.textDragAndDropStatement2.type = "text";
    this.textDragAndDropStatement2.classList.add("form-control");
    this.textDragAndDropStatement2.classList.add("under-label");

    this.insertDragAndDropStatement.id = "id-insert";
    this.insertDragAndDropStatement.classList.add("statement-btn");
    this.insertDragAndDropStatement.innerHTML = " موافق ";
    this.insertDragAndDropStatement.style.color = "#fff";
  }
  Build() {
    this.divDragAndDropStatement.appendChild(this.labelDragAndDropStatement1);
    this.divDragAndDropStatement.appendChild(this.textDragAndDropStatement1);
    this.divDragAndDropStatement.appendChild(this.br);
    this.divDragAndDropStatement.appendChild(this.labelDragAndDropStatement2);
    this.divDragAndDropStatement.appendChild(this.textDragAndDropStatement2);

    this.divDragAndDropStatement.appendChild(this.insertDragAndDropStatement);
  }
  ReturnContainerDiv() {
    return this.divDragAndDropStatement;
  }
}

////////////////////// Catagories Class statement ////////////////////////////////////

class CatagoriesClassStatements {
  constructor() {
    this.divOverall = document.createElement("div");
    this.br = document.createElement("br");
    this.selectedItem = "";
    this.labelCategory = document.createElement("label");

    this.divCategorylist = document.createElement("div");

    this.buttonIndexlist = [];

    this.divCategoryinput = document.createElement("div");
    this.textCategory = document.createElement("input");

    this.divButtonns = document.createElement("div");
    this.addCategoryButton = document.createElement("button");
    this.deleteCategoryButton = document.createElement("button");

    // this.divListCategory = document.createElement("div");
    // this.ulListCategory = document.createElement("ul");
    // this.ilListTitle = document.createElement("il");
    // this.deleteCategory = document.createElement("a");
    // this.divButtons = document.createElement("div");

    this.divCategoryStatement = document.createElement("div");
    this.labelCategoryStatement = document.createElement("label");
    this.inputCategoryStatement = document.createElement("input");

    // this.divSelectCategory = document.createElement("div");
    // this.selectCategory = document.createElement("select");
    this.insertCategoryStatement = document.createElement("a");
  }
  AssingNamesAndAttr() {
    this.divOverall.classList.add("list-col");

    this.labelCategory.classList.add("label-course");
    this.labelCategory.classList.add("col-lg-3");
    this.labelCategory.textContent = "إدخال التصنيف";

    this.divCategorylist.id = "div-category-list";
    // this.divCategorylist.classList.add("form-control");

    this.divCategorylist.classList.add("list-group");
    this.divCategorylist.classList.add("col-lg-12");
    this.divCategorylist.classList.add("align-self-end");
    this.divCategorylist.classList.add("list_background");
    this.divCategorylist.style.scrollBehavior = "auto";
    this.divCategorylist.style.textAlign = "right";

    this.divCategoryinput.classList.add("input-group");
    this.divCategoryinput.classList.add("mb-3");

    this.textCategory.id = "id-category";
    this.textCategory.type = "text";
    this.textCategory.classList.add("form-control");
    this.textCategory.classList.add("input-concepts");
    this.textCategory.style.direction = "rtl";
    this.textCategory.style.fontSize = "larger";
    this.textCategory.placeholder = "إدخال التصنيف";
    // this.textCategory.aria.label = "إدخال التصنيف";

    this.divButtonns.id = "div-add-delete-category";
    this.divButtonns.classList.add("input-group-append");

    this.addCategoryButton.id = "id-add-category";
    this.addCategoryButton.classList.add("btn");
    this.addCategoryButton.classList.add("btn-outline-success");
    this.addCategoryButton.textContent = "اضافة";

    this.deleteCategoryButton.id = "id-delete-category";
    this.deleteCategoryButton.classList.add("btn");
    this.deleteCategoryButton.classList.add("btn-outline-danger");
    this.deleteCategoryButton.textContent = "حذف";

    // this.deleteCategory.id = "id-delete-category";
    // this.deleteCategory.classList.add("statement-btn");
    // this.deleteCategory.innerHTML = " حذف ";
    // this.deleteCategory.style.color = "#fff";

    this.inputCategoryStatement.id = "id-category-statement";
    this.inputCategoryStatement.type = "text";
    this.inputCategoryStatement.classList.add("form-control");
    this.inputCategoryStatement.classList.add("input-concepts");
    this.inputCategoryStatement.style.direction = "rtl";
    this.inputCategoryStatement.style.fontSize = "larger";
    this.inputCategoryStatement.placeholder = "أدخل العبارة";

    this.divCategoryStatement.id = "div-category-statement";
    this.divCategoryStatement.classList.add("form-group");
    this.divCategoryStatement.classList.add("group-element");

    this.labelCategoryStatement.classList.add("label-course");
    this.labelCategoryStatement.classList.add("col-lg-3");
    this.labelCategoryStatement.textContent = "أدخل العبارة";

    // this.divSelectCategory.classList.add("form-group");
    // this.divSelectCategory.classList.add("group-element");

    // this.selectCategory.id = "id-select-category";
    // this.selectCategory.classList.add("form-control");
    // this.selectCategory.classList.add("under-label");

    this.insertCategoryStatement.id = "id-delete-category";
    this.insertCategoryStatement.classList.add("statement-btn");
    this.insertCategoryStatement.innerHTML = " موافق ";
    this.insertCategoryStatement.style.color = "#fff";
  }
  Build() {
    this.divOverall.appendChild(this.labelCategory);

    this.divOverall.appendChild(this.divCategorylist);
    this.divOverall.appendChild(this.divCategoryinput);
    this.divOverall.appendChild(this.divCategoryStatement);

    this.divCategoryinput.appendChild(this.textCategory);
    this.divCategoryinput.appendChild(this.divButtonns);

    this.divButtonns.appendChild(this.addCategoryButton);
    this.divButtonns.appendChild(this.deleteCategoryButton);

    this.divCategoryStatement.appendChild(this.labelCategoryStatement);
    this.divCategoryStatement.appendChild(this.inputCategoryStatement);
    // this.divCategoryStatement.appendChild(this.divSelectCategory);
    this.divCategoryStatement.appendChild(this.insertCategoryStatement);
    // this.ulListCategory.appendChild(this.ilListTitle);
    // this.divSelectCategory.appendChild(this.selectCategory);
  }

  ReturnContainerDiv() {
    return this.divOverall;
  }
}

/* ############################### Main Tab Section ###################################  */

/* ############################### Hidden Tab Section ################################### */

// click on scene type
$(".select-scene-click").click(function () {
  let sceneTypeNumber = $(this).val();
  // console.log(this);
  let scenetype = this.textContent;

  // console.log(scenetype);
  // console.log(sceneTypeNumber);

  document.getElementById("id-scene-selected").innerHTML = scenetype;

  openSceneType(scenetype, sceneTypeNumber);
});

function openSceneType(scenetype, sceneTypeNumber) {
  // console.log("entered openSceneType " + scenetype);
  let idScene = "S-type-" + sceneTypeNumber;
  // console.log(idScene);
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";

    if (sceneTypeNumber != 3) {
      while (tabcontent[i].firstChild) {
        tabcontent[i].removeChild(tabcontent[i].lastChild);
      }
    }
  }

  // tablinks = document.getElementsByClassName("tablinks");
  // for (i = 0; i < tablinks.length; i++) {
  //   tablinks[i].className = tablinks[i].className.replace(" active", "");
  // }

  const selectedSceneTab = document.getElementById(idScene);
  selectedSceneTab.style.display = "block";

  const sceneTitle = document.createTextNode("المشهد: " + scenetype);

  selectedSceneTab.appendChild(sceneTitle);

  /////////////////////////////////////////////
  const QuestionSection = document.createElement("Section");
  QuestionSection.classList.add("genSection");
  selectedSceneTab.appendChild(QuestionSection);

  const newExerciseText = new ExerciseTextOrTranslate(
    "صيغة السؤال",
    "id-ExerciseText",
    3
  );

  newExerciseText.appendTo(QuestionSection);

  const newExerciseTranslate = new ExerciseTextOrTranslate(
    "ترجمة السؤال",
    "id-Translation",
    3
  );

  newExerciseTranslate.appendTo(QuestionSection);

  const newExerciseHintText = new ExerciseTextOrTranslate(
    "مساعدة",
    "id-ExerciseHint-text",
    1
  );

  newExerciseHintText.appendTo(QuestionSection);

  const newExercisePreviousHelp = new ExerciseTextOrTranslate(
    "مراجعات سابقة",
    "id-ExerciseHint-Previous-help",
    3
  );

  newExercisePreviousHelp.appendTo(QuestionSection);

  ////////////////////////// Media Object ////////////////////////////
  const MediaSection = document.createElement("Section");
  MediaSection.classList.add("genSection");
  selectedSceneTab.appendChild(MediaSection);

  //**************************Pic Media Object******************************** */
  const newPicMedia = new MediaObject();
  const newPicHiddenMedia = new HiddenMediaDiv();

  newPicMedia.AssingNamesAndAttr(
    "صورة",
    "ادخال الصورة",
    "id-main-pic-label",
    "id-main-pic-checkbox"
  );

  newPicHiddenMedia.AssingNamesAndAttr(
    "div-pic-hidden",
    "وصف الصورة",
    "id-main-pic-des"
  );

  // 2 Options for Pic types
  const newRadioOfPicHiddenMediaDiv1 = new RadioOfHiddenMediaDiv();
  const newRadioOfPicHiddenMediaDiv2 = new RadioOfHiddenMediaDiv();

  newRadioOfPicHiddenMediaDiv1.AssingNamesAndAttr(
    "main-photo-type",
    "id-main-photo-type-photo",
    "تصوير فوتوغرافي"
  );
  newRadioOfPicHiddenMediaDiv2.AssingNamesAndAttr(
    "main-photo-type",
    "id-main-photo-type-drawing",
    "رسومات"
  );

  newPicMedia.Build();
  newPicHiddenMedia.Build();
  newRadioOfPicHiddenMediaDiv1.Build();
  newRadioOfPicHiddenMediaDiv2.Build();

  MediaSection.appendChild(newPicMedia.ReturnContainerDiv());
  newPicMedia.addHiddenDiv(newPicHiddenMedia.ReturnContainerDiv());

  newPicHiddenMedia.AddRadioOfHiddenMediaDiv(
    newRadioOfPicHiddenMediaDiv1.ReturnContainerDiv()
  );
  newPicHiddenMedia.AddRadioOfHiddenMediaDiv(
    newRadioOfPicHiddenMediaDiv2.ReturnContainerDiv()
  );

  newPicMedia.addListener(newPicMedia);
  //**************************EndOf Pic Media Object******************************** */
  //**************************Recorded Sound Media Object******************************** */

  const newRecordedSoundMedia = new MediaObject();
  const newRecordedSoundHiddenMedia = new HiddenMediaDiv();

  newRecordedSoundMedia.AssingNamesAndAttr(
    "النص الصوتي",
    "ادخال النص الصوتي",
    "id-main-sound-label",
    "id-main-sound-checkbox"
  );

  newRecordedSoundHiddenMedia.AssingNamesAndAttr(
    "div-sound-hidden",
    "وصف النص الصوتي",
    "id-main-sound-des"
  );

  newRecordedSoundMedia.Build();
  newRecordedSoundHiddenMedia.Build();

  MediaSection.appendChild(newRecordedSoundMedia.ReturnContainerDiv());
  newRecordedSoundMedia.addHiddenDiv(
    newRecordedSoundHiddenMedia.ReturnContainerDiv()
  );

  newRecordedSoundMedia.addListener(newRecordedSoundMedia);

  //**************************EndOf Recorded Sound Media Object******************************** */

  //**************************Sound Effect Media Object******************************** */

  const newSoundEffectMedia = new MediaObject();
  const newSoundEffectHiddenMedia = new HiddenMediaDiv();

  newSoundEffectMedia.AssingNamesAndAttr(
    "الؤثرات الصوتية",
    "ادخال المؤثرات الصوتية",
    "id-main-soundeffect-label",
    "id-main-soundeffect-checkbox"
  );

  newSoundEffectHiddenMedia.AssingNamesAndAttr(
    "div-soundeffect-hidden",
    "وصف المؤثرات الصوتية",
    "id-main-soundeffect-des"
  );

  newSoundEffectMedia.Build();
  newSoundEffectHiddenMedia.Build();

  MediaSection.appendChild(newSoundEffectMedia.ReturnContainerDiv());
  newSoundEffectMedia.addHiddenDiv(
    newSoundEffectHiddenMedia.ReturnContainerDiv()
  );

  newSoundEffectMedia.addListener(newSoundEffectMedia);

  //**************************EndOf Sound Effect Media Object******************************** */
  //**************************Video Media Object******************************** */
  const newVideoMedia = new MediaObject();
  const newVideoHiddenMedia = new HiddenMediaDiv();

  newVideoMedia.AssingNamesAndAttr(
    "الفيديو",
    "ادخال الفيديو",
    "id-main-video-label",
    "id-main-video-checkbox"
  );

  newVideoHiddenMedia.AssingNamesAndAttr(
    "div-video-hidden",
    "وصف الفيديو",
    "id-main-video-des"
  );

  // 3 Options for Video types
  const newRadioOfVideoHiddenMediaDiv1 = new RadioOfHiddenMediaDiv();
  const newRadioOfVideoHiddenMediaDiv2 = new RadioOfHiddenMediaDiv();
  const newRadioOfVideoHiddenMediaDiv3 = new RadioOfHiddenMediaDiv();

  newRadioOfVideoHiddenMediaDiv1.AssingNamesAndAttr(
    "main-video-type",
    "id-main-video-type-photographic",
    "تصوير فوتوغرافي"
  );
  newRadioOfVideoHiddenMediaDiv2.AssingNamesAndAttr(
    "main-video-type",
    "id-main-video-type-animation",
    "أنيماشن"
  );

  newRadioOfVideoHiddenMediaDiv3.AssingNamesAndAttr(
    "main-video-type",
    "id-main-video-type-slideshow",
    "عرض صور مع صوت"
  );

  newVideoMedia.Build();
  newVideoHiddenMedia.Build();
  newRadioOfVideoHiddenMediaDiv1.Build();
  newRadioOfVideoHiddenMediaDiv2.Build();
  newRadioOfVideoHiddenMediaDiv3.Build();

  MediaSection.appendChild(newVideoMedia.ReturnContainerDiv());
  newVideoMedia.addHiddenDiv(newVideoHiddenMedia.ReturnContainerDiv());

  newVideoHiddenMedia.AddRadioOfHiddenMediaDiv(
    newRadioOfVideoHiddenMediaDiv1.ReturnContainerDiv()
  );
  newVideoHiddenMedia.AddRadioOfHiddenMediaDiv(
    newRadioOfVideoHiddenMediaDiv2.ReturnContainerDiv()
  );

  newVideoHiddenMedia.AddRadioOfHiddenMediaDiv(
    newRadioOfVideoHiddenMediaDiv3.ReturnContainerDiv()
  );
  newVideoMedia.addListener(newVideoMedia);

  //**************************EndOf Video Media Object******************************** */
  //**************************Read Text Media Object******************************** */

  const newTextMedia = new MediaObject();
  const newTextHiddenMedia = new HiddenMediaDiv();

  newTextMedia.AssingNamesAndAttr(
    "نصوص القراءة",
    "ادخال نصوص القراءة",
    "id-main-text-label",
    "id-main-text-checkbox"
  );

  newTextHiddenMedia.AssingNamesAndAttr(
    "div-text-hidden",
    "وصف النص المقروء",
    "id-main-text-des"
  );

  newTextMedia.Build();
  newTextHiddenMedia.Build();

  MediaSection.appendChild(newTextMedia.ReturnContainerDiv());
  newTextMedia.addHiddenDiv(newTextHiddenMedia.ReturnContainerDiv());

  newTextMedia.addListener(newTextMedia);

  //**************************EndOf Read Text Media Object******************************** */
  ////////////////////////////////////////////
  const StatementSection = document.createElement("Section");
  StatementSection.classList.add("genSection");
  selectedSceneTab.appendChild(StatementSection);
  console.log(scenetype.trim());

  switch (scenetype.trim()) {
    case "تمرين صح أم خطأ":
    case "تمرين خيارات متعددة":
    case "تمرين ترتيب الأحرف":
      const newCommonStatement = new CommonClassStatements();
      newCommonStatement.AssingNamesAndAttr();
      newCommonStatement.Build();
      StatementSection.appendChild(newCommonStatement.ReturnContainerDiv());
      newCommonStatement.insertCommonStatement.addEventListener(
        "click",
        function () {
          console.log("Listner Added to Common button");
        }
      );

      break;
    case "تمرين توصيل":
      const newDragAndDropStatement = new DragAndDropClassStatements();
      newDragAndDropStatement.AssingNamesAndAttr();
      newDragAndDropStatement.Build();
      StatementSection.appendChild(
        newDragAndDropStatement.ReturnContainerDiv()
      );
      newDragAndDropStatement.insertDragAndDropStatement.addEventListener(
        "click",
        function () {
          console.log("Listner added to DragAndDrop button");
        }
      );

      break;

    case "تمرين املأ الفراغ":
      const newFillinBlankStatement = new FillinBlankStatement();
      newFillinBlankStatement.AssingNamesAndAttr();
      newFillinBlankStatement.Build();
      StatementSection.appendChild(
        newFillinBlankStatement.ReturnContainerDiv()
      );
      newFillinBlankStatement.insertEmptyFillingBlankStatement.addEventListener(
        "click",
        function () {
          console.log(document.getElementById("id-FiB-statement").innerHTML);
          let contentTxt = document.getElementById("id-FiB-statement").value;
          document.getElementById("id-FiB-statement").value =
            contentTxt + "  ... E ...  ";
        }
      );
      newFillinBlankStatement.insertFillingBlankStatement.addEventListener(
        "click",
        function () {
          console.log("Listner added to Fill in Blank button");
        }
      );
      break;

    case "تمرين تصنيف":
      const newCategoryStatement = new CatagoriesClassStatements();
      newCategoryStatement.AssingNamesAndAttr();
      newCategoryStatement.Build();

      StatementSection.appendChild(newCategoryStatement.ReturnContainerDiv());

      newCategoryStatement.addCategoryButton.addEventListener(
        "click",
        function () {
          const new_item = document.createElement("button");
          const new_item_txt = document.createTextNode(
            document.getElementById("id-category").value
          );

          newCategoryStatement.buttonIndexlist.push(
            newCategoryStatement.buttonIndexlist.length + 1
          );

          new_item.id =
            "id-category-button-" + newCategoryStatement.buttonIndexlist.length;

          new_item.type = "button";
          new_item.classList.add("list-group-item");
          new_item.classList.add("list-group-item-action");
          new_item.classList.add("list_buttons");

          // new_item.id = id_c;
          new_item.appendChild(new_item_txt);

          document.getElementById("div-category-list").appendChild(new_item);
          console.log(new_item.id);
          let buttonClickedInCategoryList = document.getElementById(
            new_item.id
          );

          buttonClickedInCategoryList.addEventListener("click", function () {
            newCategoryStatement.selectedItem = this.id;

            console.log(newCategoryStatement.selectedItem);
          });
        }
      );

      newCategoryStatement.deleteCategoryButton.addEventListener(
        "click",
        function () {
          // console.log(this);
          if (newCategoryStatement.selectedItem !== "") {
            const parentlist = document.getElementById("div-category-list");
            const buttonToBeRemoved = document.getElementById(
              newCategoryStatement.selectedItem
            );

            parentlist.removeChild(buttonToBeRemoved);
            s;
          }
        }
      );

      break;

    case "تمرين ترتيب جمل":
      // console.log(scenetype.trim());
      const newOrganizeStatements = new OrganizeStatements();
      newOrganizeStatements.AssingNamesAndAttr();
      newOrganizeStatements.Build();
      StatementSection.appendChild(newOrganizeStatements.ReturnContainerDiv());
      newOrganizeStatements.insertOrganizeStatement.addEventListener(
        "click",
        function () {
          console.log("Listner Added to Organize button");
        }
      );
      break;

    default:
      console.log("Hello");
  }

  ////////////////////////////////////////////
  const AnswerSection = document.createElement("Section");
  AnswerSection.classList.add("genSection");
  selectedSceneTab.appendChild(AnswerSection);

  ////////////////////////////////////////////
}

// //Media General - click on Picture
// $("#id-main-pic-label").click(function () {
//   // console.log("entered function checkbox click");

//   if ($("#id-main-pic-checkbox").is(":checked")) {
//     document.getElementById("div-pic-hidden").style.display = "block";
//   } else {
//     document.getElementById("div-pic-hidden").style.display = "none";
//   }
// });

// //Media General - click on Recorded Sound
// $("#id-main-sound-label").click(function () {
//   // console.log("entered function checkbox click");

//   if ($("#id-main-sound-checkbox").is(":checked")) {
//     document.getElementById("div-sound-hidden").style.display = "block";
//   } else {
//     document.getElementById("div-sound-hidden").style.display = "none";
//   }
// });

// //Media General - click on Sound effect
// $("#id-main-soundeffect-label").click(function () {
//   // console.log("entered function checkbox click");

//   if ($("#id-main-soundeffect-checkbox").is(":checked")) {
//     document.getElementById("div-soundeffect-hidden").style.display = "block";
//   } else {
//     document.getElementById("div-soundeffect-hidden").style.display = "none";
//   }
// });

// //Media General - click on text
// $("#id-main-text-label").click(function () {
//   // console.log("entered function checkbox click");

//   if ($("#id-main-text-checkbox").is(":checked")) {
//     document.getElementById("div-text-hidden").style.display = "block";
//   } else {
//     document.getElementById("div-text-hidden").style.display = "none";
//   }
// });

//Media General - click on insert empty
$("#id-insert-empty").click(function () {
  // console.log("entered function checkbox click");
  // console.log("Hello");
  let contentTxt = document.getElementById("id-statement").value;
  // console.log(contentTxt);
  document.getElementById("id-statement").value = contentTxt + " E ";
});

/* ############################### QTHint Section ################################### */
/* ############################### Media Section ################################### */
/* ############################### Statement & Answer Section ################################### */

// $("#div-multiChoices-s1-textDiv-answer1").slideUp();
// $("#div-multiChoices-s1-recordedSoundDiv-answer1").slideUp();
// $("#div-multiChoices-s1-picDiv-answer1").slideUp();
$(".itemSlide").slideUp();

createSlide(
  "#id-multiChoices-s1-textRadio-answer1",
  "#div-multiChoices-s1-textDiv-answer1",
  "click"
);

createSlide(
  "#id-multiChoices-s1-recordedSoundRadio-answer1",
  "#div-multiChoices-s1-recordedSoundDiv-answer1",
  "click"
);

createSlide(
  "#id-multiChoices-s1-picRadio-answer1",
  "#div-multiChoices-s1-picDiv-answer1",
  "click"
);

function createSlide(ItemEvent, ItemSlide, Eventname) {
  $(ItemEvent).on(Eventname, function () {
    // if (event.target.tagName === "LABEL") {
    //   event.preventDefault();
    // } else {
    $(ItemSlide).slideToggle();
    // }

    console.log("I'm inside checkbox click");
  });
}

// console.log($(".itemEventSlide").siblings("div"));
// createSlide();

// function createSlide() {
//   $(".itemEventSlide").on("click", function () {
//     console.log(this.siblings("div"));
//     $(".itemSlide").slideToggle();
//   });
// }

/* ############################### Footer Section ################################### */
