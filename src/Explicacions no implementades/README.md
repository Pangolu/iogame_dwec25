# Funcions Pures i Observables

Aquest document explica què són les funcions pures i els observables, i com s'utilitzen al projecte.

---

## 📚 Què és una Funció Pura?

Una **funció pura** és una funció que compleix dues regles:

### 1️⃣ Sempre retorna el mateix resultat amb els mateixos arguments

```javascript
// ✅ FUNCIÓ PURA
function sumar(a, b) {
  return a + b;
}

sumar(2, 3); // Sempre retorna 5
sumar(2, 3); // Sempre retorna 5


// ❌ NO ÉS PURA (depèn d'una variable externa)
let contador = 0;
function incrementar() {
  return ++contador; // Cada vegada retorna un valor diferent!
}
```

### 2️⃣ No té efectes secundaris

No modifica res fora de la funció (variables globals, DOM, localStorage, console.log, etc.)

```javascript
// ✅ FUNCIÓ PURA
function multiplicar(a, b) {
  return a * b;
}

// ❌ NO ÉS PURA (modifica una variable externa)
let total = 0;
function afegirAlTotal(num) {
  total += num; // Modifica variable externa!
  return total;
}

// ❌ NO ÉS PURA (modifica el DOM)
function actualitzarPantalla(valor) {
  document.querySelector('#resultat').textContent = valor; // Efecte secundari!
}
```

### ✅ Beneficis de les funcions pures

- **Testejables**: Fàcils de provar perquè no depenen de l'estat extern
- **Predictibles**: Sempre saps què faran
- **Reutilitzables**: Es poden usar en qualsevol context
- **Composables**: Es poden combinar fàcilment
- **Paral·lelitzables**: Poden executar-se en paral·lel sense problemes

---

## 🔔 Què és un Observable?

Un **Observable** és un patró de disseny que permet que múltiples parts del codi siguin **notificades automàticament** quan alguna cosa canvia.

### Conceptes clau

```
┌─────────────┐
│  Observable │  ← Conté un valor i una llista d'observers
└──────┬──────┘
       │
       ├──→ Observer 1 (s'executa quan canvia)
       ├──→ Observer 2 (s'executa quan canvia)
       └──→ Observer 3 (s'executa quan canvia)
```

### Exemple simple

```javascript
import { Observable } from './utils/Observable.js';

// 1. Crear un observable
const puntuacio$ = new Observable(0);

// 2. Subscriure's (registrar una funció que s'executarà quan canviï)
puntuacio$.subscribe((novaPuntuacio) => {
  console.log('La puntuació ha canviat a:', novaPuntuacio);
  document.querySelector('#puntuacio').textContent = novaPuntuacio;
});

// 3. Actualitzar el valor (tots els subscriptors seran notificats)
puntuacio$.next(10);  // Logs: "La puntuació ha canviat a: 10"
puntuacio$.next(25);  // Logs: "La puntuació ha canviat a: 25"
```

### Per què són útils?

#### Sense Observable (acoblat):
```javascript
let puntuacio = 0;

function actualitzarPuntuacio(novaPuntuacio) {
  puntuacio = novaPuntuacio;
  
  // Has de recordar actualitzar TOTS aquests llocs manualment:
  document.querySelector('#puntuacio').textContent = puntuacio;
  document.querySelector('#header-punts').textContent = puntuacio;
  guardarALocalStorage(puntuacio);
  comprovarRecord(puntuacio);
  // Si oblides un lloc, hi haurà bugs!
}
```

#### Amb Observable (desacoblat):
```javascript
const puntuacio$ = new Observable(0);

// Cada part del codi s'encarrega del seu propi comportament
puntuacio$.subscribe(p => document.querySelector('#puntuacio').textContent = p);
puntuacio$.subscribe(p => document.querySelector('#header-punts').textContent = p);
puntuacio$.subscribe(p => guardarALocalStorage(p));
puntuacio$.subscribe(p => comprovarRecord(p));

// Només has d'actualitzar en un lloc
puntuacio$.next(100); // Tots els subscriptors s'actualitzen automàticament!
```

