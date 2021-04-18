// Max number of characters can be inserted within a textarea component.
const maxLengthOfTextarea = 1000;
const maxLengthInputBox = 150;
//**************** component's classes */

//Level 0 components


// Textarea: @version: 1.0.0 (@lastupdated: 22.03.2021)
// @parameters: 
// textareaId : the (html) textarea id
// rowNumber: how many rows would textarea has
// CssArr : array of css classes would be applied on the textarea; It has default value
// @returns: textarea node (html) to be added.


class TextareaComponent {

  constructor(textareaId,rowNumber){
    
    let textareaElement = document.createElement("textarea");
    textareaElement.id = textareaId;
    textareaElement.rows = rowNumber;

    textareaElement.maxLength = maxLengthOfTextarea;
    
    textareaElement.className = "textarea-description textarea-resize-vertically"
      
    this.HTMLElement = textareaElement;


  }

  // register an event
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

  //Sets whether the contents of a text area is read-only
  readOnly(value){
    this.HTMLElement.readOnly = value;
  }
  
  // Sets the placeholder property
  setPlaceHolder(txt){
    this.HTMLElement.placeholder = txt;
  }

  selectAll(){
    this.HTMLElement.select();
  }

  // insert a specific string into the current cursor position
  insertAt(str){
               
    let startPos = this.HTMLElement.selectionStart;
    let endPos = this.HTMLElement.selectionEnd;

    this.HTMLElement.value = this.HTMLElement.value.substring(0, startPos) + str + this.HTMLElement.value.substring(endPos, this.HTMLElement.value.length);

  }

  // replace a value _val (all) within the component text with a new value _newVal
  replaceAll( _val, _newVal){
    
    this.HTMLElement.value =  this.HTMLElement.value.split(_val).join(_newVal);

  }
  // get an object made of the id of the node and the text content
  getObj (){
    return {id:this.HTMLElement.id, txt:this.HTMLElement.value};
  }
}


// InputBox
// @parameters: 
// textareaId : the (html) textarea id
// rowNumber: how many rows would textarea has
// CssArr : array of css classes would be applied on the textarea; It has default value
// @returns: textarea node (html) to be added.
class InputBoxComponent {
  constructor(inputBoxId){

    let inputBoxElement =document.createElement("input");
    inputBoxElement.type = "text";
    inputBoxElement.id = inputBoxId;
    inputBoxElement.className = "inputfield-1line";
    inputBoxElement.maxLength = maxLengthInputBox;
    
     
    this.HTMLElement = inputBoxElement;
  }

  // register an event
  onEvent(eventName,fn){
    this.HTMLElement.addEventListener(eventName,fn);
  }

  getTextValue(){
    return this.HTMLElement.value;
  }
  setTextValue(_value){
    this.HTMLElement.value = _value;
  }
  clearValue(){
    this.HTMLElement.value="";
  }
  
  //Sets whether the contents of a text area is read-only
  readOnly(value){
    this.HTMLElement.readOnly = value;
  }
  
  // Sets the placeholder property
  setPlaceHolder(txt){
    this.HTMLElement.placeholder = txt;
  }

  selectAll(){
    this.HTMLElement.select();
  }

  // get an object made of the id of the node and the text content
  getObj (){
    return {id:this.HTMLElement.id, txt:this.HTMLElement.value};
  }

   // insert a specific string into the current cursor position
   insertAt(str){
               
    let startPos = this.HTMLElement.selectionStart;
    let endPos = this.HTMLElement.selectionEnd;

    this.HTMLElement.value = this.HTMLElement.value.substring(0, startPos) + str + this.HTMLElement.value.substring(endPos, this.HTMLElement.value.length);

  }
  
}

class LabelComponent {

  constructor(labelTitle, forId){

    let _label = document.createElement("label");
    _label.className = "label-component";
      
    _label.htmlFor = forId;
    _label.textContent = labelTitle;

    this.HTMLElement = _label;
  }

  // Change the label text after it has been created.
  changeLblTxt(newTxt) {
    this.HTMLElement.textContent = newTxt;
  }

 
} 

class CloseBoxComponent {
  
  constructor(id_c){

    let close_button = new ButtonComponent(`c-${id_c}`, "");
    addCssClass(close_button.HTMLElement, 'small-close', true);
    
    this.HTMLElement = close_button.HTMLElement;
  }

  onClick(fn){
      
      this.HTMLElement.addEventListener('click', function (e) {
          fn(e);
          
          
      });
  }

}  


class RadioComponent {

  constructor(radioId,radioName,checked){
  
  let inputRadio = document.createElement("input");
  
  inputRadio.id = radioId;
  
  inputRadio.type = "radio";
  inputRadio.classList.add("radioBtn");
  inputRadio.style.opacity = 1;
  inputRadio.name = radioName;
  
  
  inputRadio.checked = checked;
  

  this.HTMLElement = inputRadio;
  
  }
 
  onChange(fn) {
    this.HTMLElement.addEventListener('change', function (e) {
      fn(e);
    });
  }
  
  getCheckedState(){
    return this.HTMLElement.checked;
  }
  
  setValue(_value){
    this.HTMLElement.value = _value;
  }
  setCheckedVal(value= true) {
    this.HTMLElement.checked = value;
  }

}


  class CheckBoxComponent{
    constructor(checkboxId, checked, isSwitchType = false){
      
      
      let inputCheckBox = document.createElement("input");

      inputCheckBox.id = checkboxId;
      inputCheckBox.type = "checkbox";
      inputCheckBox.value = checked;
      inputCheckBox.name  = "chkbox";
       
      if(isSwitchType){
        inputCheckBox.classList.add("switch");
      }
      
      
      this.HTMLElement = inputCheckBox;
    
    }
    
    
    onClick(fn){
          
      this.HTMLElement.addEventListener('click', function (e) {
        e.stopPropagation()
          fn(e);
          console.log(e.target.id);
                 
      });
    }
    
    
    getCheckedState(){
        return this.HTMLElement.checked;
    }
    
    setValue(_value){
        this.HTMLElement.value = _value;
    }
    
    setCheckedVal(value= true) {
        this.HTMLElement.checked = value;
      }

}

class ButtonComponent {

  constructor(btnId, txt){

    let btn = document.createElement("button");
    btn.type="button";
    btn.id=btnId;
    btn.className = "add-btn";
    
    let btnText = document.createTextNode(txt);
    btn.appendChild(btnText);

    this.HTMLElement = btn;

  }

  onClick(fn){
      
    this.HTMLElement.addEventListener('click', function (e) {
        fn(e);       
    });
  }

  changeTxtvalue(_txt){
      this.HTMLElement.textContent = _txt;
  }

}

class ListComponent {
 
