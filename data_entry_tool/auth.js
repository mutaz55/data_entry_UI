



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
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';

    }).catch (error => {
        loginForm.querySelector('.error').innerHTML = error.message;
    })
});



// logout method
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});