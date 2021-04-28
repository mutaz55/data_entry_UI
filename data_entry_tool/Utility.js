function cleanStyle(elements, _class) {
    if (elements) {
      Array.from(elements).forEach( element => {
        element.classList.remove(_class);
      })
    }
  }


function cleanStyleinLst(lst, _class) {
    const allElements = lst.getElementsByClassName(_class);
    
    cleanStyle(allElements,_class);
}


 // Add new css classes, append or overwrite the current css classes
 // this could apply for any objects (HTML DOM)
 function addCssClass(_obj, cssClass, overwrite = false){

    if (overwrite) {
      _obj.className = '';


      if (Array.isArray(cssClass)) {
          cssClass.forEach( _cssClass => {
            _obj.classList.add(_cssClass);
          });
      }else {
        _obj.className = cssClass;
        
      }
      
    }else {

        if (Array.isArray(cssClass)) {
            cssClass.forEach( _cssClass => {
                _obj.classList.add(_cssClass);
              });
        }else {
            _obj.className = _obj.className + ' ' + cssClass;
        }
        
    }
    
  }

  
// Handle the keys press events for a component of made of an inputbox and a button
function keysHandler(_super, txt_entry, btn_add, defaultTxt = "إضافة"){
    // select the text when its being clicked

    txt_entry.HTMLElement.addEventListener('click', ()=> {
      txt_entry.selectAll();
    });

    // when press Enter key on the input of a list item
    // fires add button
    txt_entry.HTMLElement.addEventListener('keydown', function (e) {

        if (e.key === 'Enter') {

        btn_add.HTMLElement.dispatchEvent(new Event('click'));

        // escape the update mode on the list
        }else if (e.key  === 'Escape')  {
            console.log(btn_add)
            txt_entry.clearValue();
            btn_add.changeTxtvalue(defaultTxt);
            _super.mode = "normal";
        }

    });
}


// remove a button (item) from the list 
// return false if there was not found otherwise true
function removeBtnFromLstObj(lst, btn){

    if (btn != undefined){
      
        lst.removeChild(btn.parentNode);
        return true;
  
    }else {
      return false;
    }
  }


  
function activateAfterDelete(arrObj, _id, currentObj){
  
    if (arrObj?.length <= 0) return;
    if (_id != currentObj) return;
    
    
  
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
  

// remove all child nodes from a HTML node
function removeAllChildNodes(parent) {

    if (parent?.firstChild) {
        while (parent.firstChild) {
           parent.removeChild(parent.firstChild);
      }
    }
    
    
  }
  

//Enums
//text-word, text-sentence[text-question-title, text-hint, text-subquiz,text-answer], text-read, pic-photo, pic-drawing, video-photography, video-animation, video-slide-show, sound-record, sound-effect, animation[animation-object, animation-interactive, slide-transition], 

const MediaType = {                
  Text_word: "text-word",
  Text_sentence: "text-sentence",
  text_read: "text-read",
  pic_photo: "pic-photo",
  pic_drawing: "pic-drawing",
  video_photography: "video-photography",
  video_animation: "video-animation",
  video_slide_show: "video-slide-show",
  sound_record: "sound-record",
  sound_effect: "sound-effect",
  animation_object:"animation-object",
  animation_interactive:"animation-interactive",
  slide_transition:"slide-transition",
  Time_obj:"time_obj",
  degree_score:"degree_score"
     
}

const TextSentence = {              //save this values in mediaObject.tag
  text_question_title: "text-question-title",
  text_hint: "text-hint",
  text_subquiz: "text-subquiz",
  text_answer: "text-answer",
  text_time:"text_time"
}

const QuizTypes = {
SSorting: "SSorting",
LSorting: "LSorting",
TorF: "TorF",
Category: "Category",
DragDrop: "DragDrop",
MChoices: "MChoices",
FIB: "FIB",
HWord: "HWord",
SQuestion: "SQuestion"
}
const TxtEntryPostfix = {        // old SubQuizPostfix
  SubQuizInput: "SI",
  AnswerInput: "AI",
  SubQuizPreview:"SP",
  AnswerPreview:"AP"

}
const SaveType = {
SubQuiz:0,
Answer:1
}

const fibOptions = {
fib_words: "fib-missing-words",
fib_dragdrop: "fib-dragdrop-words",
fib_mchoice: "fib-multiple-words"
}

// Max no of answers to be inserted in multiple choice quiz
const MaxNoOfAnswers = 5;
