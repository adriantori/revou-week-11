import adminFetch from "./adminFetch.js";
import logAllCookies from "./mainLogging.js";
import mainLogout from "./mainLogout.js";
import myProfileDelete from "./myProfileDelete.js";

adminFetch();

const showCookies = document.getElementById("showCookies");
showCookies?.addEventListener("click", function () {
    logAllCookies();
});

const logoutButton = document.getElementById("logoutButton");
logoutButton?.addEventListener("click", function () {
    mainLogout();
});

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