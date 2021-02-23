

// 0-29 Quiz Type

// Quiz Type 
const QuizType = {

  s_sorting_quiz : 0,
  l_sorting_quiz : 1,
  t_or_f_quiz: 2,
  category_quiz:3,
  dragdrop_quiz:4,
  m_choices_quiz:5,
  fib_quiz:6,
  h_word_quiz: 7,
  s_question_quiz: 8
}

// 30 - 79 Addons Type
const AddonsType = {
  text_addons : 9,
  text_read_addons: 10,
  text_array_addons: 11,
  pic_addons: 12,
  drawing_addons: 13,
  pic_hotspot_addons: 14,
  sound_addons: 15,
  sound_Effect_addons: 16,
  table_addons: 17,
  video_photo_addons: 18,
  video_slideShow_addons: 19,
  video_anim_addons: 20,
  video_Interactive_addons: 21,
  animation_addons: 22,
  MemoryGame_addons: 23,
  Sendto_addons: 24,
  OnlineOTO_addons: 25,
  OnlineClass_addons: 26,

  // 80 - 99 GAddons
  AnimSlideTrans_GAddons:27,
  Question_title_GAddons:28,
  Question_hint_GAddons:29,
  Previous_link_GAddons:30,
  Objectives_GAddons:31,
  TestTime_GAddons:32,
  qustion_score_GAddons:33
  
}







// PlugIns Interfaces Classes (Addons/Quizes) 

//Quizes
// s_sorting_quiz
// l_sorting_quiz
// t_or_f_quiz
// category_quiz
// dragdrop_quiz
// m_choices_quiz
// fib_quiz
// h_word_quiz
// s_question_quiz

// class Quiz {
//   constructor(quizId, quizType, slideLink) {
//       this.id = quizId;
//       this.subQuizes = []; // Array of statementAnswersObj
//       this.type = quizType; // FiB quiz, DragAndDrop quiz, TorF quiz, StatementSorting quiz, LetterSorting quiz, MultipleChoices quiz, Categories quiz
//       this.link = slideLink; //in case of non-sequential slide scenarios.
//   }
// }
// //****************************************** */
// class statementAnswersObj {
//   constructor(statementId, statement) {
//       this.id = statementId;
//       this.statement = statement;
//       this.Answers = []; //Array of AnswerObj
//   }
// }
// //****************************************** */
// class AnswerObj {
//   constructor(answerId, mediaObjData, correct) {
//       this.answerId = answerId;
//       this.answer = mediaObjData;
//       this.correct = correct; //Boolean
//   }
// }



class SSortingQuiz {
create(){
  
  let divWrapper = document.createElement("div");
  let divDataInput = document.createElement("div");
  let divDataPreview = document.createElement("div");
  
  
  let texareaId ="Id-SSquiz-textarea";
  let labelTitle="الجملة";
  let btnId = "Id-Sorting-add-button";
  let btnText = "موافق"
  let sidePreviewId="Id-sidepreview";
  let SidePreviewTitle = "العناصر والمهارات"
  
   

  let MsgCom = new messagesComponent();
  let textareaSS= new TextareaLabelComponent(texareaId,labelTitle,2);
  let addBtn = new AddBtnWordComponent(btnId,btnText,["add-btn"])
  let previewList = new PreviewContainer()
  let sidePreview = new SidePreview(sidePreviewId,SidePreviewTitle)
  let objectivesCheckBox = new CheckBoxWithHiddenDiv("checkboxId1",false,"عرض تحليل العناصر","")
  
  let newObjectiveTab = new ObjectivesTab(ModeOfOperation.SaveDirect);
  //newObjectiveTab.fillCombo1();
  
  
  //Tab1.removeBtnOnClick(tab1_fnRemove)


  let hintMessage=MsgCom.createHintMsg("الرجاء ادخال الجمل بالترتيب الصحيح")
  
  //Layout
  divWrapper.classList.add("component-container--vertical");
  divDataInput.classList.add("SS-quiz-layout-input");
  divDataPreview.classList.add("SS-quiz-layout-preview");
  

  hintMessage.classList.add("layout-a");
  textareaSS.HTMLElement.classList.add("layout-b");
  addBtn.HTMLElement.classList.add("layout-d");
  addBtn.HTMLElement.classList.add("item-grid-align-left");
  objectivesCheckBox.HTMLElement.classList.add("layout-c");
  previewList.HTMLElement.classList.add("layout-n");
  sidePreview.HTMLElement.classList.add("layout-m")

  //reading Data from current Item
  let currentItem = _courses.getCurrentItem().dataObj;
  currentItem.type = "StatementSorting quiz";

  

  

  objectivesCheckBox.addElementToHiddenDiv(newObjectiveTab.HTMLElement);
  objectivesCheckBox.onClick(()=>{})

  



  // class ObjectivesList {
  //   constructor(objectiveListId){
  //     this.id =objectiveListId;
  //     this.Objectives=[]; //add ObjectiveObj
  //   }
  // }
  
  // class ObjectiveObj {
  //     constructor(objectiveId, category, Element,  linkId) {
  //         this.id = objectiveId;
  //         this.type = category; //كلمات مفتاحية، تراكيب، صوتيات، قواعد
  //         this.element = Element // categroyيحفظ هنا العناصر التي يجب أن يتم تدريسها أو تقييمها مصنفة حسب 
  //         this.skill = []; //الاستماع(استماع لنطق السليم، تمييز النطق السليم)، القراءة، الكتابة(الإملاء، التعبير بالتراكيب اللغوية) ، 
  //         //المحادثة( النطق السليم، التعبير بالتراكيب اللغوية)
  //         this.linkId = linkId; // id of the statement - quiz in case of assessment or slide id in case of solution.
  //     }
  // }

// class Subject {
//   constructor(id, subjID, subjText, lesID){
//     this.id = id;
//     this.subjectID = subjID;
//     this.subjectText = subjText;
//     this.LessonID = lesID;
//     this.elements = [];
//   }
// }

// const LingElementType = {
//     KeyWords: 0,
//     Structure: 1,
//     Vocals: 2,
//     Grammer: 3,
// }


// class LingElement {

//   constructor(id, subID, text, type){
//     this.id = id;
//     this.subjID = q;
//     this.elementText = text;
//     this.elementType = type;
//   }

// }


// class Skill {
//   constructor(id, SkillID, SkillText) {
//     this.id = id;
//     this.SkillID = SkillID;
//     this.SkillText = SkillText;
//   }

  // getSubjects(_lesId = this.getFirstLesson()) {
          
  //   return Subjects.filter( (subj) => subj.id == this.currentCourse && subj.LessonID == _lesId);
    
  // }


  // getSubject(_subId = this.getFirstSubject()){           //get subject based on Id passed
  //   return Subjects.find(x=> x.subjectID == _subId); 

  // }

  // getSceneSubjects(_sceneId = this.getFirstScene()){    // return array of Ids of subject
  
  //   return SceneHeaders.find( (item) => item.CourseID == this.currentCourse && item.sceneID ==_sceneId )?.Subjects;
  // }


  // fillSceneSubjects(_courses.getSceneSubjects(_courses.currentScene));

  //   updateSceneView();



  // Loop through the suquizes and create preview list items

//****************** */
  // function
  let fillPreviewList=()=>{

    currentItem.subQuizes.forEach((item,index)=>{
      let previewItemId="Id-previewItem-"+index;
      let id_c = previewItemId+"_c";
      let sqTexareaId=item.id;
      let sqLabelTitle="الجملة"
      let subquiz = new TextareaLabelComponent(sqTexareaId,sqLabelTitle,2);

      subquiz.textarea.HTMLElement.value=item.statement;

      subquiz.textarea.onEvent("blur",(e)=>{
        item.statement = subquiz.textarea.HTMLElement.value;
      });

      let clickOnBtn = ()=>{
        console.log("Show Objectives related to this Sub Quiz");
      }

      let clickOnClose = ()=>{
        //console.log("delete the Item");
        currentItem.subQuizes.splice(index,1);
      }

      previewList.addPreviewItem(previewItemId,subquiz.HTMLElement,id_c,clickOnBtn,clickOnClose);

    });

  } 

  //****************** */

  fillPreviewList()

  addBtn.onClick((e)=>{
    
    let statementValue = textareaSS.textarea.HTMLElement.value;
    console.log(statementValue);
    if (statementValue !==""){
      let statementId="Id-statement-1"     //check how to generate new Id with Mutaz
      let newStatement = new statementAnswersObj(statementId,statementValue)
      currentItem.subQuizes.push(newStatement);
      previewList.clearPreviewContainer();
      fillPreviewList();
    }
    textareaSS.textarea.HTMLElement.value="";           
  })

  //**********Initiate the add remove function ****************************** */

  

  
  divDataInput.appendChild(hintMessage);
  divDataInput.appendChild(textareaSS.HTMLElement);
  divDataInput.appendChild(addBtn.HTMLElement);
  divDataInput.appendChild(objectivesCheckBox.HTMLElement);
  divDataPreview.appendChild(previewList.HTMLElement);
  divDataPreview.appendChild(sidePreview.HTMLElement)

  divWrapper.appendChild(divDataInput);
  divWrapper.appendChild(divDataPreview);

  return divWrapper;
}
}

