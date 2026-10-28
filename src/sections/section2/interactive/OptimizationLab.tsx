import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { ChipGroup, type ChipItem } from '../../../components/ui/ChipGroup';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { Panel } from '../../../components/ui/Panel';
import { TECHNIQUES } from '../data/optimization';

const CHIPS: ChipItem<string>[] = TECHNIQUES.map((t) => ({ id: t.id, label: t.chip }));

function countStatements(text: string): number {
  return text.split('\n').filter((l) => /^(Allow|allow)\b/.test(l)).length;
}

/** Cada técnica com o antes e o depois dos statements. */
export function OptimizationLab() {
  const [id, setId] = useState(TECHNIQUES[0].id);
  const t = TECHNIQUES.find((x) => x.id === id) ?? TECHNIQUES[0];
  const before = countStatements(t.before);
  const after = countStatements(t.after);
  return (
    <Box>
      <ChipGroup items={CHIPS} selected={id} onSelect={setId} label="Técnica de otimização" />
      <Panel>
        <h4>{t.title}</h4>
        <div className="ba">
          <div>
            <h5>Antes · {before} statements</h5>
            <CodeBlock>{t.before}</CodeBlock>
          </div>
          <div>
            <h5>Depois · {after} {after === 1 ? 'statement' : 'statements'}</h5>
            <CodeBlock>{t.after}</CodeBlock>
          </div>
        </div>
        <p>{t.why}</p>
        <p className="tip mb0">Atenção: {t.watch}</p>
      </Panel>
    </Box>
  );
}
