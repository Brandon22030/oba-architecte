"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { OBA_GEO } from "@/data/benin-geo";
import {
  computeLabelPlacements,
  formatDeg,
  makeProjector,
  pathFromRings,
  projectRings,
  type LabelPlacement,
} from "@/lib/benin-map/geometry";
import type { Ville } from "@/lib/data/ville-types";

const ORANGE = "#EF8B12";
const W = 620;
const H = 980; // mode="page" height, the only mode used on the Territoire page

type Point = {
  ville: Ville;
  xy: [number, number];
  label: LabelPlacement | null;
};

export function BeninMap({ villes }: { villes: Ville[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const contourRef = useRef<SVGPathElement>(null);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);

  const [hovered, setHovered] = useState<Ville | null>(null);
  const [hoverY, setHoverY] = useState<number | null>(null);
  const [isWide, setIsWide] = useState(true);

  useEffect(() => {
    const mq = matchMedia("(min-width: 1000.5px)");
    const update = () => setIsWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  function enterPoint(e: React.MouseEvent, ville: Ville) {
    setHovered(ville);
    const wr = wrapRef.current?.getBoundingClientRect();
    if (!wr) return;
    const mr = e.currentTarget.getBoundingClientRect();
    const margin = 90;
    const y = mr.top + mr.height / 2 - wr.top;
    setHoverY(Math.min(Math.max(y, margin), wr.height - margin));
  }

  function leavePoint() {
    setHovered(null);
    setHoverY(null);
  }

  const geometry = useMemo(() => {
    const benin = OBA_GEO.find((f) => f.id === "204")!;
    const voisins = OBA_GEO.filter((f) => f.id !== "204");
    const proj = makeProjector(benin, W, H);

    const beninPath = pathFromRings(projectRings(benin.coordinates, proj));
    const voisinsPaths = voisins.map((f) => pathFromRings(projectRings(f.coordinates, proj)));

    const sorted = [...villes].sort((a, b) => a.lat - b.lat);
    const withXy = sorted.map((v) => ({ ville: v, xy: proj(v.lon, v.lat) as [number, number] }));
    const labels = computeLabelPlacements(withXy.map((p) => ({ xy: p.xy, name: p.ville.nom })));
    const points: Point[] = withXy.map((p, i) => ({ ...p, label: labels[i] }));

    return { beninPath, voisinsPaths, points };
  }, [villes]);

  useEffect(() => {
    const path = contourRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = String(length);
    path.style.transition = "stroke-dashoffset 1600ms cubic-bezier(.65,0,.35,1)";
    const raf = requestAnimationFrame(() => {
      path.style.strokeDashoffset = "0";
    });

    const timers = nodeRefs.current.map((node, i) =>
      window.setTimeout(() => {
        if (node) node.style.opacity = "1";
      }, 500 + i * 60),
    );

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => clearTimeout(t));
    };
  }, [geometry]);

  const active = hovered ?? villes[0];
  const totalProjects = villes.reduce((n, v) => n + v.projets.length, 0);

  return (
    <div
      ref={wrapRef}
      className="relative grid items-stretch gap-9 max-[1000px]:grid-cols-1"
      style={{ gridTemplateColumns: "minmax(0,1fr) 320px", color: "var(--pl)" }}
    >
      {/* Stage */}
      <div className="relative min-h-[460px] overflow-hidden border" style={{ borderColor: "rgba(var(--plr),.14)" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0 w-[26%]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(239,139,18,.14), transparent)",
            animation: "obaRadar 5.5s linear infinite",
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {(["tl", "tr", "bl", "br"] as const).map((corner) => (
            <i
              key={corner}
              className="absolute h-4.5 w-4.5 border"
              style={{
                borderColor: ORANGE,
                top: corner[0] === "t" ? 10 : undefined,
                bottom: corner[0] === "b" ? 10 : undefined,
                left: corner[1] === "l" ? 10 : undefined,
                right: corner[1] === "r" ? 10 : undefined,
                borderRightWidth: corner[1] === "l" ? 1 : 0,
                borderLeftWidth: corner[1] === "r" ? 1 : 0,
                borderBottomWidth: corner[0] === "t" ? 1 : 0,
                borderTopWidth: corner[0] === "b" ? 1 : 0,
              }}
            />
          ))}
          <b
            className="absolute bottom-3 left-9 font-mono text-[13px] tracking-[.14em]"
            style={{ color: "var(--pl)" }}
          >
            LAT {formatDeg(active.lat, "N", "S")}  LON {formatDeg(active.lon, "E", "O")}
          </b>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="block h-full w-full">
          <defs>
            <filter id="oba-map-lueur" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.2" result="f" />
              <feMerge>
                <feMergeNode in="f" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="oba-map-coeur" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(239,139,18,.22)" />
              <stop offset="100%" stopColor="rgba(239,139,18,0)" />
            </radialGradient>
          </defs>

          <g opacity={0.14} style={{ stroke: "var(--pl)" }}>
            {Array.from({ length: Math.floor(W / (W / 14)) + 1 }).map((_, i) => {
              const x = i * (W / 14);
              return <line key={`x${i}`} x1={x} y1={0} x2={x} y2={H} strokeWidth={0.6} />;
            })}
            {Array.from({ length: Math.floor(H / (W / 14)) + 1 }).map((_, i) => {
              const y = i * (W / 14);
              return <line key={`y${i}`} x1={0} y1={y} x2={W} y2={y} strokeWidth={0.6} />;
            })}
          </g>

          <g>
            {geometry.voisinsPaths.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                style={{ stroke: "var(--pl)" }}
                strokeOpacity={0.2}
                strokeWidth={1}
                strokeDasharray="3 5"
              />
            ))}
          </g>

          <path d={geometry.beninPath} fill="url(#oba-map-coeur)" stroke="none" />
          <path ref={contourRef} d={geometry.beninPath} fill="none" stroke={ORANGE} strokeWidth={1.6} filter="url(#oba-map-lueur)" />

          <g opacity={hovered ? 1 : 0} style={{ transition: "opacity 160ms linear" }}>
            <line
              x1={0}
              y1={hovered ? geometry.points.find((p) => p.ville === hovered)?.xy[1] : 0}
              x2={W}
              y2={hovered ? geometry.points.find((p) => p.ville === hovered)?.xy[1] : 0}
              stroke={ORANGE}
              strokeOpacity={0.5}
              strokeWidth={0.7}
              strokeDasharray="2 4"
            />
            <line
              x1={hovered ? geometry.points.find((p) => p.ville === hovered)?.xy[0] : 0}
              y1={0}
              x2={hovered ? geometry.points.find((p) => p.ville === hovered)?.xy[0] : 0}
              y2={H}
              stroke={ORANGE}
              strokeOpacity={0.5}
              strokeWidth={0.7}
              strokeDasharray="2 4"
            />
          </g>

          <g>
            {geometry.points.map((p, i) => {
              const isHovered = hovered === p.ville;
              return (
                <g
                  key={p.ville.nom}
                  ref={(node) => {
                    nodeRefs.current[i] = node;
                  }}
                  className="cursor-crosshair"
                  transform={`translate(${p.xy[0].toFixed(1)},${p.xy[1].toFixed(1)})`}
                  style={{ opacity: 0, transition: "opacity 240ms linear" }}
                  onMouseEnter={(e) => enterPoint(e, p.ville)}
                  onMouseLeave={leavePoint}
                >
                  <circle r={15} fill="transparent" />
                  <rect
                    x={isHovered ? -5 : -3}
                    y={isHovered ? -5 : -3}
                    width={isHovered ? 10 : 6}
                    height={isHovered ? 10 : 6}
                    fill={ORANGE}
                    style={{ transition: "all 160ms ease-out" }}
                  />
                  {p.label && (
                    <text
                      x={p.label.dx}
                      y={p.label.dy}
                      textAnchor={p.label.anchor}
                      fontSize={14.5}
                      letterSpacing=".08em"
                      fontFamily="IBM Plex Mono, monospace"
                      style={{ fill: "var(--pl)" }}
                    >
                      {p.ville.nom.toUpperCase()}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

      </div>

      {/* Side panel */}
      <div className="flex flex-col justify-between gap-9 py-1.5 max-[1000px]:flex-row max-[1000px]:flex-wrap max-[1000px]:justify-start">
        <div className="flex flex-col gap-4.5">
          <div>
            <b className="font-display block" style={{ fontSize: "clamp(36px,3.3vw,58px)", lineHeight: 1, fontVariationSettings: "'wdth' 84,'wght' 600" }}>
              {villes.length}
            </b>
            <span className="font-mono text-[13.5px] tracking-[.16em] uppercase" style={{ color: "var(--pl)" }}>
              villes couvertes
            </span>
          </div>
          <div>
            <b className="font-display block" style={{ fontSize: "clamp(36px,3.3vw,58px)", lineHeight: 1, fontVariationSettings: "'wdth' 84,'wght' 600" }}>
              {totalProjects}
            </b>
            <span className="font-mono text-[13.5px] tracking-[.16em] uppercase" style={{ color: "var(--pl)" }}>
              projets rattachés
            </span>
          </div>
        </div>

        <div
          className="max-w-[320px] transition-[top] duration-200 ease-out"
          style={
            isWide && hoverY != null
              ? { position: "absolute", right: 0, top: hoverY, transform: "translateY(-50%)" }
              : undefined
          }
        >
          <p className="m-0 mb-2.5 font-mono text-sm font-medium tracking-[.2em] uppercase" style={{ color: ORANGE }}>
            {hovered ? (active.projets.length > 1 ? `${active.projets.length} projets rattachés` : "1 projet rattaché") : "Survolez un point"}
          </p>
          <p className="font-display m-0" style={{ fontSize: "clamp(26px,2.4vw,40px)", lineHeight: 1.04, fontVariationSettings: "'wdth' 84,'wght' 600" }}>
            {active.nom}
          </p>
          <ul className="mt-3.5 mb-0 flex list-none flex-col gap-1.5 p-0">
            {active.projets.map((proj) => (
              <li key={proj} className="relative pl-3.5 font-mono text-[15px] leading-[1.55]" style={{ color: "var(--pl)" }}>
                <span className="absolute top-2 left-0 h-px w-1.5" style={{ background: ORANGE }} />
                {proj}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
