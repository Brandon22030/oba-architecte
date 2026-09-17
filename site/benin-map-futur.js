// <benin-map-futur> — variante futuriste sombre de la carte du Bénin.
// Géométrie embarquée (benin-geo.js), projection Mercator locale, aucun appel réseau.
// Attributs : mode="hero"|"page".
(function () {
  const VILLES = [
    { n: 'Cotonou', lat: 6.3667, lon: 2.4333, p: ['Siège BRVM', 'Siège GAB', 'Siège SFP', 'Siège ASA-Bénin', 'Hôtel Sofitel', 'Rénovation Azalaï', 'Agences BIIC', 'Agences Celtiis'] },
    { n: 'Porto-Novo', lat: 6.4969, lon: 2.6289, p: ['Agence BIIC', 'Agence La Poste'] },
    { n: 'Ouidah', lat: 6.3667, lon: 2.0833, p: ['Requalification urbaine de Ouidah'] },
    { n: 'Avlékété', lat: 6.3167, lon: 2.15, p: ['Golf Club d\u2019Avlékété', 'Club Med d\u2019Avlékété'] },
    { n: 'Abomey-Calavi', lat: 6.4486, lon: 2.3556, p: ['Agence Celtiis', 'Villas et résidences'] },
    { n: 'Glo-Djigbé', lat: 6.7167, lon: 2.3, p: ['Logements sociaux de Glo-Djigbé'] },
    { n: 'Allada', lat: 6.6656, lon: 2.1514, p: ['Agence La Poste'] },
    { n: 'Comè', lat: 6.4056, lon: 1.8819, p: ['Agence BIIC'] },
    { n: 'Lokossa', lat: 6.6389, lon: 1.7167, p: ['Agence Celtiis'] },
    { n: 'Bohicon', lat: 7.1783, lon: 2.0667, p: ['Agence BIIC', 'Agence La Poste'] },
    { n: 'Abomey', lat: 7.1833, lon: 1.9833, p: ['Agence Celtiis'] },
    { n: 'Dassa-Zoumè', lat: 7.75, lon: 2.1833, p: ['Agence La Poste'] },
    { n: 'Savalou', lat: 7.9281, lon: 1.9756, p: ['Agence BIIC'] },
    { n: 'Parakou', lat: 9.3372, lon: 2.6303, p: ['Agence BIIC', 'Agence Celtiis', 'Agence La Poste'] },
    { n: 'Nikki', lat: 9.9401, lon: 3.2108, p: ['Agence Celtiis'] },
    { n: 'Djougou', lat: 9.7086, lon: 1.6661, p: ['Agence BIIC'] },
    { n: 'Natitingou', lat: 10.3042, lon: 1.3796, p: ['Agence Celtiis', 'Agence La Poste'] },
    { n: 'Tanguiéta', lat: 10.6222, lon: 1.2667, p: ['Agence BIIC'] },
    { n: 'Kandi', lat: 11.1342, lon: 2.9386, p: ['Agence Celtiis'] },
    { n: 'Malanville', lat: 11.8686, lon: 3.3831, p: ['Agence BIIC', 'Agence La Poste'] }
  ];
  const CLAIR = 'var(--pl, var(--pl, #EFEAE1))', ORANGE = '#EF8B12', VOILE = 'rgba(var(--plr, 239,234,225),.55)';
  const NS = 'http://www.w3.org/2000/svg';

  const merc = (lon, lat) => {
    const r = Math.PI / 180;
    return [lon * r, Math.log(Math.tan(Math.PI / 4 + (lat * r) / 2))];
  };
  const parcours = (coords) => coords.map(ring =>
    ring.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('') + 'Z').join('');
  const el = (nom, attrs) => {
    const n = document.createElementNS(NS, nom);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  };

  class BeninMapFutur extends HTMLElement {
    connectedCallback() {
      if (this.__init) return;
      this.__init = true;
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = '<style>' + [
        ':host{display:block;position:relative;color:' + CLAIR + ";font-family:'IBM Plex Sans',system-ui,sans-serif;font-variant-numeric:tabular-nums}",
        '.wrap{position:relative;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:36px;width:100%;align-items:stretch}',
        '.stage{position:relative;min-width:0;min-height:460px;overflow:hidden;border:1px solid rgba(var(--plr, 239,234,225),.14)}',
        '.side{display:flex;flex-direction:column;justify-content:space-between;gap:36px;padding:6px 0}',
        '@media (max-width:1000px){.wrap{grid-template-columns:minmax(0,1fr)}.side{flex-direction:row;flex-wrap:wrap;justify-content:flex-start;gap:30px}}',
        'svg{display:block;width:100%;max-width:100%;height:100%;overflow:hidden}',
        '.hud{position:absolute;inset:0;pointer-events:none}',
        '.hud i{position:absolute;width:18px;height:18px;border:1px solid ' + ORANGE + '}',
        '.hud i:nth-child(1){top:10px;left:10px;border-right:0;border-bottom:0}',
        '.hud i:nth-child(2){top:10px;right:10px;border-left:0;border-bottom:0}',
        '.hud i:nth-child(3){bottom:10px;left:10px;border-right:0;border-top:0}',
        '.hud i:nth-child(4){bottom:10px;right:10px;border-left:0;border-top:0}',
        ".hud b{position:absolute;bottom:12px;left:36px;font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:400;letter-spacing:.14em;color:var(--pl, #EFEAE1)}",
        '.balayage{position:absolute;top:0;bottom:0;width:120px;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(239,139,18,.14),transparent);animation:bal 5.5s linear infinite}',
        '@keyframes bal{from{transform:translateX(-140px)}to{transform:translateX(calc(100% + 100vw))}}',
        '.rd{max-width:320px}',
        ".lbl{font-family:'IBM Plex Mono',monospace;font-size:14px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:" + ORANGE + ';margin:0 0 10px}',
        ".ville{font-family:Anybody,'IBM Plex Sans',sans-serif;font-weight:600;font-stretch:112%;letter-spacing:-.02em;font-size:clamp(26px,2.4vw,40px);line-height:1.04;margin:0;color:" + CLAIR + '}',
        '.proj{margin:14px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px}',
        ".proj li{font-family:'IBM Plex Mono',monospace;font-size:15px;line-height:1.55;color:var(--pl, #EFEAE1);padding-left:14px;position:relative}",
        '.proj li:before{content:"";position:absolute;left:0;top:8px;width:6px;height:1px;background:' + ORANGE + '}',
        '.cnt{display:flex;flex-direction:column;gap:18px}',
        ".cnt b{display:block;font-family:Anybody,'IBM Plex Sans',sans-serif;font-weight:600;font-stretch:112%;letter-spacing:-.02em;font-size:clamp(36px,3.3vw,58px);line-height:1;color:" + CLAIR + '}',
        ".cnt span{font-family:'IBM Plex Mono',monospace;font-size:13.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--pl, #EFEAE1)}",
        '.pt{cursor:crosshair}',
        '.pt .noyau{transition:r 160ms ease-out,fill 160ms linear}',
        '.tip{position:absolute;z-index:5;pointer-events:none;opacity:0;transition:opacity 140ms linear;background:rgba(var(--nk2r, 11,10,8),.92);border:1px solid ' + ORANGE + ';backdrop-filter:blur(8px);padding:14px 16px;max-width:290px}',
        ".tip .tv{font-family:Anybody,'IBM Plex Sans',sans-serif;font-weight:600;font-stretch:112%;letter-spacing:-.02em;font-size:22px;line-height:1.1;margin:0;color:" + CLAIR + '}',
        ".tip .tn{margin:5px 0 0;font-family:'IBM Plex Mono',monospace;font-size:13.5px;letter-spacing:.14em;text-transform:uppercase;color:" + ORANGE + '}',
        '.tip ul{margin:11px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:4px}',
        ".tip li{font-family:'IBM Plex Mono',monospace;font-size:14px;line-height:1.5;color:var(--pl, #EFEAE1)}",
        ".err{padding:24px;font-size:18px;color:" + VOILE + '}',
        '@media (prefers-reduced-motion:reduce){.balayage{display:none}*{animation:none !important}}'
      ].join('\n') + '</style><div class="wrap"><div class="stage"><div class="balayage"></div><div class="hud"><i></i><i></i><i></i><i></i><b></b></div></div><div class="side"></div></div>';
      this.render();
    }

    render() {
      const wrap = this.shadowRoot.querySelector('.wrap');
      const stage = this.shadowRoot.querySelector('.stage');
      const side = this.shadowRoot.querySelector('.side');
      const lecture = this.shadowRoot.querySelector('.hud b');
      const geo = window.OBA_GEO;
      if (!geo) { wrap.innerHTML = '<p class="err">Géométrie absente. Le fichier benin-geo.js doit être chargé.</p>'; return; }
      const benin = geo.find(f => f.id === '204');
      const voisins = geo.filter(f => f.id !== '204');

      const mode = this.getAttribute('mode') || 'hero';
      const W = 620, H = mode === 'page' ? 980 : 840;
      const marge = { g: 100, d: 190, h: 46, b: 46 };

      let bx0 = Infinity, by0 = Infinity, bx1 = -Infinity, by1 = -Infinity;
      benin.coordinates.forEach(r => r.forEach(p => {
        const m = merc(p[0], p[1]);
        if (m[0] < bx0) bx0 = m[0]; if (m[0] > bx1) bx1 = m[0];
        if (m[1] < by0) by0 = m[1]; if (m[1] > by1) by1 = m[1];
      }));
      const dispoW = W - marge.g - marge.d, dispoH = H - marge.h - marge.b;
      const k = Math.min(dispoW / (bx1 - bx0), dispoH / (by1 - by0));
      const cx = (bx0 + bx1) / 2, cy = (by0 + by1) / 2;
      const ox = marge.g + dispoW / 2, oy = marge.h + dispoH / 2;
      const proj = (lon, lat) => {
        const m = merc(lon, lat);
        return [ox + (m[0] - cx) * k, oy - (m[1] - cy) * k];
      };
      const projGeo = (coords) => coords.map(r => r.map(p => proj(p[0], p[1])));

      const svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'xMidYMid meet' });
      stage.insertBefore(svg, stage.firstChild);

      const defs = el('defs', {});
      defs.innerHTML = '<filter id="lueur" x="-40%" y="-40%" width="180%" height="180%">'
        + '<feGaussianBlur stdDeviation="3.2" result="f"/><feMerge><feMergeNode in="f"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
        + '<radialGradient id="coeur" cx="50%" cy="50%" r="50%">'
        + '<stop offset="0%" stop-color="rgba(239,139,18,.22)"/><stop offset="100%" stop-color="rgba(239,139,18,0)"/></radialGradient>';
      svg.appendChild(defs);

      const trame = el('g', { opacity: '0.14', style: 'stroke:' + CLAIR });
      const pas = W / 14;
      for (let x = 0; x <= W; x += pas) trame.appendChild(el('line', { x1: x, y1: 0, x2: x, y2: H, 'stroke-width': 0.6 }));
      for (let y = 0; y <= H; y += pas) trame.appendChild(el('line', { x1: 0, y1: y, x2: W, y2: y, 'stroke-width': 0.6 }));
      svg.appendChild(trame);

      const gv = el('g', {});
      voisins.forEach(f => gv.appendChild(el('path', {
        d: parcours(projGeo(f.coordinates)), fill: 'none', style: 'stroke:' + CLAIR,
        'stroke-opacity': 0.2, 'stroke-width': 1, 'stroke-dasharray': '3 5'
      })));
      svg.appendChild(gv);

      const remplissage = el('path', { d: parcours(projGeo(benin.coordinates)), fill: 'url(#coeur)', stroke: 'none' });
      svg.appendChild(remplissage);

      const contour = el('path', {
        d: parcours(projGeo(benin.coordinates)), fill: 'none', stroke: ORANGE,
        'stroke-width': 1.6, filter: 'url(#lueur)'
      });
      svg.appendChild(contour);

      const guides = el('g', { opacity: 0, style: 'transition:opacity 160ms linear' });
      const gh = el('line', { x1: 0, y1: 0, x2: W, y2: 0, stroke: ORANGE, 'stroke-opacity': .5, 'stroke-width': .7, 'stroke-dasharray': '2 4' });
      const gvv = el('line', { x1: 0, y1: 0, x2: 0, y2: H, stroke: ORANGE, 'stroke-opacity': .5, 'stroke-width': .7, 'stroke-dasharray': '2 4' });
      guides.appendChild(gh); guides.appendChild(gvv);
      svg.appendChild(guides);

      const pts = VILLES.map(v => ({ v: v, xy: proj(v.lon, v.lat) })).sort((a, b) => a.v.lat - b.v.lat);

      const compteur = document.createElement('div');
      compteur.className = 'cnt';
      compteur.innerHTML = '<div><b>' + VILLES.length + '</b><span>villes couvertes</span></div><div><b>'
        + VILLES.reduce((n, v) => n + v.p.length, 0) + '</b><span>projets rattachés</span></div>';
      side.appendChild(compteur);

      const releve = document.createElement('div');
      releve.className = 'rd';
      releve.innerHTML = '<p class="lbl">Survolez un point</p><p class="ville"></p><ul class="proj"></ul>';
      side.appendChild(releve);
      const montre = (v) => {
        releve.querySelector('.lbl').textContent = v.p.length > 1 ? v.p.length + ' projets rattachés' : '1 projet rattaché';
        releve.querySelector('.ville').textContent = v.n;
        releve.querySelector('.proj').innerHTML = v.p.map(x => '<li>' + x + '</li>').join('');
      };
      montre(VILLES[0]);

      const deg = (n, pos, neg) => Math.abs(n).toFixed(3) + '° ' + (n >= 0 ? pos : neg);
      lecture.textContent = 'LAT ' + deg(6.3667, 'N', 'S') + '  LON ' + deg(2.4333, 'E', 'O');

      const tip = document.createElement('div');
      tip.className = 'tip';
      wrap.appendChild(tip);
      const poseTip = (ev, v) => {
        const wr = wrap.getBoundingClientRect();
        tip.innerHTML = '<p class="tv">' + v.n + '</p><p class="tn">'
          + (v.p.length > 1 ? v.p.length + ' projets' : '1 projet')
          + ' · ' + deg(v.lat, 'N', 'S') + ' / ' + deg(v.lon, 'E', 'O')
          + '</p><ul>' + v.p.map(x => '<li>' + x + '</li>').join('') + '</ul>';
        tip.style.opacity = '1';
        const tw = tip.offsetWidth, th = tip.offsetHeight;
        let x = ev.clientX - wr.left + 18, y = ev.clientY - wr.top + 18;
        if (x + tw > wr.width - 4) x = ev.clientX - wr.left - tw - 18;
        if (y + th > wr.height - 4) y = Math.max(4, ev.clientY - wr.top - th - 18);
        tip.style.left = Math.max(4, x) + 'px';
        tip.style.top = y + 'px';
      };

      const poses = [[10, 4, 'start'], [-10, 4, 'end'], [10, -9, 'start'], [-10, -9, 'end'],
                     [10, 17, 'start'], [-10, 17, 'end'], [0, -13, 'middle'], [0, 22, 'middle']];
      const boites = pts.map(o => ({ x0: o.xy[0] - 7, y0: o.xy[1] - 7, x1: o.xy[0] + 7, y1: o.xy[1] + 7 }));
      const heurte = (a, b) => !(a.x1 < b.x0 || a.x0 > b.x1 || a.y1 < b.y0 || a.y0 > b.y1);

      const couche = el('g', {});
      svg.appendChild(couche);
      const noeuds = pts.map((o) => {
        const g = el('g', { class: 'pt', transform: 'translate(' + o.xy[0].toFixed(1) + ',' + o.xy[1].toFixed(1) + ')', opacity: 0 });
        g.style.transition = 'opacity 240ms linear';
        g.appendChild(el('circle', { r: 15, fill: 'transparent' }));
        const noyau = el('rect', { x: -3, y: -3, width: 6, height: 6, fill: ORANGE, class: 'noyau' });
        g.appendChild(noyau);

        const w = o.v.n.length * 7.4, h = 14;
        let mise = null;
        for (const pz of poses) {
          const gx = o.xy[0] + pz[0], gy = o.xy[1] + pz[1];
          const x0 = pz[2] === 'end' ? gx - w : pz[2] === 'middle' ? gx - w / 2 : gx;
          const b = { x0: x0 - 2, y0: gy - h + 2, x1: x0 + w + 2, y1: gy + 4 };
          if (!boites.some(p => heurte(b, p))) { mise = { dx: pz[0], dy: pz[1], anc: pz[2], b: b }; break; }
        }
        if (mise) {
          boites.push(mise.b);
          const t = el('text', {
            x: mise.dx, y: mise.dy, 'text-anchor': mise.anc, 'font-size': 14.5,
            'letter-spacing': '.08em', style: 'fill:' + CLAIR, 'font-family': 'IBM Plex Mono, monospace'
          });
          t.textContent = o.v.n.toUpperCase();
          g.appendChild(t);
        }

        g.addEventListener('mouseenter', (ev) => {
          montre(o.v); poseTip(ev, o.v);
          noyau.setAttribute('x', -5); noyau.setAttribute('y', -5);
          noyau.setAttribute('width', 10); noyau.setAttribute('height', 10);
          gh.setAttribute('y1', o.xy[1]); gh.setAttribute('y2', o.xy[1]);
          gvv.setAttribute('x1', o.xy[0]); gvv.setAttribute('x2', o.xy[0]);
          guides.setAttribute('opacity', 1);
          lecture.textContent = 'LAT ' + deg(o.v.lat, 'N', 'S') + '  LON ' + deg(o.v.lon, 'E', 'O');
        });
        g.addEventListener('mousemove', (ev) => poseTip(ev, o.v));
        g.addEventListener('mouseleave', () => {
          tip.style.opacity = '0';
          noyau.setAttribute('x', -3); noyau.setAttribute('y', -3);
          noyau.setAttribute('width', 6); noyau.setAttribute('height', 6);
          guides.setAttribute('opacity', 0);
        });
        couche.appendChild(g);
        return g;
      });

      const L = contour.getTotalLength();
      contour.setAttribute('stroke-dasharray', L + ' ' + L);
      contour.setAttribute('stroke-dashoffset', L);
      contour.style.transition = 'stroke-dashoffset 1600ms cubic-bezier(.65,0,.35,1)';
      requestAnimationFrame(() => contour.setAttribute('stroke-dashoffset', 0));
      noeuds.forEach((n, i) => setTimeout(() => n.setAttribute('opacity', 1), 500 + i * 60));
    }
  }
  if (!customElements.get('benin-map-futur')) customElements.define('benin-map-futur', BeninMapFutur);
})();
