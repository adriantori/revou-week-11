export default function trimCookie(){
    const cookies = document.cookie.split(';');
    let token = '';
    let username = '';
    
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'token') { // Adjust the cookie name if needed
            token = value;
        }else if (name.trim() === 'userName') { // Adjust the cookie name if needed
            username = value;
        }
    }
    
    if (token === '') {
        console.log("Token not found in cookies!");
        window.location.href = "/";
    }
    return {token, username};
}

