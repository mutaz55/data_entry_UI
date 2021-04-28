const ModeOfOperation = {
  SaveLater: 0,
  SaveDirect: 1
  
}

const ShowType = {
  All:0,
  SubQuizId:1
}

class checkboxParameters  {
constructor(){
this.id="";
this.text="";
this.value="";
}

}

class ObjectivesTab {
constructor(modeOfOperation){
// create recievers;
this.viewReciever = new ObjectiveViewReciever();
this.dataReciever = new ObjectiveDataReciever();



this.objectiveInvoker = new ObjectiveInvoker();

let buildTab = new TabBuild(this.viewReciever);
let fillCombo1 = new FillCombo1(this.viewReciever,this.dataReciever);
let AddCheckBoxesList = new AddSkillsCheckBox(this.viewReciever,this.dataReciever);
let UpdateCombo2PerLinkId = new UpdateObjectiveLinkId(this.viewReciever,this.dataReciever)
let activateAddButton = new AddActionToAddBtn(this.viewReciever,this.dataReciever);
let activateRemoveButton = new AddActionToRemoveBtn(this.viewReciever,this.dataReciever);
let addEventToCombo2 = new AddEventToCombo2ForAllTapPanels(this.viewReciever,this.dataReciever);


let newOperationMode = new UpdateOperationMode(this.dataReciever);


this.objectiveInvoker.setCommand(buildTab);
this.objectiveInvoker.setCommand(fillCombo1);
this.objectiveInvoker.setCommand(AddCheckBoxesList);
this.objectiveInvoker.setCommand(activateAddButton);
this.objectiveInvoker.setCommand(activateRemoveButton);
this.objectiveInvoker.setCommand(addEventToCombo2);
this.objectiveInvoker.press();

this.objectiveInvoker.setUpdateCommands(UpdateCombo2PerLinkId);
let currentSlide = _courses.getCurrentSlideObj();
this.objectiveInvoker.pressUpdate(currentSlide,ShowType.All,"All-Slide");


this.objectiveInvoker.setOperationMode(newOperationMode);
this.objectiveInvoker.pressSetOperationMode(modeOfOperation);

this.HTMLElement=this.viewReciever.newObjectiveTab.HTMLElement;


}

updateLinkId(slideObj,showType,linkId){
this.objectiveInvoker.pressUpdate(slideObj,showType,linkId);
}

saveToObjectiveList(LinkId){
let saveToObjectiveList = new SaveToSlideObjectiveList(this.dataReciever,LinkId);
this.objectiveInvoker.setSaveCommand(saveToObjectiveList);
this.objectiveInvoker.pressSave();
}
clearTab(){
let clearCombo2_1 = new ClearCombo2(this.viewReciever,1);
let clearCombo2_2 = new ClearCombo2(this.viewReciever,2);
let clearCombo2_3 = new ClearCombo2(this.viewReciever,3);
let clearCombo2_4 = new ClearCombo2(this.viewReciever,4);
this.objectiveInvoker.clearCommand();
this.objectiveInvoker.setCommand(clearCombo2_1);
this.objectiveInvoker.setCommand(clearCombo2_2);
this.objectiveInvoker.setCommand(clearCombo2_3);
this.objectiveInvoker.setCommand(clearCombo2_4);
this.objectiveInvoker.press();

}

setObjectiveList(operationMode,slideId){
this.dataReciever.setObjectiveList(operationMode,slideId)
}

}




//**********Control Implementing Command Pattern****** */


//Reciever: ObjectiveDataReciever (Model)

