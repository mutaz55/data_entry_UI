
class Course {
    constructor (id, CourseTitle,Description,  Category, ModulesNumbers) {
        this.id = id;
        this.CourseTitle = CourseTitle;
        this.Description = Description;
        this.Category = Category;
        this.ModulesNumbers = ModulesNumbers;

    }
    toString() {
        return this.id + ', ' + this.CourseTitle + ', ' + this.Description + ', ' + this.Category + ', ' + this.ModulesNumbers;
    }
}

class Module {
    constructor(id, ModuleID, ModuleTitle) {
        this.id = id;
        this.ModuleID = ModuleID;
        this.ModuleTitle = ModuleTitle;
    }
    toString() {
        return this.id + ', ' + this.ModuleID + ', ' + this.ModuleTitle;
    }
}

class Concept {
    constructor(id, ConceptID, ConceptText){
        this.id = id;
        this.ConceptID = ConceptID;
        this.ConceptText = ConceptText;
    }
    toString() {
        return this.id + ', ' + this.ConceptID + ', ' + this.ConceptText;
    }
}

class Skill {
    constructor(id, SkillID, SkillText ) {
        this.id = id;
        this.SkillID = SkillID;
        this.SkillText = SkillText;
    }
    toString(){
        return this.id + ', ' + this.SkillID + ', ' + this.SkillText;
    }
}

class Lesson {
    constructor(id, LessonID, LessonTitle, modId ) {
        this.id = id;
        this.LessonID = LessonID;
        this.LessonTitle = LessonTitle;
        this.ModuleID = modId;
    }
    toString() {
        return this.id + ', ' + this.LessonID + ', ' + this.LessonTitle + ', ' + this.ModuleID;
    }
}

class SceneType {
    constructor(id, SceneTypeID, SceneTypeDesc) {
        this.id = id;
        this.SceneTypeID = SceneTypeID;
        this.SceneTypeDesc = SceneTypeDesc;
    }
    toString() {
        return this.id + ', ' + this.SceneTypeID + ', ' + this.SceneTypeDesc;
    }
}


class SceneHeader {
    constructor(_id, cId, sID,  mod, les, sTitle, sDesc, sSeq, sType, snd_teacher , bk_type, newCreated = false) {
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
        this.Concepts = [];
        this.Skills = [];
        this.BookType = bk_type;
        this.Points = 0;
        this.Score = 0;
        this._deleted = false;
        this._changed = false;
        this._new = newCreated;

    }
}

function storeDataLocally(id, data, type) {

    if (data != undefined) {


        switch (type){
            case 'courses':  return new Course(id,data['Course-Title'],data.Description,data.Category,data['Modules-Numbers']);
            case 'modules':  return new Module(id, data['Module-ID'], data['Module-Title']);
            case 'lessons':  return new Lesson(id, data['Lesson-ID'], data['Lesson-Title'], data['Module-ID']);
            case 'concepts': return new Concept(id, data['Concept-ID'],data['Concept-Text']);
            case 'skills':   return new Skill(id, data['Skill-ID'], data['Skill-Text']);
            case 'sceneTypes': return new SceneType(id, data['sceneT-ID'], data['sceneT-Text']);
            case 'sceneHeaders': return new SceneHeader(id, data['Course-ID'], data['Scene-ID'], data['Module-ID'], data['Lesson-ID'], data['Scene-Title'],data['Scene_Desc'], data['Scene-Seq'],
                                                            data['Scene-Type'], data['Send-To-Teacher'], data['Book-Type'] );
        }
        
           
       
    }

}