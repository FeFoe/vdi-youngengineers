const TZ = 'Europe/Berlin';

const GROUPS = {
  ye:    { label: 'Hamburg · YE',        long: 'VDI Hamburg – Young Engineers',             c: 'var(--g-ye)' },
  yenet: { label: 'YE-Netzwerk',         long: 'Young Engineers bundesweit & im Norden', c: 'var(--g-yenet)' },
  hh:    { label: 'VDI Hamburg',         long: 'VDI Hamburg & Arbeitskreise',          c: 'var(--g-hh)' },
  vdi:   { label: 'VDI-Webinare',        long: 'VDI-Webinare & Coaching',              c: 'var(--g-vdi)' },
  nord:  { label: 'Weitere BVs',         long: 'Weitere Bezirksvereine',               c: 'var(--g-nord)' }
};
const MODES = { hh: 'Hamburg & Umland', online: 'Online', reise: 'Unterwegs' };

/* Eigene Themen-Icons, 48er Raster, Linienstil */
const ICONS = {
  stammtisch:'<path d="M9 16h14v20a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4z"/><path d="M23 20h3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-3"/><path d="M9 22h14"/><path d="M12 16c0-3 2-5 4-5s4 2 4 5"/>',
  fernwaerme:'<path d="M4 32h40M4 40h40"/><path d="M10 32v8M38 32v8"/><path d="M24 26c-5 0-8-3-8-8 0-5 5-7 5-13 4 2 10 7 10 13 0 5-3 8-7 8z"/><path d="M24 26c-2 0-3-1.5-3-3.5S24 18 24 16c2 2 3 4 3 6.5S26 26 24 26z"/>',
  batterie:'<rect x="6" y="14" width="32" height="22" rx="2"/><path d="M38 21h4v8h-4"/><path d="M24 17l-6 9h8l-5 8"/>',
  seekabel:'<path d="M6 20h36l-5 8H11z"/><path d="M15 20v-6h12v6M21 14V9"/><path d="M4 33c4-3 8 3 12 0s8 3 12 0 8 3 12 0"/><path d="M30 28c0 6-4 8-10 10s-8 4-8 6"/>',
  welcome:'<path d="M12 42V7h22v35"/><path d="M12 7l15 5v32l-15-2"/><circle cx="23" cy="27" r="1.5"/><path d="M4 42h40"/><path d="M38 16l4-3M38 22h5M38 28l4 3"/>',
  radar:'<circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="11"/><circle cx="24" cy="24" r="4"/><path d="M24 24L37 11"/><circle cx="32" cy="30" r="1.5"/><circle cx="15" cy="17" r="1.5"/>',
  robotik:'<path d="M6 43h18"/><path d="M11 43v-5h8v5"/><circle cx="15" cy="33" r="4"/><path d="M17.5 30l9-12"/><circle cx="28" cy="15" r="3.5"/><path d="M31 13l8-4M31.5 17.5l8 3"/><path d="M39 9v4M39.5 20.5l-1 4"/>',
  gipfel:'<path d="M3 42l14-22 6 9 7-11 15 24z"/><path d="M30 18V5l8 3.5-8 3.5"/><path d="M12 30l5-3 3 4M26 26l4-3 4 4"/>',
  gespraech:'<path d="M5 8h25v15H16l-7 6v-6H5z"/><path d="M34 17h9v15h-4v6l-7-6H20v-5"/><path d="M11 14h13M11 18h8"/>',
  drohne:'<rect x="18" y="19" width="12" height="8" rx="2"/><path d="M18 21l-8-5M30 21l8-5M18 25l-8 5M30 25l8 5"/><path d="M4 16h12M32 16h12M4 30h12M32 30h12"/><path d="M24 27v5"/><path d="M14 40c3-2 6 2 10 0s7 2 10 0"/><path d="M20 35l4-3 4 3"/>',
  bewerbung:'<path d="M11 5h19l8 8v30H11z"/><path d="M30 5v8h8"/><circle cx="20" cy="19" r="4"/><path d="M14 29c1.5-4 10.5-4 12 0"/><path d="M16 35h16M16 39h11"/>',
  waermepumpe:'<path d="M4 34c5-4 9 4 14 0s9 4 14 0 9 4 12 1"/><path d="M4 41c5-4 9 4 14 0s9 4 14 0 9 4 12 1"/><path d="M17 27V8M17 8l-5 5M17 8l5 5M31 27V13M31 13l-5 5M31 13l5 5"/>',
  luftfahrt:'<path d="M24 4c2 0 3 2 3 4v10l15 9v4l-15-4v9l5 4v3l-8-2-8 2v-3l5-4v-9L6 31v-4l15-9V8c0-2 1-4 3-4z"/>',
  sprinkler:'<path d="M24 4v8"/><path d="M14 12h20"/><path d="M19 12l-2 6h14l-2-6"/><path d="M15 25l-3 5M24 23v7M33 25l3 5M18 35l-2 5M30 35l2 5M24 36v6M9 33l-3 4M39 33l3 4"/>',
  reise:'<rect x="11" y="15" width="26" height="25" rx="3"/><path d="M18 15V9h12v6"/><path d="M19 21v13M29 21v13"/><path d="M15 40v3M33 40v3"/>',
  regen:'<path d="M13 28a8 8 0 0 1 1-16 11 11 0 0 1 21 3 6.5 6.5 0 0 1 0 13z"/><path d="M15 34l-2 5M23 34l-2 5M31 34l-2 5"/><path d="M6 44h36"/>',
  wasserstoff:'<circle cx="15" cy="24" r="9"/><circle cx="33" cy="24" r="9"/><path d="M12 20v8M18 20v8M12 24h6M30 20v8M36 20v8M30 24h6"/>',
  weihnachten:'<path d="M24 4l2 4.5 4.5.5-3.5 3 1 4.5-4-2.5-4 2.5 1-4.5-3.5-3 4.5-.5z"/><path d="M24 18l9 11h-5l9 10H11l9-10h-5z"/><path d="M24 39v5"/>'
};
const ico = (name, cls) => '<svg class="'+(cls||'ico')+'" viewBox="0 0 48 48" aria-hidden="true">'+(ICONS[name]||ICONS.gespraech)+'</svg>';
const HH=[53.5503,9.9920];
const RANGES=[15,25,50,100,250,500,Infinity];
function distKm(e){
  if (!e.geo || e.mode==='online') return 0;
  const r=Math.PI/180, dLat=(e.geo[0]-HH[0])*r, dLng=(e.geo[1]-HH[1])*r;
  const a=Math.sin(dLat/2)**2+Math.cos(HH[0]*r)*Math.cos(e.geo[0]*r)*Math.sin(dLng/2)**2;
  return 6371*2*Math.asin(Math.sqrt(a));
}
const isYE = e => e.group==='ye' || e.group==='yenet';
function inRange(e){ return isYE(e) || distKm(e) <= RANGES[state.radius]; }
const ARROW = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';
const CHAT = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H10l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/></svg>';
const COPY = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="8" width="12" height="12"/><path d="M16 8V4H4v12h4"/></svg>';
const XICON = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>';
const CHECK = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

/* Daten kommen aus Hugo (layouts/partials/daten.html): Termine von vdi.de und eigene Termine, Stammtische, Fotos, Kontakt */
const DATEN = JSON.parse(document.getElementById("ye-daten").textContent);
const EVENTS = DATEN.termine;
const AKS = DATEN.arbeitskreise || [];
const akName = id => (AKS.find(a=>a.id===id)||{}).name || id;
const AUSGEBLENDET = []; /* wird schon beim Bauen in Hugo gefiltert (data/termine_anpassungen.yaml) */

/* ---------- Zeit ---------- */
function startDate(e){ return e.allday ? new Date(e.start+'T00:00:00+01:00') : new Date(e.start); }
function endDate(e){
  if (e.allday) return new Date((e.end||e.start)+'T23:59:00+01:00');
  if (e.end) return new Date(e.end);
  return new Date(new Date(e.start).getTime() + 3*3600e3);
}
const fParts = new Intl.DateTimeFormat('de-DE',{weekday:'short',day:'2-digit',month:'short',timeZone:TZ});
const fTime = new Intl.DateTimeFormat('de-DE',{hour:'2-digit',minute:'2-digit',timeZone:TZ});
const fMonth = new Intl.DateTimeFormat('de-DE',{month:'long',year:'numeric',timeZone:TZ});
const fLong = new Intl.DateTimeFormat('de-DE',{weekday:'long',day:'numeric',month:'long',timeZone:TZ});
const fShort = new Intl.DateTimeFormat('de-DE',{day:'2-digit',month:'2-digit',timeZone:TZ});
const fYMD = new Intl.DateTimeFormat('en-CA',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:TZ});
function parts(d){ const o={}; fParts.formatToParts(d).forEach(p=>o[p.type]=p.value); return {wd:o.weekday.replace('.',''), d:o.day, m:o.month.replace('.','')}; }
function dateLabel(e){
  const s=startDate(e);
  if (e.allday && e.end && e.end!==e.start) return fShort.format(s).replace(/\.$/,'')+'.–'+fShort.format(endDate(e)).replace(/\.$/,'')+'.';
  return fLong.format(s);
}
function timeLabel(e){
  if (e.allday) return (e.end && e.end!==e.start) ? 'ganztägig, mehrere Tage' : (e.zeitoffen ? 'Uhrzeit auf vdi.de' : 'ganztägig');
  const s=fTime.format(new Date(e.start));
  return e.end ? s+'–'+fTime.format(new Date(e.end))+' Uhr' : 'ab '+s+' Uhr';
}
function isToday(e){ return fYMD.format(startDate(e))===fYMD.format(new Date()); }
function durLabel(e){
  if (e.allday && e.zeitoffen && (!e.end||e.end===e.start)) return 'Dauer siehe vdi.de';
  if (e.allday){ const n=Math.round((new Date(e.end+'T12:00:00+01:00')-new Date(e.start+'T12:00:00+01:00'))/86400e3)+1; return n+' Tage'; }
  if (!e.end) return 'Open End';
  const m=(new Date(e.end)-new Date(e.start))/60000; const h=m/60;
  return (Number.isInteger(h)?h:h.toFixed(1).replace('.',','))+' h';
}

/* ---------- Zustand ---------- */
const state = { tab:'entdecken', group:new Set(), ak:new Set(), online:true, saved:new Set(), done:new Set(), decided:[], openId:null, quiet:false, radius:0 };
function loadSet(key,set){ try { const raw=localStorage.getItem(key); if(raw) JSON.parse(raw).forEach(id=>set.add(id)); } catch(_){} }
loadSet('ye-hh-saved', state.saved); loadSet('ye-hh-done', state.done);
try { const f=JSON.parse(localStorage.getItem('ye-hh-filter')||'{}'); if(Array.isArray(f.group)) f.group.forEach(v=>state.group.add(v)); if(typeof f.online==='boolean') state.online=f.online; state.quiet=!!f.quiet; if(Number.isInteger(f.radius)&&f.radius>=0&&f.radius<RANGES.length) state.radius=f.radius; if(Array.isArray(f.ak)) f.ak.filter(a=>AKS.some(x=>x.id===a)).forEach(a=>state.ak.add(a)); } catch(_){}
function persist(){
  try { localStorage.setItem('ye-hh-saved', JSON.stringify([...state.saved])); } catch(_){}
  try { localStorage.setItem('ye-hh-done', JSON.stringify([...state.done])); } catch(_){}
  try { localStorage.setItem('ye-hh-filter', JSON.stringify({group:[...state.group],online:state.online,quiet:state.quiet,radius:state.radius,ak:[...state.ak]})); } catch(_){}
}
const byId = id => EVENTS.find(e=>e.id===id);
function upcoming(){ const now=new Date(); return EVENTS.filter(e=>endDate(e)>now && !AUSGEBLENDET.some(h=>(e.url||'').endsWith('/'+h.slug))).sort((a,b)=>startDate(a)-startDate(b)); }
function byChips(e){ return (!state.group.size||state.group.has(e.group))&&(state.online||e.mode!=='online')&&akPasst(e); }
/* Meine Arbeitskreise: YE Hamburg bleibt immer sichtbar, YE-Netzwerk nur ohne Fachbezug (Welcome Call,
   Bundesstammtisch …). Fachtermine anderer YE-Gruppen werden wie alle anderen nach Arbeitskreis gefiltert. */
