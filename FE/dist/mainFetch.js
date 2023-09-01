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
import dateTimeFormatter from "./dateTimeFormatter.js";
import trimCookie from "./trimCookie.js";
const api_url = BASE_URL + '/api/v1/posts';
export default function mainFetch() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = trimCookie().token;
            //console.log(token);
            const response = yield fetch(api_url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.trim()}` // Trim any leading/trailing spaces
                }
            });
            const data = yield response.json();
            if (data.data.length !== 0) {
                const formOutput = document.getElementById("rowOutput");
                for (let i = 0; i < data.data.length; i++) {
                    formOutput.innerHTML +=
                        `<div class="col-lg-4 col-md-6 mb-4">
                <div class="card"id="post-${data.data[i].post_id}">
                    <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                        <img src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" class="img-fluid" />
                        <a href="#">
                            <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                        </a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${data.data[i].post_title}</h5>
                        <h6 class="card-subtitle">by: ${data.data[i].user_name}</h6>
                        <p class="card-text">
                            <span>Created at: ${dateTimeFormatter(data.data[i].createdAt)}</span><br/>
                            <span>Updated at: ${dateTimeFormatter(data.data[i].updatedAt)}</span>
                        </p>
                    </div>
                </div>
            </div>`;
                }
            }
        }
        catch (error) {
            alert(error);
        }
    });
}
