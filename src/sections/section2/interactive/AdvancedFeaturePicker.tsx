import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { ChipGroup, type ChipItem } from '../../../components/ui/ChipGroup';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { Panel } from '../../../components/ui/Panel';
import { ADVANCED_FEATURES } from '../data/advanced';

const CHIPS: ChipItem<string>[] = ADVANCED_FEATURES.map((f) => ({ id: f.id, label: f.chip }));

export function AdvancedFeaturePicker() {
  const [id, setId] = useState(ADVANCED_FEATURES[0].id);
  const f = ADVANCED_FEATURES.find((x) => x.id === id) ?? ADVANCED_FEATURES[0];
  return (
    <Box>
      <ChipGroup items={CHIPS} selected={id} onSelect={setId} label="Recurso avançado" />
      <Panel>
        <CodeBlock>{f.statement}</CodeBlock>
        <p>{f.meaning}</p>
        <p className="tip mb0">Atenção: {f.watch}</p>
      </Panel>
    </Box>
  );
}
