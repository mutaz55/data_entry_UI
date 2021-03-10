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
    slide_transition:"slide-transition"
       
}
const TextSentence = {              //save this values in mediaObject.tag
    text_question_title: "text-question-title",
    text_hint: "text-hint",
    text_subquiz: "text-subquiz",
    text_answer: "text-answer"
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

const fibOptions = {
  fib_words: "fib-missing-words",
  fib_dragdrop: "fib-dragdrop-words",
  fib_mchoice: "fib-multiple-words"
}

// max no of answer to be inserted in multiple choice quiz
const MaxNoOfAnswers = 5;
//Input View Abstruct Class
class InputViewClass {

    constructor(){
        //create the InputSection
        this.numberOfAnswers=0;
        this.HTMLElement="";
        
    }
    
}


// Preview View Abustruct Class

class PreviewViewClass {
   constructor(){
        // create the PreviewSection
        this.numberOfAnswers=0;
        this.HTMLElement="";
    }

    
    activateEditSubQuizPreview(_number,mediaType,event,fn){
      let txtEntryPostfix = TxtEntryPostfix.SubQuizPreview;
        
        let txtEntryId = `Id-txtEntryPreview-${mediaType}-${txtEntryPostfix}-${_number}`; 
        let txtEntry=this.HTMLElement.querySelector("#"+txtEntryId);
        console.log(txtEntry);
        txtEntry.addEventListener(event,(e)=>{
          fn(e);
        });
    }

}


class QuizInputControl{
  constructor(dataItemReciever,quizInputView){
    this.dataItemReciever = dataItemReciever;
    this.quizInputViewReciever = quizInputView;
    
  }
  buildInputView(){
    
    return this.quizInputViewReciever.HTMLElement;
  }
  generateSubQuizId(){
    let subQuizId = this.dataItemReciever.generateSubQuizId();
    return subQuizId;
  }
  
  saveToDB(){
    //to be changed to a separate Class // maybe Invoker
    //generate new SubQuizId
    let subQuizId = this.dataItemReciever.generateSubQuizId();
          
    let subQuizResult=this.quizInputViewReciever.getValues();
   
         
    //Check if all subQuizResult =="" ==> don't save Error Msg
    if(subQuizResult!="No-Entry"){

    
      console.log("SubQuizResult: ",subQuizResult);
      subQuizResult.subQuiz.mediaObjects.forEach((subQuiz)=>{

        let subQuizSaveCommand = new SaveSubQuizToDB(subQuizId,subQuiz.text,subQuiz.type);
        subQuizSaveCommand.execute();
      

      })
      
      let newSubQuiz = this.dataItemReciever.getSubQuiz(subQuizId);

      subQuizResult.Answers.forEach((answerObj)=>{

        
        console.log("subQuiz is Equal: ",answerObj);
        
        let answerId = this.dataItemReciever.generateAnswerId(newSubQuiz);

        answerObj.answer.mediaObjects.forEach((answerMedia)=>{
          let answerCommand=new SaveAnswersToDB(newSubQuiz,answerId,answerMedia.text,answerMedia.type);
          answerCommand.execute();

        });
         
      });

      return subQuizId;
    } else {
      //Error Msg "الرجاء ادخال قيم للسؤال الفرعي"
      //setFocus in subQuiz textarea [Optional]
      return "No-Entry"
    }
  }
          
  previewDeleteFn(){
  
  }
  
}




class SaveSubQuizToDB { 
  constructor(subQuizId,subQuizValue,subQuizType){
    this.dataItemReciever = new ItemsDataReciever();
    this.subQuizId  = subQuizId;
    this.subQuizValue = subQuizValue;
    this.subQuizType = subQuizType;

    if (subQuizType ==MediaType.Text_sentence){
      this.tag=TextSentence.text_subquiz;
    } else {
      this.tag="";
    }
    
    
  }
  execute(){
          
    let subQuizWrapperId = "";
    let subQuizMediaWrapper = null;
    let newSubQuiz=null;       

    //if (this.EntryValue.trim()!="") {
        
      let mediaObj = this.dataItemReciever.createSubQuizMediaObj(this.subQuizId,this.subQuizValue,this.subQuizType,this.tag);
      let oldSubQuiz = this.dataItemReciever.getSubQuiz(this.subQuizId);
      if(oldSubQuiz){
        console.log("we are using the oldSubQuiz");
       this.dataItemReciever.UpdateSubQuizMedia(mediaObj,oldSubQuiz)
                  
      } else {
        console.log("we are using a new SubQuiz");
        this.subQuizId = this.dataItemReciever.generateSubQuizId();
        subQuizWrapperId = this.dataItemReciever.generateSubQuizMediaWrapperId(this.subQuizId);
        subQuizMediaWrapper = this.dataItemReciever.createSubQuizWrapper(subQuizWrapperId);
        newSubQuiz = this.dataItemReciever.createSubQuiz(this.subQuizId,subQuizMediaWrapper);
        this.dataItemReciever.UpdateSubQuizMedia(mediaObj,newSubQuiz)
        this.dataItemReciever.addSubQuiz(newSubQuiz); 
      }
       
    //}
    
  }
  
}


class SaveAnswersToDB{

  constructor(subQuiz,answerId,answerText,answerType,correct){
    this.dataItemReciever = new ItemsDataReciever();
    this.subQuiz  = subQuiz;
    this.id=answerId;
    this.answerText=answerText;
    this.answerType=answerType;
    this.correct=correct;
    
    if (answerType ==MediaType.Text_sentence){
      this.tag=TextSentence.text_answer;
    } else {
      this.tag="";
    }
   
  }
  execute(){

    let answerMediaWrapperId = "";
    let newAnswerMediaWrapper = null;
    let newAnswer=null;      

    let answerMedia = this.dataItemReciever.createAnswerMediaObj(this.id,this.answerText,this.answerType,this.tag);
    let oldAnswer = this.dataItemReciever.getAnswer(this.subQuiz,this.id);


    if(oldAnswer){
      console.log("we are using the oldAnswer");
     this.dataItemReciever.UpdateAnswerMedia(answerMedia,oldAnswer)
                
    } else {
      console.log("we are using a new Answer");
      let answerId = this.dataItemReciever.generateAnswerId(this.subQuiz);
      answerMediaWrapperId = this.dataItemReciever.generateAnswerMediaWrapperId(answerId);
      newAnswerMediaWrapper = this.dataItemReciever.createSubQuizWrapper(answerMediaWrapperId);
      newAnswer = this.dataItemReciever.createAnswer(answerId,newAnswerMediaWrapper,this.correct);
      this.dataItemReciever.UpdateAnswerMedia(answerMedia,newAnswer)
      this.dataItemReciever.addAnswer(this.subQuiz,newAnswer);
    }

  }
}

class TableRow{
  constructor(){
    this.id="";
    this.elementText="";
    this.skillsBadges="";
  }
}

class TableElements{
  constructor(tableId){
    this.objectivesTable = new TableComponent(tableId,["table-component"],["th-css"],["td-css"]);
    this.Header={};
    this.arrData=[];
    
   
    this.HTMLElement=this.objectivesTable.HTMLElement;

    //discuss Later with Mutaz
    let colorObjMap = ['#3dbbec','#F64740', '#41337A', '#59CD90' ];           
    this.objectivesTable.setUpColorsValues(colorObjMap);

  }
 
  generateTableHead(){
    let headers = {
      العنصر:{w:'30%', type:'text'}, 
      المهارات:{w:'20%', type:'icons'} }
    this.objectivesTable.generateTableHead(headers, true);
  }
  addRow(dataRow){
    this.arrData.push(dataRow);    
  }
  generateTable(){
    let requiredFields = ['elementText','skillsBadges'];
    this.objectivesTable.generateTable(this.arrData, requiredFields);
  }
}

class TableElementsControl {
  constructor(TableId,subQuizId){

    this.objectivesTable = new TableElements(TableId);
    this.objectiveDataReciever=new ObjectiveDataReciever();     //to reach objectives where linkId == subQuizId;
    this.objectiveDataReciever.updateOperationMode(ModeOfOperation.SaveDirect);
    
    this.objectivesTable.generateTableHead();

    
    this.fillObjectiveData(subQuizId);
    
    
   
    this.objectivesTable.generateTable();

    this.HTMLElement=this.objectivesTable.HTMLElement;

  }
  fillObjectiveData(subQuizId){
    let arrObjectives =this.objectiveDataReciever.filterObjectiversBySubQuizId(subQuizId);
    let divIcons = document.createElement("div");
    let icons =null;
    
    arrObjectives.forEach((objective)=>{
    
    let tableRow = new TableRow();
    divIcons.innerHTML="";
    tableRow.elementText = objective.lingElement.elementText;
    //separate Each ling type in a table ==> need How can we do that and we are in the Table class ????!!!!
    objective.skills.forEach((skillObj)=>{
      
      icons = this.getIcons(["fas", skillObj.SkillIcon])
      icons.style.color=skillObj.SkillColor;
      divIcons.appendChild(icons);
      
    })
    tableRow.skillsBadges = divIcons.innerHTML
    this.objectivesTable.addRow(tableRow);
    
    })
    
    
 
  }
  getIcons(arriconClass){
    
    let iIcon = document.createElement("i");
    iIcon.classList.add("skill-icon");
    arriconClass.forEach((iconClass)=>iIcon.classList.add(iconClass));
    return iIcon

  }
  
}




//preview Control Class
class QuizPreviewControl{
  constructor(quizType,dataItemReciever,quizPreviewSkeleton){
    this.dataItemReciever = dataItemReciever;
    //this.quizPreviewViewReciever = quizPreviewView;
    this.quizPreviewSkeleton=quizPreviewSkeleton;
    this.previewFactory = new FactoryPreviewView();
    this.quizType=quizType;
    
    

    
  //  console.log(this.objectivesTable)
   

  }
 
  update(){
    //get currentQuiz
    let currentQuiz = this.dataItemReciever.getCurrentQuiz()
    let preViewItem=null;
    let subQuizTextValue = "";
    let subQuizPicValue = "";
    let subQuizDrawValue = "";
    let subQuizSoundValue = "";

    let previewFnClick = (e)=>{
      let subQuizId = this.getSubQuizId(e);
            
      this.objectivesTable = new TableElementsControl("Id-objectives-quiz",subQuizId);
      this.quizPreviewSkeleton.prvSide.clearItems();
      this.quizPreviewSkeleton.prvSide.addItem(this.objectivesTable.HTMLElement);
           
    }

    let previewFnDelete =(e)=>{
      let subQuizId = this.getSubQuizId(e);
      this.dataItemReciever.deleteSubQuiz(subQuizId)
      console.log(subQuizId);

    }

    this.quizPreviewSkeleton.clearContainer();

    currentQuiz.subQuizes.forEach((item,index)=>{
      //create for subQuizPreview
      preViewItem=this.previewFactory.create(this.quizType,(index+1),item);
      console.log('item ?? update Quiz preview');
      console.log(item);
      
      this.quizPreviewSkeleton.addPreview(item.id,preViewItem.HTMLElement,previewFnClick,previewFnDelete);
      

      // let fnBlur = (e)=>{
          
      //   let textareaId =e.target.id;
      //   let newValue = e.target.value;
      //   let arrIndex = [];
      //   let tag ="";
      //   [...textareaId].forEach((char,ind)=>{
          
      //     if (char=="-"){
      //       arrIndex.push(ind);
      //     }
      //   })
        
      //   let mediaType=textareaId.substring(arrIndex[1]+1,arrIndex[3]);
      //   if(mediaType ==MediaType.Text_sentence){
      //     tag=TextSentence.text_subquiz;
          
      //   }
  
      //   let subQuizTextareaSave_text = new SaveSubQuizToDB(item.id,newValue,mediaType);
      //   subQuizTextareaSave_text.execute();
  
             
      // }
      
      // if(subQuizTextValue!="Not Exist"){
        
      
      //   preViewItem.activateEditSubQuizPreview((index+1),MediaType.Text_sentence,"blur",fnBlur);
      // }
      // if(subQuizPicValue!="Not Exist"){
      
      //   preViewItem.activateEditSubQuizPreview((index+1),MediaType.pic_photo,"blur",fnBlur);
      // }
      // if(subQuizDrawValue!="Not Exist"){
     
      //   preViewItem.activateEditSubQuizPreview((index+1),MediaType.pic_drawing,"blur",fnBlur);
      // }
      // if(subQuizSoundValue!="Not Exist"){
     
      //   preViewItem.activateEditSubQuizPreview((index+1),MediaType.sound_record,"blur",fnBlur);
      // }
      
      
      
      
      //get the number of Answers in SubQuiz
      //Iterate through all Answers
        //read data from DB and set the values of Answers in quizpreviewView.
        //set the function of change/blur
    //call the Events and pass the values.

    })
    
    if(this.quizPreviewSkeleton.prvContainer.HTMLElement.hasChildNodes()){
      this.quizPreviewSkeleton.prvContainer.HTMLElement.lastChild.click();
    }
    
  }
  getSubQuizId(e){
    let previewItem = e.target
          
      while ( !(previewItem.classList.contains("preview-item-wrapper"))){
        previewItem=previewItem.parentElement;
       
      }
    return previewItem.id;
  }
}




//Input View Concreate Classes

class SSortingInputView extends InputViewClass{
  constructor(){
      super();
    let divDataInput = document.createElement("div");
    // let texareaId ="Id-SSquiz-textarea";
    // let labelTitle="الجملة";
    let tabsetId = "Id-SSorting-tabset_1";
    let tabpnId = "Id-SSorting-tabpn_1"
    let MsgCom = new messagesComponent();
    this.mobjEntry= new mediaObjEntry(tabsetId,tabpnId,TxtEntryPostfix.SubQuizInput);
    let hintMessage=MsgCom.createHintMsg("الرجاء ادخال الجمل بالترتيب الصحيح")
    divDataInput.classList.add("quiz-input");
    divDataInput.classList.add("quiz-input__SS-layout");

    //Layout grid-template-areas: "a a ."
    //                            "b b b"
    //                            "b b b";

    hintMessage.classList.add("layout-a");
    this.mobjEntry.HTMLElement.classList.add("layout-b");

    divDataInput.appendChild(hintMessage);
    divDataInput.appendChild(this.mobjEntry.HTMLElement);
    this.HTMLElement=divDataInput;
  }

  getValues(){

    let _result = this.mobjEntry.getEntries();
    
    let mediaWrapper = new MediaObjectsWrapper('none');

    _result.forEach ( (resultItem) => {
      mediaWrapper.mediaObjects.push(new mediaObjData('none',resultItem.text,resultItem.type));
    })

    let subQuizResult = new SubQuizObj('none', mediaWrapper);
    
    return subQuizResult;

  }
  clearValues(){
    this.mobjEntry.clearEntry();
  }


}

class LSortingInputView extends InputViewClass{
  constructor(){

    super();

    let divDataInput = document.createElement("div");

    //Layout
    divDataInput.classList.add("Quiz-layout-input");
    
    this.mobjEntry = new mediaObjEntry('isorting-tabset','isorting-tabpnl');
    this.mobjEntry.changeLbl('إدخال الأحرف');
    

    this.inputbox_answer = new TextareaLabelComponent('i-sorting-answerTxt', "الإجابة الصحيحة", 1);
    
    divDataInput.appendChild(this.mobjEntry.HTMLElement);
    divDataInput.appendChild(this.inputbox_answer.HTMLElement);
    

    this.HTMLElement=divDataInput;
  }

  getValues(){

    let _Ans = this.inputbox_answer.getTextValue();
    let _result = this.mobjEntry.getEntries();
    
    let mediaWrapper = new MediaObjectsWrapper('none');

    _result.forEach ( (resultItem) => {
      mediaWrapper.mediaObjects.push(new mediaObjData('none',resultItem.text,resultItem.type));
    })

    let subQuizResult = new SubQuizObj('none', mediaWrapper);

    let answerMedia = new mediaObjData('none',_Ans,MediaType.Text_sentence,TextSentence.text_answer);
    let answerMediaWrapper = new MediaObjectsWrapper('none')
    answerMediaWrapper.mediaObjects.push(answerMedia);
    subQuizResult.Answers.push(new AnswerObj('none', answerMediaWrapper, true));

    return subQuizResult;

  }
  clearValues(){
    this.mobjEntry.clearEntry();
    this.inputbox_answer.clearValue();
  }
}

class TorFInputView extends InputViewClass{

    constructor(){

        super();

          let divDataInput = document.createElement("div");
      
          //Layout
          divDataInput.classList.add("Quiz-layout-input");
          
        
        
          
          this.mobjEntry = new mediaObjEntry('tor-tabset','tor-tabpnl');
        
        
          
          this.answer_box = new ContainerLabelComponent('TF_quiz_container',"الإجابة الصحيحة",[]);

          

          this.radioBtns = new ListOfRadioOrCheckBoxComponent('trueFalseQuiz-group',["radioBtns-addBtn-container"]);
        
          

          this.radioBtns.addRadio('trueOption', 'trueFalseAnswer', 0,'الإجابة صحيحة', ()=> { });
          this.radioBtns.addRadio('falseOption', 'trueFalseAnswer', 0, 'الإجابة خاطئة',()=> {});
          
          this.answer_box.addControl(this.radioBtns.HTMLElement);
        

          divDataInput.appendChild(this.mobjEntry.HTMLElement);
          divDataInput.appendChild(this.answer_box.HTMLElement);
        
          this.HTMLElement = divDataInput;
      
    }

    getValues(){

      let _Ans = this.radioBtns.Radios.find( radio => radio.inputRadio.id == 'trueOption').inputRadio.checked;
      
      let _result = this.mobjEntry.getEntries();
      
      let mediaWrapper = new MediaObjectsWrapper('none');
  
      _result.forEach ( (resultItem) => {
        mediaWrapper.mediaObjects.push(new mediaObjData('none',resultItem.text,resultItem.type));
      })
  
      let subQuizResult = new SubQuizObj('none', mediaWrapper);
  
      let answerMedia = new mediaObjData('none',_Ans,MediaType.Text_sentence,TextSentence.text_answer);
      let answerMediaWrapper = new MediaObjectsWrapper('none')
      answerMediaWrapper.mediaObjects.push(answerMedia);
      subQuizResult.Answers.push(new AnswerObj('none', answerMediaWrapper, true));
  
      return subQuizResult;
    }
    clearValues(){
      this.mobjEntry.clearEntry();
      this.radioBtns.clearRadiosState();
    }
}

  class CategoryInputView extends InputViewClass{
    constructor(){
        super();

        let divDataInput = document.createElement("div");
      
        //Layout
        divDataInput.classList.add("Quiz-layout-input");
        

        let divWrapper = document.createElement("div");

        let mobjEntry = new mediaObjEntry();
        mobjEntry.changeLbl('إدخال مكونات الجملة');

        this.lstCategory = new ListWithLabelAndInputComponent('categoryLst-id',"إدخال تصنيف الجملة","category_entryTxt","تصنيف الجملة", "addCategory_btn", ()=>{});


        this.lstCategory.addbutton.onClick( ()=> {


          if (checkValidation(this.lstCategory.getTextValue(), this.lstCategory.listElement.HTMLElement)) {
          

            if (this.lstCategory.listElement.HTMLElement.mode == "normal") {
        
              
                let _id = getId_fromArry("btnLstItem",this.lstCategory.lstCatObj,'_');
                

                let _txt =  this.lstCategory.getTextValue();
                
                this.lstCategory.lstCatObj.push({'txt':_txt, 'id': _id})

                this.lstCategory.listElement.addButtonWithCloseBoxToList(_txt, _id, _id, this.lstCategory.clickOnLstBtn,this.lstCategory.clkOnClose, this.lstCategory);
                this.lstCategory.currentValue = _id;

            
                activateCurrentBtn(_id);
            
            }
            // Update mode
            else {
              
              // update list item text Tab1
              updateListBtnTxt(this.lstCategory.listElement.HTMLElement , this.lstCategory.currentValue, this.lstCategory.getTextValue());
              this.lstCategory.lstCatObj.find( item => item.id == this.lstCategory.currentValue).txt = this.lstCategory.getTextValue();
              // Back to normal mode
              resetAddBtn(this.lstCategory.listElement.HTMLElement,this.lstCategory.inputText.HTMLElement,this.lstCategory.addbutton.HTMLElement);
        
              activateCurrentBtn(this.lstCategory.listElement.HTMLElement.index);
            }

            this.lstCategory.clearTxtBox();
        
          }

        });

          


        divWrapper.appendChild(mobjEntry.HTMLElement);
        divWrapper.appendChild(this.lstCategory.HTMLElement);
        divDataInput.appendChild(divWrapper);
        
        this.HTMLElement = divDataInput;

    }
  }

  class DragAndDropInputView extends InputViewClass{
    constructor(){
        super();
        let divDataInput = document.createElement("div");
      
          //Layout
          divDataInput.classList.add("Quiz-layout-input");
          
    
          let divWrapper = document.createElement("div");
          divWrapper.classList.add("component-container--vertical");

          
          this.mobjEntry_1 = new mediaObjEntry('dragdrop-tabset1','dragdrop-tabpnl1');
          this.mobjEntry_2 = new mediaObjEntry('dragdrop-tabset2','dragdrop-tabpnl2');
          this.mobjEntry_1.changeLbl('إدخال الجملة الأولى');
          this.mobjEntry_2.changeLbl('إدخال الجملة المقابلة');

    
  
          divWrapper.appendChild(this.mobjEntry_1.HTMLElement);
          divWrapper.appendChild(this.mobjEntry_2.HTMLElement);
        
          divDataInput.appendChild(divWrapper);
        
          this.HTMLElement = divDataInput;
    }

    getValues(){

        let _Ans = this.mobjEntry_2.getEntries();
        let _question = this.mobjEntry_1.getEntries();
        
        let mediaWrapper = new MediaObjectsWrapper('none');
    
        _question.forEach ( (QItem) => {
          mediaWrapper.mediaObjects.push(new mediaObjData('none', QItem.text, QItem.type));
        });
    
        let subQuizResult = new SubQuizObj('none', mediaWrapper);
    
        let answerMediaWrapper = new MediaObjectsWrapper('none')
        _Ans.forEach ( (AItem) => {
          answerMediaWrapper.mediaObjects.push(new mediaObjData('none', AItem.text, AItem.type));
        });
    
        subQuizResult.Answers.push(new AnswerObj('none', answerMediaWrapper, true));
    
        console.log('result>>>');
        console.log(subQuizResult);

        return subQuizResult;
  
    }
    clearValues(){
      this.mobjEntry_1.clearEntry();
      this.mobjEntry_2.clearEntry();
    }
  }

  class MChoiceInputView extends InputViewClass{
    constructor(maxNoOfAnswers){
        super();

              
          let divDataInput = document.createElement("div");
      
          //Layout
          divDataInput.classList.add("Quiz-layout-input");
          

          let divWrapper = document.createElement("div");
  
          //Layout
          divWrapper.classList.add("component-container--vertical");
            
        
          
          this.mobjEntry = new mediaObjEntry('mchoice-q-tabset','mchoice-q-tabpnl','mch-q');
          this.mobjEntry.changeLbl('إدخال السؤال');
          
          
          let innerWrapper = document.createElement("div");
          
          let answersTabset = new TabComponent(["الإجابة الصحيحة"],maxNoOfAnswers,  "answersSet-","answersPnl-");
          this.ansTabsets = answersTabset;
          answersTabset.addLabel ("الإجابات");
          
          answersTabset.changeTabLblCss(['tab-label-correct-answer']);

          this.answerPnl_correct = new mediaObjEntry('answerSet-correct','answerPnl-correct','mch-ansT');
          this.answerPnl_correct.changeLbl("إدخال الإجابة الصحيحة");

          
          answersTabset.fillTabPanel(0,this.answerPnl_correct.HTMLElement);

          
          answersTabset.tabSets[0].HTMLElement.dispatchEvent(new Event('click'));


          let addAnswerBtn = new AddBtnWordComponent('add-answer', 'إضافة إجابة',["add-btn"]);


          this.answers_incorrect = [];
         
          
        let remove_tab = ()=> {

            this.answers_incorrect.splice(answersTabset.tabSets.index - 1, 1);
           
            
            if ((answersTabset.tabSets.index - 1) <= 0)
                answersTabset.tabSets[0].HTMLElement.dispatchEvent(new Event('click'));
            else if (answersTabset.tabSets.index == 1) 
                answersTabset.tabSets[1].HTMLElement.dispatchEvent(new Event('click'));
            else if ((answersTabset.tabSets.index - 1) > 0) 
                answersTabset.tabSets[answersTabset.tabSets.index - 1].HTMLElement.dispatchEvent(new Event('click'));

            
        }


          addAnswerBtn.onClick(()=> {
            
            console.log(this.answers_incorrect);
            // if (addAnswerBtn.noOfAnswers > maxNoOfAnswers - 2 ) return;
            if (answersTabset.tabSets.index >= maxNoOfAnswers) return;

            this.answers_incorrect.push (new mediaObjEntry( 'ansSet-incorrect-'+ (answersTabset.tabSets.index + 1), 
                                                            'ansPnl-incorrect-' + (answersTabset.tabSets.index + 1),
                                                            'mch-ansF'+ (answersTabset.tabSets.index + 1)));

            this.answers_incorrect[this.answers_incorrect.length - 1].changeLbl(`إدخال الإجابة ${(answersTabset.tabSets.index + 1)}`);

            answersTabset.addTab( "الإجابة " + (answersTabset.tabSets.index + 1), remove_tab,"tab-label-Incorrect-answer");

            answersTabset.fillTabPanel(answersTabset.tabSets.index, this.answers_incorrect[answersTabset.tabSets.index - 1].HTMLElement);

            answersTabset.tabSets[answersTabset.tabSets.index].HTMLElement.dispatchEvent(new Event('click'));

            answersTabset.tabSets.index += 1;

          });

          answersTabset.addControls(addAnswerBtn,["any"]);
          
          innerWrapper.appendChild(answersTabset.HTMLElement);
          



          divWrapper.appendChild(this.mobjEntry.HTMLElement);
          divWrapper.appendChild(innerWrapper);

          divDataInput.appendChild(divWrapper);
        
          this.HTMLElement = divDataInput;
          
    }
    getValues(){

      let _Ans_correct = this.answerPnl_correct.getEntries();

      let _question = this.mobjEntry.getEntries();
      
      let mediaWrapper = new MediaObjectsWrapper('none');
  
      _question.forEach ( (QItem) => {
        mediaWrapper.mediaObjects.push(new mediaObjData('none', QItem.text, QItem.type));
      });
  
      let subQuizResult = new SubQuizObj('none', mediaWrapper);
  


      let answerMediaWrapper_correct = new MediaObjectsWrapper('none')
      _Ans_correct.forEach ( (AItem) => {
        answerMediaWrapper_correct.mediaObjects.push(new mediaObjData('none', AItem.text, AItem.type));
      });
  

      subQuizResult.Answers.push(new AnswerObj('none', answerMediaWrapper_correct, true));
  

      this.answers_incorrect.forEach ( (ans_incorrect) => {
        let answerMediaWrapper_Incorrect = new MediaObjectsWrapper('none');
        ans_incorrect.getEntries().forEach ( (AItem) => {
          answerMediaWrapper_Incorrect.mediaObjects.push(new mediaObjData('none', AItem.text, AItem.type));
        })
        subQuizResult.Answers.push(new AnswerObj('none', answerMediaWrapper_Incorrect, false));

      });


      console.log('result>>>');
      console.log(subQuizResult);

      return subQuizResult;
    }
    clearValues(){
      this.mobjEntry.clearEntry();
      this.answerPnl_correct.clearEntry();
      this.ansTabsets.clearTabs();
      this.answers_incorrect = [];

    }
  }

  class FIBInputView extends InputViewClass{
    constructor(){
        super();

              
          let blank_symbols = [" [  1  ] ", "{  2  }", "(  3  )"];
          
          let divDataInput = document.createElement("div");
      
          //Layout
          divDataInput.classList.add("Quiz-layout-input");
          
          let divWrapper = document.createElement("div");
          //   let divDataInput = document.createElement("div");
          //   let divDataPreview = document.createElement("div");
          divWrapper.classList.add("component-container--vertical");

          
          let fibType = new ComboLabelComponent('fibtype-id','طريقة ملء الفراغ');
          fibType.combo.addOptionToCombo('إدخال كتابي',fibOptions.fib_words);
          fibType.combo.addOptionToCombo('drag & drop', fibOptions.fib_dragdrop, true);
          fibType.combo.addOptionToCombo('خيارات متعددة',fibOptions.fib_mchoice, true);



          let inputbox_fib = new TextareaLabelComponent('fibQuestionTxt', "إدخال الجملة", 2);
          inputbox_fib.labelTitle.classList.add('margin--top-10');
          let fibBtn = new AddBtnWordComponent('addBlankBtn', 'إدخال فراغ', ["add-btn","margin--top-10"]);

          fibBtn.onClick(()=> {
            
            if (inputbox_fib.textarea.HTMLElement.value.match(/\[[^\]]*?\]/g)) return;

            if (inputbox_fib.textarea.HTMLElement.selectionStart || inputbox_fib.textarea.HTMLElement.selectionStart === 0) {
              
              let startPos = inputbox_fib.textarea.HTMLElement.selectionStart;
              let endPos = inputbox_fib.textarea.HTMLElement.selectionEnd;
              inputbox_fib.textarea.HTMLElement.value = inputbox_fib.textarea.HTMLElement.value.substring(0, startPos) +
              blank_symbols[0] +
              inputbox_fib.textarea.HTMLElement.value.substring(endPos, inputbox_fib.textarea.HTMLElement.value.length);
              inputbox_fib.textarea.HTMLElement.selectionStart = startPos + blank_symbols[0].length;
              inputbox_fib.textarea.HTMLElement.selectionEnd = startPos + blank_symbols[0].length;
            } 
          else {
              inputbox_fib.textarea.HTMLElement.value += blank_symbols[0];
          }

            
          });

          let inputbox_answer = new InputLabelComponent('fibAnswerTxt', "إدخال الإجابة", ["textarea-description"]);
          inputbox_answer.labelTitle.classList.add('margin--top-10');

          inputbox_answer.HTMLElement.addEventListener('change', (e)=> {

            
            inputbox_fib.textarea.HTMLElement.value = inputbox_fib.textarea.HTMLElement.value.replace(/\[[^\]]*?\]/g, "[ "+ e.target.value +" ]");

          });
          
         
          //Layout
          divWrapper.classList.add("component-container--vertical");
          divWrapper.appendChild(fibType.HTMLElement);
          divWrapper.appendChild(inputbox_fib.HTMLElement);
          divWrapper.appendChild(fibBtn.HTMLElement);
          divWrapper.appendChild(inputbox_answer.HTMLElement);
         
          
          
        
          
          divDataInput.appendChild(divWrapper);
        
          this.HTMLElement = divDataInput;
          
    }
  }

  class HWordInputView extends InputViewClass{
    constructor(){
        super();

        
    
        let divDataInput = document.createElement("div");
      
        //Layout
        divDataInput.classList.add("Quiz-layout-input");

        let divWrapper = document.createElement("div");
        divWrapper.classList.add("component-container--vertical");

        let inputbox_hword = new TextareaLabelComponent('hwordQuizTxt', "إدخال الجملة", 3);
        inputbox_hword.labelTitle.classList.add('margin--top-10');

        
        let lstHword = new ListWithLabelAndInputComponent('lstHword-id',"إدخال الكلمة المراد تعليمها","lstHword_entryTxt","إدخال الكلمة", "lstHword_btn");
        lstHword.addbutton.HTMLElement.addEventListener('click', ()=> {
          console.log('clicked');
        });



        divWrapper.appendChild(inputbox_hword.HTMLElement)
        divWrapper.appendChild(lstHword.HTMLElement);

        divDataInput.appendChild(divWrapper);
        
        this.HTMLElement = divDataInput;
    
    }
  }

  class SimpleQuestionInputView extends InputViewClass{
    constructor(){

    super();
        
    let divDataInput = document.createElement("div");

    //Layout
    divDataInput.classList.add("Quiz-layout-input");
    
    this.mobjEntry = new mediaObjEntry();
    this.mobjEntry.changeLbl('إدخال السؤال');
    

    this.inputbox_answer = new TextareaLabelComponent('s-question-answerTxt', "الإجابة الصحيحة", 1);


    this.mobjEntry = new mediaObjEntry('s-question-tabset','s-question-tabpnl');
    this.mobjEntry.changeLbl('إدخال الإجابة');
    

    this.inputbox_answer = new TextareaLabelComponent('i-sorting-answerTxt', "الإجابة الصحيحة", 1);
    
    divDataInput.appendChild(this.mobjEntry.HTMLElement);
    divDataInput.appendChild(this.inputbox_answer.HTMLElement);
    

    this.HTMLElement=divDataInput;
  }

  getValues(){

    let _Ans = this.inputbox_answer.getTextValue();
    let _result = this.mobjEntry.getEntries();
    
    let mediaWrapper = new MediaObjectsWrapper('none');

    _result.forEach ( (resultItem) => {
      mediaWrapper.mediaObjects.push(new mediaObjData('none',resultItem.text,resultItem.type));
    })

    let subQuizResult = new SubQuizObj('none', mediaWrapper);

    let answerMedia = new mediaObjData('none',_Ans,MediaType.Text_sentence,TextSentence.text_answer);
    let answerMediaWrapper = new MediaObjectsWrapper('none')
    answerMediaWrapper.mediaObjects.push(answerMedia);
    subQuizResult.Answers.push(new AnswerObj('none', answerMediaWrapper, true));

    return subQuizResult;

  }
  clearValues(){
    this.mobjEntry.clearEntry();
    this.inputbox_answer.clearValue();
  }
  }



