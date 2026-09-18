/**
 * AZERTY keyboard prelude for the homepage intro, ported from site/preview.html's
 * OBAKeyboardIntro module. A full keyboard renders, every key but O/B/A scatters
 * and falls away, then O-B-A align, drop into place and morph — via a growing
 * circular mask reveal — into the real logo letterforms cut from the project's
 * own PNG (no substitute font). Construction-guide circles/lines flash and fade,
 * the orange accent square flies a short bezier loop back to its spot, the
 * "Architectes" wordmark fades in below, and the assembled mark then rises to
 * the screen center, pauses, and travels itself all the way to the real header
 * logo's exact resting box — IntroController only swaps in the real <img> once
 * this element is already sitting pixel-perfectly in place, so there is no
 * separate handoff animation and no visible jump.
 *
 * Source coordinates below are the reference's original 2048×1993 slice data,
 * translated by (-230, -650) to match the tightly-cropped 1565×750 ink assets
 * this project actually ships (public/assets/logo-oba-prelude-*.png), which are
 * the same artwork as the reference's padded canvas, just cropped the same way
 * as public/assets/logo-oba-clair.png.
 */

export const KEYBOARD_PRELUDE_DURATION = 6850;

export type PreludeAnimate = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => Promise<void>;

const NS = "http://www.w3.org/2000/svg";
const SOURCE = { width: 1565, height: 750 };
const BASELINE_Y = 612;
const EASE = "cubic-bezier(.45,0,.2,1)";
const GRAVITY = "cubic-bezier(.42,0,.88,.5)";

const SLICES: Record<"O" | "B" | "A" | "orange" | "word", [number, number, number, number]> = {
  O: [52, 36, 462, 577],
  B: [554, 36, 460, 577],
  A: [1054, 36, 462, 577],
  orange: [929, 527, 84, 84],
  word: [50, 630, 1490, 110],
};

const GUIDE_PATHS = [
  "M 51 382 A 230 230 0 1 1 511 382 A 230 230 0 1 1 51 382",
  "M 554 382 A 230 230 0 1 1 1014 382 A 230 230 0 1 1 554 382",
  "M 1053 382 A 230 230 0 1 1 1513 382 A 230 230 0 1 1 1053 382",
  "M 0 612 H 1565 M 554 0 V 750 M 1513 85 V 750",
];

const ROWS = [
  ["&", "é", '"', "'", "(", "-", "è", "_", "ç", "à", ")", "="],
  ["Tab", "A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P", "⌫"],
  ["⇧", "Q", "S", "D", "F", "G", "H", "J", "K", "L", "M", "↵"],
  ["⇧", "<", "W", "X", "C", "V", "B", "N", ",", ";", ":", "!"],
  ["Ctrl", "Fn", "Alt", "Espace", "Alt Gr", "Ctrl"],
];

function letterFragment(letter: "O" | "B" | "A", href: string) {
  const [x, y, width, height] = SLICES[letter];
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
  svg.setAttribute("aria-hidden", "true");
  svg.style.cssText = "display:block;width:100%;height:100%;overflow:hidden";

  const image = document.createElementNS(NS, "image");
  image.setAttribute("href", href);
  image.setAttribute("width", String(SOURCE.width));
  image.setAttribute("height", String(SOURCE.height));

  const mask = document.createElementNS(NS, "mask");
  const id = `oba-draw-${letter}-${Math.random().toString(36).slice(2)}`;
  mask.setAttribute("id", id);
  mask.setAttribute("maskUnits", "userSpaceOnUse");
  mask.setAttribute("x", "0");
  mask.setAttribute("y", "0");
  mask.setAttribute("width", String(SOURCE.width));
  mask.setAttribute("height", String(SOURCE.height));

  // A single circle growing from the letter's center cleanly reveals it in one
  // motion — more reliable than a hand-tuned stroke path, which can leave part
  // of the ring uncovered mid-draw (most visible on the round "O").
  const circle = document.createElementNS(NS, "circle");
  circle.setAttribute("cx", String(x + width / 2));
  circle.setAttribute("cy", String(y + height / 2));
  circle.setAttribute("r", "0");
  circle.setAttribute("fill", "white");
  mask.append(circle);
  const radius = Math.hypot(width, height) / 2 + 14;

  const defs = document.createElementNS(NS, "defs");
  defs.append(mask);
  image.setAttribute("mask", `url(#${id})`);
  svg.append(defs, image);

  return { svg, circle, radius };
}

