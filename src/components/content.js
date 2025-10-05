export { renderContent };

function construirArray(numero) {
  const array = [];
  for (let i = 0; i < numero; i++) {
    array.push(i);
  }
  return array;
}

function renderContent() {
  const numeroCaselles = `<label for="num-caselles">Numero de caselles</label>
  <input type="text" id="num-caselles" name="num-caselles" placeholder="0"/>
  <button type= "button">Seleccionar</button>
  `;
  const numeroEscollit = document.querySelector("#num-caselles").value;
  //Creem array plena de numeros amb la posicio que ocupen
  const arrayCaselles = construirArray(numeroEscollit);
  let casellesHtml = "";
  arrayCaselles.forEach((index) => {
    casellesHtml += `<div class="celda" data-posicio="${index}">
    ${index}
    </div>
    `;
  });
  //Ara ja tenim l'HTML amb totes les caselles
  //Afegim al HTML
  const contenidorTauler = `
  <div class="contenidor-tauler">
    <div class="casella">
    ${casellesHtml}
    </div>
  </div>
  `;

  return numeroCaselles + contenidorTauler;
}
