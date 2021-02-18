
//**************** component's classes */

//Level 0 components

class TextareaComponent {
  constructor(textareaId,rowNumber, cssArr = ["textarea-description", "textarea-resize-vertically"]){
    let textareaElement =document.createElement("textarea");
    
    cssArr.forEach( cssClass => {
      textareaElement.classList.add(cssClass);
    });
    
    
    textareaElement.id=textareaId;
    textareaElement.rows=rowNumber;
    this.HTMLElement= textareaElement;
  }

  onEvent(eventName,fn){
    this.HTMLElement.addEventListener(eventName,fn);
  }
}

class LabelComponent {
  constructor(labelTitle,forId){
    this.labeltitle=document.createElement("label");
    this.labeltitle.classList.add("label-component");
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
let inputRadio = document.createElement("input");
divWrapper.classList.add("radio-checkbox")
inputRadio.id=radioId;
inputRadio.type = "radio";
inputRadio.classList.add("radioBtn");
inputRadio.style.opacity=1;
inputRadio.name=radioName;
inputRadio.value=radioValue;
this.checked=inputRadio.checked;

let labelRadio = document.createElement("label");
labelRadio.htmlFor=radioId;
labelRadio.textContent=labelTxt;

divWrapper.appendChild(inputRadio);
divWrapper.appendChild(labelRadio);
this.HTMLElement=divWrapper;
}
onClick(fn){
      
  this.HTMLElement.firstChild.addEventListener('click', function (e) {
    e.stopPropagation()
    fn(e);
        
    
  });
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


  addButtonWithCloseBoxToList(TextValue,listButtonId,id_c,fnOnClick,fnOnClose){
       
    let divWrapper=document.createElement("div");
    divWrapper.classList.add("buttons-wrapper");

    const listBtn = new BtnInListComponent(TextValue,listButtonId); 
    const closeBox = new CloseBoxComponent(id_c);
    
    listBtn.HTMLElement.addEventListener("click",(e)=>{
      fnOnClick(e);
    })

    closeBox.HTMLElement.addEventListener("click",(e)=>{
      fnOnClose(e);
    })


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




class mediaObjEntry {

  constructor(tabsetId, tabpnlId) {

  let arrObjectiveType = [addOns[0].Text, addOns[3].Text, addOns[4].Text, addOns[6].Text];

  this.mediaObjTab = new TabComponent(arrObjectiveType, tabsetId, tabpnlId);

  
  // add Label and Tab Panel to the Tab
  this.mediaObjTab.addLabel("ادخال مكونات الجملة");
  this.mediaObjTab.changeTabLblCss(["buttons-panelHeader"]);

  this.mediaObjTab.addIconsTabLbl( [addOns[0].Icon,addOns[3].Icon, addOns[4].Icon, addOns[6].Icon]);

  let tabPanel1 = new TextareaComponent('txtEntry-Text',5);
  this.mediaObjTab.fillTabPanel(1,tabPanel1.HTMLElement);
  let tabPanel2 = new TextareaComponent('txtEntry-Picture',5);
  this.mediaObjTab.fillTabPanel(2,tabPanel2.HTMLElement);
  let tabPanel3 = new TextareaComponent('txtEntry-Drawings',5);
  this.mediaObjTab.fillTabPanel(3,tabPanel3.HTMLElement);
  let tabPanel4 = new TextareaComponent('txtEntry-Sound',5);
  this.mediaObjTab.fillTabPanel(4,tabPanel4.HTMLElement);
  
  
  this.mediaObjTab.changeTabPanelCss("tab-panel-component-media");
  this.mediaObjTab.clickTabset(1);

  this.HTMLElement = this.mediaObjTab.HTMLElement;

  }

  changeLbl(lbl_header) {
    this.mediaObjTab.addLabel(lbl_header);
    
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


    divWrapper.classList.add("component-container--vertical");
    divWrapper.appendChild(listWithLabelElement.HTMLElement);
    divWrapper.appendChild(inputTextAddBtn.HTMLElement);

    this.HTMLElement=divWrapper;
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

}


// class AddBtnWordComponent {
//   constructor(btnId,btnClassCSS,txt){
//     //<button id="add_lesson" class="add-btn">إضافـة</button>
//     //<button class="add-btn" id="add_subject_to_scene"> &#x271A;</button>
//     //<button class="remove-btn" id="remove_subject_from_scene"> <strong>&minus;</strong></button> 
//     const addBtn = document.createElement("button");
//     addBtn.type="button";
//     addBtn.id=btnId;
//     addBtn.classList.add(btnClassCSS);
//     //addBtn.classList.add("font-large")
//     const btnText = document.createTextNode(txt);
//     addBtn.appendChild(btnText);
//     this.HTMLElement=addBtn;

//   }

//   onClick(fn){
      
//     this.HTMLElement.addEventListener('click', function (e) {
//         fn(e);
        
        
//     });


// }
// }

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


// class TabsetClass {
//   constructor(tabText,tabsetId){
      
//     let tabLabel = document.createElement("label");
//     tabLabel.className="tab-label-component";
//     tabLabel.id=tabsetId;
       
//     tabLabel.textContent=tabText;
//     this.HTMLElement= tabLabel;
 
//   }
// }

// class TabPanelClass {
//   constructor(tabPanelId){

//     let tabSection = document.createElement("section");
//     tabSection.id=tabPanelId;
//     tabSection.className= "tab-panel-component"
//     this.HTMLElement=tabSection;
//   }
// }

// class TabComponent{
      
//   constructor(arrTabNames){
//     let divWrapper = document.createElement("div")
//     let divTabset = document.createElement("div");
//     let divTapanels = document.createElement("div");
    
//     this.tabLabel="";
//     this.tabSets=[];
//     this.tabPanels=[];

//     divWrapper.classList.add("component-container--vertical");  
//     divTabset.classList.add("tabset-component");
//     divTapanels.classList.add("tab-panels-component");

//     arrTabNames.forEach((value,index)=>{
//       let tabsetId = "Id-tabset-"+(index+1);
//       let tabPanelId = "Id-panel-"+(index+1);
//       this.tabSets.push(new TabsetClass(value,tabsetId));
//       this.tabPanels.push(new TabPanelClass(tabPanelId))

//       divTabset.appendChild(this.tabSets[index].HTMLElement);
//       divTapanels.appendChild(this.tabPanels[index].HTMLElement)
      
//     });


//     divTabset.appendChild(divTapanels);
//     divWrapper.appendChild(divTabset);

//     this.HTMLElement=divWrapper;

//     this.tabSets.forEach((value,index)=>{
         
      
//       this.HTMLElement.querySelector("#"+value.HTMLElement.id).addEventListener("click",()=>{
//         this.clickTabset(index+1)
          
//         })
    
//       })

               
//   }

//   fillTabPanel(tabsetNumber,tabPanelHTML){
//     if (Number.isInteger(tabsetNumber) && tabsetNumber<=this.tabSets.length){
//       this.HTMLElement.querySelector("#"+"Id-panel-"+tabsetNumber).appendChild(tabPanelHTML);
//       if(tabsetNumber===1){
//           this.clickTabset(1)

//       } 
//     } else{
//         console.log("Please insert a valid Integer tabset Number within the range")
//       }
//   }
    
  
//   clickTabset(tabsetNumber){
//     if (Number.isInteger(tabsetNumber) && tabsetNumber<=this.tabSets.length){
//       let tabsetId = "Id-tabset-"+tabsetNumber;
//       let tabPanelId = "Id-panel-"+tabsetNumber;
      
//       //fix the color of the clicked tabset and reset the others
//       let tabsets = this.HTMLElement.querySelectorAll(".tab-label-component")
//       tabsets.forEach((item)=>{
//       item.classList.remove("tab-label-focus");
//       })
      
//       this.HTMLElement.querySelector("#"+tabsetId).classList.add("tab-label-focus")
      
//       //make the tabPanel visible and hide the others  
//       let tabPanels = this.HTMLElement.querySelectorAll(".tab-panel-component")
//       tabPanels.forEach((item)=>{
//         item.classList.remove("tab-panel-show");
//       })
      
//       this.HTMLElement.querySelector("#"+tabPanelId).classList.add("tab-panel-show")
    
//     } else{
//       console.log("Please insert a valid Integer tabset Number within the range")
//     }
//   }

//   addLabel(labelTitle){
//     let tabId="Id-TabLabel";
//     if (this.tabLabel ===""){
      
//       this.tabLabel= new LabelComponent(labelTitle,tabId);
//       this.HTMLElement.prepend(this.tabLabel.HTMLElement);
//     } else{
//       this.HTMLElement.querySelector("#"+tabId).textContent=labelTitle;
//     }
    
//   }

//   addTab(){

//   }

//   removeTab(){

//   }

// }


class TabsetClass {
  constructor(tabText,tabsetId){
    this.tabLabel = document.createElement("button");
    this.tabLabel.className = "tab-label-component";
    
    this.tabLabel.id=tabsetId;
       
    this.tabLabel.textContent=tabText;
    this.HTMLElement= this.tabLabel;
 
  }

  changeCssClass(newCssClass){
      this.tabLabel.className = newCssClass;  
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
        
  constructor( arrTabNames, tabsetId_stem = "Id-tabset-", tabPnlId_stem = "Id-panel-"){
    let divWrapper = document.createElement("div")
    this.divTabset = document.createElement("div");
    this.divTapanels = document.createElement("div");
    this.divExtraControls = document.createElement("div");


    this.tabLabel="";
    this.tabSets=[];
    this.tabPanels=[];
    this.headerCssClass = ["tab-label-component"];
    this.panelCssClass = "tab-panel-component";

    this.tabsetId_stem = tabsetId_stem;
    this.tabPnlId_stem = tabPnlId_stem;

    divWrapper.classList.add("component-container--vertical");  
    this.divTabset.classList.add("tabset-component");
    this.divTapanels.classList.add("tab-panels-component");

    arrTabNames.forEach((value,index)=>{
      let tabsetId =  tabsetId_stem + (index+1);
      let tabPanelId = tabPnlId_stem + (index+1);
      this.tabSets.push(new TabsetClass(value,tabsetId));
      this.tabPanels.push(new TabPanelClass(tabPanelId));

      this.divTabset.appendChild(this.tabSets[index].HTMLElement);
      this.divTapanels.appendChild(this.tabPanels[index].HTMLElement)
      
    });


    this.divTabset.appendChild(this.divTapanels);
    this.divTabset.appendChild(this.divExtraControls);
    divWrapper.appendChild(this.divTabset);
    

    this.HTMLElement=divWrapper;

    this.tabSets.forEach((value,index)=>{
         
      console.log('value.HTMLElement.id ' + value.HTMLElement.id);
      this.HTMLElement.querySelector("#"+value.HTMLElement.id).addEventListener("click",()=>{
        this.clickTabset(index+1)
          
        })
    
      })

               
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
      this.tabPanels.forEach( item => item.changeCssClass(newCss));
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

  fillTabPanel(tabsetNumber,tabPanelHTML){
  console.log('tanpnl id ' + `#${this.tabPnlId_stem}${tabsetNumber}` );
    if (Number.isInteger(tabsetNumber) && tabsetNumber<=this.tabSets.length){
      this.HTMLElement.querySelector(`#${this.tabPnlId_stem}${tabsetNumber}`).appendChild(tabPanelHTML);
      if(tabsetNumber===1){
          this.clickTabset(1)
       
      } 
    } else{
        console.log("Please insert a valid Integer tabset Number within the range")
      }
  }
    
  
  clickTabset(tabsetNumber){

    if (Number.isInteger(tabsetNumber) && tabsetNumber<=this.tabSets.length){
      let tabsetId = this.tabsetId_stem + tabsetNumber;
      let tabPanelId = this.tabPnlId_stem +tabsetNumber;

      //fix the color of the clicked tabset and reset the others
      let cssClass = this.headerCssClass[tabsetNumber] || this.headerCssClass[0];

      let tabsets = this.HTMLElement.querySelectorAll(`.${cssClass}`);
      tabsets.forEach((item)=>{
      item.classList.remove(cssClass + "--selected");
      })
      
      this.HTMLElement.querySelector("#"+tabsetId).classList.add(cssClass + "--selected")
      
      //make the tabPanel visible and hide the others  
      let tabPanels = this.HTMLElement.querySelectorAll(`.${this.panelCssClass}`);
      tabPanels.forEach((item)=>{
        item.classList.remove("tab-panel-show");
      })
      
      this.HTMLElement.querySelector("#"+tabPanelId).classList.add("tab-panel-show")
    
    } else{
      console.log("Please insert a valid Integer tabset Number within the range")
    }

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
    this.divExtraControls.appendChild(control.HTMLElement);
    cssClasses.forEach( cssClass => this.divExtraControls.classList.add(cssClass));
  }

  addTab(_number, headerTxt ){

    let tabsetId =  this.tabsetId_stem + _number;
    let tabPanelId = this.tabPnlId_stem + _number;

    this.tabSets.forEach((tab)=> { console.log(tab)});

    this.tabSets.splice(_number-1, 0 , new TabsetClass(headerTxt,tabsetId));
    
    this.tabPanels.splice(_number-1, 0 , new TabPanelClass(tabPanelId));

    
    this.divTabset.insertBefore(this.tabSets[_number - 1].HTMLElement, this.divTabset.children[this.divTabset.childElementCount - 2]);
    this.divTapanels.appendChild(this.tabPanels[_number - 1].HTMLElement);

    
    this.tabSets[_number - 1].HTMLElement.addEventListener("click", ()=> {
      this.clickTabset(_number);
    });
    
  }

  removeTab(){

  }

}


class PreviewContainer {
 
constructor(){
  let divWrapper = document.createElement("div");
  this.divContainer =document.createElement("div");
  this.divFooter = document.createElement("div");

  divWrapper.classList.add("component-container--vertical");
  this.divContainer.classList.add("preview-container")
  this.divContainer.id="id-preview-list";
  this.divFooter.classList.add("preview-list-footer");
  divWrapper.appendChild(this.divContainer);
  divWrapper.appendChild(this.divFooter);

  this.HTMLElement=divWrapper;

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
    item.style.border = "1px solid #868c9c";
  })
}

addPreviewItem(previewItemId,statementSorting,id_c,fnAtEventClick,fnAtEventClose) {

  let previewWrapper = document.createElement("div");
  let buttonSmallClose = new CloseBoxComponent(id_c);

  previewWrapper.id=previewItemId;
  previewWrapper.classList.add("preview-item-wrapper");
 

  previewWrapper.appendChild(statementSorting);
  previewWrapper.appendChild(buttonSmallClose.HTMLElement);

  previewWrapper.addEventListener("click", (e) => {
    this.resetAllpreviewWrapperBorder()
    previewWrapper.style.border = "5px solid #868c9c";
    fnAtEventClick();
  })

  buttonSmallClose.HTMLElement.addEventListener("click", (e) => {
    let removeItem = e.target.parentElement;
    fnAtEventClose();
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
    
    divWrapper.classList.add("side-preview-list");
    divTitle.classList.add("side-preview-main-title");
    this.divlist.classList.add("component-container--vertical")
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

}