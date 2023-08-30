const api_url = 'http://localhost:8080' + '/api/v1/register'

export default async function register(username: string, password:string){
    const response = await fetch(api_url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(function(response){
        return response.json
    }).then(function(data){
        alert(data);
    })
}