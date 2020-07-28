
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
//const mainMsg = document.querySelector('#mainMsg');

const setupUI = (user) => {
    if (user) {
        loggedInLinks.forEach (item => item.style.display = "block");
        loggedOutLinks.forEach(item => item.style.display = "none");
       // mainMsg.style.display = "none";
    }else {
        loggedInLinks.forEach (item => item.style.display = "none");
        loggedOutLinks.forEach(item => item.style.display = "block");
        //mainMsg.style.display = "block";
    }
}
// setup materialize components
document.addEventListener("DOMContentLoaded", function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

});

 // get data from database

document.querySelector('#load-btn').addEventListener('click', (e)=> {
e.preventDefault();
loadDataFromFireStore();

});


function loadDataFromFireStore(e) {
    
    Courses = [];
    var docRef = db.collection("courses");
    docRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            Courses.unshift(storeDataLocally(doc.id,doc.data()));


        });
    });
    
}