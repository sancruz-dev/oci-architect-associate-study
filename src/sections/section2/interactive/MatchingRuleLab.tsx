import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { ChipGroup, type ChipItem } from '../../../components/ui/ChipGroup';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { cx } from '../../../core/cx';

interface Res {
  name: string;
  type: 'instance' | 'fnfunc' | 'apigateway';
  compartment: 'Prod' | 'Dev';
  tag?: string; // valor de department.operations
  label: string;
}

const RESOURCES: Res[] = [
  { name: 'vm-web-1', type: 'instance', compartment: 'Prod', tag: '45', label: 'instância · Prod · tag 45' },
  { name: 'vm-web-2', type: 'instance', compartment: 'Prod', label: 'instância · Prod · sem tag' },
  { name: 'vm-batch', type: 'instance', compartment: 'Dev', tag: '45', label: 'instância · Dev · tag 45' },
  { name: 'fn-resize', type: 'fnfunc', compartment: 'Prod', label: 'função · Prod · sem tag' },
  { name: 'gw-public', type: 'apigateway', compartment: 'Prod', label: 'API gateway · Prod · sem tag' },
];

interface Rule {
  id: string;
  chip: string;
  text: string;
  test: (r: Res) => boolean;
  note: string;
}

const isInstance = (r: Res) => r.type === 'instance';
const inProd = (r: Res) => r.compartment === 'Prod';
const tagged45 = (r: Res) => r.tag === '45';

const RULES: Rule[] = [
  {
    id: 'comp',
    chip: 'Instâncias do compartimento',
    text: "instance.compartment.id = '<OCID de Prod>'",
    test: (r) => isInstance(r) && inProd(r),
    note: 'Vale para instâncias, inclusive as criadas depois. Funções e gateways não são instâncias.',
  },
  {
    id: 'all',
    chip: 'all: compartimento E tag',
    text: "All {instance.compartment.id = '<OCID de Prod>',\n     tag.department.operations.value = '45'}",
    test: (r) => isInstance(r) && inProd(r) && tagged45(r),
    note: 'all é E: o recurso precisa cumprir as duas condições.',
  },
  {
    id: 'any',
    chip: 'any: compartimento OU tag',
    text: "Any {instance.compartment.id = '<OCID de Prod>',\n     tag.department.operations.value = '45'}",
    test: (r) => isInstance(r) && (inProd(r) || tagged45(r)),
    note: 'any é OU: basta uma. A vm-batch entra pela tag, mesmo estando em Dev.',
  },
  {
    id: 'tagkey',
    chip: 'Chave de tag, qualquer valor',
    text: 'tag.department.operations.value',
    test: (r) => r.tag !== undefined,
    note: 'Sem comparar o valor, basta o recurso ter a tag com essa chave.',
  },
  {
    id: 'fn',
    chip: 'Tipo de recurso: função',
    text: "All {resource.type = 'fnfunc',\n     resource.compartment.id = '<OCID de Prod>'}",
    test: (r) => r.type === 'fnfunc' && inProd(r),
    note: 'Para outros tipos de recurso, use resource.type e resource.compartment.id no lugar de instance.*.',
  },
  {
    id: 'gw',
    chip: 'Tipo de recurso: API gateway',
    text: "All {resource.type = 'apigateway',\n     resource.compartment.id = '<OCID de Prod>'}",
    test: (r) => r.type === 'apigateway' && inProd(r),
    note: 'O resource.type é o trecho do OCID: ocid1.apigateway... vira apigateway.',
  },
];

const CHIPS: ChipItem<string>[] = RULES.map((r) => ({ id: r.id, label: r.chip }));

/** Escolha uma regra e veja quais recursos entram no dynamic group. */
export function MatchingRuleLab() {
  const [id, setId] = useState('comp');
  const rule = RULES.find((r) => r.id === id) ?? RULES[0];
  const members = RESOURCES.filter(rule.test).length;
  return (
    <Box>
      <ChipGroup items={CHIPS} selected={id} onSelect={setId} label="Regra de associação" />
      <p className="row-label">Matching rule</p>
      <CodeBlock>{rule.text}</CodeBlock>
      <div className="rgrid" aria-live="polite">
        {RESOURCES.map((r) => {
          const hit = rule.test(r);
          return (
            <div key={r.name} className={cx('rcard', hit && 'is-in')}>
              <b>{r.name}</b>
              <small>{r.label}</small>
              <span className="rcard__flag">{hit ? 'Membro' : 'Fora'}</span>
            </div>
          );
        })}
      </div>
      <p className="muted mb0" style={{ marginTop: 12, fontSize: 14 }}>
        {members} de {RESOURCES.length} recursos entram. {rule.note}
      </p>
    </Box>
  );
}
