 
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

// = new ProjectLibrary();
var libChanges = new Set();
var libraryCollections = [ '_times','_characters','_avatarPics','_animationObjects','_locations', '+_backgrounds', 'templates', 
                           '_slideTransitions', '_animationTypes', '_WordsArrayShowTypes', '_FeedbackTypes'];

var _courses;
var _projLib;
// Classes represent the data objects stored in Firebase
class Settings {
    constructor(id = "none",cCourse = ""){ //, cModule = "", cLesson = "", cScene = "", cSlide = "none", cItem = "none") {
      this.id = id;
      this.savedCourse = cCourse;
      // this.savedModule = cModule;
      // this.savedLesson = cLesson;
      // this.savedScene = cScene;
      // this.savedSlide = cSlide;
      // this.savedItem = cItem;

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
  constructor(id, SkillID, SkillText, skillIcon) {
    this.id = id;
    this.SkillID = SkillID;
    this.SkillText = SkillText;
    this.SkillIcon = skillIcon;
  }
  toString() {
    return this.id + ", " + this.SkillID + ", " + this.SkillText + ", " + this.SkillIcon;
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
      this.GenItems=[];//General Addons
      this.layout = layout;
      //this.Objectives = []; // Array of ObjectiveObj
      //this.transitionAnime = "transitionAnimeId";
  }
}

//***************************************** */
class Item{
  constructor(itemId, name, viewAction,dataObjectItem){
      this.id=itemId;
      this.name = name;
      this.viewAction=viewAction;
      this.dataObj =dataObjectItem;
  }
}

//****************************************** */
//every ObjectiveObj save one element and one skill.
// class ObjectiveObj {
//   constructor(objectiveId, category, Element, skill, linkId) {
//       this.id = objectiveId;
//       this.type = category; //كلمات مفتاحية، تراكيب، صوتيات، قواعد
//       this.element = Element // categroyيحفظ هنا العناصر التي يجب أن يتم تدريسها أو تقييمها مصنفة حسب 
//       this.skill = skill; //الاستماع(استماع لنطق السليم، تمييز النطق السليم)، القراءة، الكتابة(الإملاء، التعبير بالتراكيب اللغوية) ، 
//       //المحادثة( النطق السليم، التعبير بالتراكيب اللغوية)
//       this.linkId = linkId; // id of the statement - quiz in case of assessment or slide id in case of solution.
//   }
// }
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

