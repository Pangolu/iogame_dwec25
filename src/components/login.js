export { renderLogin };

import { login, register } from "../services/supaservice";

const renderLogin = (method) => () => {
  const text = `
   <h1>${method === 'login' ? 'Login' : 'Register'}</h1>
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

              <button id="submit-login" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">${method === 'login' ? 'Login' : 'Register'}</button>

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
// ! conexion login y registro supabase START
  // const SUPABASE_KEY =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrbWhtaGhhaXN1cWp6YmxhdWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MDg5NDksImV4cCI6MjA3NjQ4NDk0OX0.fyHk2DNUelf5D2Wu7CAvHafyGkHmy1oC9towPO9b3mI";
  // const loginBtn = document.querySelector("#loginBtn");
  // loginBtn.addEventListener("click", async () => {
  //   let signUpObject = {
  //     email: document.querySelector("#userEmail").value.trim(),
  //     password: document.querySelector("#userPwd").value.trim(),
  //   };

  //   console.log(signUpObject.email);
  //   console.log(signUpObject.pwd);
  //   let response = await fetch(
  //     "https://ikmhmhhaisuqjzblauiu.supabase.co/auth/v1/token?grant_type=password",
  //     {
  //       method: "post",
  //       headers: {
  //         apiKey: SUPABASE_KEY,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(signUpObject),
  //     }
  //   );
  //   let data = await response.json();
  //   document.querySelector("#userInfo").innerHTML = JSON.stringify(
  //     data.user.user_metadata
  //   );
  //   let access_token = data.access_token;
  //   console.log(access_token);
  // });
  const divLogin = document.createElement("div");
  divLogin.classList.add("container", "w-25", "vh-100");
  divLogin.innerHTML = text;

  const form = divLogin.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const dataLogin = Object.fromEntries(formData);
    if (method === "login") {
      login(dataLogin);
    } else {
      register(dataLogin);
    }
    form.reset();
  });


  return divLogin;
}