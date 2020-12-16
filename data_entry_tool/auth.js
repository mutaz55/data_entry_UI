// Authentication Process
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const modals = document.querySelector(".modal");



const setupUI = (user) => {
  if (user) {
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));

  } else {
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
};


// listen for auth changes

auth.onAuthStateChanged( user => {
    if (user) {
        setupUI(user);
    }else {
        setupUI();
    }
});

// login
const loginForm = document.querySelector('#login-form');


loginForm.addEventListener('submit', (e)=> {
    e.preventDefault();


    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,password). then ( cred => {

      

        // close the modal form and reset it
        //const modal = document.querySelector('#modal-login');
        removeLoginProcess();
       

    }).catch (error => {
        loginForm.querySelector('.login-error').innerHTML = error.message;
    })
});



// logout method
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

const login = document.querySelector('#login');
login.addEventListener('click', e=> {
    e.preventDefault();
    modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    modalOverlay.style.zIndex = 2002;
    modalOverlay.style.display= "block";
    modalOverlay.style.opacity = 0.5;

    
    
    
    document.body.appendChild(modalOverlay);
    modalOverlay.addEventListener('click', removeLoginProcess);
   
    modals.style.zIndex = 2005;
    modals.style.display = "block";
    modals.style.opacity = 1;
    modals.style.top = "10%";
    modals.style.transform = "scaleX(1) scaleY(1)";
    
    
      
});

function removeLoginProcess(){
    if (modals) {
        
        loginForm.reset();
        loginForm.querySelector('.login-error').innerHTML = '';

        modals.removeAttribute("style");
        modals.classList.add("modal");
    }

    if(modalOverlay)
        document.body.removeChild(modalOverlay);
}


window.addEventListener('keydown', (e) => {

    // close log in form
    if (modals.style.display == "block")
        if (e.key  === 'Escape') 
            removeLoginProcess();
});

