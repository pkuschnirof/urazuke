// Convierte un markdown del método a un HTML autocontenido y legible.
// Soporta lo que usan los documentos: h1-h3, párrafos, tablas, listas (con líneas de
// continuación), negrita, cursiva, código inline, enlaces, hr, y los bloques de prompt con su
// traducción opcional. Uso: node md2html.mjs entrada.md salida.html [idioma]
import { readFileSync, writeFileSync } from 'node:fs';

const [,, origen, destino, idiomaArg] = process.argv;
const idioma = idiomaArg || 'es';
const md = readFileSync(origen, 'utf8').split(/\r?\n/);

// Etiquetas de interfaz por idioma: índice, botón "traducir", botón "ver original", rótulo de la
// traducción, pie con el enlace al repositorio.
const UI = {
  es: ['Contenido', 'Traducir al castellano', 'Ver el original en inglés', 'Prompt (traducción)', 'Repositorio público del método'],
  en: ['Contents', '', '', '', 'Public repository of the method'],
  pt: ['Conteúdo', 'Traduzir para o português', 'Ver o original em inglês', 'Prompt (tradução)', 'Repositório público do método'],
  fr: ['Sommaire', 'Traduire en français', 'Voir l’original en anglais', 'Prompt (traduction)', 'Dépôt public de la méthode'],
  de: ['Inhalt', 'Ins Deutsche übersetzen', 'Englisches Original anzeigen', 'Prompt (Übersetzung)', 'Öffentliches Repository der Methode'],
  it: ['Indice', 'Traduci in italiano', 'Vedi l’originale in inglese', 'Prompt (traduzione)', 'Repository pubblico del metodo'],
  ja: ['目次', '日本語に翻訳', '英語の原文を見る', 'プロンプト（翻訳）', '方法の公開リポジトリ'],
  zh: ['目录', '翻译成中文', '查看英文原文', '提示词（翻译）', '方法的公开仓库'],
}[idioma] || ['Contenido', 'Traducir', 'Original', 'Prompt (traducción)', 'Repositorio'];
const REPO = 'https://github.com/pkuschnirof/urazuke';

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Un enlace relativo a un .md se sirve como .html; los enlaces a REFERENCIAS.md (desde cualquier
// carpeta) apuntan al REFERENCIAS.html que vive junto al HTML generado.
function href(u) {
  const m = /REFERENCIAS\.md(#[^)]*)?$/.exec(u);
  if (m) return 'REFERENCIAS.html' + (m[1] || '');
  if (/^[^:]+\.md(#.*)?$/.test(u)) return u.replace(/\.md(#|$)/, '.html$1').replace(/^(\.\.\/)+/, '');
  return u;
}
function inline(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => {
    const cls = /^Ref\. ?\d+/.test(t) ? ' class="ref"' : '';
    const ext = /^https?:/.test(u) ? ' target="_blank" rel="noopener"' : '';
    return `<a${cls} href="${href(u)}"${ext}>${t}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*:/g, '<strong>$1:</strong>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s).,;:]|$)/g, '$1<em>$2</em>');
  s = s.replace(/\[(hip[oó]tesis|hypothesis|hipótese|hypoth[èe]se|Hypothese|ipotesi|仮説|假设)\]/g, (_, w) => `<span class="tag hip">${w}</span>`);
  s = s.replace(/\[\?\]/g, '<span class="tag q">?</span>');
  s = s.replace(/&lt;-&gt;/g, '&harr;').replace(/-&gt;/g, '&rarr;');
  return s;
}
const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const RE_PELDANO = /^(Pelda[nñ]o|Step|Passo|Degrau|[ÉE]tape|Schritt|ステップ|步骤|第)\s*\d+/;
const RE_REF = /^Ref\.\s*(\d+)/;

let out = [];
let toc = [];
let i = 0;
let para = [];
let enPeldano = false;
let ultimoPrompt = -1;   // índice en `out` del último bloque de prompt (para colgarle la traducción)
const flushPara = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
const renderQuote = q => q.join('\n').split(/\n\s*\n/).map(x => `<p>${inline(x.replace(/\n/g, ' ').trim())}</p>`).join('');

while (i < md.length) {
  const line = md[i];
  if (/^---\s*$/.test(line)) { flushPara(); out.push('<hr>'); i++; continue; }
  const h = /^(#{1,3}) (.*)$/.exec(line);
  if (h) {
    flushPara();
    const lvl = h[1].length, txt = h[2];
    const r = RE_REF.exec(txt);
    const id = r ? `ref-${r[1]}` : slug(txt);
    if (lvl === 2) { out.push(/^(Glosario|Glossary|Glossário|Glossaire|Glossar|用語集|术语表)/.test(txt) ? '</section><section class="glos">' : '</section><section>'); }
    if (lvl === 2 || (lvl === 3 && !/^\d\. /.test(txt) && !r)) toc.push({ lvl, txt, id });
    const esPeldano = lvl === 3 && RE_PELDANO.test(txt);
    if (esPeldano) enPeldano = true;
    const cls = esPeldano ? ' class="peldano"' : (r ? ' class="refh"' : '');
    out.push(`<h${lvl} id="${id}"${cls}>${inline(txt)}</h${lvl}>`);
    i++; continue;
  }
  if (/^\|/.test(line)) {
    flushPara();
    const rows = [];
    while (i < md.length && /^\|/.test(md[i])) { rows.push(md[i]); i++; }
    const cells = r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
    const head = cells(rows[0]);
    const body = rows.slice(2).map(cells);
    let t = '<div class="tw"><table><thead><tr>' + head.map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>';
    for (const r of body) t += '<tr>' + r.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>';
    out.push(t + '</tbody></table></div>');
    continue;
  }
  const li = /^(\s*)([-*]|\d+\.) (.*)$/.exec(line);
  if (li) {
    flushPara();
    const ordered = /\d/.test(li[2]);
    const items = [];
    while (i < md.length) {
      const m = /^(\s*)([-*]|\d+\.) (.*)$/.exec(md[i]);
      if (m) { items.push(m[3]); i++; continue; }
      if (/^\s{2,}\S/.test(md[i]) && items.length) { items[items.length - 1] += ' ' + md[i].trim(); i++; continue; }
      break;
    }
    const tag = ordered ? 'ol' : 'ul';
    const ficha = (!ordered && enPeldano) ? ' class="ficha"' : '';
    if (ficha) enPeldano = false;
    out.push(`<${tag}${ficha}>` + items.map(x => `<li>${inline(x)}</li>`).join('') + `</${tag}>`);
    continue;
  }
  if (/^> ?/.test(line)) {
    flushPara();
    const q = [];
    while (i < md.length && /^> ?/.test(md[i])) { q.push(md[i].replace(/^> ?/, '')); i++; }
    const tr = /^\[([a-z]{2})\]\s*$/.exec(q[0] || '');
    if (tr) {
      // Traducción del prompt anterior: se cuelga del mismo bloque, oculta, con un botón para
      // alternar. En la versión inglesa no tiene sentido y se omite.
      if (idioma !== 'en' && ultimoPrompt >= 0 && UI[1]) {
        const trad = renderQuote(q.slice(1));
        const base = out[ultimoPrompt].replace(/^<div class="pbox">/, '').replace(/<\/div>$/, '');
        out[ultimoPrompt] = `<div class="pbox">${base}<blockquote class="prompt tr" lang="${tr[1]}" hidden>${trad}</blockquote>` +
          `<button type="button" class="trbtn" data-a="${esc(UI[1])}" data-b="${esc(UI[2])}">${esc(UI[1])}</button></div>`;
      }
      ultimoPrompt = -1;
      continue;
    }
    out.push(`<div class="pbox"><blockquote class="prompt">${renderQuote(q)}</blockquote></div>`);
    ultimoPrompt = out.length - 1;
    continue;
  }
  if (/^\s*$/.test(line)) { flushPara(); i++; continue; }
  para.push(line.trim()); i++;
}
flushPara();

let body = '<section>' + out.join('\n') + '</section>';
body = body.replace('<section></section><section>', '<section>');

const tocHtml = `<nav class="toc"><div class="toc-t">${UI[0]}</div><ul>` +
  toc.map(t => `<li class="l${t.lvl}"><a href="#${t.id}">${inline(t.txt)}</a></li>`).join('') + '</ul></nav>';
const pie = `<footer class="pie"><a href="${REPO}" target="_blank" rel="noopener">${esc(UI[4])}: github.com/pkuschnirof/urazuke</a> &middot; CC BY-SA 4.0</footer>`;

const css = `
:root{--ink:#1d1d1b;--mute:#5d5a52;--gold:#b8860b;--gold-soft:#f4ead0;--line:#e4dcc6;--bg:#fbf9f3;--card:#ffffff;--hip:#8a5a00;--ok:#2e6b3a}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 Georgia,'Times New Roman',serif}
.wrap{max-width:1040px;margin:0 auto;padding:32px 24px 80px}
h1{font-size:2rem;line-height:1.2;margin:0 0 .4em;border-bottom:3px solid var(--gold);padding-bottom:.35em}
h2{font-size:1.5rem;margin:2.2em 0 .6em;color:#3a2f00;border-left:6px solid var(--gold);padding-left:.6em}
h3{font-size:1.15rem;margin:1.8em 0 .5em}
h3.peldano{background:var(--gold-soft);border:1px solid var(--line);border-left:6px solid var(--gold);padding:.5em .8em;border-radius:6px;margin-top:2.2em}
h3.refh{font-size:1.02rem;margin-top:1.6em;color:#3a2f00;border-bottom:1px dashed var(--line);padding-bottom:.2em}
h3.refh:target{background:var(--gold-soft);border-radius:6px;padding:.4em .6em}
p{margin:.6em 0}
hr{border:0;border-top:1px dashed var(--line);margin:2.5em 0}
code{font:.88em/1.4 Consolas,'Courier New',monospace;background:#f1ece0;border:1px solid var(--line);border-radius:4px;padding:0 .3em;white-space:nowrap}
strong{color:#2b2000}
a{color:#7a5600}
a.ref{font:700 .78em/1.4 Segoe UI,Arial,sans-serif;background:#f1ece0;border:1px solid var(--line);border-radius:999px;padding:0 .5em;text-decoration:none;color:#5a3f00;white-space:nowrap;vertical-align:middle}
a.ref:hover{background:var(--gold-soft)}
ul,ol{padding-left:1.5em}
li{margin:.3em 0}
ul.ficha{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:.9em 1.2em .9em 2.4em;list-style:none}
ul.ficha li{margin:.45em 0;padding-left:.2em;text-indent:-.2em}
ul.ficha li strong{display:inline-block;min-width:8.5em;color:var(--gold);font-variant:small-caps;letter-spacing:.3px}
.tw{overflow-x:auto;margin:1em 0;border:1px solid var(--line);border-radius:8px;background:var(--card)}
table{border-collapse:collapse;width:100%;font-size:.92em;font-family:Segoe UI,Arial,sans-serif;line-height:1.45}
th{background:#efe6cc;color:#3a2f00;text-align:left;padding:.55em .7em;border-bottom:2px solid var(--gold);vertical-align:bottom}
td{padding:.5em .7em;border-top:1px solid var(--line);vertical-align:top}
tbody tr:nth-child(even){background:#fcfaf4}
td:first-child{white-space:nowrap;color:var(--mute)}
.tag{display:inline-block;font:700 .72em/1.5 Segoe UI,Arial,sans-serif;letter-spacing:.4px;text-transform:uppercase;border-radius:999px;padding:0 .55em;vertical-align:middle}
.tag.hip{background:#fff1d6;color:var(--hip);border:1px solid #e3c78a}
.tag.q{background:#eee;color:#555;border:1px solid #ccc;text-transform:none}
.toc{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:1em 1.4em;margin:1.5em 0 2.5em;font-family:Segoe UI,Arial,sans-serif;font-size:.92em;columns:2;column-gap:2em}
.toc-t{font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:.6px;font-size:.8em;column-span:all;margin-bottom:.5em}
.toc ul{list-style:none;padding:0;margin:0}
.toc li{margin:.15em 0;break-inside:avoid}
.toc li.l3{padding-left:1.2em;font-size:.95em}
.toc a{color:var(--ink);text-decoration:none}
.toc a:hover{color:var(--gold);text-decoration:underline}
.pbox{margin:.8em 0 1.2em}
.prompt{margin:0;padding:.8em 1.1em;background:#fff8e8;border:1px solid #ecd9a6;border-left:5px solid var(--gold);border-radius:6px;font-family:Segoe UI,Arial,sans-serif;font-size:.95em;line-height:1.55}
.prompt p{margin:.4em 0}
.prompt::before{content:'Prompt';display:block;font:700 .7em/1.4 Segoe UI,Arial,sans-serif;letter-spacing:.6px;text-transform:uppercase;color:var(--gold);margin-bottom:.3em}
.prompt.tr{background:#f3f7f0;border-color:#cfdcc6;border-left-color:#5c8a4a}
.prompt.tr::before{content:'${UI[3].replace(/'/g, "\\'")}';color:#3f6b2e}
.trbtn{margin-top:.4em;font:600 .78em/1.4 Segoe UI,Arial,sans-serif;color:#5a3f00;background:var(--gold-soft);border:1px solid #e3c78a;border-radius:999px;padding:.25em .9em;cursor:pointer}
.trbtn:hover{background:#efe0b8}
.glos p{margin:.75em 0;padding-left:1.2em;text-indent:-1.2em}
.glos p strong{color:#3a2f00}
.meta{color:var(--mute);font-family:Segoe UI,Arial,sans-serif;font-size:.85em;margin-top:-.3em}
.pie{margin-top:3em;padding-top:1em;border-top:1px dashed var(--line);font:.85em/1.5 Segoe UI,Arial,sans-serif;color:var(--mute)}
@media (max-width:860px){.toc{columns:1}body{font-size:15px}.wrap{padding:20px 16px 60px}ul.ficha li strong{display:block;min-width:0}}
@media print{body{background:#fff;font-size:11pt}.wrap{max-width:none;padding:0}h2{break-before:page}h2:first-of-type{break-before:avoid}h3.peldano{break-after:avoid}.tw,ul.ficha{break-inside:avoid}a{color:inherit;text-decoration:none}.trbtn{display:none}.prompt.tr[hidden]{display:block}@page{size:A4;margin:16mm 14mm}}
`;
const js = `document.addEventListener('click',function(e){var b=e.target.closest('.trbtn');if(!b)return;var box=b.parentNode;var en=box.querySelector('.prompt:not(.tr)'),tr=box.querySelector('.prompt.tr');var showTr=tr.hidden;tr.hidden=!showTr;en.hidden=showTr;b.textContent=showTr?b.dataset.b:b.dataset.a;});`;

const titulo = (md.find(l => /^# /.test(l)) || '# Documento').slice(2).replace(/</g,'&lt;');
const html = `<!DOCTYPE html><html lang="${idioma}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${titulo}</title><style>${css}</style></head><body><div class="wrap">
${body.replace(/(<h1[^>]*>.*?<\/h1>)/, '$1' + tocHtml)}
${pie}
</div><script>${js}</script></body></html>`;
writeFileSync(destino, html, 'utf8');
console.log('escrito', destino, html.length, 'bytes | secciones:', toc.filter(t => t.lvl === 2).length, '| peldanos:', toc.filter(t => RE_PELDANO.test(t.txt)).length);
