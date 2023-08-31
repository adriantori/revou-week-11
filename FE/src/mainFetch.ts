import { BASE_URL } from "./constants.js";
import trimCookie from "./trimCookie.js";

const api_url = BASE_URL + '/api/v1/posts';

export default async function mainFetch() {
    try {
        const token = trimCookie()

        const response = await fetch(api_url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.trim()}` // Trim any leading/trailing spaces
            }
        });

        const data = await response.json();

        if (data.data.length !== 0) {
            const formOutput = document.getElementById("rowOutput") as HTMLElement;

            for (let i = 0; i < data.data.length; i++) {
                formOutput.innerHTML += 
            `<div class="col-lg-4 col-md-6 mb-4">
                <div class="card"id="post-${data.data[i].post_id}">
                    <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                        <img src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" class="img-fluid" />
                        <a href="#!">
                            <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                        </a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><b>${data.data[i].post_title}<b/></h5>
                        <h5 class="card-title">by: ${data.data[i].user_name}</h5>
                        <p class="card-text">
                            ${data.data[i].post_content}
                        </p>
                    </div>
                </div>
            </div>`
        }
    }
    } catch (error) {
        alert(error);
    }
    
}