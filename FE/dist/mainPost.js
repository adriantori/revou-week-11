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
import trimCookie from "./trimCookie.js";
const api_url = BASE_URL + '/api/v1/posts';
export default function mainPost(postTitle, postBody) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = trimCookie().token;
            const response = yield fetch(api_url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.trim()}` // Trim any leading/trailing spaces
                },
                body: JSON.stringify({
                    postTitle: postTitle,
                    postBody: postBody,
                }),
            });
            const data = yield response.json();
            alert(data.message);
            window.location.href = "/main.html";
        }
        catch (error) {
            alert('DB error occurred');
        }
    });
}