//Preview View Concreate Classes

class SSortingPreviewView extends PreviewViewClass{
  constructor(_number,_subQuizObj){
    super();
    // let divLSquizItem =  document.createElement("div");
    // divLSquizItem.className = "SL-quizItemsPreview--container";

    let mObjPreview = new mediaObjPreview( _number,TxtEntryPostfix.SubQuizPreview,"tabset-id-" + _number, "tabpnl-id-" + _number);
    
    mObjPreview.setEntries(_subQuizObj.subQuiz);
    mObjPreview.activateOnEvent("blur",_subQuizObj.id);
    mObjPreview.assignQuizNo(_number);
    
    this.HTMLElement=mObjPreview.HTMLElement;
  }
}


class LSortingPreviewView extends PreviewViewClass{
  constructor(_number, _subQuizObj){
    super();

       let divLSquizItem =  document.createElement("div");

       
       let mObjPreview = new mediaObjPreview( _number,"tabset-id-" + _number, "tabpnl-id-" + _number);
       mObjPreview.setEntries(_subQuizObj.subQuiz);
       mObjPreview.activateOnEvent("blur",_subQuizObj.id);
       mObjPreview.assignQuizNo(_number);
       
       let answerPreview = new TextareaComponent("answer-SL-quiz-Id-" + _number , 2,["SL-quizAnswerPreview"]);

       answerPreview.setTextValue(_subQuizObj.Answers[0].answer.mediaObjects[0].text);
       answerPreview.onEvent("blur",(e)=>{
        _subQuizObj.Answers[0].answer.mediaObjects[0].text=e.target.value;
       })
 
       divLSquizItem.appendChild(mObjPreview.HTMLElement);
       divLSquizItem.appendChild(answerPreview.HTMLElement);
            
    this.HTMLElement=divLSquizItem;
  }
}


