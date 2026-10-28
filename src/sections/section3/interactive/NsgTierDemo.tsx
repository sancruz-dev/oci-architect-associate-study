import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { SelectField } from '../../../components/ui/SelectField';
import { cx } from '../../../core/cx';

interface Rule {
  target: string;
  port: string;
  from: string; // internet | web | app | db
  text: string;
}

const RULES: Rule[] = [
  { target: 'web', port: '443', from: 'internet', text: 'web-nsg: ingress TCP 443 de 0.0.0.0/0' },
  { target: 'app', port: '8080', from: 'web', text: 'app-nsg: ingress TCP 8080 de web-nsg' },
  { target: 'db', port: '1521', from: 'app', text: 'db-nsg: ingress TCP 1521 de app-nsg' },
];

const ORIGINS = [
  { value: 'internet', label: 'Cliente na internet' },
  { value: 'web', label: 'Instância do web-nsg' },
  { value: 'app', label: 'Instância do app-nsg' },
  { value: 'other', label: 'Instância sem NSG (mesma subnet)' },
];
const TARGETS = [
  { value: 'web', label: 'Instância do web-nsg' },
  { value: 'app', label: 'Instância do app-nsg' },
  { value: 'db', label: 'Instância do db-nsg' },
];
const PORTS = ['443', '8080', '1521', '22'];

/** Três NSGs que referenciam uns aos outros. O tráfego chega? */
export function NsgTierDemo() {
  const [from, setFrom] = useState('internet');
  const [target, setTarget] = useState('web');
  const [port, setPort] = useState('443');
  const rule = RULES.find((r) => r.target === target && r.port === port && r.from === from);
  return (
    <Box>
      <CodeBlock>{RULES.map((r) => r.text).join('\n')}</CodeBlock>
      <div className="builder">
        <SelectField label="Origem" value={from} options={ORIGINS} onChange={setFrom} />
        <SelectField label="Destino" value={target} options={TARGETS} onChange={setTarget} />
        <SelectField label="Porta TCP" value={port} options={PORTS} onChange={setPort} />
      </div>
      <div aria-live="polite">
        <div className="verdict-row">
          <span className={cx('verdict', rule ? 'verdict--ok' : 'verdict--no')}>{rule ? 'Permitido' : 'Negado'}</span>
        </div>
        <p className="mb0">
          {rule
            ? `Casou com a regra “${rule.text}”. A resposta volta sozinha, porque a regra é stateful.`
            : 'Nenhuma regra libera essa combinação. Sem regra que permita, o tráfego é negado.'}
        </p>
      </div>
    </Box>
  );
}
