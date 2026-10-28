import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { SelectField } from '../../../components/ui/SelectField';
import { cx } from '../../../core/cx';
import { cidr, contains, parseCidr, parseIp } from '../data/cidr';

interface Rule {
  dest: string; // CIDR ou 'OSN'
  target: string;
}

const TABLES: Record<string, { label: string; rules: Rule[] }> = {
  default: { label: 'Padrão (sem regras)', rules: [] },
  public: { label: 'Subnet pública', rules: [{ dest: '0.0.0.0/0', target: 'Internet Gateway' }] },
  private: {
    label: 'Subnet privada',
    rules: [
      { dest: '0.0.0.0/0', target: 'NAT Gateway' },
      { dest: 'OSN', target: 'Service Gateway' },
    ],
  },
  hybrid: {
    label: 'Privada com on-premises',
    rules: [
      { dest: '0.0.0.0/0', target: 'NAT Gateway' },
      { dest: '192.168.0.0/16', target: 'DRG' },
      { dest: 'OSN', target: 'Service Gateway' },
    ],
  },
};

const DESTS = [
  { value: 'vcn', label: '10.0.2.15 (outra subnet da mesma VCN)', ip: '10.0.2.15', osn: false },
  { value: 'onprem', label: '192.168.10.5 (rede on-premises)', ip: '192.168.10.5', osn: false },
  { value: 'web', label: '203.0.113.10 (site qualquer na internet)', ip: '203.0.113.10', osn: false },
  { value: 'osn', label: 'Object Storage da região (serviço Oracle)', ip: '134.70.0.10', osn: true },
];

const VCN = cidr('10.0.0.0/16');

/** Escolha a route table e o destino. O OCI usa a regra mais específica. */
export function RouteLab() {
  const [t, setT] = useState('private');
  const [d, setD] = useState('osn');
  const table = TABLES[t];
  const dest = DESTS.find((x) => x.value === d) ?? DESTS[0];
  const ip = parseIp(dest.ip) ?? 0;

  const matches = table.rules
    .map((r) => {
      if (r.dest === 'OSN') return dest.osn ? { r, spec: 25, label: 'faixas do serviço (service CIDR label)' } : null;
      const c = parseCidr(r.dest);
      return c && ip >= c.first && ip <= c.last ? { r, spec: c.prefix, label: `/${c.prefix}` } : null;
    })
    .filter((m): m is { r: Rule; spec: number; label: string } => m !== null)
    .sort((a, b) => b.spec - a.spec);

  const local = contains(VCN, cidr(`${dest.ip}/32`));
  const best = local ? { target: 'Local (implícita)', why: 'O destino está dentro da VCN. A rota local é implícita e não aparece na route table.' } : matches[0] ? { target: matches[0].r.target, why: matches.length > 1 ? 'Várias regras casam. Vale a mais específica (longest prefix match).' : 'Única regra que casa com o destino.' } : null;

  return (
    <Box>
      <div className="builder">
        <SelectField label="Route table da subnet" value={t} options={Object.entries(TABLES).map(([value, v]) => ({ value, label: v.label }))} onChange={setT} />
        <SelectField label="Destino do pacote" value={d} options={DESTS.map(({ value, label }) => ({ value, label }))} onChange={setD} />
      </div>
      <table className="tbl">
        <thead>
          <tr>
            <th>Destino</th>
            <th>Alvo</th>
          </tr>
        </thead>
        <tbody>
          {table.rules.length === 0 && (
            <tr>
              <td colSpan={2}>Nenhuma regra explícita</td>
            </tr>
          )}
          {table.rules.map((r) => (
            <tr key={r.dest}>
              <td className="mono">{r.dest === 'OSN' ? 'All <region> Services in OSN' : r.dest}</td>
              <td>{r.target}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div aria-live="polite">
        <div className="verdict-row">
          <span className={cx('verdict', best ? 'verdict--ok' : 'verdict--no')}>{best ? best.target : 'Descartado (blackhole)'}</span>
        </div>
        <p className="mb0">{best ? best.why : 'Nenhuma regra casa com o destino. O tráfego que tenta sair da VCN é descartado, sem aviso.'}</p>
      </div>
    </Box>
  );
}
