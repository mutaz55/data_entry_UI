var CurrentSceneObject;
var currentSceneHeaderObj;

/* ############################### Tab 2 Select the Scene Type  ################################### */

// click on scene type
const selectedScene = document.querySelector("#lst_scenesType_tab2");
selectedScene.addEventListener("click", (e) => {
  if (e.target.tagName === "OPTION") {
    document.getElementById("id-scene-selected").innerHTML =
      e.target.textContent;

    document.getElementById("id-scene-code").innerHTML = e.target.value;
    //delete CurrentSceneObject;
    //console.log(CurrentSceneObject);
    // CurrentSceneObject = undefined;
  }
});

/* ############################### Tab 3 generate the scene  ################################### */

// click on tab #3 to generate the scene type

const clickOnTab3ToBuildScene = document.querySelector("#id-scene-deteils");
clickOnTab3ToBuildScene.addEventListener("click", () => {
  //**************************** Code to be changed to connect to Database ******************************

  currentSceneHeaderObj = SceneHeaders.find(
    (sid) => sid.sceneID == currentScene
  );

  CurrentSceneObject = ScenesArray.find((sid) => sid.id == currentScene);
  debugger;
  // if (currentSceneHeaderObj._new) {
  //*****************************************************************************************************

  // function Generate the question Text with hint Section and Call the function to create the Question
  openSceneType();
  // }
});

//**************************************************************************************************************** */
// function Generate the question Text with hint Section and Call the function to create the Question
function openSceneType() {
  let i, tabcontent;
  // Read the Scne type name in Arabic shown in the Tab 2 - Scene type
  let sceneType = document.getElementById("id-scene-selected").textContent;

  // clear the Tab 3 from Previous Elements
  tabcontent = document.getElementsByClassName("tabcontent"); // No need now there is only 1 Tab need to be modified
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    while (tabcontent[i].firstChild) {
      tabcontent[i].removeChild(tabcontent[i].lastChild);
    }
  }

  // Show the name of the Scene
  const selectedSceneTab = document.getElementById("scene-details");
  selectedSceneTab.style.display = "block";
  selectedSceneTab.appendChild(document.createTextNode("المشهد: " + sceneType));

  //////////////////// Question Text/Title Section /////////////////////////
  // make Section container
  const QuestionTitleSection = document.createElement("Section");
  QuestionTitleSection.classList.add("genSection");
  selectedSceneTab.appendChild(QuestionTitleSection);

  const newExerciseText = new ExerciseTextOrTranslate(
    "صيغة السؤال العامة",
    "id-ExerciseText",
    3
  );

  const newExerciseTranslate = new ExerciseTextOrTranslate(
    "ترجمة السؤال العامة",
    "id-Translation",
    3
  );

  const newExerciseHintText = new ExerciseTextOrTranslate(
    "مساعدة",
    "id-ExerciseHint-text",
    1
  );

  const newExercisePreviousHelp = new ExerciseTextOrTranslate(
    "مراجعات سابقة",
    "id-ExerciseHint-Previous-help",
    3
  );

  // *****************  Read Data of Question Title Section from Scene Data Object ***************/
  console.log(currentScene);
  console.log(CurrentSceneObject);
  newExerciseText.UpdateTextValueFromDatabase(CurrentSceneObject.exerciseText);

  newExerciseTranslate.UpdateTextValueFromDatabase(
    CurrentSceneObject.translation
  );

  newExerciseHintText.UpdateTextValueFromDatabase(
    CurrentSceneObject.exerciseHintObj.text
  );

  newExercisePreviousHelp.UpdateTextValueFromDatabase(
    CurrentSceneObject.exerciseHintObj.previousHelp.description
  );
  /***********************************************************************************************/
  let arrOfQuestionTitlesObjects = [];

  arrOfQuestionTitlesObjects.push(newExerciseText.ReturnContainerDiv());
  arrOfQuestionTitlesObjects.push(newExerciseTranslate.ReturnContainerDiv());
  arrOfQuestionTitlesObjects.push(newExerciseHintText.ReturnContainerDiv());
  arrOfQuestionTitlesObjects.push(newExercisePreviousHelp.ReturnContainerDiv());

  let arrOfQuestionTitlesNames = [
    "صيغة السؤال",
    "ترجمة السؤال",
    "مساعدة",
    "مراجعات سابقة",
  ];
  // console.log(arrOfQuestionTitlesObjects);

  let idsForQuestionTextTab = [];

  for (let i = 0; i < 4; i++) {
    idsForQuestionTextTab[i] = "id-tabContent-function-" + i;
  }

  let DeleteIcones = [false, false, false, false];
  QuestionTitleSection.appendChild(
    CreateTabFunction(
      "id-questionText-div",
      arrOfQuestionTitlesNames,
      arrOfQuestionTitlesObjects,
      idsForQuestionTextTab,
      DeleteIcones
    )
  );

  ///////////////////// Add Questions  /////////////////////////
  //create Question Section container
  const QuestionSection = document.createElement("section");
  QuestionSection.classList.add("genSection");
  selectedSceneTab.appendChild(QuestionSection);

  //**** create Button Add Question
  let AddQuestionButton = createButton("id-add-question", "اضافة سؤال فرعي");

  let divQuestionButton = document.createElement("div");
  divQuestionButton.appendChild(AddQuestionButton);
  divQuestionButton.classList.add("questionDiv");

  QuestionSection.appendChild(divQuestionButton);

  //****** Create Questions Tabs and First Question first time ***********/
  // create Questions Tabs (Initialiazation as per the Scene Data Object)

  // Read number of Questions from Scene Data Object
  let numberOfQuestion = CurrentSceneObject.questions.length;
  let questionContentTabsId = [];
  let tabTitle = [];
  let arrDeleteIconShow = [];
  let QuestionTabContent = [];
  let idContentTab = "";
  for (i = 0; i < numberOfQuestion; i++) {
    idContentTab = "id-question-tab-" + (i + 1);
    // console.log(idContentTab);
    questionContentTabsId.push(idContentTab);
    tabTitle.push(returnTabTitle(i + 1)); //the Tab question title

    if ((i = 0)) {
      arrDeleteIconShow.push(false);
    } else {
      arrDeleteIconShow.push(true);
    }
  }
  //the Tab question title
  // console.log(questionContentTabsId[0]);
  // create the Tab
  let QuestionTab = CreateTabFunction(
    "id-div-question-section",
    tabTitle,
    "",
    questionContentTabsId,
    arrDeleteIconShow
  );

  QuestionSection.appendChild(QuestionTab);
  console.log("Question Section is " + QuestionTab);
  for (i = 0; i < numberOfQuestion; i++) {
    idContentTab = "id-question-tab-" + (i + 1);
    QuestionTabContent[i] = document.getElementById(idContentTab);
    console.log("Div Content ");
    console.log(QuestionTabContent[i]);
    // function Create Media Section, Statements Section & Answers first time

    createQuestion(QuestionTabContent[i]);
  }
  //****************************************************************************************************************//

  //********************** Adding new Questions  when clicking on add Question Button ******************************//

  let addQuestion = document.getElementById("id-add-question");
  addQuestion.addEventListener("click", () => {
    // get the Questions number from the Scene Data Object
    let numberOfQuestion = CurrentSceneObject.questions.length;

    // Add Tab (tab & content Div) to existing Questions Tab (max 10)
    if (numberOfQuestion < 10) {
      let newTabId = "id-question-tab-" + (numberOfQuestion + 1);
      let TabTitle = returnTabTitle(numberOfQuestion + 1);

      // Add new Tab-label and Tab-content for the Question Tab
      // add x in the Tab-label to delete the Question
      let NewQuestionTab = AddTabFunction(
        "id-div-question-section",
        TabTitle,
        numberOfQuestion,
        newTabId
      );
      console.log("here we are " + NewQuestionTab);
      //create new Question Data Object with new id
      let newQuestion = new Question(newTabId); //id will be changed as per naming policy of the objects the Ask Mutaz
      CurrentSceneObject.questions.push(newQuestion);
      // create new Question and pass the correct Question Tab-Content

      createQuestion(NewQuestionTab);
    }
  });

  //************************** Creating Save Scene Button Section ************************************** */
  const saveSceneSection = document.createElement("Section");
  saveSceneSection.classList.add("genSection");
  selectedSceneTab.appendChild(saveSceneSection);
}

