export { renderLogin };

function renderLogin() {
  const text = `
<section class="vh-100 gradient-custom" style="background-image: url(https://miro.medium.com/v2/1*3l_gNnYqeGpwNUoQEYGM9w.jpeg);">
  <div class="container py-5 h-100" >
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5" >
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">Inicia sessió</h2>
              <br>
              <div data-mdb-input-init class="form-outline form-white mb-4">
                <label class="form-label" for="typeEmailX">Email</label>
                <input type="email" id="typeEmailX" class="form-control form-control-lg"/>
              </div>

              <div data-mdb-input-init class="form-outline form-white mb-4">
                <label class="form-label" for="typePasswordX">Contrasenya</label>
                <input type="password" id="typePasswordX" class="form-control form-control-lg"/>
              </div>

              <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Has oblidat la teua contrasenya?</a></p>

              <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Inicia sessió</button>

            </div>

            <div>
              <p class="mb-0">No tens compte? <a href="#registre" class="text-white-50 fw-bold">Registra't</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

  const div = document.createElement('div')
  div.innerHTML = text;
  return div;
}