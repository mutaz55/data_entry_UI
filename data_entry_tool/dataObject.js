 // Web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyAFpD1e9Y1RSK9PNAQ84WI6lWAJQophybc",
  authDomain: "arabiclang-b1f66.firebaseapp.com",
  databaseURL: "https://arabiclang-b1f66.firebaseio.com",
  projectId: "arabiclang-b1f66",
  storageBucket: "arabiclang-b1f66.appspot.com",
  messagingSenderId: "271833257572",
  appId: "1:271833257572:web:68071f6a0bead4a499b171",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// make references for auth and firestore
const auth = firebase.auth();
const db = firebase.firestore();

// initialize Array of our data objects
var Courses = new Array();
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

var ScenesArray = new Array();

var addOns = new Array();
var quizs = new Array();
var gaddons = new Array();

var _courses;

// Classes represent the data objects stored in Firebase
class Course {
    constructor (id, CourseTitle, Description,  Category, Language, Level) {
        this.id = id;
        this.CourseTitle = CourseTitle;
        this.Description = Description;
        this.Category = Category;
        this.Lang = Language;
        this.Level = Level;

    }
    toString() {
        return this.id + ', ' + this.CourseTitle + ', ' + this.Description + ', ' + this.Category + ', ' + this.Lang +', ' + this.Level;
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
class Scene {
  constructor(
    sceneId,
    exerciseText = "",
    translation = "",
    exerciseHintObj = ""
  ) {
    this.id = sceneId;
    this.exerciseText = exerciseText;
    this.translation = translation;
    this.exerciseHintObj = exerciseHintObj; // Object
    this.questions = []; // Array of Objecs
  }
}
 
  //****************************************** */
class HintObj {
  constructor(hintObjID, hintText = "", previousHelpObj = "") {
    this.id = hintObjID;
    this.text = hintText;
    this.draggableHint = false;
    this.previousHelp = previousHelpObj; //Object
  }
}
//****************************************** */
class PreviousHelpObj {
  constructor(previousHelpId, description = "", fileName = "") {
    this.id = previousHelpId;
    this.description = description;
    this.fileName = fileName;
  }
  }
  
  //****************************************** */
  class Question {
    constructor(questionId) {
      this.id = questionId;
      this.mediaObjects = []; // Array of Objects
      this.statementsAnswers = []; // Array of Objects
    }
  }
  
  //****************************************** */
  class statementAnswersObj {
    constructor(statementId, statement) {
      this.id = statementId;
  
      this.statement = statement;
      this.Answers = []; //Array of Objects
    }
  }
  //****************************************** */
  class Answers {
    constructor(answerId, answerText, mediaAnswer, correct) {
      this.answerId = answerId;
      this.answerText = answerText;
      this.mediaAnswer = mediaAnswer; // Objects
      this.correct = correct; //Boolean
    }
  }
  
  //****************************************** */
  class MediaObjectData {
    constructor(id,text,filename,type){
      this.id=id
      this.text=text;
      this.filename=filename;
      this.type=type;
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

class Quiz {
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
            case 'courses':  return new Course( id,data['CourseTitle'],data.Description,data.Category, data['Lang'], data['Level']);
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
            case 'quiz': return new Quiz(id, data['Name'], data['Text'], data['Icon'], data['Action']);
            case 'g-addons': return new GenAddons(id, data['Name'], data['Text'], data['Icon'], data['Action']);
              
        }
        
           
       
  }
}

class C {

  constructor(_c = [], deCourse) {
    
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
      
        this.c_list.push(newVal);
        });
    }   
    this._currentScene = "";
    this._currentModule = "";
    this._currentLesson = "";
    this._currentSubject = "";
    this._currentCourse = deCourse;
    this.defaultCourse = "";
  }


  getCourseLst(){
    return this.c_list;
  }

  getCourseObj(_id = this.currentCourse){
    return this.c_list.find( x => x.id == _id);
  }
  //getter
  get currentCourse() {
    return this._currentCourse;
  }
  
  set currentCourse(value) {
      this._currentCourse = value;
       
      
  }

  get currentScene() {
    return this._currentScene;
  }

  set currentScene(value) {
    this._currentScene = value;
  }
  
  get currentModule(){
    return this._currentModule;
  }

  set currentModule(value) {
    this._currentModule = value;
  }

  get currentLesson(){
    return this._currentLesson;
  }

  set currentLesson(value) {
    this._currentLesson = value;
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
  
  validate(_id){
      return !(this.c_list.find( x => x.id == _id));
      
  }
  getSceneDesc( _sId = this.getFirstScene()) {
    let desc = SceneHeaders.find( sid => sid.sceneID == _sId && sid.CourseID == this.currentCourse)?.sceneDesc; 
    if (desc) return desc;
    else return "";
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

  getScenes(_lesId = this.getFirstLesson()){
        
    return SceneHeaders.filter( (item) => item.CourseID == this.currentCourse && item.LessonID == _lesId);
      
  }

  getScene(_sceneId = this.currentScene ){
    return SceneHeaders.find( sc => sc.sceneID == _sceneId);
  }

  getSceneSubjects(_sceneId = this.getFirstScene()){
    
    return SceneHeaders.find( (item) => item.CourseID == this.currentCourse && item.sceneID ==_sceneId )?.Subjects;
  }


}
