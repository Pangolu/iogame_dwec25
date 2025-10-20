import {rendercontent} from "./components/content";
import {renderfooter} from "./components/footer";
import {renderheader} from "./components/header";
import {registre} from "./components/register";
export {router};

const routes = new Map([
    ['#', rendercontent],
    ['#joc', rendercontent],
    ['#registre', registre]
]);

function router(route,container){
    if(routes.has(route)){
        container.replaceChildren(routes.get(route)());
    }
    else {
        container.innerHTML = `<h2>404</h2>`
    }
}