// Function to log all cookies
export default function logAllCookies() {
    const cookiesArray = document.cookie.split(';');
    cookiesArray.forEach(cookie => {
        console.log(cookie.trim());
    });
}
// Log all cookies
logAllCookies();
