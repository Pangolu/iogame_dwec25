export { renderContent };

//CONSTRUIM L'ARRAY
function construirArrayTauler(numero) {
  const arrayTauler = [];
  for (let i = 0; i < numero; i++) {
    const fila = []
    for (let j = 0; j < numero; j++) {
      fila.push({
        valor: 0,
        color: "white"
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

// 🔥 Combinaciones de colores primarios → secundarios
function combinarColors(c1, c2) {
  const combinacions = {
    "cyan-yellow": "green",
    "yellow-cyan": "green",
    "cyan-magenta": "darkblue",
    "magenta-cyan": "darkblue",
    "yellow-magenta": "red",
    "magenta-yellow": "red"
  };
  return combinacions[`${c1}-${c2}`] || null;
}

// Comprueba si una celda está asentada (no puede bajar más)
function estaAsentada(estatCaselles, fila, col) {
  const mida = estatCaselles.length;
  if (fila === mida - 1) return true;
  return estatCaselles[fila + 1][col].valor !== 0;
}

// Aplica gravedad en todo el tablero: las fichas caen hasta apoyarse
function aplicarGravedad(estatCaselles) {
  const mida = estatCaselles.length;
  for (let col = 0; col < mida; col++) {
    // Para cada columna, empezamos por abajo y arrastramos fichas hacia abajo
    let writeRow = mida - 1; // posición donde escribimos la próxima ficha no-blanca
    for (let readRow = mida - 1; readRow >= 0; readRow--) {
      if (estatCaselles[readRow][col].valor !== 0) {
        if (writeRow !== readRow) {
          estatCaselles[writeRow][col] = { ...estatCaselles[readRow][col] };
          estatCaselles[readRow][col] = { valor: 0, color: "white" };
        }
        writeRow--;
      }
    }
    // las filas por encima de writeRow ya están en blanco
    for (let r = writeRow; r >= 0; r--) {
      estatCaselles[r][col] = { valor: 0, color: "white" };
    }
  }
}

// Detección y eliminación de tríos iguales (horizontal y vertical).
// Si encuentra al menos un trío, los elimina (los pone a blanco) y devuelve true.
// Esta función elimina TODOS los tríos detectados en un barrido (no solo 1).
function eliminarTriosIguales(estatCaselles) {
  const mida = estatCaselles.length;
  // marcar celdas a eliminar
  const aEliminar = Array.from({ length: mida }, () => Array(mida).fill(false));
  let found = false;

  // horizontal
  for (let i = 0; i < mida; i++) {
    for (let j = 0; j <= mida - 3; j++) {
      const c1 = estatCaselles[i][j];
      const c2 = estatCaselles[i][j + 1];
      const c3 = estatCaselles[i][j + 2];
      if (c1.valor !== 0 && c1.color === c2.color && c2.color === c3.color) {
        // solo considerar colores no-white
        if (c1.color && c1.color !== "white") {
          aEliminar[i][j] = aEliminar[i][j + 1] = aEliminar[i][j + 2] = true;
          found = true;
        }
      }
    }
  }

  // vertical
  for (let j = 0; j < mida; j++) {
    for (let i = 0; i <= mida - 3; i++) {
      const c1 = estatCaselles[i][j];
      const c2 = estatCaselles[i + 1][j];
      const c3 = estatCaselles[i + 2][j];
      if (c1.valor !== 0 && c1.color === c2.color && c2.color === c3.color) {
        if (c1.color && c1.color !== "white") {
          aEliminar[i][j] = aEliminar[i + 1][j] = aEliminar[i + 2][j] = true;
          found = true;
        }
      }
    }
  }

  if (!found) return false;

  // eliminar marcadas
  for (let i = 0; i < mida; i++) {
    for (let j = 0; j < mida; j++) {
      if (aEliminar[i][j]) {
        estatCaselles[i][j] = { valor: 0, color: "white" };
      }
    }
  }

  return true;
}

// Gestionar tríada negra específica (violet + green + red).
// Comprueba si en horizontal o vertical en torno a (fila,col) están violet, green y red (en cualquier orden).
// Si se cumple, deja la casilla central negra y elimina las otras dos (devuelve true si hizo algo).
function gestionarTriadaNegraSiCorrespon(estatCaselles, fila, col) {
  const mida = estatCaselles.length;
  const requerida = ["darkblue", "green", "red"];

  // helper para comprobar array de 3 colores
  function esTriada(arr) {
    if (arr.some(c => !c || c === "white")) return false;
    const set = new Set(arr);
    if (set.size !== 3) return false; // deben ser los tres distintos
    return arr.every(c => requerida.includes(c));
  }

  // horizontal: [col-1, col, col+1]
  if (col - 1 >= 0 && col + 1 < mida) {
    const arr = [
      estatCaselles[fila][col - 1].color,
      estatCaselles[fila][col].color,
      estatCaselles[fila][col + 1].color
    ];
    if (esTriada(arr)) {
      // central a negro, las otras dos eliminadas
      estatCaselles[fila][col] = { valor: 1, color: "black" };
      estatCaselles[fila][col - 1] = { valor: 0, color: "white" };
      estatCaselles[fila][col + 1] = { valor: 0, color: "white" };
      return true;
    }
  }

  // vertical: [fila-1, fila, fila+1]
  if (fila - 1 >= 0 && fila + 1 < mida) {
    const arr = [
      estatCaselles[fila - 1][col].color,
      estatCaselles[fila][col].color,
      estatCaselles[fila + 1][col].color
    ];
    if (esTriada(arr)) {
      estatCaselles[fila][col] = { valor: 1, color: "black" };
      estatCaselles[fila - 1][col] = { valor: 0, color: "white" };
      estatCaselles[fila + 1][col] = { valor: 0, color: "white" };
      return true;
    }
  }

  return false;
}

// Ejecuta cascada de fusiones y eliminaciones hasta estabilizar:
// - Intentar merges binarios (primarios distintos → secundario) entre celdas asentadas
//   (horizontal y vertical) respetando la posición de la "primera" ficha.
// - Luego, intentar formar la tríada negra en posiciones centrales afectadas.
// - Luego, eliminar tríos iguales (C: las 3 desaparecen).
// Repite aplicarGravedad + estos pasos hasta que no ocurra nada.
function estabilizarBoard(estatCaselles) {
  const mida = estatCaselles.length;
  let changed = true;

  while (changed) {
    changed = false;

    // 1) Merges binarios entre celdas asentadas
    let mergedThisPass = false;
    outerLoop:
    for (let i = 0; i < mida; i++) {
      for (let j = 0; j < mida; j++) {
        const cell = estatCaselles[i][j];
        if (cell.valor === 0) continue;
        // Solo consideramos merges con primarios
        const primarios = ["cyan", "magenta", "yellow"];
        if (!primarios.includes(cell.color)) continue;
        // Solo si la celda está asentada
        if (!estaAsentada(estatCaselles, i, j)) continue;

        // Vertical: [i][j] con [i+1][j] -> resultado en la posición inferior
        if (i + 1 < mida && estatCaselles[i + 1][j].valor !== 0) {
          const abajo = estatCaselles[i + 1][j];
          if (primarios.includes(abajo.color) && abajo.color !== cell.color) {
            const nuevo = combinarColors(cell.color, abajo.color);
            if (nuevo) {
              // resultado en la posición inferior (porque ya estaba)
              estatCaselles[i + 1][j] = { valor: 1, color: nuevo };
              estatCaselles[i][j] = { valor: 0, color: "white" };
              mergedThisPass = true;
              changed = true;
              break outerLoop;
            }
          }
        }

        // Horizontal derecha: [j] con [j+1]: orden [primera=current][segunda=right] => resultado en current
        if (j + 1 < mida && estatCaselles[i][j + 1].valor !== 0) {
          const right = estatCaselles[i][j + 1];
          if (primarios.includes(right.color) && right.color !== cell.color && estaAsentada(estatCaselles, i, j + 1)) {
            const nuevo = combinarColors(cell.color, right.color);
            if (nuevo) {
              estatCaselles[i][j] = { valor: 1, color: nuevo };
              estatCaselles[i][j + 1] = { valor: 0, color: "white" };
              mergedThisPass = true;
              changed = true;
              break outerLoop;
            }
          }
        }

        // Horizontal izquierda: [j-1] con [j]: orden [primera=left][segunda=current] => resultado en left
        if (j - 1 >= 0 && estatCaselles[i][j - 1].valor !== 0) {
          const left = estatCaselles[i][j - 1];
          if (primarios.includes(left.color) && left.color !== cell.color && estaAsentada(estatCaselles, i, j - 1)) {
            const nuevo = combinarColors(left.color, cell.color);
            if (nuevo) {
              estatCaselles[i][j - 1] = { valor: 1, color: nuevo };
              estatCaselles[i][j] = { valor: 0, color: "white" };
              mergedThisPass = true;
              changed = true;
              break outerLoop;
            }
          }
        }
      }
    }

    if (mergedThisPass) {
      // tras merge, comprobar triada negra en la celda donde quedó el resultado:
      aplicarGravedad(estatCaselles);
      // Buscamos la aparición de la triada negra alrededor de TODAS las celdas
      // (gestionarTriadaNegraSiCorrespon actuará si corresponde)
      let madeBlack = false;
      for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
          if (gestionarTriadaNegraSiCorrespon(estatCaselles, i, j)) {
            madeBlack = true;
          }
        }
      }
      if (madeBlack) {
        changed = true;
      }
      // aplicar gravedad después y continuar
      aplicarGravedad(estatCaselles);
      continue;
    }

    // 2) Si no hubo merges binarios, intentar triada negra generada por otras causas
    let madeBlack2 = false;
    for (let i = 0; i < mida; i++) {
      for (let j = 0; j < mida; j++) {
        if (gestionarTriadaNegraSiCorrespon(estatCaselles, i, j)) {
          madeBlack2 = true;
        }
      }
    }
    if (madeBlack2) {
      changed = true;
      aplicarGravedad(estatCaselles);
      continue;
    }

    // 3) Eliminar tríos iguales (todas las ocurrencias en un barrido)
    const eliminated = eliminarTriosIguales(estatCaselles);
    if (eliminated) {
      changed = true;
      // tras eliminar, aplicar gravedad y repetir
      aplicarGravedad(estatCaselles);
      continue;
    }

    // Si llegamos aquí -> nada más que hacer
  } // while changed
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

  botoInici.addEventListener("click", () => {
    if (!estatCaselles) return;

    botoInici.disabled = true;
    const mida = estatCaselles.length;

    function generarFitxaNova() {
      // comprobar si la fila 0 está libre en alguna columna; si no, terminar (game over simple)
      const ocupadaFila0 = estatCaselles[0].every(c => c.valor !== 0);
      if (ocupadaFila0) {
        // simple stop: no se puede generar
        console.warn("Game over: fila superior llena");
        return;
      }

      let columna = Math.floor(Math.random() * estatCaselles[0].length);
      // si la columna elegida está ocupada en fila 0, buscar otra
      let attempts = 0;
      while (estatCaselles[0][columna].valor !== 0 && attempts < estatCaselles[0].length) {
        columna = (columna + 1) % estatCaselles[0].length;
        attempts++;
      }
      const colorAleatori = colors[Math.floor(Math.random() * colors.length)];
      let filaActual = 0;

      // Colocamos temporalmente la ficha en la fila 0
      estatCaselles[0][columna] = {
        valor: 1,
        color: colorAleatori
      };

      actualitzarTauler(contenidorTauler, estatCaselles);

      // Handler de movimiento; lo declaramos para poder quitarlo más tarde
      function moureFitxa(e) {
        // sólo permitir movimiento horizontal si todavía puede caer (no está asentada)
        if (filaActual === mida - 1 || estatCaselles[filaActual + 1][columna].valor !== 0) {
          return;
        }
        if (e.key === "ArrowLeft" && columna > 0 && estatCaselles[filaActual][columna - 1].valor === 0) {
          estatCaselles[filaActual][columna - 1] = estatCaselles[filaActual][columna];
          estatCaselles[filaActual][columna] = { valor: 0, color: "white" };
          columna--;
          actualitzarTauler(contenidorTauler, estatCaselles);
        }
        if (e.key === "ArrowRight" && columna < estatCaselles[0].length - 1 && estatCaselles[filaActual][columna + 1].valor === 0) {
          estatCaselles[filaActual][columna + 1] = estatCaselles[filaActual][columna];
          estatCaselles[filaActual][columna] = { valor: 0, color: "white" };
          columna++;
          actualitzarTauler(contenidorTauler, estatCaselles);
        }
      }

      document.addEventListener("keydown", moureFitxa);

      const intervalId = setInterval(() => {
        const properaFila = filaActual + 1;

        // Si puede bajar normalmente -> bajar
        if (properaFila < mida && estatCaselles[properaFila][columna].valor === 0) {
          estatCaselles[properaFila][columna] = estatCaselles[filaActual][columna];
          estatCaselles[filaActual][columna] = { valor: 0, color: "white" };
          filaActual++;
          actualitzarTauler(contenidorTauler, estatCaselles);
          return;
        }

        // Si no puede bajar => se asienta aqui (filaActual)
        clearInterval(intervalId);
        document.removeEventListener("keydown", moureFitxa);

        // Al asentarse, ejecutamos el proceso de merges/eliminaciones/cascadas
        estabilizarBoard(estatCaselles);
        actualitzarTauler(contenidorTauler, estatCaselles);

        // Generar nueva ficha tras pequeño delay
        setTimeout(generarFitxaNova, 250);
      }, 500);
    }

    generarFitxaNova();
  });

  contenidorContent.append(contenidorTauler);
  return contenidorContent;
}