function immerSichtbar(e){ return e.group==='ye' || (e.group==='yenet' && !(e.ak&&e.ak.length)); }
function akPasst(e){ return !state.ak.size || immerSichtbar(e) || (e.ak||[]).some(a=>state.ak.has(a)); }
function filtered(){ return upcoming().filter(e=>inRange(e)&&byChips(e)); }

/* ---------- Helfer ---------- */
const esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const HEART = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-9.6-9.1C.9 8.6 3 5 6.6 5c2.1 0 3.5 1.1 4.4 2.4h2C13.9 6.1 15.3 5 17.4 5 21 5 23.1 8.6 21.6 11.9 19.5 16.4 12 21 12 21z"/></svg>';
function badgesHtml(e){
  let h='';
  const r=reg(e);
  if (!r.open && !r.pending) h+='<span class="badge closed">'+(e.closed?'Ausgebucht':'Anmeldung geschlossen')+'</span>';
  if (r.open && r.soon) h+='<span class="badge warn">Anmeldung bis '+esc(fDeadline.format(r.deadline))+'</span>';
  if (e.spots && r.open) h+='<span class="badge warn">Restplätze</span>';
  if (isToday(e)) h+='<span class="badge today">Heute</span>';
  if (e.geplant) h+='<span class="badge warn">Geplant</span>';
  if (e.tipp) h+='<span class="badge tipp">YE-Tipp</span>';
  (e.tags||[]).forEach(t=>h+='<span class="badge">'+esc(t)+'</span>');
  return h ? '<div class="badges">'+h+'</div>' : '';
}
function bandHtml(e){
  const g=GROUPS[e.group];
  return '<div class="band" style="--c:'+g.c+'"><span class="ico-tile">'+ico(e.icon)+'</span>'+
    '<span class="pill" style="--c:'+g.c+'"><span class="dot"></span>'+esc(g.long)+'</span></div>';
}
const fDeadline = new Intl.DateTimeFormat('de-DE',{weekday:'short',day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',timeZone:TZ});
/* Anmeldestatus aus den Angaben auf vdi.de: closed (Text), deadline (ISO), spots (Text) */
function reg(e){
  const now=new Date();
  if (e.closed) return {open:false, text:e.closed};
  if (e.noreg) return {open:false, pending:true, text:'Anmeldung folgt'};
  if (e.deadline){
    const d=new Date(e.deadline);
    if (d<now) return {open:false, text:'Anmeldeschluss ist vorbei ('+fDeadline.format(d)+' Uhr)'};
    return {open:true, deadline:d, soon:(d-now)<7*86400e3, text:'Anmeldeschluss '+fDeadline.format(d)+' Uhr'};
  }
  return {open:true, text:'Über vdi.de, keine Frist genannt'};
}
function regLabel(e){ return reg(e).open ? 'Zur Anmeldung auf vdi.de' : 'Infos auf vdi.de'; }
function sfHtml(e){
  return '<dl class="sf">'+
    '<div><dt>Datum</dt><dd>'+esc(dateLabel(e))+'</dd></div>'+
    '<div><dt>Zeit</dt><dd>'+esc(timeLabel(e))+'</dd></div>'+
    '<div class="wide"><dt>Ort</dt><dd>'+esc(e.place)+(e.address?'<br><span style="font-weight:500;color:var(--muted)">'+esc(e.address)+'</span>':'')+'</dd></div>'+
    '<div class="wide sf-org"><dt>Veranstalter</dt><dd>'+esc(e.org)+'</dd></div>'+
    (e.ak&&e.ak.length ? '<div class="wide sf-ak"><dt>'+(e.akArt==='ak'?'Arbeitskreis':'Passt zu')+'</dt><dd>'+esc(e.ak.map(akName).join(', '))+(e.akVon?'<br><span>'+esc(e.akVon)+'</span>':'')+(e.akArt==='thema'?'<br><span>Zuordnung nach Stichworten</span>':'')+'</dd></div>' : '')+
    '<div class="wide'+(reg(e).open&&!reg(e).deadline&&!e.spots?' sf-reg-plain':'')+'"><dt>Anmeldung</dt><dd class="reg-'+(reg(e).open?'open':'closed')+'">'+esc(reg(e).text)+(e.spots&&reg(e).open?'<br><span>'+esc(e.spots)+'</span>':'')+'</dd></div>'+
  '</dl>';
}
function toast(msg){
  const t=document.getElementById('toast'); t.textContent=msg; t.hidden=false;
  clearTimeout(toast._t); toast._t=setTimeout(()=>t.hidden=true,2200);
}
async function copyText(text, fallbackHost){
  try { await navigator.clipboard.writeText(text); toast('Kopiert'); return; } catch(_){}
  const ta=document.createElement('textarea'); ta.value=text; ta.setAttribute('readonly',''); ta.style.position='fixed'; ta.style.opacity='0';
  document.body.appendChild(ta); ta.select(); let ok=false; try{ ok=document.execCommand('copy'); }catch(_){}
  ta.remove();
  if (ok) { toast('Kopiert'); return; }
  if (fallbackHost){
    fallbackHost.hidden=false;
    fallbackHost.innerHTML='<label for="fb-text">Kopieren klappt hier nicht automatisch. Text markieren und kopieren:</label><textarea id="fb-text" readonly></textarea>';
    const t=fallbackHost.querySelector('textarea'); t.value=text; t.focus(); t.select();
  } else toast('Kopieren hier nicht möglich');
}
function inviteText(e){
  return e.title+'\n'+dateLabel(e)+', '+timeLabel(e)+'\n'+e.place+(e.address?' ('+e.address+')':'')+'\n\n'+e.teaser+'\n\nInfos & Anmeldung: '+e.url;
}
function utc(d){ return d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,''); }
/* Kalendereintrag als .ics-Datei, wird im Browser erzeugt (keine Daten an Dritte) */
function icsText(e){
  const x=s=>String(s||'').replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/([,;])/g,'\\$1');
  const day=d=>d.replace(/-/g,'');
  const when = e.allday
    ? ['DTSTART;VALUE=DATE:'+day(e.start), 'DTEND;VALUE=DATE:'+fYMD.format(new Date(endDate(e).getTime()+86400e3)).replace(/-/g,'')]
    : ['DTSTART:'+utc(startDate(e)), 'DTEND:'+utc(endDate(e))];
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//VDI Hamburg Young Engineers//Termine//DE','BEGIN:VEVENT',
    'UID:'+e.id+'@'+location.hostname, 'DTSTAMP:'+utc(new Date()), ...when,
    'SUMMARY:'+x(e.title), 'LOCATION:'+x([e.place,e.address].filter(Boolean).join(', ')),
    'DESCRIPTION:'+x(e.teaser+'\n\n'+e.url), 'URL:'+e.url, 'END:VEVENT','END:VCALENDAR'].join('\r\n')+'\r\n';
}
function downloadIcs(e){
  const url=URL.createObjectURL(new Blob([icsText(e)],{type:'text/calendar;charset=utf-8'}));
  const l=document.createElement('a'); l.href=url; l.download=e.id+'.ics'; document.body.appendChild(l); l.click(); l.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000); toast('Kalenderdatei gespeichert');
}
const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';

