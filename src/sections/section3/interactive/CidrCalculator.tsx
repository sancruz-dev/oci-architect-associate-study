import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { ChipGroup, type ChipItem } from '../../../components/ui/ChipGroup';
import { fmtIp, maskOf, ociUsable, parseCidr } from '../data/cidr';

const EXAMPLES = ['10.0.0.0/16', '10.0.1.0/24', '10.0.2.0/28', '10.0.3.0/30', '192.168.5.77/26'];
const CHIPS: ChipItem<string>[] = EXAMPLES.map((e) => ({ id: e, label: e }));

/** Digite um CIDR e veja máscara, faixa e quantos endereços sobram no OCI. */
export function CidrCalculator() {
  const [text, setText] = useState('10.0.1.0/24');
  const c = parseCidr(text);
  return (
    <Box>
      <ChipGroup items={CHIPS} selected={text} onSelect={setText} label="Exemplos de CIDR" />
      <div className="builder">
        <div className="field">
          <label htmlFor="cidr-in">Bloco CIDR</label>
          <input id="cidr-in" value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} inputMode="text" />
        </div>
      </div>
      <div aria-live="polite">
        {!c ? (
          <p className="mb0">Digite no formato <code>10.0.1.0/24</code>: quatro números de 0 a 255, barra e prefixo de 0 a 32.</p>
        ) : (
          <>
            <dl className="kv">
              <dt>Máscara</dt>
              <dd className="mono">{maskOf(c.prefix)}</dd>
              <dt>Bits</dt>
              <dd>
                {c.prefix} de rede · {32 - c.prefix} de host
              </dd>
              <dt>Faixa</dt>
              <dd className="mono">
                {fmtIp(c.first)} a {fmtIp(c.last)}
              </dd>
              <dt>Endereços</dt>
              <dd>
                {c.size.toLocaleString('pt-BR')} no bloco (2^{32 - c.prefix})
              </dd>
              <dt>Usáveis no OCI</dt>
              <dd>
                {ociUsable(c).toLocaleString('pt-BR')} em uma subnet (3 reservados: {fmtIp(c.first)}, {fmtIp(c.first + 1)} e{' '}
                {fmtIp(c.last)})
              </dd>
            </dl>
            {c.normalized && (
              <p className="tip mb0">
                O endereço digitado não é o início do bloco. O bloco real começa em {fmtIp(c.network)}/{c.prefix}.
              </p>
            )}
          </>
        )}
      </div>
    </Box>
  );
}
