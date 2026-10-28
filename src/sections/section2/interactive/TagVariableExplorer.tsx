import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { ChipGroup, type ChipItem } from '../../../components/ui/ChipGroup';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { Panel } from '../../../components/ui/Panel';
import { TAG_VARIABLES } from '../data/tags';

const CHIPS: ChipItem<string>[] = TAG_VARIABLES.map((v) => ({ id: v.id, label: v.chip }));

/** As variáveis de tag, uma por vez, com o statement e a leitura em português. */
export function TagVariableExplorer() {
  const [id, setId] = useState(TAG_VARIABLES[0].id);
  const v = TAG_VARIABLES.find((x) => x.id === id) ?? TAG_VARIABLES[0];
  return (
    <Box>
      <ChipGroup items={CHIPS} selected={id} onSelect={setId} label="Onde está a tag" />
      <Panel>
        <dl className="kv">
          <dt>Variável</dt>
          <dd>
            <code>{v.variable}</code>
          </dd>
          <dt>Leva a tag</dt>
          <dd>{v.carries}</dd>
        </dl>
        <CodeBlock>{v.statement}</CodeBlock>
        <p className="mb0">{v.reading}</p>
      </Panel>
    </Box>
  );
}
