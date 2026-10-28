/** Aritmética de IPv4 e CIDR usada pelos interativos da Seção 3. */

export interface Cidr {
  network: number;
  prefix: number;
  /** Quantidade total de endereços do bloco. */
  size: number;
  first: number;
  last: number;
}

export function parseIp(text: string): number | null {
  const parts = text.trim().split('.');
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null;
    const v = Number(p);
    if (v > 255) return null;
    n = n * 256 + v;
  }
  return n;
}

export function fmtIp(n: number): string {
  return [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
}

export function parseCidr(text: string): (Cidr & { normalized: boolean }) | null {
  const m = text.trim().match(/^([\d.]+)\/(\d{1,2})$/);
  if (!m) return null;
  const ip = parseIp(m[1]);
  const prefix = Number(m[2]);
  if (ip === null || prefix > 32) return null;
  const size = 2 ** (32 - prefix);
  const network = Math.floor(ip / size) * size;
  return { network, prefix, size, first: network, last: network + size - 1, normalized: network !== ip };
}

export function fmtCidr(c: Cidr): string {
  return `${fmtIp(c.network)}/${c.prefix}`;
}

export function maskOf(prefix: number): string {
  const size = 2 ** (32 - prefix);
  return fmtIp((2 ** 32 - size) >>> 0);
}

export function overlaps(a: Cidr, b: Cidr): boolean {
  return a.first <= b.last && b.first <= a.last;
}

export function contains(outer: Cidr, inner: Cidr): boolean {
  return outer.first <= inner.first && inner.last <= outer.last;
}

/** No OCI, cada subnet reserva 3 endereços: rede, gateway padrão (primeiro host) e broadcast. */
export function ociUsable(c: Cidr): number {
  return Math.max(0, c.size - 3);
}

export function cidr(text: string): Cidr {
  const c = parseCidr(text);
  if (!c) throw new Error(`CIDR inválido: ${text}`);
  return c;
}
