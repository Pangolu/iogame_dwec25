# Primary Colors — Joc IO (DWEC 25)

Joc de trencaclosques amb colors primaris/secundaris, gravetat i cascades, construït amb Vite + JavaScript, Bootstrap i autenticació amb Supabase. L’aplicació obliga a registrar-se/iniciar sessió abans de poder jugar.

## Característiques

- Autenticació amb Supabase (registre, inici de sessió i eixida)
- Router amb hash i rutes protegides (`#game` requereix sessió)
- Tauler N×N amb gravetat i efecte cascada
- Combinació de colors primaris → secundaris
- Detecció de trios (3+ iguals connectats) i eliminació
- Tríada negra (cian + magenta + groc) crea fitxa negra permanent
- Sistema de punts: +4 combinació, +8 fitxa negra, -3 trio primari, -10 trio secundari
- Components modulars i Web Component per al footer
- Estils amb SCSS (Sass)
- Tests amb Vitest

## Requisits

- Node.js 18 o superior
- Compte de Supabase (per a l’autenticació)

## Instal·lació

```bash
npm install
```

Configura Supabase en `src/env.js`:

```js
export const SUPABASE_KEY = "sb_publishable_xxx";
export const SUPABASE_URL = "https://<el-teu-projecte>.supabase.co";
```

## Ordres (scripts)

- `npm run dev`: servidor de desenvolupament (Vite)
- `npm run build`: build de producció
- `npm run preview`: previsualització de la build
- `npm run lint`: lint amb ESLint
- `npm test`: proves amb Vitest
- `npm run coverage`: proves amb cobertura

## Estructura de carpetes

```
public/
src/
	components/
		content.js        # Lògica principal del joc
		header.js         # Navegació amb estat de sessió
		login.js          # Formulari d’inici de sessió
		register.js       # Formulari de registre
		comjugar.js       # Pàgina “Com jugar”
		footer.js         # Footer (helper)
	services/
		supaservice.js    # Integració amb Supabase (auth, fetch)
	webcomponents/
		footer-component.js # Web Component (Shadow DOM)
	env.js              # Claus de Supabase (local)
	router.js           # Router amb hash + guardes de ruta
	main.js             # Arranc de l’app
	style.scss          # Estils globals
```

## Rutes i accés

- Ruta per defecte: `#registre` (registre)
- Rutes: `#registre`, `#login`, `#game`, `#comjugar`
- Protecció: si no hi ha sessió, qualsevol intent d’anar a `#game` redirigeix a `#registre`

## Com jugar (resum)

- Cauen fitxes de colors primaris: cian, magenta i groc
- Mou en horitzontal mentre cauen (fletxes esquerra/dreta)
- En assentar-se, s’avalua:
	- Combinacions binàries de primaris → secundaris (verd, blau fosc, roig)
	- Tríada negra (cian+magenta+groc) → fitxa negra (permanent)
	- Eliminació de grups de 3+ fitxes iguals connectades
- El joc acaba si alguna columna s’ompli completament

### Puntuació

- +4 per cada combinació binària
- +8 per cada fitxa negra creada
- -3 per eliminar 3+ fitxes primàries
- -10 per eliminar 3+ fitxes secundàries

## Desenvolupament

Arranca en mode desenvolupament:

```bash
npm run dev
```

Executa proves (en valencià):

```bash
npm test
```

Build de producció i previsualització:

```bash
npm run build
npm run preview
```

## Notes d’autenticació

- En tancar sessió es netegen els tokens en `localStorage`
- El header reflecteix l’estat de sessió (email / botons)
- Les rutes protegides usen guardes en `src/router.js`

## Desplegament

Projecte preparat per a Vite. Si desplegues en Vercel/Netlify, configura variables d’entorn de Supabase i usa la carpeta `dist` generada per `npm run build`.

## Llicència

Este projecte es distribueix sota la llicència inclosa en `LICENSE`.