class LSorttingQuiz_Interface

{
  constructor( container_css = "component-container--vertical"){
    this.divWrapper = document.createElement("div");
    this.divWrapper.classList.add(container_css);

  }

 build () {

     let divDataInput = document.createElement("div");
    
    //Layout
    divDataInput.classList.add("Quiz-layout-input");
    
  
    
    let mobjEntry = new mediaObjEntry('isorting-tabset','isorting-tabpnl');
    mobjEntry.changeLbl('إدخال الأحرف');
    

    let inputbox_answer = new TextareaLabelComponent('i-sorting-answerTxt', "الإجابة الصحيحة", 1);
    
    let addBtn = new AddBtnWordComponent('add_DragAndDrop','إضافة السؤال',["margin--top-10","add-btn"]);
    



    let previewSection = document.createElement("div");
    previewSection.className = "Quiz-layout-preview";
  
    
    this.prvContainer = new PreviewContainer();
  

    previewSection.appendChild(this.prvContainer.HTMLElement);

    let prvSide = new SidePreview("id-side-preview","العناصر والمهارات");
    previewSection.appendChild(prvSide.HTMLElement);
    previewSection.style.display = "none";


    addBtn.onClick(()=> {
      previewSection.style.display = "flex";
      this.addItemToPrv(1);
      this.addItemToPrv(2);
      this.addItemToPrv(3);
      this.addItemToPrv(4);
    });


  
    


    divDataInput.appendChild(mobjEntry.HTMLElement);
    divDataInput.appendChild(inputbox_answer.HTMLElement);
    divDataInput.appendChild(addBtn.HTMLElement);


    this.divWrapper.appendChild(divDataInput);

    this.divWrapper.appendChild(previewSection);

  
    return this.divWrapper;

    
 }
  
 addItemToPrv(_number ){
  // check if its already exist


  let divLSquizItem = new previewItemManyToOne(_number)

  this.prvContainer.addPreviewItem("item_id"+_number, divLSquizItem, "item_id_close"+_number,null,null);


 }

}
class LSortingQuiz {
  create(){
    let lsorting_quiz = new LSorttingQuiz_Interface();
    return lsorting_quiz.build();

    
  }
}

class TorFQuiz {
  create(){
    
    // let comboId="TorFquiz-media-Id";
    // let textareaId="TorFquiz-text-Id";
    // let comboLabelTitle="ميديا";
    // let textareaLabelTitle="أدخل النص أو الوصف";

    // let tOrFQuiz = new ComboTextLabelComponent(comboId,textareaId,comboLabelTitle,textareaLabelTitle,8);
    // let values = ["صورة","صوت","مؤثرات صوتية","نص قراءة"];

    // values.forEach((value,index)=>{
    //   tOrFQuiz.combo.addOptionToCombo(value,value,true);

    // })

    // tOrFQuiz.combo.onChange((e)=>{
    //   console.log(e.target.value);
    //   tOrFQuiz.labelTitle.textContent= "أدخل "+e.target.value;

    // })

    // tOrFQuiz.textarea.onEvent("blur",()=>{
    //   console.log("textarea Saved!!");
    //   //tOrFQuiz.combo.HTMLElement.selectedIndex="1";
    // })

    
    // tOrFQuiz.labelTitle.textContent= "أدخل "+values[0];

    // return tOrFQuiz.HTMLElement;

    
    
  let divWrapper = document.createElement("div");
  //   let divDataInput = document.createElement("div");
  //   let divDataPreview = document.createElement("div");
    
    
  
    
    let mobjEntry = new mediaObjEntry('tor-tabset','tor-tabpnl');
  
  
    let radioBtns = new ListOfRadioOrCheckBoxComponent('trueFalseQuiz-group',["radioBtns-container"]);
  
    radioBtns.addRadio('trueOption', 'trueFalseAnswer', '1','الإجابة صحيحة',()=> { console.log('clicked')});
    radioBtns.addRadio('falseOption', 'trueFalseAnswer', '0', 'الإجابة خاطئة',()=> { console.log('clicked')});
    
    let addBtn = new AddBtnWordComponent('add_trueFalseQuiz','إضافة',["add-btn"]);
    addBtn.onClick(()=> {console.log('btn clicked')});
  
    let actionContainer = document.createElement('div');
    actionContainer.appendChild(radioBtns.HTMLElement);
    actionContainer.appendChild(addBtn.HTMLElement);
    
    actionContainer.className = "radioBtns-addBtn-container";
    

    
    //Layout
    divWrapper.classList.add("Quiz-layout-input");
    divWrapper.appendChild(mobjEntry.HTMLElement);
    divWrapper.appendChild(actionContainer);
    
  
    return divWrapper;

      
  }
}