  constructor(listId){

    let divList = document.createElement("div");
    
    divList.classList.add("list-group");

    divList.id=listId;
    
    this.selectedId = -1;
    this.selectedTxt = '';

    this.HTMLElement= divList;
  }

 
  // remove all items from the list
  clearList(){
    if (this.HTMLElement.firstChild) {
      while (this.HTMLElement.firstChild) {
        this.HTMLElement.removeChild(this.HTMLElement.firstChild);
      }
    }
    this.selectedId = -1;
    this.selectedTxt = '';
  }

  //add a new button into the list as an item with close button [optional]
  addButtonToList(TextValue,listButtonId,fnOnClick, closeBtn = true){
        
    if (TextValue != "") {
      

      let divWrapper=document.createElement("div");
      divWrapper.classList.add("buttons-wrapper");
      
      let btn = new ButtonComponent(listButtonId, TextValue);
      addCssClass(btn.HTMLElement,'buttons-in-list', true);
      
      divWrapper.appendChild(btn.HTMLElement);

      if (closeBtn) {

        
          let close_button = new CloseBoxComponent(`c-${listButtonId}`);
          

          close_button.onClick((e) => { 
             
              e.preventDefault(); 
              e.stopImmediatePropagation();
              let _closeEvent = new CustomEvent('removed', {detail: btn.HTMLElement});
              this.HTMLElement.dispatchEvent(_closeEvent);
          });

          divWrapper.appendChild(close_button.HTMLElement);

      }
      


      btn.HTMLElement.addEventListener("click",(e)=>{

          if (e.target.id != this.selectedId) {
              cleanStyleinLst(this.HTMLElement,"buttons-in-list--selected");
              btn.HTMLElement.classList.add ("buttons-in-list--selected");
              this.selectedId = btn.HTMLElement.id;
              this.selectedTxt = btn.HTMLElement.textContent;

              let changedSelectedEvent = new CustomEvent('changed', {detail: this.selectedId});
              this.HTMLElement.dispatchEvent(changedSelectedEvent);

              if (fnOnClick){
                  fnOnClick(btn.id);
              }

          }

          if (e.detail == 2) {
              let event = new CustomEvent('db_click', {detail: e.target.id});
              this.HTMLElement.dispatchEvent(event);

          }

          
      });

      

        
      this.HTMLElement.appendChild(divWrapper)
      

      btn.HTMLElement.click();
      btn.HTMLElement.focus({preventScroll:false});
      
          
    }else {
       showError("Can't add a button with an empty string.");
    }
  }

  getSelectedId(){
      return this.selectedId;
  }
  
  getSelectedTxt(){
      return this.selectedTxt;
  }

  // select an item (button) programmatically
  setSelectedId(_id){

      let btn = this.HTMLElement.querySelector(`#${_id}`);
      btn.click();
      btn.focus({preventScroll:false});
  }
  // set the text content of a specific item (button) programmatically
  setText(_id,txt) {
      let btn = this.HTMLElement.querySelector(`#${_id}`);
      btn.textContent = txt;
      this.selectedTxt = txt;
  }



}
class ComboComponent {
  constructor(comboId) {
    let comboSelect = document.createElement("select");
    comboSelect.classList.add("list-combo");
    comboSelect.id = comboId;
    this.HTMLElement = comboSelect;
  }

  clearCombo() {
    removeAllChildNodes(this.HTMLElement);
  }

  addOptionToCombo(txtOption, OptionValue, addToEnd) {
    let newOption = document.createElement("option");
    let optionText = document.createTextNode(txtOption);

    // and option value
    newOption.setAttribute("value", OptionValue);
    // set option text
    newOption.appendChild(optionText);

    // add the option to the select box
    addToEnd
      ? this.HTMLElement.appendChild(newOption)
      : this.HTMLElement.prepend(newOption);
  }

  removeOption(OptionValue) {
    if (this.checkIfAdded(OptionValue)) {
      Array.from(this.HTMLElement.options).forEach((element) => {
        if (element.value == OptionValue) {
          element.remove();
        }
      });
    } else {
      throw new Error("Value does not exist!");
    }
  }

  checkIfAdded(OptionValue) {
    let available = false;

    Array.from(this.HTMLElement.options).forEach((element) => {
      if (element.value == OptionValue) {
        available = true;
      }
    });

    return available;
  }

  onChange(fn) {
    this.HTMLElement.addEventListener("change", (e) => {
      fn(e);
    });
  }

  setSelectedItem(OptionValue) {
    console.log('option value >>>>>>>>');
    console.log(OptionValue);
    if (this.checkIfAdded(OptionValue)) {
      Array.from(this.HTMLElement.options).forEach((element, index) => {
        if (element.value == _id) {
          this.HTMLElement.selectedIndex = index;
        }
      });
    } else {
      throw new Error("Value does not exist!");
    }
  }

  getSelectedValue(){
      if (this.HTMLElement.selectedIndex < 0) return;
      return this.HTMLElement.options[this.HTMLElement.selectedIndex].value;
  }
  getSelectedText(){
    if (this.HTMLElement.selectedIndex < 0) return;
    return this.HTMLElement.options[this.HTMLElement.selectedIndex].textContent;
  }
  getSelectedIndex(){
    return this.HTMLElement.selectedIndex;
  }

  // _obj = {txtOption: text to be displayed, OptionValue: the value  }
  addRange(_obj, addToEnd) {

    if (_obj.length > 0) {

      if (_obj[0].txtOption && _obj[0].OptionValue) {

          _obj.forEach( item => {
              this.addOptionToCombo(item.txtOption,item.OptionValue, addToEnd);
          })

      }else {
        throw new Error ("Invalid object!")
      }

    }
    
  }

}


class TabsetClass {

  constructor(tabText, tabsetId){
    this.tabLabel = document.createElement("button");
    this.tabLabel.className = "tab-label-component";
    
    this.tabLabel.id = tabsetId;
       
    this.tabLabel.textContent=tabText;

    this.HTMLElement= this.tabLabel;
 
  }

