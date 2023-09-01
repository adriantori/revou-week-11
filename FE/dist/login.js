var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BASE_URL } from "./constants.js";
const api_url = BASE_URL + '/api/v1/login';
export default function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(api_url, {
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
            const data = yield response.json();
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
        }
        catch (error) {
            alert('DB error occurred');
        }
    });
}
