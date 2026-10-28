export interface CompartmentNode {
  id: string;
  label: string;
  /** Texto usado na policy depois de "in". */
  location: string;
  children: CompartmentNode[];
}

export const COMPARTMENT_TREE: CompartmentNode = {
  id: 'root',
  label: 'Tenancy (raiz)',
  location: 'tenancy',
  children: [
    {
      id: 'prod',
      label: 'Prod',
      location: 'compartment Prod',
      children: [
        { id: 'app', label: 'App', location: 'compartment App', children: [] },
        { id: 'banco', label: 'Banco', location: 'compartment Banco', children: [] },
      ],
    },
    {
      id: 'dev',
      label: 'Dev',
      location: 'compartment Dev',
      children: [{ id: 'teste', label: 'Teste', location: 'compartment Teste', children: [] }],
    },
  ],
};

export function findNode(node: CompartmentNode, id: string): CompartmentNode | undefined {
  if (node.id === id) return node;
  for (const child of node.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return undefined;
}

/** O nó e todos os descendentes. */
export function flatten(node: CompartmentNode): CompartmentNode[] {
  return [node, ...node.children.flatMap(flatten)];
}
