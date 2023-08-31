// Function to delete a specific cookie
function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Add click event listener to the logout button
export default function mainLogout(){
    const cookiesArray = document.cookie.split(';');
    cookiesArray.forEach(cookie => {
        const cookieName = cookie.split('=')[0].trim();
        deleteCookie(cookieName);
    });

    window.location.href = "/"; // Redirect to login page after logout
}
    