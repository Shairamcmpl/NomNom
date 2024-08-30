import { supabase, successNotification, errorNotification, doLogout } from "../sign-in";


const btn_logout = document.getElementById("btn_logout");
btn_logout.onclick = doLogout;