import login from "./login.js";
import register from "./register.js";

document.addEventListener('DOMContentLoaded', () => {
    const formRegister = document.getElementById('registerForm');
    formRegister?.addEventListener('submit', (event) => {
        event.preventDefault();
        const username: string = (document.getElementById('username') as HTMLInputElement).value;
        const password: string = (document.getElementById('password') as HTMLInputElement).value;
        const passwordConf: string = (document.getElementById('passwordConf') as HTMLInputElement).value;
        console.log(username, password, passwordConf);
        if (password == passwordConf) {
            try {
                register(username, password)
            } catch (error) {
                alert(error);
            }
        } else {
            alert("Password mismatch");
        }
    });
    
    const formLogin = document.getElementById('loginForm');
    formLogin?.addEventListener('submit', (event) => {
        event.preventDefault();
        const loginUsername: string = (document.getElementById('loginUsername') as HTMLInputElement).value;
        const loginPassword: string = (document.getElementById('loginPassword') as HTMLInputElement).value;
        console.log(loginUsername, loginPassword)
        try {
            login(loginUsername, loginPassword)
        } catch (error) {
            alert(error);
        }

    });
});
