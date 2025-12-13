/**
 * GAME STATE MANAGER - Gestor d'estat del joc amb Observables
 * 
 * Aquest arxiu demostra com utilitzar Observables per gestionar
 * l'estat del joc de manera reactiva i desacoblada.
 */

import { Observable } from './Observable.js';

/**
 * Classe per gestionar l'estat global del joc utilitzant Observables
 */
export class GameStateManager {
  constructor() {
    // Observables per diferents parts de l'estat
    this.puntuacio$ = new Observable(0);
    this.jocActiu$ = new Observable(false);
    this.taulerMida$ = new Observable(null);
    this.usuari$ = new Observable(null);
    this.fitxesCaigudes$ = new Observable(0);
    this.combo$ = new Observable(0);
  }

  /**
   * Actualitza la puntuació
   * Tots els subscriptors seran notificats automàticament
   */
  actualitzarPuntuacio(novaPuntuacio) {
    this.puntuacio$.next(novaPuntuacio);
  }

  /**
   * Incrementa la puntuació en una quantitat
   */
  incrementarPuntuacio(increment) {
    const puntuacioActual = this.puntuacio$.getValue();
    this.puntuacio$.next(puntuacioActual + increment);
  }

  /**
   * Inicia el joc
   */
  iniciarJoc(mida) {
    this.jocActiu$.next(true);
    this.taulerMida$.next(mida);
    this.puntuacio$.next(0);
    this.fitxesCaigudes$.next(0);
    this.combo$.next(0);
  }

  /**
   * Finalitza el joc
   */
  finalitzarJoc() {
    this.jocActiu$.next(false);
  }

  /**
   * Estableix l'usuari autenticat
   */
  setUsuari(email, userId) {
    this.usuari$.next({ email, userId });
  }

  /**
   * Neteja l'usuari (logout)
   */
  clearUsuari() {
    this.usuari$.next(null);
  }

  /**
   * Incrementa el comptador de fitxes caigudes
   */
  incrementarFitxesCaigudes() {
    const actual = this.fitxesCaigudes$.getValue();
    this.fitxesCaigudes$.next(actual + 1);
  }

  /**
   * Actualitza el combo actual
   */
  actualitzarCombo(combo) {
    this.combo$.next(combo);
  }

  /**
   * Reinicia tots els observables
   */
  reiniciar() {
    this.puntuacio$.next(0);
    this.jocActiu$.next(false);
    this.taulerMida$.next(null);
    this.fitxesCaigudes$.next(0);
    this.combo$.next(0);
  }
}

// Instància singleton del gestor d'estat
export const gameState = new GameStateManager();

/**
 * EXEMPLES D'ÚS EN EL TEU JOC:
 * 
 * 1. SUBSCRIURE'S A CANVIS DE PUNTUACIÓ:
 * ----------------------------------------
 * import { gameState } from './utils/GameStateManager.js';
 * 
 * // Al component que mostra la puntuació
 * const puntuacioDisplay = document.querySelector('#puntuacio');
 * 
 * gameState.puntuacio$.subscribe((novaPuntuacio) => {
 *   puntuacioDisplay.textContent = novaPuntuacio;
 *   
 *   // Afegir efecte visual si guanyes punts
 *   if (novaPuntuacio > 0) {
 *     puntuacioDisplay.classList.add('pulse-animation');
 *     setTimeout(() => puntuacioDisplay.classList.remove('pulse-animation'), 300);
 *   }
 * });
 * 
 * 
 * 2. ACTUALITZAR PUNTUACIÓ DES DE QUALSEVOL LLOC:
 * ------------------------------------------------
 * // Quan s'elimina un trio
 * gameState.incrementarPuntuacio(-3);
 * 
 * // Quan es crea una combinació
 * gameState.incrementarPuntuacio(4);
 * 
 * // Quan es crea una fitxa negra
 * gameState.incrementarPuntuacio(8);
 * 
 * 
 * 3. GESTIONAR L'ESTAT DEL JOC:
 * -----------------------------
 * // Subscriure's a l'estat del joc
 * gameState.jocActiu$.subscribe((actiu) => {
 *   if (actiu) {
 *     console.log('Joc iniciat!');
 *     botoInici.disabled = true;
 *   } else {
 *     console.log('Joc finalitzat!');
 *     botoInici.disabled = false;
 *   }
 * });
 * 
 * // Iniciar joc
 * gameState.iniciarJoc(5); // Tauler 5x5
 * 
 * 
 * 4. MOSTRAR MISSATGES QUAN CANVIA L'ESTAT:
 * ------------------------------------------
 * gameState.combo$.subscribe((combo) => {
 *   if (combo > 2) {
 *     console.log(`Combo x${combo}! 🔥`);
 *     mostrarMissatgeCombo(combo);
 *   }
 * });
 * 
 * 
 * 5. GUARDAR PUNTUACIÓ QUAN FINALITZA EL JOC:
 * -------------------------------------------
 * gameState.jocActiu$.subscribe((actiu) => {
 *   if (!actiu) {
 *     const puntuacioFinal = gameState.puntuacio$.getValue();
 *     const usuari = gameState.usuari$.getValue();
 *     
 *     if (usuari && puntuacioFinal > 0) {
 *       // Guardar a Supabase
 *       guardarPuntuacio(usuari.userId, puntuacioFinal);
 *     }
 *   }
 * });
 * 
 * 
 * 6. COMBINAR OBSERVABLES:
 * ------------------------
 * // Crear un observable derivat que mostra puntuació + combo
 * const puntuacioAmbCombo$ = gameState.puntuacio$.map(punts => {
 *   const combo = gameState.combo$.getValue();
 *   return combo > 1 ? punts * combo : punts;
 * });
 * 
 * puntuacioAmbCombo$.subscribe((puntuacioTotal) => {
 *   console.log('Puntuació amb combo:', puntuacioTotal);
 * });
 */
