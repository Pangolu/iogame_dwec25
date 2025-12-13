export { renderContent };

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

function estaAsentada(estatCaselles, fila, col) {
  const mida = estatCaselles.length;
  if (fila === mida - 1) return true;
  return estatCaselles[fila + 1][col].valor !== 0;
}

function aplicarGravedad(estatCaselles) {
  const mida = estatCaselles.length;
  for (let col = 0; col < mida; col++) {
    let writeRow = mida - 1;
    for (let readRow = mida - 1; readRow >= 0; readRow--) {
      if (estatCaselles[readRow][col].valor !== 0) {
        if (writeRow !== readRow) {
          estatCaselles[writeRow][col] = { ...estatCaselles[readRow][col] };
          estatCaselles[readRow][col] = { valor: 0, color: "white" };
        }
        writeRow--;
      }
    }
    for (let r = writeRow; r >= 0; r--) {
      estatCaselles[r][col] = { valor: 0, color: "white" };
    }
  }
}

function eliminarTriosIguales(estatCaselles) {
  const mida = estatCaselles.length;
  const visitat = Array.from({ length: mida }, () => Array(mida).fill(false));
  const grups = [];

  function floodFill(fila, col, color, grup) {
    if (fila < 0 || fila >= mida || col < 0 || col >= mida) return;
    if (visitat[fila][col]) return;
    if (estatCaselles[fila][col].valor === 0) return;
    if (estatCaselles[fila][col].color !== color) return;

    visitat[fila][col] = true;
    grup.push({ fila, col });

    floodFill(fila - 1, col, color, grup);
    floodFill(fila + 1, col, color, grup);
    floodFill(fila, col - 1, color, grup);
    floodFill(fila, col + 1, color, grup);
  }

  for (let i = 0; i < mida; i++) {
    for (let j = 0; j < mida; j++) {
      const cell = estatCaselles[i][j];
      if (cell.valor !== 0 && cell.color !== "white" && cell.color !== "black" && !visitat[i][j]) {
        const grup = [];
        floodFill(i, j, cell.color, grup);
        if (grup.length >= 3) {
          grups.push({ color: cell.color, fitxes: grup });
        }
      }
    }
  }

  if (grups.length === 0) return { fitxesEliminades: 0, colorEliminat: null };

  let totalFitxesEliminades = 0;
  let colorEliminat = null;
  
  for (const grup of grups) {
    colorEliminat = grup.color;
    for (const { fila, col } of grup.fitxes) {
      estatCaselles[fila][col] = { valor: 0, color: "white" };
      totalFitxesEliminades++;
    }
  }

  return { fitxesEliminades: totalFitxesEliminades, colorEliminat };
}

