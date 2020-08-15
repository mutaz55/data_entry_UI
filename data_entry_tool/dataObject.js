
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
    constructor(id, LessonID, LessonTitle ) {
        this.id = id;
        this.LessonID = LessonID;
        this.LessonTitle = LessonTitle;
    }
    toString() {
        return this.id + ', ' + this.LessonID + ', ' + this.LessonTitle;
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

function storeDataLocally(id, data, type) {

    if (data != undefined) {


        switch (type){
            case 'courses':  return new Course(id,data['Course-Title'],data.Description,data.Category,data['Modules-Numbers']);
            case 'modules':  return new Module(id, data['Module-ID'], data['Module-Title']);
            case 'lessons':  return new Lesson(id, data['Lesson-ID'], data['Lesson-Title']);
            case 'concepts': return new Concept(id, data['Concept-ID'],data['Concept-Text']);
            case 'skills':   return new Skill(id, data['Skill-ID'], data['Skill-Text']);
            case 'sceneTypes': return new SceneType(id, data['sceneType-ID'], data['sceneType-Text']);
                
        }
        
           
       
    }

}