---

## 🎮 Com utilitzar-ho al teu projecte

### 1. Usar funcions pures

```javascript
import { combinarColorsPur, taulerPle } from './utils/funcions-pures.js';

// En lloc de:
function combinarColors(c1, c2) {
  // ... codi amb efectes secundaris
}

// Usa:
const colorResultant = combinarColorsPur("cyan", "yellow"); // "green"
```

### 2. Usar Observables per gestionar l'estat

```javascript
import { gameState } from './utils/GameStateManager.js';

// Al component que mostra la puntuació
const puntuacioDisplay = document.querySelector('#puntuacio');

gameState.puntuacio$.subscribe((punts) => {
  puntuacioDisplay.textContent = punts;
});

// Quan s'elimina un trio de colors primaris
gameState.incrementarPuntuacio(-3);

// Quan es crea una combinació
gameState.incrementarPuntuacio(4);

// Quan es crea una fitxa negra
gameState.incrementarPuntuacio(8);
```

### 3. Exemple complet en el teu joc

**Abans (sense Observables):**
```javascript
let puntuacio = 0;

function eliminarTrio() {
  // ... lògica d'eliminació
  puntuacio -= 3;
  document.querySelector('#puntuacio').textContent = puntuacio; // Acoblat!
}

function crearNegra() {
  // ... lògica de creació
  puntuacio += 8;
  document.querySelector('#puntuacio').textContent = puntuacio; // Repetit!
}
```

**Després (amb Observables):**
```javascript
import { gameState } from './utils/GameStateManager.js';

// Configuració inicial (una sola vegada)
gameState.puntuacio$.subscribe((punts) => {
  document.querySelector('#puntuacio').textContent = punts;
});

// Ara només cal actualitzar el valor
function eliminarTrio() {
  // ... lògica d'eliminació
  gameState.incrementarPuntuacio(-3); // Desacoblat!
}

function crearNegra() {
  // ... lògica de creació
  gameState.incrementarPuntuacio(8); // Desacoblat!
}
```

---

## 📂 Arxius creats

- **`src/utils/Observable.js`**: Classe Observable amb documentació completa
- **`src/utils/funcions-pures.js`**: Funcions pures refactoritzades del teu codi
- **`src/utils/GameStateManager.js`**: Gestor d'estat del joc amb Observables i exemples d'ús

---

## 🎯 On utilitzar Observables al teu projecte

### 1. Puntuació
✅ Ja explicat més amunt

### 2. Estat del joc (actiu/finalitzat)
```javascript
gameState.jocActiu$.subscribe((actiu) => {
  const botoInici = document.querySelector('#boto-inici');
  botoInici.disabled = actiu;
  
  if (!actiu) {
    // Mostrar pantalla de game over
    document.querySelector('#game-over-container').style.display = 'block';
  }
});
```

### 3. Usuari autenticat
```javascript
gameState.usuari$.subscribe((usuari) => {
  if (usuari) {
    console.log(`Usuari autenticat: ${usuari.email}`);
    // Actualitzar header automàticament
  } else {
    console.log('Usuari no autenticat');
  }
});
```

### 4. Combo/Streak
```javascript
gameState.combo$.subscribe((combo) => {
  if (combo > 2) {
    mostrarMissatge(`Combo x${combo}! 🔥`);
  }
});
```

---

## 🚀 Pròxims passos

1. Revisa els arxius creats a `src/utils/`
2. Llegeix els exemples comentats
3. Comença a integrar els Observables al `content.js`
4. Refactoritza funcions a funcions pures quan sigui possible

---

## 💡 Consells

- **Funcions pures**: Utilitza-les per càlculs i transformacions
- **Observables**: Utilitza'ls per gestionar estat que pot canviar amb el temps
- No t'amoïnis si no entens tot d'entrada, practica amb exemples petits primer!