//***************************************** Create Question ***********************************************//
// function Create Media Section, Statements Section & Answers
function createQuestion(questionTabDIV) {
  ////////////////////////// Media Object ////////////////////////////
  const MediaSection = document.createElement("Section");
  MediaSection.classList.add("genSubSection");
  questionTabDIV.appendChild(MediaSection);

  const mediaTab = createTab(5);

  MediaSection.appendChild(mediaTab);
  const MediaOkCancelButton = createAnswersOkCancelbuttons(
    "id-media-add",
    "id-media-cancel",
    "اضافة",
    "الغاء"
  );

  MediaSection.appendChild(MediaOkCancelButton);

  let SelectedMediaTab = document.createElement("label");
  SelectedMediaTab.id = "id-media-tab-selected";
  SelectedMediaTab.textContent = "id-tabMedia-label-1";
  MediaSection.appendChild(SelectedMediaTab);

  ///////////////////////////////// Media Table Section //////////////////////////////////////
  const MediaSectionTable = document.createElement("Section");
  MediaSectionTable.classList.add("genSection");
  questionTabDIV.appendChild(MediaSectionTable);

  let arrMediaTableHeadText = [
    "رقم العنصر",
    "نوع العنصر",
    "وصف العنصر",
    "مواصفات العنصر",
  ];
  let itemTobeDeleted = document.createElement("label");
  itemTobeDeleted.id = "id-label-media-delete";
  itemTobeDeleted.textContent = "1";

  let mediaTable = createGenTableHead("id-media-table", arrMediaTableHeadText);
  let DeleteMediaObject = createButton("id-media-delete", "حذف");
  MediaSectionTable.appendChild(mediaTable);
  MediaSectionTable.appendChild(DeleteMediaObject);
  MediaSectionTable.appendChild(itemTobeDeleted);

  document.getElementById("id-media-add").addEventListener("click", (e) => {
    // let mediaRecord = mediaTable.rows[0].cells.length;

    let tableMedia = document.getElementById("id-media-table");
    let mediaRecord = [];

    let srMediaNumber = tableMedia.rows.length;

    let mediaInfo = GetMediaObjDataFromMediaTab();

    console.log(mediaInfo);
    let mediaObjecttype = mediaInfo.type;
    let mediaObjectDesOrText = mediaInfo.DesOrText;
    let mediaObjectSpecs = mediaInfo.Specs;

    mediaRecord = [
      srMediaNumber,
      mediaObjecttype,
      mediaObjectDesOrText,
      mediaObjectSpecs,
    ];
    // console.log(tableMedia.rows);

    createGenRowTable(tableMedia, mediaRecord, "id-label-media-delete");
  });

  DeleteMediaObject.addEventListener("click", () => {
    document
      .getElementById("id-media-table")
      .deleteRow(itemTobeDeleted.textContent);
  });

  ///********************************** Creating Statement - Answer & Table Statement Answer Preview *************************************//
  const StatementSection = document.createElement("Section");
  StatementSection.classList.add("genSection");
  questionTabDIV.appendChild(StatementSection);

  const AnswerSection = document.createElement("Section");
  AnswerSection.classList.add("genSection");
  questionTabDIV.appendChild(AnswerSection);

  const tablePreviewSection = document.createElement("Section");
  tablePreviewSection.classList.add("genSection");
  questionTabDIV.appendChild(tablePreviewSection);

  // console.log(currentSceneHeaderObj.sceneTypeID.trim());

  switch (currentSceneHeaderObj.sceneTypeID.trim()) {
    case "code_trueFlase":
    case "code_multipleCh":
    case "code_lettersSorting":
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
    case "code_dragdrop":
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

    case "code_fillblank":
      const newFillinBlankStatement = new FillinBlankStatement();
      newFillinBlankStatement.AssingNamesAndAttr();
      newFillinBlankStatement.Build();
      StatementSection.appendChild(
        newFillinBlankStatement.ReturnContainerDiv()
      );
      // saveSceneSection.appendChild(
      //   newFillinBlankStatement.createSceneSaveCancelButtons()
      // );
      //////////////////////////////////////////////////////////

      let newPreviewTable = document.createElement("table");
      newPreviewTable.classList.add("content-table");
      newPreviewTable.createTHead();
      let rowTable = newPreviewTable.insertRow();
      let th1 = document.createElement("th");
      let th2 = document.createElement("th");
      let th3 = document.createElement("th");

      $("th").addClass("content-tablehead");

      rowTable.classList.add("content-tablehead");

      let tableTitle1 = document.createTextNode("العبارات");
      let tableTitle2 = document.createTextNode("الأجوبة");
      let tableTitle3 = document.createTextNode("اجابة صحيحة أم خاطئة");

      th1.appendChild(tableTitle1);
      th2.appendChild(tableTitle2);
      th3.appendChild(tableTitle3);

      rowTable.appendChild(th1);
      rowTable.appendChild(th2);
      rowTable.appendChild(th3);

      tablePreviewSection.append(newPreviewTable);
      ////////////////////////////////////////////////////

      newFillinBlankStatement.insertEmptyFillingBlankStatement.addEventListener(
        "click",
        function () {
          // console.log(document.getElementById("id-FiB-statement").innerHTML);
          let contentTxt = document.getElementById("id-FiB-statement").value;
          document.getElementById("id-FiB-statement").value =
            contentTxt + "  ... E ...  ";
        }
      );
      newFillinBlankStatement.insertFillingBlankStatement.addEventListener(
        "click",
        function () {
          clearSection(AnswerSection);
          // console.log("Listner added to Fill in Blank button");
          let statementString = document.getElementById("id-FiB-statement")
            .value;
          // console.log(statementString);

          AnswerSection.appendChild(
            newFillinBlankStatement.createDraggableOption()
          );

          let numberOfEmptyWord = (statementString.match(/E/g) || []).length;

          for (let i = 0; i < numberOfEmptyWord; i++) {
            let statementNumber = "S1"; // Save the Statements Number
            let EmptyWordNumber = "E-word-" + (i + 1);

            switch (i) {
              case 0:
                AnswerLabelText = "إجابة الفراغ الأول";
                break;
              case 1:
                AnswerLabelText = "إجابة الفراغ الثاني";
                break;
              case 2:
                AnswerLabelText = "إجابة الفراغ الثالث";
                break;
              case 3:
                AnswerLabelText = "إجابة الفراغ الرابع";
                break;
              case 4:
                AnswerLabelText = "إجابة الفراغ الخامس";
                break;
              case 5:
                AnswerLabelText = "إجابة الفراغ السادس";
                break;
              case 6:
                AnswerLabelText = "إجابة الفراغ السابع";
                break;
              case 7:
                AnswerLabelText = "إجابة الفراغ الثامن";
                break;
              case 8:
                AnswerLabelText = "إجابة الفراغ التاسع";
                break;
              case 9:
                AnswerLabelText = "إجابة الفراغ العاشر";
                break;
              default:
                AnswerLabelText = "Over Flow!!!";
                break;
            }

            AnswerSection.appendChild(
              newFillinBlankStatement.createEmptyAnswer(
                statementNumber,
                EmptyWordNumber,
                AnswerLabelText
              )
            );
          }
          let Ansewer = [];
          let CorrectAnswer = [];
          AnswerSection.appendChild(
            newFillinBlankStatement.createAnswersOkCancelbuttons()
          );
          let buttonOk = document.getElementById("id-answers-button-ok");
          let buttonCancel = document.getElementById(
            "id-answers-button-cancel"
          );

          Answers = [];
          CorrectAnswer = [];
          ////////////////////// click on Save Answers in Answer Section
          buttonOk.addEventListener("click", function () {
            console.log("I'm inside buttonOk of Answers");

            for (let i = 0; i < numberOfEmptyWord; i++) {
              statementNumber = "S1";
              EmptyWordNumber = "E-word-" + (i + 1);

              AnswerIdtext =
                "id-fill-in-blank-" + statementNumber + "-" + EmptyWordNumber;
              let AnswerValue = document.getElementById(AnswerIdtext).value;

              Answers.push(AnswerValue);
              CorrectAnswer.push("إجابة صحيحة");
            }

            createRowTable(
              newPreviewTable,
              "id-row-1",
              statementString,
              Answers,
              CorrectAnswer
            );

            clearSection(AnswerSection);
            clearStatementInput();
          });
          ///////////////////////////// Click on Cancel in Answer Section
          buttonCancel.addEventListener("click", function () {
            // console.log("I'm inside buttonCancel of Answers");
            clearSection(AnswerSection);
          });
        }
      );
      break;

    case "code_categories":
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
          }
        }
      );

      break;

    case "code_sorting":
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
}