function gestionarTriadaNegraSiCorrespon(estatCaselles, fila, col) {
  const mida = estatCaselles.length;
  const requerida = ["darkblue", "green", "red"];

  function esTriada(arr) {
    if (arr.some(c => !c || c === "white")) return false;
    const set = new Set(arr);
    if (set.size !== 3) return false;
    return arr.every(c => requerida.includes(c));
  }

  if (col - 1 >= 0 && col + 1 < mida) {
    const arr = [
      estatCaselles[fila][col - 1].color,
      estatCaselles[fila][col].color,
      estatCaselles[fila][col + 1].color
    ];
    if (esTriada(arr)) {
      estatCaselles[fila][col] = { valor: 1, color: "black" };
      estatCaselles[fila][col - 1] = { valor: 0, color: "white" };
      estatCaselles[fila][col + 1] = { valor: 0, color: "white" };
      return true;
    }
  }

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

function estabilizarBoard(estatCaselles) {
  const mida = estatCaselles.length;
  let changed = true;
  let puntsGuanyats = 0;

  while (changed) {
    changed = false;

    let mergedThisPass = false;
    outerLoop:
    for (let i = 0; i < mida; i++) {
      for (let j = 0; j < mida; j++) {
        const cell = estatCaselles[i][j];
        if (cell.valor === 0) continue;
        const primarios = ["cyan", "magenta", "yellow"];
        if (!primarios.includes(cell.color)) continue;
        if (!estaAsentada(estatCaselles, i, j)) continue;

        if (i + 1 < mida && estatCaselles[i + 1][j].valor !== 0) {
          const abajo = estatCaselles[i + 1][j];
          if (primarios.includes(abajo.color) && abajo.color !== cell.color) {
            const nuevo = combinarColors(cell.color, abajo.color);
            if (nuevo) {
              estatCaselles[i + 1][j] = { valor: 1, color: nuevo };
              estatCaselles[i][j] = { valor: 0, color: "white" };
              puntsGuanyats += 4; // +4 punts per combinació
              mergedThisPass = true;
              changed = true;
              break outerLoop;
            }
          }
        }

        if (j + 1 < mida && estatCaselles[i][j + 1].valor !== 0) {
          const right = estatCaselles[i][j + 1];
          if (primarios.includes(right.color) && right.color !== cell.color && estaAsentada(estatCaselles, i, j + 1)) {
            const nuevo = combinarColors(cell.color, right.color);
            if (nuevo) {
              estatCaselles[i][j] = { valor: 1, color: nuevo };
              estatCaselles[i][j + 1] = { valor: 0, color: "white" };
              puntsGuanyats += 4; // +4 punts per combinació
              mergedThisPass = true;
              changed = true;
              break outerLoop;
            }
          }
        }

        if (j - 1 >= 0 && estatCaselles[i][j - 1].valor !== 0) {
          const left = estatCaselles[i][j - 1];
          if (primarios.includes(left.color) && left.color !== cell.color && estaAsentada(estatCaselles, i, j - 1)) {
            const nuevo = combinarColors(left.color, cell.color);
            if (nuevo) {
              estatCaselles[i][j - 1] = { valor: 1, color: nuevo };
              estatCaselles[i][j] = { valor: 0, color: "white" };
              puntsGuanyats += 4; // +4 punts per combinació
              mergedThisPass = true;
              changed = true;
              break outerLoop;
            }
          }
        }
      }
    }

    if (mergedThisPass) {
      aplicarGravedad(estatCaselles);
      let madeBlack = false;
      for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
          if (gestionarTriadaNegraSiCorrespon(estatCaselles, i, j)) {
            madeBlack = true;
            puntsGuanyats += 8; // +8 punts per fitxa negra
          }
        }
      }
      if (madeBlack) {
        changed = true;
      }
      aplicarGravedad(estatCaselles);
      continue;
    }

    let madeBlack2 = false;
    for (let i = 0; i < mida; i++) {
      for (let j = 0; j < mida; j++) {
        if (gestionarTriadaNegraSiCorrespon(estatCaselles, i, j)) {
          madeBlack2 = true;
          puntsGuanyats += 8; // +8 punts per fitxa negra
        }
      }
    }
    if (madeBlack2) {
      changed = true;
      aplicarGravedad(estatCaselles);
      continue;
    }

    const resultatEliminacio = eliminarTriosIguales(estatCaselles);
    if (resultatEliminacio.fitxesEliminades > 0) {
      changed = true;
      const colorsPrimaris = ["cyan", "magenta", "yellow"];
      const colorsSecundaris = ["green", "darkblue", "red"];
      
      if (colorsPrimaris.includes(resultatEliminacio.colorEliminat)) {
        puntsGuanyats -= 3; // -3 punts per colors primaris
      } else if (colorsSecundaris.includes(resultatEliminacio.colorEliminat)) {
        puntsGuanyats -= 10; // -10 punts per colors secundaris
      }
      

      aplicarGravedad(estatCaselles);
      continue;
    }
  }
  
  return puntsGuanyats;
}