class TorFPreviewView extends PreviewViewClass{
  constructor(_number, _subQuizObj){
    super();

       let divLSquizItem =  document.createElement("div");
       //divLSquizItem.className = "SL-quizItemsPreview--container";
 
       let mObjPreview = new mediaObjPreview( _number,"tabset-id-" + _number, "tabpnl-id-" + _number);
       mObjPreview.setEntries(_subQuizObj.subQuiz);
       mObjPreview.activateOnEvent("blur",_subQuizObj.id);
       mObjPreview.assignQuizNo(_number);
       
       

       let answerPreview = new ListOfRadioOrCheckBoxComponent('trueFalseQuiz-preview'+_number,["radioBtns-addBtn-container"]);
       let _correct = Number(_subQuizObj.Answers[0].answer.mediaObjects[0].text);
       let _incorrect = Number(!_subQuizObj.Answers[0].answer.mediaObjects[0].text);
       let changeRadioValue = () => {
          _subQuizObj.Answers[0].answer.mediaObjects[0].text =  answerPreview.getRadioValue('truePrev'+_number);

        };

       answerPreview.addRadio('truePrev'+_number, 'trueFalsePreview' + _number, _correct  ,'الإجابة صحيحة', changeRadioValue);
       answerPreview.addRadio('falsePrev'+_number, 'trueFalsePreview'+_number, _incorrect , 'الإجابة خاطئة', changeRadioValue);


       divLSquizItem.appendChild(mObjPreview.HTMLElement);
       divLSquizItem.appendChild(answerPreview.HTMLElement);
            
    this.HTMLElement=divLSquizItem;
  }
}

