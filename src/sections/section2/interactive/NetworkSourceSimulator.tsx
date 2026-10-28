import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { SelectField } from '../../../components/ui/SelectField';
import { cx } from '../../../core/cx';

const ORIGINS = [
  {
    value: 'office',
    label: 'Escritório (IP público 203.0.113.25)',
    ok: true,
    why: 'O IP está no intervalo público cadastrado em corpnet.',
  },
  {
    value: 'home',
    label: 'Casa (IP público 198.51.100.7)',
    ok: false,
    why: 'O IP não está em corpnet. A condição é falsa e a requisição é negada, mesmo com usuário e senha corretos.',
  },
  {
    value: 'vcn',
    label: 'Instância na VCN vcn-prod (IP privado 10.0.1.8)',
    ok: true,
    why: 'corpnet inclui a VCN vcn-prod com o intervalo de IPs privados 10.0.0.0/16.',
  },
  {
    value: 'other',
    label: 'Instância em outra VCN (IP privado 10.1.0.4)',
    ok: false,
    why: 'Essa VCN e esse intervalo não estão em corpnet.',
  },
];

/** Network source corpnet com um intervalo público e uma VCN. De onde vem a requisição? */
export function NetworkSourceSimulator() {
  const [origin, setOrigin] = useState('office');
  const o = ORIGINS.find((x) => x.value === origin) ?? ORIGINS[0];
  return (
    <Box>
      <p className="row-label" style={{ marginTop: 0 }}>
        Network source corpnet: IP público 203.0.113.0/24 + VCN vcn-prod (10.0.0.0/16)
      </p>
      <CodeBlock>{`Allow group GroupA to manage object-family in tenancy\n  where request.networkSource.name='corpnet'`}</CodeBlock>
      <div className="builder">
        <SelectField label="De onde vem a requisição" value={origin} options={ORIGINS} onChange={setOrigin} />
      </div>
      <div aria-live="polite">
        <div className="verdict-row">
          <span className={cx('verdict', o.ok ? 'verdict--ok' : 'verdict--no')}>{o.ok ? 'Permitido' : 'Negado'}</span>
        </div>
        <p className="mb0">{o.why}</p>
      </div>
    </Box>
  );
}
