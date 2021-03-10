
//**************** component's classes */

//Level 0 components

class TextareaComponent {
  constructor(textareaId,rowNumber, cssArr = ["textarea-description", "textarea-resize-vertically"]){
    
    let textareaElement =document.createElement("textarea");
    textareaElement.id=textareaId;
    textareaElement.rows=rowNumber;

    
    cssArr.forEach( cssClass => {
      textareaElement.classList.add(cssClass);
    });
    
    
    this.HTMLElement= textareaElement;
  }

  onEvent(eventName,fn){
    this.HTMLElement.addEventListener(eventName,fn);
  }

  getTextValue(){
    return this.HTMLElement.value;
  }
  setTextValue(_value){
    this.HTMLElement.value = _value;
  }
  clearValues(){
    this.HTMLElement.value="";
  }
}

class LabelComponent {
  constructor(labelTitle,forId, cssArr = ["label-component"]){

    this.labeltitle=document.createElement("label");

    cssArr.forEach( cssClass => {
      this.labeltitle.classList.add(cssClass);
    });

    this.labeltitle.for=forId;
    this.labeltitle.textContent=labelTitle;
    this.HTMLElement= this.labeltitle;
  }

  changeLblTxt(newTxt) {
    this.labeltitle.textContent = newTxt;
  }
} 

class CloseBoxComponent {
  constructor(id_c){

    this.close_button = document.createElement("button");
    this.close_button.type = "button";
    this.close_button.className = "small-close";
    this.close_button.id = "c-" + id_c;
    this.HTMLElement= this.close_button
  }
  onClick(fn){
      
      this.HTMLElement.addEventListener('click', function (e) {
          fn(e);
          
          
      });
  }

} 



class RadioComponent {

constructor(radioId,radioName,radioValue,labelTxt){

let divWrapper=document.createElement("div");
this.inputRadio = document.createElement("input");

divWrapper.classList.add("radio-checkbox")
this.inputRadio.id=radioId;

this.inputRadio.type = "radio";
this.inputRadio.classList.add("radioBtn");
this.inputRadio.style.opacity=1;
this.inputRadio.name=radioName;
this.inputRadio.value=radioValue;

if (radioValue == 1) {
  this.inputRadio.checked = true;
}else {
  this.inputRadio.checked = false;
}

this.checked = this.inputRadio.checked;

let labelRadio = document.createElement("label");
labelRadio.htmlFor=radioId;
labelRadio.textContent=labelTxt;

divWrapper.appendChild(this.inputRadio);
divWrapper.appendChild(labelRadio);
this.HTMLElement=divWrapper;

}
onClick(fn){
      
  this.HTMLElement.firstChild.addEventListener('click', function (e) {
    e.stopPropagation()
    fn(e);
        
    
  });
}

getCheckedState(){
  return this.checked;
}

}

class CheckBoxComponent{
constructor(checkboxId,isSwitchType,labelTxt,checkboxValue){
  let divWrapper=document.createElement("div");
  let inputCheckBox = document.createElement("input");
  inputCheckBox.id=checkboxId;
  inputCheckBox.type="checkbox";
  inputCheckBox.name = "chkbox";
  inputCheckBox.value=checkboxValue;
     
  divWrapper.classList.add("radio-checkbox");

  if(isSwitchType){
    inputCheckBox.classList.add("switch");
  }
  
  let labelCheckbox = document.createElement("label");
  labelCheckbox.htmlFor = checkboxId;
  labelCheckbox.textContent=labelTxt;

  divWrapper.appendChild(inputCheckBox);
  divWrapper.appendChild(labelCheckbox);
  this.HTMLElement=divWrapper;

}


onClick(fn){
      
  this.HTMLElement.firstChild.addEventListener('click', function (e) {
    e.stopPropagation()
      fn(e);
             
  });
}

}

class RadioWithHiddenDiv {
constructor(radioId,radioName,radioValue,labelTxt){
  let divWrapper = document.createElement("div");
  
  this.hiddenDiv = document.createElement("div");
  divWrapper.classList.add("component-container--vertical");
  this.hiddenDiv.classList.add("hidden-div")
  this.hiddenDiv.classList.add("component-container--vertical");
  this.hiddenDiv.classList.add("padding__big");
  this.hiddenDiv.classList.add("hidden");
  

  this.radioBtn = new RadioComponent(radioId,radioName,radioValue,labelTxt)
  
  divWrapper.appendChild(this.radioBtn.HTMLElement);
  divWrapper.appendChild(this.hiddenDiv);
  this.HTMLElement=divWrapper;
}
onClick(fn){
  this.radioBtn.onClick((e)=>{
            
    if(e.target.checked){
      this.hiddenDiv.classList.toggle("shown");
      fn(e)
    }
    
  });
}

addElementToHiddenDiv(htmlElement){
    this.hiddenDiv.appendChild(htmlElement);
  }

}


class CheckBoxWithHiddenDiv {
constructor(checkboxId,isSwitchType,labelTxt,checkboxValue){
  let divWrapper = document.createElement("div");
  
  this.hiddenDiv = document.createElement("div");
  divWrapper.classList.add("component-container--vertical");
  this.hiddenDiv.classList.add("hidden-div");
  this.hiddenDiv.classList.add("component-container--vertical");
  this.hiddenDiv.classList.add("padding__big");
  this.hiddenDiv.classList.add("hidden");
  

  this.checkBoxBtn = new CheckBoxComponent(checkboxId,isSwitchType,labelTxt,checkboxValue);
  
  divWrapper.appendChild(this.checkBoxBtn.HTMLElement);
  divWrapper.appendChild(this.hiddenDiv);
  this.HTMLElement=divWrapper;
}
onClick(fn){
  this.checkBoxBtn.onClick((e)=>{
            
    if(e.target.checked){
      this.hiddenDiv.classList.add("shown");
      fn(e)
    } else {
      this.hiddenDiv.classList.remove("shown");
    }
    
  });
}

addElementToHiddenDiv(htmlElement){
    this.hiddenDiv.appendChild(htmlElement);
  }

}


class ListOfRadioOrCheckBoxComponent{

  constructor(listId, cssArry = ["list-radio-checkbox", "padding__meduim"]){
    
    let divList = document.createElement("div");

    this.Radios = [];
    cssArry.forEach(cssClass => {
      divList.classList.add(cssClass);
    });
    divList.id=listId;
    this.HTMLElement= divList;
  }

  clearList(){
    if (this.HTMLElement.firstChild) {
      while (this.HTMLElement.firstChild) {
        this.HTMLElement.removeChild(this.HTMLElement.firstChild);
      }
    }
  }

  addRadio(radioId,radioName,radioValue,labelTxt,fnClick){
    let newRadio = new RadioComponent(radioId,radioName,radioValue,labelTxt)
    newRadio.HTMLElement.classList.add("list-item-radio-checkbox");
    
    newRadio.onClick((e)=>{
      fnClick(e);
    })

    this.Radios.push(newRadio);

    this.HTMLElement.appendChild(newRadio.HTMLElement);
  
  }

  addCheckBox(checkboxId,isSwitchType,labelTxt,checkboxValue,fnClick){

    let newCheckBox = new CheckBoxComponent(checkboxId,isSwitchType,labelTxt,checkboxValue)
    newCheckBox.HTMLElement.classList.add("list-item-radio-checkbox");
    
    newCheckBox.onClick((e)=>{
      fnClick(e);
    })

    this.HTMLElement.appendChild(newCheckBox.HTMLElement);
  }

