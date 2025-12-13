export function renderNav() {
  const nav = document.createElement("nav");
  nav.className = "navbar bg-dark justify-content-center";

  const usuariId = localStorage.getItem('user_id');
  const usuariEmail = localStorage.getItem('user');
  const estaAutenticat = !!usuariId;

  nav.innerHTML = `
    <ul class="navbar-nav flex-row">
      <li class="nav-item mx-3">
        <a class="nav-link active text-white" href="#game">Primary Colors</a>
      </li>
      <li class="nav-item mx-3">
        <a class="nav-link text-white" href="#comjugar">Com jugar</a>
      </li>
      ${!estaAutenticat ? `
        <li class="nav-item mx-3">
          <a class="nav-link text-white" href="#registre">Registre</a>
        </li>
        <li class="nav-item mx-3">
          <a class="nav-link text-white" href="#login">Iniciar Sessió</a>
        </li>
      ` : `
        <li class="nav-item mx-3">
          <span class="nav-link text-white" style="cursor: default;">👤 ${usuariEmail}</span>
        </li>
        <li class="nav-item mx-3">
          <a class="nav-link text-white" href="#" id="boto-logout">Tancar Sessió</a>
        </li>
      `}
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

  const botoLogout = nav.querySelector("#boto-logout");
  if (botoLogout) {
    botoLogout.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expires_in');
      localStorage.removeItem('user');
      localStorage.removeItem('user_id');
      
      alert("Sessió tancada correctament!");
      
      window.location.hash = "#login";
      
      setTimeout(() => {
        location.reload();
      }, 500);
    });
  }

  return nav;
}
