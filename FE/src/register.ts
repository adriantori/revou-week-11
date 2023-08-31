import { BASE_URL } from "./constants.js";

const api_url = BASE_URL + '/api/v1/register';

export default async function register(username: string, password: string) {
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
    } catch (error) {
        console.log('Errors', error);
        alert('DB error occurred'); 
    }
}