  // to fix this later
  resetCheckBoxValues(){
    let arrCheckBox=this.HTMLElement.querySelectorAll("[type='checkbox']");
    arrCheckBox.forEach((item)=>{
      item.checked=false;
    })
  }

  clearRadiosState(){
    this.Radios.forEach(radio => radio.inputRadio.checked = false);
  }

  getRadioValue(id){
     let result = this.Radios.find(radio => radio.inputRadio.id == id);
     return result.inputRadio.checked;
  }

}

class IncreamentComponent {
 constructor(IncreamentId,IncreamentName){

  let divWrapper= document.createElement("div");
  let btnStepDown = document.createElement("button");
  let btnStepUp = document.createElement("button");
  let strongStepDown = document.createElement("strong");
  this.increamentInput = document.createElement("input");

  btnStepDown.id=IncreamentId+"_down";
  btnStepUp.id=IncreamentId+"_up";


  let stepUpTxt = encodeURI("+");
  strongStepDown.appendChild(document.createTextNode(encodeURI("-")));

  this.increamentInput.type="number";
  this.increamentInput.min=0;
  this.increamentInput.value=1;
  this.increamentInput.id=IncreamentId;
  this.increamentInput.name=IncreamentName;

  divWrapper.classList.add("number-input");
  btnStepDown.classList.add("remove-btn-increment");
  btnStepUp.className="plus add-btn-increment";
  this.increamentInput.classList.add("quantity");


  btnStepDown.appendChild(strongStepDown);
  btnStepUp.appendChild(document.createTextNode(stepUpTxt));

  btnStepDown.addEventListener("click",()=>{
    
  let inputIncreament =document.getElementById(IncreamentId);
  let valueNumber=parseInt(inputIncreament.value);

  if (Number.isInteger(valueNumber)&&valueNumber>0){
    inputIncreament.value=valueNumber-1;
    
  }
  })

  btnStepUp.addEventListener("click",()=>{
    
    let inputIncreament =document.getElementById(IncreamentId);
    let valueNumber=parseInt(inputIncreament.value);
    
    if (Number.isInteger(valueNumber)){
      inputIncreament.value=valueNumber+1;
      
    }
  })

  divWrapper.appendChild(btnStepDown);
  divWrapper.appendChild(this.increamentInput);
  divWrapper.appendChild(btnStepUp);

  this.HTMLElement=divWrapper;

 }

 onChange(fn){
   
  this.HTMLElement.querySelector("#"+this.increamentInput.id+"_down").addEventListener("click",fn);
  this.HTMLElement.querySelector("#"+this.increamentInput.id+"_up").addEventListener("click",fn);
 }

}

class messagesComponent{
  constructor(){

  }
  createInfoMsg(messageText){
    // <div class="info">رسائل تعريفية أو لإعطاء الارشادات</div>
    let divMsg = document.createElement("div")
    divMsg.classList.add("info");
    let txtMsgNode = document.createTextNode(messageText);
    divMsg.appendChild(txtMsgNode);
    return divMsg;

  }
  createSuccessMsg(messageText){
    //   <div class="success">رسائل تعبر عن نجاح آخر عملية</div>
    let divMsg = document.createElement("div")
    divMsg.classList.add("success");
    let txtMsgNode = document.createTextNode(messageText);
    divMsg.appendChild(txtMsgNode);
    return divMsg;
  }
  createWarningMsg(messageText){
    //   <div class="warning">رسائل تحذيرية</div>
    let divMsg = document.createElement("div")
    divMsg.classList.add("warning");
    let txtMsgNode = document.createTextNode(messageText);
    divMsg.appendChild(txtMsgNode);
    return divMsg;
  }
  createErrorMsg(messageText){
    //   <div class="error">رسائل أخطاء</div>
    let divMsg = document.createElement("div")
    divMsg.classList.add("error");
    let txtMsgNode = document.createTextNode(messageText);
    divMsg.appendChild(txtMsgNode);
    return divMsg;
  }
  createValidationMsg(messageText){
    //<div class="validation">رسائل أخطاء بالإدخال<br>حدث خطأ ناتج عن إدخال خاطئ</div>
    let divMsg = document.createElement("div")
    divMsg.classList.add("validation");
    let txtMsgNode = document.createTextNode(messageText);
    divMsg.appendChild(txtMsgNode);
    return divMsg;
  }
  createHintMsg(messageText){
  // <!-- Basic Error Message -->
  // <div class="error-message" dir="rtl">
  //   <span class="error-text">الرجاء التأكد من الإدخال وإعادة العملية</span>
  // </div>
    let divMsg = document.createElement("div")
    let spanMsg = document.createElement("span");

    divMsg.classList.add("error-message");
    spanMsg.classList.add("error-text");

    divMsg.style.direction="rtl";
    let txtMsgNode = document.createTextNode(messageText);

    spanMsg.appendChild(txtMsgNode);
    divMsg.appendChild(spanMsg);
    return divMsg;



}


}

class BtnInListComponent {
constructor(TextValue,listButtonId){
  let btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add("buttons-in-list");
  btn.id = listButtonId;
  let txtNode = document.createTextNode(TextValue);
  btn.appendChild(txtNode);
  this.HTMLElement=btn;
}
}

class ListComponent {
 
  constructor(listId){

    let divList = document.createElement("div");
    divList.classList.add("list-group");
    divList.id=listId;
     
    this.HTMLElement= divList;
  }

 
  clearList(){
    if (this.HTMLElement.firstChild) {
      while (this.HTMLElement.firstChild) {
        this.HTMLElement.removeChild(this.HTMLElement.firstChild);
      }
    }
  }

  addButtonToList(TextValue,listButtonId,fnOnClick){
        
    if (TextValue != "") {
      
        const listBtn = new BtnInListComponent(TextValue,listButtonId);
        listBtn.HTMLElement.addEventListener("click",(e)=>{
          fnOnClick(e);
        })
        this.HTMLElement.appendChild(listBtn.HTMLElement)
          
    }
  }


  addButtonWithCloseBoxToList(TextValue,listButtonId,id_c,fnOnClick,fnOnClose,_super){
       
    let divWrapper=document.createElement("div");
    divWrapper.classList.add("buttons-wrapper");
    
    const listBtn = new BtnInListComponent(TextValue,listButtonId); 
    const closeBox = new CloseBoxComponent(id_c);
    
    listBtn.HTMLElement.addEventListener("click", (e) => {fnOnClick(e,_super)});

    closeBox.HTMLElement.addEventListener("click",(e) => { fnOnClose(e, _super); });
    


    divWrapper.appendChild(listBtn.HTMLElement);
    divWrapper.appendChild(closeBox.HTMLElement);
      
    this.HTMLElement.appendChild(divWrapper)
        
  }

}

