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
  //**************************EndOf Sound Effect Media Object******************************** */
  //**************************Video Media Object******************************** */
  //**************************EndOf Video Media Object******************************** */
  //**************************Read Text Media Object******************************** */
  //**************************EndOf Read Text Media Object******************************** */
  ////////////////////////////////////////////
  const StatementSection = document.createElement("Section");
  StatementSection.classList.add("genSection");
  selectedSceneTab.appendChild(StatementSection);

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
