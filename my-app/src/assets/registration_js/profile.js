import { createClient } from '@supabase/supabase-js';
import { successNotification, errorNotification } from './sign-in'; // Adjust the path as needed

const supabaseUrl = 'https://ywbofunoxucgnaxxbaqo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3Ym9mdW5veHVjZ25heHhiYXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4ODUyODksImV4cCI6MjAyODQ2MTI4OX0.P4Pqc-d2rvXbDUW7djSfCrQDc4SkV9fsPCAPmzA_-5Q';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async function () {
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    console.error('User ID not found in localStorage');
    return;
  }

  const { data: userData, error: userError } = await supabase
    .from('user_information')
    .select('firstname, lastname, birthdate, contact_number, gender')
    .eq('user_id', userId)
    .single();

  if (userError) {
    console.error('Error fetching user data:', userError.message);
    return;
  }

  if (!userData) {
    console.error('No user data found');
    return;
  }

  const firstNameInput = document.getElementById('firstname');
  const lastNameInput = document.getElementById('lastname');
  const birthDayInput = document.getElementById('birthdate');
  const contactNumInput = document.getElementById('contact_number');

  firstNameInput.value = userData.firstname;
  lastNameInput.value = userData.lastname;
  birthDayInput.value = userData.birthdate;
  contactNumInput.value = userData.contact_number;

  const genderOptions = document.getElementsByName('gender');
  for (const option of genderOptions) {
    if (option.value === userData.gender) {
      option.checked = true;
      break;
    }
  }

  const form = document.getElementById('form_edit');
  
  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    /*
    const submitBtn = document.querySelector("#form_edit button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner-border me-2" role="status"></div><span>Loading...</span>';

     */
    const formData = new FormData(form);

    
    document.querySelector("#form_edit button[type='submit']").disabled = true;
   // document.querySelector("#form_edit button[type='submit']").innerHTML = '<div class="spinner-border me-2" role="status"></div><span>Loading...</span>';
   document.querySelector("#form_edit button[type='submit']").innerHTML = '<span>Loading...</span>';
    
    
    
    //const image = formData.get("image_path");

   const image = formData.get("image_path");
   const { data, error } = await supabase.storage
  .from('image')
  .upload("public/" + image.name, image, {
    cacheControl: "3600",
    upsert: true
  });

  const image_data = data;
        if(error == null){
            successNotification("Information Updated!", 5);

        }else{
            errorNotification("Something went wrong, file image might bigger than 5mb",5);
        }
        console.log(error);
  /*
    let image_data = null;

    if (image && image.name) {
      const { data, error } = await supabase
        .storage
        .from("image")
        .upload("public/" + image.name, image, {
            cacheControl: '3600',
            upsert: true,
        });

      image_data = data;
      
      if (error) {
          console.error('Error uploading image:', error.message);
          errorNotification("Something went wrong, file image might be bigger than 5mb", 5);
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Update';
          return;
      }
    }
    */
   // Get updated user information from form
    const updatedData = {
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      birthdate: formData.get('birthdate'),
      contact_number: formData.get('contact_number'),
      gender: formData.get('gender'),
      image_path: image_data == null ? null : image_data.path,
    };

    form.reset();
     

    const { error: updateError } = await supabase
      .from('user_information')
      .update(updatedData)
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error updating user data:', updateError.message);
      errorNotification("Error updating user information", 5);
    } else {
        // Inside the form submission event listener in form_edit.js
         console.log('Before successNotification'); // Check if this log appears
         successNotification("Information Updated!", 5);
        console.log('After successNotification'); // Check if this log appears
    }

    window.location.reload();
    
  });
  
});