class ListOfTextareaComponent {
  constructor(listId){

    let divList = document.createElement("div");
    divList.classList.add("list-textarea");
    divList.id=listId;
    this.HTMLElement= divList;
  }
  clearList(){
    if (this.HTMLElement.firstChild) {
      while (this.HTMLElement.firstChild) {
        this.HTMLElement.removeChild(this.HTMLElement.firstChild);
      }
    }
  }
  addInputtextareaWithLabel(textareaId,labelTitle,rowNumber,withCloseBox,fnOnBlur,fnOnClose){
    
    let emptyfunction = ()=>{};
    fnOnClose= fnOnClose || emptyfunction;

    let divWrapper = document.createElement("div");
    divWrapper.classList.add("component-container--vertical");
    let textareaWithLabel=""

    if (withCloseBox){
      textareaWithLabel = new TextareaLabelWithClose(textareaId,labelTitle,rowNumber);
      textareaWithLabel.textarea.onEvent("blur",(e)=>{
        fnOnBlur(e);
      });

      textareaWithLabel.closeBox.onClick((e)=>{
        fnOnClose(e);
      })

    } else {
      textareaWithLabel = new TextareaLabelComponent(textareaId,labelTitle,rowNumber);
      textareaWithLabel.textarea.onEvent("blur",(e)=>{
        fnOnBlur(e);
      });
    }
    

    textareaWithLabel.HTMLElement.classList.add("list-input-textarea");

    this.HTMLElement.appendChild(textareaWithLabel.HTMLElement);

  }


}


class ComboComponent {
  constructor(comboId){
    this.comboSelect =document.createElement("select");
    this.comboSelect.classList.add("list-combo");
    this.comboSelect.id=comboId;
    this.HTMLElement=this.comboSelect;
  }
    clearCombo(){
      if (this.HTMLElement.firstChild) {
        while (this.HTMLElement.firstChild) {
          this.HTMLElement.removeChild(this.HTMLElement.firstChild);
        }
      }
    }

    addOptionToCombo(txtOption, OptionValue, addToEnd){
    
        let newOption = document.createElement("option");
        let optionText = document.createTextNode(txtOption);
        // set option text
        newOption.appendChild(optionText);
        // and option value
        newOption.setAttribute("value", OptionValue);
        // add the option to the select box
        (addToEnd)? this.comboSelect.appendChild(newOption): this.comboSelect.prepend(newOption);
      
    }

    removeOption(OptionValue){
      
      Array.from(this.comboSelect.options).forEach((element) => {
          if (element.value == OptionValue) {
            element.remove();
          }
        });
      
    }

    checkIfAdded(OptionValue){
      let available = false
      Array.from(this.comboSelect.options).forEach((element) => {
        
        if(element.value==OptionValue) {
          available=true;
        }
      });
      
      return available;

    }

    onChange(fn){
    this.comboSelect.addEventListener("change",(e)=>{
    fn(e);
    });
    }

    onBlur(fn){
      this.comboSelect.addEventListener("blur",(e)=>{
        fn(e);
      })
    }


}




//Level 1 components

class TextareaLabelComponent {
  constructor (textareaId, labelTitle,rowNumber){
    
    let divWrapper = document.createElement("div");
    let labeltitle=new LabelComponent(labelTitle,textareaId);
    this.textarea =new TextareaComponent(textareaId,rowNumber);
    
    this.labelTitle=labeltitle.HTMLElement; //to pass it to next Compoenet
    divWrapper.classList.add("component-container--vertical");
     
    divWrapper.appendChild(labeltitle.HTMLElement);
    divWrapper.appendChild(this.textarea.HTMLElement);
  
    this.HTMLElement= divWrapper;
  
  }
  getTextValue(){
    return this.textarea.getTextValue();
  }
  setTextValue(_value){
    this.text.setTextValue(_value);
  }
  clearValue(){
    this.textarea.clearValues();
  }
  
}


class InputLabelComponent {
  constructor(inputId, labelTitle, cssArr){
    let divWrapper = document.createElement("div");
    let labeltitle = new LabelComponent(labelTitle,inputId);
    this.labelTitle = labeltitle.HTMLElement;

    this.inputBox = document.createElement("INPUT");
    this.inputBox.setAttribute("type", "text");
    
    cssArr.forEach( cssClass => {
      this.inputBox.classList.add(cssClass);
    });
    
    divWrapper.classList.add("component-container--vertical");
     
    divWrapper.appendChild(this.labelTitle);
    divWrapper.appendChild(this.inputBox);

    this.HTMLElement = divWrapper;

  }
 
}



class TextareaLabelWithClose {

  constructor (textareaId, labelTitle,rowNumber){

    let divWrapper = document.createElement("div");  
    let textareaLabel =new TextareaLabelComponent(textareaId, labelTitle,rowNumber)
    this.textarea = this.textareaLabel.textarea;
    this.closeBox = new CloseBoxComponent(textareaId)
    this.labelTitle = textareaLabel.HTMLElement;
  
    divWrapper.className = "component-container--vertical";
        
    divWrapper.appendChild(textareaLabel.HTMLElement);
    divWrapper.appendChild(this.closeBox.HTMLElement);
    
    this.HTMLElement= divWrapper;
  }


} 

class mediaObjPreview {
  constructor(txtarea_stemId,txtEntryPostFix, tabsetId, tabpnlId){

    let txtEntry_Text_id = `Id-txtEntryPreview-${MediaType.Text_sentence}-${txtEntryPostFix}-${txtarea_stemId}`;
    let txtEntry_Picture_id = `Id-txtEntryPreview-${MediaType.pic_photo}-${txtEntryPostFix}-${txtarea_stemId}`;
    let txtEntry_Drawings_id = `Id-txtEntryPreview-${MediaType.pic_drawing}-${txtEntryPostFix}-${txtarea_stemId}`;
    let txtEntry_Sound_id = `Id-txtEntryPreview-${MediaType.sound_record}-${txtEntryPostFix}-${txtarea_stemId}`;

    let arrObjectiveType = ["", "", "", ""];

    this.mObjPreviewTab = new TabComponent(arrObjectiveType, 4,tabsetId, tabpnlId);
    this.mObjPreviewTab.divTabset.parentNode.className = "SL-quizItemsPreview--mediaObj";       //discuss with Mutaz
    this.mObjPreviewTab.changeTabLblCss(["tab-labels-mObjPrv"]);
    this.mObjPreviewTab.addIconsTabLbl([addOns[0].Icon,addOns[3].Icon, addOns[4].Icon, addOns[6].Icon]);

    this.tabPanel1 = new TextareaComponent(txtEntry_Text_id,5,["textarea-description-preview", "textarea-resize-vertically"]);
    this.mObjPreviewTab.fillTabPanel(0,this.tabPanel1.HTMLElement);
    this.tabPanel2 = new TextareaComponent(txtEntry_Picture_id,5,["textarea-description-preview", "textarea-resize-vertically"]);
    this.mObjPreviewTab.fillTabPanel(1,this.tabPanel2.HTMLElement);
    this.tabPanel3 = new TextareaComponent(txtEntry_Drawings_id,5,["textarea-description-preview", "textarea-resize-vertically"]);
    this.mObjPreviewTab.fillTabPanel(2,this.tabPanel3.HTMLElement);
    this.tabPanel4 = new TextareaComponent(txtEntry_Sound_id,5,["textarea-description-preview", "textarea-resize-vertically"]);
    this.mObjPreviewTab.fillTabPanel(3,this.tabPanel4.HTMLElement);
    
    
    this.mObjPreviewTab.changeTabPanelCss("tab-panel-component-media");
    this.mObjPreviewTab.tabSets[0].HTMLElement.dispatchEvent(new Event('click'));

    

    this.HTMLElement = this.mObjPreviewTab.HTMLElement;

    
    
  }

