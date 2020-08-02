/* ############################### Main Tab Section ###################################  */

/* ############################### Hidden Tab Section ################################### */

// click on scene type
$(".select-scene-click").click(function () {
  var fired_button = $(this).val();
  // console.log(this);
  var scenetype = this.textContent;
  // console.log(scenetype);
  // console.log(fired_button);
  document.getElementById("id-scene-selected").innerHTML = scenetype;
  switch (Number(fired_button)) {
    case 1:
      // console.log(fired_button);

      openSceneType("S-type-1");
      break;

    case 2:
      // console.log(fired_button);

      openSceneType("S-type-2");
      break;
    case 3:
      // console.log(fired_button);

      openSceneType("S-type-3");
      break;
    default:
      openSceneType("S-type-1");
      break;
  }
});

function openSceneType(scenetype) {
  // console.log("entered openSceneType" + scenetype);
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(scenetype).style.display = "block";
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

/* ############################### QTHint Section ################################### */
/* ############################### Media Section ################################### */
/* ############################### Statement & Answer Section ################################### */
/* ############################### Footer Section ################################### */
