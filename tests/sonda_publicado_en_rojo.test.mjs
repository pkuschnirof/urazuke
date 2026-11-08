// Los rojos deliberados de la sonda de lo publicado: una produccion mentida por cada cara
// (D-094, PND-123).
//
// Una guarda que nadie vio caer no demuestra que guarde nada, y en este proyecto ya paso cinco
// veces. Aca se miente la produccion por cada comprobacion y se exige que el hallazgo salga, que
// sea UNO, y que nombre su cara: un rojo que dice "produccion no coincide" obliga a buscar donde,
// y eso es trabajo que la sonda ya hizo.
//
// Las dos mentiras que mas valen son las dos caras de "servido no es publicado", porque son las
// dos que el metodo ya pago en la vida real:
//   S2 con MAS bytes  -> algo que nadie commiteo y llega al lector (el 2026-11-08, el script del
//                        hospedaje en las ochenta y cuatro paginas).
//   S2 con MENOS bytes -> algo commiteado que no llega (el 2026-10-24, el .htaccess del portal
//                        que el rsync excluia).
// La segunda nunca habia tenido guarda. Esta es la primera.
//
// Uso: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { comprobar } from '../build/sonda_publicado.mjs';

const BLOQUE = "<script>_trfd.push({'tccl.baseHost':'ajeno.example'})</script>"
  + "<script src='https://ajeno.example/traffic.js'></script>";
const INYECCIONES = [
  { id: 'inyeccion-del-hospedaje', host: 'ajeno.example', snippet: BLOQUE, pages: 'every_published_page' },
];
const ARBOL = '<html><body><p>hola</p><script src="vendor/x.js"></script></body></html>';
const servir = (arbol) => ({ status: 200, texto: arbol.replace('</body>', '</body>' + BLOQUE) });

/** El estado sano, del que cada prueba rompe UNA cosa. */
const sano = () => ({
  inyecciones: INYECCIONES,
  publicados: ['a.html', 'vendor/x.js'],
  paginas: [{ ruta: 'a.html', arbol: ARBOL, servido: servir(ARBOL) }],
  recursos: [{ ruta: 'vendor/x.js', arbol: { sha256: 'abc123', bytes: 7 }, servido: { status: 200, sha256: 'abc123', bytes: 7 } }],
});

/** Un hallazgo, y de la cara que se esperaba. */
function unico(estado, cara) {
  const h = comprobar(estado);
  assert.equal(h.length, 1, 'se esperaba un hallazgo y salieron ' + h.length + ':\n' + h.join('\n'));
  assert.ok(h[0].startsWith('[' + cara + ']'), 'el hallazgo no es de la cara ' + cara + ': ' + h[0]);
  return h[0];
}

test('ROJO [S1]: produccion no contesta -- no haber podido mirar es rojo y nunca verde', () => {
  const e = sano();
  e.paginas[0].servido = { error: 'TypeError / fetch failed / ETIMEDOUT' };
  // Y cae tambien S5, porque la pagina ilegible era la unica donde la inyeccion aparecia: eso
  // es correcto y es la razon de no exigir "uno" aca. Lo que se exige es que S1 salga primero.
  const h = comprobar(e);
  assert.ok(h[0].startsWith('[S1]'), h[0]);
  assert.match(h[0], /ETIMEDOUT/);
  assert.match(h[0], /rojo y nunca verde/);
});

test('ROJO [S1]: produccion contesta con un codigo que no es 200', () => {
  const e = sano();
  e.paginas[0].servido = { status: 503, texto: 'ups' };
  assert.ok(comprobar(e)[0].startsWith('[S1]'));
});

test('ROJO [S2]: lo servido trae bytes que nadie commiteo (la cara del 2026-11-08)', () => {
  const e = sano();
  e.paginas[0].servido.texto = e.paginas[0].servido.texto
    .replace('</html>', "<script src='https://otro.example/mas.js'></script></html>");
  const h = comprobar(e);
  const s2 = h.filter((x) => x.startsWith('[S2]'));
  assert.equal(s2.length, 1, h.join('\n'));
  assert.match(s2[0], /bytes que nadie commiteo/);
  // Y el otro hallazgo es el S3 del host nuevo: la misma mentira se ve por las dos caras, que es
  // lo que se queria -- una sola de las dos no habria visto el caso real.
  assert.equal(h.filter((x) => x.startsWith('[S3]')).length, 1, h.join('\n'));
});

