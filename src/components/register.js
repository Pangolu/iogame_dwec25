export { renderRegistre }

import { register } from "../services/supaservice";

function renderRegistre() {
  const text = `<section class="vh-100" style="background-color: #c7c7c7ff;">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registre</p>

                <form id="form-registre" class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <label class="form-label" for="registre-email">Email</label>
                      <input type="email" id="registre-email" name="email" class="form-control" style="border: 1px solid;" placeholder="Email" required/>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <label class="form-label" for="registre-password">Contrasenya</label>
                      <input type="password" id="registre-password" name="password" class="form-control" style="border: 1px solid;" placeholder="Contrasenya (mínim 6 caràcters)" required minlength="6"/>
                    </div>
                  </div>
                  
                  <div id="missatge-registre" style="display: none; margin-bottom: 1rem;"></div>
                  
                  <br>
                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg">Registre</button>
                  </div>
                  
                  <div class="text-center">
                    <p class="mb-0">Ja tens compte? <a href="#login" class="text-primary fw-bold">Inicia sessió</a></p>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img src="https://aprendercine.b-cdn.net/wp-content/uploads/2018/08/colores-primarios-y-secundarios-aprendercine.jpg"
                  class="img-fluid" alt="Colors primaris i secundaris">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

  const div = document.createElement('div');
  div.innerHTML = text;
  
  // Afegir event listener al formulari
  const form = div.querySelector("#form-registre");
  const missatgeDiv = div.querySelector("#missatge-registre");
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    const dataRegistre = Object.fromEntries(formData);
    
    // Mostrar missatge de càrrega
    missatgeDiv.style.display = "block";
    missatgeDiv.className = "alert alert-info";
    missatgeDiv.textContent = "Registrant usuari...";
    
    try {
      await register(dataRegistre);
      
      // Mostrar missatge d'èxit
      missatgeDiv.className = "alert alert-success";
      missatgeDiv.textContent = "Registre completat amb èxit! Revisa el teu correu per confirmar el compte.";
      
      // Netejar formulari
      form.reset();
      
      // Redirigir al login després de 2 segons
      setTimeout(() => {
        window.location.hash = "#login";
      }, 2000);
      
    } catch (error) {
      console.error("Error en el registre:", error);
      missatgeDiv.className = "alert alert-danger";
      missatgeDiv.textContent = error.message || "Error en el registre. Si us plau, intenta-ho de nou.";
    }
  });
  
  return div;
}