class CategoryQuiz {
  create(){
  //   let comboId="Id-combo-preview";
  //   let textareaId = "Id-textarea-preview";
  //   let comboLabelTitle="ميديا";
  //   let textareaLabelTitle="النص";
  //   let textareaNumberOfRows=1;
  //   let previewItemId="previewItem-1"
  //   let id_c = previewItemId+"_c"
  //   let sidePreviewId="Id-sidepreview";
  //   let SidePreviewTitle = "العناصر والمهارات"

  //   let divWrapper = document.createElement("div");
  //   divWrapper.classList.add("p-list-group");
  //   let previewList = new PreviewContainer()
  //   let sidePreview = new SidePreview(sidePreviewId,SidePreviewTitle)
  // previewList.HTMLElement.classList.add("preview_main");
  // sidePreview.HTMLElement.classList.add("preview_side");
    
  //   let statementSorting1 = new ComboTextLabelComponent(comboId,textareaId,comboLabelTitle,textareaLabelTitle,textareaNumberOfRows);
  //   let statementSorting2 = new ComboTextLabelComponent(comboId,textareaId,comboLabelTitle,textareaLabelTitle,textareaNumberOfRows);
  //   let statementSorting3 = new ComboTextLabelComponent(comboId,textareaId,comboLabelTitle,textareaLabelTitle,textareaNumberOfRows);
  //   let statementSorting4 = new ComboTextLabelComponent(comboId,textareaId,comboLabelTitle,textareaLabelTitle,textareaNumberOfRows);




  //   function clickOnBtn(){
  //     console.log("clickOnButton!!!");
  //   }
  //   function clickOnClose(){
  //     console.log("clickOnCloseBox");
  //   }
  //   previewList.addPreviewItem(previewItemId,statementSorting1.HTMLElement,id_c,clickOnBtn,clickOnClose);
  //   previewList.addPreviewItem(previewItemId,statementSorting2.HTMLElement,id_c,clickOnBtn,clickOnClose);
  //   previewList.addPreviewItem(previewItemId,statementSorting3.HTMLElement,id_c,clickOnBtn,clickOnClose);
  //   previewList.addPreviewItem(previewItemId,statementSorting4.HTMLElement,id_c,clickOnBtn,clickOnClose);

  //   divWrapper.appendChild(previewList.HTMLElement);
  //   divWrapper.appendChild(sidePreview.HTMLElement)

  
  let divWrapper = document.createElement("div");

  let mobjEntry = new mediaObjEntry();
  mobjEntry.changeLbl('إدخال مكونات الجملة');

  let lstCategory = new ListWithLabelAndInputComponent('categoryLst-id',"إدخال تصنيف الجملة","category_entryTxt","تصنيف الجملة", "addCategory_btn");


  let addBtn = new AddBtnWordComponent('add_s-question', 'إضافة السؤال' ,["margin--top-10", "add-btn"]);
  
  addBtn.onClick(()=> {console.log('btn clicked')});

  divWrapper.appendChild(mobjEntry.HTMLElement);
  divWrapper.appendChild(lstCategory.HTMLElement);
  divWrapper.appendChild(addBtn.HTMLElement);
  
    return divWrapper;
  }
}

class DragAndDropQuiz {
  create(){


    
  let divWrapper = document.createElement("div");
  //   let divDataInput = document.createElement("div");
  //   let divDataPreview = document.createElement("div");
  divWrapper.classList.add("component-container--vertical");

    
  
    
    let mobjEntry_1 = new mediaObjEntry('dragdrop-tabset1','dragdrop-tabpnl1');
    let mobjEntry_2 = new mediaObjEntry('dragdrop-tabset2','dragdrop-tabpnl2');
    mobjEntry_1.changeLbl('إدخال الجملة الأولى');
    mobjEntry_2.changeLbl('إدخال الجملة المقابلة');

    

    
    let addBtn = new AddBtnWordComponent('add_DragAndDrop','إضافة',["margin--top-10", "add-btn"]);
    addBtn.onClick(()=> {console.log('btn clicked')});
  
    
    
    
    
    
    
    
    //Layout
    divWrapper.classList.add("component-container--vertical");
    divWrapper.appendChild(mobjEntry_1.HTMLElement);
    divWrapper.appendChild(mobjEntry_2.HTMLElement);
    divWrapper.appendChild(addBtn.HTMLElement);
    
    
  
    return divWrapper;

    // let divWrapper = document.createElement("div");
    // let MsgCom = new messagesComponent();

    // divWrapper.classList.add("radio-checkbox")

    // let IncreamentId="Id-increament";
    // let IncreamentName="Quantity-anything";

    // let increamentElement = new IncreamentComponent(IncreamentId,IncreamentName);
    
    // increamentElement.onChange(()=>{
    //   console.log("increament Changed!!");
    // })

    // divWrapper.appendChild(increamentElement.HTMLElement);

    
    // divWrapper.appendChild(MsgCom.createErrorMsg("مرحبا كيفك"))
    // divWrapper.appendChild(MsgCom.createInfoMsg("مرحبا كيفك"))
    // divWrapper.appendChild(MsgCom.createSuccessMsg("مرحبا كيفك"))
    // divWrapper.appendChild(MsgCom.createValidationMsg("مرحبا كيفك"))
    // divWrapper.appendChild(MsgCom.createWarningMsg("مرحبا كيفك"))
    // divWrapper.appendChild(MsgCom.createHintMsg("مرحبا كيفك هنت"))

    // return divWrapper;
  }
}


class MChoicesQuiz {
  create(){
    
    // let textareaId= "Id-mChoice-textarea";
    // let labelTitle="الإجابة الثالثة"

    
    // let textareaLClose = new TextareaLabelWithClose(textareaId,labelTitle,1);
    // let textarea = textareaLClose.textareaLabel.textarea;
    // let closeBox = textareaLClose.closeButton;

    

    // textarea.onEvent("blur",(e)=>{
      
    //   let textareaValue = document.getElementById(e.target.id).value;
    //   if (textareaValue !==""){
    //     e.target.parentNode.querySelector("label").textContent=textareaValue;

    //   }
      
    // })

    // textarea.onEvent("click",(e)=>{
    //   console.log("textarea - clicked");
    //   console.log(document.getElementById(e.target.id).value)
      
    // })

    // closeBox.onClick((e)=>{
    //   e.preventDefault(); 
    //   e.stopImmediatePropagation();
    //   e.target.parentNode.remove()
    // });

    // return textareaLClose.HTMLElement;

    let maxNoOfAnswers = 5;
    // let answers_incorrect = [];

    let divWrapper = document.createElement("div");
    //   let divDataInput = document.createElement("div");
    //   let divDataPreview = document.createElement("div");
      
      
  
    
    let mobjEntry = new mediaObjEntry('mchoice-q-tabset','mchoice-q-tabpnl');
    mobjEntry.changeLbl('إدخال السؤال');
    
    

    let innerWrapper = document.createElement("div");
    
    let answersTabset = new TabComponent(["الإجابة الصحيحة"], "answersSet-","answersPnl-");
    answersTabset.addLabel ("الإجابات");

  
    let answerPnl_correct = new mediaObjEntry('answerSet-correct','answerPnl-correct');
    answerPnl_correct.changeLbl("إدخال الإجابة الصحيحة");

    
    answersTabset.fillTabPanel(1,answerPnl_correct.HTMLElement);

    
    let addAnswerBtn = new AddBtnWordComponent('add-answer', 'إضافة إجابة',["add-btn"]);

    addAnswerBtn.noOfAnswers = 1 ;
    
    addAnswerBtn.onClick(()=> {
     
      if (addAnswerBtn.noOfAnswers > maxNoOfAnswers - 1 ) return;

      let answers_incorrect = new mediaObjEntry('ansSet-incorrect-'+ addAnswerBtn.noOfAnswers, 'ansPnl-incorrect-'+ addAnswerBtn.noOfAnswers);

      answers_incorrect.changeLbl(`إدخال الإجابة ${(addAnswerBtn.noOfAnswers + 1)}`);

      answersTabset.addTab(addAnswerBtn.noOfAnswers + 1, "الإجابة " + (addAnswerBtn.noOfAnswers + 1));

      answersTabset.fillTabPanel(addAnswerBtn.noOfAnswers + 1, answers_incorrect.HTMLElement);

      addAnswerBtn.noOfAnswers +=1;

    });

    answersTabset.addControls(addAnswerBtn,["any"]);
    
    innerWrapper.appendChild(answersTabset.HTMLElement);
    



    
    let addBtn = new AddBtnWordComponent('add_s-question', 'إضافة السؤال' ,["margin--top-10", "add-btn"]);
    
    addBtn.onClick(()=> {console.log('btn clicked')});
  
    
    //Layout
    divWrapper.classList.add("component-container--vertical");
    divWrapper.appendChild(mobjEntry.HTMLElement);
    divWrapper.appendChild(innerWrapper);
    divWrapper.appendChild(addBtn.HTMLElement);
    
    
  
    return divWrapper;


  }
}