class CategoryPreviewView extends PreviewViewClass{
  constructor(){
    super();

    
  }
}

class DragAndDropPreviewView extends PreviewViewClass{
  constructor(_number, _subQuizObj){
    super();

      let divLSquizItem =  document.createElement("div");

      let mObjPreview = new mediaObjPreview( _number,"q-tabset-id-" + _number, "q-tabpnl-id-" + _number);
      mObjPreview.setEntries(_subQuizObj.subQuiz);
      mObjPreview.activateOnEvent("blur",_subQuizObj.id);
      mObjPreview.assignQuizNo(_number);
      
      let answerPreview = new mediaObjPreview( _number,"ans-tabset-id-" + _number, "ans-tabpnl-id-" + _number);

      answerPreview.setEntries(_subQuizObj.Answers[0].answer);
      answerPreview.activateOnEvent("blur", _subQuizObj.Answers[0].id )

      divLSquizItem.appendChild(mObjPreview.HTMLElement);
      divLSquizItem.appendChild(answerPreview.HTMLElement);
      
      
      this.HTMLElement=divLSquizItem;
    
  }
}

class MChoicePreviewView extends PreviewViewClass{
  constructor(_number, _subQuizObj){
    super();
    console.log('subquiz>>>');
    console.log(_subQuizObj);

    let divLSquizItem =  document.createElement("div");

    let quizId = _subQuizObj.id;
    
    let shortQ_id = quizId.slice(-6);

    let mObjPreview = new mediaObjPreview(_number,shortQ_id,"tbset-q" + shortQ_id + _number, "tbpnl-" + shortQ_id + _number);
    mObjPreview.setEntries(_subQuizObj.subQuiz);
    mObjPreview.activateOnEvent("blur",quizId);
    mObjPreview.assignQuizNo(_number);
    

    let innerWrapper = document.createElement("div");
    
    let ansId = _subQuizObj.Answers[0].id;
    let shortA_id = ansId.slice(-6);
    
    let answersTabset = new TabComponent(["الإجابة الصحيحة"],MaxNoOfAnswers, "ansPrvSet-" + shortA_id,"ansPrvPnl-" + shortA_id);
    answersTabset.changeTabLblCss(['tab-label-correct-answer']);

    
    let answerPnl_correct = new mediaObjPreview(_number,shortA_id,'AP-Set-c' + shortA_id ,'AP-Pnl-c' + shortA_id);
    answerPnl_correct.setEntries(_subQuizObj.Answers[0].answer) 
    answerPnl_correct.activateOnEvent("blur", ansId)
    
    answersTabset.fillTabPanel(0,answerPnl_correct.HTMLElement);

       
    let answers_incorrect = _subQuizObj.Answers.slice(1);
   
    
    let remove_tab = ()=> {

      _subQuizObj.Answers.splice(answersTabset.tabSets.index, 1);
     
      
      if ((answersTabset.tabSets.index - 1) <= 0)
          answersTabset.tabSets[0].HTMLElement.dispatchEvent(new Event('click'));
      else if (answersTabset.tabSets.index == 1) 
          answersTabset.tabSets[1].HTMLElement.dispatchEvent(new Event('click'));
      else if ((answersTabset.tabSets.index - 1) > 0) 
          answersTabset.tabSets[answersTabset.tabSets.index - 1].HTMLElement.dispatchEvent(new Event('click'));

      
    }
    answers_incorrect.forEach( (inc_ans, index)=> {

      let shortA_inc_id = inc_ans.id.slice(-6);

      let ans_incorrect =  new mediaObjPreview( index, shortA_inc_id ,'ASet-inc'+ shortA_inc_id, 'APnl-inc'+ shortA_inc_id);
  
      answersTabset.addTab("الإجابة " + (index + 2),remove_tab,"tab-label-Incorrect-answer");
      answersTabset.tabSets.index +=1;

      ans_incorrect.setEntries(inc_ans.answer);
      ans_incorrect.activateOnEvent('blue', inc_ans.id)
      answersTabset.fillTabPanel(index + 1, ans_incorrect.HTMLElement);


    });

    answersTabset.tabSets[0].HTMLElement.dispatchEvent(new Event('click'));
       
    innerWrapper.appendChild(answersTabset.HTMLElement);
    

    divLSquizItem.appendChild(mObjPreview.HTMLElement);
    divLSquizItem.appendChild(innerWrapper);
    
    
    this.HTMLElement=divLSquizItem;
  }
}

