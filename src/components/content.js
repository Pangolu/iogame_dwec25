export { renderContent };

function construirArray(numero) {
  const array = [];
  for (let i = 0; i < numero; i++) {
    array.push(i);
  }
  return array;
}

function renderContent() {
  const contenidorContent = document.createElement("div");
  const numeroCaselles = `<label for="num-caselles">Numero de caselles</label>
  <input type="text" id="num-caselles" name="num-caselles" placeholder="0"/>
  <button type="button" id="boto-entrada">Seleccionar</button>
  <div id="contenidor-tauler"></div>
  `;
  contenidorContent.innerHTML = numeroCaselles;

  const entrada = contenidorContent.querySelector("#num-caselles");
  const botoEntrada = contenidorContent.querySelector("#boto-entrada");
  const contenidorTauler = contenidorContent.querySelector("#contenidor-tauler");

  botoEntrada.addEventListener("click", () => {
    const valor = parseInt(entrada.value);
    const arrayCaselles = construirArray(valor);
    let casellesHtml = "";
    arrayCaselles.forEach((index) => {
      casellesHtml += `<div class="celda" data-posicio="${index}">
    ${index}
    </div>
    `;
    });
    contenidorTauler.innerHTML = `

    <div id="tauler">
    ${casellesHtml}
    </div>

  `;
  })

  //Creem array plena de numeros amb la posicio que ocupen

  //Ara ja tenim l'HTML amb totes les caselles
  //Afegim al HTML

  return contenidorContent;
}
