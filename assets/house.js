// Shared house helpers. No framework, no dependencies.
// Every number on a page comes from JSON produced by the repo itself, so a page
// cannot show a figure that no command can reproduce.
export async function loadJSON(path){
  const r = await fetch(path, {cache:"no-store"});
  if(!r.ok) throw new Error("cannot load " + path + " (" + r.status + ")");
  return r.json();
}
export function evidence(items){
  return items.map(function(m){
    return `<div class="ev ${m.tone||""}"><div class="v">${m.value}</div>`
      + `<div class="l">${m.label}</div>`
      + (m.command ? `<div class="c">${m.command}</div>` : "")
      + `</div>`;
  }).join("");
}
export function bars(items, max){
  const top = max || Math.max.apply(null, items.map(function(i){return i.value||0;})) || 1;
  return items.map(function(i){
    const h = Math.max(3, Math.round(100 * (i.value||0) / top));
    return `<div class="b" style="height:${h}%" title="${i.label}: ${i.value}"><span>${i.label}</span></div>`;
  }).join("");
}
export function heat(rows, cols, value){ // value(r,c) -> 0..1
  let out = `<div class="heat" style="grid-template-columns:repeat(${cols},1fr)">`;
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
    const v = Math.max(0, Math.min(1, value(r,c)));
    out += `<i style="background:rgba(76,195,138,${0.08+0.85*v})"></i>`;
  }
  return out + `</div>`;
}
export function table(rows, cols){
  return `<table><thead><tr>` + cols.map(function(c){return `<th>${c}</th>`;}).join("")
    + `</tr></thead><tbody>` + rows.map(function(r){
        return `<tr>` + cols.map(function(c){return `<td>${r[c] !== undefined ? r[c] : "";}</td>`;}).join("") + `</tr>`;
      }).join("") + `</tbody></table>`;
}
export function fail(el, err){
  if(!el) return;
  el.innerHTML = `<div class="panel" style="border-color:rgba(248,81,73,.5)">`
    + `<h3 style="color:var(--danger)">No data yet</h3>`
    + `<p>This panel renders only real output. Run <span class="mono">make evidence</span> `
    + `(or the repo smoke script), then reload. Details: <span class="mono">${err.message}</span></p></div>`;
}
export function count(el, n){ if(el) el.textContent = n; }
