import "./style.scss";

import { router } from "./router";

import { renderNav } from "./components/header";
import { renderContent } from "./components/content";
import "./webcomponents/footer-component";

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
    const footerComponent = document.createElement('footer-component');
    footerContainer.append(footerComponent);
  }

    router(window.location.hash, mainContainer);
  window.addEventListener("hashchange", () => {
    router(window.location.hash, mainContainer);
  });
});
