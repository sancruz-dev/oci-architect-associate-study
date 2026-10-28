import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { CodeBlock, Kw } from '../../../components/ui/CodeBlock';
import { cx } from '../../../core/cx';
import { COMPARTMENT_TREE, findNode, flatten, type CompartmentNode } from '../data/compartments';

interface TreeNodeProps {
  node: CompartmentNode;
  selectedId: string;
  coveredIds: Set<string>;
  onSelect: (id: string) => void;
}

function TreeNode({ node, selectedId, coveredIds, onSelect }: TreeNodeProps) {
  return (
    <li>
      <button
        type="button"
        className={cx('node', node.id === selectedId ? 'sel' : coveredIds.has(node.id) && 'covered')}
        aria-pressed={node.id === selectedId}
        onClick={() => onSelect(node.id)}
      >
        {node.label}
      </button>
      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} selectedId={selectedId} coveredIds={coveredIds} onSelect={onSelect} />
          ))}
        </ul>
      )}
    </li>
  );
}

/** Escolha onde a policy concede acesso e veja até onde ele chega por herança. */
export function CompartmentTree() {
  const [selectedId, setSelectedId] = useState('prod');
  const selected = findNode(COMPARTMENT_TREE, selectedId) ?? COMPARTMENT_TREE;

  const covered = flatten(selected);
  const coveredIds = new Set(covered.map((n) => n.id));
  const outside = flatten(COMPARTMENT_TREE).filter((n) => n.id !== 'root' && !coveredIds.has(n.id));

  return (
    <Box className="split">
      <div>
        <ul className="tree">
          <TreeNode node={COMPARTMENT_TREE} selectedId={selectedId} coveredIds={coveredIds} onSelect={setSelectedId} />
        </ul>
      </div>
      <div aria-live="polite">
        <CodeBlock>
          <Kw>Allow</Kw> group DevOps <Kw>to</Kw> manage instance-family <Kw>in</Kw> {selected.location}
        </CodeBlock>
        <p className="mb0">
          Cobre: <b>{covered.map((n) => n.label).join(', ')}</b>.{' '}
          {selected.id === 'root' ? (
            'É o tenancy inteiro, então todos os compartimentos estão incluídos.'
          ) : (
            <>
              Fica de fora: <b>{outside.length ? outside.map((n) => n.label).join(', ') : 'nada'}</b>. Também não cobre o
              compartimento pai nem o tenancy.
            </>
          )}
        </p>
      </div>
    </Box>
  );
}
