// Pure geometry helpers ported from site/benin-map-futur.js: local Mercator
// projection, bounding-box fit to the Bénin outline, and the greedy
// anti-collision label placement for city markers.

import type { GeoFeature } from "@/data/benin-geo";

export function merc(lon: number, lat: number): [number, number] {
  const r = Math.PI / 180;
  return [lon * r, Math.log(Math.tan(Math.PI / 4 + (lat * r) / 2))];
}

export function pathFromRings(rings: number[][][]): string {
  return rings
    .map((ring) => ring.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join("") + "Z")
    .join("");
}

export type Projector = (lon: number, lat: number) => [number, number];

export function makeProjector(benin: GeoFeature, width: number, height: number) {
  const margin = { g: 100, d: 190, h: 46, b: 46 };
  let bx0 = Infinity;
  let by0 = Infinity;
  let bx1 = -Infinity;
  let by1 = -Infinity;

  benin.coordinates.forEach((ring) =>
    ring.forEach((p) => {
      const m = merc(p[0], p[1]);
      if (m[0] < bx0) bx0 = m[0];
      if (m[0] > bx1) bx1 = m[0];
      if (m[1] < by0) by0 = m[1];
      if (m[1] > by1) by1 = m[1];
    }),
  );

  const dispoW = width - margin.g - margin.d;
  const dispoH = height - margin.h - margin.b;
  const k = Math.min(dispoW / (bx1 - bx0), dispoH / (by1 - by0));
  const cx = (bx0 + bx1) / 2;
  const cy = (by0 + by1) / 2;
  const ox = margin.g + dispoW / 2;
  const oy = margin.h + dispoH / 2;

  const proj: Projector = (lon, lat) => {
    const m = merc(lon, lat);
    return [ox + (m[0] - cx) * k, oy - (m[1] - cy) * k];
  };

  return proj;
}

export function projectRings(rings: number[][][], proj: Projector): number[][][] {
  return rings.map((ring) => ring.map((p) => proj(p[0], p[1])));
}

export type LabelPlacement = { dx: number; dy: number; anchor: "start" | "end" | "middle" };

const CANDIDATE_POSITIONS: [number, number, LabelPlacement["anchor"]][] = [
  [10, 4, "start"],
  [-10, 4, "end"],
  [10, -9, "start"],
  [-10, -9, "end"],
  [10, 17, "start"],
  [-10, 17, "end"],
  [0, -13, "middle"],
  [0, 22, "middle"],
];

type Box = { x0: number; y0: number; x1: number; y1: number };

function overlaps(a: Box, b: Box) {
  return !(a.x1 < b.x0 || a.x0 > b.x1 || a.y1 < b.y0 || a.y0 > b.y1);
}

/**
 * Greedy label placement: for each point (already sorted, e.g. by latitude),
 * tries 8 candidate offsets and picks the first that doesn't collide with an
 * already-placed label's bounding box.
 */
export function computeLabelPlacements(points: { xy: [number, number]; name: string }[]): (LabelPlacement | null)[] {
  const boxes: Box[] = points.map((p) => ({
    x0: p.xy[0] - 7,
    y0: p.xy[1] - 7,
    x1: p.xy[0] + 7,
    y1: p.xy[1] + 7,
  }));

  return points.map((p) => {
    const w = p.name.length * 7.4;
    const h = 14;
    for (const [dx, dy, anchor] of CANDIDATE_POSITIONS) {
      const gx = p.xy[0] + dx;
      const gy = p.xy[1] + dy;
      const x0 = anchor === "end" ? gx - w : anchor === "middle" ? gx - w / 2 : gx;
      const box: Box = { x0: x0 - 2, y0: gy - h + 2, x1: x0 + w + 2, y1: gy + 4 };
      if (!boxes.some((existing) => overlaps(box, existing))) {
        boxes.push(box);
        return { dx, dy, anchor };
      }
    }
    return null;
  });
}

export function formatDeg(n: number, pos: string, neg: string) {
  return `${Math.abs(n).toFixed(3)}° ${n >= 0 ? pos : neg}`;
}
