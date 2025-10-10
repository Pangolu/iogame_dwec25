export { renderContent };

function construirArray(numero) {
  const array = [];
  for (let i = 0; i < numero; i++) {
    array.push(i);
  }
  return array;
}

function crearTauler(mida){
  let filesHtml = "";
let casella = 0;
  for (let i = 0; i < mida; i++) {
    filesHtml += `<div class="files-tauler">`;
    for (let j = 0; j < mida; j++) {
      filesHtml += `<div class="celda" data-posicio="${casella}">
        ${casella}
        </div>
        `;
      casella++;
    }
    filesHtml += `</div>`;
  }
return filesHtml;
}

function renderContent() {


  const contenidorContent = document.createElement("div");
  contenidorContent.id = "contingut";
  const numeroCaselles = `<div id="seleccio-mida-tauler">
  <button type="button" class="seleccio-grandaria" id="boto-entrada-25" value="5">5 x 5</button>
  <button type="button" class="seleccio-grandaria" id="boto-entrada-36" value="6">6 x 6</button>
  <button type="button" class="seleccio-grandaria" id="boto-entrada-49" value="7">7 x 7</button>
  <button type="button" class="inici" id="boto-inici">Inici</button>
  `;

  const colocarMida = document.createElement("div");
  colocarMida.innerHTML = numeroCaselles;
  contenidorContent.append(colocarMida);

  const botonsMida = contenidorContent.querySelectorAll(".seleccio-grandaria");
  const contenidorTauler = document.createElement("div");
  contenidorTauler.id = "contenidor-tauler";
  let filesHtml = crearTauler(5);
  
  contenidorTauler.innerHTML = `
        <div id="tauler">
        ${filesHtml}
        </div>
        `;
  botonsMida.forEach((e) => {
    e.addEventListener("click", () => {
      console.log("1");
      const mida = parseInt(e.value);
      
      let filesHtml = crearTauler(mida);

      console.log("3");
      contenidorTauler.innerHTML = `
        <div id="tauler">
        ${filesHtml}
        </div>
        `;
    });
  });
  const arrayCaselles = construirArray();
  contenidorContent.append(contenidorTauler);
  return contenidorContent;
}
