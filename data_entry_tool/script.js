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
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  const selectedSceneTab = document.getElementById(idScene);
  if (sceneTypeNumber != 3) {
    while (selectedSceneTab.firstChild) {
      selectedSceneTab.removeChild(selectedSceneTab.lastChild);
    }
  }

  const sceneTitle = document.createTextNode("المشهد: " + scenetype);
  const QuestionSection = document.createElement("Section");

  QuestionSection.classList.add("genSection");

  selectedSceneTab.appendChild(sceneTitle);
  selectedSceneTab.appendChild(QuestionSection);
  /////////////////////////////////////////////

  ////////////////////////////////////////////

  ////////////////////////////////////////////

  selectedSceneTab.style.display = "block";
}

//Media General - click on Picture
$("#id-main-pic-label").click(function () {
  // console.log("entered function checkbox click");

  if ($("#id-main-pic-checkbox").is(":checked")) {
    document.getElementById("div-pic-hidden").style.display = "block";
  } else {
    document.getElementById("div-pic-hidden").style.display = "none";
  }
});

//Media General - click on Recorded Sound
$("#id-main-sound-label").click(function () {
  // console.log("entered function checkbox click");

  if ($("#id-main-sound-checkbox").is(":checked")) {
    document.getElementById("div-sound-hidden").style.display = "block";
  } else {
    document.getElementById("div-sound-hidden").style.display = "none";
  }
});

//Media General - click on Sound effect
$("#id-main-soundeffect-label").click(function () {
  // console.log("entered function checkbox click");

  if ($("#id-main-soundeffect-checkbox").is(":checked")) {
    document.getElementById("div-soundeffect-hidden").style.display = "block";
  } else {
    document.getElementById("div-soundeffect-hidden").style.display = "none";
  }
});

//Media General - click on vdieo
$("#id-main-video-label").click(function () {
  // console.log("entered function checkbox click");

  if ($("#id-main-video-checkbox").is(":checked")) {
    document.getElementById("div-video-hidden").style.display = "block";
  } else {
    document.getElementById("div-video-hidden").style.display = "none";
  }
});

//Media General - click on text
$("#id-main-text-label").click(function () {
  // console.log("entered function checkbox click");

  if ($("#id-main-text-checkbox").is(":checked")) {
    document.getElementById("div-text-hidden").style.display = "block";
  } else {
    document.getElementById("div-text-hidden").style.display = "none";
  }
});

//Media General - click on insert empty
$("#id-insert-empty").click(function () {
  // console.log("entered function checkbox click");
  console.log("Hello");
  let contentTxt = document.getElementById("id-statement").value;
  console.log(contentTxt);
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
    $(ItemSlide).slideToggle();
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
