import { BASE_URL } from "./constants.js";

const api_url = BASE_URL + '/api/v1/login';

export default async function login(username: string, password: string) {
    try {
        const response = await fetch(api_url!, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        const data = await response.json();
        alert(data.message);
        if (response.status == 201) {
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 10 * 60 * 1000); // 10 minutes in milliseconds
            const expires = "expires=" + expirationDate.toUTCString();

            // Encode token and user ID values
            const encodedToken = encodeURIComponent(data.token);
            const encodedUserName = encodeURIComponent(data.data.user_name);

            // Construct the cookie strings using template literals
            const tokenCookieValue = `token=${encodedToken};${expires};path=/`;
            const userIdCookieValue = `userName=${encodedUserName};${expires};path=/`;

            // Set the cookies
            document.cookie = tokenCookieValue;
            document.cookie = userIdCookieValue;

            // Redirect to main.html
            window.location.href = "main.html";
        }

    } catch (error) {
        console.log('Error', error);
        alert('DB error occurred');
    }
}