function wordFragment(href: string) {
  const [x, y, width, height] = SLICES.word;
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
  svg.setAttribute("aria-hidden", "true");
  // Starts hidden until its own delayed fade-in animation takes over (fill:"forwards"
  // does not back-fill during the pre-animation delay, unlike "both").
  svg.style.cssText = "display:block;width:100%;height:100%;overflow:hidden;opacity:0";
  const image = document.createElementNS(NS, "image");
  image.setAttribute("href", href);
  image.setAttribute("width", String(SOURCE.width));
  image.setAttribute("height", String(SOURCE.height));
  svg.append(image);
  return svg;
}

export function mountKeyboardPrelude({
  container,
  width,
  logoSrc,
  home,
  pause,
  travel,
  easing,
  animate,
}: {
  container: HTMLElement;
  width: number;
  logoSrc: string;
  /** The real header logo's natural resting box (from getBoundingClientRect(), pre-transform) — the assembly travels all the way there itself. */
  home: { left: number; top: number; width: number; height: number };
  pause: number;
  travel: number;
  easing: string;
  animate: PreludeAnimate;
}): { stage: HTMLDivElement; finished: Promise<void> } {
  const stage = document.createElement("div");
  stage.className = "keyboard-intro";
  stage.setAttribute("aria-hidden", "true");

  const board = document.createElement("div");
  board.className = "keyboard-board";
  const selected = new Map<"O" | "B" | "A", { key: HTMLDivElement; cap: HTMLSpanElement; label: HTMLSpanElement; ring: SVGSVGElement; circle: SVGCircleElement }>();

  ROWS.forEach((letters, rowIndex) => {
    const row = document.createElement("div");
    row.className = "keyboard-row";
    if (rowIndex === 4) row.classList.add("keyboard-row-bottom");
    letters.forEach((letter) => {
      const key = document.createElement("div");
      key.className = "keyboard-key";
      const cap = document.createElement("span");
      cap.className = "keyboard-key-cap";
      const label = document.createElement("span");
      label.className = "keyboard-key-label";
      label.textContent = letter;
      key.append(cap, label);
      if ((["O", "B", "A"] as const).includes(letter as "O" | "B" | "A") && letter.length === 1) {
        key.dataset.key = letter;
        const ring = document.createElementNS(NS, "svg");
        ring.setAttribute("viewBox", "0 0 100 100");
        ring.classList.add("keyboard-key-ring");
        const circle = document.createElementNS(NS, "circle");
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "46");
        circle.setAttribute("pathLength", "1");
        ring.append(circle);
        key.append(ring);
        selected.set(letter as "O" | "B" | "A", { key, cap, label, ring, circle });
      }
      row.append(key);
    });
    board.append(row);
  });

  const assembly = document.createElement("div");
  assembly.className = "keyboard-assembly";
  stage.append(board, assembly);
  container.append(stage);

  const tasks: Promise<void>[] = [];
  const run = (element: Element, frames: Keyframe[], delay: number, duration: number, easing: string = EASE) => {
    tasks.push(animate(element, frames, { delay, duration, easing, fill: "forwards" }));
  };

  const rects = new Map([...board.querySelectorAll<HTMLDivElement>(".keyboard-key")].map((key) => [key, key.getBoundingClientRect()] as const));
  const factor = width / SOURCE.width;
  const height = SOURCE.height * factor;
  const left = (innerWidth - width) / 2;
  const floor = innerHeight * 0.78;
  const assemblyTop = floor - BASELINE_Y * factor;
  const finalTop = (innerHeight - height) / 2;
  Object.assign(assembly.style, { left: `${left}px`, top: `${assemblyTop}px`, width: `${width}px`, height: `${height}px`, transformOrigin: "0 0" });

  rects.forEach((rect, key) => {
    Object.assign(key.style, { position: "absolute", left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
    stage.append(key);
    run(key, [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], 0, 600);
  });
  board.remove();

  let ordinal = 0;
  rects.forEach((rect, key) => {
    if (key.dataset.key) return;
    const seed = ordinal++;
    const drift = ((seed * 13) % 19 - 9) * 2;
    const rotation = (seed * 7) % 17 - 8;
    const delay = 1100 + ((seed * 37) % 140);
    run(
      key,
      [
        { opacity: 1, transform: "translate(0,0) rotate(0deg)", offset: 0 },
        { opacity: 1, offset: 0.3 },
        { opacity: 0, transform: `translate(${drift}px,${innerHeight - rect.top + 70}px) rotate(${rotation}deg)`, offset: 1 },
      ],
      delay,
      560,
      GRAVITY,
    );
  });

  (["O", "B", "A"] as const).forEach((letter, index) => {
    const entry = selected.get(letter);
    if (!entry) return;
    const { key, label, ring, circle } = entry;
    const rect = rects.get(key)!;
    const [sx, sy, sw, sh] = SLICES[letter];
    const targetX = left + (sx + sw / 2) * factor;
    const landingTop = floor - rect.height;
    const rowY = Math.max(90, innerHeight * 0.22);
    const tx = targetX - (rect.left + rect.width / 2);
    const alignY = rowY - rect.top;
    const downY = landingTop - rect.top;
    const translate = (y: number, extra = "") => `translate(${tx}px,${y}px) ${extra}`;

    run(circle, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], 600 + index * 65, 300);
    run(key, [{ transform: "translate(0,0)" }, { transform: translate(alignY) }], 1800, 400);
    run(key, [{ transform: translate(alignY) }, { transform: translate(downY) }], 2200 + index * 40, 600 - index * 40, GRAVITY);
    run(
      key,
      [
        { transform: translate(downY), offset: 0 },
        { transform: translate(downY, "scale(1.035,.965)"), offset: 0.14 },
        { transform: translate(downY - 9), offset: 0.48 },
        { transform: translate(downY), offset: 1 },
      ],
      2800,
      300,
    );

    const piece = document.createElement("div");
    piece.className = "keyboard-piece";
    Object.assign(piece.style, { left: `${sx * factor}px`, top: `${sy * factor}px`, width: `${sw * factor}px`, height: `${sh * factor}px` });
    const drawing = letterFragment(letter, logoSrc);
    piece.append(drawing.svg);
    assembly.append(piece);
    const revealDelay = 3250 + index * 150;
    run(piece, [{ opacity: 1 }, { opacity: 1 }], revealDelay, 1);
    run(drawing.circle, [{ r: 0 }, { r: drawing.radius }], revealDelay, 650, "cubic-bezier(.2,.8,.2,1)");

    const pieceCenterY = assemblyTop + (sy + sh / 2) * factor;
    const pieceOffsetY = floor - rect.height / 2 - pieceCenterY;
    run(key, [{ transform: translate(downY) }, { transform: translate(downY - pieceOffsetY, "scale(.85)") }], 3100, 800);
    run(entry.cap, [{ opacity: 1 }, { opacity: 0 }], 3100, 400);
    run(label, [{ opacity: 1 }, { opacity: 0 }], 3180, 470);
    run(ring, [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(.65)" }], 3180, 500);
  });

  const guides = document.createElementNS(NS, "svg");
  guides.setAttribute("viewBox", `0 0 ${SOURCE.width} ${SOURCE.height}`);
  guides.style.cssText = "position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none";
  GUIDE_PATHS.forEach((d, index) => {
    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "rgba(var(--plr),.42)");
    path.setAttribute("stroke-width", "3");
    path.setAttribute("pathLength", "1");
    path.style.strokeDasharray = "1";
    path.style.strokeDashoffset = "1";
    guides.append(path);
    run(path, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], 3100 + index * 40, 650);
  });
  assembly.append(guides);
  run(guides, [{ opacity: 0.75 }, { opacity: 0 }], 4250, 400);

  // Orange accent: a live-colored square (not a raster slice) so its edges stay crisp
  // while flying. Fixed to the exact orange baked into the logo PNG (identical in both
  // logo-oba-clair.png and logo-oba-sombre.png) — not var(--ac), which is deliberately
  // darkened in the light theme for contrast elsewhere and would not match the real logo.
  const [ox, oy, ow, oh] = SLICES.orange;
  const orangePiece = document.createElement("div");
  Object.assign(orangePiece.style, {
    position: "absolute",
    left: `${ox * factor}px`,
    top: `${oy * factor}px`,
    width: `${ow * factor}px`,
    height: `${oh * factor}px`,
    background: "rgb(242,135,0)",
    opacity: "0",
  });
  assembly.append(orangePiece);
  {
    const reach = Math.min(innerWidth * 0.24, 180);
    const rise = Math.min(innerHeight * 0.3, 190);
    const originX = left + (ox + ow / 2) * factor;
    const start = { x: 0, y: -oh * factor };
    const control1 = { x: Math.min(reach, innerWidth - originX - 24), y: -rise };
    const control2 = { x: -Math.min(reach * 1.35, originX - 24), y: -rise * 1.35 };
    const frames: Keyframe[] = [];
    for (let step = 0; step <= 48; step++) {
      const t = step / 48;
      const u = 1 - t;
      const dx = u * u * u * start.x + 3 * u * u * t * control1.x + 3 * u * t * t * control2.x;
      const dy = u * u * u * start.y + 3 * u * u * t * control1.y + 3 * u * t * t * control2.y;
      const angle = 32 * Math.sin(t * Math.PI * 2) * Math.sin(t * Math.PI);
      frames.push({ opacity: 1, transform: `translate(${dx}px,${dy}px) rotate(${angle}deg)`, offset: t });
    }
    run(orangePiece, frames, 4650, 1200, "cubic-bezier(.3,0,.2,1)");
  }

  const wordHolder = document.createElement("div");
  wordHolder.className = "keyboard-piece keyboard-word";
  const [wx, wy, ww, wh] = SLICES.word;
  Object.assign(wordHolder.style, { left: `${wx * factor}px`, top: `${wy * factor}px`, width: `${ww * factor}px`, height: `${wh * factor}px` });
  const wordArt = wordFragment(logoSrc);
  wordHolder.append(wordArt);
  assembly.append(wordHolder);
  run(wordArt, [{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }], 5850, 400);

  // The assembly rises to screen center, pauses, then travels all the way to the
  // real header logo's own resting box — so the later swap to the real <img> lands
  // on an already-identical box instead of animating a second time from a
  // separately-computed transform (which is what produced the visible jump).
  const riseDuration = 600;
  const centeredY = finalTop - assemblyTop;
  const homeX = home.left - left;
  const homeY = home.top - assemblyTop;
  const homeScale = home.width / width;
  const travelTotal = riseDuration + pause + travel;
  run(
    assembly,
    [
      { transform: "translateY(0)", offset: 0, easing: EASE },
      { transform: `translateY(${centeredY}px)`, offset: riseDuration / travelTotal },
      { transform: `translateY(${centeredY}px)`, offset: (riseDuration + pause) / travelTotal, easing },
      { transform: `translate(${homeX}px,${homeY}px) scale(${homeScale})`, offset: 1 },
    ],
    6250,
    travelTotal,
  );

  return { stage, finished: Promise.all(tasks).then(() => {}) };
}