/* ---------- Render ---------- */
function setHash(h){ try{ history.replaceState(null,'','#'+h); }catch(_){ location.hash=h; } }
function renderChrome(){
  document.querySelectorAll('.tab').forEach(b=>{ const on=b.dataset.tab===state.tab; b.setAttribute('aria-selected', String(on)); b.tabIndex=on?0:-1; });
  document.querySelectorAll('.view').forEach(v=>v.hidden = v.id!=='view-'+state.tab);
  document.querySelectorAll('.chip[data-f]').forEach(c=>{ const set=state[c.dataset.f]; c.setAttribute('aria-pressed', String(c.dataset.v==='all' ? !set.size : set.has(c.dataset.v))); });
  document.getElementById('filters').hidden = state.tab==='gemerkt';
  document.getElementById('cnt-all').textContent = filtered().length;
  document.getElementById('online-toggle').setAttribute('aria-pressed',String(state.online));
  { const n=state.ak.size, cnt=document.getElementById('cnt-ak'); cnt.hidden=!n; cnt.textContent=n;
    document.getElementById('ak-knopf').setAttribute('aria-pressed',String(!!n));
    const weg=n ? upcoming().filter(e=>inRange(e)&&!akPasst(e)&&(!state.group.size||state.group.has(e.group))&&(state.online||e.mode!=='online')).length : 0;
    document.getElementById('ak-note').textContent = weg ? weg+' Termine anderer Arbeitskreise ausgeblendet' : ''; }
  const rad=document.getElementById('radius'); rad.value=state.radius;
  const lim=RANGES[state.radius]; const lbl = lim===Infinity ? 'Ohne Grenze' : 'Hamburg + '+lim+' km';
  document.getElementById('radius-out').textContent=lbl; rad.setAttribute('aria-valuetext',lbl);
  const hiddenN=upcoming().filter(e=>byChips(e)&&!inRange(e)).length;
  document.getElementById('radius-note').textContent = hiddenN ? hiddenN+' weitere außerhalb des Umkreises' : '';
  document.getElementById('cnt-saved').textContent = upcoming().filter(e=>state.saved.has(e.id)).length;
}
function rowState(e){
  const r=reg(e);
  if (!r.open && !r.pending) return '<div class="rstate closed">'+(e.closed?'Ausgebucht':'Anmeldung geschlossen')+'</div>';
  if (r.open && r.deadline) return '<div class="rstate'+(r.soon?' warn':'')+'">'+esc(r.text)+'</div>';
  if (r.open && e.spots) return '<div class="rstate warn">'+esc(e.spots)+'</div>';
  return '';
}
function rowHtml(e, ctx){
  const p=parts(startDate(e)); const g=GROUPS[e.group]; const saved=state.saved.has(e.id); const done=state.done.has(e.id);
  const reg='<a class="heart reg" href="'+esc(e.url)+'" target="_blank" rel="noopener" aria-label="'+esc(regLabel(e))+': '+esc(e.title)+'" title="'+esc(regLabel(e))+'">'+ARROW+'</a>';
  const actions = ctx==='saved'
    ? reg+'<button class="heart done" data-done="'+e.id+'" aria-pressed="'+done+'" aria-label="'+(done?'Nicht mehr als angemeldet markieren':'Als angemeldet abhaken')+'" title="Angemeldet">'+CHECK+'</button>'
    : reg+'<button class="heart like" data-heart="'+e.id+'" aria-pressed="'+saved+'" aria-label="'+(saved?'Nicht mehr merken':'Merken')+'">'+HEART+'</button>';
  return '<li class="row'+(ctx==='saved'&&done?' is-done':'')+'" style="--c:'+g.c+'">'+
    '<div class="date" data-open="'+e.id+'"><div class="wd">'+esc(p.wd)+'</div><div class="d">'+esc(p.d)+'</div><div class="m">'+esc(p.m)+'</div></div>'+
    '<div class="rmain" data-open="'+e.id+'" role="button" tabindex="0" aria-label="Details zu '+esc(e.title)+'">'+
      '<span class="pill" style="--c:'+g.c+'"><span class="dot"></span>'+esc(g.label)+(e.geplant?' · geplant':'')+(e.tipp?' · YE-Tipp':'')+(isToday(e)?' · Heute':'')+'</span>'+
      '<div class="rtitle">'+esc(e.title)+'</div>'+
      '<div class="rmeta">'+esc(timeLabel(e))+' · '+esc(e.place)+(distKm(e)>20?' · ca. '+Math.round(distKm(e)/5)*5+' km':'')+'</div>'+rowState(e)+
    '</div>'+
    '<div class="ractions">'+actions+'</div>'+
  '</li>';
}
function grouped(list){
  let html='', cur='';
  list.forEach(e=>{ const m=fMonth.format(startDate(e)); if(m!==cur){ if(cur) html+='</ul>'; cur=m; html+='<h3 class="month">'+esc(m)+'</h3><ul class="rows">'; } html+=rowHtml(e); });
  return html ? html+'</ul>' : '';
}
function savedSection(title, list){
  return list.length ? '<h3 class="month">'+esc(title)+' · '+list.length+'</h3><ul class="rows">'+list.map(e=>rowHtml(e,'saved')).join('')+'</ul>' : '';
}
function renderList(){
  const l=filtered();
  document.getElementById('list').innerHTML = l.length ? grouped(l) : '<p class="noresult">Für diese Filterkombination gibt es gerade keine Termine. Wähl weitere Filter dazu oder vergrößere den Umkreis.</p>';
}
function renderSaved(){
  const l=upcoming().filter(e=>state.saved.has(e.id));
  document.getElementById('saved-tools').hidden = !l.length;
  document.getElementById('saved').innerHTML = l.length ?
    savedSection('Noch anmelden', l.filter(e=>!state.done.has(e.id))) + savedSection('Angemeldet', l.filter(e=>state.done.has(e.id))) :
    '<p class="noresult">Noch nichts gemerkt. Wisch unter „Entdecken“ nach rechts oder tipp in der Liste auf das Herz.</p>';
}
function deck(){ const done=new Set(state.decided.map(d=>d.id)); return filtered().filter(e=>!done.has(e.id)&&!state.saved.has(e.id)&&(reg(e).open||reg(e).pending)); }
function renderDeck(){
  const st=document.getElementById('stack'); const all=filtered(); const d=deck();
  document.getElementById('btn-undo').disabled = !state.decided.length;
  document.getElementById('btn-skip').disabled = !d.length;
  document.getElementById('btn-save').disabled = !d.length;
  if (!d.length){
    st.innerHTML='<div class="empty"><h3>Alles durchgeblättert</h3><p>'+(all.length?'Deine Favoriten findest du unter „Gemerkt“.':'Mit diesen Filtern gibt es gerade keine Termine.')+'</p>'+
      '<div class="toolbar" style="margin:0;justify-content:center"><button class="btn" id="restart">Von vorn</button><button class="btn primary" id="to-saved">Zu „Gemerkt“</button></div></div>';
    st.querySelector('#restart').onclick=()=>{ state.decided=[]; renderDeck(); };
    st.querySelector('#to-saved').onclick=()=>switchTab('gemerkt');
  } else {
    /* Stapel: bis zu 6 sichtbare Lagen, schrumpft mit den verbleibenden Karten */
    const layers=Math.min(d.length-1,6);
    st.style.marginBottom=(layers*9)+'px';
    let pile=''; for(let k=layers;k>=2;k--) pile+='<div class="pile" aria-hidden="true" style="transform:translateY('+(k*9)+'px) scale('+(1-k*0.03).toFixed(3)+');opacity:'+(1-(k-1)*0.1).toFixed(2)+'"></div>';
    st.innerHTML = pile + d.slice(0,2).reverse().map((e,i,arr)=>{
      const depth=arr.length-1-i; const g=GROUPS[e.group];
      return '<article class="sheetcard'+(depth?' under'+depth:'')+'" data-id="'+e.id+'" style="--c:'+g.c+'"'+(depth?' aria-hidden="true"':' tabindex="0" aria-label="'+esc(e.title)+'"')+'>'+
        bandHtml(e)+
        '<div class="sc-body"><h3 class="sc-title">'+esc(e.title)+'</h3>'+badgesHtml(e)+'<p class="sc-text">'+esc(e.teaser)+'</p></div>'+
        sfHtml(e)+
        '<span class="stamp save">MERKEN</span><span class="stamp skip">WEITER</span>'+
      '</article>';
    }).join('');
    const top=st.querySelector('.sheetcard:not([aria-hidden])'); if(top) bindDrag(top);
    st.style.height='';
    st.querySelectorAll('.sheetcard').forEach(fitCard);
  }
}
/* Karte an die Stapelhöhe anpassen: erst Kurzbeschreibung kürzen, dann unwichtige Zeilen ausblenden,
   zuletzt den Stapel vergrößern. Der Titel wird nie abgeschnitten. */
function fitCard(card){
  const body=card.querySelector('.sc-body'), text=card.querySelector('.sc-text'); if(!body||!body.clientHeight) return;
  const voll=()=>body.scrollHeight<=body.clientHeight+1;
  const schritte=[
    ()=>text.style.webkitLineClamp='3', ()=>text.style.webkitLineClamp='2',
    ()=>{ const r=card.querySelector('.sf-reg-plain'); if(r) r.hidden=true; },
    ()=>{ const o=card.querySelector('.sf-org'); if(o) o.hidden=true; },
    ()=>text.style.webkitLineClamp='1', ()=>text.hidden=true
  ];
  for (const s of schritte){ if(voll()) return; s(); }
  if (!voll()){ const st=card.parentElement; st.style.height=(st.offsetHeight+body.scrollHeight-body.clientHeight+2)+'px'; }
}
/* Vorschau neben dem Kartenstapel (nur breite Bildschirme, per CSS) */
function renderVorschau(){ const el=document.getElementById('vorschau-liste'); if(!el) return; const l=filtered().slice(0,5);
  el.innerHTML = l.length ? l.map(e=>rowHtml(e)).join('') : '<li class="row"><span class="rmeta">Keine Termine für diese Filter.</span></li>'; }
function renderAll(){ renderChrome(); renderDeck(); renderVorschau(); renderList(); renderSaved(); if(window.__extras){ renderNext(); renderMap(); } }

/* ---------- Swipe ---------- */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let busy=false;
function decide(dir){
  if (busy) return; const d=deck(); if(!d.length) return; const e=d[0];
  const card=document.querySelector('.sheetcard[data-id="'+e.id+'"]');
  const apply=()=>{ state.decided.push({id:e.id,dir}); busy=false;
    if(dir==='save'){ state.saved.add(e.id); persist(); renderAll(); nachMerken(e); }
    else renderAll();
    const naechste=deck()[0]; melden((dir==='save'?'Gemerkt: ':'Übersprungen: ')+e.title+(naechste?'. Nächste Karte: '+naechste.title:'. Keine weiteren Karten.')); };
  if (card && !reduce){ busy=true; card.dataset.hint=dir; card.style.transform='translate('+(dir==='save'?'':'-')+'130%,20px) rotate('+(dir==='save'?18:-18)+'deg)'; card.style.opacity='0'; setTimeout(apply,240); }
  else apply();
}
function melden(text){ const s=document.getElementById('sr-status'); if(!s) return; s.textContent=''; setTimeout(()=>{ s.textContent=text; },50); }
function undo(){
  const last=state.decided.pop(); if(!last) return;
  if (last.dir==='save'){ state.saved.delete(last.id); persist(); }
  renderAll();
}
function bindDrag(card){
  let sx=0, sy=0, dx=0, on=false;
  card.addEventListener('pointerdown',ev=>{ if(ev.button>0) return; on=true; sx=ev.clientX; sy=ev.clientY; dx=0; try{card.setPointerCapture(ev.pointerId);}catch(_){} card.classList.add('dragging'); });
  card.addEventListener('pointermove',ev=>{ if(!on) return; dx=ev.clientX-sx; const dy=ev.clientY-sy; card.style.transform='translate('+dx+'px,'+(dy*0.15)+'px) rotate('+(dx/18)+'deg)'; const th=card.offsetWidth*0.5, p=Math.max(0,Math.min(1,(Math.abs(dx)-30)/(th-30))); card.querySelector('.stamp.save').style.opacity=dx>0?p:0; card.querySelector('.stamp.skip').style.opacity=dx<0?p:0; });
  const reset=()=>{ card.classList.remove('dragging'); card.style.transform=''; card.dataset.hint=''; card.querySelectorAll('.stamp').forEach(x=>x.style.opacity=''); };
  card.addEventListener('pointerup',()=>{ if(!on) return; on=false; card.classList.remove('dragging');
    if (Math.abs(dx)>card.offsetWidth*0.5) decide(dx>0?'save':'skip');
    else if (Math.abs(dx)<6) { reset(); openDetail(card.dataset.id); }
    else reset(); });
  card.addEventListener('pointercancel',()=>{ on=false; reset(); });
  /* iOS: sobald die Geste klar seitwärts geht, darf die Seite nicht mehr scrollen */
  let tx=0, ty=0;
  card.addEventListener('touchstart',ev=>{ const t=ev.touches[0]; tx=t.clientX; ty=t.clientY; },{passive:true});
  card.addEventListener('touchmove',ev=>{ const t=ev.touches[0]; const ddx=Math.abs(t.clientX-tx), ddy=Math.abs(t.clientY-ty); if(ddx>8 && ddx>ddy) ev.preventDefault(); },{passive:false});
  card.addEventListener('keydown',ev=>{ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); openDetail(card.dataset.id); } });
}

/* ---------- Match: nach dem Merken direkt zur Anmeldung ----------
   Der Dialog erscheint nur beim ersten Merken pro Sitzung; danach eine kurze Meldung mit Anmeldelink,
   damit schnelles Durchwischen nicht ständig unterbrochen wird. */
