const api_url = 'http://localhost:8080' + '/api/v1/login';

export default async function login(username: string, password: string) {
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
        console.log(data);
        document.cookie = `token: ${data.token} userId: ${data.user_id}`;
        window.location.href = "http://localhost:8080/main.html";
    } catch (error) {
        console.log('Error', error);
        alert('DB error occurred'); 
    }
}
