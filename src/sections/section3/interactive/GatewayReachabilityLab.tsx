import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { SelectField } from '../../../components/ui/SelectField';
import { cx } from '../../../core/cx';

type Mode = 'igw' | 'nat';

const CHECKS: Record<Mode, Array<{ id: string; label: string; need: string }>> = {
  igw: [
    { id: 'pubsubnet', label: 'Instância em subnet pública', need: 'a instância precisa estar em subnet pública' },
    { id: 'pubip', label: 'Instância com IP público', need: 'a instância precisa de IP público' },
    { id: 'route', label: 'Rota 0.0.0.0/0 → Internet Gateway', need: 'falta a rota 0.0.0.0/0 para o Internet Gateway na route table da subnet' },
    { id: 'sec', label: 'Regra de segurança libera o tráfego', need: 'falta a regra de segurança (security list ou NSG) liberando esse tráfego' },
  ],
  nat: [
    { id: 'route', label: 'Rota 0.0.0.0/0 → NAT Gateway', need: 'falta a rota 0.0.0.0/0 para o NAT Gateway na route table da subnet' },
    { id: 'egress', label: 'Regra de egress libera a saída', need: 'falta uma regra de egress liberando a saída' },
    { id: 'enabled', label: 'NAT Gateway não está bloqueado', need: 'o NAT Gateway está bloqueado, e bloqueado ele derruba tudo' },
  ],
};

const DIRS: Record<Mode, Array<{ value: string; label: string }>> = {
  igw: [
    { value: 'out', label: 'A instância acessa a internet' },
    { value: 'in', label: 'Um cliente da internet acessa a instância' },
  ],
  nat: [
    { value: 'out', label: 'A instância (sem IP público) baixa um pacote da internet' },
    { value: 'in', label: 'Um cliente da internet tenta abrir conexão com a instância' },
  ],
};

/** Liga e desliga os requisitos e vê se o tráfego passa. */
export function GatewayReachabilityLab({ mode }: { mode: Mode }) {
  const [on, setOn] = useState<Record<string, boolean>>(() => Object.fromEntries(CHECKS[mode].map((c) => [c.id, true])));
  const [dir, setDir] = useState('out');
  const missing = CHECKS[mode].filter((c) => !on[c.id]);

  let ok = missing.length === 0;
  let why = ok ? 'Todos os requisitos estão atendidos. O tráfego passa.' : `Não passa: ${missing.map((m) => m.need).join('; ')}.`;
  if (mode === 'nat' && dir === 'in') {
    ok = false;
    why = 'Negado, mesmo com tudo ligado. O NAT gateway só aceita respostas a conexões que partiram de dentro. Ele não permite conexões iniciadas pela internet.';
  }

  return (
    <Box>
      <div className="checkrow">
        {CHECKS[mode].map((c) => (
          <label key={c.id}>
            <input type="checkbox" checked={on[c.id]} onChange={(e) => setOn({ ...on, [c.id]: e.target.checked })} />
            {c.label}
          </label>
        ))}
      </div>
      <div className="builder">
        <SelectField label="Quem inicia o tráfego" value={dir} options={DIRS[mode]} onChange={setDir} />
      </div>
      <div aria-live="polite">
        <div className="verdict-row">
          <span className={cx('verdict', ok ? 'verdict--ok' : 'verdict--no')}>{ok ? 'Passa' : 'Não passa'}</span>
        </div>
        <p className="mb0">{why}</p>
      </div>
    </Box>
  );
}