class ObjectiveDataReciever{
constructor(){
this.ListOfObjectives = [];
this.currentObjective=null;
this.objectiveLinkId="";
this.saveFrom=0;
this.linkId = "All-Slide";
}

getSlidceIds(){
let slideIds = _courses.getSlides().map((slide)=>slide.id);
//console.log("slide Ids: ",slideIds);
return slideIds;

}
getLinkId(){
return this.linkId;
}
getSlideById(slideId){
let slideObj =_courses.getCurrentSlideObj(slideId);
return slideObj;

}
getSubQuizesArrayfromSlide(slideObj){

let arrSubQuizes=[];
slideObj.Items.forEach((item) => {
    
  let viewAction = item.viewAction
  let viewType = viewAction.slice(viewAction.length-4);
  if(viewType=="quiz"){ 
    console.log("item.subQuiz: ", item, item.dataObj.subQuizes);
    arrSubQuizes.push(item.dataObj.subQuizes);
              
  } 
});
arrSubQuizes=arrSubQuizes.flat();
console.log("slideObj",slideObj);
console.log("arrSubQuizes: ",arrSubQuizes);

return arrSubQuizes;

}

getSubQuizByIdFromSubQuizArray(arrSubQuiz,subQuizId){
let subQuiz = arrSubQuiz.find((subQuiz)=>subQuiz.id==subQuizId);
return subQuiz;
}

clearObjectiveList(){

this.ListOfObjectives.length = 0;

}
updateOperationMode(modeOfOperation){
if (modeOfOperation==ModeOfOperation.SaveLater){
  this.cloneObjectiveList();
  
} else if (modeOfOperation==ModeOfOperation.SaveDirect) {
  
  let objectiveListDirect = this.getObjectiveList();

  this.ListOfObjectives=objectiveListDirect.Objectives;
  //console.log("SaveDirect: ",this.ListOfObjectives)
  
}
}

updateObjectiveLinkId(linkID){
this.linkId = linkID
}
getCurrentObjectiveSkills(){
if (this.currentObjective!=null){
  return this.currentObjective.skills;
} else {
  return [];
}

}

setCurrentObjective(objectiveId){

this.currentObjective=this.ListOfObjectives.find((item)=> item.id == objectiveId);
}


getLingElementById(lingElementId,arrElementLing){
let requiredLingElement = arrElementLing.find((item)=> item.id  == lingElementId);
return requiredLingElement;

}
getSkillFromSkillarrayById(skillId){
let requiredSkill = Skills.find((item)=> item.SkillID  == skillId);
return requiredSkill;

}

addObjective(objectiveId, lingElement){

  let newObjective_Dobj = new ObjectiveObj(objectiveId, lingElement, this.linkId);
  console.log("inside add Objective: ",this.ListOfObjectives)
  this.ListOfObjectives.push(newObjective_Dobj);
       
}

addSkill(SkillObj) {
let objective = this.currentObjective;
objective.skills.push(SkillObj);
}

removeObjective(lingElementText){
let objectiveIndexTobeRemoved = this.ListOfObjectives.findIndex((item)=> item.lingElement.elementText == lingElementText);
if (objectiveIndexTobeRemoved>-1){
  this.ListOfObjectives.splice(objectiveIndexTobeRemoved,1);
}
 
}

removeSkill(SkillId){
let objective = this.currentObjective;
let SkillIndex = objective.skills.findIndex((item)=> item.SkillID == SkillId);
if (SkillIndex>-1){
  objective.skills.splice(SkillIndex,1);
}

}

getObjectivesPerLingElementText(lingElementText){
let selectedObjective=this.ListOfObjectives.find((item)=> item.lingElement.elementText == lingElementText);
return selectedObjective;
}

getObjectiveList(slideId){
  let currentSlide = _courses.getCurrentSlideObj(slideId);
  let objectiveList = currentSlide.GenItems.find((item)=> item.name == "Objectives_GAddons").dataObj;
  
    
  return objectiveList;
}

setObjectiveList(operationMode,slideId){

if (operationMode==ModeOfOperation.SaveLater){
  this.ListOfObjectives=this.cloneObjectiveList(slideId);

} else if (operationMode==ModeOfOperation.SaveDirect) {

  let objectiveListDirect = this.getObjectiveList(slideId);
  this.ListOfObjectives=objectiveListDirect.Objectives;
    
}

}

getObjectiveUniqueSubQuizesId(slideId){

let objectivesL = this.getObjectiveList(slideId)
//objectivesL=[...objectivesL]
  //console.log(objectivesL);
let arrLinkId = objectivesL.Objectives.map((item) => {

  
  return item.linkId; 
});

  console.log(arrLinkId);
  let arrLinkIdUnique = arrLinkId.filter((value,index,self)=>self.indexOf(value)===index);
  console.log(arrLinkIdUnique);
  return arrLinkIdUnique;
}


getSceneSubjects(){
let arrSceneSubjectsIds = _courses.getSceneSubjects();
let arrSceneSubjects = [];

arrSceneSubjectsIds.forEach((item)=>{
  arrSceneSubjects.push(_courses.getSubject(item.subjectID));
});
return arrSceneSubjects
}

getSceneElements(arrSceneSubjects){
let arrSceneElements = [];
arrSceneSubjects.forEach((item)=>{
  item.elements.forEach((lingElement)=>{
    arrSceneElements.push(lingElement)
  });  
});
return arrSceneElements;
}

filterObjectiversBySubQuizId(subQuizId){
let arrayTofill=[];
if (subQuizId!=""){       
  arrayTofill=this.ListOfObjectives.filter((item)=>item.linkId==subQuizId); 
}
return arrayTofill;
}

generateObjectiveId(){

let objectiveList = this.getObjectiveList();
let objectiveId = getId_fromArry(objectiveList.id, this.ListOfObjectives,"O");
return objectiveId;

}

cloneObjectiveList(slideId){

//Clone ObjectiveList and save it in the class
let objectiveList = this.getObjectiveList(slideId);
this.ListOfObjectives=JSON.parse(JSON.stringify(objectiveList.Objectives));;
this.saveFrom=this.ListOfObjectives.length;
console.log("clonned List of Objectives: ",this.ListOfObjectives," Save From: ",this.saveFrom);
}


saveToSlideObjectiveList(LinkId){
let objectiveList = this.getObjectiveList();
this.ListOfObjectives.forEach((item,ind)=>{
if(ind>=this.saveFrom){
  item.linkId = LinkId;
  objectiveList.Objectives.push(item)
}

});
this.cloneObjectiveList();

}



}