//*********************************** General Functions *************************************** */
function createRowTable(newTable, idRow, Statement, Answers, CorrectOrNo) {
  let row1 = newTable.insertRow();
  row1.id = idRow;

  let cell1 = row1.insertCell();
  let row1text = document.createTextNode(Statement);
  cell1.appendChild(row1text);

  for (let i = 0; i < Answers.length; i++) {
    if (i !== 0) {
      let row2 = newTable.insertRow();
      let emptyCell = row2.insertCell();

      let emptyText = document.createTextNode("");
      emptyCell.appendChild(emptyText);
      let cell2 = row2.insertCell();
      let row2text = document.createTextNode(Answers[i]);
      cell2.appendChild(row2text);
      let cell3 = row2.insertCell();
      let row2text2 = document.createTextNode(CorrectOrNo[i]);
      cell3.appendChild(row2text2);
    } else {
      cell2 = row1.insertCell();
      row2text = document.createTextNode(Answers[i]);
      cell2.appendChild(row2text);
      cell3 = row1.insertCell();
      row2text2 = document.createTextNode(CorrectOrNo[i]);
      cell3.appendChild(row2text2);
    }
  }

  // document.querySelectorAll("td").classList.add("content-tableTD");

  $("td").addClass("content-tableTD");

  row1.addEventListener("click", function () {
    console.log("I'm " + row1.id);
  });
}

