 
// initialize Array of our data objects
var originalCourses = new Array();
// var originalCourses = new Array();

var Modules = new Array();
var originalModules = new Array();


var Subjects = new Array();
var originalSubjects = new Array();

var Lessons = new Array();
var originalLessons = new Array();

var Skills = new Array();
var originalSkills = new Array();

var SceneTypes = new Array();
var originalSceneTypes = new Array();

var SceneHeaders = new Array();
var originalSceneHeaders = new Array();

var Scenes = new Array();

var addOns = new Array();
var quizs = new Array();
var gaddons = new Array();

var _courses;

// Classes represent the data objects stored in Firebase
class Settings {
    constructor(id = "none",cCourse = "", cModule = "", cLesson = "", cScene = "", cSlide = "none", cItem = "none") {
      this.id = id;
      this.savedCourse = cCourse;
      this.savedModule = cModule;
      this.savedLesson = cLesson;
      this.savedScene = cScene;
      this.savedSlide = cSlide;
      this.savedItem = cItem;

    }
}
class Course {
    constructor (_id, _courseTitle, _description,  _category, _language, _level, _type) {
        this.id = _id;
        this.CourseTitle = _courseTitle;
        this.Description = _description;
        this.Category = _category;
        this.Lang = _language;
        this.Level = _level;
        this.type = _type;

    }
    toString() {
        return this.id + ', ' + this.CourseTitle + ', ' + this.Description + ', ' + this.Category + ', ' + this.Lang +', ' + this.Level +', ' + this.type;
    }
}

class Module {
  constructor(id, ModuleID, ModuleTitle) {
    this.id = id;
    this.ModuleID = ModuleID;
    this.ModuleTitle = ModuleTitle;
  }
  toString() {
    return this.id + ", " + this.ModuleID + ", " + this.ModuleTitle;
  }
}

class Subject {
  constructor(id, subjID, subjText, lesID){
    this.id = id;
    this.subjectID = subjID;
    this.subjectText = subjText;
    this.LessonID = lesID;
    this.elements = [];
  }
}

const LingElementType = {
    KeyWords: 0,
    Structure: 1,
    Vocals: 2,
    Grammer: 3,
}

class LingElement {

  constructor(id, subID, text, type){
    this.id = id;
    this.subjID = subID;
    this.elementText = text;
    this.elementType = type;
  }

}


class Skill {
  constructor(id, SkillID, SkillText) {
    this.id = id;
    this.SkillID = SkillID;
    this.SkillText = SkillText;
  }
  toString() {
    return this.id + ", " + this.SkillID + ", " + this.SkillText;
  }
}

class Lesson {
  constructor(id, LessonID, LessonTitle, modId) {
    this.id = id;
    this.LessonID = LessonID;
    this.LessonTitle = LessonTitle;
    this.ModuleID = modId;
  }
  toString() {
    return (
      this.id +
      ", " +
      this.LessonID +
      ", " +
      this.LessonTitle +
      ", " +
      this.ModuleID
    );
  }
}

class SceneType {
  constructor(id, SceneTypeID, SceneTypeDesc) {
    this.id = id;
    this.SceneTypeID = SceneTypeID;
    this.SceneTypeDesc = SceneTypeDesc;
  }
  toString() {
    return this.id + ", " + this.SceneTypeID + ", " + this.SceneTypeDesc;
  }
}

class SceneHeader {
  constructor(
    _id,
    cId,
    sID,
    mod,
    les,
    sTitle,
    sDesc,
    sSeq,
    sType,
    snd_teacher,
    bk_type,
    newCreated = false
  ) {
    this.id = _id;
    this.CourseID = cId;
    this.sceneID = sID;
    this.ModuleID = mod;
    this.LessonID = les;
    this.sceneTitle = sTitle;
    this.sceneDesc = sDesc;
    this.sceneSeq = sSeq;
    this.sceneTypeID = sType;
    this.sendToTeacher = snd_teacher;
    this.flag_finished = false;
    this.flag_available = true;
    this.flag_review = false;
    this.Subjects = [];
    this.Skills = [];
    this.BookType = bk_type;
    this.Points = 0;
    this.Score = 0;
    this._deleted = false;
    this._changed = false;
    this._new = newCreated;
  }
}
//****************************************** */
//****************************************** */
class Scene {
  constructor(sceneId) {
      this.id = sceneId;
      this.slides = []; // Array of SlideObj
  }
}
//****************************************** */
class SlideObj {
  constructor(slideId, layout = "none") {
      this.id = slideId;
      this.Items = []; // Array of Quiz or AddonsObj
      this.layout = layout;
      this.Objectives = []; // Array of ObjectiveObj
      this.transitionAnime = "transitionAnimeId";
  }
}

