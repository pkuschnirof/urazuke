// Pregunta a produccion si la interfaz de datos se puede CONSUMIR, no solo si existe:
// si el directorio contesta con el indice, si vuelve la cabecera que un navegador exige
// para dejar leer la respuesta, y si algo dice cuanto vale la copia.
//
// Por que existe aparte de build/portal_verify.mjs: ese verifica el CONTENIDO (que
// produccion sirva las huellas que declara lo commiteado) y es parte de la publicacion del
// metodo. Esto verifica la CONFIGURACION DEL SERVIDOR, que vive en el repositorio del
// portal (yujin.app/urazuke/.htaccess, un nivel arriba de los dos directorios que el
// espejo vacia) y no es propiedad del metodo. Por eso no esta enganchado en la cadena: un
// rojo de configuracion ajena no tiene por que poner en rojo una publicacion del metodo.
// Lo que si hace es ser repetible, para que la evidencia no sea el recuerdo de un curl.
//
// Uso: node build/api_headers.mjs
//      node build/api_headers.mjs --base https://yujin.app/urazuke
import { ARCHIVOS } from './portal_verify.mjs';

const BASE = 'https://yujin.app/urazuke';
const ORIGEN_AJENO = 'https://example.com';

const argumento = (bandera, defecto) => {
  const i = process.argv.indexOf(bandera);
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : defecto;
};

async function pedir(url) {
  try {
    const r = await fetch(url, {
      signal: AbortSignal.timeout(30000),
      headers: { accept: 'application/json', origin: ORIGEN_AJENO, 'cache-control': 'no-cache' },
    });
    return { status: r.status, cabeceras: r.headers, cuerpo: await r.text() };
  } catch (e) {
    const causa = e?.cause?.code ?? e?.cause?.message ?? '';
    return { error: [e?.name, e?.message, causa].filter(Boolean).join(' / ') };
  }
}

const base = argumento('--base', BASE).replace(/\/$/, '');
let fallas = 0;
const decir = (ok, que, detalle) => {
  if (!ok) fallas++;
  console.log((ok ? 'OK   ' : 'FALLA') + ' ' + que + (detalle ? ' -- ' + detalle : ''));
};

// 1. El directorio contesta con el indice, en vez de 403 (PND-002, PND-013).
const dir = await pedir(base + '/api/');
if (dir.error) {
  decir(false, base + '/api/ contesta', dir.error);
} else {
  let recursos = null;
  try { recursos = JSON.parse(dir.cuerpo)?.resources?.length ?? null; } catch { /* no es JSON */ }
  decir(dir.status === 200 && recursos > 0, base + '/api/ contesta con el indice',
    'HTTP ' + dir.status + (recursos ? ', ' + recursos + ' recursos listados' : ', el cuerpo no es un indice'));
}

// 2. CORS y Cache-Control, en el indice y en los dos recursos (PND-004, PND-005).
for (const nombre of ['index.json', ...ARCHIVOS]) {
  const r = await pedir(base + '/api/' + nombre);
  if (r.error) { decir(false, nombre + ' contesta', r.error); continue; }
  if (r.status !== 200) { decir(false, nombre + ' contesta 200', 'HTTP ' + r.status); continue; }
  const cors = r.cabeceras.get('access-control-allow-origin');
  const cache = r.cabeceras.get('cache-control');
  decir(cors === '*' || cors === ORIGEN_AJENO, nombre + ': un navegador de otro origen puede leerla',
    'access-control-allow-origin: ' + (cors ?? '(no vuelve)'));
  decir(Boolean(cache), nombre + ': dice cuanto vale la copia', 'cache-control: ' + (cache ?? '(no vuelve)'));
}

console.log(fallas ? '\n' + fallas + ' comprobacion(es) en rojo.' : '\nLa interfaz de datos se puede consumir: directorio, CORS y Cache-Control.');
process.exit(fallas ? 1 : 0);
