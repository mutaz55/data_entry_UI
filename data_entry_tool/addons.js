
//*****************Add-ons************************* */

// Text - word - Array
class TextWordArray {
    constructor(textArrayId, showTypeId, hasSound) {
        this.id = textArrayId;
        this.type = "TextWordArray";
        this.showType = showTypeId; // read fro Project Library with the showTypeId
        this.sound = hasSound; //true or false
        this.Words = [];
  
    }
  }
  
  class WordObj {
    constructor(wordId, word, meaning, PicDescription) {
        this.wordId = wordId;
        this.word = word;
        this.meaning = meaning;
        this.picDes = PicDescription;
  
    }
  }
  
  
  
  // pic with Hot Spot
  class PicWithHotSpot {
    constructor(picHotSpotId, mediaObj){
        this.id=picHotSpotId;
        this.pic=mediaObj;
        this.hotSpots=[];
    }
  }
  
  class HotSpotObj {
    constructor(HotSpotId,HotSpotText,YorN){
        this.id=HotSpotId;
        this.text=HotSpotText;
        this.sound=YorN;
    }
  }
  
  
  // TableObj
  class TableObj {
    constructor(tableId) {
        this.id=tableId;
        this.colsNumber="";
        this.records=[]; //Save ColObj check before add if ColObj.cols.length === TableObj.colsNumber
    }
  }
  
  class ColObj {
    constructor(colId){
        this.id =colId;
        this.cols = []; //Save mediaObj
    }
  }
  
  
  // Video all types
  
  class VideoObj {
    constructor(videoId, videoType) {
        this.id = videoId;
        this.type = videoType;
        this.videoScenes = [];
    }
  }
  
  class VideoSceneObj {
    constructor(videoSceneId, videoSceneName, locationId, timeID) {
        this.id = videoSceneId;
        this.name = videoSceneName;
        this.location = locationId;
        this.time = timeID;
        this.sequence = []; //DialogObj, InteractiveQuizObj
    }
  }
  
  class DialogObj {
    constructor(dialogId, action, dialogText, IsVoiceOver) {
        this.id = dialogId;
        this.character = []; //CharacterId more than one if they talking in the same time.
        this.action = action;
        this.text = dialogText;
        this.voiceOver = IsVoiceOver;
    }
  }
  
  class InteractiveQuizObj {
    constructor(interQuizId, statement, feedbackCorrect, feedbackWrong) {
        this.id = interQuizId;
        this.statement = statement;
        this.Answers = []; //AnswerObj
        this.feedBackCorrect = feedbackCorrect;
        this.feedbackWrong = feedbackWrong;
  
    }
  }
  
  // Animation
  
  class AnimationClipObj {
    constructor(aniId, backgroundId) {
        this.id = aniId;
        this.backgroundId = backgroundId;
        this.animationObjects = [];
    }
  }
  
  class animationObj {
    constructor(aniSceneObjId, aniObjectId, animationType, animationDes, SoundDes) {
        this.Id = aniSceneObjId;
        this.aniObjectId = aniObjectId;
        this.animationType = animationType;
        this.animationDes = animationDes;
        this.SoundDes = SoundDes;
  
    }
  }
  
  // Feedback
  class Feedback {
    constructor(feedbackId, feedbackType) {
        this.Id = feedbackId;
        this.type = feedbackType;
    }
  }
  
  
  // Memory Game
  
  class MemoryGame {
    constructor(memoryGameId) {
        this.Id = memoryGameId;
        this.CardsCom = [];
    }
  }
  
  class CardComObj {
    constructor(cardComId, card1, card2) {
        this.Id = cardComId;
        this.card1 = card1;
        this.card2 = card2;
  
    }
  }
  
  class CardObj {
    constructor(cardId, picObj, textObj, soundObj) {
        this.Id = cardId;
        this.pic = picObj; //mediaObj
        this.text = textObj; //mediaObj
        this.sound = soundObj; //mediaObj
    }
  }
  
  
  class SlideTransitionObj {
    constructor (slideTransId, name,movieLink){
        this.id =slideTransId;
        this.name=name;
        this.movieLink=movieLink;       
    }
  }
  

  //every ObjectiveObj save one element and one skill.
class ObjectivesList {
    constructor(objectiveListId){
      this.id =objectiveListId;
      this.Objectives=[]; //add ObjectiveObj
    }
  }
  
  class ObjectiveObj {
      constructor(objectiveId, category, Element, skill, linkId) {
          this.id = objectiveId;
          this.type = category; //كلمات مفتاحية، تراكيب، صوتيات، قواعد
          this.element = Element // categroyيحفظ هنا العناصر التي يجب أن يتم تدريسها أو تقييمها مصنفة حسب 
          this.skill = skill; //الاستماع(استماع لنطق السليم، تمييز النطق السليم)، القراءة، الكتابة(الإملاء، التعبير بالتراكيب اللغوية) ، 
          //المحادثة( النطق السليم، التعبير بالتراكيب اللغوية)
          this.linkId = linkId; // id of the statement - quiz in case of assessment or slide id in case of solution.
      }
  }
  //****************************************** */
  
  /******************************************************************/


  

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