  assignQuizNo(_number){

    let no_lbl = this.mObjPreviewTab.divTabset.querySelector('#tab-number-label');

    if (!no_lbl) {
      no_lbl = document.createElement("label");
      no_lbl.id = "tab-number-label";
      this.mObjPreviewTab.divTabset.appendChild(no_lbl);
    }

    no_lbl.textContent = _number;

    
  }
  setEntries(_subQuizObj){

    _subQuizObj.mediaObjects.forEach( mObj => {

        if (mObj.type == MediaType.Text_sentence){
            this.tabPanel1.setTextValue(mObj.text);
        }else if (mObj.type == MediaType.pic_photo){
          this.tabPanel2.setTextValue(mObj.text);
        }else if (mObj.type == MediaType.pic_drawing){
          this.tabPanel3.setTextValue(mObj.text);
        }else if (mObj.type == MediaType.sound_record){
          this.tabPanel4.setTextValue(mObj.text);
        }
        else throw Error("unknow media type");

    });

  }

  
  activateOnEvent(event,subQuizId){
    
                  
    this.tabPanel1.HTMLElement.addEventListener(event,(e)=>{
      
      let saveSubQuiz1 = new SaveSubQuizToDB(subQuizId,e.target.value,MediaType.Text_sentence)
      saveSubQuiz1.execute();

    });


    this.tabPanel2.HTMLElement.addEventListener(event,(e)=>{

      let saveSubQuiz2 = new SaveSubQuizToDB(subQuizId,e.target.value,MediaType.pic_photo)
      saveSubQuiz2.execute();

    })
 
  

    this.tabPanel3.HTMLElement.addEventListener(event,(e)=>{

      let saveSubQuiz3 = new SaveSubQuizToDB(subQuizId,e.target.value,MediaType.pic_drawing)
      saveSubQuiz3.execute();

    })


    this.tabPanel4.HTMLElement.addEventListener(event,(e)=>{

      let saveSubQuiz4 = new SaveSubQuizToDB(subQuizId,e.target.value,MediaType.sound_record)
      saveSubQuiz4.execute();

    })


  }
}


class mediaObjEntry {
  
  constructor(tabsetId, tabpnlId,txtEntryIdPostfix) {

  let txtEntry_textId = `Id-txtEntry-${MediaType.Text_sentence}-${txtEntryIdPostfix}`; //[SI] for subQuiz [AI + Number]for Answers ==> Input
  let txtEntry_picId = `Id-txtEntry-${MediaType.pic_photo}-${txtEntryIdPostfix}`; //[SP] for subQuiz [AP + Number]for Answers ==> Preview
  let txtEntry_drawingId = `Id-txtEntry-${MediaType.pic_drawing}-${txtEntryIdPostfix}`; 
  let txtEntry_soundId = `Id-txtEntry-${MediaType.sound_record}-${txtEntryIdPostfix}`; 

  let arrObjectiveType = [addOns[0].Text, addOns[3].Text, addOns[4].Text, addOns[6].Text];

  this.mediaObjTab = new TabComponent(arrObjectiveType,4, tabsetId, tabpnlId);

  
  // add Label and Tab Panel to the Tab
  this.mediaObjTab.addLabel("ادخال مكونات الجملة");
  this.mediaObjTab.changeTabLblCss(["buttons-panelHeader"]);

  this.mediaObjTab.addIconsTabLbl( [addOns[0].Icon,addOns[3].Icon, addOns[4].Icon, addOns[6].Icon]);

  this.tabPanel1 = new TextareaComponent(txtEntry_textId,5);
  this.mediaObjTab.fillTabPanel(0,this.tabPanel1.HTMLElement);
  this.tabPanel2 = new TextareaComponent(txtEntry_picId,5);
  this.mediaObjTab.fillTabPanel(1,this.tabPanel2.HTMLElement);
  this.tabPanel3 = new TextareaComponent(txtEntry_drawingId,5);
  this.mediaObjTab.fillTabPanel(2,this.tabPanel3.HTMLElement);
  this.tabPanel4 = new TextareaComponent(txtEntry_soundId,5);
  this.mediaObjTab.fillTabPanel(3,this.tabPanel4.HTMLElement);
  
  
  this.mediaObjTab.changeTabPanelCss("tab-panel-component-media");
  
  
  this.mediaObjTab.tabSets[0].HTMLElement.dispatchEvent(new Event('click'));
  //this.mediaObjTab.clickTabset(0);

  this.HTMLElement = this.mediaObjTab.HTMLElement;

  }

  changeLbl(lbl_header) {
    this.mediaObjTab.addLabel(lbl_header);
    
  }

  getEntries(){
  
    let result = [];

    let txtEntry_text = this.tabPanel1.getTextValue();
    if (txtEntry_text.length > 0) {
      result.push({text: txtEntry_text, type: MediaType.Text_sentence});
    }

    let txtEntry_pic = this.tabPanel2.getTextValue();
    if (txtEntry_pic.length > 0) {
      result.push({text: txtEntry_pic, type: MediaType.pic_photo});
    }

    let txtEntry_drawing = this.tabPanel3.getTextValue();
    if (txtEntry_drawing.length > 0) {
        result.push({text: txtEntry_drawing, type: MediaType.pic_drawing})
    }

    let txtEntry_sound = this.tabPanel4.getTextValue();
    if (txtEntry_sound.length > 0) {
       result.push({text: txtEntry_sound, type: MediaType.sound_record});
    }
    
    return result;
    
  }
  clearEntry(){
    this.tabPanel1.clearValues();
    this.tabPanel2.clearValues();
    this.tabPanel3.clearValues();
    this.tabPanel4.clearValues();
  }


}
class ComboLabelComponent{

  constructor(comboId,comboTitle){
  
    let divWrapper = document.createElement("div");
    let labeltitle=new LabelComponent(comboTitle,comboId);
    this.combo =new ComboComponent(comboId);
        
    divWrapper.classList.add("component-container--vertical");
      
    divWrapper.appendChild(labeltitle.HTMLElement);
    divWrapper.appendChild(this.combo.HTMLElement);
  
    this.HTMLElement=divWrapper;
  
  }



} 

class ContainerLabelComponent {
  constructor(_id, containerTitle, cssArr) {

    let divWrapper = document.createElement("div");

    let labeltitle=new LabelComponent(containerTitle,"lbl_"+ _id);
    this.Container = document.createElement("div");
    this.Container.id = _id;

    cssArr.forEach(cssClass => {
      this.Container.classList.add(cssClass);
    });
            
    divWrapper.classList.add("component-container--vertical");
      
    divWrapper.appendChild(labeltitle.HTMLElement);
    divWrapper.appendChild(this.Container);
  
    this.HTMLElement=divWrapper;
  }

  addControl(ctrl) {
    if (ctrl) {
      this.Container.appendChild(ctrl);
    }
  }
}
class ComboTextLabelComponent {
  constructor(comboId,textareaId,comboLabelTitle,textareaLabelTitle,textareaNumberOfRows ){
    let divWrapper = document.createElement("div");
    let comboComponent=new ComboLabelComponent (comboId,comboLabelTitle);
    let textareaComponent=new TextareaLabelComponent(textareaId,textareaLabelTitle,textareaNumberOfRows);
    this.combo= comboComponent.combo;
    this.textarea = textareaComponent.textarea;
    this.labelTitle = textareaComponent.labelTitle;

    comboComponent.HTMLElement.style.width="20%";
    comboComponent.HTMLElement.style.marginLeft="10px";
    textareaComponent.HTMLElement.style.width="80%";
    divWrapper.classList.add("component-container--horizontal");
  
    divWrapper.appendChild(comboComponent.HTMLElement);
    divWrapper.appendChild(textareaComponent.HTMLElement);
    this.HTMLElement=divWrapper;
  }
  
}

