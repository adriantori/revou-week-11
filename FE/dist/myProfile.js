import logAllCookies from "./mainLogging.js";
import mainLogout from "./mainLogout.js";
import myProfileFetch from "./myProfileFetch.js";
import myProfileDelete from "./myProfileDelete.js";
import mainPost from "./mainPost.js";
import MyProfileEdit from "./myProfileEdit.js";
myProfileFetch();
const showCookies = document.getElementById("showCookies");
showCookies === null || showCookies === void 0 ? void 0 : showCookies.addEventListener("click", function () {
    logAllCookies();
});
const logoutButton = document.getElementById("logoutButton");
logoutButton === null || logoutButton === void 0 ? void 0 : logoutButton.addEventListener("click", function () {
    mainLogout();
});
const toHomepage = document.getElementById("Homepage");
toHomepage === null || toHomepage === void 0 ? void 0 : toHomepage.addEventListener("click", function () {
    window.location.href = "/main.html";
});
const addPost = document.getElementById("btnCreatePost");
addPost === null || addPost === void 0 ? void 0 : addPost.addEventListener("click", function () {
    const postTitle = document.getElementById('postTitle').value;
    const postBody = document.getElementById('postBody').value;
    if (postTitle.length > 1 && postBody.length > 1) {
        mainPost(postTitle, postBody);
    }
    else {
        alert("Input can't be blank");
    }
});
const formEditPost = document.getElementById("formEditPost");
formEditPost === null || formEditPost === void 0 ? void 0 : formEditPost.addEventListener("submit", (event) => {
    const postTitle = document.getElementById('postUpdateTitle').value;
    const postBody = document.getElementById('postUpdateBody').value;
    const postId = document.getElementById('postUpdateId').value;
    console.log(postTitle, postBody, postId);
    if (postTitle.length > 1 && postBody.length > 1 && postId) {
        MyProfileEdit(postTitle, postBody, parseInt(postId));
    }
    else {
        alert("Input can't be blanks");
    }
});
// Attach event listener to dynamically generated Delete buttons
document.addEventListener("click", function (event) {
    const deleteButton = event.target;
    if (deleteButton && deleteButton.classList.contains("delete-button")) {
        const postId = deleteButton.getAttribute("data-post-id");
        if (postId) {
            myProfileDelete(parseInt(postId));
        }
    }
});
