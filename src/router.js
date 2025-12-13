import { renderContent } from "./components/content";
import { renderLogin } from "./components/login";
import { renderRegistre } from "./components/register";
import { renderComJugar } from "./components/comjugar";

export {router}

const routes = new Map([
    ['',renderContent],
    ['#game',renderContent],
    ['#login',renderLogin],
    ['#registre', renderRegistre],
    ['#comjugar', renderComJugar]
])


function router(route,container){
    if(routes.has(route)){
        container.replaceChildren(routes.get(route)());
    }
    else {
        container.innerHTML = `<h2>404</h2>`
    }
}