class ComboShowGifComponent {
   constructor(comboId,imgId,comboLabelTitle){
    let divWrapper = document.createElement("div");
    let comboComponent=new ComboLabelComponent(comboId,comboLabelTitle);
    let ImageComponent=new ImageBoxComponent(imgId);

    this.combo= comboComponent.combo;
    this.image=ImageComponent.HTMLElement;
    comboComponent.HTMLElement.style.width="60%";
    comboComponent.HTMLElement.style.marginLeft="10px";
    
    divWrapper.classList.add("component-container--horizontal");
  
    divWrapper.appendChild(comboComponent.HTMLElement);
    divWrapper.appendChild(ImageComponent.HTMLElement);
    this.HTMLElement=divWrapper;
  }
}


class ImageBoxComponent{
  constructor(ImageId){
    let imageElement = document.createElement("img");
    imageElement.id = ImageId;
    imageElement.classList.add("box-show-gif")
    this.HTMLElement=imageElement;
  }

} 






class ListWithLabelComponent {
  constructor(listId,labelTitle){

    let divWrapper = document.createElement("div");
    let labelListTitle = new LabelComponent(labelTitle,listId);
    this.listElement = new ListComponent(listId);
    
    divWrapper.classList.add("component-container--vertical");
    
    divWrapper.appendChild(labelListTitle.HTMLElement);
    divWrapper.appendChild(this.listElement.HTMLElement);
    
    this.HTMLElement= divWrapper;
    
    }

} 


class ListWithLabelAndInputComponent{

   
    //btn_add_lesson.addEventListener("click", () => {
    //addNewItems(txt_lesson_entry.value, id_less_key, lst_lessons, true).focus();
    
    
  constructor(listId,labelTitle,inputTextId,placeholder,addBtnId){

    let divWrapper = document.createElement("div");

    let listWithLabelElement = new ListWithLabelComponent(listId,labelTitle);
    this.listElement=listWithLabelElement.listElement;
    let inputTextAddBtn = new InputTextWithAddBtnForListComponent(inputTextId,placeholder,addBtnId);
    
    this.inputText = inputTextAddBtn.inputText;
    this.addbutton = inputTextAddBtn.addButton;


    this.lstCatObj = [];
    this.currentValue = "-1";
    this.listElement.HTMLElement.mode = "normal";
    // this.addLstHandler(this, this.listElement.HTMLElement);
    this.keyHandlers(this, this.listElement,this.inputText,this.addbutton.HTMLElement);


    divWrapper.classList.add("component-container--vertical");
    divWrapper.appendChild(listWithLabelElement.HTMLElement);
    divWrapper.appendChild(inputTextAddBtn.HTMLElement);

    this.HTMLElement=divWrapper;

  }

  getTextValue(){
    return this.inputText.getTextValue();
  }
  
  getLstLength(){
    return this.listElement.HTMLElement.children.length;
  }
  clearTxtBox(){
    this.inputText.clearTxtBox();
  }
  addLstHandler(_super, lst) {

    lst.index = "-1";
    lst.mode = "normal";
    

    lst.addEventListener('click', function(e) {

      
      if (lst.length <= 0) return;


      if (!e.target.classList.contains("buttons-in-list")) return;
    
          lst.index = e.target.id;

      if (e.detail == 2) {
          _super.inputText.HTMLElement.value = e.target.textContent;
          _super.addbutton.HTMLElement.textContent = "تعديل"
          lst.mode = "update";

      }else {
        resetAddBtn(this.listElement, _super.inputText.HTMLElement, _super.addbutton.HTMLElement);

      }

      //if (_super.currentValue != lst.index) {
        cleanStyleinLst(lst, "buttons-in-list--selected");
        e.target.classList.add ("buttons-in-list--selected");
        _super.currentValue = lst.index;
      //}



    });

  }
  
  clickOnLstBtn(e,_super){

      if (e.detail == 2) {
        _super.inputText.HTMLElement.value = e.target.textContent;
        _super.addbutton.HTMLElement.textContent = "تعديل"
        _super.listElement.HTMLElement.mode = "update";
        _super.inputText.HTMLElement.click();

      }else {
        resetAddBtn(_super.listElement.HTMLElement, _super.inputText.HTMLElement, _super.addbutton.HTMLElement);

      }

    //if (_super.currentValue != lst.index) {
      cleanStyleinLst(_super.listElement.HTMLElement, "buttons-in-list--selected");
      e.target.classList.add ("buttons-in-list--selected");
      _super.currentValue = e.target.id;
    //}

  }

  clkOnClose(e, _super){

      let _id = e.target.id.split('-')[1];
      

      if (removeBtnFromLst(_super.listElement.HTMLElement, _id)) {

          activateAfterDelete(_super.lstCatObj, _id, _super.currentValue);
          _super.lstCatObj = _super.lstCatObj.filter(item => item.id != _id);
      }

  }

  // Reset the add button (switch from update mode)
  reset_AddBtn(lst, txt,btn){
    lst.mode = "normal";
    txt.HTMLElement.value = "";
    btn.textContent = "إضافة";
  }

  keyHandlers(_super, lst, txt_entry, btn_add){
    // select the text when its being clicked
    txt_entry.onEvent('click', ()=> {
      _super.selectAllTxt(txt_entry);
    });

    // when press Enter key on the input of a list item
    // fires add button
    txt_entry.onEvent('keydown', function (e) {

        if (e.key === 'Enter') {

        btn_add.dispatchEvent(new Event('click'));

        // escape the update mode on the list
        }else if (e.key  === 'Escape')  {

          _super.reset_AddBtn(lst, txt_entry, btn_add);
        }

    });
  }

  
  // select all text in an input box
  selectAllTxt(txt) {
    console.log('here select text')
    if (txt.HTMLElement.value.length)  
        txt.HTMLElement.select();
  }



}


class InputTextWithAddBtnForListComponent {
  constructor(inputTextId,placeholder,btnId) {

    let divWrapper= document.createElement("div");
    this.inputText = new InputTextForListComponent(inputTextId,placeholder);
    this.addButton = new AddBtnWordComponent(btnId,"إضافة", ["add-btn"]);

    divWrapper.classList.add("input-group")

    divWrapper.appendChild(this.inputText.HTMLElement);
    divWrapper.appendChild(this.addButton.HTMLElement);

    this.HTMLElement=divWrapper;
  }

  getTextValue(){
    return this.inputText.getTextValue();
  }
  
}


class InputTextForListComponent {
  constructor(inputTextId,placeholder){
    //<input type="text" class="list-inputfield" placeholder="إدخال الدرس" id="txt_lesson"/>
    let inputText = document.createElement("input");
    inputText.type ="text";
    inputText.classList.add("list-inputfield");
    inputText.id=inputTextId;
    inputText.placeholder=placeholder;  
    this.HTMLElement=inputText;
  }
  onEvent(eventName,fn){
    this.HTMLElement.addEventListener(eventName,fn);
  }


  getTextValue(){
    return this.HTMLElement.value;
  }
  clearTxtBox(){
    this.HTMLElement.value = "";
  }

}