class FIBQuiz {
  create(){

    // let listId = "Id-list-1111"
    // let checkboxId="Id-checkbox-test";
    // let isSwitchType=true;
    // let labelTxt="هل تريد التسجيل؟"
    
    // let checkboxId1="Id-checkbox-test2";
    // let isSwitchType1=false;
    // let labelTxt1="افتح يا سمسم";

    // let checkboxId2="Id-checkbox-test3";
    // let isSwitchType2=false;
    // let labelTxt2=" هلا بالشباب ";


    // let divWrapper = document.createElement("div");
    // let radioId1="Id-radio-test1";
    // let radioId2="Id-radio-test2";
    // let radioId3="Id-radio-test3";
    // let radioId4="Id-radio-hidden";

    // let testText = document.createTextNode("Hello Hidden Div Test");

    // let radioName="radio1";
    // let radioValue=1;
    // let labelTxt22="الاختيار الأول"
    
    // let fn = (e)=>{
    //   console.log("I'm in a list ",e.target)
    // };

    // let listOfCheckBoxes = new ListOfRadioOrCheckBoxComponent(listId);

    // listOfCheckBoxes.addCheckBox(checkboxId,isSwitchType,labelTxt,"",fn)

    // listOfCheckBoxes.addCheckBox(checkboxId1,isSwitchType1,labelTxt1,"",fn)

    // listOfCheckBoxes.addCheckBox(checkboxId2,isSwitchType2,labelTxt2,"",fn)

    // // add Radios
    // listOfCheckBoxes.addRadio(radioId1,radioName,radioValue,labelTxt22,fn)
    // listOfCheckBoxes.addRadio(radioId2,radioName,radioValue,labelTxt22,fn)
    // listOfCheckBoxes.addRadio(radioId3,radioName,radioValue,labelTxt22,fn)


    // return listOfCheckBoxes.HTMLElement;

    
    let blank_symbols = " [ _____ ] ";

    let divWrapper = document.createElement("div");
    //   let divDataInput = document.createElement("div");
    //   let divDataPreview = document.createElement("div");
    divWrapper.classList.add("component-container--vertical");

    
    let fibType = new ComboLabelComponent('fibtype-id','طريقة ملء الفراغ');
    fibType.combo.addOptionToCombo('إدخال كتابي');
    fibType.combo.addOptionToCombo('drag & drop');


    let inputbox_fib = new TextareaLabelComponent('fibQuestionTxt', "إدخال الجملة", 2);
    inputbox_fib.labelTitle.classList.add('margin--top-10');
    let fibBtn = new AddBtnWordComponent('addBlankBtn', 'إدخال فراغ', ["add-btn","margin--top-10"]);

    fibBtn.onClick(()=> {
      
      if (inputbox_fib.textarea.HTMLElement.value.match(/\[[^\]]*?\]/g)) return;

      if (inputbox_fib.textarea.HTMLElement.selectionStart || inputbox_fib.textarea.HTMLElement.selectionStart === 0) {
        
        let startPos = inputbox_fib.textarea.HTMLElement.selectionStart;
        let endPos = inputbox_fib.textarea.HTMLElement.selectionEnd;
        inputbox_fib.textarea.HTMLElement.value = inputbox_fib.textarea.HTMLElement.value.substring(0, startPos) +
        blank_symbols +
        inputbox_fib.textarea.HTMLElement.value.substring(endPos, inputbox_fib.textarea.HTMLElement.value.length);
        inputbox_fib.textarea.HTMLElement.selectionStart = startPos + blank_symbols.length;
        inputbox_fib.textarea.HTMLElement.selectionEnd = startPos + blank_symbols.length;
      } 
    else {
        inputbox_fib.textarea.HTMLElement.value += blank_symbols;
    }

      
    });

    let inputbox_answer = new InputLabelComponent('fibAnswerTxt', "إدخال الإجابة", ["textarea-description"]);
    inputbox_answer.labelTitle.classList.add('margin--top-10');

    inputbox_answer.HTMLElement.addEventListener('change', (e)=> {

      
      inputbox_fib.textarea.HTMLElement.value = inputbox_fib.textarea.HTMLElement.value.replace(/\[[^\]]*?\]/g, "[ "+ e.target.value +" ]");

    });
    
    let addBtn = new AddBtnWordComponent('add_DragAndDrop','إضافة السؤال',["margin--top-10", "add-btn"]);
    addBtn.onClick(()=> {console.log('btn clicked')});
    
    //Layout
    divWrapper.classList.add("component-container--vertical");
    divWrapper.appendChild(fibType.HTMLElement);
    divWrapper.appendChild(inputbox_fib.HTMLElement);
    divWrapper.appendChild(fibBtn.HTMLElement);
    divWrapper.appendChild(inputbox_answer.HTMLElement);
    divWrapper.appendChild(addBtn.HTMLElement);
    
    
  
    return divWrapper;

  }
}

class HWordQuiz {
  create(){
   

    // let checkboxId="Id-checkbox-test";
    // let isSwitchType=true;
    // let labelTxt="هل تريد التسجيل؟"
    
    // let checkboxId1="Id-checkbox-test1";
    // let isSwitchType1=false;
    // let labelTxt1="افتح يا سمسم";
    // let txtNode = document.createTextNode("اشياء غريبة تظهر");

    // let newCheckBox = new CheckBoxComponent(checkboxId,isSwitchType,labelTxt)
    // let newCheckBoxHiddenDiv = new CheckBoxWithHiddenDiv(checkboxId1,isSwitchType1,labelTxt1,"anyValue")

    // newCheckBoxHiddenDiv.addElementToHiddenDiv(txtNode);

    // newCheckBox.onClick((e)=>{
    //   console.log("Hello CheckBox",e.target.id)
    // })

    // newCheckBoxHiddenDiv.onClick((e)=>{
    //   console.log("Hi there")
    // })
    
    
    let divWrapper = document.createElement("div");
    divWrapper.classList.add("component-container--vertical");

    let inputbox_hword = new TextareaLabelComponent('hwordQuizTxt', "إدخال الجملة", 3);
    inputbox_hword.labelTitle.classList.add('margin--top-10');

    
    let lstHword = new ListWithLabelAndInputComponent('lstHword-id',"إدخال الكلمة المراد تعليمها","lstHword_entryTxt","إدخال الكلمة", "lstHword_btn");
    lstHword.addbutton.HTMLElement.addEventListener('click', ()=> {
      console.log('clicked');
    });


    let addBtn = new AddBtnWordComponent('add_Hword-question', 'إضافة السؤال' ,["margin--top-10", "add-btn"]);
    
    addBtn.onClick(()=> {console.log('btn clicked')});

    divWrapper.appendChild(inputbox_hword.HTMLElement)
    divWrapper.appendChild(lstHword.HTMLElement);
    divWrapper.appendChild(addBtn.HTMLElement);

    return divWrapper;
  }
}