  //****************************************** */
  
  
  // Config and Library Object
  
class ProjectLibrary {
  constructor() {
      this.times = [];
      this.characters = [];
      this.avatarPics = []; //{PicLink,Id,name}
      this.animationObjects = [];
      this.locations = [];
      this.backgrounds = [];
      this.templates=[];
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
  
  
class Template {
  constructor(templateId,templateName,SceneType,sceneObj){
  this.id = templateId;
  this.name=templateName;
  this.type=SceneType;
  this.SceneObj=sceneObj;

  this.toSave = true;
  }
}

  //(***************************************************)//
class AddOns {
  // constructor(id, arg) {
  //   this.id = id;
  //   this.Name = arg.Name;
  //   this.Text = arg.Text;
  //   this.Icon = arg.Icon;
  //   this.Action  = arg.Action;
  //   this.dataObj = arg.dataObj;
  // }
  constructor(obj) {
    obj && Object.assign(this, obj);
  }

  getAddonsText(){
    return this.Text;
  }

  getAddonsIcon(){
    return this.Icon;
  }
}

class GenAddons {
  constructor(id, arg) {
    this.id = id;
    this.Name = arg.Name;
    this.Text = arg.Text;
    this.Icon = arg.Icon;
    this.Action  = arg.Action;
    this.dataObj = arg.dataObj;
  }
//  constructor(id, name, txt, icon, action, _data) {
//     this.id = id;
//     this.Name = name;
//     this.Text = txt;
//     this.Icon = icon;
//     this.Action  = action;
//     this.dataObj = _data;
//   }

  getAddonsText(){
    return this.Text;
  }

  getAddonsIcon(){
    return this.Icon;
  }

}

class QuizAddons {
  // constructor(id, arg) {
  //   this.id = id;
  //   this.Name = arg.Name;
  //   this.Text = arg.Text;
  //   this.Icon = arg.Icon;
  //   this.Action  = arg.Action;
  //   this.dataObj = arg.dataObj;
  // }
  constructor(id, name, txt, icon, action, _data) {
        this.id = id;
        this.Name = name;
        this.Text = txt;
        this.Icon = icon;
        this.Action  = action;
        this.dataObj = _data;
      }
  
  getAddonsText(){
    return this.Text;
  }

  getAddonsIcon(){
    return this.Icon;
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
            case 'skills':   return new Skill(id, data['Skill-ID'], data['Skill-Text'], data['Skill-Icon']);
            case 'sceneTypes': return new SceneType(id, data['sceneT-ID'], data['sceneT-Text']);
            case 'sceneHeaders': return new SceneHeader(id, data['Course-ID'], data['Scene-ID'], data['Module-ID'], data['Lesson-ID'], data['Scene-Title'],data['Scene_Desc'], data['Scene-Seq'],
                                                            data['Scene-Type'], data['Send-To-Teacher'], data['Book-Type'] );
            case 'scene': return new Scene(id, data['exerciseText'], data['translation']);
            //case 'addons': return new AddOns(id, data['Name'], data['Text'], data['Icon'], data['Action'], data['dataObj']);
            //case 'quiz': return new QuizAddons(id, data['Name'], data['Text'], data['Icon'], data['Action'], data['dataObj']);
           // case 'g-addons': return new GenAddons(id, data['Name'], data['Text'], data['Icon'], data['Action'], data['dataObj']);
              
            case 'settings': return new Settings(data.id, data['savedCourse']); //,data['savedModule'], data['savedLesson'],
                                                                                  //data['savedScene'], data['savedSlide'],data['savedItem']);
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
    this._currentItem  = "";
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
      this._currentScene = "";
      this._currentModule = "";
      this._currentLesson = "";
      this._currentSubject = "";
      this._currentSlide = "";
      this._currentItem = "";
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

  get currentItem(){
    return this._currentItem;
  }

  set currentItem(value) {
    this._currentItem = value;
    Item_changed.fire();
  }

  addNewCourse(newC){
    this.c_list.push(newC);
  }
  
  addNewScene(s_id, seq, stype, title){

    SceneHeaders.push(
      new SceneHeader(
        s_id,
        this.currentCourse,
        s_id,
        this.currentModule,
        this.currentLesson,
        title,
        "",
        seq,
        stype,
        "",
        "",
        true
      )
    );

    let sc = new Scene(s_id);
    
    Scenes.push(sc);
 
  }

  updateSceneTitle(title, _sid = _courses.currentScene) {
      let sceneH = SceneHeaders.find(sH => sH.sceneID == _sid);
      sceneH.sceneTitle = title;
      sceneH._changed = true;
  }
  updateSceneType(stype, _sid = _courses.currentScene) {
    let sceneH = SceneHeaders.find(sH => sH.sceneID == _sid);
    sceneH.sceneTypeID = stype;
    sceneH._changed = true;
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

  addNewItem(item, itemArr, typeChar) {

    let item_id = "";
    let _addons = null;

    let _currentSlideObj = this.getCurrentSlideObj();

    if (_currentSlideObj) {
      
      item_id = get_ItemId(this.currentSlide, itemArr, typeChar);

      // data object to be build

      _addons = new Item(item_id, item.Name, item.Action, dataItemsFactory.press(item.dataObj, {id:item_id, Type:item.Name }));

      _currentSlideObj.Items.push(_addons);


    }
    
    return _addons;
    
  }
  addNewGenItem(item) {

    let gItem_id = "";
    let _gAddons = null;

    let _currentSlideObj = this.getCurrentSlideObj();

    if (_currentSlideObj) {
      
      gItem_id = get_ItemId(this.currentSlide, 'GenItems', 'G');

      // data object to be build

      _gAddons = new Item(gItem_id, item.Name, item.Action, dataItemsFactory.press(item.dataObj, {id:gItem_id, Type:item.Name }));

      _currentSlideObj.GenItems.push(_gAddons);


    }
    
    return _gAddons;
    
  }
  getCurrentItem(){
    let itemObj = this.getCurrentSlideObj().Items.find(item => item.id == this.currentItem) || 
                  this.getCurrentSlideObj().GenItems.find(gItem => gItem.id == this.currentItem);
    return itemObj;
  }

  getItems(){
    return this.getCurrentSlideObj().Items;
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

  overwriteScene(temp){

    replaceId(temp.SceneObj['slides'], temp.SceneObj.id);
    temp.SceneObj.id = this.currentScene;
    let readyTempObj  = JSON.parse(JSON.stringify(temp.SceneObj));
    // [...temp.SceneObj.slides];
    //scene =  JSON.parse(JSON.stringify(temp.SceneObj));
     Object.assign(Scenes.find( scene => scene.id == this.currentScene), readyTempObj);

    Scene_change.fire();
  }

  sceneChanged(){
  
    if (this.getSceneHeader())
      this.getSceneHeader()._changed = true;
  
    
  }
  
  getSlides(_sid = this.currentScene) {
    return Scenes.find( item => item.id == _sid)?.slides;
  }

  getCurrentSlideObj( sl_id = this.currentSlide) {
    return this.getScene().slides.find(slide => slide.id == sl_id);
  }

  removeItem(item_id) {
    let slide = this.getCurrentSlideObj();
    slide.Items = slide.Items.filter( item => item.id != item_id);
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

  getSkillIcon(skill_id) {
    return Skills.find( sk => sk.SkillID == skill_id)?.SkillIcon;
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



function replaceId(arr, _id){

  Array.from(arr).forEach( obj => {

      replaceIdObj(obj, _id);

  });
  
  
}

function replaceIdObj(obj, _id) {

  Object.entries(obj).forEach( ([key, value]) => {
   
      if (Array.isArray (value)) {
          replaceId(value, _id);
      }
      else if (key == 'id') {
          //change id
          obj.id = obj.id.replace(_id, _courses.currentScene);
      
      }else {
          if (value.hasOwnProperty('id')) {
              replaceIdObj(value, _id);
          }
              
         
          
      }

  });

}

class RegisterPressFactory {
  constructor(){
    this.plugins={};
  }

register(plugin) {
   const { name, exec } = plugin;
   this.plugins[name] = exec;
 }

 press(buttonName,TypeArg) {
   const func = this.plugins[buttonName];
   return func(TypeArg);
 }
 

}


