import "./style.scss";

import * as bootstrap from "bootstrap";
import { renderNav } from "./components/header";
import { renderFooter } from "./components/footer";
import { renderContent } from "./components/content";

document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.querySelector("nav");
  if (navContainer) {
    navContainer.innerHTML = renderNav();
  }

  const mainContainer = document.querySelector("main");
  if (mainContainer) {
    mainContainer.append(renderContent());
  }

  const footerContainer = document.querySelector("footer");
  if (footerContainer) {
    footerContainer.innerHTML = renderFooter();
  }
});
