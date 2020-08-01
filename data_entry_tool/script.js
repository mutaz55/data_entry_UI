/* ############################### Main Tab Section ###################################  */

/* ############################### Hidden Tab Section ################################### */

$(".select-scene-click").click(function () {
  var fired_button = $(this).val();
  // console.log(fired_button);

  switch (Number(fired_button)) {
    case 1:
      // console.log(fired_button);

      openQuestionType("Q-type-1");
      break;

    case 2:
      // console.log(fired_button);

      openQuestionType("Q-type-2");
      break;
    case 3:
      // console.log(fired_button);

      openQuestionType("Q-type-3");
      break;
    default:
      openQuestionType("Q-type-1");
      break;
  }
});

function openQuestionType(scenetype) {
  // console.log("entered openQuestionType" + scenetype);
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

/* ############################### QTHint Section ################################### */
/* ############################### Media Section ################################### */
/* ############################### Statement & Answer Section ################################### */
/* ############################### Footer Section ################################### */