class SQuestionQuiz {
  create(){

  let divWrapper = document.createElement("div");
  //   let divDataInput = document.createElement("div");
  //   let divDataPreview = document.createElement("div");
    
    
  
    
    let mobjEntry = new mediaObjEntry();
    mobjEntry.changeLbl('إدخال السؤال');
    

    let inputbox_answer = new TextareaLabelComponent('s-question-answerTxt', "الإجابة الصحيحة", 1);
    
    let addBtn = new AddBtnWordComponent('add_s-question','إضافة',["margin--top-10", "add-btn"]);
    
    addBtn.onClick(()=> {console.log('btn clicked')});
  
    
    
    

    
    
    
    //Layout
    divWrapper.classList.add("component-container--vertical");
    divWrapper.appendChild(mobjEntry.HTMLElement);
    divWrapper.appendChild(inputbox_answer.HTMLElement);
    divWrapper.appendChild(addBtn.HTMLElement);
    
    
  
    return divWrapper;

  }
}

//Addons

// (text_addons) or text_read_addons 
// text_array_addons
// (pic_addons) or drawing_addons
// pic_hotspot_addons
// (sound_addons) or sound_Effect_addons
// table_addons
// (video_addons)video_photo_addons/video_slideShow_addons/video_anim_addons/video_Interactive_addons
// animation_addons
// MemoryGame_addons
// Sendto_addons
// OnlineOTO_addons
// OnlineClass_addons

class TextAddons {
  constructor(type){
    this.type = type;
  }
  create(){
    let textareaId = "Id-textarea-reading";
    let labelTitle="";
    let numberOfRow = 1;
    let mediaType = "";

    if (this.type=="text_addons"){
      labelTitle="ادخال جملة"
      numberOfRow = 1;
      mediaType="text-sentence";

    }else if (this.type=="text_read_addons"){
      labelTitle="ادخال نص قراءة";
      numberOfRow = 8
      mediaType="text-read";
    }
    
    let currentItem = _courses.getCurrentItem().dataObj;
    currentItem.type=mediaType;

    console.log("test start here ../n",currentItem);

    let textAdddons = new TextareaLabelComponent(textareaId,labelTitle,numberOfRow);
    

    textAdddons.textarea.HTMLElement.value=currentItem.text;

    textAdddons.textarea.onEvent("blur",(e)=>{
      currentItem.text = textAdddons.textarea.HTMLElement.value;
    });

    return textAdddons.HTMLElement;
  }
}

class TextArrayAddons {
  create(){
    let comboId = "Id-combo-new"
    let combo = new ComboComponent(comboId);

    let values = [
      {
        text:"Option1",
        value:"1"
      },
      {
        text:"Option2",
        value:"2"
      },
      {
        text:"Option3",
        value:"3"
      },
    ]

    values.forEach((value)=>{


      combo.addOptionToCombo(value.text,value.value,true);
    })

    combo.onChange((e)=>{
      console.log(e.target.value);
    });

    return combo.HTMLElement;
  }
}

class PicAddons {
  constructor(type){
    this.type = type;
  }
  create(){
          
    let textareaId = "Id-textarea-pic";
    let labelTitle="";
    let numberOfRow = 1;
    let mediaType = "";

    if (this.type=="pic_addons"){
      labelTitle="ادخال وصف الصورة";
      numberOfRow = 8;
      mediaType="pic-photo";
      
    }else if (this.type=="drawing_addons"){
      labelTitle="ادخال وصف الرسمة";
      numberOfRow = 8
      mediaType="pic-drawing";
    }
    
    let currentItem = _courses.getCurrentItem().dataObj;
    currentItem.type=mediaType;

    console.log("test start here ../n",currentItem);

    let textAdddons = new TextareaLabelComponent(textareaId,labelTitle,numberOfRow);
    

    textAdddons.textarea.HTMLElement.value=currentItem.text;

    textAdddons.textarea.onEvent("blur",(e)=>{
      currentItem.text = textAdddons.textarea.HTMLElement.value;
    });

    return textAdddons.HTMLElement;
  }
}



class PicHotSpotAddons {
  create(){
    
    
    let listId = "Id-picHotSpot-list";
    let labelTitle="المناطق المحددة";
    let inputTextId="Id-picHotSpot-inputText";
    let placeholder="أضف اسم منطقة في الصورة لتحديدها"
    let addBtnId = "Id-picHotSpot-addBtn";
    let values = ["ButtonWithCloseBox1","ButtonWithCloseBox2","ButtonWithCloseBox3","ButtonWithCloseBox4"]

    let listAdd = new ListWithLabelAndInputComponent(listId,labelTitle,inputTextId,placeholder,addBtnId);

      
    listAdd.inputText.onEvent("blur",()=>{
      console.log("save the Text")
    });

    

    let fnOnClick = (e)=>{
      console.log(e.target.innerText);

    }
    let fnOnClose = (e)=>{
      console.log(e.target.parentNode);
    }


    values.forEach((value,index)=>{

      let listButtonId="Id-btn-"+(index+1);
      let id_c ="Id-close-"+(index+1);

      

      listAdd.listElement.addButtonWithCloseBoxToList(value,listButtonId,id_c,fnOnClick,fnOnClose);

      //add Event Listner for click on listButton, and for click on closeBox

    });

    listAdd.addbutton.onClick(()=>{
      let inputTextElement = document.getElementById(inputTextId);
      let txtButton=inputTextElement.value;
      let lstBtnId = "new-Id"
      let id_cNew = lstBtnId+"_c"
      listAdd.listElement.addButtonWithCloseBoxToList(txtButton,lstBtnId,id_cNew,fnOnClick,fnOnClose);
      inputTextElement.value ="";

    })


    // add Event List for click on Add Button
    //btn_add_lesson.addEventListener("click", () => {
    //addNewItems(txt_lesson_entry.value, id_less_key, lst_lessons, true).focus();




    return listAdd.HTMLElement;
  }
}

class SoundAddons {
  constructor(type){
    this.type = type;
    // (sound_addons) or sound_Effect_addons
  }
  create(){
        
    let textareaId = "Id-textarea-sound";
    let labelTitle="";
    let numberOfRow = 1;
    let mediaType = "";

    if (this.type=="sound_addons"){
      labelTitle="ادخال الحوار";
      numberOfRow = 8;
      mediaType="sound-record";    //sound-record, sound-effect
      
    }else if (this.type=="sound_Effect_addons"){
      labelTitle="ادخال وصف المؤثرات الصوتية";
      numberOfRow = 8
      mediaType="sound-effect";
    }
    
    let currentItem = _courses.getCurrentItem().dataObj;
    currentItem.type=mediaType;

    console.log("test start here ../n",currentItem);

    let textAdddons = new TextareaLabelComponent(textareaId,labelTitle,numberOfRow);
    

    textAdddons.textarea.HTMLElement.value=currentItem.text;

    textAdddons.textarea.onEvent("blur",(e)=>{
      currentItem.text = textAdddons.textarea.HTMLElement.value;
    });

    return textAdddons.HTMLElement;
  }
}

