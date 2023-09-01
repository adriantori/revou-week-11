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
                `<div class="col-md-12 border border-primary mb-5 p-5">
                    <h1>${data.data[i].post_title}</h1>
                    <h5>Written by: ${data.data[i].user_name}</h5>
                        <p>${data.data[i].post_content}</p>
                        <span class="badge bg-primary">Posted ${dateTimeFormatter(data.data[i].createdAt)}</span>
                        <span class="badge bg-primary">Last Updated ${dateTimeFormatter(data.data[i].updatedAt)}</span><br/>
                        <button type="button" class="btn btn-primary m-2" onClick="myProfileEditHTML('${data.data[i].post_id}')">Edit post</button>
                        <button type="button" class="btn btn-danger m-2 delete-button" data-post-id=${data.data[i].post_id}>Delete</button>
                    </div>`
            }
        }
    } catch (error) {
        alert(error);
    }
}