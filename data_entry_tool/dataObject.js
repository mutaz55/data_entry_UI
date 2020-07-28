
class course {
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

function storeDataLocally(id, data) {

    if (data != undefined) {
       return new course(id,data['Course-Title'],data.Description,data.Category,data['Modules-Numbers']);
       
    }

}