function nachMerken(e){
  if (!e) return;
  let gezeigt=false; try{ gezeigt=sessionStorage.getItem('ye-match')==='1'; }catch(_){}
  if (!state.quiet && !gezeigt){ try{ sessionStorage.setItem('ye-match','1'); }catch(_){} showMatch(e); return; }
  if (state.quiet || !reg(e).open){ toast('Gemerkt'); return; }
  const t=document.getElementById('toast');
  t.innerHTML='Gemerkt · <a href="'+esc(e.url)+'" target="_blank" rel="noopener">Jetzt anmelden<span class="sr-only"> (öffnet neues Fenster)</span></a>';
  t.hidden=false; t.querySelector('a').onclick=()=>{ t.hidden=true; };
  clearTimeout(toast._t); toast._t=setTimeout(()=>t.hidden=true,5000);
}
function showMatch(e){
  const box=document.getElementById('match');
  box.innerHTML = '<button class="close" id="m-close" aria-label="Schließen">'+XICON+'</button>' + bandHtml(e) +
    '<div class="m-body">'+
      '<p class="m-kicker">Gemerkt</p>'+
      '<h2 class="m-title" id="m-title">'+esc(e.title)+'</h2>'+
      '<p class="m-text">'+esc(dateLabel(e))+', '+esc(timeLabel(e))+' · '+esc(e.place)+'</p>'+
      '<p class="m-text">'+(e.noreg?'Für diesen Termin gibt es noch keine Anmeldung. Ort und Anmeldung kündigen wir zuerst in der WhatsApp-Community an.':!reg(e).open?esc(reg(e).text)+'.':(reg(e).deadline?esc(reg(e).text)+'. ':'')+'Damit du sicher dabei bist, melde dich jetzt auf vdi.de an. Das dauert meist nur eine Minute.')+'</p>'+
      '<div class="m-actions">'+
        '<a class="btn primary" id="m-reg" href="'+esc(e.url)+'" target="_blank" rel="noopener">'+esc(regLabel(e))+'</a>'+
      '</div>'+
      '<label class="m-skip" for="m-quiet"><input type="checkbox" id="m-quiet"'+(state.quiet?' checked':'')+'> Beim Merken nicht mehr nachfragen</label>'+
    '</div>';
  const ov=document.getElementById('match-overlay'); ov.hidden=false;
  box.querySelector('#m-reg').addEventListener('click',()=>setTimeout(closeMatch,300));
  box.querySelector('#m-close').onclick=closeMatch;
  box.querySelector('#m-quiet').onchange=ev=>{ state.quiet=ev.target.checked; persist(); };
  box.querySelector('#m-reg').focus();
}
function closeMatch(){
  document.getElementById('match-overlay').hidden=true;
  const top=document.querySelector('.sheetcard:not([aria-hidden])'); (top||document.getElementById('btn-save')).focus();
}

/* ---------- Trackpad: Wischen mit zwei Fingern ----------
   Die Karte folgt den Fingern 1:1. Die Aktion fällt erst, wenn die Karte weit außen die Schwelle
   überschreitet. Stillhalten löst nichts aus; erst nach längerer Ruhe federt die Karte zurück. */
const W_THRESH=300, W_RETURN=1400, W_QUIET=250;
let wAcc=0, wTimer=null, wLock=false, wLast=0;
function wheelPaint(card, dx){
  card.style.transform='translate('+dx+'px,'+(Math.abs(dx)*0.04)+'px) rotate('+(dx/18)+'deg)';
  const p=Math.max(0,Math.min(1,(Math.abs(dx)-60)/(W_THRESH-60)));
  const sv=card.querySelector('.stamp.save'), sk=card.querySelector('.stamp.skip');
  if (sv) sv.style.opacity = dx>0 ? p : 0;
  if (sk) sk.style.opacity = dx<0 ? p : 0;
}
function wheelReset(){
  wAcc=0;
  const card=document.querySelector('.sheetcard:not([aria-hidden])'); if(!card) return;
  card.classList.remove('dragging'); card.style.transform='';
  card.querySelectorAll('.stamp').forEach(x=>x.style.opacity='');
}
document.getElementById('stack').addEventListener('wheel',ev=>{
  if (Math.abs(ev.deltaX) <= Math.abs(ev.deltaY)) return;
  ev.preventDefault();
  const now=performance.now();
  if (wLock){ const quiet=now-wLast>W_QUIET; wLast=now; if(!quiet) return; wLock=false; }
  wLast=now;
  const card=document.querySelector('.sheetcard:not([aria-hidden])'); if(!card||busy) return;
  wAcc += ev.deltaMode===1 ? ev.deltaX*16 : ev.deltaX;
  const dx=-wAcc;
  card.classList.add('dragging'); wheelPaint(card, dx);
  clearTimeout(wTimer);
  if (Math.abs(dx)>=W_THRESH){ wLock=true; wAcc=0; card.classList.remove('dragging'); decide(dx>0?'save':'skip'); return; }
  wTimer=setTimeout(wheelReset, W_RETURN);
},{passive:false});

/* ---------- Detail ---------- */
let lastFocus=null;
function openDetail(id){
  const e=byId(id); if(!e) return; state.openId=id; lastFocus=document.activeElement;
  const g=GROUPS[e.group]; const saved=state.saved.has(id);
  const box=document.getElementById('detail');
  box.innerHTML=
    '<button class="close" id="d-close" aria-label="Schließen">'+XICON+'</button>'+
    bandHtml(e)+
    '<div class="d-head"><h2 class="d-title" id="d-title">'+esc(e.title)+'</h2>'+badgesHtml(e)+'</div>'+
    sfHtml(e)+
    '<div class="d-body">'+e.desc.map(p=>'<p>'+esc(p)+'</p>').join('')+(e.note?'<p class="note">'+esc(e.note)+'</p>':'')+'</div>'+
    '<div class="d-actions">'+
      '<a class="btn'+(reg(e).open?' primary':'')+'" href="'+esc(e.url)+'" target="_blank" rel="noopener">'+esc(regLabel(e))+'</a>'+
      '<div class="d-sub">'+
        '<button class="btn sm like" id="d-save" aria-pressed="'+saved+'">'+HEART+(saved?'Gemerkt':'Merken')+'</button>'+
        '<a class="btn sm wa" href="https://wa.me/?text='+encodeURIComponent(inviteText(e))+'" target="_blank" rel="noopener" aria-label="Per WhatsApp teilen">'+CHAT+'WhatsApp</a>'+
        '<button class="btn sm" id="d-copy" aria-label="Einladungstext kopieren">'+COPY+'Text</button>'+
        '<button class="btn sm" id="d-ics" aria-label="In den Kalender (.ics-Datei)">'+CAL+'Kalender</button>'+
      '</div>'+
    '</div><div class="fallback" id="d-fallback" hidden></div>';
  document.getElementById('overlay').hidden=false;
  box.querySelector('#d-close').onclick=closeDetail;
  box.querySelector('#d-save').onclick=()=>{ toggleSave(id); openDetail(id); };
  box.querySelector('#d-ics').onclick=()=>downloadIcs(e);
  box.querySelector('#d-copy').onclick=()=>copyText(inviteText(e), box.querySelector('#d-fallback'));
  box.querySelector('#d-close').focus();
  setHash('e-'+id);
}
function closeDetail(){
  state.openId=null; document.getElementById('overlay').hidden=true; setHash(state.tab);
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
}
function toggleSave(id){
  if (state.saved.has(id)) state.saved.delete(id); else state.saved.add(id);
  persist(); renderAll();
}

/* ---------- Events ---------- */
function toggleFilter(f, v){
  const set=state[f];
  if (v==='all') set.clear();
  else { if(set.has(v)) set.delete(v); else set.add(v);
    const total=document.querySelectorAll('.chip[data-f="'+f+'"]:not([data-v="all"])').length;
    if (set.size===total) set.clear(); }
  persist(); renderAll();
}
function switchTab(t){ state.tab=t; setHash(t); renderChrome(); }
document.querySelector('.tabs').addEventListener('keydown',ev=>{
  const tabs=[...document.querySelectorAll('.tab')]; const i=tabs.indexOf(document.activeElement); if(i<0) return;
  let n=null; if(ev.key==='ArrowRight') n=(i+1)%tabs.length; if(ev.key==='ArrowLeft') n=(i-1+tabs.length)%tabs.length; if(ev.key==='Home') n=0; if(ev.key==='End') n=tabs.length-1;
  if(n===null) return; ev.preventDefault(); switchTab(tabs[n].dataset.tab); tabs[n].focus();
});
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));
document.querySelectorAll('.chip[data-f]').forEach(c=>c.onclick=()=>{ toggleFilter(c.dataset.f, c.dataset.v); });
document.getElementById('online-toggle').onclick=()=>{ state.online=!state.online; persist(); renderAll(); };
document.getElementById('radius').addEventListener('input',ev=>{ state.radius=Number(ev.target.value); persist(); renderAll(); });
document.getElementById('btn-skip').onclick=()=>decide('skip');
document.getElementById('btn-save').onclick=()=>decide('save');
document.getElementById('btn-undo').onclick=undo;
document.getElementById('btn-copy-saved').onclick=e=>{
  const l=upcoming().filter(x=>state.saved.has(x.id));
  copyText('Meine VDI-Termine:\n\n'+l.map(x=>'• '+dateLabel(x)+', '+timeLabel(x)+'\n  '+x.title+'\n  '+x.url).join('\n\n'));
};
/* Nach dem Neuzeichnen den Fokus auf das gleiche Bedienelement im gleichen Bereich setzen */
function fokusMerken(el, attr, id){ const bereich=el.closest('[id]'); const bid=bereich&&bereich.id;
  return ()=>{ const wurzel=(bid&&document.getElementById(bid))||document; const n=wurzel.querySelector('['+attr+'="'+CSS.escape(id)+'"]'); if(n) n.focus(); }; }
document.addEventListener('click',ev=>{
  const h=ev.target.closest('[data-heart]'); if(h){ const id=h.dataset.heart; const was=state.saved.has(id); const zurueck=fokusMerken(h,'data-heart',id); toggleSave(id); zurueck(); if(!was) nachMerken(byId(id)); return; }
  const dn=ev.target.closest('[data-done]'); if(dn){ const id=dn.dataset.done; const zurueck=fokusMerken(dn,'data-done',id); if(state.done.has(id)) state.done.delete(id); else { state.done.add(id); toast('Abgehakt'); } persist(); renderAll(); zurueck(); return; }
  const tg=ev.target.closest('[data-tab-go]'); if(tg){ switchTab(tg.dataset.tabGo); document.getElementById('tab-'+tg.dataset.tabGo).focus(); return; }
  const o=ev.target.closest('[data-open]'); if(o){ openDetail(o.dataset.open); }
});
document.addEventListener('keydown',ev=>{
  if (!document.getElementById('ak-overlay').hidden){ if(ev.key==='Escape') akSchliessen(); return; }
  if (!document.getElementById('match-overlay').hidden){ if(ev.key==='Escape') closeMatch(); return; }
  if (!document.getElementById('overlay').hidden){ if(ev.key==='Escape') closeDetail(); return; }
  const o=ev.target.closest && ev.target.closest('[data-open][role="button"]');
  if (o && (ev.key==='Enter'||ev.key===' ')){ ev.preventDefault(); openDetail(o.dataset.open); return; }
  if (state.tab!=='entdecken' || !document.getElementById('quiz-overlay').hidden) return;
  if (!(ev.target===document.body || (ev.target.closest && ev.target.closest('#stack, .controls')))) return;
  if (ev.key==='ArrowRight') decide('save');
  if (ev.key==='ArrowLeft') decide('skip');
});
document.getElementById('overlay').addEventListener('click',ev=>{ if(ev.target.id==='overlay') closeDetail(); });
/* Offener Dialog: alles andere inert (Fokus bleibt im Dialog, kein Scrollen dahinter) */
const OVERLAYS=['overlay','match-overlay','quiz-overlay','ak-overlay'].map(id=>document.getElementById(id));
function hintergrundSperren(){ const offen=OVERLAYS.find(o=>o&&!o.hidden);
  document.querySelectorAll('body > *, main > *').forEach(el=>{ if(el.tagName==='MAIN'||el.tagName==='SCRIPT') return; const sperren=!!offen && !el.contains(offen) && !OVERLAYS.includes(el); el.inert=sperren; });
  document.documentElement.style.overflow = offen ? 'hidden' : ''; }