class AddBtnWordComponent {
  constructor(btnId,txt, cssArr){
    //<button id="add_lesson" class="add-btn">إضافـة</button>
    //<button class="add-btn" id="add_subject_to_scene"> &#x271A;</button>
    //<button class="remove-btn" id="remove_subject_from_scene"> <strong>&minus;</strong></button> 
    const addBtn = document.createElement("button");
    addBtn.type="button";
    addBtn.id=btnId;
    
    cssArr.forEach(cssClass => {
      addBtn.classList.add(cssClass);
    });
    
    const btnText = document.createTextNode(txt);
    addBtn.appendChild(btnText);
    this.HTMLElement=addBtn;

  }

  onClick(fn){
      
    this.HTMLElement.addEventListener('click', function (e) {
        fn(e);
        
        
    });


}
}

class ComboListAddRemoveComponent{

  constructor(combo1Id, combo2Id,combo1Title,btnAddId,btnRemoveId){
      
    let divWrapper = document.createElement("div")
    let combo1DivWrapper = document.createElement("div");
    this.combo2DivWrapper = document.createElement("div");
   
    // let strongTxt = document.createElement("strong");
    // strongTxt.innerHTML="&minus;"
    

    this.labelTitle = new LabelComponent(combo1Title,combo1Id)
    this.combo1 = new ComboComponent(combo1Id)
    this.addButton = new AddBtnWordComponent(btnAddId,"+", ["add-btn"]);
    this.removeButton = new AddBtnWordComponent(btnRemoveId,"-",["remove-btn"]);
    this.combo2 = new ComboComponent(combo2Id)
    this.combo2.HTMLElement.size = 6;

    divWrapper.classList.add("component-container--vertical");
    combo1DivWrapper.classList.add("component-container--horizontal");
    

    combo1DivWrapper.appendChild(this.combo1.HTMLElement);
    combo1DivWrapper.appendChild(this.addButton.HTMLElement);
    combo1DivWrapper.appendChild(this.removeButton.HTMLElement);
      
    this.combo2DivWrapper.appendChild(this.combo2.HTMLElement);
    divWrapper.appendChild(this.labelTitle.HTMLElement);
    divWrapper.appendChild(combo1DivWrapper);
    divWrapper.appendChild(this.combo2DivWrapper);
    
    this.HTMLElement=divWrapper
    
  }

addBtnOnClick(fn){
  //this.combo2.addOptionToCombo(this.combo1.HTMLElement.value);
  if (this.combo1.HTMLElement.options.length>0){
    this.addButton.onClick((e)=>{
    
      let ComboRead = this.combo1.HTMLElement;
      let txtOption=ComboRead.options[ComboRead.selectedIndex].text;
      let OptionValue=ComboRead.options[ComboRead.selectedIndex].value;
      let addToEnd=true;
      let checkAvailabity=this.combo2.checkIfAdded(OptionValue)
      
      if(!checkAvailabity){
        this.combo2.addOptionToCombo(txtOption, OptionValue, addToEnd);
        this.combo2.HTMLElement.options[this.combo2.HTMLElement.length-1].selected = true;
        fn(e,txtOption,OptionValue)
      } else {
        console.log("This Value already Added!!!");
      }
    
    })
  }
  
}

removeBtnOnClick(fn){
 
    this.removeButton.onClick((e)=>{
     
    let ComboRead = this.combo2.HTMLElement;
    let combo2Index = ComboRead.selectedIndex;
    
    
    if (combo2Index !=-1){
      
      let OptionValue=ComboRead.options[ComboRead.selectedIndex].value;
      this.combo2.removeOption(OptionValue);
      let comboLength = ComboRead.options.length;
      if (comboLength>0){
        ComboRead.selectedIndex=comboLength-1;
      }
      fn(e,OptionValue);
      
    }
    
  })
}

addListofCheckBoxs(listId,arrInputValues,tabNumber,isSwitchType,arrOnClickfn){

  this.combo2DivWrapper.classList.add("combo2-checkbox-list");

  this.listOfCheckBox = new ListOfRadioOrCheckBoxComponent(listId);

  arrInputValues.forEach((item,index)=>{
    this.listOfCheckBox.addCheckBox(item.id+tabNumber,isSwitchType,item.text,item.value,arrOnClickfn)
  });
    
  this.combo2DivWrapper.appendChild(this.listOfCheckBox.HTMLElement);

}
disableCheckboxes(){
  
   
  let checkboxList = this.HTMLElement.querySelector(".combo2-checkbox-list").querySelectorAll("[type='checkbox']");
    console.log(checkboxList);

   checkboxList.forEach((item)=>{
     item.disabled=true;
   })
  
}
EnabelCheckboxes(){
  let checkboxList = this.HTMLElement.querySelector(".combo2-checkbox-list").querySelectorAll("[type='checkbox']");
    console.log(checkboxList);

   checkboxList.forEach((item)=>{
     item.disabled=false;
   })
}
updateCheckboxeValue(checkBoxId,value){
  let checkboxItem = this.HTMLElement.querySelector("#"+checkBoxId);
    console.log(checkboxItem);

   checkboxItem.checked = value;
}


} 


class TabsetClass {

  constructor(tabText,tabsetId, tabStyle = "tab-label-component"){
    this.tabLabel = document.createElement("button");
    this.tabLabel.className = tabStyle;
    
    this.tabLabel.id = tabsetId;
       
    this.tabLabel.textContent=tabText;

    this.HTMLElement= this.tabLabel;
 
  }

  changeCssClass(newTabStyle){
      this.tabLabel.className = newTabStyle;  
  }

  addClose(func_close, extra_close_work = null){
      let closeBtn = new CloseBoxComponent(this.tabLabel.id);
      closeBtn.onClick(func_close);

      if (extra_close_work) {
          closeBtn.onClick(extra_close_work);
      }
          

      this.tabLabel.appendChild(closeBtn.HTMLElement);
  }

  addIcon (iconName) {
      

      let Item_text = document.createElement("span");
      let Item_icon = document.createElement("i");

      Item_icon.className = iconName;
      Item_text.className = "tab-header--icons";

      this.tabLabel.appendChild(Item_icon);
      this.tabLabel.appendChild(Item_text);

  }

}

class TabPanelClass {
  constructor(tabPanelId){

    this.tabSection = document.createElement("section");
    this.tabSection.id=tabPanelId;
    this.tabSection.className= "tab-panel-component";
    this.HTMLElement = this.tabSection;
  }

  changeCssClass(newCssClass){
      this.tabSection.className= newCssClass;
  }
}


class TabComponent{
        
  constructor( arrTabNames, maxNo = 4, tabsetId_stem = "Id-tabset-", tabPnlId_stem = "Id-panel-"){

    if (arrTabNames.length > maxNo) {
        throw new Error('Tab numbers assigned are greater than the initialized max number');
    }

    let divWrapper = document.createElement("div");
    divWrapper.classList.add("component-container--vertical");  

    this.divTabset = document.createElement("div");
    this.divTabset.classList.add("tabset-component");

    this.divTapanels = document.createElement("div");
    this.divTapanels.classList.add("tab-panels-component");

    this.divExtraControls = null;

    this.maxTabsetNo = maxNo;
    this.tabLabel="";
    this.tabSets=[];
    this.tabPanels=[];
    this.headerCssClass = ["tab-label-component"];
    this.panelCssClass = "tab-panel-component";

    this.tabsetId_stem = tabsetId_stem;
    this.tabPnlId_stem = tabPnlId_stem;


    arrTabNames.forEach((value,index)=>{
      let tabsetId =  tabsetId_stem + (index);
      let tabPanelId = tabPnlId_stem + (index);
      
      let new_tabset = new TabsetClass(value,tabsetId);
      new_tabset.index = index;
      this.tabSets.push(new_tabset);

      let new_tabpnl = new TabPanelClass(tabPanelId);
      new_tabpnl.index = index;
      
      this.tabPanels.push(new_tabpnl);

      this.divTabset.appendChild(new_tabset.HTMLElement);
      this.divTapanels.appendChild(new_tabpnl.HTMLElement)
      
    });

    // the index Where the new tabset must inserted
    this.tabSets.index = this.tabSets.length;
    
    divWrapper.appendChild(this.divTabset);
    divWrapper.appendChild(this.divTapanels);

    

    this.HTMLElement=divWrapper;

    this.tabSets.forEach((value) => {
         
      value.HTMLElement.addEventListener("click",(e)=>{
        this.clickTabset(e);
        });
    
      });

 
               
  }