//******* Insert Empty In a Row  Function *******/

// click on insert empty
$("#id-insert-empty").click(function () {
  let contentTxt = document.getElementById("id-statement").value;

  document.getElementById("id-statement").value = contentTxt + " E ";
});

//******* create slide animation for hidden Divs *******/
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
    $(ItemSlide).slideToggle();

    console.log("I'm inside checkbox click");
  });
}

//******* Clear Section from Element Function *******/
function clearSection(SectionName) {
  while (SectionName.firstChild) {
    SectionName.removeChild(SectionName.lastChild);
  }
}

//******* Clear Statement input (Fill In Blank Scene) *******/
function clearStatementInput() {
  let statementInput = document.getElementById("id-FiB-statement");
  statementInput.value = "";
  statementInput.focus();
}

//******* Create Tab (Media Object) *******/

function createTab(TabsNumbers) {
  const mediaArray = ["pic", "Rsound", "SoundEffect", "Video", "Rtext"];
  let divContainer = document.createElement("div");
  let divtabs = document.createElement("div");

  let divTabbytab = [];
  let radioInputTab = [];
  let labelTab = [];
  let divTabbyContent = [];

  // divContainer.classList.add("container");
  divtabs.classList.add("tabs");

  divContainer.appendChild(divtabs);

  for (let i = 0; i < TabsNumbers; i++) {
    divTabbytab[i] = document.createElement("div");
    radioInputTab[i] = document.createElement("input");
    labelTab[i] = document.createElement("label");
    divTabbyContent[i] = document.createElement("div");

    radioInputTab[i].id = "tab-" + (i + 1);
    radioInputTab[i].type = "radio";
    radioInputTab[i].name = "tabby-tabs";
    radioInputTab[i].classList.add("radioInputTab");

    labelTab[i].id = "id-tabMedia-label-" + (i + 1);
    labelTab[i].for = radioInputTab[i].id;
    labelTab[i].classList.add("labelMediaTab");
    labelTab[i].appendChild(ReturnIcon(mediaArray[i]));
    // labelTab[i].textContent = "Tab - " + i;

    divTabbytab[i].classList.add("tabby-tab");

    divTabbyContent[i].classList.add("tabby-content");

    divTabbytab[i].appendChild(radioInputTab[i]);
    divTabbytab[i].appendChild(labelTab[i]);
    divTabbytab[i].appendChild(divTabbyContent[i]);

    divtabs.appendChild(divTabbytab[i]);
    divTabbyContent[i].appendChild(returnMediaObject(mediaArray[i]));

    labelTab[i].addEventListener("click", (e) => {
      console.log(e.target.tagName);
      if (e.target.tagName === "I") {
        console.log(e.target.parentNode.id);
        document.getElementById("id-media-tab-selected").innerText =
          e.target.parentNode.id;
      } else if (e.target.tagName === "LABEL") {
        console.log(e.target.id);
        document.getElementById("id-media-tab-selected").innerText =
          e.target.id;
      }

      radioInputTab[i].checked = true;
      // console.log(e.target);
    });
  }
  radioInputTab[0].checked = true;
  return divContainer;
}