//Reciever: ObjectiveViewReciever (View)
class ObjectiveViewReciever{
constructor(){    
 
this.newObjectiveTab=null;
this.tapPanels=[];


}
build(){

let arrObjectiveType = ["الكلمات المفتاحية","التراكيب اللغوية","الأصوات اللغوية","القواعد اللغوية"];
this.newObjectiveTab = new TabComponent();

//fix the CSS
this.newObjectiveTab.divTabset.classList.add("padding__meduim");
let arrTabPanelsSection=this.newObjectiveTab.divTapanels.querySelectorAll(".tab-panel-component")
arrTabPanelsSection.forEach((item)=>{
item.classList.add("padding__zero");
});
//***** */

//create comboList add remove 
let tabPanel1 = new ComboListAddRemoveComponent("combo1_tab1_Id","combo2_tab1_Id",arrObjectiveType[0],"btnAddId_tab1","btnRemoveId_tab1");
let tabPanel2 = new ComboListAddRemoveComponent("combo1_tab2_Id","combo2_tab2_Id",arrObjectiveType[1],"btnAddId_tab2","btnRemoveId_tab2");
let tabPanel3 = new ComboListAddRemoveComponent("combo1_tab3_Id","combo2_tab3_Id",arrObjectiveType[2],"btnAddId_tab3",'btnRemoveId_tab3');
let tabPanel4 = new ComboListAddRemoveComponent("combo1_tab4_Id","combo2_tab4_Id",arrObjectiveType[3],"btnAddId_tab4","btnRemoveId_tab4");


// add Label and Tab Panel to the Tab
this.newObjectiveTab.addLabel("اختيار عناصر المواضيع")

// insert tabPanel to Tab
this.newObjectiveTab.addTab(new TabsetClass(arrObjectiveType[0],'tset-1'),new TabPanelClass('tpnl-1', tabPanel1));
  this.newObjectiveTab.addTab(new TabsetClass(arrObjectiveType[1],'tset-2'),new TabPanelClass('tpnl-2', tabPanel2));
  this.newObjectiveTab.addTab(new TabsetClass(arrObjectiveType[2],'tset-3'),new TabPanelClass('tpnl-3', tabPanel3));
  this.newObjectiveTab.addTab(new TabsetClass(arrObjectiveType[3],'tset-4'),new TabPanelClass('tpnl-4', tabPanel4));
  
  // this.newObjectiveTab.fillTabPanel(0,tabPanel1.HTMLElement);
  // this.newObjectiveTab.fillTabPanel(1,tabPanel2.HTMLElement);
  // this.newObjectiveTab.fillTabPanel(2,tabPanel3.HTMLElement);
  // this.newObjectiveTab.fillTabPanel(3,tabPanel4.HTMLElement);

//Save reference to tabPanels.

this.tapPanels.push(tabPanel1);
this.tapPanels.push(tabPanel2);
this.tapPanels.push(tabPanel3);
this.tapPanels.push(tabPanel4);

this.newObjectiveTab.tabSets[0].HTMLElement.click();


}

addSkillsCheckBoxListToTabPanel(checkBoxClickFn){
let arrSkills = Skills;
let arrInputValues =[];
arrSkills.forEach((item)=>{
let newValue = new checkboxParameters();

newValue.id=item.SkillID;
newValue.text=item.SkillText;
newValue.value=item.SkillID;
arrInputValues.push(newValue);
})

this.tapPanels.forEach((item,index)=>{
let tabNummber = index+1
let checkboxListId = "id-list-test"+tabNummber;
item.addListofCheckBoxs(checkboxListId,arrInputValues,tabNummber,true,checkBoxClickFn);

})

}

fillCombo1(arrLingElements){    
if (arrLingElements.length>0){
arrLingElements.forEach((LingItem)=>{      
  this.tapPanels[LingItem.elementType].combo1.addOptionToCombo(LingItem.elementText,LingItem.id,true);  
});
}

}

fillCombo2(arrObjectives){
arrObjectives.forEach((objective)=>{
console.log("Objective is here: ",objective.id);   
this.tapPanels[objective.lingElement.elementType].combo2.addOptionToCombo(objective.lingElement.elementText,objective.id,true);
    
});
}
clearCombo2(tabNumber){
this.tapPanels[tabNumber-1].combo2.clearCombo();
}
resetCheckBoxValues(tabNumber){
  this.tapPanels[tabNumber-1].listOfCheckBox.resetCheckBoxState();
}

updateAllCheckBoxValues(tabNumber,arrSkills){
  
if (arrSkills != undefined){
arrSkills.forEach((item)=>{
    let checkboxId = item.SkillID+tabNumber;
    if (checkboxId != NaN){
      console.log(checkboxId);
      this.tapPanels[tabNumber-1].updateCheckboxValue(checkboxId,true);
    }
    
  })

}


}

getCombo2Length(tabNumber){
let combo2Length = this.tapPanels[tabNumber-1].combo2.HTMLElement.length;
return combo2Length;
}

getTabNumberFromId(e){
let checkboxId =e.target.id
let tabNumber = parseInt(checkboxId[checkboxId.length -1], 10);
return tabNumber;
}

getCombo2Text(tabNumber) {
let combo2Element = this.tapPanels[tabNumber-1].combo2.HTMLElement;
let combo2Text = combo2Element.options[combo2Element.selectedIndex].text;

return combo2Text;
}
getCombo2Value(tabNumber) {
let combo2Element = this.tapPanels[tabNumber-1].combo2.HTMLElement;
let combo2Value = combo2Element.options[combo2Element.selectedIndex].value;

return combo2Value;
}

}