test('ROJO [S2]: a lo servido le faltan bytes que si estan commiteados (la cara del 2026-10-24)', () => {
  const e = sano();
  e.paginas[0].servido.texto = e.paginas[0].servido.texto.replace('<p>hola</p>', '');
  const h = unico(e, 'S2');
  assert.match(h, /le faltan 11 bytes que si estan commiteados/);
});

test('ROJO [S2]: mismo tamano y contenido distinto', () => {
  const e = sano();
  e.paginas[0].servido.texto = e.paginas[0].servido.texto.replace('<p>hola</p>', '<p>chau</p>');
  assert.match(unico(e, 'S2'), /mismo tamano y contenido distinto/);
});

test('ROJO [S3]: la pagina servida ejecuta un host que el inventario no declara', () => {
  const e = sano();
  // El cambio esta en las DOS puntas, para que solo caiga S3: la pagina del arbol tambien lo
  // trae, asi que no hay diferencia de bytes. Es el caso de un tercero que entro por el arbol
  // sin pasar por el inventario.
  e.paginas[0].arbol = ARBOL.replace('</body>', "<script src='https://otro.example/x.js'></script></body>");
  e.paginas[0].servido = servir(e.paginas[0].arbol);
  const h = unico(e, 'S3');
  assert.match(h, /otro\.example/);
  assert.match(h, /un tercero sin declarar/);
});

test('ROJO [S4]: la pagina servida ejecuta un archivo que el arbol publicado no tiene', () => {
  const e = sano();
  e.publicados = ['a.html'];
  assert.match(unico(e, 'S4'), /vendor\/x\.js/);
});

test('ROJO [S5]: la inyeccion que el inventario declara ya no aparece -- la declaracion se vencio', () => {
  const e = sano();
  e.paginas[0].servido = { status: 200, texto: ARBOL };
  const h = unico(e, 'S5');
  assert.match(h, /la declaracion quedo vencida/);
});

test('ROJO [S5]: declara que esta en todas y aparece en algunas', () => {
  const e = sano();
  e.paginas.push({ ruta: 'b.html', arbol: ARBOL, servido: { status: 200, texto: ARBOL } });
  e.publicados.push('b.html');
  assert.match(unico(e, 'S5'), /aparecio en 1 de 2/);
});

test('ROJO [S6]: produccion sirve un recurso con otra huella que la del arbol', () => {
  const e = sano();
  e.recursos[0].servido = { status: 200, sha256: 'ffffff', bytes: 9 };
  assert.match(unico(e, 'S6'), /no es lo auditado/);
});

test('ROJO [S6]: el recurso publicado no se pudo leer', () => {
  const e = sano();
  e.recursos[0].servido = { error: 'TypeError / fetch failed / ENOTFOUND' };
  assert.match(unico(e, 'S6'), /ENOTFOUND/);
});

test('VERDE que fija el limite: la sonda NO ve lo que un script agrega en tiempo de ejecucion', () => {
  // Esto no es un rojo: es la afirmacion del limite, verde a proposito, para que nadie lea
  // "0 hallazgos" como "el navegador del lector no baja nada mas". La sonda mira el HTML que el
  // servidor devuelve. Un script declarado que a su vez pida otro archivo pasa por aca sin que
  // esta guarda pueda verlo, y quien contesta eso es tests/e2e_produccion.mjs en un navegador
  // de verdad (CQ-21.1).
  const e = sano();
  e.paginas[0].arbol = ARBOL.replace('</body>',
    '<script>var s=document.createElement("script");s.src="https://invisible.example/x.js";document.head.appendChild(s)</script></body>');
  e.paginas[0].servido = servir(e.paginas[0].arbol);
  assert.deepEqual(comprobar(e), [],
    'si esto empieza a dar un hallazgo, la sonda gano una capacidad y su cabecera miente al decir que no la tiene');
});