class tableAddons {
  create(){
    let listId = "Id-list-componenet";

    let listWithLabel=new ListWithLabelComponent(listId,"اضافات زرار");
    

    listWithLabel.listElement.addButtonToList("Button1","Id-btn-1",(e)=>{
      console.log(e.target.innerText)
    });
    listWithLabel.listElement.addButtonToList("Button2","Id-btn-2",(e)=>{
      console.log(e.target.id)
    });
    listWithLabel.listElement.addButtonToList("Button3","Id-btn-3",(e)=>{
      console.log(e.target.type)
    });


    let fnOnClick1 = (e)=>{
      console.log(e.target.innerText);

    }
    let fnOnClose1 = (e)=>{
      console.log(e.target.parentNode);
    }

    let fnOnClick2 = (e)=>{
      console.log(e.target.innerText);

    }
    let fnOnClose2 = (e)=>{
      console.log(e.target.parentNode);
    }


    let fnOnClick3 = (e)=>{
      console.log(e.target.innerText);

    }
    let fnOnClose3 = (e)=>{
      console.log(e.target.id);
    }

    listWithLabel.listElement.addButtonWithCloseBoxToList("ButtonWithCloseBox1","Id-btnClose-1","Id-close-1",fnOnClick1,fnOnClose1);
    listWithLabel.listElement.addButtonWithCloseBoxToList("ButtonWithCloseBox2","Id-btnClose-2","Id-close-2",fnOnClick2,fnOnClose2);
    listWithLabel.listElement.addButtonWithCloseBoxToList("ButtonWithCloseBox3","Id-btnClose-3","Id-close-3",fnOnClick3,fnOnClose3);

    return listWithLabel.HTMLElement;
  }
}

class VideoAddons {
  constructor(type){
    this.type = type;
  }
  create(){
         
    let combo1Id="Id-combolistAddRemove-1";
    let btnAddId="Id-addBtn-1";
    let btnRemoveId="Id-removeBtn-1";
    let combo2Id = "Id-combo2-1"

    let comboListAddRemove = new ComboListAddRemoveComponent(combo1Id,combo2Id,"اختيار أشياء",btnAddId,btnRemoveId);
    let values = [
      { 
        
        name: "car",
        value:"Option1"
        
      },
      { 
        
        name: "imageEffect",
        value:"Option2"
        
      },
      { 
        
        name: "webp",
        value:"Option3"
        
      }];

    values.forEach((item)=>{
      comboListAddRemove.combo1.addOptionToCombo(item.name,item.value,true);

    })
    comboListAddRemove.addBtnOnClick((e)=>{
      console.log(e.target);
    })

    comboListAddRemove.removeBtnOnClick((e)=>{
      console.log(e.target);
    })

    comboListAddRemove.combo1.onChange((e)=>{
      console.log("combo1 changed!!!")
    });

    comboListAddRemove.combo2.onChange((e)=>{
      console.log("combo2 changed!!!")
    });


    


    return comboListAddRemove.HTMLElement;
  }
}

class AnimationAddons {
  create(){
    let comboId="ani-combo-Id";
    let imgId = "ani-img-Id";
    let comboLabelTitle= "اختر الحركة"
    let animAddons = new ComboShowGifComponent(comboId,imgId,comboLabelTitle)
    
    let values = [
        { 
          
          name: "car",
          link:"img/video-to-gif-sample.gif"
          
        },
        { 
          
          name: "imageEffect",
          link:"img/imageeffects.gif"
          
        },
        { 
          
          name: "webp",
          link:"img/200w.webp"
          
        }];

        let fn = (e)=>{
          console.log("function",e.target)
          animAddons.image.src = e.target.value;
        }

        values.forEach((value)=>{

          animAddons.combo.addOptionToCombo(value.name, value.link, true);
        });

        animAddons.combo.onChange(fn)
          
        
        
        if (values.length !== 0) {
          animAddons.image.src=values[0].link;
        }

    return animAddons.HTMLElement;
  }
}

class MemoryGameAddons {
  create(){

    let textareaId1 = "Sound-Id";
    let labelTitle1="ادخال الحوار"
    
    let tab1 = new TextareaLabelComponent(textareaId1,labelTitle1,8)

    let textareaId2 = "Sound-Id2";
    let labelTitle2="ادخال الحوار"
    
    let tab2 = new TextareaLabelComponent(textareaId2,labelTitle2,8)

    let textareaId3 = "Sound-Id3";
    let labelTitle3="ادخال الحوار"
    
    let tab3 = new TextareaLabelComponent(textareaId3,labelTitle3,8)


    let combo1Id="Id-combolistAddRemove-1";
    let btnAddId="Id-addBtn-1";
    let btnRemoveId="Id-removeBtn-1";
    let combo2Id = "Id-combo2-1"

    let tab4 = new ComboListAddRemoveComponent(combo1Id,"اختيار أشياء",btnAddId,btnRemoveId,combo2Id);




    let arrTabNames=["الشخصيات ","الأماكن ","السيناريو","القصص"]

    let tabElement = new TabComponent(arrTabNames)
    tabElement.addLabel("اختيار المشاهد")
    tabElement.fillTabPanel(1,tab1.HTMLElement)
    tabElement.fillTabPanel(2,tab2.HTMLElement)
    tabElement.fillTabPanel(3,tab3.HTMLElement)
    tabElement.fillTabPanel(4,tab4.HTMLElement)

    return tabElement.HTMLElement;
  }
}

class SendToAddons {
  create(){
    let divWrapper = document.createElement("div");
    let radioId1="Id-radio-test1";
    let radioId2="Id-radio-test2";
    let radioId3="Id-radio-test3";
    let radioId4="Id-radio-hidden";

    let testText = document.createTextNode("Hello Hidden Div Test");

    let radioName="radio1";
    let radioValue=1;
    let labelTxt="الاختيار الأول"

    divWrapper.classList.add("padding__meduim");

    let radioTest1 = new RadioComponent(radioId1,radioName,radioValue,labelTxt);
    let radioTest2 = new RadioComponent(radioId2,radioName,radioValue,labelTxt);
    let radioTest3 = new RadioComponent(radioId3,radioName,radioValue,labelTxt);
    let radioHidden = new RadioWithHiddenDiv(radioId4,radioName,radioValue,"الاختيار المخفي");

    radioHidden.addElementToHiddenDiv(testText);

    radioTest1.onClick((e)=>{
      console.log(e.target);
    });

    radioTest2.onClick((e)=>{
      console.log(e.target);
    });

    radioTest3.onClick((e)=>{
      console.log(e.target);
    });

    radioHidden.onClick((e)=>{
      console.log("Hidden div Shown",e.target)
    })
    divWrapper.appendChild(radioTest1.HTMLElement);
    divWrapper.appendChild(radioTest2.HTMLElement);
    divWrapper.appendChild(radioTest3.HTMLElement);
    divWrapper.appendChild(radioHidden.HTMLElement);

    return divWrapper;
  }
}

