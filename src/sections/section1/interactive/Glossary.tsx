import { useState } from 'react';
import { ChipGroup, type ChipItem } from '../../../components/ui/ChipGroup';
import { Panel } from '../../../components/ui/Panel';
import { GLOSSARY, type GlossaryGroup } from '../data/glossary';

function itemsFor(group: GlossaryGroup): ChipItem<string>[] {
  return GLOSSARY.filter((g) => g.group === group).map((g) => ({
    id: g.id,
    label: g.term,
    tone: group === 'identity' ? 'blue' : 'red',
  }));
}

const IDENTITY = itemsFor('identity');
const ACCESS = itemsFor('access');

/** Glossário clicável: dois grupos de termos e um painel com a definição. */
export function Glossary() {
  const [selectedId, setSelectedId] = useState<string>(GLOSSARY[0].id);
  const term = GLOSSARY.find((g) => g.id === selectedId) ?? GLOSSARY[0];

  return (
    <>
      <div className="row-label">Identidade</div>
      <ChipGroup items={IDENTITY} selected={selectedId} onSelect={setSelectedId} label="Termos de identidade" />
      <div className="row-label">Autorização e organização</div>
      <ChipGroup items={ACCESS} selected={selectedId} onSelect={setSelectedId} label="Termos de autorização e organização" />
      <Panel>
        <h4>{term.term}</h4>
        <p>{term.definition}</p>
        {term.tip && <p className="tip">{term.tip}</p>}
      </Panel>
    </>
  );
}
