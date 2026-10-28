/**
 * Acesso seguro ao localStorage.
 * Em janela privada, com dados bloqueados ou cota cheia, o navegador lança erro.
 * Estas funções nunca lançam: a leitura devolve o valor padrão e a escrita devolve false.
 */

export const STORAGE_PREFIX = 'oci-study:v1';

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeKey(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* sem armazenamento disponível: nada a remover */
  }
}