function taulerPle(estatCaselles) {
  for (let i = 0; i < estatCaselles.length; i++) {
    for (let j = 0; j < estatCaselles[i].length; j++) {
      if (estatCaselles[i][j].valor === 0) {
        return false;
      }
    }
  }
  return true;
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
  <div id="puntuacio-container" style="text-align: center; margin: 1em; display: none;">
    <h2 style="color: white;">Puntuació: <span id="puntuacio">0</span></h2>
  </div>
  <div id="game-over-container" style="text-align: center; margin: 1em; display: none;">
    <h2 style="color: red;">Fi de partida!</h2>
    <button type="button" class="btn btn-primary" id="boto-reiniciar">Tornar a jugar</button>
  </div>
  `;

  const colocarMida = document.createElement("div");
  colocarMida.innerHTML = numeroCaselles;
  contenidorContent.append(colocarMida);

  const botonsMida = contenidorContent.querySelectorAll(".seleccio-grandaria");
  const contenidorTauler = document.createElement("div");
  contenidorTauler.id = "contenidor-tauler";

  let estatCaselles;
  let puntuacio = 0;
  let jocActiu = false;

  const botoInici = contenidorContent.querySelector("#boto-inici");
  const puntuacioDisplay = contenidorContent.querySelector("#puntuacio");
  const puntuacioContainer = contenidorContent.querySelector("#puntuacio-container");
  const gameOverContainer = contenidorContent.querySelector("#game-over-container");

  botonsMida.forEach((e) => {
    e.addEventListener("click", () => {
      botoInici.disabled = false;
      const mida = parseInt(e.value);
      estatCaselles = construirArrayTauler(mida);
      puntuacio = 0;
      puntuacioDisplay.textContent = puntuacio;
      puntuacioContainer.style.display = "none";
      gameOverContainer.style.display = "none";

      let filesHtml = crearTauler(mida, estatCaselles);

      contenidorTauler.innerHTML = `
        <div id="tauler">
        ${filesHtml}
        </div>
        `;
    });
  });

  // Efectes de colors aleatoris per als botons de mida
  const primaryColors = ["#0d6efd", "#dc3545", "#198754", "#ffc107", "#6610f2"];
  botonsMida.forEach((boto) => {
    boto.addEventListener("mouseenter", () => {
      const randomColor = primaryColors[Math.floor(Math.random() * primaryColors.length)];
      boto.style.backgroundColor = randomColor;
    });

    boto.addEventListener("mouseleave", () => {
      boto.style.backgroundColor = "#0d6efd";
    });
  });

  const colors = ["magenta", "cyan", "yellow"];

  botoInici.addEventListener("click", () => {
    if (!estatCaselles) return;

    botoInici.disabled = true;
    puntuacio = 0;
    puntuacioDisplay.textContent = puntuacio;
    puntuacioContainer.style.display = "block";
    gameOverContainer.style.display = "none";
    jocActiu = true;
    const mida = estatCaselles.length;

    function generarFitxaNova() {
      if (!jocActiu) return;
      
      let columnaPlena = false;
      for (let col = 0; col < estatCaselles[0].length; col++) {
        let plena = true;
        for (let fila = 0; fila < estatCaselles.length; fila++) {
          if (estatCaselles[fila][col].valor === 0) {
            plena = false;
            break;
          }
        }
        if (plena) {
          columnaPlena = true;
          break;
        }
      }
      
      if (columnaPlena) {
        jocActiu = false;
        gameOverContainer.style.display = "block";
        return;
      }
      
      if (taulerPle(estatCaselles)) {
        jocActiu = false;
        gameOverContainer.style.display = "block";
        return;
      }

      let columna = Math.floor(Math.random() * estatCaselles[0].length);
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

      function moureFitxa(e) {
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

        // Si no pot baixar => s'assenta aquí (filaActual)
        clearInterval(intervalId);
        document.removeEventListener("keydown", moureFitxa);

        // En assentar-se, executem el procés de merges/eliminacions/cascades
        const puntsGuanyats = estabilizarBoard(estatCaselles);
        puntuacio += puntsGuanyats;
        puntuacioDisplay.textContent = puntuacio;
        actualitzarTauler(contenidorTauler, estatCaselles);

        // Generar nova fitxa després d'un petit retard
        setTimeout(generarFitxaNova, 250);
      }, 500);
    }

    generarFitxaNova();
  });

  // Botó de reiniciar
  const botoReiniciar = contenidorContent.querySelector("#boto-reiniciar");
  botoReiniciar.addEventListener("click", () => {
    if (!estatCaselles) return;
    
    // Reiniciar l'estat del joc
    const mida = estatCaselles.length;
    estatCaselles = construirArrayTauler(mida);
    puntuacio = 0;
    puntuacioDisplay.textContent = puntuacio;
    jocActiu = true;
    gameOverContainer.style.display = "none";
    puntuacioContainer.style.display = "block";
    
    actualitzarTauler(contenidorTauler, estatCaselles);
    
    // Començar el joc de nou
    botoInici.click();
  });

  contenidorContent.append(contenidorTauler);
  return contenidorContent;
}
