function hexToRgb(hex: string): [number, number, number] | null {
  const value = hex.replace('#', '').trim();
  const full =
    value.length === 3
      ? value
          .split('')
          .map((char) => char + char)
          .join('')
      : value;
  if (full.length !== 6 || /[^0-9a-f]/i.test(full)) return null;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const channel = (value: number) =>
    Math.round(Math.min(Math.max(value, 0), 255))
      .toString(16)
      .padStart(2, '0');
  return `#${channel(r)}${channel(g)}${channel(b)}`;
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) {
    const grey = l * 255;
    return [grey, grey, grey];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const channel = (t: number) => {
    let temp = t;
    if (temp < 0) temp += 1;
    if (temp > 1) temp -= 1;
    if (temp < 1 / 6) return p + (q - p) * 6 * temp;
    if (temp < 1 / 2) return q;
    if (temp < 2 / 3) return p + (q - p) * (2 / 3 - temp) * 6;
    return p;
  };
  return [channel(h + 1 / 3) * 255, channel(h) * 255, channel(h - 1 / 3) * 255];
}

/**
 * Brand accents are picked for light surfaces, so dark ones (a deep emerald, for
 * example) disappear as text on the near-black UI. This lifts lightness while
 * keeping hue, so each case keeps its own colour and still stays readable.
 */
export function onDarkAccent(hex: string, minLightness = 0.46): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const [r, g, b] = rgb.map((channel) => channel / 255) as [number, number, number];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;

  if (lightness >= minLightness) return hex;

  const delta = max - min;
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  let hue = 0;
  if (delta !== 0) {
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
    hue /= 6;
    if (hue < 0) hue += 1;
  }

  const [lr, lg, lb] = hslToRgb(hue, Math.max(saturation, 0.4), minLightness);
  return rgbToHex(lr, lg, lb);
}
