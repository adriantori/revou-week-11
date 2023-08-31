import login from "./login.js";
import register from "./register.js";
document.addEventListener('DOMContentLoaded', () => {
    const formRegister = document.getElementById('registerForm');
    formRegister === null || formRegister === void 0 ? void 0 : formRegister.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const passwordConf = document.getElementById('passwordConf').value;
        console.log(username, password, passwordConf);
        if (password == passwordConf) {
            try {
                register(username, password);
            }
            catch (error) {
                alert(error);
            }
        }
        else {
            alert("Password mismatch");
        }
    });
    const formLogin = document.getElementById('loginForm');
    formLogin === null || formLogin === void 0 ? void 0 : formLogin.addEventListener('submit', (event) => {
        event.preventDefault();
        const loginUsername = document.getElementById('loginUsername').value;
        const loginPassword = document.getElementById('loginPassword').value;
        console.log(loginUsername, loginPassword);
        try {
            login(loginUsername, loginPassword);
        }
        catch (error) {
            alert(error);
        }
    });
});
