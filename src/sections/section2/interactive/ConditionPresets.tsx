import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { ChipGroup, type ChipItem } from '../../../components/ui/ChipGroup';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { Panel } from '../../../components/ui/Panel';
import { CONDITION_PRESETS } from '../data/conditions';

const CHIPS: ChipItem<string>[] = CONDITION_PRESETS.map((p) => ({ id: p.id, label: p.chip }));

/** Casos de uso mais comuns de condição, um por vez. */
export function ConditionPresets() {
  const [id, setId] = useState(CONDITION_PRESETS[0].id);
  const p = CONDITION_PRESETS.find((x) => x.id === id) ?? CONDITION_PRESETS[0];
  return (
    <Box>
      <ChipGroup items={CHIPS} selected={id} onSelect={setId} label="Exemplo de condição" />
      <Panel>
        <CodeBlock>{p.statement}</CodeBlock>
        <p>{p.meaning}</p>
        <p className="tip mb0">Atenção: {p.watch}</p>
      </Panel>
    </Box>
  );
}