  changeTabLblCss(cssArr){

      this.tabSets.forEach((value,index)=>{

          if (cssArr.length <= 0) {
              throw Error('Must specify at least one css class!')
          }
          
          if (cssArr[index]) {

              value.changeCssClass(cssArr[index]);
          }else {

              value.changeCssClass(cssArr[0]);
          }

          this.headerCssClass = [];
          this.headerCssClass = [...cssArr];
      });
  }

  changeTabPanelCss(newCss) {
      this.tabPanels.forEach (item => item.changeCssClass(newCss));
      this.panelCssClass = newCss;
  }

  addIconsTabLbl(iconsArry) {

      this.tabSets.forEach((value,index)=>{

          if (iconsArry.length <= 0) {
              throw Error('Must specify at least one Icon!')
          }
          
          if (iconsArry[index]) {

              value.addIcon(iconsArry[index]);
        
          }

      });
  }

  fillTabPanel(tabsetNumber, tabPanelHTML){

  //   if (Number.isInteger(tabsetNumber) && tabsetNumber<=this.tabSets.length){
      // this.HTMLElement.querySelector(`#${this.tabPnlId_stem}${tabsetNumber}`).appendChild(tabPanelHTML);
      let currentPnl = this.tabPanels.find (tpnl => tpnl.index == tabsetNumber);
      if (currentPnl) {
        currentPnl.HTMLElement.appendChild(tabPanelHTML);
      }
        

      // if(tabsetNumber===1){
      //      this.clickTabset(1)
      //  } 
      // }else{
      //   console.log("Please insert a valid Integer tabset Number within the range")
      // }
  }
    
  
  clickTabset(e){

  //   if (Number.isInteger(tabsetNumber) && tabsetNumber<=this.tabSets.length){
      let tabsetId = e.currentTarget.id; //this.tabsetId_stem + tabsetNumber;
      let tabsetNumber = this.tabSets.find( tabs => tabs.tabLabel.id == tabsetId).index;
      let currentPnl = this.tabPanels.find (tpnl => tpnl.index == tabsetNumber);

     
      

      // let tabPanelId = currentPnl.HTMLElement.id;
      // let tabPanelId = this.tabPanels.find ( pnl => pnl.index == tabsetNumber).tabSection.id;
      
      //fix the color of the clicked tabset and reset the others
      let cssClass = this.headerCssClass[tabsetNumber] || this.headerCssClass[0];
      
      this.tabSets.forEach( tabset => {
          let found = null;
          tabset.HTMLElement.classList.forEach ( 
             (cssFile) => {
                  if (cssFile.includes('--selected')) {
                      found = cssFile;
                  }
              });
          if (found) { tabset.HTMLElement.classList.remove(found);}
      });

      e.currentTarget.classList.add(cssClass + "--selected")
      
      //make the tabPanel visible and hide the others  
      let tabPanels = this.HTMLElement.querySelectorAll(`.${this.panelCssClass}`);

      tabPanels.forEach((item)=>{
        item.classList.remove("tab-panel-show");
      })

      currentPnl.HTMLElement.classList.add("tab-panel-show");
      // let x = this.HTMLElement.querySelector("#"+tabPanelId);//.classList.add("tab-panel-show");
      // console.log(x);
  //   } else{
  //     console.log("Please insert a valid Integer tabset Number within the range")
  //   }

  }

  addLabel(labelTitle){
    let tabId="Id-TabLabel_"+labelTitle.length;
    
    if (this.tabLabel ===""){
      
      this.tabLabel= new LabelComponent(labelTitle,tabId);
      this.HTMLElement.prepend(this.tabLabel.HTMLElement);
    } else{
      // this.HTMLElement.querySelector("#"+tabId).textContent=labelTitle;
      this.tabLabel.changeLblTxt(labelTitle);
    }
    
  }

  addControls(control, cssClasses ){
    if (!this.divExtraControls) {
        this.divExtraControls = document.createElement("div");
        this.HTMLElement.appendChild(this.divExtraControls);
    }
    this.divExtraControls.appendChild(control.HTMLElement);
    cssClasses.forEach( cssClass => this.divExtraControls.classList.add(cssClass));
  }

  addTab(headerTxt, closeFunc, css_Style ){

    let tabsetId =  this.tabsetId_stem + this.tabSets.index;
    let tabPanelId = this.tabPnlId_stem + this.tabSets.index;

    let newTab = new TabsetClass(headerTxt,tabsetId);
      newTab.changeCssClass(css_Style);
      this.headerCssClass.push(css_Style);
      newTab.index = this.tabSets.index;

      newTab.addClose((e)=> {
      e.stopPropagation();
      let removed = (e.target).parentNode;
      if (removed) {
         this.removeTab(removed.id);
      }
    }, closeFunc);


    this.tabSets.push(newTab);
    
    let newPnl = new TabPanelClass(tabPanelId);
    newPnl.index = this.tabSets.index;
    this.tabPanels.push(newPnl);

    
    newTab.HTMLElement.addEventListener("click", (e)=> {
      this.clickTabset(e);
    });

    this.divTabset.appendChild(newTab.HTMLElement);
    this.divTapanels.appendChild(newPnl.HTMLElement);

    
    
  }

  removeTab(_tabSetId){


          let _index = this.tabSets.findIndex( tab_set => tab_set.tabLabel.id == _tabSetId);

          
          for (let tabetIndex = _index + 1; tabetIndex <= this.tabSets.length -1 ; tabetIndex++) {

              this.tabSets[tabetIndex].HTMLElement.id  = this.tabsetId_stem +  (this.tabSets[tabetIndex].index - 1);
              this.tabSets[tabetIndex].HTMLElement.childNodes[0].textContent = "الإجابة " + (this.tabSets[tabetIndex].index);
              if (this.tabPanels[tabetIndex].HTMLElement.querySelector("label")){
                this.tabPanels[tabetIndex].HTMLElement.querySelector("label")
                .textContent = `إدخال الإجابة ${this.tabSets[tabetIndex].index}`;
              }
              this.tabPanels[tabetIndex].HTMLElement.id = this.tabPnlId_stem +  (this.tabSets[tabetIndex].index - 1);
              this.tabSets[tabetIndex].index -= 1; 
              this.tabPanels[tabetIndex].index = this.tabSets[tabetIndex].index;

          }

          let tempIndex = this.tabSets.index;

          this.divTabset.removeChild(this.tabSets[_index].HTMLElement);
          this.divTapanels.removeChild(this.tabPanels[_index].HTMLElement);

          this.tabSets[_index] = null;
          this.tabSets = this.tabSets.filter( tabset => tabset != null)
          
          this.tabPanels[_index] = null;
          this.tabPanels = this.tabPanels.filter( tabpnl => tabpnl != null)
          
          this.tabSets.index = tempIndex - 1;

         

  }
  clearTabs(){
    while (this.divTabset.childNodes.length > 1) {
        this.divTabset.removeChild(this.divTabset.lastChild);
    } 
    while ( this.divTapanels.childNodes.length > 1) {
        this.divTapanels.removeChild(this.divTapanels.lastChild);
    }
    let tab0 = this.tabSets.shift();
    this.tabSets = [];
    this.tabSets.push(tab0);

    let pnl0 = this.tabPanels.shift();
    this.tabPanels = [];
    this.tabPanels.push(pnl0);

    this.tabSets.index = 1;
    this.tabPanels.index = 1;
    this.tabSets[0].HTMLElement.dispatchEvent(new Event('click'));
  }

}