//******* Create Icones (Media Object) *******/
function ReturnIcon(IconeType) {
  switch (IconeType) {
    case "pic":
      const iPic = document.createElement("i");
      iPic.classList.add("fas");
      iPic.classList.add("fa-images");
      iPic.classList.add("fa-4x");

      iPic.classList.add("iconTab");
      return iPic;
      break;
    case "Rsound":
      const iRsound = document.createElement("i");
      iRsound.classList.add("fas");
      iRsound.classList.add("fa-headphones-alt");
      iRsound.classList.add("fa-4x");
      iRsound.classList.add("iconTab");
      return iRsound;
      break;
    case "SoundEffect":
      const iSoundEffect = document.createElement("i");
      iSoundEffect.classList.add("fas");
      iSoundEffect.classList.add("fa-drum");
      iSoundEffect.classList.add("fa-4x");
      iSoundEffect.classList.add("iconTab");
      return iSoundEffect;
      break;
    case "Video":
      const iVideo = document.createElement("i");
      iVideo.classList.add("fas");
      iVideo.classList.add("fa-video");
      iVideo.classList.add("fa-4x");
      iVideo.classList.add("iconTab");
      return iVideo;
      break;
    case "Rtext":
      const iRtext = document.createElement("i");
      iRtext.classList.add("fas");
      iRtext.classList.add("fa-book");
      iRtext.classList.add("fa-4x");
      iRtext.classList.add("iconTab");
      return iRtext;
      break;
  }
}

//******* Create Media Object *******/

function returnMediaObject(mediaType) {
  switch (mediaType) {
    case "pic":
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

      newPicMedia.addHiddenDiv(newPicHiddenMedia.ReturnContainerDiv());

      newPicHiddenMedia.AddRadioOfHiddenMediaDiv(
        newRadioOfPicHiddenMediaDiv1.ReturnContainerDiv()
      );
      newPicHiddenMedia.AddRadioOfHiddenMediaDiv(
        newRadioOfPicHiddenMediaDiv2.ReturnContainerDiv()
      );

      newPicMedia.addListener(newPicMedia);

      return newPicMedia.ReturnContainerDiv();

      //**************************EndOf Pic Media Object******************************** */

      break;
    case "Rsound":
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

      newRecordedSoundMedia.addHiddenDiv(
        newRecordedSoundHiddenMedia.ReturnContainerDiv()
      );

      newRecordedSoundMedia.addListener(newRecordedSoundMedia);

      //**************************EndOf Recorded Sound Media Object******************************** */

      return newRecordedSoundMedia.ReturnContainerDiv();
      break;
    case "SoundEffect":
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

      newSoundEffectMedia.addHiddenDiv(
        newSoundEffectHiddenMedia.ReturnContainerDiv()
      );

      newSoundEffectMedia.addListener(newSoundEffectMedia);

      //**************************EndOf Sound Effect Media Object******************************** */

      return newSoundEffectMedia.ReturnContainerDiv();
      break;
    case "Video":
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
      return newVideoMedia.ReturnContainerDiv();

    case "Rtext":
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

      newTextMedia.addHiddenDiv(newTextHiddenMedia.ReturnContainerDiv());

      newTextMedia.addListener(newTextMedia);

      //**************************EndOf Read Text Media Object******************************** */
      return newTextMedia.ReturnContainerDiv();
      break;
  }
}