//Command Classes 

class UpdateOperationMode{
constructor(DataReciever){
this.dataReciever = DataReciever
}
execute(modeOfOperation){
this.dataReciever.updateOperationMode(modeOfOperation);

}
}

class UpdateObjectiveLinkId {
constructor(ViewReciever,DataReciever){
this.viewReciever = ViewReciever;
this.dataReciever = DataReciever
}
execute(showType,LinkId){
let arrObjectives=[];
this.dataReciever.updateObjectiveLinkId(LinkId); 
if (showType==ShowType.All){
  arrObjectives=this.dataReciever.ListOfObjectives;
  
} else if (showType==ShowType.SubQuizId){
  arrObjectives = this.dataReciever.filterObjectiversBySubQuizId(LinkId)
}
  
this.viewReciever.fillCombo2(arrObjectives);
}  
}


class SaveToSlideObjectiveList {

constructor(DataReciever,subQuizId){
this.dataReciever = DataReciever;
this.subQuizId=subQuizId;
}
execute(){
this.dataReciever.saveToSlideObjectiveList(this.subQuizId);
}
}



class TabBuild {
constructor(Viewreciever){
this.reciever=Viewreciever;
}
execute(){
this.reciever.build();
}  
}

class FillCombo1 {
constructor(ViewReciever,DataReciever){
this.viewReciever=ViewReciever;
this.dataReciever = DataReciever
}
execute(){
let arrSubjects = this.dataReciever.getSceneSubjects();
let arrLingElements = this.dataReciever.getSceneElements(arrSubjects);
this.viewReciever.fillCombo1(arrLingElements);
}  
}


