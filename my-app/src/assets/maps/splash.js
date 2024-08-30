
$(document).ready(function() {
    setTimeout(function() {
        $(".se-pre-con").fadeOut(600, function() {
            $("body").css("background", "linear-gradient(to right, #FFBB5C, #C63D2F)");
            window.location.href = "sign-in.html"; //path padung sa signin.html human splash screen ni
        });
    }, 3000); // Splash screen display duration, e change lang if gusto ug longer pa
});


///// More Animations in here pamili unsay bet

/*
function slideUpSplashScreen() {
    $(".se-pre-con").slideUp(600, function() {
        $("body").css("background", "linear-gradient(to right, #FFBB5C, #C63D2F)");
        window.location.href = "sign-in.html";
    });
}


$(document).ready(function() {
    setTimeout(slideUpSplashScreen, 3000);
});
*/


function slideLeftSplashScreen() {
    $(".se-pre-con").animate({
        "left": "-100%"
    }, 600, function() {
        $("body").css("background", "linear-gradient(to right, #FFBB5C, #C63D2F)");
        window.location.href = "sign-in.html";
    });
}

$(document).ready(function() {
    setTimeout(slideLeftSplashScreen, 3000);
});


/*3
function slideRightSplashScreen() {
    $(".se-pre-con").animate({
        "left": "100%"
    }, 600, function() {
        $("body").css("background", "linear-gradient(to right, #FFBB5C, #C63D2F)");
        window.location.href = "signin.html";
    });
}

$(document).ready(function() {
    setTimeout(slideRightSplashScreen, 3000);
});
*/

