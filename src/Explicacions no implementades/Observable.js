/**
 * OBSERVABLE PATTERN
 * 
 * Un Observable és un patró de disseny que permet que múltiples objectes 
 * (observers/subscriptors) siguin notificats automàticament quan l'estat d'un 
 * objecte canvia.
 * 
 * CONCEPTE:
 * - Observable: L'objecte que conté l'estat i notifica als observers
 * - Observer/Subscriber: L'objecte que escolta els canvis
 * - Subscribe: Mètode per registrar un observer
 * - Notify: Mètode per avisar a tots els observers d'un canvi
 * 
 * BENEFICIS:
 * - Desacoblament: Els components no necessiten conèixer-se entre ells
 * - Reactivitat: Els canvis es propaguen automàticament
 * - Mantenibilitat: Més fàcil afegir nous observers
 */

export class Observable {
  constructor(valorInicial = null) {
    this.valor = valorInicial;
    this.observers = []; // Llista de funcions que s'executaran quan canviï el valor
  }

  /**
   * Subscriu un observer (callback) per ser notificat dels canvis
   * @param {Function} callback - Funció que s'executarà quan canviï el valor
   * @returns {Function} Funció per cancel·lar la subscripció
   */
  subscribe(callback) {
    this.observers.push(callback);
    
    // Retornar funció per desubscriure's
    return () => {
      this.observers = this.observers.filter(obs => obs !== callback);
    };
  }

  /**
   * Actualitza el valor i notifica a tots els observers
   * @param {*} nouValor - Nou valor de l'observable
   */
  next(nouValor) {
    this.valor = nouValor;
    this.notifyObservers();
  }

  /**
   * Obté el valor actual sense subscriure's
   * @returns {*} Valor actual
   */
  getValue() {
    return this.valor;
  }

  /**
   * Notifica a tots els observers del canvi
   */
  notifyObservers() {
    this.observers.forEach(callback => {
      try {
        callback(this.valor);
      } catch (error) {
        console.error("Error en observer:", error);
      }
    });
  }

  /**
   * Mapeja el valor de l'observable a un nou observable
   * @param {Function} transformFn - Funció de transformació
   * @returns {Observable} Nou observable amb el valor transformat
   */
  map(transformFn) {
    const nouObservable = new Observable(transformFn(this.valor));
    
    this.subscribe((valor) => {
      nouObservable.next(transformFn(valor));
    });
    
    return nouObservable;
  }
}

/**
 * EXEMPLE D'ÚS:
 * 
 * // Crear un observable amb un valor inicial
 * const puntuacio$ = new Observable(0);
 * 
 * // Subscriure's als canvis
 * puntuacio$.subscribe((novaPuntuacio) => {
 *   console.log('La puntuació ha canviat a:', novaPuntuacio);
 *   document.querySelector('#puntuacio').textContent = novaPuntuacio;
 * });
 * 
 * // Actualitzar el valor (notificarà a tots els subscriptors)
 * puntuacio$.next(100);  // Logs: "La puntuació ha canviat a: 100"
 * puntuacio$.next(150);  // Logs: "La puntuació ha canviat a: 150"
 * 
 * // Desubscriure's
 * const unsubscribe = puntuacio$.subscribe((valor) => {
 *   console.log('Subscriptor 2:', valor);
 * });
 * unsubscribe(); // Cancel·la la subscripció
 */
