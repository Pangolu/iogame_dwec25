export function renderNav() {
  const nav = document.createElement("nav");
  nav.className = "navbar bg-dark justify-content-center";

  nav.innerHTML = `
    <ul class="navbar-nav flex-row">
      <li class="nav-item mx-3">
        <a class="nav-link active text-white" href="#game">Primary Colors</a>
      </li>
      <li class="nav-item mx-3">
        <a class="nav-link text-white" href="#">Estadístiques</a>
      </li>
      <li class="nav-item mx-3">
        <a class="nav-link text-white" href="#registre">Registre</a>
      </li>
      <li class="nav-item mx-3">
        <a class="nav-link text-white" href="#login">Iniciar Sessió</a>
      </li>
    </ul>
  `;

  const primaryColors = ["#0d6efd", "#dc3545", "#198754", "#ffc107", "#6610f2"];

  const links = nav.querySelectorAll(".nav-link");

  links.forEach(link => {
    link.addEventListener("mouseenter", () => {
      const randomColor = primaryColors[Math.floor(Math.random() * primaryColors.length)];
      link.style.setProperty("color", randomColor, "important");
    });

    link.addEventListener("mouseleave", () => {
      link.style.setProperty("color", "white", "important");
    });
  });

  return nav;
}
