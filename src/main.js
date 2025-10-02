import './style.scss'
// eslint-disable-next-line
import * as bootstrap from 'bootstrap';
import { renderHeader } from './components/header'
import {renderFooter} from './components/footer'
import {renderContent} from './components/content'


document.addEventListener("DOMContentLoaded", () => {
     renderHeader();
})