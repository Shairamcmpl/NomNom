import { supabase, successNotification, errorNotification } from "../sign-in";

const itemImageUrl = 'https://ywbofunoxucgnaxxbaqo.supabase.co/storage/v1/object/public/image/';
// Function to fetch user information from Supabase
async function getDatas() {
  try {
      const{data: userInfo, error: userInfoError } = await supabase
      .from ('user_information')
      .select ('*')
      .eq('user_id', localStorage.getItem("user_id"))
      .single();
      
      if (userInfoError) {
          throw userInfoError;
      }

      if (userInfo) {
          const user_info_id = userInfo.id;

          let container = "";

// Function to render user profile using fetched data
          container += `
          <div class="col-lg-4">
          <div id="prof" class="card mb-4">
              <div class="card-body text-center">
                  <img src="${itemImageUrl + userInfo.image_path}"
                      alt="Upload Image" class="rounded-circle img-fluid" style="width: 200px; height: 200px;">
              </div>
          </div>
      </div>
              <br>
              <div class="personal-info" id="get_data">
                <div class="info-box">
                  <h4><i class="fas fa-user icon"></i>Name</h4>
                  <p id="profile-username">${userInfo.firstname} ${userInfo.lastname}</p>
                </div>
                <div class="info-box">
                  <h4><i class="fas fa-birthday-cake icon"></i> Birthday</h4>
                  <p id="profile-birthday">${userInfo.birthdate}</p>
                </div>
                <div class="info-box">
                  <h4><i class="fas fa-phone icon"></i> Contact Number</h4>
                  <p id="profile-contact">${userInfo.contact_number}</p>
                </div>
                <div class="info-box">
                  <h4><i class="fas fa-venus-mars icon"></i> Gender</h4>
                  <p id="profile-gender">${userInfo.gender}</p>
                </div>
                <div class="edit-button">
                <button type="button" class="btn btn-primary" id="editProfileBtn" data-toggle="modal" data-target="#editProfileModal">Edit Profile Info</button>
              </div>
              </div>`;

         document.getElementById("get_data").innerHTML = container;
      } else {
        console.error('Error: User information not found');
      }
     } catch (error) {
        console.error('Error:',error);
      }
 } 
getDatas();


// const form_register = document.getElementById("form_register");
// form_register.onsubmit = async (e) => {
//   e.preventDefault();
//   alert("hello");

// }


/*let for_update_id = "";

async function getDatas() {
    try {
        // Fetch user information from users_information table
        const { data: userInfo, error: userInfoError } = await supabase
            .from('user_information')
            .select('*')
            .eq('user_id', localStorage.getItem("user_id"))
            .single();

        if (userInfoError) {
            throw userInfoError;
        }
        
        // Check if user information exists
        if (userInfo) {
            const user_info_id = userInfo.id;

            let container = "";

            // Render users_information
            container += `
            <div class="avatar-container" data-id="${userInfo.id}">
            <div class="avatar">
              <img src="./assets/images/profile/ex_girl_profile.png"alt="Avatar Example">
            </div>
            <label for="file-upload" class="upload-icon">
              <i class="fas fa-camera"></i>
            </label>
            <input type="file" id="file-upload" style="display: none;">
          </div>
      
          <br>
          <div class="personal-info" id="get_data">
            <div class="info-box">
              <h4><i class="fas fa-user icon"></i>Name</h4>
              <p id="profile-username">${userInfo.firstname}${userInfo.lastname}</p>
            </div>
            <div class="info-box">
              <h4><i class="fas fa-birthday-cake icon"></i> Birthday</h4>
              <p id="profile-birthday">${userInfo.birthdate}</p>
            </div>
            <div class="info-box">
              <h4><i class="fas fa-phone icon"></i> Contact Number</h4>
              <p id="profile-contact">${userInfo.contact_number}</p>
            </div>
            <div class="info-box">
              <h4><i class="fas fa-venus-mars icon"></i> Gender</h4>
              <p id="profile-gender">${userInfo.gender}</p>
            </div>
            <div class="edit-button">
            <button type="button" class="btn btn-primary" id="editProfileBtn" data-toggle="modal" data-target="#editProfileModal">Edit Profile Info</button>
          </div>
      </div>`;

            document.getElementById("get_data").innerHTML = container;
        } else {
            console.error('Error: User information not found');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the getDatas function to fetch and render user information
getDatas(); */