//****************************************** */
//every ObjectiveObj save one element and one skill.
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
class Quiz {
  constructor(quizId, quizType, slideLink) {
      this.id = quizId;
      this.subQuizes = []; // Array of statementAnswersObj
      this.type = quizType; // FiB quiz, DragAndDrop quiz, TorF quiz, StatementSorting quiz, LetterSorting quiz, MultipleChoices quiz, Categories quiz
      this.link = slideLink; //in case of non-sequential slide scenarios.
  }
}

//****************************************** */
class statementAnswersObj {
  constructor(statementId, statement) {
      this.id = statementId;
      this.statement = statement;
      this.Answers = []; //Array of AnswerObj
  }
}
//****************************************** */
class AnswerObj {
  constructor(answerId, mediaObjData, correct) {
      this.answerId = answerId;
      this.answer = mediaObjData;
      this.correct = correct; //Boolean
  }
}

//****************************************** */
class mediaObjData {
  constructor(mediaId, text, type) {
      this.id = mediaId;
      this.text = text; // text [in case of text, reading text], or description [in case of pic, video, sound effect, animation] or text to be recorded [in case recorded Sound] or link [in case of link-to-prev-slide].
      this.type = type; //text-word, text-sentence[text-question-title, text-hint, text-answer], text-read, pic-photo, pic-drawing, video-photography, video-animation, video-slide-show, sound-record, sound-effect, animation[animation-object, animation-interactive, slide-transition], link-to-prev-slide
      this.filenames = [];
  }
}

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


// Config and Library Object

class ProjectLibrary {
  constructor() {
      this.times = [];
      this.characters = [];
      this.avatarPics = []; //{PicLink,Id,name}
      this.animationObjects = [];
      this.locations = [];
      this.backgrounds = [];

      this.slideTransitions = [] // research needed {animation video link,id,name}
      this.animationTypes = []; //Move, change color, scale, ...(need research)
      this.WordsArrayShowTypes = [] //flash-cards, dialog-cards, oneByone-showingFromSide, oneByone-showingFromUp, floating-word
      this.FeedbackTypes = []; //sound-sendFile, sound-record, text-typing, text-hand-writing, video-sendFile, video-record, online-oneToOne, online-class
  }
}

class CharacterObj {
  constructor(characterId, name, avatarPiclink, description) {
      this.id = characterId;
      this.name = name;
      this.picLink = avatarPiclink;
      this.description = description;
  }
}

class aniObject {
  constructor(aniObjId, name, description) {
      this.id = aniObjId;
      this.name = name;
      this.description = description;
  }
}


class LocationObj {
  constructor(locationId, name, description) {
      this.id = locationId;
      this.name = name;
      this.description = description;
  }
}

class BackgroundObj {
  constructor(backgroundId, name, description, animationDes, soundEffectDes) {
      this.id = backgroundId;
      this.name = name;
      this.description = description;
      this.animationDes = animationDes;
      this.soundEffectDes = soundEffectDes;
  }
}

class WordsArrayShowTypeObj {
  constructor(WordArrSTId, typeNameArabic, typeNameEnglish, LinkToAnifile) {
      this.Id = WordArrSTId;
      this.typeNameArabic = typeNameArabic;
      this.typeNameEnglish = typeNameEnglish;
      this.filename = LinkToAnifile;
  }

}
  
  //****************************************** */
  
class AddOns {
  constructor(id, name, text, icon, action) {
    this.id = id;
    this.name = name;
    this.text = text;
    this.icon = icon;
    this.action  = action;
  }
  
}