class ClearCombo2 {
constructor(ViewReciever,tabNumber){
this.viewReciever=ViewReciever;
this.tabNumber = tabNumber;

}
execute(){

this.viewReciever.clearCombo2(this.tabNumber);
this.viewReciever.resetCheckBoxValues(this.tabNumber)
}  
}

class GetObjectiveUniqueSubQuizesId {
constructor(DataReciever){
this.dataReciever=DataReciever;


}
execute(slideId){

let uniqueSubQuizValues = this.dataReciever.getObjectiveUniqueSubQuizesId(slideId);
return uniqueSubQuizValues;

}  
}

class GetSubQuizesArrayfromSlide {
constructor(DataReciever){
this.dataReciever=DataReciever;


}
execute(slideId){
let slideObj=this.dataReciever.getSlideById(slideId);
let arrSubQuizes = this.dataReciever.getSubQuizesArrayfromSlide(slideObj);
return arrSubQuizes;

}  
}

class GetSubQuizesIdsArrayfromSlide {
constructor(DataReciever){
this.dataReciever=DataReciever;


}
execute(slideId){
let arrSubQuizesId =[];
let slideObj=this.dataReciever.getSlideById(slideId);
let arrSubQuizes = this.dataReciever.getSubQuizesArrayfromSlide(slideObj);
arrSubQuizesId=arrSubQuizes.map((item)=> item.id);
return arrSubQuizesId;

}  
}





class AddSkillsCheckBox {
constructor(ViewReciever,DataReciever){
this.viewReciever = ViewReciever;
this.dataReciever = DataReciever
}
execute(){

let checkBoxClickFn = (e)=>{

if(this.dataReciever.currentObjective!=null){
  if (e.target.checked){

    let skillObj = this.dataReciever.getSkillFromSkillarrayById(e.target.value);
    console.log(e.target.value);
    console.log(skillObj);
    this.dataReciever.addSkill(skillObj)

    console.log(this.dataReciever.currentObjective);

    } else {          
               console.log("inside remove skill: ",e.target.value);
      this.dataReciever.removeSkill(e.target.value)
      console.log(this.dataReciever.currentObjective);                      
    }                  
}    
}

this.viewReciever.addSkillsCheckBoxListToTabPanel(checkBoxClickFn);
}  
}



class AddEventToCombo2ForAllTapPanels {
constructor(ViewReciever,DataReciever){
this.viewReciever=ViewReciever;
this.dataReciever = DataReciever;
}
execute(){

this.viewReciever.tapPanels.forEach((item,index)=>{
  item.combo2.onChange((e)=>{
    //Refresh: set current Objective and update checkBoxes Skill Value
    let objectiveId=e.target.options[e.target.selectedIndex].value;
    this.dataReciever.setCurrentObjective(objectiveId);
    let arrSkills = this.dataReciever.getCurrentObjectiveSkills();
    this.viewReciever.resetCheckBoxValues(index+1)
    this.viewReciever.updateAllCheckBoxValues(index+1,arrSkills);
            
  })
        
})


}  
}


