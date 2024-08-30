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

export { supabase , successNotification, errorNotification };




/*
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordConfirmation = document.getElementById('password_confirmation');
    const birthdate = document.getElementById('birthdate'); 
    const contactNumber = document.getElementById('contact_number'); 
    var genderOptions = document.getElementsByName('gender');

    for (var i = 0; i < genderOptions.length; i++) {
        genderOptions[i].addEventListener('change', function() {
            var genderSelected = false;
    
            for (var j = 0; j < genderOptions.length; j++) {
                if (genderOptions[j].checked) {
                    genderSelected = true;
                    break;
                }
            }
            var errorMsg = document.getElementById('error-msg');
            if (!genderSelected) {
                errorMsg.innerText = 'Please select a gender.';
                errorMsg.classList.remove('success-msg');
                errorMsg.classList.add('error-msg');
                return;
            } else {
                errorMsg.innerText = 'Gender selected successfully.';
                errorMsg.classList.remove('error-msg');
                errorMsg.classList.add('success-msg');
                // Proceed with form submission or any other action
            }
        });
    }   
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        alert("Sign-Up Successfully");

        checkInputs();  
    });

    function checkInputs() {
        // trim to remove the whitespaces
        const firstnameValue = firstname.value.trim();
        const lastnameValue = lastname.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const passwordConfirmationValue = passwordConfirmation.value.trim();
        const birthdateValue = birthdate.value.trim(); 
        const contactNumberValue = contactNumber.value.trim(); 


        if(firstnameValue === '') {
            setErrorFor(firstname, 'Firstname cannot be blank');
        } else if (firstnameValue.length > 20) {
            setErrorFor(firstname, 'Firstname 20 characters limit');
        } else {
            setSuccessFor(firstname);
        }

        if(lastnameValue === '') {
            setErrorFor(lastname, 'Lastname cannot be blank');
        } else if (lastnameValue.length > 20) {
            setErrorFor(lastname, 'Lastname 20 characters limit');
        } else {
            setSuccessFor(lastname);
        }

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
            setErrorFor(password, 'Must be at least 8 characters');
        } else if (passwordValue.length > 20) {
            setErrorFor(password, 'Password is 20 characters limit');
        } else {
            setSuccessFor(password);
        }

        if(passwordConfirmationValue === '') {
            setErrorFor(passwordConfirmation, 'Confirm your password');
        } else if(passwordValue !== passwordConfirmationValue) {
            setErrorFor(passwordConfirmation, 'Passwords do not match');
        } else{
            setSuccessFor(passwordConfirmation);
        }

        if(birthdateValue === '') { 
            setErrorFor(birthdate, 'Enter your birthdate');
        } else {
            setSuccessFor(birthdate);
        }

        if(contactNumberValue === '') { 
            setErrorFor(contactNumber, 'Contact cannot be blank');
        } else if(!isNumeric(contactNumberValue)) {
            setErrorFor(contactNumber, 'Must contain only numbers');
        } else if (contactNumberValue.length > 12) {
            setErrorFor(contactNumber, 'Only 12 digits limit');
        } else {
            setSuccessFor(contactNumber);
        }

        // Check if all fields are valid
        const isValid = document.querySelectorAll('.form-control.success').length === 7;
        if (isValid) {
        // This will submit the form
        window.location.href = 'sign-in.html';
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

    function isNumeric(number) { 
        return /^\d+$/.test(number);
    }

    $(birthdate).datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0" // Allow selection of birthdates up to 100 years ago from the current date
    });

    
});*/