class GenAddons {
  constructor(id, name, text, icon, action) {
    this.id = id;
    this.name = name;
    this.text = text;
    this.icon = icon;
    this.action  = action;
  }
}

class QuizAddons {
  constructor(id, name, text, icon, action) {
    this.id = id;
    this.name = name;
    this.text = text;
    this.icon = icon;
    this.action  = action;
  }
}


function storeDataLocally(id, data, type) {

    if (data != undefined) {


        switch (type){
            case 'courses':  return new Course( id,data['CourseTitle'],data.Description,data.Category, data['Lang'], data['Level'],data.type);
            case 'modules':  return new Module(id, data['Module-ID'], data['Module-Title']);
            case 'lessons':  return new Lesson(id, data['Lesson-ID'], data['Lesson-Title'], data['Module-ID']);
            case "subjects": return new Subject(id, data["subjectID"], data["subjectText"], data["LessonID"]);
            case "elements": return new LingElement(id, data["LingElement-ID"], data["LingElement-Text"], data["LingElement-Type"])
            case 'skills':   return new Skill(id, data['Skill-ID'], data['Skill-Text']);
            case 'sceneTypes': return new SceneType(id, data['sceneT-ID'], data['sceneT-Text']);
            case 'sceneHeaders': return new SceneHeader(id, data['Course-ID'], data['Scene-ID'], data['Module-ID'], data['Lesson-ID'], data['Scene-Title'],data['Scene_Desc'], data['Scene-Seq'],
                                                            data['Scene-Type'], data['Send-To-Teacher'], data['Book-Type'] );
            case 'scene': return new Scene(id, data['exerciseText'], data['translation']);
            case 'addons': return new AddOns(id, data['Name'], data['Text'], data['Icon'], data['Action']);
            case 'quiz': return new QuizAddons(id, data['Name'], data['Text'], data['Icon'], data['Action']);
            case 'g-addons': return new GenAddons(id, data['Name'], data['Text'], data['Icon'], data['Action']);
              
            case 'settings': return new Settings(data.id, data['savedCourse'],data['savedModule'], data['savedLesson'],
                                                  data['savedScene'], data['savedSlide'],data['savedItem']);
        }
        
           
       
  }
}

class AppObjects {

  constructor(_c = []) {
    
    this.c_list = [];

    if (_c.length > 0) {
      _c.forEach( (x) => {
        let newVal = new Course();
        newVal.id = x.id;
        newVal.CourseTitle = x.CourseTitle;
        newVal.Description = x.Description;
        newVal.Category = 0;
        newVal.Lang = x.Lang;
        newVal.Level = x.Level;
        newVal.type = x.type;
        this.c_list.push(newVal);
        });
    }   
    this._currentScene = "";
    this._currentModule = "";
    this._currentLesson = "";
    this._currentSubject = "";
    this._currentCourse = "";
    this._currentSlide = "";
  }


  getCourseLst(){
    return this.c_list;
  }

  getCourseObj(_id = this.currentCourse){
    return this.c_list.find( x => x.id == _id);
  }

  //currentCourse getter
  get currentCourse() {
    return this._currentCourse;
  }

  //currentCourse setter
  set currentCourse(value) {
      this._currentCourse = value;
      console.log('course fire');
      course_changed.fire();
  }

  get currentScene() {
    return this._currentScene;
  }

  set currentScene(value) {
    this._currentScene = value;
    Scene_change.fire();
  }
  
  get currentSlide(){
    return this._currentSlide;
  }

  set currentSlide(value) {
    this._currentSlide = value;
    Slide_change.fire();
  }
  // Current Module Getter
  get currentModule(){
    return this._currentModule;
    
  }
  // Current Module Setter
  set currentModule(value) {
    this._currentModule = value;
    module_changed.fire();
  }

  get currentLesson(){
    return this._currentLesson;
  }

  set currentLesson(value) {
    this._currentLesson = value;
    lesson_changed.fire();
  }

  get currentSubject(){
    return this._currentSubject;
  }

  set currentSubject(value) {
    this._currentSubject = value;
  }
  addNewCourse(newC){
    this.c_list.push(newC);
  }
  