//******* clear Tabs *******/
function OpenTab(evt, divTABID, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.querySelectorAll(`#${divTABID} .tabcontent-function`);
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.querySelectorAll(`#${divTABID} .tablinks-function`);
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

//******* Create General Tabs *******/

// CreateTabFunction(
//   "id-questionText-div",
//   arrOfQuestionTitlesNames,
//   arrOfQuestionTitlesObjects,
//   idsForQuestionTextTab,
//   DeleteIcones
// )

function CreateTabFunction(
  divTabID,
  NameOfTabs,
  divContentDetails,
  idOfContentTabs,
  DeleteIcons
) {
  //Create overall div for the Tab, the Tab consiste of two parts the Tab pane where the buttons with the Question title number are
  // and the Tab content where the Question Details are

  let divOverall = document.createElement("div");
  divOverall.id = divTabID;
  divOverall.classList.add("questionText");

  // Create the Tab pane Div
  let divTab = document.createElement("div");
  divTab.classList.add("tab-function");

  divOverall.appendChild(divTab);

  // // Br is only if needed for giving some spaces
  // let Br = document.createElement("br");

  // Create the Arrays of the two Tab Parts: buttonTab to create the Tab pane Elements, divContent for Tab Question details
  let buttonTab = [];
  let divContent = [];

  // number of Tabs panes/Content is as per the number of Questions in the Scene passed in an argument

  for (let i = 0; i < NameOfTabs.length; i++) {
    buttonTab[i] = document.createElement("button");
    buttonTab[i].classList.add("tablinks-function");
    buttonTab[i].textContent = NameOfTabs[i];

    divContent[i] = document.createElement("div");
    divContent[i].classList.add("tabcontent-function");
    divContent[i].id = idOfContentTabs[i];
    if (divContentDetails[i] !== undefined) {
      divContent[i].appendChild(divContentDetails[i]);
    }

    buttonTab[i].addEventListener("click", (evt) =>
      OpenTab(evt, divTabID, divContent[i].id)
    );
    divTab.appendChild(buttonTab[i]);
    divOverall.appendChild(divContent[i]);
  }

  return divOverall;
}

//******* Add new Tab label/content to Existing Tab *******/
function AddTabFunction(divTabId, tabTitle, NumberOfPrevTabs, newTabId) {
  //get the overall div of the existing tab to append the new tab to it
  let divOverall = document.getElementById(divTabId);

  // create x icone to delete the Question
  let Xicone = document.createElement("i");
  Xicone.id = newTabId.slice(16, newTabId.length);
  Xicone.classList.add("fas");
  Xicone.classList.add("fa-trash-alt");
  Xicone.classList.add("fa-1x");
  Xicone.style.color = "red";
  Xicone.title = "حذف السؤال";
  let Spaceicone = document.createTextNode(" ");

  let newButtonTab = document.createElement("button");
  newButtonTab.classList.add("tablinks-function");
  newButtonTab.textContent = tabTitle;
  newButtonTab.appendChild(Spaceicone);
  newButtonTab.appendChild(Xicone);

  let newDivContent = document.createElement("div");
  newDivContent.classList.add("tabcontent-function");
  newDivContent.id = newTabId;

  newButtonTab.addEventListener("click", (evt) =>
    OpenTab(evt, divTabId, newTabId)
  );

  Xicone.addEventListener("click", (e) => {
    //Delete Tab & Tab Content
    if ((e.target.tagName = "i")) {
      console.log("Delete Question Number : " + e.target.id);
    }
  });

  let Tabdiv = document.querySelector(`#${divTabId} .tab-function`);

  // console.log(Tabdiv);
  Tabdiv.appendChild(newButtonTab);

  divOverall.appendChild(newDivContent);
  return newDivContent;
}

//******* Return the Tab Title Text based on the Question Number *******/
function returnTabTitle(QuestionNumber) {
  switch (QuestionNumber) {
    case 1:
      return "السؤال الأول";
      break;
    case 2:
      return "السؤال الثاني";
      break;
    case 3:
      return "السؤال الثالث";
      break;
    case 4:
      return "السؤال الرابع";
      break;
    case 5:
      return "السؤال الخامس";
      break;
    case 6:
      return "السؤال السادس";
      break;
    case 7:
      return "السؤال السابع";
      break;
    case 8:
      return "السؤال الثامن";
      break;
    case 9:
      return "السؤال التاسع";
      break;
    case 10:
      return "السؤال العاشر";
      break;
  }
}
//******* Create Answer OK and Cancel Buttons *******/

function createAnswersOkCancelbuttons(
  idOk,
  idCancel,
  textOkButton,
  textCancelButton
) {
  let divOkCancelAnswers = document.createElement("div");
  let buttonOk = document.createElement("a");
  let buttonCancel = document.createElement("a");

  buttonOk.id = idOk;
  buttonCancel.id = idCancel;

  buttonOk.classList.add("normal-Button");
  buttonCancel.classList.add("normal-Button");

  buttonOk.textContent = textOkButton;
  buttonCancel.textContent = textCancelButton;

  divOkCancelAnswers.appendChild(buttonOk);
  divOkCancelAnswers.appendChild(buttonCancel);

  divOkCancelAnswers.style.float = "left";

  return divOkCancelAnswers;
}

//******* Create General Button *******/

function createButton(idButton, textButton) {
  let divButton = document.createElement("div");
  let buttonElement = document.createElement("a");

  buttonElement.id = idButton;

  buttonElement.classList.add("normal-Button");

  buttonElement.textContent = textButton;

  return buttonElement;
}

//******* Insert new Record in General Tab *******/

function createGenRowTable(newTable, record, deleteRowId) {
  let row1 = newTable.insertRow();
  row1.classList.add("content-tableTD");
  row1.id = newTable.id + "-" + newTable.rows.length;
  let cellTable = [];
  let celltext = "";

  if (newTable.rows[0].cells.length === record.length) {
    for (let i = 0; i < record.length; i++) {
      cellTable[i] = row1.insertCell();
      celltext = document.createTextNode(record[i]);
      cellTable[i].appendChild(celltext);
      cellTable[i].classList.add("content-tableTD");
    }

    row1.addEventListener("click", (e) => {
      resetTableColor(newTable, "#f1f1f1", "rgb(68, 67, 67)");
      row1.style.backgroundColor = "#007bff";
      row1.style.color = "#fff";

      let deleteId = document.getElementById(deleteRowId);
      deleteId.textContent = row1.rowIndex;
      // console.log(row1);
    });
  } else {
    console.log("please Insert Records equal to the Table columns!!");
  }
}

//******* Create the hover effect in the Table *******/
function resetTableColor(tableName, backgroundColorName, colorName) {
  for (let i = 1; i < tableName.rows.length; i++) {
    tableName.rows[i].style.backgroundColor = backgroundColorName;
    tableName.rows[i].style.color = colorName;
  }
}

//******* Create General Table Head *******/

function createGenTableHead(tableId, arrtextColsHead) {
  let newGenTable = document.createElement("table");
  newGenTable.id = tableId;
  newGenTable.classList.add("content-table");

  newGenTable.createTHead();
  let rowTable = newGenTable.insertRow();
  rowTable.classList.add("content-tablehead");

  let th = [];
  let tableColHead = [];

  for (let i = 0; i < arrtextColsHead.length; i++) {
    th[i] = document.createElement("th");
    th[i].classList.add("content-tablehead");

    tableColHead[i] = document.createTextNode(arrtextColsHead[i]);
    th[i].appendChild(tableColHead[i]);

    rowTable.appendChild(th[i]);
  }
  return newGenTable;
}

//******* Get Media Object Inserted Information from the Media Tab *******/

function GetMediaObjDataFromMediaTab() {
  const mediaTabShown = document.getElementById("id-media-tab-selected")
    .textContent;
  let infoMedia = {
    type: "",
    DesOrText: "",
    Specs: "",
  };
  switch (mediaTabShown) {
    //["pic", "Rsound", "SoundEffect", "Video", "Rtext"];
    case "id-tabMedia-label-1":
      infoMedia.type = "Pic";
      infoMedia.DesOrText = document.getElementById("id-main-pic-des").value;

      let radioValuePicPhoto = document.getElementById(
        "id-main-photo-type-photo"
      );
      let radioValuePicDrawing = document.getElementById(
        "id-main-photo-type-drawing"
      );

      console.log(radioValuePicPhoto);
      console.log(radioValuePicDrawing);

      if (radioValuePicPhoto.checked) {
        infoMedia.Specs = radioValuePicPhoto.value;
      } else {
        infoMedia.Specs = radioValuePicDrawing.value;
      }

      break;
    case "id-tabMedia-label-2":
      infoMedia.type = "Rsound";
      infoMedia.DesOrText = document.getElementById("id-main-sound-des").value;

      infoMedia.Specs = "---";

      break;

    case "id-tabMedia-label-3":
      infoMedia.type = "SoundEffect";
      infoMedia.DesOrText = document.getElementById(
        "id-main-soundeffect-des"
      ).value;

      infoMedia.Specs = "---";

      break;

    case "id-tabMedia-label-4":
      infoMedia.type = "Video";
      infoMedia.DesOrText = document.getElementById("id-main-video-des").value;

      let radioValueVideoPhotographic = document.getElementById(
        "id-main-video-type-photographic"
      );
      let radioValueVideoAnimation = document.getElementById(
        "id-main-video-type-animation"
      );
      let radioValueVideoSlideShow = document.getElementById(
        "id-main-video-type-slideshow"
      );

      if (radioValueVideoPhotographic.checked) {
        infoMedia.Specs = radioValueVideoPhotographic.value;
      } else if (radioValueVideoAnimation.checked) {
        infoMedia.Specs = radioValueVideoAnimation.value;
      } else if (radioValueVideoSlideShow.checked) {
        infoMedia.Specs = radioValueVideoSlideShow.value;
      } else {
        infoMedia.Specs = radioValueVideoPhotographic.value;
      }

      break;

    case "id-tabMedia-label-5":
      infoMedia.type = "Rtext";
      infoMedia.DesOrText = document.getElementById("id-main-text-des").value;

      infoMedia.Specs = "---";
      break;

    default:
      break;
  }

  return infoMedia;
}

//********************************************************************************************************/
//*********************************************** Classes ************************************************/
//********************************************************************************************************/

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
  ReturnContainerDiv() {
    this.Div.appendChild(this.Label);
    this.Div.appendChild(this.textarea);
    return this.Div;
  }
  UpdateTextValueFromDatabase(txtValue) {
    this.textarea.value = txtValue;
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
    // this.HiddenDiv.id;
    this.MainDiv.appendChild(HiddenDiv);
  }
  addListener(obj) {
    // console.log("entered function before checkbox click");
    let checkBoxMediaObj = obj.checkBoxInput;

    checkBoxMediaObj.addEventListener("click", function () {
      // console.log("entered function checkbox click");

      document.getElementById(obj.HiddenDiv.id).classList.toggle("shown-tab");
      document.getElementById(obj.HiddenDiv.id).classList.toggle("hidden-tab");
      let hiddenDiv = document.getElementById(obj.HiddenDiv.id);
      hiddenDiv.getElementsByTagName("textarea")[0].value = "";
      let radioChild = hiddenDiv.getElementsByTagName("input")[0];
      // console.log(radioChild);
      if (radioChild != undefined) {
        // console.log(radioChild);
        radioChild.checked = true;
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
    this.inputRadio.value = RadioTitle;
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

    this.EmptyWords = 0;
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
    this.insertFillingBlankStatement.innerHTML = " إدخال الإجابات ";
    this.insertFillingBlankStatement.style.color = "#fff";
  }
  Build() {
    this.divFillinBlankStatement.appendChild(this.labelFillinBlankStatement);
    this.divFillinBlankStatement.appendChild(this.inputFillinBlankStatement);
    // this.divFillinBlankStatement.appendChild(this.divRadioDraggable);
    this.divFillinBlankStatement.appendChild(this.insertFillingBlankStatement);

    this.labelFillinBlankStatement.appendChild(
      this.insertEmptyFillingBlankStatement
    );
  }
  createEmptyAnswer(StatementNumber, EmptyWordNumber, AnswerLabelText) {
    let divAnswer = document.createElement("div");
    let labelAnswer = document.createElement("label");
    let inputAnswer = document.createElement("input");
    //Assinge
    divAnswer.id =
      "div-fill-in-blank-" + StatementNumber + "-" + EmptyWordNumber;
    labelAnswer.classList.add("fill-in-blank");
    labelAnswer.textContent = AnswerLabelText;
    inputAnswer.type = "text";
    inputAnswer.id =
      "id-fill-in-blank-" + StatementNumber + "-" + EmptyWordNumber;
    inputAnswer.classList.add("input-fill-in-blank");
    inputAnswer.classList.add("col-lg-2");
    //build

    divAnswer.appendChild(labelAnswer);
    divAnswer.appendChild(inputAnswer);

    return divAnswer;
  }
  createDraggableOption() {
    // construct
    this.divRadioDraggable = document.createElement("div");
    this.labelRadioDraggable = document.createElement("label");
    this.radioDraggable = document.createElement("input");
    this.spanDraggable = document.createElement("span");
    this.labelRadioWrite = document.createElement("label");
    this.radioWrite = document.createElement("input");
    this.spanWrite = document.createElement("span");
    //Assgin

    this.divRadioDraggable.classList.add("form-control");
    this.divRadioDraggable.classList.add("control-hidden");
    this.divRadioDraggable.style.backgroundColor = "#E0FFFF";

    this.labelRadioDraggable.classList.add("radio-margin");

    this.radioDraggable.id = "id-draggable";
    this.radioDraggable.name = "FiB-DraggableOrWrite";
    this.radioDraggable.type = "radio";
    this.spanDraggable.style.fontSize = "2rem";
    this.spanDraggable.style.color = "rgb(68, 67, 67)";
    this.spanDraggable.textContent = "سحب وادراج";

    this.labelRadioWrite.classList.add("radio-margin");

    this.radioWrite.id = "id-draggable";
    this.radioWrite.name = "FiB-DraggableOrWrite";
    this.radioWrite.type = "radio";
    this.spanWrite.style.fontSize = "2rem";
    this.spanWrite.style.color = "rgb(68, 67, 67)";
    this.spanWrite.textContent = "ادخال كتابي";

    //Build

    this.divRadioDraggable.appendChild(this.labelRadioDraggable);
    this.divRadioDraggable.appendChild(this.labelRadioWrite);

    this.labelRadioDraggable.appendChild(this.radioDraggable);
    this.labelRadioDraggable.appendChild(this.spanDraggable);

    this.labelRadioWrite.appendChild(this.radioWrite);
    this.labelRadioWrite.appendChild(this.spanWrite);

    //return

    return this.divRadioDraggable;
  }

  createAnswersOkCancelbuttons() {
    let divOkCancelAnswers = document.createElement("div");
    let buttonOk = document.createElement("a");
    let buttonCancel = document.createElement("a");

    buttonOk.id = "id-answers-button-ok";
    buttonCancel.id = "id-answers-button-cancel";

    buttonOk.classList.add("normal-Button");
    buttonCancel.classList.add("normal-Button");

    buttonOk.textContent = "حفظ";
    buttonCancel.textContent = "الغاء";

    divOkCancelAnswers.appendChild(buttonOk);
    divOkCancelAnswers.appendChild(buttonCancel);

    divOkCancelAnswers.style.float = "left";

    return divOkCancelAnswers;
  }

  createSceneSaveCancelButtons() {
    let divOkCancelAnswers = document.createElement("div");
    let buttonOk = document.createElement("a");
    let buttonCancel = document.createElement("a");

    buttonOk.id = "id-scene-button-save";
    buttonCancel.id = "id-scene-button-cancel";

    buttonOk.classList.add("normal-Button");
    buttonCancel.classList.add("normal-Button");

    buttonOk.textContent = "حفظ المشهد";
    buttonCancel.textContent = "الغــاء";

    divOkCancelAnswers.appendChild(buttonOk);
    divOkCancelAnswers.appendChild(buttonCancel);

    divOkCancelAnswers.style.float = "left";

    return divOkCancelAnswers;
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

    this.divCategoryStatement = document.createElement("div");
    this.labelCategoryStatement = document.createElement("label");
    this.inputCategoryStatement = document.createElement("input");

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

//**************************************************************************** */
function createEmptyScene(newSceneId) {
  // let currentSceneHeader = SceneHeaders.find(
  //   (sid) => sid.sceneID == currentScene
  // );
  // console.log(currentSceneHeader);

  // let sceneId = currentSceneHeader.id;
  // console.log(CurrentSceneObject);
  // create empty Scene Object.

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
