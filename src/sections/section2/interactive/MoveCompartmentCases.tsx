import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { ChipGroup, type ChipItem } from '../../../components/ui/ChipGroup';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { Panel } from '../../../components/ui/Panel';

interface MoveCase {
  id: string;
  chip: string;
  move: string;
  before: string;
  after: string;
  verdict: string;
  why: string;
  ok: boolean;
}

const CASES: MoveCase[] = [
  {
    id: 'ops',
    chip: 'Policy anexada em Operations',
    move: 'A sai de Operations:Test e vai para Operations:Dev',
    before: 'Allow group G1 to manage instance-family in compartment Test:A',
    after: 'Allow group G1 to manage instance-family in compartment Dev:A',
    verdict: 'Atualizada sozinha',
    why: 'Operations é ancestral comum do pai antigo (Test) e do novo (Dev). O IAM reescreve o caminho.',
    ok: true,
  },
  {
    id: 'tenancy',
    chip: 'Policy anexada no tenancy',
    move: 'A sai de Operations:Test e vai para HR:Prod',
    before: 'Allow group G1 to manage instance-family in compartment Operations:Test:A',
    after: 'Allow group G1 to manage instance-family in compartment HR:Prod:A',
    verdict: 'Atualizada sozinha',
    why: 'O tenancy é ancestral de qualquer compartimento, então também cobre o caso.',
    ok: true,
  },
  {
    id: 'test',
    chip: 'Policy anexada em Test',
    move: 'A sai de Test e vai para Dev',
    before: 'Allow group G1 to manage instance-family in compartment A',
    after: '(a policy deixa de fazer sentido: A não está mais dentro de Test)',
    verdict: 'Fica inválida',
    why: 'Test não é ancestral do novo pai (Dev). É preciso remover a policy e criar outra. Até lá, G1 perde o acesso.',
    ok: false,
  },
];

const CHIPS: ChipItem<string>[] = CASES.map((c) => ({ id: c.id, label: c.chip, tone: c.ok ? 'blue' : 'red' }));

/** Três casos de mover um compartimento e o que acontece com a policy que o cita. */
export function MoveCompartmentCases() {
  const [id, setId] = useState('ops');
  const c = CASES.find((x) => x.id === id) ?? CASES[0];

  return (
    <Box>
      <ChipGroup items={CHIPS} selected={id} onSelect={setId} label="Onde a policy está anexada" />
      <Panel>
        <h4>{c.move}</h4>
        <div className="ba">
          <div>
            <h5>Antes</h5>
            <CodeBlock>{c.before}</CodeBlock>
          </div>
          <div>
            <h5>Depois</h5>
            <CodeBlock>{c.after}</CodeBlock>
          </div>
        </div>
        <div className="verdict-row">
          <span className={c.ok ? 'verdict verdict--ok' : 'verdict verdict--no'}>{c.verdict}</span>
        </div>
        <p className="mb0">{c.why}</p>
      </Panel>
    </Box>
  );
}
