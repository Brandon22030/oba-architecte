// <benin-map> — carte du Bénin, autonome : géométrie embarquée (benin-geo.js), projection
// Mercator calculée ici, aucun appel réseau. Attributs : mode="hero"|"page".
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
  const PLATRE = '#EFEAE1', ENCRE = '#3A3733', LAITON = '#75590F', TAUPE = '#655B4E';
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

  class BeninMap extends HTMLElement {
    connectedCallback() {
      if (this.__init) return;
      this.__init = true;
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = '<style>' + [
        ':host{display:block;position:relative;background:' + PLATRE + ';color:' + ENCRE + ";font-family:'IBM Plex Sans',system-ui,sans-serif;font-variant-numeric:tabular-nums}",
        '.wrap{position:relative;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:32px;width:100%;align-items:stretch}',
        '.stage{min-width:0;min-height:420px;overflow:hidden}',
        '.side{display:flex;flex-direction:column;justify-content:space-between;gap:40px;padding:8px 0}',
        '@media (max-width:1000px){.wrap{grid-template-columns:minmax(0,1fr)}.side{flex-direction:row;flex-wrap:wrap;justify-content:flex-start;gap:32px}}',
        'svg{display:block;width:100%;max-width:100%;height:100%;overflow:hidden}',
        '.rd{max-width:300px}',
        ".lbl{font-family:Anybody,'IBM Plex Sans',sans-serif;font-size:19px;font-weight:600;font-stretch:96%;letter-spacing:.04em;color:" + TAUPE + ';margin:0 0 8px}',
        ".ville{font-family:Anybody,'IBM Plex Sans',sans-serif;font-weight:600;font-stretch:112%;letter-spacing:-.02em;font-size:clamp(24px,2.2vw,34px);line-height:1.08;margin:0;color:" + ENCRE + '}',
        '.proj{margin:10px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:4px}',
        '.proj li{font-size:20px;line-height:1.5;color:' + ENCRE + '}',
        '.cnt{text-align:left}',
        ".cnt b{display:block;font-family:Anybody,'IBM Plex Sans',sans-serif;font-weight:600;font-stretch:112%;letter-spacing:-.02em;font-size:clamp(34px,3.1vw,52px);line-height:1;color:" + ENCRE + '}',
        ".cnt span{font-family:Anybody,'IBM Plex Sans',sans-serif;font-size:19px;font-weight:600;font-stretch:96%;letter-spacing:.04em;color:" + TAUPE + '}',
        '.pt{cursor:pointer}',
        '.pt circle.noyau{transition:r 160ms ease-out}',
        '.tip{position:absolute;z-index:5;pointer-events:none;opacity:0;transition:opacity 140ms linear;background:#F8F5EE;border:1px solid ' + ENCRE + ';padding:14px 16px;max-width:280px}',
        ".tip .tv{font-family:Anybody,'IBM Plex Sans',sans-serif;font-weight:600;font-stretch:112%;letter-spacing:-.02em;font-size:22px;line-height:1.1;margin:0;color:" + ENCRE + '}',
        '.tip .tn{margin:4px 0 0;font-size:17px;color:' + TAUPE + '}',
        '.tip ul{margin:10px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:3px}',
        '.tip li{font-size:17px;line-height:1.4;color:' + ENCRE + '}',
        '.err{padding:24px;font-size:20px;color:' + TAUPE + '}'
      ].join('\n') + '</style><div class="wrap"><div class="stage"></div><div class="side"></div></div>';
      this.render();
    }

    render() {
      const wrap = this.shadowRoot.querySelector('.wrap');
      const stage = this.shadowRoot.querySelector('.stage');
      const side = this.shadowRoot.querySelector('.side');
      const geo = window.OBA_GEO;
      if (!geo) { wrap.innerHTML = '<p class="err">Géométrie absente. Le fichier benin-geo.js doit être chargé.</p>'; return; }
      const benin = geo.find(f => f.id === '204');
      const voisins = geo.filter(f => f.id !== '204');

      const mode = this.getAttribute('mode') || 'hero';
      const W = 620, H = mode === 'page' ? 1000 : 840;
      const marge = { g: 100, d: 190, h: 40, b: 40 };

      // Cadrage sur le Bénin
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
      stage.appendChild(svg);

      // Fond de plan : trame de colonnes
      const trame = el('g', { opacity: '0.08' });
      const pas = W / 12;
      for (let i = 0; i <= 12; i++) {
        trame.appendChild(el('line', { x1: pas * i, y1: 0, x2: pas * i, y2: H, stroke: ENCRE, 'stroke-width': 1 }));
      }
      for (let y = 0; y <= H; y += pas) {
        trame.appendChild(el('line', { x1: 0, y1: y, x2: W, y2: y, stroke: ENCRE, 'stroke-width': 1 }));
      }
      svg.appendChild(trame);

      const gv = el('g', {});
      voisins.forEach(f => gv.appendChild(el('path', {
        d: parcours(projGeo(f.coordinates)), fill: 'none', stroke: ENCRE, 'stroke-opacity': 0.16, 'stroke-width': 1
      })));
      svg.appendChild(gv);

      const contour = el('path', { d: parcours(projGeo(benin.coordinates)), fill: 'none', stroke: ENCRE, 'stroke-width': 1.5 });
      svg.appendChild(contour);

      const pts = VILLES.map(v => ({ v: v, xy: proj(v.lon, v.lat) })).sort((a, b) => a.v.lat - b.v.lat);

      // Relevé latéral
      const compteur = document.createElement('div');
      compteur.className = 'cnt';
      compteur.innerHTML = '<b>' + VILLES.length + '</b><span>villes couvertes</span><b style="margin-top:20px">'
        + VILLES.reduce((n, v) => n + v.p.length, 0) + '</b><span>projets rattachés</span>';
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

      // Infobulle au curseur
      const tip = document.createElement('div');
      tip.className = 'tip';
      wrap.appendChild(tip);
      const poseTip = (ev, v) => {
        const wr = wrap.getBoundingClientRect();
        tip.innerHTML = '<p class="tv">' + v.n + '</p><p class="tn">'
          + (v.p.length > 1 ? v.p.length + ' projets rattachés' : '1 projet rattaché')
          + '</p><ul>' + v.p.map(x => '<li>' + x + '</li>').join('') + '</ul>';
        tip.style.opacity = '1';
        const tw = tip.offsetWidth, th = tip.offsetHeight;
        let x = ev.clientX - wr.left + 18, y = ev.clientY - wr.top + 18;
        if (x + tw > wr.width - 4) x = ev.clientX - wr.left - tw - 18;
        if (y + th > wr.height - 4) y = Math.max(4, ev.clientY - wr.top - th - 18);
        tip.style.left = Math.max(4, x) + 'px';
        tip.style.top = y + 'px';
      };

      // Étiquettes dégroupées : huit positions candidates, retrait si la place manque
      const poses = [[9, 4, 'start'], [-9, 4, 'end'], [9, -9, 'start'], [-9, -9, 'end'],
                     [9, 17, 'start'], [-9, 17, 'end'], [0, -12, 'middle'], [0, 22, 'middle']];
      const boites = pts.map(o => ({ x0: o.xy[0] - 7, y0: o.xy[1] - 7, x1: o.xy[0] + 7, y1: o.xy[1] + 7 }));
      const heurte = (a, b) => !(a.x1 < b.x0 || a.x0 > b.x1 || a.y1 < b.y0 || a.y0 > b.y1);

      const couche = el('g', {});
      svg.appendChild(couche);
      const noeuds = pts.map(o => {
        const g = el('g', { class: 'pt', transform: 'translate(' + o.xy[0].toFixed(1) + ',' + o.xy[1].toFixed(1) + ')', opacity: 0 });
        g.style.transition = 'opacity 240ms linear';
        g.appendChild(el('circle', { r: 14, fill: 'transparent' }));
        const noyau = el('circle', { r: 3.5, fill: LAITON, class: 'noyau' });
        g.appendChild(noyau);

        const w = o.v.n.length * 8.1, h = 15;
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
            x: mise.dx, y: mise.dy, 'text-anchor': mise.anc, 'font-size': 16,
            'font-weight': 600, fill: TAUPE, 'font-family': 'IBM Plex Sans, sans-serif'
          });
          t.textContent = o.v.n;
          g.appendChild(t);
        }

        g.addEventListener('mouseenter', (ev) => { montre(o.v); poseTip(ev, o.v); noyau.setAttribute('r', 6.5); });
        g.addEventListener('mousemove', (ev) => poseTip(ev, o.v));
        g.addEventListener('mouseleave', () => { tip.style.opacity = '0'; noyau.setAttribute('r', 3.5); });
        couche.appendChild(g);
        return g;
      });

      // Tracé du contour puis allumage des points, une fois par session
      let deja = false;
      try { deja = sessionStorage.getItem('oba-map') === '1'; } catch (e) {}
      if (deja) { noeuds.forEach(n => n.setAttribute('opacity', 1)); return; }
      try { sessionStorage.setItem('oba-map', '1'); } catch (e) {}
      const L = contour.getTotalLength();
      contour.setAttribute('stroke-dasharray', L + ' ' + L);
      contour.setAttribute('stroke-dashoffset', L);
      contour.style.transition = 'stroke-dashoffset 1200ms cubic-bezier(.65,0,.35,1)';
      requestAnimationFrame(() => contour.setAttribute('stroke-dashoffset', 0));
      noeuds.forEach((n, i) => setTimeout(() => n.setAttribute('opacity', 1), 400 + i * 55));
    }
  }
  if (!customElements.get('benin-map')) customElements.define('benin-map', BeninMap);
})();
