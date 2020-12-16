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
var originalCourses = new Array();

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


// Classes represent the data objects stored in Firebase
class Course {
    constructor (id, CourseTitle, Description,  Category) {
        this.id = id;
        this.CourseTitle = CourseTitle;
        this.Description = Description;
        this.Category = Category;
      

    }
    toString() {
        return this.id + ', ' + this.CourseTitle + ', ' + this.Description + ', ' + this.Category;
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
  constructor(id, subjID, subjText){
    this.id = id;
    this.subjectID = subjID;
    this.subjectText = subjText;
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
  



function storeDataLocally(id, data, type) {

    if (data != undefined) {


        switch (type){
            case 'courses':  return new Course(id,data['Course-Title'],data.Description,data.Category);
            case 'modules':  return new Module(id, data['Module-ID'], data['Module-Title']);
            case 'lessons':  return new Lesson(id, data['Lesson-ID'], data['Lesson-Title'], data['Module-ID']);
            case "subjects": return new Subject(id, data["subjectID"], data["subjectText"]);
            case "elements": return new LingElement(id, data["LingElement-ID"], data["LingElement-Text"], data["LingElement-Type"])
            case 'skills':   return new Skill(id, data['Skill-ID'], data['Skill-Text']);
            case 'sceneTypes': return new SceneType(id, data['sceneT-ID'], data['sceneT-Text']);
            case 'sceneHeaders': return new SceneHeader(id, data['Course-ID'], data['Scene-ID'], data['Module-ID'], data['Lesson-ID'], data['Scene-Title'],data['Scene_Desc'], data['Scene-Seq'],
                                                            data['Scene-Type'], data['Send-To-Teacher'], data['Book-Type'] );
            case 'scene': return new Scene(id, data['exerciseText'], data['translation']);
              
              
        }
        
           
       
  }
}
