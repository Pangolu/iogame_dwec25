export { renderComJugar }

function renderComJugar() {
  const div = document.createElement("div");
  div.innerHTML = `
    <section class="com-jugar-section" style="background-color: #212529; color: white; padding: 2rem; min-height: 100vh;">
      <div class="container" style="max-width: 1000px;">
        
        <h1 class="text-center mb-5" style="font-size: 2.5rem; color: #ffc107;">Com jugar a Primary Colors</h1>
        
        <div class="row mb-5">
          <div class="col-md-12">
            <h2 style="color: #0d6efd;">Objectiu del joc</h2>
            <p style="font-size: 1.1rem; line-height: 1.8;">
              L'objectiu és crear fitxes de colors secundaris combinant colors primaris. 
              Pots eliminar grups de fitxes del mateix color juntant-ne 3, però pedràs punts. 
              El joc acaba quan alguna columna es plena completament.
            </p>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col-md-12">
            <h2 style="color: #0d6efd;">Sistema de Punts</h2>
            <table class="table table-dark table-striped" style="font-size: 1.1rem;">
              <thead>
                <tr>
                  <th style="color: #ffc107;">Acció</th>
                  <th style="color: #ffc107;">Punts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Combinar 2 colors primaris → Color secundari</td>
                  <td><span style="color: #28a745; font-weight: bold;">+4 punts</span></td>
                </tr>
                <tr>
                  <td>Eliminar 3+ fitxes primàries (del mateix color)</td>
                  <td><span style="color: #dc3545; font-weight: bold;">-3 punts</span></td>
                </tr>
                <tr>
                  <td>Eliminar 3+ fitxes secundàries (del mateix color)</td>
                  <td><span style="color: #dc3545; font-weight: bold;">-10 punts</span></td>
                </tr>
                <tr>
                  <td>Crear una fitxa negra</td>
                  <td><span style="color: #28a745; font-weight: bold;">+8 punts</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col-md-12">
            <h2 style="color: #0d6efd;">Normes Importants</h2>
            <ul style="font-size: 1.1rem; line-height: 2;">
              <li><strong>Eliminació automàtica:</strong> Quan 3 o més fitxes del mateix color es toquen (no només en línia recta), s'eliminen automàticament.</li>
              <li><strong>Cascada:</strong> Després d'eliminar fitxes, la gravetat fa que les fitxes superiors caiguin per omplir buits.</li>
              <li><strong>Fitxes negres permanents:</strong> Les fitxes negres NO s'eliminen mai. Ocupen espai al tauler.</li>
              <li><strong>Límit de columna:</strong> Quan una columna es plena completament, el joc acaba.</li>
              <li><strong>Moviment llimitat:</strong> Només pots moure la fitxa horitzontalment mentre està caient.</li>
              <li><strong>Velocitat:</strong> Les fitxes cauen automàticament</li>
            </ul>
          </div>
        </div>

        <div class="row text-center mb-5">
          <div class="col-md-12">
            <a href="#game" class="btn btn-primary btn-lg" style="background-color: #0d6efd; border: none; padding: 0.75rem 2rem; font-size: 1.1rem;">
              ▶️ Jugar ara!
            </a>
          </div>
        </div>

      </div>
    </section>
  `;
  return div;
}