class AddActionToAddBtn{
constructor(ViewReciever,DataReciever){
this.viewReciever=ViewReciever;
this.dataReciever = DataReciever;
}
execute(){
let tab_Addfn = (e)=>{

let tabNumber = this.viewReciever.getTabNumberFromId(e);
let objectiveId =this.dataReciever.generateObjectiveId();
console.log(objectiveId);

//get array of all SceneLingElements
let arrSceneSubjects = this.dataReciever.getSceneSubjects()
let arrElementLing = this.dataReciever.getSceneElements(arrSceneSubjects)
console.log("we are her in add Action see arrElementLing: ",e.detail)

let lingElement = this.dataReciever.getLingElementById(e.detail,arrElementLing)
console.log("we are her in add Action: ",lingElement)
this.dataReciever.addObjective(objectiveId, lingElement);

this.dataReciever.setCurrentObjective(objectiveId);
console.log(this.dataReciever.currentObjective,": ",objectiveId);
let arrSkills = this.dataReciever.getCurrentObjectiveSkills();
this.viewReciever.resetCheckBoxValues(tabNumber)
this.viewReciever.updateAllCheckBoxValues(tabNumber,arrSkills);
console.log(this.dataReciever.ListOfObjectives);
return objectiveId;
}

this.viewReciever.tapPanels.forEach((tapPanel)=>{
tapPanel.addButton.HTMLElement.addEventListener("added",tab_Addfn);
//tapPanel.addBtnOnClick(tab_Addfn);
});


}

}

class AddActionToRemoveBtn{
constructor(ViewReciever,DataReciever){
this.viewReciever=ViewReciever;
this.dataReciever = DataReciever;
}
execute(){
let tab_RemoveFn = (e,TxtOption,OptionValue)=>{
console.log(TxtOption);
console.log(OptionValue);
let tabNumber = this.viewReciever.getTabNumberFromId(e);

// remove Item from Data, removing Item from View is done by the component.
this.dataReciever.removeObjective(TxtOption)

//get the remaining number of Inserted Ling Elements
let numberOfInsertedSkills = this.viewReciever.getCombo2Length(tabNumber);

// check if > 0
if(numberOfInsertedSkills>0){
  let objectiveId = this.viewReciever.getCombo2Value(tabNumber); 
  console.log("current LingElementText: ",objectiveId);
  this.dataReciever.setCurrentObjective(objectiveId);
  let arrSkills = this.dataReciever.getCurrentObjectiveSkills();
  console.log("Array of skills: ",arrSkills);

  this.viewReciever.resetCheckBoxValues(tabNumber)
  this.viewReciever.updateAllCheckBoxValues(tabNumber,arrSkills);
} else {
  this.viewReciever.resetCheckBoxValues(tabNumber)
}

console.log(this.dataReciever.ListOfObjectives);
     
}

this.viewReciever.tapPanels.forEach((tapPanel)=>{
tapPanel.addButton.HTMLElement.addEventListener("removed",tab_RemoveFn);
//tapPanel.removeBtnOnClick(tab_RemoveFn);
});



}

}



//Invoker

class ObjectiveInvoker {
constructor(){
this.commands= [];
this.updateCommands =[];
this.saveCommand=null;
this.operationModeCommand=null;
// create the commands


}


clearCommand(){
this.commands=[];
}
setCommand(newCommand) {
this.commands.push(newCommand)
}
setUpdateCommands(newCommand){
this.updateCommands.push(newCommand);
}
setSaveCommand(saveCommand){
this.saveCommand=saveCommand;
}
setOperationMode(operationModeCommand){
this.operationModeCommand=operationModeCommand;
}

press(){
this.commands.forEach((item)=>item.execute());

}

pressUpdate(slideObj,showType,subQuizId){
this.updateCommands.forEach((item)=>item.execute(slideObj,showType,subQuizId));
}

pressSave(){
this.saveCommand.execute();
}

pressSetOperationMode(operationMode){
this.operationModeCommand.execute(operationMode);
}

}


