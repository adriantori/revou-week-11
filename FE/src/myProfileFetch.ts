import { BASE_URL } from "./constants.js";
import dateTimeFormatter from "./dateTimeFormatter.js";
import trimCookie from "./trimCookie.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const api_url = BASE_URL + `/api/v1/posts/${urlParams.get('username')}`;


export default async function myProfile() {
    try {
        const token = trimCookie().token
        const response = await fetch(api_url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Trim any leading/trailing spaces
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
                            <h5 class="card-title">${data.data[i].post_title}</h5>
                            <h6 class="card-subtitle">by: ${data.data[i].user_name}</h6>
                            <p class="card-text">
                                <span>Created at: ${dateTimeFormatter(data.data[i].createdAt)}</span><br/>
                                <span>Updated at: ${dateTimeFormatter(data.data[i].updatedAt)}</span><br/>
                                <button type="button" class="btn btn-info m-2 edit-button" data-post-id=${data.data[i].post_id}>Edit</button>
                                <button type="button" class="btn btn-danger m-2 delete-button" data-post-id=${data.data[i].post_id}>Delete</button>
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