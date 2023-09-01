import { BASE_URL } from "./constants.js";
import trimCookie from "./trimCookie.js";

const api_url = BASE_URL + `/api/v1/posts/`;


export default async function myProfileDelete(postId: number) {
    try {
        if(confirm("are you sure you want to delete?")){
            const token = trimCookie().token
            const response = await fetch(api_url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: postId
                }),
            });
    
            await response.json();
            alert("Post successfully deleted, bye bye post~")
            location.reload();
        }
        
    } catch (error) {
        alert(error);
    }
}