OVERLAYS.forEach(o=>o&&new MutationObserver(hintergrundSperren).observe(o,{attributes:true,attributeFilter:['hidden']}));
document.getElementById('match-overlay').addEventListener('click',ev=>{ if(ev.target.id==='match-overlay') closeMatch(); });


/* ---------- Aufmacher: nächstes Treffen ---------- */
const WA_SVG='<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H10l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/></svg>';
document.getElementById('wa-ico').outerHTML=WA_SVG;
function countdown(e){
  const now=new Date(), s=startDate(e), en=endDate(e);
  if (s<=now && en>now) return '<div class="cd live">Läuft gerade</div>';
  let ms=s-now; const d=Math.floor(ms/864e5); ms-=d*864e5; const h=Math.floor(ms/36e5); ms-=h*36e5; const m=Math.floor(ms/6e4);
  const cell=(n,l)=>'<div aria-hidden="true"><b>'+n+'</b><span>'+l+'</span></div>';
  if (d>=1) return '<div class="cd">'+cell(d,d===1?'Tag':'Tage')+'<span class="sr-only">Noch '+d+(d===1?' Tag':' Tage')+'</span></div>';
  return '<div class="cd">'+cell(h,'Std.')+cell(m,'Min.')+'<span class="sr-only">Noch '+h+' Stunden und '+m+' Minuten</span></div>';
}
function renderNext(){
  const up=upcoming();
  const nah=filtered().filter(x=>x.mode!=='online');
  const echt=up.filter(x=>!x.geplant), plan=up.find(x=>x.geplant);
  const e=echt.find(x=>x.group==='ye') || echt.find(x=>x.tipp) || nah.find(x=>x.group==='hh'&&!x.geplant) || nah.find(x=>!x.geplant) || echt[0] || plan; /* keine vdi.de-Termine: geplanten Stammtisch zeigen (#4) */
  const box=document.getElementById('nextcard');
  if (!e){ box.innerHTML='<p class="m-text">Gerade sind keine Termine eingetragen. In der WhatsApp-Community erfährst du als Erstes vom nächsten.</p>'; return; }
  const more=filtered().filter(x=>x.id!==e.id && !x.geplant && (reg(x).open||reg(x).pending)).slice(0,3);
  const planHinweis = plan && plan!==e && (e.group!=='ye' || startDate(plan)<startDate(e))
    ? '<p class="nc-plan">Nächster Stammtisch voraussichtlich '+esc(fLong.format(startDate(plan)))+', Ort und Anmeldung folgen.</p>' : '';
  box.innerHTML=
    '<p class="nc-kicker">'+(e.geplant?'Nächster Stammtisch (geplant)':e.group==='ye'?'Nächster Stammtisch':'Nächstes Highlight')+'</p>'+
    countdown(e)+
    '<p class="nc-title">'+esc(e.title)+'</p>'+
    '<p class="nc-meta">'+esc(dateLabel(e))+' · '+esc(timeLabel(e))+'<br>'+esc(e.place)+(e.address&&e.address!=='Hamburg'?', '+esc(e.address):'')+'</p>'+
    '<div class="nc-actions">'+
      '<a class="btn'+(reg(e).open&&e.group==='ye'?' primary':'')+'" href="'+esc(e.url)+'" target="_blank" rel="noopener">'+esc(regLabel(e))+'<span class="sr-only"> (öffnet neues Fenster)</span></a>'+
      '<button class="btn" type="button" data-open="'+e.id+'">Details</button>'+
    '</div>'+planHinweis;
}
setInterval(()=>{ if(!document.getElementById('nextcard').contains(document.activeElement)) renderNext(); }, 60000);

/* ---------- Stammtisch-Karte ---------- */
const STAMMTISCHE = DATEN.stammtische;
const inView=g=>{const [x,y]=proj(g);return x>BOUNDS.x+20&&x<BOUNDS.x+BOUNDS.w-20&&y>BOUNDS.y+20&&y<BOUNDS.y+BOUNDS.h-20;};
const MC=Math.cos(53.56*Math.PI/180), MK=1000/(0.16*MC);
const proj=g=>[(g[1]-9.90)*MC*MK, (53.592-g[0])*MK];
const DISTRICTS=[['St. Pauli',53.5596,9.9575],['Eimsbüttel',53.5745,9.9560],['Rotherbaum',53.5700,9.9870],['Uhlenhorst',53.5720,10.0245],['St. Georg',53.5545,10.0125],['Hammerbrook',53.5462,10.0330],['HafenCity',53.5405,9.9960],['Altstadt',53.5482,9.9930],['Elbe',53.5420,9.9480],['Winterhude',53.5872,9.9990],['Außenalster',53.5655,10.0060],['Altona',53.5530,9.9330],['Eppendorf',53.5900,9.9850],['Barmbek',53.5840,10.0430],['Wandsbek',53.5720,10.0750],['Hamm',53.5550,10.0600],['Rothenburgsort',53.5330,10.0400],['Billstedt',53.5400,10.1000],['Veddel',53.5240,10.0250],['Wilhelmsburg',53.4980,10.0050],['Harburg',53.4600,9.9850],['Hafen',53.5300,9.9500],['Finkenwerder',53.5360,9.8650],['Bahrenfeld',53.5680,9.9050],['Stellingen',53.5900,9.9300],['Moorburg',53.4880,9.9300],['Süderelbe',53.4800,9.9550],['Bergedorf',53.4900,10.2100],['Lurup',53.5900,9.8750],['Othmarschen',53.5480,9.8950]];
let mapSel=null;
function mapPlaces(){
  const st=STAMMTISCHE.filter(x=>inView(x.geo)).map(x=>({key:x.id, kind:'past', geo:x.geo, x}));
  const byGeo={};
  upcoming().filter(e=>e.geo && !e.noreg && e.mode!=='online' && distKm(e)<30).forEach(e=>{const k=e.geo.join(','); (byGeo[k]=byGeo[k]||[]).push(e);});
  const up=Object.entries(byGeo).map(([k,evs])=>({key:'up-'+k, kind:'up', geo:evs[0].geo, evs}));
  return st.concat(up);
}
function pinSvg(pl){
  const [x,y]=proj(pl.geo); const sel=mapSel===pl.key;
  const label=pl.kind==='past' ? pl.x.name+', Stammtisch '+pl.x.when : 'Kommende Termine: '+pl.evs.map(e=>e.title).join(', ');
  return '<g class="pin '+pl.kind+(sel?' sel':'')+'" data-pin="'+pl.key+'" data-x="'+x.toFixed(1)+'" data-y="'+y.toFixed(1)+'" transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+') scale('+(1/mapZoom()).toFixed(3)+')" tabindex="0" role="button" aria-label="'+esc(label)+'" aria-pressed="'+sel+'">'+
    '<circle class="hit" r="22" cy="-18"/>'+
    '<path class="drop" d="M0 0C-5-8-11-13-11-20A11 11 0 1 1 11-20C11-13 5-8 0 0Z"/><circle class="eye" cy="-20" r="4.2"/></g>';
}
/* Zoom & Pan über die viewBox; Pins und Beschriftungen behalten ihre Größe */
const DATA={x:225,y:40,w:770,h:590};
const BOUNDS={x:-760,y:-520,w:2650,h:2340};
function mapRatio(){ const b=document.getElementById('map').getBoundingClientRect(); return (b.width&&b.height)?b.height/b.width:DATA.h/DATA.w; }
/* Auf schmalen Bildschirmen startet die Karte auf den Stammtisch-Pins statt auf ganz Hamburg,
   damit die Pins in der Innenstadt nicht aufeinanderliegen */
