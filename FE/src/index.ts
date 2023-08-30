import register from "./register.js";


//get Register form
const formRegister = document.getElementById('register-form') as HTMLFormElement;

formRegister?.addEventListener('submit', (event) => {
    event.preventDefault();

    const username : string = (document.getElementById('username') as HTMLInputElement).value
    const password : string = (document.getElementById('password') as HTMLInputElement).value
    const passwordConf : string = (document.getElementById('passwordConf') as HTMLInputElement).value

    if(password === passwordConf){
        register(username, password);
    }else{
        alert("Password confirmation incorrect")
    }
})