function setRouter(){
    switch (window.location.pathname){
        //if you are logged in, you can't access pages;redirect to dashboard
        case "/":
        case "/sign-in.html":
        case "/sign-up.html":
            if (localStorage.getItem("access_token")) {
                window.location.pathname = "/homepage.html";
            }
            break;

        //if you are not logged in, you can't access dashboard pages; redirect to
        case "/":
        case "/homepage.html":
        case "/finalMap.html":
        case "/stalls.html":
        case "/guide.html":       
            if (!localStorage.getItem("access_token")) {
                window.location.pathname = "/sign-in.html";
            } 
            break;

        default:
            break;
    }
}

export {setRouter};