let FOKUS=null;
function fokus(){
  if (document.getElementById('map').getBoundingClientRect().width>=600) return DATA;
  if (!FOKUS){ const ps=STAMMTISCHE.filter(x=>inView(x.geo)).map(x=>proj(x.geo));
    if (!ps.length) return DATA;
    /* einzelne Ausreißer (z. B. Harburg) nicht mitzählen: 10- bis 90-%-Bereich der Pins */
    const q=(a,p)=>{ const s=[...a].sort((m,n)=>m-n); return s[Math.round(p*(s.length-1))]; };
    const xs=ps.map(p=>p[0]), ys=ps.map(p=>p[1]), pad=60;
    let x0=q(xs,.1)-pad, x1=q(xs,.9)+pad, y0=q(ys,.1)-pad-30, y1=q(ys,.9)+pad;
    const min=420; if(x1-x0<min){ const m=(x0+x1)/2; x0=m-min/2; x1=m+min/2; } if(y1-y0<min){ const m=(y0+y1)/2; y0=m-min/2; y1=m+min/2; }
    FOKUS={x:x0,y:y0,w:x1-x0,h:y1-y0}; }
  return FOKUS;
}
function baseVB(){ const D=fokus(), cx=D.x+D.w/2, cy=D.y+D.h/2; const r=mapRatio(); const tall=r>D.h/D.w; const w=tall?D.w+30:Math.min(D.h/r, D.w+30); const h=w*r; return {w, h, x:cx-w/2, y:tall?cy-h/2:Math.max(D.y,Math.min(D.y+D.h-h,cy-h/2))}; }
let VB=null;
const mapZoom=()=>VB?baseVB().w/VB.w:1;
const maxW=()=>Math.min(BOUNDS.w, BOUNDS.h/mapRatio());
function clampVB(){
  const B=baseVB(); if(!VB) VB={...B};
  VB.w=Math.max(B.w/6,Math.min(maxW(),VB.w)); VB.h=VB.w*mapRatio();
  const fit=(v,len,lo,span)=> len>=span ? lo+(span-len)/2 : Math.max(lo,Math.min(lo+span-len,v));
  VB.x=fit(VB.x,VB.w,BOUNDS.x,BOUNDS.w); VB.y=fit(VB.y,VB.h,BOUNDS.y,BOUNDS.h);
}
function applyVB(){
  clampVB(); const svg=document.getElementById('map'); const k=(1/mapZoom()).toFixed(3);
  svg.setAttribute('viewBox',VB.x+' '+VB.y+' '+VB.w+' '+VB.h);
  svg.querySelectorAll('.pin,.lbl').forEach(g=>g.setAttribute('transform','translate('+g.dataset.x+' '+g.dataset.y+') scale('+k+')'));
  svg.querySelectorAll('.lbl.inner').forEach(g=>g.style.display = mapZoom()<0.7 ? 'none' : '');
  svg.style.touchAction = mapZoom()>1.01 ? 'none' : 'pan-y';
  { const B=baseVB(); document.getElementById('zoom-reset').disabled = Math.abs(mapZoom()-1)<.01 && Math.abs(VB.x-B.x)<2 && Math.abs(VB.y-B.y)<2; }
  placePop();
}
function zoomAt(f,cx,cy){ /* f>1 rein; cx,cy in Kartenkoordinaten */
  clampVB(); const B=baseVB(); const nw=Math.max(B.w/6,Math.min(maxW(),VB.w/f)); const r=nw/VB.w;
  VB.x=cx-(cx-VB.x)*r; VB.y=cy-(cy-VB.y)*r; VB.w=nw; VB.h=nw*mapRatio(); applyVB();
}
function toMap(clientX,clientY){ const svg=document.getElementById('map'); const m=svg.getScreenCTM(); if(!m) return [VB.x+VB.w/2,VB.y+VB.h/2]; const p=new DOMPoint(clientX,clientY).matrixTransform(m.inverse()); return [p.x,p.y]; }
function placePop(){
  const pop=document.getElementById('mpop'); if(!mapSel||pop.hidden) return;
  const svg=document.getElementById('map'); const g=svg.querySelector('[data-pin="'+mapSel+'"]'); if(!g){pop.hidden=true;return;}
  const box=svg.getBoundingClientRect(); const m=svg.getScreenCTM(); if(!m) return;
  const q=new DOMPoint(+g.dataset.x,+g.dataset.y).matrixTransform(m); const px=q.x-box.left, py=q.y-box.top; const s0=m.a/mapZoom();
  if(px<0||px>box.width||py<0||py>box.height){ pop.style.visibility='hidden'; return; } pop.style.visibility='';
  const w=pop.offsetWidth, h=pop.offsetHeight;
  let left=Math.max(8,Math.min(box.width-w-8,px-w/2)), top=py-30*s0-h-6, below=false;
  if (top<8){ top=py+10; below=true; }
  if (below && top+h>box.height-8) top=Math.max(8,box.height-h-8); /* passt weder über noch unter den Pin: in der Karte halten */
  pop.style.left=left+'px'; pop.style.top=top+'px'; pop.classList.toggle('below',below);
}
(function(){
  const svg=document.getElementById('map');
  /* Mausrad scrollt immer die Seite; Zoomen mit Strg/⌘ + Mausrad oder Trackpad-Pinch (kommt als ctrlKey) */
  svg.addEventListener('wheel',ev=>{ if(!ev.ctrlKey && !ev.metaKey) return; ev.preventDefault();
    const [cx,cy]=toMap(ev.clientX,ev.clientY); const d=Math.max(-40,Math.min(40,ev.deltaMode===1?ev.deltaY*16:ev.deltaY)); zoomAt(Math.exp(-d*0.012),cx,cy); },{passive:false});
  let moved=0;
  const verschieben=(dx,dy)=>{ const m=svg.getScreenCTM(); if(!m) return; VB.x-=dx/m.a; VB.y-=dy/m.a; applyVB(); };
  /* Maus und Stift: Ziehen verschiebt die Karte */
  let maus=null;
  svg.addEventListener('pointerdown',ev=>{ if(ev.pointerType==='touch'||ev.button>0) return; maus={x:ev.clientX,y:ev.clientY,id:ev.pointerId}; moved=0; });
  svg.addEventListener('pointermove',ev=>{ if(!maus||ev.pointerId!==maus.id) return;
    const dx=ev.clientX-maus.x, dy=ev.clientY-maus.y; moved+=Math.abs(dx)+Math.abs(dy);
    if(moved>4){ try{svg.setPointerCapture(ev.pointerId);}catch(_){} svg.classList.add('panning'); }
    maus={x:ev.clientX,y:ev.clientY,id:ev.pointerId}; verschieben(dx,dy); });
  const mausEnde=()=>{ maus=null; svg.classList.remove('panning'); };
  svg.addEventListener('pointerup',mausEnde); svg.addEventListener('pointercancel',mausEnde);
  /* Touch: Ein Finger scrollt die Seite, solange die Karte nicht vergrößert ist.
     Zwei Finger zoomen und verschieben immer; nach dem Hineinzoomen verschiebt auch ein Finger. */
  let geste=null;
  const mitte=t=>({x:(t[0].clientX+t[1].clientX)/2, y:(t[0].clientY+t[1].clientY)/2, d:Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY)});
  const gesteStart=t=>{ geste = t.length>=2 ? {zwei:true,...mitte(t)} : (mapZoom()>1.01 ? {zwei:false,x:t[0].clientX,y:t[0].clientY} : null); };
  svg.addEventListener('touchstart',ev=>{ if(ev.touches.length===1) moved=0; gesteStart(ev.touches); },{passive:true});
  svg.addEventListener('touchmove',ev=>{ if(!geste) return; const t=ev.touches;
    if (geste.zwei && t.length>=2){ if(ev.cancelable) ev.preventDefault(); const m=mitte(t);
      const [cx,cy]=toMap(m.x,m.y); if(geste.d>0) zoomAt(m.d/geste.d,cx,cy); verschieben(m.x-geste.x,m.y-geste.y);
      moved+=10; geste={zwei:true,...m}; return; }
    if (!geste.zwei && t.length===1){ if(ev.cancelable) ev.preventDefault();
      const dx=t[0].clientX-geste.x, dy=t[0].clientY-geste.y; moved+=Math.abs(dx)+Math.abs(dy);
      geste={zwei:false,x:t[0].clientX,y:t[0].clientY}; if(moved>4) svg.classList.add('panning'); verschieben(dx,dy); } },{passive:false});
  const touchEnde=ev=>{ if(ev.touches.length) gesteStart(ev.touches); else { geste=null; svg.classList.remove('panning'); } };
  svg.addEventListener('touchend',touchEnde); svg.addEventListener('touchcancel',touchEnde);
  svg.addEventListener('click',ev=>{ if(moved>4){ ev.stopImmediatePropagation(); moved=0; } },true);
  svg.addEventListener('dblclick',ev=>{ ev.preventDefault(); const [cx,cy]=toMap(ev.clientX,ev.clientY); zoomAt(2,cx,cy); });
  document.getElementById('zoom-in').onclick=()=>zoomAt(1.6,VB.x+VB.w/2,VB.y+VB.h/2);
  document.getElementById('zoom-out').onclick=()=>zoomAt(1/1.6,VB.x+VB.w/2,VB.y+VB.h/2);
  document.getElementById('zoom-reset').onclick=()=>{ VB=null; applyVB(); };
})();
function renderMap(){
  const svg=document.getElementById('map'); const places=mapPlaces();
  if (mapSel && !places.some(p=>p.key===mapSel)) mapSel=null;
  const [rx,ry]=proj([53.5503,9.9926]);
  svg.innerHTML='<rect x="-1700" y="-800" width="4500" height="3000" class="land"/>'+
    '<path class="park" d="'+MAP_BIG_G+'"/><path class="park" d="'+MAP_PARKS+'"/><path class="water" d="'+MAP_BIG_W+'"/><path class="water" d="'+MAP_WATER+'"/><path class="water" d="'+MAP_ALSTER+'"/>'+
    DISTRICTS.map(([n,la,lo],i)=>{const [x,y]=proj([la,lo]);return '<g class="lbl'+(i<11?' inner':'')+'" data-x="'+x.toFixed(0)+'" data-y="'+y.toFixed(0)+'" transform="translate('+x.toFixed(0)+' '+y.toFixed(0)+') scale('+(1/mapZoom()).toFixed(3)+')"><text class="'+(n==='Elbe'||n==='Außenalster'||n==='Süderelbe'?'wlabel':'dlabel')+'" text-anchor="middle">'+n+'</text></g>';}).join('')+
    
    places.filter(p=>p.key!==mapSel).map(pinSvg).join('')+places.filter(p=>p.key===mapSel).map(pinSvg).join('');
  const sel=places.find(p=>p.key===mapSel); const pop=document.getElementById('mpop');
  if (!sel){ pop.hidden=true; applyVB(); return; }
  pop.innerHTML = sel.kind==='past'
    ? (()=>{ const f=FOTOS.find(x=>x.st===sel.x.id); return (f?'<img class="mp-foto" src="'+esc(f.src)+'" width="'+f.w+'" height="'+f.h+'" alt="Stammtisch im '+esc(sel.x.name)+', '+esc(sel.x.when)+'">':'')+'<b class="mp-name">'+esc(sel.x.name)+'</b><span class="mp-when">'+esc(sel.x.when)+'</span>'; })()
    : '<span class="mp-when up">Demnächst</span>'+sel.evs.map(e=>'<button type="button" class="mp-ev" data-open="'+e.id+'"><b>'+esc(fShort.format(startDate(e)).replace(/\.$/,''))+'.</b> '+esc(e.title)+'</button>').join('');
  pop.hidden=false;
  /* Foto lädt erst nach dem Einblenden: danach Popup neu ausrichten, sonst ragt es über die Karte hinaus */
  const foto=pop.querySelector('img'); if(foto && !foto.complete) foto.addEventListener('load',placePop,{once:true});
  applyVB();
}
document.addEventListener('click',ev=>{ const b=ev.target.closest('[data-pin-sel]'); if(!b) return; mapSel=b.dataset.pinSel; renderMap();
  document.getElementById('map').scrollIntoView({block:'center',behavior:reduce?'auto':'smooth'}); const n=document.querySelector('[data-pin="'+mapSel+'"]'); if(n) n.focus({preventScroll:true}); });
document.getElementById('map').addEventListener('click',ev=>{ const g=ev.target.closest('[data-pin]'); mapSel = g ? (mapSel===g.dataset.pin?null:g.dataset.pin) : null; renderMap(); });
document.addEventListener('keydown',ev=>{ if(ev.key==='Escape'&&mapSel&&document.getElementById('overlay').hidden){ mapSel=null; renderMap(); } });
let deckTimer=null;
window.addEventListener('resize',()=>{ applyVB(); clearTimeout(deckTimer); deckTimer=setTimeout(()=>{ if(!busy) renderDeck(); },200); });
document.getElementById('map').addEventListener('keydown',ev=>{ const g=ev.target.closest('[data-pin]'); if(g&&(ev.key==='Enter'||ev.key===' ')){ ev.preventDefault(); mapSel=g.dataset.pin; renderMap(); const n=document.querySelector('[data-pin="'+mapSel+'"]'); if(n) n.focus(); } });

/* ---------- Location vorschlagen ---------- */
const SUG = {
  ort:{ name:['Name der Location','z. B. Bar oder Restaurant'], area:['Stadtteil','z. B. Ottensen'], why:['Warum dort?','Gutes Essen, große Tische, Happy Hour …'], need:'name', hint:'Gib zuerst einen Namen ein.',
        msg:(n,a,w,h)=>'Hi '+DATEN.kontakt.whatsappName+', ich hab einen Location-Vorschlag für den YE-Stammtisch: '+n+(a?' ('+a+')':'')+'.'+(w?' '+w:'')+(h?' Ich helfe gern bei der Organisation mit.':'') },
  event:{ name:['Deine Idee in einem Satz','z. B. Exkursion zu meinem Arbeitgeber'], area:['Wann ungefähr? (optional)','z. B. im Frühjahr'], why:['Worum geht es?','Was wollt ihr machen, wer könnte mitkommen, gibt es einen Kontakt?'], need:'name', hint:'Beschreib deine Idee kurz in einem Satz.',
        msg:(n,a,w,h)=>'Hi '+DATEN.kontakt.whatsappName+', ich hab eine Event-Idee für die Hamburger Young Engineers: '+n+'.'+(a?' Zeitraum: '+a+'.':'')+(w?' '+w:'')+(h?' Ich würde bei der Umsetzung mithelfen.':'') },
  orga:{ name:null, area:null, why:['Was würdest du gern machen?','z. B. Stammtische mitplanen, Social Media, eine Exkursion organisieren'], need:'why', hint:'Schreib kurz, wobei du mitmachen möchtest.',
        msg:(n,a,w)=>'Hi '+DATEN.kontakt.whatsappName+', ich würde gern bei den Hamburger Young Engineers mitorganisieren. '+w }
};
let sugType='ort';
function setSugType(t){
  sugType=t; const c=SUG[t];
  document.querySelectorAll('[data-sugtype]').forEach(b=>{ const an=b.dataset.sugtype===t; b.setAttribute('aria-checked',String(an)); b.tabIndex=an?0:-1; });
  const set=(key,wrap)=>{ const w=document.getElementById(wrap); if(!c[key]){ if(w) w.hidden=true; return; } if(w) w.hidden=false; document.getElementById('sug-'+key+'-l').textContent=c[key][0]; document.getElementById('sug-'+key).placeholder=c[key][1]; };
  set('name','sug-name-wrap'); set('area','sug-area-wrap'); set('why',null);
  document.getElementById('sug-help').parentElement.hidden = t==='orga';
  document.getElementById('sug-ideas').hidden = t!=='event';
  updSuggest();
}
function updSuggest(){
  const c=SUG[sugType];
  const n=document.getElementById('sug-name').value.trim(), a=document.getElementById('sug-area').value.trim(), w=document.getElementById('sug-why').value.trim(), h=document.getElementById('sug-help').checked;
  const btn=document.getElementById('sug-send'), hint=document.getElementById('sug-hint');
  const ok = c.need==='name' ? !!n : !!w;
  hint.textContent=c.hint;
  if (!ok){ btn.setAttribute('aria-disabled','true'); btn.dataset.text=''; hint.hidden=false; return; }
  btn.removeAttribute('aria-disabled'); btn.dataset.text=c.msg(n,a,w,h); hint.hidden=true;
}
['sug-name','sug-area','sug-why'].forEach(id=>document.getElementById(id).addEventListener('input',updSuggest));
document.getElementById('sug-help').addEventListener('change',updSuggest);
document.querySelectorAll('[data-sugtype]').forEach(b=>b.addEventListener('click',()=>setSugType(b.dataset.sugtype)));
document.querySelector('.sug-types').addEventListener('keydown',ev=>{ const arten=Object.keys(SUG); let i=arten.indexOf(sugType);
  if(['ArrowRight','ArrowDown'].includes(ev.key)) i=(i+1)%arten.length; else if(['ArrowLeft','ArrowUp'].includes(ev.key)) i=(i-1+arten.length)%arten.length; else return;
  ev.preventDefault(); setSugType(arten[i]); document.querySelector('[data-sugtype="'+arten[i]+'"]').focus(); });
