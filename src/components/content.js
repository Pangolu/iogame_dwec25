export { renderContent };

//CONSTRUIM L'ARRAY
function construirArrayTauler(numero) {

  const arrayTauler = [];
  for (let i = 0; i < numero; i++) {
    const fila = []
    for (let j = 0; j < numero; j++) {

      fila.push({
        valor: 0,
        color: "white"//colorAleatori
      });
    }
    arrayTauler.push(fila);
  }
  return arrayTauler;
}

//CREEM EL TAULER PER POSAR-LO AL DOM
function crearTauler(mida, arrayCaselles) {
  let filesHtml = "";
  for (let i = 0; i < mida; i++) {
    filesHtml += `<div class="files-tauler">`;
    for (let j = 0; j < mida; j++) {
      const { valor, color } = arrayCaselles[i][j];
      filesHtml += `<div class="celda" data-fila="${i}" data-columna="${j}" style="background-color: ${color};">
        ${valor}
        </div>
        `;
    }
    filesHtml += `</div>`;
  }
  return filesHtml;
}

function actualitzarTauler(contenidor, arrayCaselles) {
  const mida = arrayCaselles.length;
  let filesHtml = "";
  for (let i = 0; i < mida; i++) {
    filesHtml += `<div class="files-tauler">`;
    for (let j = 0; j < mida; j++) {
      const { valor, color } = arrayCaselles[i][j];
      filesHtml += `<div class="celda" data-fila="${i}" data-columna="${j}" style="background-color: ${color};">
      ${valor}
      </div>`;
    }
    filesHtml += `</div>`;
  }
  contenidor.innerHTML = `<div id="tauler">${filesHtml}</div>`;
}

function renderContent() {

  const contenidorContent = document.createElement("div");
  contenidorContent.id = "contingut";
  const numeroCaselles = `<div id="seleccio-mida-tauler">
  <button type="button" class="seleccio-grandaria" id="boto-entrada-25" value="5">5 x 5</button>
  <button type="button" class="seleccio-grandaria" id="boto-entrada-36" value="6">6 x 6</button>
  <button type="button" class="seleccio-grandaria" id="boto-entrada-49" value="7">7 x 7</button>
  <button type="button" class="inici" id="boto-inici">Inici</button>
  </div>
  `;

  const colocarMida = document.createElement("div");
  colocarMida.innerHTML = numeroCaselles;
  contenidorContent.append(colocarMida);

  const botonsMida = contenidorContent.querySelectorAll(".seleccio-grandaria");
  const contenidorTauler = document.createElement("div");
  contenidorTauler.id = "contenidor-tauler";

  let estatCaselles;

  const botoInici = contenidorContent.querySelector("#boto-inici");

  //SELECCIONEM LA MIDA DEL TAULER
  botonsMida.forEach((e) => {
    e.addEventListener("click", () => {
      botoInici.disabled = false;
      const mida = parseInt(e.value);
      estatCaselles = construirArrayTauler(mida);

      let filesHtml = crearTauler(mida, estatCaselles);

      contenidorTauler.innerHTML = `
        <div id="tauler">
        ${filesHtml}
        </div>
        `;
    });
  });

  const colors = ["magenta", "cyan", "yellow"];

  //COMENÇA LA PARTIDA, EL BOTO DE INICI QUEDA DESACTIVAT PERA QUE NO ES PUGA GENERAR UN ALTRE QUADRAT  
  botoInici.addEventListener("click", () => {
    if (!estatCaselles) return;

    botoInici.disabled = true;
    const mida = estatCaselles.length;

    function generarFitxaNova() {
      let columna = Math.floor(Math.random() * estatCaselles[0].length);
      const colorAleatori = colors[Math.floor(Math.random() * colors.length)];
      let filaActual = 0;

      estatCaselles[0][columna] = {
        valor: 1,
        color: colorAleatori
      };

      actualitzarTauler(contenidorTauler, estatCaselles);

      function moureFitxa(e) {

        if (filaActual === mida - 1 || estatCaselles[filaActual + 1][columna].valor !== 0) return;

        if (e.key === "ArrowLeft" && columna > 0 && estatCaselles[filaActual][columna - 1].valor === 0) {
          estatCaselles[filaActual][columna - 1] = estatCaselles[filaActual][columna];
          estatCaselles[filaActual][columna] = { valor: 0, color: "white" };
          columna--;
          actualitzarTauler(contenidorTauler, estatCaselles);
        }
        if (e.key === "ArrowRight" && columna < estatCaselles[0].length - 1 && estatCaselles[filaActual][columna + 1].valor === 0) {
          // Mover a la derecha
          estatCaselles[filaActual][columna + 1] = estatCaselles[filaActual][columna];
          estatCaselles[filaActual][columna] = { valor: 0, color: "white" };
          columna++;
          actualitzarTauler(contenidorTauler, estatCaselles);
        }
      }

      document.addEventListener("keydown", moureFitxa);

      const intervalId = setInterval(() => {

        if (
          filaActual === mida - 1 ||
          estatCaselles[filaActual + 1][columna].valor !== 0
        ) {
          clearInterval(intervalId);

          setTimeout(() => {
            generarFitxaNova();
          }, 500);

          return;
        }
        estatCaselles[filaActual + 1][columna] = estatCaselles[filaActual][columna];
        estatCaselles[filaActual][columna] = { valor: 0, color: "white" };

        filaActual++;
        actualitzarTauler(contenidorTauler, estatCaselles);
      }, 500);
    }
    generarFitxaNova();
  });

  contenidorContent.append(contenidorTauler);
  return contenidorContent;
}