class FIBPreviewView extends PreviewViewClass{
  constructor(){
    super();

    
  }
}

class HWordPreviewView extends PreviewViewClass{
  constructor(){
    super();

    
  }
}

class SimpleQuestionPreviewView extends PreviewViewClass{
  constructor(_number, _subQuizObj){
    super();

    let divLSquizItem =  document.createElement("div");
    //divLSquizItem.className = "SL-quizItemsPreview--container";

    let mObjPreview = new mediaObjPreview( _number,"tabset-id-" + _number, "tabpnl-id-" + _number);
    mObjPreview.setEntries(_subQuizObj.subQuiz);
    mObjPreview.activateOnEvent("blur",_subQuizObj.id);
    mObjPreview.assignQuizNo(_number);
    
    let answerPreview = new TextareaComponent("answer-SQ-quiz-Id-" + _number , 2,["SL-quizAnswerPreview"]);
    console.log("subQuiz to be set: ",_subQuizObj)
    answerPreview.setTextValue(_subQuizObj.Answers[0].answer.mediaObjects[0].text);
    answerPreview.onEvent("blur",(e)=>{
     _subQuizObj.Answers[0].answer.mediaObjects[0].text=e.target.value;
    })

    divLSquizItem.appendChild(mObjPreview.HTMLElement);
    divLSquizItem.appendChild(answerPreview.HTMLElement);
         
    this.HTMLElement=divLSquizItem;
    
  }
}


