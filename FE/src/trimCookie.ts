export default function trimCookie(){
    const cookies = document.cookie.split(';');
    let token = '';
    
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'token') { // Adjust the cookie name if needed
            token = value;
        }
    }
    
    if (token === '') {
        console.log("Token not found in cookies");
        window.location.href = "/";
    }
    return token;
}

