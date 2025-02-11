// 

// Define the successNotification function
function successNotification(message, timeout = 5) {
    const successDiv = document.querySelector(".alert.alert-success");
    if (successDiv) {
        successDiv.innerHTML = message;
        successDiv.classList.remove("d-none");

        // Optionally, hide the success message after a timeout
        setTimeout(() => {
            successDiv.classList.add("d-none");
            successDiv.innerHTML = "";
        }, timeout * 1000); // Convert seconds to milliseconds
    } else {
        console.error("Success alert element not found.");
    }
}

// Define the errorNotification function
function errorNotification(message, timeout = 5) {
    const errorDiv = document.querySelector(".alert.alert-danger");
    if (errorDiv) {
        errorDiv.innerHTML = message;
        errorDiv.classList.remove("d-none");

        // Optionally, hide the error message after a timeout
        setTimeout(() => {
            errorDiv.classList.add("d-none");
            errorDiv.innerHTML = "";
        }, timeout * 1000); // Convert seconds to milliseconds
    } else {
        console.error("Error alert element not found.");
    }
}

// Your existing code
import { supabase } from "../sign-in";

document.addEventListener("DOMContentLoaded", () => {
    const form_login = document.getElementById("form_login");

    form_login.onsubmit = async (e) => {
        e.preventDefault();

        // Disable the submit button and show loading spinner
        const submitButton = document.querySelector("#form_login button[type='submit']");
        submitButton.disabled = true;
        submitButton.innerHTML = '<div class="spinner-border me-2" role="status"></div><span>Loading...</span>';

        // get All values from input, select, textarea under form tag    
        const formData = new FormData(form_login);

        // supabase login
        let { data, error } = await supabase.auth.signInWithPassword({
            email: formData.get("email"),
            password: formData.get("password"),
        });

        console.log(data);

        let session = data.session;
        let user = data.user;

        // If user can be accessed; Or user is already verified
        if (session != null) {
            localStorage.setItem("access_token", session.access_token);
            localStorage.setItem("refresh_token", session.refresh_token);
            localStorage.setItem("user_id", user.id);

            // for role based authentication
            // let { data: users_information, error } = await supabase
            // .from('users_information')
            // .select('*') // you can specifically set what column, read docu for more info
            // .eq('user_id', user.id);

            // console.log(users_information);
            // localStorage.setItem("role", users_information.role);
        }

        // show notification
        if (error == null) {
            successNotification("Login Successfully");
            // reset form
            form_login.reset();
            window.location.pathname = "/homepage.html";
        } else {
            errorNotification("Email or password is incorrect", 10);
            console.log(error);
        }

        // Enable submit button after form submission
        submitButton.disabled = false;
        submitButton.innerHTML = 'Sign In';
    };
});
