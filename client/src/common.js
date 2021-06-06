import axios from "axios";

axios.defaults.withCredentials = true;

export function login(email, password) {
    return axios.post(
        'http://localhost:3001/auth/login',
        {email: email, password: password}
    );
}

export function register(name, surname, email, password) {
    return axios.post(
        'http://localhost:3001/auth/register',
        {name: name, surname: surname, email: email, password: password}
    );
}

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function getIdFromCookie() {
    const cookie = getCookie("jwt");
    if (!cookie) return undefined;

    return JSON.parse(atob(getCookie("jwt")
        .split('.')[1]))
        .id;
}

export function logout() {
    axios.post(
        'http://localhost:3001/auth/logout'
    )
}