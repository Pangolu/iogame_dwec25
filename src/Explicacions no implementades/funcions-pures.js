/**
 * FUNCIONS PURES - REFACTORITZACIÓ
 * 
 * Una funció pura és aquella que:
 * 1. Sempre retorna el mateix resultat amb els mateixos arguments
 * 2. No té efectes secundaris (no modifica variables externes, no fa console.log, etc.)
 * 3. No depèn de l'estat extern
 * 
 * BENEFICIS:
 * - Més fàcils de testejar
 * - Més predictibles
 * - Poden executar-se en paral·lel
 * - Més fàcils de reutilitzar
 */

/**
 * FUNCIÓ PURA: Construeix un array bidimensional per al tauler
 * @param {number} mida - Mida del tauler (N x N)
 * @returns {Array<Array<{valor: number, color: string}>>} Tauler inicial
 */
export const construirArrayTaulerPur = (mida) => {
  return Array.from({ length: mida }, () =>
    Array.from({ length: mida }, () => ({
      valor: 0,
      color: "white"
    }))
  );
};

/**
 * FUNCIÓ PURA: Genera HTML per una cel·la
 * @param {number} fila - Índex de la fila
 * @param {number} columna - Índex de la columna
 * @param {Object} celda - Objecte amb {valor, color}
 * @returns {string} HTML de la cel·la
 */
export const generarHtmlCelda = (fila, columna, celda) => {
  const { valor, color } = celda;
  return `<div class="celda" data-fila="${fila}" data-columna="${columna}" style="background-color: ${color};">
    ${valor}
  </div>`;
};

/**
 * FUNCIÓ PURA: Genera HTML per una fila sencera
 * @param {Array<Object>} fila - Array de cel·les
 * @param {number} indiceFila - Índex de la fila
 * @returns {string} HTML de la fila
 */
export const generarHtmlFila = (fila, indiceFila) => {
  const celdesHtml = fila
    .map((celda, col) => generarHtmlCelda(indiceFila, col, celda))
    .join('');
  
  return `<div class="files-tauler">${celdesHtml}</div>`;
};

/**
 * FUNCIÓ PURA: Genera HTML complet del tauler
 * @param {Array<Array<Object>>} tauler - Array bidimensional del tauler
 * @returns {string} HTML complet del tauler
 */
export const generarHtmlTauler = (tauler) => {
  const filesHtml = tauler
    .map((fila, index) => generarHtmlFila(fila, index))
    .join('');
  
  return `<div id="tauler">${filesHtml}</div>`;
};

/**
 * FUNCIÓ PURA: Combina dos colors primaris
 * @param {string} color1 - Primer color
 * @param {string} color2 - Segon color
 * @returns {string|null} Color resultant o null si no es pot combinar
 */
export const combinarColorsPur = (color1, color2) => {
  const combinacions = {
    "cyan-yellow": "green",
    "yellow-cyan": "green",
    "cyan-magenta": "darkblue",
    "magenta-cyan": "darkblue",
    "yellow-magenta": "red",
    "magenta-yellow": "red"
  };
  
  return combinacions[`${color1}-${color2}`] ?? null;
};

/**
 * FUNCIÓ PURA: Comprova si una posició està dins del tauler
 * @param {number} fila - Fila a comprovar
 * @param {number} columna - Columna a comprovar
 * @param {number} mida - Mida del tauler
 * @returns {boolean} True si està dins dels límits
 */
export const esDinsDelTauler = (fila, columna, mida) => {
  return fila >= 0 && fila < mida && columna >= 0 && columna < mida;
};

/**
 * FUNCIÓ PURA: Comprova si una cel·la està buida
 * @param {Object} celda - Objecte cel·la {valor, color}
 * @returns {boolean} True si està buida
 */
export const estaBuida = (celda) => {
  return celda.valor === 0 || celda.color === "white";
};

/**
 * FUNCIÓ PURA: Comprova si una cel·la està assentada (no pot caure més)
 * @param {Array<Array<Object>>} tauler - Estat del tauler
 * @param {number} fila - Fila de la cel·la
 * @param {number} columna - Columna de la cel·la
 * @returns {boolean} True si està assentada
 */
export const estaAssentada = (tauler, fila, columna) => {
  const mida = tauler.length;
  
  // Si està a la fila inferior, està assentada
  if (fila === mida - 1) return true;
  
  // Si hi ha una fitxa a sota, està assentada
  return !estaBuida(tauler[fila + 1][columna]);
};

/**
 * FUNCIÓ PURA: Clona profundament el tauler
 * @param {Array<Array<Object>>} tauler - Tauler original
 * @returns {Array<Array<Object>>} Còpia del tauler
 */
export const clonarTauler = (tauler) => {
  return tauler.map(fila => 
    fila.map(celda => ({ ...celda }))
  );
};

/**
 * FUNCIÓ PURA: Comprova si el tauler està ple
 * @param {Array<Array<Object>>} tauler - Estat del tauler
 * @returns {boolean} True si està completament ple
 */
export const taulerPle = (tauler) => {
  return tauler.every(fila => 
    fila.every(celda => !estaBuida(celda))
  );
};

/**
 * FUNCIÓ PURA: Comprova si alguna columna està plena
 * @param {Array<Array<Object>>} tauler - Estat del tauler
 * @returns {boolean} True si alguna columna està plena
 */
export const algunaColumnaPlena = (tauler) => {
  const mida = tauler.length;
  
  for (let col = 0; col < mida; col++) {
    const columnaPlena = tauler.every(fila => !estaBuida(fila[col]));
    if (columnaPlena) return true;
  }
  
  return false;
};

/**
 * FUNCIÓ PURA: Calcula els veïns d'una cel·la (dalt, baix, esquerra, dreta)
 * @param {number} fila - Fila de la cel·la
 * @param {number} columna - Columna de la cel·la
 * @param {number} mida - Mida del tauler
 * @returns {Array<{fila: number, columna: number}>} Array de posicions veïnes vàlides
 */
export const obtenirVeins = (fila, columna, mida) => {
  const direccions = [
    { fila: -1, columna: 0 },  // Dalt
    { fila: 1, columna: 0 },   // Baix
    { fila: 0, columna: -1 },  // Esquerra
    { fila: 0, columna: 1 }    // Dreta
  ];
  
  return direccions
    .map(({ fila: df, columna: dc }) => ({
      fila: fila + df,
      columna: columna + dc
    }))
    .filter(({ fila: f, columna: c }) => esDinsDelTauler(f, c, mida));
};

/**
 * EXEMPLE D'ÚS DE FUNCIONS PURES:
 * 
 * // Crear un tauler
 * const tauler = construirArrayTaulerPur(5);
 * 
 * // Generar HTML (no modifica el tauler)
 * const html = generarHtmlTauler(tauler);
 * 
 * // Combinar colors
 * const colorResultant = combinarColorsPur("cyan", "yellow"); // "green"
 * 
 * // Totes aquestes funcions són pures: sempre retornen el mateix
 * // resultat amb els mateixos arguments i no modifiquen res extern
 */
