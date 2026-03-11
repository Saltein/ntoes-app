export function invertColorWithBrightness(
    hex: string,
    targetBrightness: number, // 0..1
): string {
    const cleanHex = hex.replace("#", "");

    if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
        throw new Error("Invalid HEX color format. Use #RRGGBB");
    }

    const clamp = (v: number, min = 0, max = 1) =>
        Math.min(max, Math.max(min, v));

    targetBrightness = clamp(targetBrightness);

    // ---------- HEX -> RGB ----------
    let r = parseInt(cleanHex.slice(0, 2), 16) / 255;
    let g = parseInt(cleanHex.slice(2, 4), 16) / 255;
    let b = parseInt(cleanHex.slice(4, 6), 16) / 255;

    // ---------- RGB -> HSL ----------
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    // ---------- Инвертируем Hue ----------
    h = (h + 0.5) % 1; // +180 градусов

    // ---------- Применяем новую яркость ----------
    l = targetBrightness;

    // ---------- HSL -> RGB ----------
    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    let r2: number, g2: number, b2: number;

    if (s === 0) {
        r2 = g2 = b2 = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r2 = hue2rgb(p, q, h + 1 / 3);
        g2 = hue2rgb(p, q, h);
        b2 = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (v: number) =>
        Math.round(v * 255)
            .toString(16)
            .padStart(2, "0")
            .toUpperCase();

    return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`;
}