// ********************************************

class QuizPreviewSkeleton{
  constructor(){
 
  this.previewSection = document.createElement("div");
  let sidePreviewId="id-side-preview";
  let SidePreviewTitle = "العناصر والمهارات"


  this.prvContainer = new PreviewContainer();
 
  this.prvSide = new SidePreview(sidePreviewId,SidePreviewTitle)
  
  this.previewSection.classList.add("Quiz-layout-preview");
  //previewSection.className = "Quiz-layout-preview";
  this.prvContainer.HTMLElement.classList.add("layout-n");
  this.prvSide.HTMLElement.classList.add("layout-m")
 
  this.previewSection.appendChild(this.prvContainer.HTMLElement);
  this.previewSection.appendChild(this.prvSide.HTMLElement)
  this.HTMLElement=this.previewSection;
 
  //previewSection.style.display = "none";
  
  }

  addPreview(previewItemId,previewItem,previewClickFn,previewDeleteFn){      
      let id_c = previewItemId+"_c";       
      this.prvContainer.addPreviewItem(previewItemId,previewItem,id_c,previewClickFn,previewDeleteFn);
  } 
  clearContainer(){
    if (this.prvContainer.HTMLElement.firstChild) {
      while (this.prvContainer.HTMLElement.firstChild) {
        this.prvContainer.HTMLElement.removeChild(this.prvContainer.HTMLElement.firstChild);
      }
    }

  }
  showQuizPreview(){
    this.previewSection.style.display = "block";
  }

