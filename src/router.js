import {rendercontent} from "./components/content";
import {renderfooter} from "./components/footer";
import {renderheader} from "./components/header";

const routes = new Map([
    ['#', rendercontent],
    ['#game', rendercontent]
    ['#login', rendercontent]
])