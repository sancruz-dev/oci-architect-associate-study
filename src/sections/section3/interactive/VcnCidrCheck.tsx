import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { SelectField } from '../../../components/ui/SelectField';
import { cx } from '../../../core/cx';

const CASES = [
  { value: 'ok', label: '10.0.0.0/16', ok: true, why: 'Dentro do intervalo permitido (/16 a /30) e em faixa privada RFC 1918. É o exemplo da Oracle.' },
  { value: 'big', label: '10.0.0.0/8', ok: false, why: 'Maior que /16. O tamanho de VCN permitido vai de /16 a /30. Use 10.0.0.0/16.' },
  { value: 'small', label: '10.0.0.0/31', ok: false, why: 'Menor que o /30, o limite inferior. Além disso, uma subnet precisaria de mais endereços que isso.' },
  { value: 'onprem', label: '10.0.0.0/16, e o datacenter também usa 10.0.0.0/16', ok: false, why: 'Os CIDRs de uma VCN não podem se sobrepor aos da rede on-premises conectada (nem aos de uma VCN com peering). Escolha outra faixa.' },
  { value: 'classd', label: '224.0.0.0/24', ok: false, why: 'Classe D (multicast, 224.0.0.0 a 239.255.255.255) é proibida em VCN. A classe E também.' },
  { value: 'meta', label: '169.254.0.0/16', ok: false, why: 'Reservada para iSCSI, metadados da instância e outros serviços da Oracle.' },
  { value: 'public', label: '198.51.100.0/24 (faixa publicamente roteável que é sua)', ok: true, why: 'Uma VCN aceita faixa publicamente roteável. A Oracle recomenda as faixas privadas da RFC 1918, mas não exige.' },
];

/** Este CIDR serve para uma VCN? */
export function VcnCidrCheck() {
  const [v, setV] = useState('ok');
  const c = CASES.find((x) => x.value === v) ?? CASES[0];
  return (
    <Box>
      <div className="builder">
        <SelectField label="CIDR que você quer usar na VCN" value={v} options={CASES.map(({ value, label }) => ({ value, label }))} onChange={setV} />
      </div>
      <div aria-live="polite">
        <div className="verdict-row">
          <span className={cx('verdict', c.ok ? 'verdict--ok' : 'verdict--no')}>{c.ok ? 'Pode' : 'Não pode'}</span>
        </div>
        <p className="mb0">{c.why}</p>
      </div>
    </Box>
  );
}
