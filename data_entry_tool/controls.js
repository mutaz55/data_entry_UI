
const btn_add_concept = document.querySelector('#add_concept');
const btn_remove_concept = document.querySelector('#remove_concept');
const lst_concepts = document.querySelector('#id-concepts');

let selected_concept_index = "-1";




// TODO: 


btn_remove_concept.addEventListener('click', (e) => {

        if (selected_concept_index != "-1"){
           
           const removed = document.querySelector(`#${selected_concept_index}`);
           
            if (removed != undefined) {
                
                lst_concepts.removeChild(removed);
                
                Concepts = Concepts.filter(function(item) {
                    return item.ConceptID !== selected_concept_index;
                })
                

            }

                
            
            selected_concept_index = "-1";

            const firstChild = lst_concepts.firstChild;
            if (firstChild != undefined) 
                firstChild.focus();


        }


});

function addNewConceptItem(txt, id_c){
    
    
    
        const new_concept = document.createElement('button');
        const new_conept_txt = document.createTextNode(txt);

        new_concept.type="button";
        new_concept.className = "list-group-item list-group-item-action";
        new_concept.id = id_c;
        new_concept.addEventListener('click', (e) => {
            selected_concept_index = id_c;
    
        })
        new_concept.appendChild(new_conept_txt);
        lst_concepts.appendChild(new_concept);
        return new_concept;
    
}

btn_add_concept.addEventListener('click', (e)=> {
    const txt_concept_entry = document.getElementById("txt_concept").value;
    
    if (txt_concept_entry != 0) {
        let id_con = Math.max.apply(Math, Concepts.map(function(conId) { return (conId.ConceptID).substring(conId.ConceptID.indexOf('C') + 1,conId.ConceptID.length); })) + 1;
        let id_con_key = currentCourse.CourseTitle + "C" + id_con;
        // to change later  >> Courses[0] for all courses
        Concepts.unshift(new Concept(currentCourse.id,id_con_key, txt_concept_entry));
        addNewConceptItem(txt_concept_entry, id_con_key).focus();
        document.getElementById("txt_concept").value = "";
        console.log(Concepts);
    }
    selected_concept_index = "-1";
        
    });

function clearConceptsLst () {
      
    lst_concepts.innerHTML = "";
    console.log('clear');
}
function fillConcepts(con){
  
    if (con.length != 0) {
        con.forEach(element => {
            addNewConceptItem(element.ConceptText, element.ConceptID);

        });
    }
        
    selected_concept_index = "-1";

}


