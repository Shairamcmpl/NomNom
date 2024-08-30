import { successNotification, errorNotification, doLogout } from "../sign-in";


const btn_logout = document.getElementById("btn_logout");

//logout functionality
btn_logout.onclick = doLogout;