class PreviewContainer {
 
  constructor(){
    
  
  
  
    
    // let divDataPreview = document.createElement("div");
    // divDataPreview.classList.add("component-container--horizontal");
    // divDataPreview.id = "data_preview_section";
  
  
  
    this.divContainer =document.createElement("div");
    // this.divFooter = document.createElement("div");
  
  
    this.divContainer.classList.add("preview-container");
    this.divContainer.id="id-preview-list";
    // this.divFooter.classList.add("preview-list-footer");
    // divDataPreview.appendChild(this.divContainer);
    // divDataPreview.appendChild(this.divFooter);
  
    this.HTMLElement= this.divContainer;
  
  }
  
  clearPreviewContainer(){
   
    let PreviewContainer = document.getElementById("id-preview-list")
    let PreviewListItems = PreviewContainer.children;
    let arrPreviewListItems = [...PreviewListItems];
  
    arrPreviewListItems.forEach((item) => {
        item.remove();
    });
  }
  
   resetAllpreviewWrapperBorder() {
    let previewWrapper = document.querySelectorAll(".preview-item-wrapper")
    previewWrapper.forEach(item => {
      item.style.boxShadow = "none";
    })
  }
  
  addPreviewItem(previewItemId,embededObj,id_c,fnAtEventClick,fnAtEventClose) {
  
    let previewWrapper = document.createElement("div");
    let buttonSmallClose = new CloseBoxComponent(id_c);
  
    previewWrapper.id=previewItemId;
    previewWrapper.classList.add("preview-item-wrapper");
   
  
    previewWrapper.appendChild(embededObj);
    previewWrapper.appendChild(buttonSmallClose.HTMLElement);
  
    previewWrapper.addEventListener("click", (e) => {
      
      this.resetAllpreviewWrapperBorder()
      previewWrapper.style.boxShadow = "0 0 0 3px #868c9c";
      fnAtEventClick(e);
    })
  
    buttonSmallClose.HTMLElement.addEventListener("click", (e) => {
      let removeItem = e.target.parentElement;
      
      fnAtEventClose(e);
      removeItem.remove();
    }, 0);
    this.divContainer.appendChild(previewWrapper);
  }
  }
  


  class SidePreview {
    constructor(sidePreviewId,sidePreviewTitle){
  
      let divWrapper = document.createElement("div");
      let divTitle = document.createElement("div");
      this.divlist = document.createElement("div");
      
      let txtTitle = document.createTextNode(sidePreviewTitle);
      
      divWrapper.classList.add("side-preview");
      divTitle.classList.add("sidepreviewLst-label");
      this.divlist.classList.add("side-preview-list")
      this.divlist.classList.add("padding__meduim")
  
      this.divlist.id=sidePreviewId;
      divTitle.appendChild(txtTitle);
  
      divWrapper.appendChild(divTitle);
      divWrapper.appendChild(this.divlist);
  
      this.HTMLElement=divWrapper;
    }
  
    addItem(itemHTML){
      this.divlist.appendChild(itemHTML)
    }
    clearItems(){
      if (this.divlist.firstChild) {
        while (this.divlist.firstChild) {
          
          this.divlist.removeChild(this.divlist.firstChild);
        }
      }
    }
  
  }
  

//Table Component

class TableComponent {
  constructor(table_id,arrTableCss,arrThCss,arrTdCss){
    let tableRef = document.createElement('table');
    this.columnMaps = [];
    this.ThCss = arrThCss;
    this.TdCss=arrTdCss;
      
    tableRef.id = table_id;
   
    arrTableCss.forEach((cssClass)=>tableRef.classList.add(cssClass));


    this.HTMLElement = tableRef;
    
  }

  // data => object contains {headerName: {w:width%, type: text or icon or color }}
  // visibilty => determines whether to show the headername or not
  generateTableHead(data, visibilty) {
      let thead = this.HTMLElement.createTHead();
      
      let row = thead.insertRow();
      let count = 0;
      for (let key of Object.keys(data)) {

        let th = document.createElement("th");
        this.ThCss.forEach((cssClass)=>th.classList.add(cssClass));

        th.style.width = data[key].w;
        this.columnMaps.push ( {columnIndex : count++, Type: data[key].type });
        th.id = `th-${count}`;
        if (visibilty) {
          let text = document.createTextNode(key);
          th.appendChild(text);
        }
        
        row.appendChild(th);
      }
  }

  generateTable( data_As_Obj, requiredFields) {
      //reduce data_as_obj to only required fields
      let subset = [];
      data_As_Obj.forEach(element => {
          subset.push (requiredFields.reduce((item, key) => (item[key] = element[key], item), {}));
          
      });
      
      for (let element of subset) {
        let row = this.HTMLElement.insertRow();
        let index = 0;
        for (let key in element) {
          let cell = row.insertCell();

          this.TdCss.forEach((cssClass)=>cell.classList.add(cssClass));

          let col = this.columnMaps.filter(x => x.columnIndex == index);
          let colType = col[0].Type;
          index++;

          switch (colType) {
              case 'text':
                  cell.appendChild(document.createTextNode(element[key]));
                  break;
              case 'color':
                  cell.style.backgroundColor =  this.getColorHexa(element[key]);
              case 'icons':
                  cell.innerHTML = element[key];
              default:
                  break;
          }
         
        }
      }
    }


    // should be object with following properties
    // type: integer, color: #colorHexa
    setUpColorsValues( _colorObjMap ) {
      this.colorsMap = _colorObjMap;
    }

    getColorHexa(type) {
        return this.colorsMap[type];
    }

    

}


//Table Ex:
    // newTable = new TableComponent('table_id');

    // let colorObjMap = ['#3dbbec','#F64740', '#41337A', '#59CD90' ];
    
    //  let headers = {elementyType:{w:'10%', type:'color'}, 
    //                elementText:{w:'50%', type:'text'}, 
    //                skillsBadges:{w:'50%', type:'icons'} };

    // let data = [{ id:'1', elementColor:'color', elementText: 'elem text', skillsBadges:'icon' },
    //             { id:'2', elementColor:'color', elementText: 'elem text', skillsBadges:'icon' },
    //             { id: '3', elementColor:'color', elementText: 'elem text', skillsBadges:'icon' }];

    // newTable.setUpColorsValues(colorObjMap);
    // requiredFields = ['elementColor', 'elementText','skillsBadges'];
    // newTable.generateTableHead(headers, false);

    // newTable.generateTable(data, requiredFields);
    // container.appendChild(newTable.HTMLElement);