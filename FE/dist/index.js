import register from "./register.js";
//get Register form
const formRegister = document.getElementById('register-form');
formRegister === null || formRegister === void 0 ? void 0 : formRegister.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordConf = document.getElementById('passwordConf').value;
    if (password === passwordConf) {
        register(username, password);
    }
    else {
        alert("Password confirmation incorrect");
    }
});
