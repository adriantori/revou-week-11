import mainFetch from "./mainFetch.js";
import logAllCookies from "./mainLogging.js";
import mainLogout from "./mainLogout.js";
import mainPost from "./mainPost.js";

mainFetch();

const showCookies = document.getElementById("showCookies");
showCookies?.addEventListener("click", function () {
    logAllCookies();
});

const logoutButton = document.getElementById("logoutButton");
logoutButton?.addEventListener("click", function () {
    mainLogout();
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