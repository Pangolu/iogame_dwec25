export { renderLogin };

import { login } from "../services/supaservice";

function renderLogin() {
  const text = `
<section class="vh-100 gradient-custom" style="background-image: url(https://miro.medium.com/v2/1*3l_gNnYqeGpwNUoQEYGM9w.jpeg); background-size: cover; background-position: center;">
  <div class="container py-5 h-100" >
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5" >
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">Inicia sessió</h2>
              <p class="text-white-50 mb-5">Si us plau, introdueix el teu email i contrasenya</p>

              <form id="form-login">
                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <label class="form-label" for="login-email">Email</label>
                  <input type="email" id="login-email" name="email" class="form-control form-control-lg" required/>
                </div>

                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <label class="form-label" for="login-password">Contrasenya</label>
                  <input type="password" id="login-password" name="password" class="form-control form-control-lg" required minlength="6"/>
                </div>

                <div id="missatge-login" style="display: none; margin-bottom: 1rem;"></div>

                <button id="submit-login" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Iniciar sessió</button>
              </form>

            </div>

            <div>
              <p class="mb-0">No tens compte? <a href="#registre" class="text-white-50 fw-bold">Registra't</a></p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

  const divLogin = document.createElement("div");
  divLogin.innerHTML = text;

  const form = divLogin.querySelector("#form-login");
  const missatgeDiv = divLogin.querySelector("#missatge-login");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    const dataLogin = Object.fromEntries(formData);
    
    // Mostrar missatge de càrrega
    missatgeDiv.style.display = "block";
    missatgeDiv.className = "alert alert-info";
    missatgeDiv.textContent = "Iniciant sessió...";
    
    try {
      await login(dataLogin);
      
      // Mostrar missatge d'èxit
      missatgeDiv.className = "alert alert-success";
      missatgeDiv.textContent = "Sessió iniciada amb èxit! Redirigint...";
      
      // Netejar formulari
      form.reset();
      
      // Redirigir al joc després d'1 segon
      setTimeout(() => {
        window.location.hash = "#game";
      }, 1000);
      
    } catch (error) {
      console.error("Error en el login:", error);
      missatgeDiv.className = "alert alert-danger";
      missatgeDiv.textContent = error.msg || error.message || "Error en iniciar sessió. Comprova les credencials.";
    }
  });

  return divLogin;
}
