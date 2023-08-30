var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const api_url = 'http://localhost:8080' + '/api/v1/login';
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
            console.log(data);
            document.cookie = `token: ${data.token} userId: ${data.user_id}`;
            window.location.href = "http://localhost:8080/main.html";
        }
        catch (error) {
            console.log('Error', error);
            alert('DB error occurred');
        }
    });
}
