    const ModeOfOperation = {
        SaveLater: 0,
        SaveDirect: 1
        
    }

    const ShowType = {
        All:0,
        SubQuizId:1
    }

    class checkboxValues  {
    constructor(){
      this.id="";
      this.text="";
      this.value="";
    }
    
    }
  
  class ObjectivesTab {
    constructor(modeOfOperation){
  
      this.tapPanels=[];
      this.ListOfObjectives = [];
      this.currentObjective="";
  
      let arrObjectiveType = ["الكلمات المفتاحية","التراكيب اللغوية","الأصوات اللغوية","القواعد اللغوية"];
      this.newObjectiveTab = new TabComponent(arrObjectiveType);
      
      //create comboList add remove 
      let tabPanel1 = new ComboListAddRemoveComponent("combo1_tab1_Id","combo2_tab1_Id",arrObjectiveType[0],"btnAddId_tab1","btnRemoveId_tab1");
      let tabPanel2 = new ComboListAddRemoveComponent("combo1_tab2_Id","combo2_tab2_Id",arrObjectiveType[1],"btnAddId_tab2","btnRemoveId_tab2");
      let tabPanel3 = new ComboListAddRemoveComponent("combo1_tab3_Id","combo2_tab3_Id",arrObjectiveType[2],"btnAddId_tab3",'btnRemoveId_tab3');
      let tabPanel4 = new ComboListAddRemoveComponent("combo1_tab4_Id","combo2_tab4_Id",arrObjectiveType[3],"btnAddId_tab4","btnRemoveId_tab4");
  
      
      // add Label and Tab Panel to the Tab
      this.newObjectiveTab.addLabel("اختيار عناصر المواضيع")
      this.newObjectiveTab.fillTabPanel(1,tabPanel1.HTMLElement);
      this.newObjectiveTab.fillTabPanel(2,tabPanel2.HTMLElement);
      this.newObjectiveTab.fillTabPanel(3,tabPanel3.HTMLElement);
      this.newObjectiveTab.fillTabPanel(4,tabPanel4.HTMLElement);
  
      //this.newObjectiveTab.on
  
      this.tapPanels.push(tabPanel1);
      this.tapPanels.push(tabPanel2);
      this.tapPanels.push(tabPanel3);
      this.tapPanels.push(tabPanel4);
  
      // add Checkbox List to the Tab
      this.addCheckBoxList();
  
      if (modeOfOperation==ModeOfOperation.SaveLater){
        this.cloneObjectiveList();
  
      } else if (modeOfOperation==ModeOfOperation.SaveDirect) {
  
        let objectiveListDirect = this.getObjectiveList();
        this.ListOfObjectives=objectiveListDirect.Objectives;
        console.log("ListOfObjectives: ", this.ListOfObjectives);
  
      }
      
      this.fillCombo1();
      this.Combo2OnClick()
      this.activateAddRemoveButtons();
  
      this.HTMLElement=this.newObjectiveTab.HTMLElement;
  
  
    }
  
    updateCheckBoxValues(tabNumber){
  
      this.tapPanels[tabNumber-1].listOfCheckBox.resetCheckBoxValues();
      if (this.currentObjective.skills != undefined){
        
          this.currentObjective.skills.forEach((item)=>{
            let checkboxId = item.skillId+tabNumber;
            console.log(this.currentObjective);
            console.log(checkboxId);
            if (checkboxId != NaN){
              this.tapPanels[tabNumber-1].updateCheckboxeValue(checkboxId,true);
            }
            
          })
        
      }
      
  
    }
  
    addCheckBoxList(){
      // add list of checkboxes type switch to each comboList add remove
      
      let arrInputValues = [];
  
      let checkBoxClickFn = (e)=>{
        let checkboxId =e.target.id
        let tabNumber = parseInt(checkboxId[checkboxId.length -1], 10);
        
        this.setCurrentObjective(tabNumber)
        //console.log(this.currentObjective.id);
        if(this.currentObjective!=""){
          if (e.target.checked){
            console.log(e.target.id+" is added")
            let newSkill = new SkillObj(e.target.value);
            this.currentObjective.skills.push(newSkill);
            console.log(this.currentObjective);
            console.log(this.ListOfObjectives);
          } else {
           
            let SkillIndex = this.currentObjective.skills.findIndex((item)=> item.skillId == e.target.value);
  
            if (SkillIndex>-1){
              this.currentObjective.skills.splice(SkillIndex,1);
              console.log(this.currentObjective);
              console.log(this.ListOfObjectives);
            }
            
          }
  
        }
        
      }
  
      Skills.forEach((item)=>{
        let newValue = new checkboxValues();
  
        newValue.id=item.SkillID;
        newValue.text=item.SkillText;
        newValue.value=item.SkillID;
        arrInputValues.push(newValue);
      })
  
      this.tapPanels.forEach((item,index)=>{
        let tabNummber = index+1
        let checkboxListId = "id-list-test"+tabNummber;
        item.addListofCheckBoxs(checkboxListId,arrInputValues,tabNummber,true,checkBoxClickFn);
        //item.89();
      })
      
  
  
    }
  
  
    fillCombo1(){
      let arrSceneSubjectsIds = _courses.getSceneSubjects();
      let subjectText = "";
      arrSceneSubjectsIds.forEach((item)=>{
        subjectText=_courses.getSubject(item.subjectID)
        subjectText.elements.forEach((LingItem)=>{
  
          if(LingItem.elementType==LingElementType.KeyWords){
            this.tapPanels[0].combo1.addOptionToCombo(LingItem.elementText,LingItem.elementText,true);
          } else if (LingItem.elementType==LingElementType.Structure){
            this.tapPanels[1].combo1.addOptionToCombo(LingItem.elementText,LingItem.elementText,true);
  
          } else if (LingItem.elementType==LingElementType.Vocals){
            this.tapPanels[2].combo1.addOptionToCombo(LingItem.elementText,LingItem.elementText,true);
  
          } else if (LingItem.elementType==LingElementType.Grammer){
            this.tapPanels[3].combo1.addOptionToCombo(LingItem.elementText,LingItem.elementText,true);
          
          }
        });
      });
    }
  
  fillCombo2(Showtype,subQuizId){
    let arrayTofill = [];
    if (Showtype==ShowType.All){
        arrayTofill=[...this.ListOfObjectives];
        console.log("we are in show all")
    } else if (Showtype==ShowType.SubQuizId){
        arrayTofill=this.ListOfObjectives.filter((item)=>{
            item.linkId=subQuizId;
        });
    }
    console.log("this.ListOfObjectives: ",this.ListOfObjectives);
    console.log("arrayTofill: ",arrayTofill);

    arrayTofill.forEach((objective)=>{
  
        if(objective.type==LingElementType.KeyWords){
          this.tapPanels[0].combo2.addOptionToCombo(objective.element,objective.element,true);
        } else if (objective.type==LingElementType.Structure){
          this.tapPanels[1].combo2.addOptionToCombo(objective.element,objective.element,true);

        } else if (objective.type==LingElementType.Vocals){
          this.tapPanels[2].combo2.addOptionToCombo(objective.element,objective.element,true);

        } else if (objective.type==LingElementType.Grammer){
          this.tapPanels[3].combo2.addOptionToCombo(objective.element,objective.element,true);
        
        }
      });


  
  }
  
    getObjectiveList(){
      let currentSlide = _courses.getCurrentSlideObj();
      let objectiveList = currentSlide.GenItems.find((item)=> item.name == "Objectives_GAddons").dataObj;
        
      return objectiveList;
    }
  cloneObjectiveList(){
  
    //Clone ObjectiveList and save it in the class
    let objectiveList = this.getObjectiveList();
    this.ListOfObjectives=JSON.parse(JSON.stringify(objectiveList.Objectives));;
  }
  getUniqueLinkId(){
    let objectivesL = _courses.getCurrentSlideObj().Items//Should be from all currentSide.Items[] if type==quiz
    //id.slice(id.length - 4)
    let arrSubQuizes = objectivesL.map((item) => {

        let viewAction = item.viewAction
        let viewType = viewAction.slice(viewAction.length-4);
        if(viewType=="quiz"){
            
            return item.dataObj.subQuizes;
            //return item.dataObj.id
        }
    
    });

    console.log(arrSubQuizes);
    //let arrLinkIdUnique = arrLinkId.filter((value,index,self)=>self.indexOf(value)===index);

    return arrSubQuizes;
  }
  generateSubQuizId(){
    // get currentItem
    let currentItem = _courses.getCurrentItem();
    // get QuizObj, quizId from currentItem
    let QuizObj = currentItem.dataObj;
    let quizId = QuizObj.id;
    // Generate subQuizId from quizId, array == QuizObj.subQuizes
    let subQuizId = getId_fromArry(quizId, QuizObj.subQuizes,"U");
  
  return subQuizId;
  }
  
  generateObjectiveId(){
    let objectiveList = this.getObjectiveList();
    let objectiveId = getId_fromArry(objectiveList.id, this.ListOfObjectives,"O");
    return objectiveId;
  }
  
  createObjective(Element,ElementType){
      
      let objectiveId = this.generateObjectiveId();
      let subQuizLinkId = this.generateSubQuizId();
      let newObjective_Dobj = new ObjectiveObj(objectiveId,ElementType,Element,subQuizLinkId);
      this.ListOfObjectives.push(newObjective_Dobj);
      console.log(this.ListOfObjectives)
   
  }
  deleteObjective(Element){
    
    this.ListOfObjectives.splice(this.ListOfObjectives.findIndex((item)=> item.element == Element),1);
    console.log(this.ListOfObjectives)
  }
  
  Combo2OnClick(){
    this.tapPanels.forEach((item,index)=>{
      item.combo2.onChange((e)=>{
        let ElementObjective = item.combo2.HTMLElement.value;
        this.currentObjective=this.ListOfObjectives.find((item)=> item.element == ElementObjective);
        this.updateCheckBoxValues(index+1);
        
        console.log(this.currentObjective);
        console.log(this.ListOfObjectives);
      })
      
    })
  
  }
  
  
  setCurrentObjective(tabNumber){
    let combo2Length = this.tapPanels[tabNumber-1].combo2.HTMLElement.length;
    console.log(combo2Length);
    if(combo2Length>0){
      let ElementObjective = this.tapPanels[tabNumber-1].combo2.HTMLElement.value;
      console.log(ElementObjective);
      if(ElementObjective !=-""){
        this.currentObjective=this.ListOfObjectives.find((item)=> item.element == ElementObjective);
      } else {
        console.log("the combo2 not focused");
      }
  
    } else {
      this.currentObjective="";
    }
    
  }
  
  
  activateAddRemoveButtons(){
  
    let tab1_fn = (e,txtOption,OptionValue)=>{
      this.createObjective(txtOption,LingElementType.KeyWords);
      this.setCurrentObjective(1);
      this.updateCheckBoxValues(1);
    }
    let tab2_fn = (e,txtOption,OptionValue)=>{
      this.createObjective(txtOption,LingElementType.Structure)
      this.setCurrentObjective(2)
      this.updateCheckBoxValues(2);
    }
    let tab3_fn = (e,txtOption,OptionValue)=>{
      this.createObjective(txtOption,LingElementType.Vocals)
      this.setCurrentObjective(3)
      this.updateCheckBoxValues(3);
    }
    let tab4_fn = (e,txtOption,OptionValue)=>{
      this.createObjective(txtOption,LingElementType.Grammer)
      this.setCurrentObjective(4)
      this.updateCheckBoxValues(4);
    }
  //Remove functions
    let tab1_RemoveFn = (e,OptionValue)=>{
      this.deleteObjective(OptionValue)
      this.setCurrentObjective(1);
      this.updateCheckBoxValues(1);
           
    }
  
    let tab2_RemoveFn = (e,OptionValue)=>{
      this.deleteObjective(OptionValue)
      this.setCurrentObjective(2);
      this.updateCheckBoxValues(2);
           
    }
  
    let tab3_RemoveFn = (e,OptionValue)=>{
      this.deleteObjective(OptionValue)
      this.setCurrentObjective(3);
      this.updateCheckBoxValues(3);
           
    }
  
    let tab4_RemoveFn = (e,OptionValue)=>{
      this.deleteObjective(OptionValue)
      this.setCurrentObjective(4);
      this.updateCheckBoxValues(4);
           
    }
  
    this.tapPanels[0].addBtnOnClick(tab1_fn);
    this.tapPanels[0].removeBtnOnClick(tab1_RemoveFn);
  
    this.tapPanels[1].addBtnOnClick(tab2_fn)
    this.tapPanels[1].removeBtnOnClick(tab2_RemoveFn)
  
    this.tapPanels[2].addBtnOnClick(tab3_fn)
    this.tapPanels[2].removeBtnOnClick(tab3_RemoveFn)
  
    this.tapPanels[3].addBtnOnClick(tab4_fn)
    this.tapPanels[3].removeBtnOnClick(tab4_RemoveFn)
  
  }
  
  
  }