import { createClient } from '@supabase/supabase-js'

//import router
import { setRouter } from '../js/router/router.js';

//set router
setRouter();

// Create a single supabase client for interacting with your database
const supabase = createClient('https://ywbofunoxucgnaxxbaqo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3Ym9mdW5veHVjZ25heHhiYXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4ODUyODksImV4cCI6MjAyODQ2MTI4OX0.P4Pqc-d2rvXbDUW7djSfCrQDc4SkV9fsPCAPmzA_-5Q');
//Notification
function successNotification(message, seconds = 0) {
    document.querySelector(".alert-success").classList.remove("d-none");
    document.querySelector(".alert-success").classList.add("d-block");
    document.querySelector(".alert-success").innerHTML = message;

    if(seconds != 0) {
        setTimeout(function() {
            document.querySelector(".alert-success").classList.remove("d-block");
            document.querySelector(".alert-success").classList.add("d-none");
        }, seconds * 1000);
    }
}
function errorNotification(message, seconds = 0) {
    document.querySelector(".alert-danger").classList.remove("d-none");
    document.querySelector(".alert-danger").classList.add("d-block");
    document.querySelector(".alert-danger").innerHTML = message;

    if(seconds != 0) {
        setTimeout(function() {
            document.querySelector(".alert-danger").classList.remove("d-block");
            document.querySelector(".alert-danger").classList.add("d-none");
        }, seconds * 1000);
    }

    }
    //Logout function
    //supabase signout
    async function doLogout() {
        let {error} = await supabase.auth.signOut();

    
    if(error == null) {
        successNotification("Logout Successfully!");
        //clear local storage
        localStorage.clear();

        //redirect to login page
        window.location.pathname = "/sign-in.html";
    }
    else{
        errorNotification("Logout Failed!", 15);
    }
}

export { supabase, successNotification, errorNotification, doLogout };


/*document.addEventListener('DOMContentLoaded', function() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const form = document.getElementById('form');

    form.addEventListener('submit', e => {
        e.preventDefault();

        checkInputs(e);
    });

    function checkInputs(e) {
        // trim to remove the whitespaces
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        if(emailValue === '') {
            setErrorFor(email, 'Email cannot be blank');
        } else if (!isEmail(emailValue)) {
            setErrorFor(email, 'Not a valid email');
        } else {
            setSuccessFor(email);
        }

        if(passwordValue === '') {
            setErrorFor(password, 'Password cannot be blank');
        } else if (passwordValue.length < 8) {
            setErrorFor(password, 'Must at least 8 characters');
        } else if (passwordValue.length > 20) {
            setErrorFor(password, 'Password is 20 characters limit');
        } else {
            setSuccessFor(password);
        }

        //PADUNG NI SA HOMEPAGE SHAI
    // Check if all fields are valid
    const isValid = document.querySelectorAll('.form-control.success').length === 2;
    if (isValid) {
    // This will submit the form
    window.location.href = 'homepage.html';
    } else {
    // If the form is not valid, you can prevent submission and handle it accordingly
    e.preventDefault();
    }

    }

    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = 'form-control error';
        small.innerText = message;
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

});*/