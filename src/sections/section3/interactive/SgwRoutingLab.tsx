import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { SelectField } from '../../../components/ui/SelectField';
import { cx } from '../../../core/cx';

const TABLES = [
  { value: 'osn', label: 'All <region> Services in OSN → SGW' },
  { value: 'os', label: 'OCI <region> Object Storage → SGW' },
  { value: 'osn_nat', label: 'OSN → SGW + 0.0.0.0/0 → NAT' },
  { value: 'none', label: 'Sem rotas' },
];
const TRAFFIC = [
  { value: 'objectstorage', label: 'Gravar um objeto no Object Storage' },
  { value: 'other', label: 'Chamar outro serviço Oracle do OSN (ex.: Monitoring)' },
  { value: 'internet', label: 'Baixar algo de um site de terceiros' },
];

const RESULT: Record<string, Record<string, { ok: boolean; why: string }>> = {
  osn: {
    objectstorage: { ok: true, why: 'Vai pelo service gateway. O Object Storage faz parte de “All <region> Services”.' },
    other: { ok: true, why: 'Vai pelo service gateway: o label cobre todos os serviços do Oracle Services Network.' },
    internet: { ok: false, why: 'Nenhuma rota casa. Service gateway não leva a sites de terceiros, e sem NAT o pacote é descartado.' },
  },
  os: {
    objectstorage: { ok: true, why: 'Vai pelo service gateway: o label cobre só o Object Storage, e é isso que está sendo acessado.' },
    other: { ok: false, why: 'O label “OCI <region> Object Storage” cobre só o Object Storage. Os outros serviços ficam sem rota.' },
    internet: { ok: false, why: 'Nenhuma rota casa, então o pacote é descartado.' },
  },
  osn_nat: {
    objectstorage: { ok: true, why: 'Vai pelo service gateway, sem passar pela internet. A regra do serviço é mais específica que 0.0.0.0/0.' },
    other: { ok: true, why: 'Vai pelo service gateway, pelo mesmo motivo.' },
    internet: { ok: true, why: 'Cai na rota 0.0.0.0/0 e sai pelo NAT gateway, só de saída.' },
  },
  none: {
    objectstorage: { ok: false, why: 'Sem rota para o gateway, nada sai da subnet.' },
    other: { ok: false, why: 'Sem rota para o gateway, nada sai da subnet.' },
    internet: { ok: false, why: 'Sem rota para o gateway, nada sai da subnet.' },
  },
};

/** Subnet privada, sem IP público. Que rotas fazem cada tráfego chegar? */
export function SgwRoutingLab() {
  const [t, setT] = useState('osn');
  const [tr, setTr] = useState('objectstorage');
  const r = RESULT[t][tr];
  return (
    <Box>
      <div className="builder">
        <SelectField label="Route table da subnet privada" value={t} options={TABLES} onChange={setT} />
        <SelectField label="Tráfego" value={tr} options={TRAFFIC} onChange={setTr} />
      </div>
      <div aria-live="polite">
        <div className="verdict-row">
          <span className={cx('verdict', r.ok ? 'verdict--ok' : 'verdict--no')}>{r.ok ? 'Chega' : 'Não chega'}</span>
        </div>
        <p className="mb0">{r.why}</p>
      </div>
    </Box>
  );
}
