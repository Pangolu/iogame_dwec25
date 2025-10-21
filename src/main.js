import "./style.scss";

import { router } from "./router";

import * as bootstrap from "bootstrap";
import { renderNav } from "./components/header";
import { renderFooter } from "./components/footer";
import { renderContent } from "./components/content";

document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.querySelector("#nav");
  if (navContainer) {
    navContainer.append(renderNav());
  }

  const mainContainer = document.querySelector("#app");
  if (mainContainer) {
    mainContainer.append(renderContent());
  }

  const footerContainer = document.querySelector("#footer");
  if (footerContainer) {
    footerContainer.append(renderFooter());
  }

    router(window.location.hash, mainContainer);
  window.addEventListener("hashchange", () => {
    router(window.location.hash, mainContainer);
  });
});