document.getElementById('sug-send').addEventListener('click',ev=>{ if(ev.currentTarget.getAttribute('aria-disabled')){ ev.preventDefault(); document.getElementById(SUG[sugType].need==='name'?'sug-name':'sug-why').focus(); } else { ev.preventDefault(); waQuiz('nachricht', ev.currentTarget, ev.currentTarget.dataset.text); } });
document.getElementById('suggest').addEventListener('submit',ev=>ev.preventDefault());
/* Karte so hoch wie die höchste Variante von „Bring dich ein“, damit beim Umschalten nichts springt */
function karteHoehe(){
  const panel=document.querySelector('.mappanel'); if(!panel) return;
  panel.style.removeProperty('--karte-h'); const vorher=sugType; let max=0;
  for (const t of Object.keys(SUG)){ setSugType(t); max=Math.max(max,panel.scrollHeight); }
  setSugType(vorher); panel.style.setProperty('--karte-h',max+'px');
}
let karteTimer=null; window.addEventListener('resize',()=>{ clearTimeout(karteTimer); karteTimer=setTimeout(karteHoehe,200); });
document.querySelector('.chronik-box')?.addEventListener('toggle',karteHoehe);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(karteHoehe); else karteHoehe();
document.getElementById('copy-mail').onclick=()=>copyText(DATEN.kontakt.email);

/* ---------- WhatsApp erst nach VDI-Frage und ALTCHA ----------
   Nummer und Community-Link stehen nur verschlüsselt im Datenblock (tools/wa_schutz.py).
   Während man die Frage beantwortet, löst ALTCHA (selbst gehostet, ohne Cookies) im Hintergrund
   eine Rechenaufgabe. Aus deren Lösung entsteht der Schlüssel für die Links. */
const QUIZ=[
  {q:'Wofür steht das „V“ in VDI?', a:['Verband','Verein','Vereinigung'], r:1},
  {q:'Wofür steht das „D“ in VDI?', a:['Deutscher','Digitaler','Dualer'], r:0},
  {q:'Wofür steht das „I“ in VDI?', a:['Industrie','Innovation','Ingenieure'], r:2},
  {q:'Wofür steht das „I“ in VDI?', a:['Ingenieure','Institut','Informatik'], r:0}
];
const waZiele={}; let waFehler=false, waBereit=false, quizOk=false, quizNr=Math.floor(Math.random()*QUIZ.length), quizFocus=null, quizAuftrag=null;
const hex=h=>new Uint8Array(h.match(/../g).map(x=>parseInt(x,16)));
async function waEntschluesseln(counter){
  const S=DATEN.schutz, p=S.challenge.parameters, te=new TextEncoder();
  const nonce=hex(p.nonce), pw=new Uint8Array(nonce.length+4); pw.set(nonce); new DataView(pw.buffer).setUint32(nonce.length,counter,false);
  const basis=await crypto.subtle.importKey('raw',pw,'PBKDF2',false,['deriveBits']);
  const key=new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt:hex(S.salt2),iterations:p.cost,hash:'SHA-256'},basis,256));
  const mac=await crypto.subtle.importKey('raw',key,{name:'HMAC',hash:'SHA-256'},false,['verify']);
  for (const [name,z] of Object.entries(S.ziele)){
    const ct=hex(z.ct), msg=new Uint8Array([...te.encode(name),...ct]);
    if (!await crypto.subtle.verify('HMAC',mac,hex(z.tag),msg)) throw new Error('Schlüssel passt nicht');
    const out=new Uint8Array(ct.length);
    for (let i=0;i<ct.length;i+=32){
      const blk=new Uint8Array(key.length+4); blk.set(key); new DataView(blk.buffer).setUint32(key.length,i/32,false);
      const ks=new Uint8Array(await crypto.subtle.digest('SHA-256',blk));
      for (let k=0;k<32&&i+k<ct.length;k++) out[i+k]=ct[i+k]^ks[k];
    }
    waZiele[name]=new TextDecoder().decode(out);
  }
}
function waOhneSchutz(){ for (const [k,v] of Object.entries(DATEN.wa||{})) waZiele[k]=atob(v); waBereit=true; }
let altchaGeladen=null;
function altchaLaden(){ if(!altchaGeladen) altchaGeladen=import(DATEN.altchaUrl); return altchaGeladen; }
function waZiel(){ const a=quizAuftrag; if(!a) return '#';
  return a.art==='nachricht' ? 'https://wa.me/'+waZiele.nummer+'?text='+encodeURIComponent(a.text||'') : (waZiele[a.art]||'#'); }
const mailHinweis=()=>'<p class="m-text quiz-mail">Oder schreib uns per E-Mail: <a href="mailto:'+esc(DATEN.kontakt.email)+'">'+esc(DATEN.kontakt.email)+'</a></p>';
function quizZeigen(fehler){
  const slot=document.querySelector('#quiz .quiz-inhalt'); let inhalt;
  if (quizOk && waBereit){
    inhalt='<p class="m-kicker">Passt!</p><h2 class="m-title" id="q-title">Weiter zu WhatsApp</h2>'+
      '<p class="m-text">WhatsApp öffnet sich in einem neuen Fenster.</p>'+
      '<div class="m-actions"><a class="btn blue" id="q-go" href="'+esc(waZiel())+'" target="_blank" rel="noopener">WhatsApp öffnen</a></div>'+mailHinweis();
  } else if (quizOk && waFehler){
    inhalt='<h2 class="m-title" id="q-title">WhatsApp gerade nicht erreichbar</h2>'+
      '<p class="m-text" role="alert">Die Prüfung gegen Spam-Bots hat nicht geklappt. Lade die Seite neu oder schreib uns per E-Mail, dann melden wir uns.</p>'+mailHinweis();
  } else if (quizOk){
    inhalt='<p class="m-kicker">Richtig!</p><h2 class="m-title" id="q-title">Einen Moment noch</h2>'+
      '<p class="m-text" role="status">Die Prüfung gegen Spam-Bots läuft noch. Das dauert meist nur ein bis zwei Sekunden.</p>'+mailHinweis();
  } else {
    const f=QUIZ[quizNr];
    inhalt='<p class="m-kicker">Kurze Frage vorab</p><h2 class="m-title" id="q-title">'+esc(f.q)+'</h2>'+
      '<p class="m-text">'+(quizAuftrag&&quizAuftrag.art==='community'?'In der Community kündigen wir Stammtische und Events an. ':'')+'Die Frage hält Spam-Bots fern.</p>'+
      (fehler?'<p class="quiz-fehler" role="alert">Leider nicht richtig. Hier ist eine neue Frage.</p>':'')+
      '<div class="m-actions quiz-antworten" role="group" aria-label="Antworten">'+f.a.map((t,i)=>'<button type="button" class="btn" data-antwort="'+i+'">'+esc(t)+'</button>').join('')+'</div>'+mailHinweis();
  }
  slot.innerHTML=inhalt;
  const go=slot.querySelector('#q-go');
  if (go){ go.addEventListener('click',()=>setTimeout(closeQuiz,300)); go.focus(); }
  else { const b=slot.querySelector('[data-antwort]'); if(b) b.focus(); }
}
function waQuiz(art, von, text){
  quizAuftrag={art,text}; quizFocus=von||document.activeElement;
  const box=document.getElementById('quiz');
  if (!box.querySelector('.quiz-inhalt')){
    box.innerHTML='<button class="close" id="q-close" aria-label="Schließen">'+XICON+'</button><div class="m-body"><div class="quiz-inhalt"></div>'+
      (DATEN.schutz?'<altcha-widget class="quiz-altcha" language="de" auto="onload" display="invisible"></altcha-widget>':'')+'</div>';
    box.querySelector('#q-close').onclick=closeQuiz;
    box.addEventListener('click',ev=>{ const b=ev.target.closest('[data-antwort]'); if(!b) return;
      if (Number(b.dataset.antwort)===QUIZ[quizNr].r){ quizOk=true;
        if (waBereit){ const w=window.open(waZiel(),'_blank'); if(w){ try{ w.opener=null; }catch(_){} closeQuiz(); toast('WhatsApp wird geöffnet'); return; } }
        quizZeigen(false); }
      else { quizNr=(quizNr+1+Math.floor(Math.random()*(QUIZ.length-1)))%QUIZ.length; quizZeigen(true); } });
    if (DATEN.schutz){
      const w=box.querySelector('altcha-widget');
      w.setAttribute('challenge',JSON.stringify(DATEN.schutz.challenge));
      w.addEventListener('verified',async ev=>{
        try{ const p=JSON.parse(atob(ev.detail.payload)); await waEntschluesseln(p.solution.counter); waBereit=true; }
        catch(e){ console.error(e); waFehler=true; }
        if (!document.getElementById('quiz-overlay').hidden) quizZeigen(false);
      });
      w.addEventListener('statechange',ev=>{ if(ev.detail&&ev.detail.state==='error'){ waFehler=true; if(!document.getElementById('quiz-overlay').hidden) quizZeigen(false); } });
      altchaLaden().catch(e=>{ console.error(e); waFehler=true; });
    } else waOhneSchutz();
  }
  document.getElementById('quiz-overlay').hidden=false;
  quizZeigen(false);
}
function closeQuiz(){ document.getElementById('quiz-overlay').hidden=true; if(quizFocus&&document.contains(quizFocus)) quizFocus.focus(); }
document.getElementById('quiz-overlay').addEventListener('click',ev=>{ if(ev.target.id==='quiz-overlay') closeQuiz(); });
document.addEventListener('keydown',ev=>{ if(ev.key==='Escape'&&!document.getElementById('quiz-overlay').hidden) closeQuiz(); });
document.addEventListener('click',ev=>{
  const a=ev.target.closest('[data-wa]'); if(!a) return;
  ev.preventDefault(); waQuiz(a.dataset.wa, a);
});
updSuggest();