  addNewScene(s_id){
    let sc = new Scene(s_id);
    
    Scenes.push(sc);
 
  }

  addNewSlide(s_id = this.currentScene) {
    let sc = this.getScene();
    
    let slide_id = "";
    if (sc) {
      slide_id = get_slideId(s_id);
      let new_slide = new SlideObj(slide_id);
      sc.slides.push(new_slide);
    }
    
    return slide_id;
  }

  removeSlide(s_id){
    this.getScene().slides = this.getScene().slides.filter( slide => slide.id != s_id);
  }
  validate(_id){
      return !(this.c_list.find( x => x.id == _id));
  }

  getSceneDesc( _sId = this.currentScene) {
    let desc = SceneHeaders.find( sid => sid.sceneID == _sId && sid.CourseID == this.currentCourse)?.sceneDesc; 
    if (desc) return desc;
    else return "";
  }

  getSceneTitle(_sid = this.currentScene) {
    let title = SceneHeaders.find( sid => sid.sceneID == _sid && sid.CourseID == this.currentCourse)?.sceneTitle; 
    if (title) return title;
    else return "";
  }

  getSlides(_sid = this.currentScene) {
    return Scenes.find( item => item.id == _sid)?.slides;
  }
  getCourseDesc(_id = this.currentCourse){
      let desc = this.c_list.find(cu => cu.id == _id)?.Description;
      if (desc) return desc;
      else return "";
  }


  getCourseTitle(_id = this.currentCourse) {
    
    return this.c_list.find(cu => cu.id == _id)?.CourseTitle;
  }
  
  getCourseTitles(){

    let titles = [];

    this.c_list.forEach ( function(item) {
             
     titles.push({id: item.id, CourseTitle: item.CourseTitle});
      
    });
    
    return titles;
  }

  getModules(){
    
    return Modules.filter((mod) => mod.id == this.currentCourse);
  }

  getFirstModule(){
    return Modules.find( (mod)=> mod.id == this.currentCourse)?.ModuleID;
  }

  getFirstLesson(_modId = this.getFirstModule() ){
    return Lessons.find( x => x.id == this.currentCourse && x.ModuleID == _modId )?.LessonID;

  }
  getFirstSubject(_lesId = this.getFirstLesson()){
    return Subjects.find(x => x.id == this.currentCourse && x.LessonID == _lesId)?.subjectID;

  }
  getFirstScene(_lesId = this.getFirstLesson()){
    
    return SceneHeaders.find((item) => item.CourseID == this.currentCourse && item.LessonID == _lesId && item._deleted == false)?.sceneID;
  }

  getLessons(_modId = this.getFirstModule()){
      
    return Lessons.filter((les) => les.id == this.currentCourse && les.ModuleID == _modId);
  }

  getSubjects(_lesId = this.getFirstLesson()) {
            
    return Subjects.filter( (subj) => subj.id == this.currentCourse && subj.LessonID == _lesId);
    
  }


  getSubject(_subId = this.getFirstSubject()){
    return Subjects.find(x=> x.subjectID == _subId); 

  }

  getScenesHeader(_lesId = this.getFirstLesson()){
        
    return SceneHeaders.filter( (item) => item.CourseID == this.currentCourse && item.LessonID == _lesId);
      
  }

  getScene(sID = this.currentScene){
    return Scenes.find( scene => scene.id == sID);
  }
  getSceneHeader(_sceneId = this.currentScene ){
    return SceneHeaders.find( sc => sc.sceneID == _sceneId);
  }

  getSceneSubjects(_sceneId = this.getFirstScene()){
    
    return SceneHeaders.find( (item) => item.CourseID == this.currentCourse && item.sceneID ==_sceneId )?.Subjects;
  }


}



class Observable{
  
  constructor(){
      this.observers=[];
  }
  
  subscribe(fn){
      this.observers.push(fn);
  }
  
  unsubscribe(fnToremove){

      this.observers.filter(fn=>{

          if (fn!==fnToremove)
              return fn;
          
      })
  }

  fire(){

      this.observers.forEach(fn=>{
        
        fn();

      })
  }
}