# Configuració de Supabase

Aquest projecte utilitza Supabase per a l'autenticació d'usuaris (login i registre).

## Com configurar Supabase

### 1. Obtenir les credencials

1. Ves a [https://supabase.com](https://supabase.com) i inicia sessió
2. Selecciona el teu projecte o crea'n un de nou
3. A la barra lateral esquerra, ves a **Project Settings** (icona d'engranatge)
4. Selecciona **API** al menú
5. Trobaràs dues dades importants:
   - **Project URL**: Comença amb `https://XXXXXXX.supabase.co`
   - **anon public key**: Una clau llarga que comença amb `eyJ...`

### 2. Configurar les variables d'entorn

Edita l'arxiu `src/env.js` i substitueix les credencials:

```javascript
// SUBSTITUEIX AQUESTES CREDENCIALS PER LES TEUES
export const SUPABASE_KEY = "PEGA_AQUI_LA_TEUA_ANON_PUBLIC_KEY";
export const SUPABASE_URL = "PEGA_AQUI_LA_TEUA_PROJECT_URL";
```

### 3. Exemple

```javascript
// Exemple de com hauria de quedar:
export const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpqd25mYmhuZW1laGl4aGl1cGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzIxMzgsImV4cCI6MjA3NjEwODEzOH0.3cNnBxWPVvpfr0vcFvbr2fxz2y20ZW2GNS6IZS6pHK0";
export const SUPABASE_URL = "https://zjwnfbhnemehixhiupey.supabase.co";
```

### 4. Configurar l'autenticació a Supabase (si és necessari)

1. A Supabase, ves a **Authentication** > **Settings**
2. Assegura't que **Email Auth** està activat
3. Configura les URL de redirecció si cal:
   - Development: `http://localhost:5173`
   - Production: La URL del teu Vercel

### 5. Provar el registre i login

Un cop configurades les credencials:

1. Executa `npm run dev`
2. Ves a la pàgina de registre (#registre)
3. Registra un usuari nou
4. Revisa el correu electrònic per confirmar el compte (si tens activada la confirmació per email)
5. Inicia sessió amb les credencials

## Solució de problemes

### Error: "Invalid API key"
- Verifica que has copiat correctament la `anon public key`
- Assegura't que no hi ha espais en blanc al principi o final

### Error: "Invalid URL"
- Comprova que la URL és correcta i inclou `https://`
- Ha de tenir el format: `https://XXXXXXX.supabase.co`

### No rebo el correu de confirmació
- Comprova la carpeta de spam
- A Supabase > Authentication > Settings, pots desactivar la confirmació per email per a proves

## Seguretat

⚠️ **IMPORTANT**: Mai pugis les credencials de Supabase a un repositori públic!

Si has pujat les credencials per error:
1. Regenera la clau API a Supabase
2. Utilitza variables d'entorn (fitxer `.env`)
3. Afegeix `.env` al `.gitignore`