class SSortingQuiz {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="s_sorting_quiz";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class LSortingQuiz {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="l_sorting_quiz";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class TorFQuiz {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="t_or_f_quiz";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class CategoryQuiz {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="category_quiz";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class DragAndDropQuiz {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="dragdrop_quiz";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  
  class MChoicesQuiz {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="m_choices_quiz";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class FIBQuiz {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="fib_quiz";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class HWordQuiz {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="h_word_quiz";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class SQuestionQuiz {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="s_question_quiz";
      classLabel.classList.add("label-class");
      return classLabel;
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
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="text_addons or text_read_addons";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class TextArrayAddons {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="text_array_addons";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class PicAddons {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="pic_addons Or Drawing_addons";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  
  
  class PicHotSpotAddons {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="pic_hotspot_addons";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class SoundAddons {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="sound_addons or sound_Effect_addons";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class tableAddons {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="table_addons";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class VideoAddons {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="video_photo_addons/video_slideShow_addons/video_anim_addons/video_Interactive_addons";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class AnimationAddons {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="animation_addons";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class MemoryGameAddons {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="MemoryGame_addons";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class SendToAddons {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="Sendto_addons";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class OnineOTOAddons {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="OnlineOTO_addons";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class OnineClassAddons {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="OnlineClass_addons";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  
  //General
  // AnimSlideTrans_GAaddons
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
      let classLabel=document.createElement("label");
      classLabel.textContent="Previous_link_GAddons";
      classLabel.classList.add("label-class");
      return classLabel;
    }
  }
  
  class ObjectivesGAddons {
    create(){
      let classLabel=document.createElement("label");
      classLabel.textContent="Objectives_GAddons";
      classLabel.classList.add("label-class");
      return classLabel;
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
      return new TextAddons;
      
  }
};

let text_read_addons = {
  name: 'text_read_addons',
  exec: function() {
      return new TextAddons;
      
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
      return new PicAddons;
      
  }
};

let drawing_addons = {
  name: 'drawing_addons',
  exec: function() {
      return new PicAddons;
      
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
      return new SoundAddons;
      
  }
};

let sound_Effect_addons = {
  name: 'sound_Effect_addons',
  exec: function() {
      return new SoundAddons;
      
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
      return new VideoAddons;
      
  }
};

let video_slideShow_addons = {
  name: 'video_slideShow_addons',
  exec: function() {
      return new VideoAddons;
      
  }
};

let video_anim_addons = {
  name: 'video_anim_addons',
  exec: function() {
      return new VideoAddons;
      
  }
};

let video_Interactive_addons = {
  name: 'video_Interactive_addons',
  exec: function() {
      return new VideoAddons;
      
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
// AnimSlideTrans_GAaddons
// Question_title_GAddons
// Question_hint_GAddons
// Previous_link_GAddons
// Objectives_GAddons
// TestTime_GAddons
// qustion_score_GAddons

let AnimSlideTrans_GAaddons = {
  name: 'AnimSlideTrans_GAaddons',
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
  
      let quizId= TypesArgs.id + "C"; //quiz_Id" //Generate ID function
      let quizType=TypeArgs
      let slideLink=""
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
     let mediaId = TypeArgs.id + "C1";//"media_Id"; //Generate media Id
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
      
       let textArrayId =  TypeArgs.id + "C2"; // textArray_id"; //Generate Id
       let showTypeId = "";
       let hasSound = false;
  
        return new TextWordArray(textArrayId,showTypeId,hasSound);
        
    }
  };
  
  
  
  let PicWithHotSpot_DObj = {
    name: 'PicWithHotSpot_DObj',
    exec: function(TypeArgs) {
  
      // picHotSpotId, mediaObj
      let picHotSpotId=  TypeArgs.id + "C3" //picHoteSpotId_id"; //Generate Id
      let mediaObj="";
      
        return new PicWithHotSpot(picHotSpotId,mediaObj);
        
    }
  };
  
  let TableObj_DObj = {
    name: 'TableObj_DObj',
    exec: function(TypeArgs) {
  
      // tableId
      let tableId = TypeArgs.id + "C4" //"table_id"; //Generate Id
        return new TableObj(tableId);
        
    }
  };
  
  let VideoObj_DObj = {
    name: 'VideoObj_DObj',
    exec: function(TypeArgs) {
  
      // videoId, videoType
      let videoId =  TypeArgs.id + "C5"; //"video_id"; //Generate Id
      let videoType="";
      
        return new VideoObj(videoId,videoType);
        
    }
  };
  
  let AnimationClipObj_DObj = {
    name: 'AnimationClipObj_DObj',
    exec: function(TypeArgs) {
  
      // aniId, backgroundId
      let aniId =  TypeArgs.id + "C6"; //"ani_id"; //Generate Id
      let backgroundId ="";
      
        return new AnimationClipObj(aniId,backgroundId);
        
    }
  };
  
  let MemoryGame_DObj = {
    name: 'MemoryGame_DObj',
    exec: function(TypeArgs) {
  
      // memoryGameId
      let memoryGameId = TypesArgs.id + "C7";//"memoryGame_id"; //Generate Id
      
        return new MemoryGame(memoryGameId);
        
    }
  };
  
  let Feedback_DObj = {
    name: 'Feedback_DObj',
    exec: function(TypeArgs) {
  
      // feedbackId, feedbackType
      let feedbackId= TypesArgs.id + "C8"; //"feedback_id"; //Generate Id
      let feedbackType="";
        return new Feedback(feedbackId,feedbackType);
        
    }
  };
  
  let SlideTransitionObj_DObj = {
    name: 'SlideTransitionObj_DObj',
    exec: function(TypeArgs) {
  
      // slideTransId, name,movieLink
      let slideTransId= TypesArgs.id + "C9"; //"slideTransition_id"; //Generate Id
      let name = "";
      let movieLink="";
        return new SlideTransitionObj(slideTransId,name,movieLink);
        
    }
  };
  
  let ObjectivesList_DObj = {
    name: 'ObjectivesList_DObj',
    exec: function(TypeArgs) {
  
      // objectiveListId
      let objectiveListId=  TypeArgs.id + "C10"; //"objectiveList_id"; //Generate Id
      
        return new ObjectivesList(objectiveListId);
        
    }
  };