  hideQuizPreview(){
    this.previewSection.style.display = "none";

  }


}



  //********************************************

  class ItemsDataReciever{
    constructor(){
  
    }
    getCurrentQuiz(){
      // get currentItem
      let currentItem = _courses.getCurrentItem();
      // get QuizObj, quizId from currentItem
      let QuizObj = currentItem.dataObj;
      return QuizObj;

    }
    generateSubQuizId(){
       
      let QuizObj = this.getCurrentQuiz();
      let quizId = QuizObj.id;
      // Generate subQuizId from quizId, array == QuizObj.subQuizes
      let subQuizId = getId_fromArry(quizId, QuizObj.subQuizes,"U");
  
    return subQuizId;
  
    }
  
    generateSubQuizMediaWrapperId(subQuizId){
        let subQuizMediaWrapperId = subQuizId+"_w";
        return subQuizMediaWrapperId;
    }
    
    generateSubQuizMediaId(subQuizId,mediaType){
        
        let subQuizMediaId = `${subQuizId}-${mediaType}`;
        return subQuizMediaId;
    }
  
    generateAnswerId(subQuiz){
        let subQuizId =subQuiz.id;
        let answerId = getId_fromArry(subQuizId, subQuiz.Answers,"N");
        return answerId;
    }
  
    generateAnswerMediaWrapperId(answerId){
        let answerMediaWrapperId = answerId+"_w";
        return answerMediaWrapperId;
      }
    generateAnswerMediaId(answerId,mediaType){
        let answerMediaId = `${answerId}-${mediaType}`;
        return answerMediaId;
  
    }
    getSubQuiz(subQuizId){
      let currentQuiz = _courses.getCurrentItem().dataObj;
      let currentSubQuiz = currentQuiz.subQuizes.find((item)=> item.id == subQuizId);
      return currentSubQuiz;
    }
    getAnswer(subQuiz,answerId){
      
      let currentAnswer = subQuiz.Answers.find((item)=> item.id == answerId);
      return currentAnswer;
    }
    getSubQuizData(currentSubQuiz,mediaType){
          
      let txtEntry = currentSubQuiz.subQuiz.mediaObjects.find((item)=> item.type == mediaType);
      if(txtEntry!=undefined){
        return txtEntry.text;
      } else {
        return "Not Exist"
      }
      
      
    }
    
    UpdateSubQuizMedia(mediaObj,subQuizItem){
        //Add or Update Values of mediaObj 
        
      let mediaObjIndex = subQuizItem.subQuiz.mediaObjects.findIndex((item)=>item.type.trim()==mediaObj.type.trim());
      console.log(mediaObjIndex);
      
      if (mediaObjIndex==-1){
        subQuizItem.subQuiz.mediaObjects.push(mediaObj)
      } else {
        subQuizItem.subQuiz.mediaObjects[mediaObjIndex]=mediaObj;
      }
    }

    UpdateAnswerMedia(mediaObj,answerObj){
      //Add or Update Values of mediaObj 
      
    let mediaObjIndex = answerObj.answer.mediaObjects.findIndex((item)=>item.type.trim()==mediaObj.type.trim());
    console.log('updateAnswerObj');
    console.log(mediaObjIndex);
    console.log(mediaObj);
    console.log(answerObj);
    
    if (mediaObjIndex==-1){
      answerObj.answer.mediaObjects.push(mediaObj)
    } else {
      answerObj.answer.mediaObjects[mediaObjIndex]=mediaObj;
    }
  }



    addSubQuiz(subQuiz){
      let currentQuiz = _courses.getCurrentItem().dataObj;
      currentQuiz.subQuizes.push(subQuiz);

    }
    createSubQuizWrapper(subQuizWrapperId){
      //create subQuizMediaWrapper
      console.log(subQuizWrapperId);
      let subQuizMediaWrapper = new MediaObjectsWrapper(subQuizWrapperId);
      console.log(subQuizMediaWrapper);
      return subQuizMediaWrapper;
      
    }
    createSubQuiz(subQuizId,subQuizMediaWrapper){
      // create SubQuiz;
    let newSubQuiz = new SubQuizObj(subQuizId,subQuizMediaWrapper);
    return newSubQuiz;
    }
    createAnswer(AnswerId,answerMediaWrapper,correct){
      // create AnswerObj;
    let newAnswer = new AnswerObj(AnswerId,answerMediaWrapper,correct);
    return newAnswer;
    }

    deleteSubQuiz(subQuizId){
      let currentQuiz = _courses.getCurrentItem().dataObj;
      let subQuizIndex = currentQuiz.subQuizes.findIndex((item)=> item.id == subQuizId);

      currentQuiz.subQuizes.splice(subQuizIndex, 1)
    }
    createSubQuizMediaObj(subQuizId,txtEntry,mediaType,tag){
      
        let mediaId = this.generateSubQuizMediaId(subQuizId,mediaType)
        //create mediaObj
        let mediaObj = new mediaObjData(mediaId,txtEntry,mediaType,tag);
            
        return(mediaObj);
       
    }
    createAnswerMediaObj(answerId,txtEntry,mediaType,tag){
      
      let mediaId = this.generateAnswerMediaId(answerId,mediaType);
      //create mediaObj
      let mediaObj = new mediaObjData(mediaId,txtEntry,mediaType,tag);
          
      return(mediaObj);
     
  }
  addAnswer(subQuiz,answerObj){
    subQuiz.Answers.push(answerObj);
  }
  
  
  }


