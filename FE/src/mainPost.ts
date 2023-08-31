import { BASE_URL } from "./constants.js";
import trimCookie from "./trimCookie.js";

const api_url = BASE_URL + '/api/v1/posts';

export default async function mainPost(postTitle: string, postBody: string) {
    try {
        const token = trimCookie()
        console.log(postTitle, postBody);
        const response = await fetch(api_url!, {
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
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.log('Errors', error);
            alert('DB error occurred'); 
        }
}