  changeLbl(newLbl) {
    this.tabLabel.firstChild.textContent = newLbl;
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
  constructor(tabPanelId, component = null){

    this.tabSection = document.createElement("section");
    this.tabSection.id=tabPanelId;
    this.tabSection.className= "tab-panel-component";
    if (component) {
      this.fillPanel(component);
      this.component = component;
    }
    

    this.HTMLElement = this.tabSection;
  }

  fillPanel(component) {
    if (component) {
      this.tabSection.appendChild(component.HTMLElement);
    }
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


//Level 1 components
//??
// class RadioWithHiddenDiv {
// constructor(radioId,radioName,radioValue,labelTxt){
//   let divWrapper = document.createElement("div");
  
//   this.hiddenDiv = document.createElement("div");
//   divWrapper.classList.add("component-container--vertical");
//   this.hiddenDiv.classList.add("hidden-div")
//   this.hiddenDiv.classList.add("component-container--vertical");
//   this.hiddenDiv.classList.add("padding__big");
//   this.hiddenDiv.classList.add("hidden");
  

//   this.radioBtn = new RadioComponent(radioId,radioName,radioValue,labelTxt)
  
//   divWrapper.appendChild(this.radioBtn.HTMLElement);
//   divWrapper.appendChild(this.hiddenDiv);
//   this.HTMLElement=divWrapper;
// }
// onClick(fn){
//   this.radioBtn.onClick((e)=>{
            
//     if(e.target.checked){
//       this.hiddenDiv.classList.toggle("shown");
//       fn(e)
//     }
    
//   });
// }

// addElementToHiddenDiv(htmlElement){
//     this.hiddenDiv.appendChild(htmlElement);
//   }

// }




// class IncreamentComponent {
//  constructor(IncreamentId,IncreamentName){

//   let divWrapper= document.createElement("div");
//   let btnStepDown = document.createElement("button");
//   let btnStepUp = document.createElement("button");
//   let strongStepDown = document.createElement("strong");
//   this.increamentInput = document.createElement("input");

//   btnStepDown.id=IncreamentId+"_down";
//   btnStepUp.id=IncreamentId+"_up";


//   let stepUpTxt = encodeURI("+");
//   strongStepDown.appendChild(document.createTextNode(encodeURI("-")));

//   this.increamentInput.type="number";
//   this.increamentInput.min=0;
//   this.increamentInput.value=1;
//   this.increamentInput.id=IncreamentId;
//   this.increamentInput.name=IncreamentName;

//   divWrapper.classList.add("number-input");
//   btnStepDown.classList.add("remove-btn-increment");
//   btnStepUp.className="plus add-btn-increment";
//   this.increamentInput.classList.add("quantity");


//   btnStepDown.appendChild(strongStepDown);
//   btnStepUp.appendChild(document.createTextNode(stepUpTxt));

//   btnStepDown.addEventListener("click",()=>{
    
//   let inputIncreament =document.getElementById(IncreamentId);
//   let valueNumber=parseInt(inputIncreament.value);

//   if (Number.isInteger(valueNumber)&&valueNumber>0){
//     inputIncreament.value=valueNumber-1;
    
//   }
//   })

//   btnStepUp.addEventListener("click",()=>{
    
//     let inputIncreament =document.getElementById(IncreamentId);
//     let valueNumber=parseInt(inputIncreament.value);
    
//     if (Number.isInteger(valueNumber)){
//       inputIncreament.value=valueNumber+1;
      
//     }
//   })

//   divWrapper.appendChild(btnStepDown);
//   divWrapper.appendChild(this.increamentInput);
//   divWrapper.appendChild(btnStepUp);

//   this.HTMLElement=divWrapper;

//  }

//  onChange(fn){
   
//   this.HTMLElement.querySelector("#"+this.increamentInput.id+"_down").addEventListener("click",fn);
//   this.HTMLElement.querySelector("#"+this.increamentInput.id+"_up").addEventListener("click",fn);
//  }

// }



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



// class ListOfTextareaComponent {
//   constructor(listId){

//     let divList = document.createElement("div");
//     divList.classList.add("list-textarea");
//     divList.id=listId;
//     this.HTMLElement= divList;
//   }
//   clearList(){
//     if (this.HTMLElement.firstChild) {
//       while (this.HTMLElement.firstChild) {
//         this.HTMLElement.removeChild(this.HTMLElement.firstChild);
//       }
//     }
//   }
//   addInputtextareaWithLabel(textareaId,labelTitle,rowNumber,withCloseBox,fnOnBlur,fnOnClose){
    
//     let emptyfunction = ()=>{};
//     fnOnClose= fnOnClose || emptyfunction;

//     let divWrapper = document.createElement("div");
//     divWrapper.classList.add("component-container--vertical");
//     let textareaWithLabel=""

//     if (withCloseBox){
//       textareaWithLabel = new TextareaLabelWithClose(textareaId,labelTitle,rowNumber);
//       textareaWithLabel.textarea.onEvent("blur",(e)=>{
//         fnOnBlur(e);
//       });

//       textareaWithLabel.closeBox.onClick((e)=>{
//         fnOnClose(e);
//       })

//     } else {
//       textareaWithLabel = new TextareaLabelComponent(textareaId,labelTitle,rowNumber);
//       textareaWithLabel.textarea.onEvent("blur",(e)=>{
//         fnOnBlur(e);
//       });
//     }
    

//     textareaWithLabel.HTMLElement.classList.add("list-input-textarea");

//     this.HTMLElement.appendChild(textareaWithLabel.HTMLElement);

//   }


// }


class TextareaWithLabel {

  constructor (textareaId, labelTitle,rowNumber){
    
    let divWrapper = document.createElement("div");
    this.lbltitle = new LabelComponent(labelTitle,textareaId);
    this.txt = new TextareaComponent(textareaId,rowNumber);
    
    divWrapper.classList.add("component-container--vertical");
     
    divWrapper.appendChild(this.lbltitle.HTMLElement);
    divWrapper.appendChild(this.txt.HTMLElement);
  
    this.HTMLElement = divWrapper;
  
  }
      
}


//TODO: remove css method
class InputLabelComponent {

  constructor(inputId, labelTitle){

    let divWrapper = document.createElement("div");
    
    this.labelTitle = new LabelComponent(labelTitle,inputId);
    
    this.inputBox = new InputBoxComponent(inputId);
    
    divWrapper.classList.add("component-container--vertical");
     
    divWrapper.appendChild(this.labelTitle.HTMLElement);
    divWrapper.appendChild(this.inputBox.HTMLElement);

    this.HTMLElement = divWrapper;

  }
   // Add new css class and keep the current ones, append or overwrite the current css classes
   addCssClass(cssClass, overwrite = false){
    if (overwrite) {

      this.HTMLElement.className = '';
      if (Array.isArray(cssClass)) {
          cssClass.forEach( _cssClass => {
            this.HTMLElement.classList.add(_cssClass);
          });
      }else {
        this.HTMLElement.className = cssClass;
      }
      
    }else {
      this.HTMLElement.classList.add(cssClass);
    }
    
  }
 
}

class InputTextWithaddBtn {
  constructor(inputTextId,placeholder,btnId) {

    let divWrapper= document.createElement("div");
    this.inputText = new InputBoxComponent(inputTextId);
    this.addButton = new ButtonComponent(btnId,"إضافة");

    this.inputText.setPlaceHolder(placeholder);
    addCssClass(this.inputText.HTMLElement, ['list-inputfield'], true );

    divWrapper.classList.add("input-group")

    this.addButton.onClick( ()=> {

      if (this.inputText.getTextValue().length > 0) {
          let event = new CustomEvent('added', {detail: this.inputText.getTextValue()});
          this.addButton.HTMLElement.dispatchEvent(event);
          this.inputText.clearValue();
      }
      
    });

    divWrapper.appendChild(this.inputText.HTMLElement);
    divWrapper.appendChild(this.addButton.HTMLElement);

    this.HTMLElement=divWrapper;
  }

  
}


class RadioWithLabelComponent {
  constructor(radioId,radioName,checked,labelTxt){

  let divWrapper=document.createElement("div");
  divWrapper.classList.add("radio-checkbox");


  this.radio = new RadioComponent(radioId, radioName, checked);
    
  this.labelRadio = new LabelComponent(labelTxt,radioId);
  addCssClass(this.labelRadio.HTMLElement,"",true);

  divWrapper.appendChild(this.radio.HTMLElement);
  divWrapper.appendChild(this.labelRadio.HTMLElement);
    
  this.HTMLElement= divWrapper;
    
  }

} 

class CheckBoxWithLabel {
    
  constructor(checkboxId, checked, labelTxt, isSwitchType = false){

  let divWrapper=document.createElement("div");
  divWrapper.classList.add("radio-checkbox");


  this.checkbox = new CheckBoxComponent(checkboxId, checked, isSwitchType);
    
  this.labelChk = new LabelComponent(labelTxt,checkboxId);
  addCssClass(this.labelChk.HTMLElement,"",true);

  divWrapper.appendChild(this.checkbox.HTMLElement);
  divWrapper.appendChild(this.labelChk.HTMLElement);
    
  this.HTMLElement= divWrapper;
    
  }

}


class CheckBoxWithHiddenDiv {

  constructor(checkboxId, chekced, labelTxt, isSwitchType){
  
    let divWrapper = document.createElement("div");
    
    this.hiddenDiv = document.createElement("div");
    divWrapper.classList.add("component-container--vertical");
    this.hiddenDiv.classList.add("hidden-div");
    this.hiddenDiv.classList.add("component-container--vertical");
    this.hiddenDiv.classList.add("padding__big");
    this.hiddenDiv.classList.add("hidden");
    
  
    let checkBoxBtn = new CheckBoxWithLabel(checkboxId, chekced, labelTxt, isSwitchType);
    
    this.checkbox = checkBoxBtn.checkbox;
  
    this.changeLbl = (newLbl) => checkBoxBtn.labelChk.changeLblTxt(newLbl);
  
    divWrapper.appendChild(checkBoxBtn.HTMLElement);
    divWrapper.appendChild(this.hiddenDiv);
  
    this.HTMLElement = divWrapper;
  }
  
  onClick(fn){
  
    this.checkbox.onClick((e)=>{
         
      if(e.target.checked){
  
        this.hiddenDiv.classList.add("shown");
        fn(e);
      } else {
        this.hiddenDiv.classList.remove("shown");
      }
      
    });
  }
  
  addElementToHiddenDiv(htmlElement){
      this.hiddenDiv.appendChild(htmlElement);
    }
  
  
  }

class ContainerWithLabel {

  constructor(_id, containerTitle) {

    let divWrapper = document.createElement("div");

    this.labeltitle = new LabelComponent(containerTitle,"lbl_"+ _id);
    this.Container = document.createElement("div");
    this.Container.id = _id;

            
    divWrapper.classList.add("component-container--vertical");
      
    divWrapper.appendChild(this.labeltitle.HTMLElement);
    divWrapper.appendChild(this.Container);
  
    this.HTMLElement = divWrapper;
  }

  addControl(ctrl) {
    if (ctrl) {
      this.Container.appendChild(ctrl);
    }
  }
}

//??
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


class ComboLabelComponent{

  constructor(comboId,comboTitle){
  
    let divWrapper = document.createElement("div");
    this.labelComboTitle = new LabelComponent(comboTitle,comboId);
    this.combo =new ComboComponent(comboId);
        
    divWrapper.classList.add("component-container--vertical");
      
    divWrapper.appendChild(this.labelComboTitle.HTMLElement);
    divWrapper.appendChild(this.combo.HTMLElement);
  
    this.HTMLElement=divWrapper;


  }

} 



//??
// class ComboTextLabelComponent {
//   constructor(comboId,textareaId,comboLabelTitle,textareaLabelTitle,textareaNumberOfRows ){
//     let divWrapper = document.createElement("div");
//     let comboComponent=new ComboLabelComponent (comboId,comboLabelTitle);
//     let textareaComponent=new TextareaLabelComponent(textareaId,textareaLabelTitle,textareaNumberOfRows);
//     this.combo= comboComponent.combo;
//     this.textarea = textareaComponent.textarea;
//     this.labelTitle = textareaComponent.labelTitle;

//     comboComponent.HTMLElement.style.width="20%";
//     comboComponent.HTMLElement.style.marginLeft="10px";
//     textareaComponent.HTMLElement.style.width="80%";
//     divWrapper.classList.add("component-container--horizontal");
  
//     divWrapper.appendChild(comboComponent.HTMLElement);
//     divWrapper.appendChild(textareaComponent.HTMLElement);
//     this.HTMLElement=divWrapper;
//   }
  
// }

// class ComboShowGifComponent {
//    constructor(comboId,imgId,comboLabelTitle){
//     let divWrapper = document.createElement("div");
//     let comboComponent=new ComboLabelComponent(comboId,comboLabelTitle);
//     let ImageComponent=new ImageBoxComponent(imgId);

//     this.combo= comboComponent.combo;
//     this.image=ImageComponent.HTMLElement;
//     comboComponent.HTMLElement.style.width="60%";
//     comboComponent.HTMLElement.style.marginLeft="10px";
    
//     divWrapper.classList.add("component-container--horizontal");
  
//     divWrapper.appendChild(comboComponent.HTMLElement);
//     divWrapper.appendChild(ImageComponent.HTMLElement);
//     this.HTMLElement=divWrapper;
//   }
// }


// class ImageBoxComponent{
//   constructor(ImageId){
//     let imageElement = document.createElement("img");
//     imageElement.id = ImageId;
//     imageElement.classList.add("box-show-gif")
//     this.HTMLElement=imageElement;
//   }

// } 
// class InputTextWithAddBtnForListComponent {
//   constructor(inputTextId,placeholder,btnId) {

//     let divWrapper= document.createElement("div");
//     this.inputText = new InputTextForListComponent(inputTextId,placeholder);
//     this.addButton = new AddBtnWordComponent(btnId,"إضافة", ["add-btn"]);

//     divWrapper.classList.add("input-group")

//     divWrapper.appendChild(this.inputText.HTMLElement);
//     divWrapper.appendChild(this.addButton.HTMLElement);

//     this.HTMLElement=divWrapper;
//   }

//   getTextValue(){
//     return this.inputText.getTextValue();
//   }
  
// }


class ListWithLabelComponent {
  constructor(listId,labelTitle){

    let divWrapper = document.createElement("div");
    
    this.labelListTitle = new LabelComponent(labelTitle,listId);
    this.listElement = new ListComponent(listId);
    
    divWrapper.classList.add("component-container--vertical");
    
    divWrapper.appendChild(this.labelListTitle.HTMLElement);
    divWrapper.appendChild(this.listElement.HTMLElement);
    
    this.HTMLElement= divWrapper;
    
    }

} 


class ListWithLabelAndInputComponent{

    
  constructor(listId,labelTitle,inputTextId,placeholder,addBtnId){

    let divWrapper = document.createElement("div");

    let listWithLabelElement = new ListWithLabelComponent(listId,labelTitle);
    this.listElement=listWithLabelElement.listElement;
    let inputTextAddBtn = new InputTextWithaddBtn(inputTextId,placeholder,addBtnId);
    
    this.inputText = inputTextAddBtn.inputText;
    this.addbutton = inputTextAddBtn.addButton;

    // All item text and ids would be store in inner arrary
    this.lstCatObj = [];

    this.mode = "normal";
    this.removeConditions = () => {return true};
    this.errorMsg = "";


    // When user double clicks on any item of the list
    // update mode would be activated, the add button caption would be changed (to update) 
    // and the current text value would be appeared in the input box and selected to be ready
    // for user to change it, the user still needs to click on the add button to complete
    // the update text process.
    this.listElement.HTMLElement.addEventListener('db_click', (e)=> {
      this.inputText.setTextValue( this.lstCatObj.find(item => item.id == e.detail).txt);
      this.addbutton.changeTxtvalue("تعديل");
      this.mode = "update";
      this.inputText.HTMLElement.click();

    });


    // Added event raises when user clicks on the add button
    // if the mode is update the item text is replaced by the new one
    // otherwise pass it for the next level.
    this.addbutton.HTMLElement.addEventListener('added', (e) => {
      e.stopPropagation();
      if (this.mode == "update") {
        if (this.lstCatObj.findIndex( item => item.txt == e.detail) == -1 ) {
            this.setText(this.getSelectedId(), e.detail);
            this.lstCatObj.find(item => item.id == this.getSelectedId()).txt = e.detail;

            let event = new CustomEvent('updated', {detail: this.getSelectedId()});
            this.HTMLElement.dispatchEvent(event);
        } else {
          showError('duplicate text!');
        }
        

        this.reset_AddBtn();

      }else {
        let event = new CustomEvent('added', {detail: e.detail});
        this.HTMLElement.dispatchEvent(event);
      }

    });


    this.listElement.HTMLElement.addEventListener('changed', (e)=> {
      this.reset_AddBtn();
      let event = new CustomEvent('changed', {detail: e.detail});
      this.HTMLElement.dispatchEvent(event);
    });


    // If the removeConditions of deleting process meets, the item would be
    // removed from the list and from (lstCatObj)
    // then raise a new removed event for further work if it needed.
    this.listElement.HTMLElement.addEventListener('removed', (e)=> {

      if (this.removeConditions()) {
        
          let _id = e.detail.id;

          if (removeBtnFromLst(this.listElement.HTMLElement, _id )) {
            
              activateAfterDelete(this.lstCatObj, _id, this.getSelectedId());
              this.lstCatObj = this.lstCatObj.filter(item => item.id != _id);

              if (this.lstCatObj.length <= 0) {
                this.clearList();
              }
          }
          this.reset_AddBtn();
          let event = new CustomEvent('removed', {detail: _id});
          this.HTMLElement.dispatchEvent(event);

      }else {
        showError(this.errorMsg);
      }
        


    });

    keysHandler(this,this.inputText,this.addbutton);


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
    this.inputText.clearValue();
  }

  getSelectedId(){
    return this.listElement.getSelectedId();
  }

  getSelectedTxt(){
      return this.listElement.getSelectedTxt();
  }

  // select an item (button) programmatically
  setSelectedId(_id){

     this.listElement.setSelectedId(_id);
  }
  // set the text content of a specific item (button) programmatically
  setText(_id,txt) {
      this.listElement.setText(_id,txt);
  }

  
  // Reset the add button caption and list mode property
  // additionally clearing the input box text.
  reset_AddBtn(){
    this.mode = "normal";
    this.clearTxtBox();
    this.addbutton.changeTxtvalue("إضافة");
  }

  // adding a new item (button) into the list
  // and the new values into inner list (lstCatObj)
  //@error: in case the item is already exist.
  addItemtoLst(passed_txt, _id, _onclick){

    
     if (this.lstCatObj.findIndex( item => item.txt == passed_txt) == -1 ) {
        this.lstCatObj.push({'txt':passed_txt, 'id': _id})
        this.listElement.addButtonToList(passed_txt, _id, _onclick);
    
    
    }else {
      showError('duplicate item!');
    }
    
  }

  //_obj is an array of objects each one has (must) two keys : id, txt
  addItems(_objs, _onclick) {

    if (Array.isArray(_objs)) {

      _objs.forEach(element => {
        
        this.addItemtoLst(element.txt, element.id, _onclick);

      });

    }else {
      throw new Error('_objs is not an array')
    }
  }
  // clear the inner list (lstCatObj)
  // and the list of items
  clearList(){
    this.lstCatObj = [];
    this.mode = "normal";
    this.listElement.clearList();
  }
}






// class InputTextForListComponent {
//   constructor(inputTextId,placeholder){
//     //<input type="text" class="list-inputfield" placeholder="إدخال الدرس" id="txt_lesson"/>
//     let inputText = document.createElement("input");
//     inputText.type ="text";
//     inputText.classList.add("list-inputfield");
//     inputText.id=inputTextId;
//     inputText.placeholder=placeholder;  
//     this.HTMLElement=inputText;
//   }
//   onEvent(eventName,fn){
//     this.HTMLElement.addEventListener(eventName,fn);
//   }


//   getTextValue(){
//     return this.HTMLElement.value;
//   }
//   clearTxtBox(){
//     this.HTMLElement.value = "";
//   }

// }

// class AddBtnWordComponent {
//   constructor(btnId,txt, cssArr){
//     //<button id="add_lesson" class="add-btn">إضافـة</button>
//     //<button class="add-btn" id="add_subject_to_scene"> &#x271A;</button>
//     //<button class="remove-btn" id="remove_subject_from_scene"> <strong>&minus;</strong></button> 
//     const addBtn = document.createElement("button");
//     addBtn.type="button";
//     addBtn.id=btnId;
    
//     cssArr.forEach(cssClass => {
//       addBtn.classList.add(cssClass);
//     });
    
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



class ListOfRadioOrCheckBoxComponent{

  constructor(listId){
    
    let divList = document.createElement("div");
    divList.id=listId;

    this.Radios = [];

    divList.className = "list-radio-checkbox padding__meduim";
    
    
    this.HTMLElement= divList;
  }

  clearList(){

      removeAllChildNodes(this.HTMLElement);
      this.Radios.length = 0;
  }

  addRadio(radioId,radioName,radioValue,labelTxt,fnClick){
    let newRadio = new RadioWithLabelComponent(radioId,radioName,radioValue,labelTxt)
    newRadio.HTMLElement.classList.add("list-item-radio-checkbox");
    
    newRadio.radio.onChange((e)=>{
      fnClick(e);
    })

    this.Radios.push(newRadio);

    this.HTMLElement.appendChild(newRadio.HTMLElement);
  
  }

  addCheckBox(checkboxId,checkboxValue,isSwitchType,labelTxt,fnClick){

    let newCheckBox = new CheckBoxWithLabel(checkboxId, checkboxValue, labelTxt, isSwitchType);
    newCheckBox.HTMLElement.classList.add("list-item-radio-checkbox");
    
    newCheckBox.checkbox.onClick((e)=>{
      fnClick(e);
    })

    this.Radios.push(newCheckBox);

    this.HTMLElement.appendChild(newCheckBox.HTMLElement);
  }

  resetCheckBoxState(){
    this.Radios.forEach((chkbox)=> chkbox.checkbox.setCheckedVal(false));
  }

  resetRadiosState(){
    this.Radios.forEach(Radio => Radio.radio.setCheckedVal(false));
  }

  getRadioValue(id){
     
     let result = this.Radios.find(_radio => {
         if (_radio.radio)
              _radio.radio.HTMLElement.id == id;
          else
              throw new Error('There is no Radio button in the list!');

      });

     if (result) {

      return result.radio.getCheckedState();

     }

     else return false;
     
  }

  getCheckBoxValue(id) {
    
      
      let result = this.Radios.find( chk =>  {
          if (chk.checkbox)
              chk.checkbox.HTMLElement.id == id
          else
              throw new Error ('There is no Checkbox in the list!');
      });

      if (result) {

          return result.checkbox.getCheckedState();

      }else return false;
      

  }


}

class ComboListAddRemoveComponent{

  constructor(combo1Id, combo2Id,combo1Title,btnAddId,btnRemoveId){
      
    let divWrapper = document.createElement("div")
    let combo1DivWrapper = document.createElement("div");
    this.combo2DivWrapper = document.createElement("div");
   

    this.labelTitle = new LabelComponent(combo1Title,combo1Id)
    this.combo1 = new ComboComponent(combo1Id)
    
    this.addButton = new ButtonComponent(btnAddId,"+");
    addCssClass(this.addButton.HTMLElement,['add-btn'],true);

    this.removeButton = new ButtonComponent(btnRemoveId,"-",["remove-btn"]);
    addCssClass(this.removeButton.HTMLElement, ["remove-btn"],true);

    this.combo2 = new ComboComponent(combo2Id)
    this.combo2.HTMLElement.size = 6;

    // All item text and ids would be store in inner arrary
    this.lstCatObj = [];

    this.removeConditions = () => {return true};
    this.errorMsg = "";

    divWrapper.classList.add("component-container--vertical");
    combo1DivWrapper.classList.add("component-container--horizontal");
    

    combo1DivWrapper.appendChild(this.combo1.HTMLElement);
    combo1DivWrapper.appendChild(this.addButton.HTMLElement);
    combo1DivWrapper.appendChild(this.removeButton.HTMLElement);
      
    this.combo2DivWrapper.appendChild(this.combo2.HTMLElement);
    divWrapper.appendChild(this.labelTitle.HTMLElement);
    divWrapper.appendChild(combo1DivWrapper);
    divWrapper.appendChild(this.combo2DivWrapper);


    this.addButton.onClick((e)=>{
    
      if (this.combo1.HTMLElement.length <= 0) return;

      let ComboRead = this.combo1.HTMLElement;
      let txtOption=ComboRead.options[ComboRead.selectedIndex].text;
      let OptionValue=ComboRead.options[ComboRead.selectedIndex].value;
      let addToEnd=true;
      let checkAvailabity=this.combo2.checkIfAdded(OptionValue)
      
      if(!checkAvailabity){
        this.combo2.addOptionToCombo(txtOption, OptionValue, addToEnd);
        this.combo2.HTMLElement.options[this.combo2.HTMLElement.length-1].selected = true;
        this.lstCatObj.push({txtOption: txtOption, OptionValue: OptionValue});
        let _event = new CustomEvent('added', {detail: OptionValue});
        this.addButton.HTMLElement.dispatchEvent(_event);

      } else {
        showError("This Value has been already Added!!!");
      }
    
    });

    this.removeButton.onClick((e)=>{
     
      let ComboRead = this.combo2.HTMLElement;
      let combo2Index = ComboRead.selectedIndex;
      
      
      if (combo2Index !=-1){
        
        if (this.removeConditions()) {

            let OptionValue=ComboRead.options[ComboRead.selectedIndex].value;

            let _event = new CustomEvent('removed', {detail: OptionValue});

            this.combo2.removeOption(OptionValue);
            this.lstCatObj = this.lstCatObj.filter(item => item.OptionValue != OptionValue);

            let comboLength = ComboRead.options.length;
            if (comboLength>0){
                ComboRead.selectedIndex=comboLength-1;
            }
            
            this.removeButton.HTMLElement.dispatchEvent(_event);

        }else {
          showError(this.errorMsg);
        }
      }
      
    });

    this.HTMLElement=divWrapper
    
  }


clearTxtList(){
  this.lstCatObj.length = 0;
  this.combo2.clearCombo();
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


class ToggleLabelWithContainer {

  constructor(lblId, labelTxt){
  
    let divWrapper = document.createElement("div");
    
    this.hiddenDiv = document.createElement("div");
    divWrapper.classList.add("component-container--vertical");

    this.hiddenDiv.className = "div-contents";
  
    this.lbl_container = new LabelComponent(labelTxt, lblId);

    addCssClass(this.lbl_container.HTMLElement,"collapsible",true);

    divWrapper.appendChild(this.lbl_container.HTMLElement);
    divWrapper.appendChild(this.hiddenDiv);
  

    this.lbl_container.HTMLElement.addEventListener('click', ()=> {
    
      this.lbl_container.HTMLElement.classList.toggle("active");

      if (this.hiddenDiv.style.maxHeight){

        this.hiddenDiv.style.maxHeight = null;

      } else {

        this.hiddenDiv.style.maxHeight = this.hiddenDiv.scrollHeight + "px";

      } 
    
    
    });

    this.HTMLElement = divWrapper;
  }
  
  
  addElementToHiddenDiv(htmlElement){

      this.hiddenDiv.appendChild(htmlElement);

  }
  
  
}
  
class TabComponent {

  constructor(tabId = "tab-", maxTabNo = 5) {


      // the main div container
      let divWrapper = document.createElement("div");
      divWrapper.classList.add("component-container--vertical");  


      // the tab headers text container div
      this.divTabset = document.createElement("div");
      this.divTabset.classList.add("tabset-component");

      // the tab panels container div
      this.divTapanels = document.createElement("div");
      this.divTapanels.classList.add("tab-panels-component");

      // if there are any additional controls to be included (e.g. button)
      this.divExtraControls = null;

      // the stem of the tab component to be used later for creating
      // ids of tab headers buttons and panels.
      this.stemId = tabId;

      // the maximum number of the tab header buttons.
      this.maxTabsetNo = maxTabNo;

      // The label text would be displayed above the tab component
      this.tabLabel="";


      
      // tab headers buttons
      this.tabSets=[];

      // tab panels
      this.tabPanels=[];


      // the index Where the new tabset and tabPanel must inserted
      this.index = 0;
      this.selectedIndex = -1;

      divWrapper.appendChild(this.divTabset);
      divWrapper.appendChild(this.divTapanels);

  
      this.HTMLElement=divWrapper;

  

  }
  
  changeTabPanelCss(newCss) {
      this.tabPanels.forEach (item => addCssClass(item.HTMLElement, newCss, true));
  }

  changeTabLblCss(cssArr){

      if (cssArr.length <= 0) {
          throw Error('Must specify at least one css class!')
      }

      if (!Array.isArray(cssArr)) {
          this.tabSets.forEach(item => {
              item.HTMLElement.className = cssArr;
          })
      }

      this.tabSets.forEach((value,index)=>{

          
          if (cssArr[index]) {

              addCssClass(this.tabSets[index].HTMLElement, cssArr[index], true);
              
          }else 
          {
              addCssClass(this.tabSets[index].HTMLElement, cssArr[0], true);

          }

      });
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

  // To add a label component (or change the current label text) to the tab component.
  addLabel(labelTitle){
              
      if (this.tabLabel ===""){
      
      this.tabLabel= new LabelComponent(labelTitle, "");
      this.HTMLElement.prepend(this.tabLabel.HTMLElement);

      } else{

      this.tabLabel.changeLblTxt(labelTitle);
      }
      
  }

  // to add a new control (e.g. extra button) to the tab component
  addControl(control, cssClasses ){

      if (!this.divExtraControls) {
          this.divExtraControls = document.createElement("div");
          this.HTMLElement.appendChild(this.divExtraControls);
      }
  
      this.divExtraControls.appendChild(control.HTMLElement);
      if (cssClasses) {
        if (Array.isArray(cssClasses)) {
            cssClasses.forEach( cssClass => control.HTMLElement.classList.add(cssClass));
        }else {
          control.HTMLElement.className = cssClasses;
        }
          
      }
      
  }


  addTab(tbSet, tbPnl, closeFunction){


      tbSet.index = this.index;

   
     
      if (closeFunction) {
          tbSet.addClose((e)=> {
              e.stopPropagation();
              let removed = (e.target).parentNode;
              if (removed) {

                  let _index = tbSet.index;
                
                  
                  for (let tabetIndex = _index + 1; tabetIndex <= this.tabSets.length -1 ; tabetIndex++) {

                   
                      this.tabSets[tabetIndex].index -= 1;
                      this.tabPanels[tabetIndex].index = this.tabSets[tabetIndex].index;

                  }


                  this.divTabset.removeChild(this.tabSets[_index].HTMLElement);
                  this.divTapanels.removeChild(this.tabPanels[_index].HTMLElement);

                  this.tabSets[_index] = null;
                  this.tabSets = this.tabSets.filter( tabset => tabset != null)
                  
                  this.tabPanels[_index] = null;
                  this.tabPanels = this.tabPanels.filter( tabpnl => tabpnl != null)
                  
               
                  this.index -=1;
               
                  if (this.selectedIndex == _index) {
                      
                      if (((_index - 1) < 0) &&  (this.tabSets[1]))
                          this.tabSets[1].HTMLElement.click();
                      else if ((_index - 1) == 0) 
                          this.tabSets[0].HTMLElement.click();
                      else if ((_index - 1) > 0) 
                          this.tabSets[_index - 1].HTMLElement.click();

                  }else {
                      this.selectedIndex -= 1;
                  }
                  
                  
              }
            }, closeFunction);
      }
      
      tbSet.HTMLElement.addEventListener("click", ()=> {
          
          this.selectedIndex = tbSet.index;
          this.resetSelected();
          tbSet.HTMLElement.classList.add(tbSet.HTMLElement.classList[0] + "--selected");
          this.tabPanels[tbSet.index].HTMLElement.classList.add("tab-panel-show");
          this.tabPanels[tbSet.index].HTMLElement.lastElementChild.focus();
          

      });

      this.tabSets.push(tbSet);

      tbPnl.index = this.index;
      this.tabPanels.push(tbPnl);
  
      this.index = this.tabSets.length;

      this.divTabset.appendChild(tbSet.HTMLElement);
      this.divTapanels.appendChild(tbPnl.HTMLElement);
  
      tbSet.HTMLElement.click();
  }


  addTxtTab(txtHeader, lblCaption, closeFunction){

      let tabSet = new TabsetClass(txtHeader, `${this.stemId}-tabSet-${this.index}` );

      let txtArea;
      if (lblCaption) {
          txtArea = new TextareaWithLabel(`${this.stemId}-txtArea-${this.index}`, lblCaption, 5);
      }else {
          txtArea = new TextareaComponent(`${this.stemId}-txtArea-${this.index}`,  5);
      }
      
      let tabPnl = new TabPanelClass(`${this.stemId}-tabPnl-${this.index}`,txtArea);


      this.addTab(tabSet, tabPnl, closeFunction);
  }

  resetSelected(){

      this.tabSets.forEach( tabset => {
          let found = null;
          tabset.HTMLElement.classList.forEach ( 
             (cssFile) => {
                  if (cssFile.includes('--selected')) {
                      found = cssFile;
                  }
              });
          if (found) { 
              tabset.HTMLElement.classList.remove(found); 
          }
      });

      
      //make the tabPanel visible and hide the others  
      this.tabPanels.forEach((item)=>{
        item.HTMLElement.classList.remove("tab-panel-show");
      })
  
  }

  clearTabs(){
      removeAllChildNodes(this.divTabset);
      removeAllChildNodes(this.divTapanels);

      this.index = 0;
      this.selectedIndex = -1;
      this.tabSets.length = 0;
      this.tabPanels.length = 0;


  }
  
}

class mediaObjEntry {
  
  constructor(tabId = 'tab') {

  this.mediaObjTab = new TabComponent(tabId, 4);
  // add Label and Tab Panel to the Tab
  this.mediaObjTab.addLabel("ادخال مكونات الجملة");
  let arrObjectiveType = [addOns[0].Text, addOns[3].Text, addOns[4].Text, addOns[6].Text];


  this.mediaObjTab.addTxtTab(arrObjectiveType[0]);
  this.mediaObjTab.addTxtTab(arrObjectiveType[1]);
  this.mediaObjTab.addTxtTab(arrObjectiveType[2]);
  this.mediaObjTab.addTxtTab(arrObjectiveType[3]);

  
  this.mediaObjTab.changeTabLblCss(["buttons-panelHeader"]);

  this.mediaObjTab.addIconsTabLbl( [addOns[0].Icon,addOns[3].Icon, addOns[4].Icon, addOns[6].Icon]);
  

  this.mediaObjTab.changeTabPanelCss("tab-panel-component-media");
  
  
  this.mediaObjTab.tabSets[0].HTMLElement.dispatchEvent(new Event('click'));

  this.HTMLElement = this.mediaObjTab.HTMLElement;

  }

  changeLbl(lbl_header) {
    this.mediaObjTab.addLabel(lbl_header);
    
  }

  getEntries(){
  
    let result = [];
    
    let txtEntry = this.mediaObjTab.tabPanels[0].component.getTextValue();
    if (txtEntry.length > 0) {
       result.push({text: txtEntry, type: MediaType.Text_sentence});
    }

    let txtEntry_pic = this.mediaObjTab.tabPanels[1].component.getTextValue();
    if (txtEntry_pic.length > 0) {
       result.push({text: txtEntry_pic, type: MediaType.pic_photo});
    }

    let txtEntry_drawing = this.mediaObjTab.tabPanels[2].component.getTextValue();
    if (txtEntry_drawing.length > 0) {
         result.push({text: txtEntry_drawing, type: MediaType.pic_drawing})
    }

    let txtEntry_sound = this.mediaObjTab.tabPanels[3].component.getTextValue();;
    if (txtEntry_sound.length > 0) {
       result.push({text: txtEntry_sound, type: MediaType.sound_record});
    }
    
    return result;
    
  }
  clearEntry(){
    this.mediaObjTab.tabPanels[0].component.clearValues();
    this.mediaObjTab.tabPanels[1].component.clearValues();
    this.mediaObjTab.tabPanels[2].component.clearValues();
    this.mediaObjTab.tabPanels[3].component.clearValues();
  }


}

class mediaObjPreview {
  constructor(tabId = 'tab-', tabsArray = [0,1,2,3]){

    this.mObjPreviewTab = new TabComponent(tabId, 4);

    addCssClass(this.mObjPreviewTab.divTabset.parentNode,"SL-quizItemsPreview--mediaObj", true);


    let IconsToBeAdded = [];

    let IconArrays = [addOns[0].Icon,addOns[3].Icon, addOns[4].Icon, addOns[6].Icon];

    for (let i=0; i<tabsArray.length; i++) {
        this.mObjPreviewTab.addTxtTab("");
        addCssClass(this.mObjPreviewTab.tabPanels[i].component.HTMLElement, ["textarea-description-preview", "textarea-resize-vertically"], true);
        IconsToBeAdded.push(IconArrays[tabsArray[i]]);

    }
    
    
    
    this.mObjPreviewTab.changeTabLblCss(["tab-labels-mObjPrv"]);
    this.mObjPreviewTab.addIconsTabLbl(IconsToBeAdded);

    this.mObjPreviewTab.changeTabPanelCss("tab-panel-component-media");

    this.mObjPreviewTab.tabSets[0].HTMLElement.dispatchEvent(new Event('click'));

    this.HTMLElement = this.mObjPreviewTab.HTMLElement;

    
    
  }

  assignQuizNo(_number){

    let no_lbl = this.mObjPreviewTab.divTabset.querySelector(`#tnumber-lbl-${this.mObjPreviewTab.stemId}`);
      
    if (!no_lbl) {
      no_lbl = document.createElement("label");
      no_lbl.className = 'tab-number-label';
      no_lbl.id = `tnumber-lbl-${this.mObjPreviewTab.stemId}`;
      this.mObjPreviewTab.divTabset.appendChild(no_lbl);
    }

    no_lbl.textContent = _number;

    
  }

  
  setEntries(_subQuizObj){

    _subQuizObj.mediaObjects.forEach( mObj => {

        if (mObj.type == MediaType.Text_sentence){
          this.mObjPreviewTab.tabPanels[0].component.setTextValue(mObj.text);
        }else if (mObj.type == MediaType.pic_photo){
          this.mObjPreviewTab.tabPanels[1].component.setTextValue(mObj.text);
        }else if (mObj.type == MediaType.pic_drawing){
          this.mObjPreviewTab.tabPanels[2].component.setTextValue(mObj.text);
        }else if (mObj.type == MediaType.sound_record){
          this.mObjPreviewTab.tabPanels[3].component.setTextValue(mObj.text);
        }
        else throw Error("unknow media type");

    });

  }

  
  activateOnEvent(event,subQuizId){
    
    
    this.mObjPreviewTab.tabPanels[0].component.HTMLElement.addEventListener(event,(e)=>{
       let saveSubQuiz1 = new SaveSubQuizToDB(subQuizId,e.target.value,MediaType.Text_sentence)
       saveSubQuiz1.execute();
    });


    this.mObjPreviewTab.tabPanels[1].component.HTMLElement.addEventListener(event,(e)=>{

       let saveSubQuiz2 = new SaveSubQuizToDB(subQuizId,e.target.value,MediaType.pic_photo)
       saveSubQuiz2.execute();

    })
 
  

    this.mObjPreviewTab.tabPanels[2].component.HTMLElement.addEventListener(event,(e)=>{

      let saveSubQuiz3 = new SaveSubQuizToDB(subQuizId,e.target.value,MediaType.pic_drawing)
      saveSubQuiz3.execute();

    })


    this.mObjPreviewTab.tabPanels[3].component.HTMLElement.addEventListener(event,(e)=>{

      let saveSubQuiz4 = new SaveSubQuizToDB(subQuizId,e.target.value,MediaType.sound_record)
      saveSubQuiz4.execute();

    })


  }
}

class PreviewContainer {
 
  constructor(){
    
    
    this.divContainer =document.createElement("div");
  
    this.divContainer.classList.add("preview-container");
    this.divContainer.id="id-preview-list";
  
    this.HTMLElement= this.divContainer;
  
  }
  
  clearPreviewContainer(){
   
    removeAllChildNodes(this.divContainer);

    // let PreviewContainer = document.getElementById("id-preview-list")
    // let PreviewListItems = PreviewContainer.children;
    // let arrPreviewListItems = [...PreviewListItems];
  
    // arrPreviewListItems.forEach((item) => {
    //     item.remove();
    // });
  }
  
   resetAllpreviewWrapperBorder() {
    let previewWrapper = document.querySelectorAll(".preview-item-wrapper");
    
    previewWrapper.forEach(item => {
      item.style.boxShadow = "none";
    });
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

      removeAllChildNodes(this.divList);

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