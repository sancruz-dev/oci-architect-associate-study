import type { SectionDef } from '../core/types';
import { section1 } from './section1';
import { section2 } from './section2';
import { section3 } from './section3';

/**
 * Lista de seções do curso, na ordem em que aparecem no menu e na página inicial.
 * Para criar uma seção nova: escreva src/sections/<nome>/index.ts com um SectionDef
 * e acrescente aqui. Nenhuma página nem rota precisa mudar.
 */
export const sections: SectionDef[] = [section1, section2, section3];

export function findSection(id: string | undefined): SectionDef | undefined {
  return sections.find((s) => s.id === id);
}