class OnineOTOAddons {
  create(){
    let classLabel=document.createElement("label");
    classLabel.textContent="OnineOTOAddons";
    classLabel.classList.add("label-class");
    return classLabel;
    
  }
}

class OnineClassAddons {
  create(){
    let classLabel=document.createElement("label");
    classLabel.textContent="OnineClassAddons";
    classLabel.classList.add("label-class");
    return classLabel;
    
  }
}


//General
// AnimSlideTrans_GAddons
// Question_title_GAddons
// Question_hint_GAddons
// Previous_link_GAddons
// Objectives_GAddons
// TestTime_GAddons
// qustion_score_GAddons


class AnimSlideTransGAddons {
  create(){
    let classLabel=document.createElement("label");
    classLabel.textContent="AnimSlideTrans_GAddons";
    classLabel.classList.add("label-class");
    return classLabel;
  }
}

class QuestionTitleGAddons {
  create(){
    let classLabel=document.createElement("label");
    classLabel.textContent="Question_title_GAddons";
    classLabel.classList.add("label-class");
    return classLabel;
  }
}

class QuestionHitGAddons {
  create(){
    let classLabel=document.createElement("label");
    classLabel.textContent="Question_hint_GAddons";
    classLabel.classList.add("label-class");
    return classLabel;
  }
}

class PreviousLinkGAddons {
  create(){
    
    let listId="list-PLGAddons-Id";
    let labelTitle = "اختيار الدرس"
    let previousLinkGAddons = new ListWithLabelComponent(listId,labelTitle);    



    return previousLinkGAddons.HTMLElement;
  }
}

class ObjectivesGAddons {
  create(){

    let divWrapper = document.createElement("div");
    let comboId = "Id-Objective-combo"
    let textareaId= "";
    let textareaLabel="عرض محتوى السؤال الفرعي";
    let selectCombo = new ComboLabelComponent(comboId,"اختيار");
    let statementValueTextarea = new TextareaLabelComponent(textareaId,textareaLabel,3)
    let newObjectiveTab = new ObjectivesTab(ModeOfOperation.SaveDirect);
    let arrUniqueLinkId = newObjectiveTab.getUniqueLinkId()
    
    //Layout
    // grid-template-areas:"a a a"
    //                     "b b b"
    //                     "c c c"
    //                     "d d d"; for Table
    divWrapper.classList.add("objective-view");
    selectCombo.HTMLElement.classList.add("layout-a");
    statementValueTextarea.HTMLElement.classList.add("layout-b");
    newObjectiveTab.HTMLElement.classList.add("layout-c");



    newObjectiveTab.fillCombo2(ShowType.All,"");
    if (arrUniqueLinkId.length>0) {
      arrUniqueLinkId.forEach((item)=>{
        item.forEach((value)=>{
          selectCombo.combo.addOptionToCombo(value.id,value.statement,true);
        })
        
      })
    }

    if (selectCombo.combo.HTMLElement.options.length>0){
      statementValueTextarea.textarea.HTMLElement.value = selectCombo.combo.HTMLElement.value;
    }
    

    selectCombo.combo.onChange((e)=>{
      statementValueTextarea.textarea.HTMLElement.value = e.target.value;
      console.log("textare Value: ",e.target.value);
    })

    divWrapper.appendChild(selectCombo.HTMLElement);
    divWrapper.appendChild(statementValueTextarea.HTMLElement);
    divWrapper.appendChild(newObjectiveTab.HTMLElement);
    
    return divWrapper;
  }
}

class TestTimeGAddons {
  create(){
    let classLabel=document.createElement("label");
    classLabel.textContent="TestTime_GAddons";
    classLabel.classList.add("label-class");
    return classLabel;
  }
}

class QuestionScoreGAddons {
  create(){
    let classLabel=document.createElement("label");
    classLabel.textContent="qustion_score_GAddons";
    classLabel.classList.add("label-class");
    return classLabel;
  }
}



// Add PlugIns Interface Variables (Addons/Quizes) 

//Quizes
// s_sorting_quiz
// l_sorting_quiz
// t_or_f_quiz
// category_quiz
// dragdrop_quiz
// m_choices_quiz
// fib_quiz
// h_word_quiz
// s_question_quiz

let s_sorting_quiz = {
  name: 's_sorting_quiz',
  exec: function() {
      return new SSortingQuiz;
      
  }
  
};


let l_sorting_quiz = {
  name: 'l_sorting_quiz',
  exec: function() {
      return new LSortingQuiz;
      
  }
};

let t_or_f_quiz = {
  name: 't_or_f_quiz',
  exec: function() {
      return new TorFQuiz;
      
  }
};

let category_quiz = {
  name: 'category_quiz',
  exec: function() {
      return new CategoryQuiz;
      
  }
};

let dragdrop_quiz = {
  name: 'dragdrop_quiz',
  exec: function() {
      return new DragAndDropQuiz;
      
  }
};

let m_choices_quiz = {
  name: 'm_choices_quiz',
  exec: function() {
      return new MChoicesQuiz;
      
  }
};

let fib_quiz = {
  name: 'fib_quiz',
  exec: function() {
      return new FIBQuiz;
      
  }
};

let h_word_quiz = {
  name: 'h_word_quiz',
  exec: function() {
      return new HWordQuiz;
      
  }
};

let s_question_quiz = {
  name: 's_question_quiz',
  exec: function() {
      return new SQuestionQuiz;
      
  }
};

//Addons

// (text_addons)
// text_read_addons 
// text_array_addons
// (pic_addons) 
// drawing_addons
// pic_hotspot_addons
// (sound_addons) 
// sound_Effect_addons
// table_addons
// (video_photo_addons)
//video_slideShow_addons
//video_anim_addons
//video_Interactive_addons
// animation_addons
// MemoryGame_addons
// Sendto_addons
// OnlineOTO_addons
// OnlineClass_addons




let text_addons = {
name: 'text_addons',
exec: function() {
    return new TextAddons('text_addons');
    
}
};

let text_read_addons = {
name: 'text_read_addons',
exec: function() {
    return new TextAddons('text_read_addons');
    
}
};



let text_array_addons = {
name: 'text_array_addons',
exec: function() {
    return new TextArrayAddons;
    
}
};

let pic_addons = {
name: 'pic_addons',
exec: function() {
    return new PicAddons('pic_addons');
    
}
};

let drawing_addons = {
name: 'drawing_addons',
exec: function() {
    return new PicAddons('drawing_addons');
    
}
};

let pic_hotspot_addons = {
name: 'pic_hotspot_addons',
exec: function() {
    return new PicHotSpotAddons;
    
}
};

let sound_addons = {
name: 'sound_addons',
exec: function() {
    return new SoundAddons('sound_addons');
    
}
};

let sound_Effect_addons = {
name: 'sound_Effect_addons',
exec: function() {
    return new SoundAddons('sound_Effect_addons');
    
}
};

let table_addons = {
name: 'table_addons',
exec: function() {
    return new tableAddons;
    
}
};

let video_photo_addons = {
name: 'video_photo_addons',
exec: function() {
    return new VideoAddons('video_photo_addons');
    
}
};

let video_slideShow_addons = {
name: 'video_slideShow_addons',
exec: function() {
    return new VideoAddons('video_slideShow_addons');
    
}
};

let video_anim_addons = {
name: 'video_anim_addons',
exec: function() {
    return new VideoAddons('video_anim_addons');
    
}
};

