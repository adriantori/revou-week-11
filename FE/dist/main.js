import mainFetch from "./mainFetch.js";
import logAllCookies from "./mainLogging.js";
import mainLogout from "./mainLogout.js";
import mainPost from "./mainPost.js";
import trimCookie from "./trimCookie.js";
mainFetch();
const showCookies = document.getElementById("showCookies");
showCookies === null || showCookies === void 0 ? void 0 : showCookies.addEventListener("click", function () {
    logAllCookies();
});
const logoutButton = document.getElementById("logoutButton");
logoutButton === null || logoutButton === void 0 ? void 0 : logoutButton.addEventListener("click", function () {
    mainLogout();
});
const toMyProfile = document.getElementById("myProfile");
toMyProfile === null || toMyProfile === void 0 ? void 0 : toMyProfile.addEventListener("click", function () {
    const userName = trimCookie().username;
    window.location.href = `/myProfile.html?username=${userName}`;
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
