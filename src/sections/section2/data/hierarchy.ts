/** Hierarquia de exemplo da lição de herança e anexação. */
export interface Comp {
  id: string;
  name: string;
  parent: string | null;
}

export const COMPS: Comp[] = [
  { id: 'root', name: 'Tenancy (raiz)', parent: null },
  { id: 'ops', name: 'Operations', parent: 'root' },
  { id: 'dev', name: 'Dev', parent: 'ops' },
  { id: 'prod', name: 'Prod', parent: 'ops' },
  { id: 'hr', name: 'HR', parent: 'root' },
  { id: 'payroll', name: 'Payroll', parent: 'hr' },
];

export function comp(id: string): Comp {
  const c = COMPS.find((x) => x.id === id);
  if (!c) throw new Error(`Compartimento desconhecido: ${id}`);
  return c;
}

/** Ids do compartimento até a raiz (inclusive), começando por ele. */
function lineage(id: string): string[] {
  const out: string[] = [];
  let cur: Comp | undefined = comp(id);
  while (cur) {
    out.push(cur.id);
    cur = cur.parent ? comp(cur.parent) : undefined;
  }
  return out;
}

/** O compartimento `id` é o `ancestorId` ou está abaixo dele? */
export function isWithin(id: string, ancestorId: string): boolean {
  return lineage(id).includes(ancestorId);
}

/** Caminho, com ":", do primeiro filho do ponto de anexação até o alvo. */
export function relativePath(attachId: string, targetId: string): string {
  const chain = lineage(targetId).reverse(); // raiz ... alvo
  const from = chain.indexOf(attachId);
  const names = chain.slice(from + 1).map((id) => comp(id).name);
  return names.length === 0 ? comp(targetId).name : names.join(':');
}