let video_Interactive_addons = {
name: 'video_Interactive_addons',
exec: function() {
    return new VideoAddons('video_Interactive_addons');
    
}
};

let animation_addons = {
name: 'animation_addons',
exec: function() {
    return new AnimationAddons;
    
}
};

let MemoryGame_addons = {
name: 'MemoryGame_addons',
exec: function() {
    return new MemoryGameAddons;
    
}
};

let Sendto_addons = {
name: 'Sendto_addons',
exec: function() {
    return new SendToAddons;
    
}
};

let OnlineOTO_addons = {
name: 'OnlineOTO_addons',
exec: function() {
    return new OnineOTOAddons;
    
}
};

let OnlineClass_addons = {
name: 'OnlineClass_addons',
exec: function() {
    return new OnineClassAddons;
    
}
};

//General
// AnimSlideTrans_GAddons
// Question_title_GAddons
// Question_hint_GAddons
// Previous_link_GAddons
// Objectives_GAddons
// TestTime_GAddons
// qustion_score_GAddons

let AnimSlideTrans_GAddons = {
name: 'AnimSlideTrans_GAddons',
exec: function() {
    return new AnimSlideTransGAddons;
    
}
};

let Question_title_GAddons = {
name: 'Question_title_GAddons',
exec: function() {
    return new QuestionTitleGAddons;
    
}
};

let Question_hint_GAddons = {
name: 'Question_hint_GAddons',
exec: function() {
    return new QuestionHitGAddons;
    
}
};

let Previous_link_GAddons = {
name: 'Previous_link_GAddons',
exec: function() {
    return new PreviousLinkGAddons;
    
}
};

let Objectives_GAddons = {
name: 'Objectives_GAddons',
exec: function() {
    return new ObjectivesGAddons;
    
}
};

let TestTime_GAddons = {
name: 'TestTime_GAddons',
exec: function() {
    return new TestTimeGAddons;
    
}
};

let qustion_score_GAddons = {
name: 'qustion_score_GAddons',
exec: function() {
    return new QuestionScoreGAddons;
    
}
};


//************** register Data */

// Add PlugIns Data Variables (Addons/Quizes) 
///Quizes

// s_sorting_quiz
// l_sorting_quiz
// t_or_f_quiz
// category_quiz
// dragdrop_quiz
// m_choices_quiz
// fib_quiz
// h_word_quiz
// s_question_quiz
// Quiz (Quiz_DObj)
//quizId, quizType, slideLink

let Quiz_DObj = {
  name: 'Quiz_DObj',
  exec: function(TypeArgs) {

    let quizId= `${TypeArgs.id}T${QuizType[TypeArgs.Type]}`; //quiz_Id" //Generate ID function
    let quizType= TypeArgs.Type;
    let slideLink= TypeArgs.Link || "";
      return new Quiz(quizId,quizType,slideLink);
      
  }
};



///Addons & GA Addons
// mediaObjData (mediaObjData_DObj)
// TextWordArray (TextWordArray_DObj)
// PicWithHotSpot (PicWithHotSpot_DObj)
// TableObj (TableObj_DObj)
// VideoObj (VideoObj_DObj)
// AnimationClipObj (AnimationClipObj_DObj)
// MemoryGame (MemoryGame_DObj)
// Feedback (Feedback_DObj)
//SlideTransitionObj (SlideTransitionObj_DObj)
// ObjectiveObj (ObjectiveObj_DObj)

//mediaId, text, type
let mediaObjData_DObj = {
  name: 'mediaObjData_DObj',
  exec: function(TypeArgs) {
    
    // mediaId, text, type
   let mediaId = `${TypeArgs.id}T${AddonsType[TypeArgs.Type]}`;//"media_Id"; //Generate media Id
   let text = "";
   let mediatype ="";    


      return new mediaObjData(mediaId,text,mediatype);
      
  }
};

//textArrayId, showTypeId, hasSound
let TextWordArray_DObj = {
  name: 'TextWordArray_DObj',
  exec: function(TypeArgs) {

     // textArrayId, showTypeId, hasSound
    
     let textArrayId =  `${TypeArgs.id}T${AddonsType[TypeArgs.Type]}`; // textArray_id"; //Generate Id
     let showTypeId = "";
     let hasSound = false;

      return new TextWordArray(textArrayId,showTypeId,hasSound);
      
  }
};



let PicWithHotSpot_DObj = {
  name: 'PicWithHotSpot_DObj',
  exec: function(TypeArgs) {

    // picHotSpotId, mediaObj
    let picHotSpotId=  `${TypeArgs.id}T${AddonsType[TypeArgs.Type]}`; //picHoteSpotId_id"; //Generate Id
    let mediaObj="";
    
      return new PicWithHotSpot(picHotSpotId,mediaObj);
      
  }
};

let TableObj_DObj = {
  name: 'TableObj_DObj',
  exec: function(TypeArgs) {

    // tableId
    let tableId =`${TypeArgs.id}T${AddonsType[TypeArgs.Type]}`; //"table_id"; //Generate Id
      return new TableObj(tableId);
      
  }
};

let VideoObj_DObj = {
  name: 'VideoObj_DObj',
  exec: function(TypeArgs) {

    // videoId, videoType
    let videoId =  `${TypeArgs.id}T${AddonsType[TypeArgs.Type]}`; //"video_id"; //Generate Id
    let videoType="";
    
      return new VideoObj(videoId,videoType);
      
  }
};

let AnimationClipObj_DObj = {
  name: 'AnimationClipObj_DObj',
  exec: function(TypeArgs) {

    // aniId, backgroundId
    let aniId =  `${TypeArgs.id}T${AddonsType[TypeArgs.Type]}`; //"ani_id"; //Generate Id
    let backgroundId ="";
    
      return new AnimationClipObj(aniId,backgroundId);
      
  }
};

let MemoryGame_DObj = {
  name: 'MemoryGame_DObj',
  exec: function(TypeArgs) {

    // memoryGameId
    let memoryGameId = `${TypeArgs.id}T${AddonsType[TypeArgs.Type]}`;//"memoryGame_id"; //Generate Id
    
      return new MemoryGame(memoryGameId);
      
  }
};

let Feedback_DObj = {
  name: 'Feedback_DObj',
  exec: function(TypeArgs) {

    // feedbackId, feedbackType
    let feedbackId= `${TypeArgs.id}T${AddonsType[TypeArgs.Type]}`; //"feedback_id"; //Generate Id
    let feedbackType="";
      return new Feedback(feedbackId,feedbackType);
      
  }
};

let SlideTransitionObj_DObj = {
  name: 'SlideTransitionObj_DObj',
  exec: function(TypeArgs) {

    // slideTransId, name,movieLink
    let slideTransId= `${TypeArgs.id}T${AddonsType[TypeArgs.Type]}`; //"slideTransition_id"; //Generate Id
    let name = "";
    let movieLink="";
      return new SlideTransitionObj(slideTransId,name,movieLink);
      
  }
};

let ObjectivesList_DObj = {
  name: 'ObjectivesList_DObj',
  exec: function(TypeArgs) {

    // objectiveListId
    let objectiveListId = `${TypeArgs.id}T${AddonsType[TypeArgs.Type]}`; //"objectiveList_id"; //Generate Id
    
      return new ObjectivesList(objectiveListId);
      
  }
};

