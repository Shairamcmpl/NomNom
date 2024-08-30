import { supabase, successNotification, errorNotification } from "../sign-up";

const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
    e.preventDefault();

    //disable the submit button
    document.querySelector("#form_register button").disabled = true;
    document.querySelector("#form_register button").innerHTML = '<div class="spinner-border me-2" role="status"> </div> <span>Loading...</span>';

    //get all values from input, select, text area under form tag
    const formData = new FormData(form_register);

    const password = formData.get("password");
    const passwordConfirmation = formData.get("password_confirmation");

    if (password === passwordConfirmation) {
        // SUPABASE SIGN-UP
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: formData.get("email"),
            password: password,
        });

        if (signUpError) {
            errorNotification("Something unexpected happened! Cannot register account.", 10);
            console.log(signUpError);
        } else {
            // STORE INTO VARIABLE THE USER_ID
            let user_id = signUpData.user.id;

            // SUPABSE USER_INFORMATION TABLE
            const { data: insertData, error: insertError } = await supabase
                .from('user_information')
                .insert([
                    {
                        firstname: formData.get("firstname"),
                        lastname: formData.get("lastname"),
                        birthdate: formData.get("birthdate"),
                        contact_number: formData.get("contact_number"),
                        gender: formData.get("gender"),
                        user_id: user_id,
                    },
                ])
                .select();

            if (insertError) {
                errorNotification("Something unexpected happened! Cannot register account.", 10);
                console.log(insertError);
            } else {
                successNotification("Signed up successfully.", 100);
                // reset form
                form_register.reset();
            }
        }
    } else {
        // Passwords don't match, show notification
        errorNotification("Passwords don't match.", 10);
    }

    // enable submit button
    document.querySelector("#form_register button").disabled = false;
    document.querySelector("#form_register button").innerHTML = 'Sign Up';
};
