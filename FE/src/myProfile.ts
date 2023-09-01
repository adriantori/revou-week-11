import logAllCookies from "./mainLogging.js";
import mainLogout from "./mainLogout.js";
import myProfileFetch from "./myProfileFetch.js";
import myProfileDelete from "./myProfileDelete.js";
import mainPost from "./mainPost.js";
import MyProfileEdit from "./myProfileEdit.js";
myProfileFetch();

const showCookies = document.getElementById("showCookies");
showCookies?.addEventListener("click", function () {
    logAllCookies();
});

const logoutButton = document.getElementById("logoutButton");
logoutButton?.addEventListener("click", function () {
    mainLogout();
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

const formEditPost = document.getElementById("formEditPost") as HTMLFormElement;
formEditPost?.addEventListener("submit", (event) => {
    const postTitle: string = (document.getElementById('postUpdateTitle') as HTMLInputElement).value;
    const postBody: string = (document.getElementById('postUpdateBody') as HTMLInputElement).value;
    const postId: string = (document.getElementById('postUpdateId') as HTMLInputElement).value;
    console.log(postTitle, postBody, postId);
    if(postTitle.length > 1 && postBody.length > 1 && postId){
        MyProfileEdit(postTitle, postBody, parseInt(postId));
    }else{
        alert("Input can't be blanks")
    }
})

// Attach event listener to dynamically generated Delete buttons
document.addEventListener("click", function(event) {
    const deleteButton = event.target as HTMLElement;
    if (deleteButton && deleteButton.classList.contains("delete-button")) {
        const postId = deleteButton.getAttribute("data-post-id");
        if (postId) {
            myProfileDelete(parseInt(postId));
        }
    }
});