//Factory Input view

class FactoryInputView {
  constructor(){

  }
  create(QuizType){
    switch (QuizType) {
      case QuizTypes.SSorting:
        return new SSortingInputView();
      case QuizTypes.LSorting:
        return new LSortingInputView();
      case QuizTypes.TorF:
          return new TorFInputView();
      case QuizTypes.Category:
        return new CategoryInputView();
      case QuizTypes.dragdrop_quiz: 
        return new DragAndDropInputView();
      case QuizTypes.MChoices:
        return new MChoiceInputView(MaxNoOfAnswers);
      case QuizTypes.FIB:
        return new FIBInputView();
      case QuizTypes.HWord:
        return new HWordInputView();
      case QuizTypes.SQuestion:
        return new SimpleQuestionInputView();
    }
  }
}

  //Factory Preview view

  class FactoryPreviewView {
    constructor(){

    }
    create(QuizType,_number,subQuizdataObj){
      switch (QuizType) {
        case QuizTypes.SSorting:
          return new SSortingPreviewView(_number,subQuizdataObj);
        case QuizTypes.LSorting:
          return new LSortingPreviewView(_number,subQuizdataObj);
        case QuizTypes.TorF:
            return new TorFPreviewView(_number,subQuizdataObj);
        case QuizTypes.Category:
          return new CategoryPreviewView(_number,subQuizdataObj);
        case QuizTypes.dragdrop_quiz:
          return new DragAndDropPreviewView(_number,subQuizdataObj);
        case QuizTypes.MChoices:
          return new MChoicePreviewView(_number,subQuizdataObj);
        case QuizTypes.FIB:
          return new FIBPreviewView(_number,subQuizdataObj);
        case QuizTypes.HWord:
          return new HWordPreviewView(_number,subQuizdataObj);
        case QuizTypes.SQuestion:
          return new SimpleQuestionPreviewView(_number,subQuizdataObj);
      }
    }
  }
  