import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { SelectField } from '../../../components/ui/SelectField';
import { cx } from '../../../core/cx';
import { cidr, contains, overlaps } from '../data/cidr';

const VCN = cidr('10.0.0.0/16');
const EXISTING = [cidr('10.0.1.0/24'), cidr('10.0.2.0/24')];
const CANDIDATES = ['10.0.3.0/24', '10.0.1.128/25', '10.0.0.0/22', '10.1.0.0/24', '10.0.4.0/28'];

function verdict(text: string): { ok: boolean; why: string } {
  const c = cidr(text);
  if (!contains(VCN, c)) return { ok: false, why: 'Fica fora do CIDR da VCN (10.0.0.0/16). Uma subnet tem que caber inteira dentro da VCN.' };
  const clash = EXISTING.find((e) => overlaps(e, c));
  if (clash) return { ok: false, why: 'Se sobrepõe a uma subnet que já existe. Subnets de uma mesma VCN não podem se sobrepor.' };
  return { ok: true, why: `Cabe na VCN e não toca nas subnets existentes. Usáveis no OCI: ${c.size - 3}.` };
}

/** VCN 10.0.0.0/16 com duas subnets. A nova subnet cabe? */
export function SubnetOverlapLab() {
  const [v, setV] = useState(CANDIDATES[0]);
  const r = verdict(v);
  return (
    <Box>
      <p className="row-label" style={{ marginTop: 0 }}>
        VCN 10.0.0.0/16 · subnets existentes: 10.0.1.0/24 e 10.0.2.0/24
      </p>
      <div className="builder">
        <SelectField label="Nova subnet" value={v} options={CANDIDATES} onChange={setV} />
      </div>
      <div aria-live="polite">
        <div className="verdict-row">
          <span className={cx('verdict', r.ok ? 'verdict--ok' : 'verdict--no')}>{r.ok ? 'Pode criar' : 'Não pode'}</span>
        </div>
        <p className="mb0">{r.why}</p>
      </div>
    </Box>
  );
}
