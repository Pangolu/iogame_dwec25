import { renderContent } from "./components/content";
import { renderLogin } from "./components/login";
import { renderRegistre } from "./components/register";
import { renderComJugar } from "./components/comjugar";

export {router}

const routes = new Map([
    ['',renderRegistre],
    ['#game',renderContent],
    ['#login',renderLogin],
    ['#registre', renderRegistre],
    ['#comjugar', renderComJugar]
])

function isAuthenticated() {
    return localStorage.getItem('access_token') !== null;
}

function router(route,container){
    if (route === '' || route === '#game') {
        if (!isAuthenticated()) {
            window.location.hash = '#registre';
            container.replaceChildren(renderRegistre());
            return;
        }
    }
    
    if(routes.has(route)){
        container.replaceChildren(routes.get(route)());
    }
    else {
        container.innerHTML = `<h2>404</h2>`
    }
}