/* ---------- Fotostreifen ---------- */
const FOTOS = DATEN.fotos;
const PAUSE_SVG='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';
const PLAY_SVG='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5v14l12-7z"/></svg>';
(function(){
  const track=document.getElementById('track');
  track.innerHTML=FOTOS.map((f,i)=>{const x=STAMMTISCHE.find(s=>s.id===f.st)||{name:'Stammtisch',when:''};
    return '<figure class="shot"><button type="button" class="shot-btn" data-shot="'+f.st+'" aria-label="'+esc(x.name+', '+x.when)+': auf der Karte zeigen">'+
      '<img src="'+f.src+'" width="'+f.w+'" height="'+f.h+'" alt="Young Engineers beim Stammtisch im '+esc(x.name)+', '+esc(x.when)+'" loading="'+(i<1?'eager':'lazy')+'" decoding="async">'+
      '<figcaption><b>'+esc(x.name)+'</b><span>'+esc(x.when)+'</span></figcaption></button></figure>';}).join('');
  const step=()=>{const f=track.querySelector('.shot');return f?f.getBoundingClientRect().width+14:300;};
  const go=d=>{const max=track.scrollWidth-track.clientWidth-2;
    const b=reduce?'auto':'smooth';
    if(d>0&&track.scrollLeft>=max) track.scrollTo({left:0,behavior:b});
    else track.scrollBy({left:d*step(),behavior:b});};
  document.getElementById('strip-prev').onclick=()=>{go(-1);pause();};
  document.getElementById('strip-next').onclick=()=>{go(1);pause();};
  track.addEventListener('click',ev=>{const b=ev.target.closest('[data-shot]');if(!b)return;const x=STAMMTISCHE.find(s=>s.id===b.dataset.shot);
    if(x&&inView(x.geo)){mapSel=x.id;renderMap();} document.getElementById('karte').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
  let timer=null, paused=false;
  const pbtn=document.getElementById('strip-pause');
  const showPause=on=>{ pbtn.setAttribute('aria-pressed',String(!on)); pbtn.setAttribute('aria-label',on?'Automatisches Weiterblättern anhalten':'Automatisches Weiterblättern starten'); pbtn.innerHTML=on?PAUSE_SVG:PLAY_SVG; };
  const pause=()=>{paused=true;clearInterval(timer);timer=null;showPause(false);};
  const start=()=>{paused=false;clearInterval(timer);timer=setInterval(()=>{if(!paused&&!document.hidden) go(1);},5000);showPause(true);};
  pbtn.onclick=()=>{ if(timer) pause(); else start(); };
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){ showPause(false); }
  else {
    start();
    ['pointerdown','wheel','focusin','touchstart'].forEach(t=>track.addEventListener(t,pause,{passive:true}));
    track.addEventListener('mouseenter',()=>{paused=true;}); track.addEventListener('mouseleave',()=>{if(timer)paused=false;});
  }
})();
window.__extras=true;

function route(){
  const h=(location.hash||'').slice(1);
  if (['entdecken','programm','gemerkt'].includes(h)) { state.tab=h; if(state.openId) { state.openId=null; document.getElementById('overlay').hidden=true; } }
  renderAll();
  if (h.startsWith('e-') && byId(h.slice(2))) openDetail(h.slice(2));
  /* Sprungziel von der Linkseite /links/: WhatsApp-Community direkt anbieten */
  if (h==='whatsapp'){ setHash('mitmachen'); document.getElementById('mitmachen').scrollIntoView(); waQuiz('community', document.querySelector('#mitmachen [data-wa="community"]')); }
}

/* ---------- Meine Arbeitskreise ----------
   Auswahl bleibt im Browser (ye-hh-filter). Der Kalender-Link setzt Caddy auf dem Server zusammen
   (static/kalender/auswahl.ics, Bausteine aus layouts/index.kalender.ics). */
let akFokus=null;
function akKalender(){ const u=DATEN.kalenderAuswahl+'?ak='+[...state.ak].sort().join(','); return {https:u, webcal:u.replace(/^https?:\/\//,'webcal://')}; }
function akZaehlen(id){ return upcoming().filter(e=>(e.ak||[]).includes(id)).length; }
function akRender(){
  const box=document.getElementById('ak-dialog'); const n=state.ak.size; const k=akKalender();
  box.innerHTML='<button class="close" id="ak-close" aria-label="Schließen">'+XICON+'</button>'+
    '<div class="d-head"><h2 class="d-title" id="ak-title">Meine Arbeitskreise</h2>'+
    '<p class="ak-text">Wähle aus, was dich interessiert. Dann siehst du nur noch Termine dieser Arbeitskreise, unsere Young-Engineers-Termine immer. Überregionale Termine ohne Arbeitskreis (z. B. VDI-Webinare) ordnen wir nach Stichworten zu. Deine Auswahl bleibt nur in diesem Browser.</p></div>'+
    '<fieldset class="ak-liste"><legend class="sr-only">Arbeitskreise</legend>'+
    AKS.map(a=>{ const z=akZaehlen(a.id); return '<label class="ak-zeile"><input type="checkbox" value="'+esc(a.id)+'"'+(state.ak.has(a.id)?' checked':'')+'><span>'+esc(a.name)+'</span><span class="ak-anzahl" aria-label="'+z+' kommende Termine">'+z+'</span></label>'; }).join('')+
    '</fieldset>'+
    (n ? '<div class="ak-kalender"><h3 class="mini-h">Als Kalender abonnieren</h3>'+
           '<p class="ak-hinweis">Deine Arbeitskreise und unsere Young-Engineers-Termine in einem Kalender, der sich selbst aktualisiert. Für Google Kalender die Adresse kopieren und dort unter „Weitere Kalender → Per URL“ einfügen. Änderst du die Auswahl später, abonniere den Kalender neu.</p>'+
           '<a class="btn sm" id="ak-abo" href="'+esc(k.webcal)+'">'+CAL+'Auswahl abonnieren</a>'+
           '<div class="ak-unter"><button class="btn sm" id="ak-kopieren" type="button">'+COPY+'Adresse kopieren</button><button class="btn sm" id="ak-leeren" type="button">Auswahl löschen</button></div>'+
           '<div class="fallback" id="ak-fallback" hidden></div></div>' : '')+
    '<div class="d-actions">'+
      '<button class="btn blue" id="ak-fertig" type="button">'+(n?'Fertig – '+n+' ausgewählt':'Fertig')+'</button>'+
    '</div>';
  box.querySelector('#ak-close').onclick=akSchliessen;
  box.querySelector('#ak-fertig').onclick=akSchliessen;
  box.querySelectorAll('.ak-liste input').forEach(i=>i.onchange=()=>{ if(i.checked) state.ak.add(i.value); else state.ak.delete(i.value); persist(); state.decided=[]; renderAll(); akAktualisieren(); });
  const kp=box.querySelector('#ak-kopieren'); if(kp) kp.onclick=()=>copyText(akKalender().https, box.querySelector('#ak-fallback'));
  const lr=box.querySelector('#ak-leeren'); if(lr) lr.onclick=()=>{ state.ak.clear(); persist(); state.decided=[]; renderAll(); akRender(); box.querySelector('#ak-fertig').focus(); };
}
/* Nach dem Anhaken nur Knöpfe und Zähler erneuern, damit Fokus und Scrollposition in der Liste bleiben */
function akAktualisieren(){
  const box=document.getElementById('ak-dialog'); const top=box.scrollTop; const fokus=document.activeElement&&document.activeElement.value;
  akRender(); box.scrollTop=top; if(fokus){ const i=box.querySelector('.ak-liste input[value="'+fokus+'"]'); if(i) i.focus(); }
}
function akOeffnen(){ akFokus=document.activeElement; akRender(); document.getElementById('ak-overlay').hidden=false; const i=document.querySelector('#ak-dialog .ak-liste input'); (i||document.getElementById('ak-close')).focus(); }
function akSchliessen(){ document.getElementById('ak-overlay').hidden=true; if(akFokus&&document.contains(akFokus)) akFokus.focus(); }
document.getElementById('ak-knopf').onclick=akOeffnen;
document.getElementById('ak-overlay').addEventListener('click',ev=>{ if(ev.target.id==='ak-overlay') akSchliessen(); });
if(!AKS.length) document.querySelector('.fak').hidden=true;
/* ---------- Handy: Fenster nach unten wegziehen ----------
   Auf schmalen Bildschirmen docken Termin-Details, „Gemerkt“ und die WhatsApp-Frage unten an.
   Steht der Inhalt ganz oben, zieht eine Wischbewegung nach unten das Fenster mit und schließt es
   ab einem Viertel der Höhe (oder bei schnellem Wischen). Sonst scrollt der Inhalt wie gewohnt. */
const schmal=matchMedia('(max-width:640px)');
function wegziehen(sheet, schliessen){
  if(!sheet) return;
  const overlay=sheet.parentElement;
  let y0=0, x0=0, t0=0, dy=0, aktiv=false, entschieden=false;
  const zuruecksetzen=()=>{ sheet.classList.remove('ziehen'); sheet.style.transform=''; overlay.style.background=''; };
  sheet.addEventListener('touchstart',ev=>{
    aktiv = schmal.matches && ev.touches.length===1 && sheet.scrollTop<=0;
    if(!aktiv) return;
    const t=ev.touches[0]; y0=t.clientY; x0=t.clientX; t0=performance.now(); dy=0; entschieden=false;
  },{passive:true});
  sheet.addEventListener('touchmove',ev=>{
    if(!aktiv) return;
    if(ev.touches.length!==1){ aktiv=false; zuruecksetzen(); return; }
    const t=ev.touches[0], d=t.clientY-y0, dx=t.clientX-x0;
    if(!entschieden){
      if(Math.abs(d)<6 && Math.abs(dx)<6) return;
      entschieden=true;
      if(d<=0 || Math.abs(dx)>Math.abs(d)){ aktiv=false; return; } /* nach oben oder seitwärts: normal scrollen */
      sheet.classList.add('ziehen');
    }
    if(ev.cancelable) ev.preventDefault();
    dy=Math.max(0,d);
    sheet.style.transform='translateY('+dy+'px)';
    overlay.style.background='rgba(0,12,25,'+(0.5*Math.max(0,1-dy/sheet.offsetHeight)).toFixed(3)+')';
  },{passive:false});
  const ende=()=>{
    if(!aktiv) return; aktiv=false;
    if(!entschieden){ return; }
    const tempo=dy/Math.max(1,performance.now()-t0);
    sheet.classList.remove('ziehen');
    if(dy>sheet.offsetHeight*0.25 || (dy>40 && tempo>0.6)){
      sheet.style.transform='translateY(100%)'; overlay.style.background='rgba(0,12,25,0)';
      setTimeout(()=>{ schliessen(); zuruecksetzen(); }, reduce?0:200);
    } else zuruecksetzen();
    dy=0;
  };
  sheet.addEventListener('touchend',ende); sheet.addEventListener('touchcancel',ende);
}
wegziehen(document.getElementById('detail'), closeDetail);
wegziehen(document.getElementById('match'), closeMatch);
wegziehen(document.getElementById('quiz'), closeQuiz);
wegziehen(document.getElementById('ak-dialog'), akSchliessen);

window.addEventListener('hashchange',route);
route();
