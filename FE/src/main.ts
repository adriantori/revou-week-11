import mainFetch from "./mainFetch.js";
import logAllCookies from "./mainLogging.js";
import mainLogout from "./mainLogout.js";
import mainPost from "./mainPost.js";
import trimCookie from "./trimCookie.js";

mainFetch();

const showCookies = document.getElementById("showCookies");
showCookies?.addEventListener("click", function () {
    logAllCookies();
});

const logoutButton = document.getElementById("logoutButton");
logoutButton?.addEventListener("click", function () {
    mainLogout();
});

const toMyProfile = document.getElementById("myProfile");
toMyProfile?.addEventListener("click", function () {
    const userName = trimCookie().username
    window.location.href = `/myProfile.html?username=${userName}`;
});

const toHomepage = document.getElementById("Homepage");
toHomepage?.addEventListener("click", function () {
    window.location.href = "/main.html";
});

const addPost = document.getElementById("btnCreatePost");
addPost?.addEventListener("click", function () {
    const postTitle: string = (document.getElementById('postTitle') as HTMLInputElement).value;
    const postBody: string = (document.getElementById('postBody') as HTMLInputElement).value;
    if(postTitle.length > 1 && postBody.length > 1){
        mainPost(postTitle, postBody);
    }else{
        alert("Input can't be blank")
    }
})

// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Assuming you have postTitle and postBody variables with the values you want to display
    console.log((document.getElementById('fullPostTitle') as HTMLInputElement).value)
    // Listen for the modal's "show.bs.modal" event
    const modal = document.getElementById("modalFullpage");
    modal?.addEventListener("show.bs.modal", function (event) {
        const fullPostTitle = document.getElementById("fullPostTitle");
        const fullPostBody = document.getElementById("fullPostBody");

        const modalTrigger = event.target as HTMLElement; // Use a type assertion to specify that event.target is an HTMLElement
        const postTitle = modalTrigger.getAttribute("data-post-title");

        // Update the content of the <p> elements with your variables
        fullPostTitle!.textContent = postTitle || "test"; // Use the || operator to provide a default value if postTitle is null or undefined
        fullPostBody!.textContent = "postBody";
    });
});





