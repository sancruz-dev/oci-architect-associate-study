import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { SelectField } from '../../../components/ui/SelectField';
import { cx } from '../../../core/cx';

/** Ingress TCP 80 de 0.0.0.0/0. A resposta volta? Depende de ser stateful ou stateless. */
export function SecurityRuleSimulator() {
  const [mode, setMode] = useState('stateful');
  const [egress, setEgress] = useState(false);
  const stateless = mode === 'stateless';
  const responseOk = !stateless || egress;
  return (
    <Box>
      <CodeBlock>{`Ingress · ${stateless ? 'stateless' : 'stateful'} · TCP · origem 0.0.0.0/0 · destino porta 80`}</CodeBlock>
      <div className="builder">
        <SelectField
          label="Tipo da regra"
          value={mode}
          options={[
            { value: 'stateful', label: 'Stateful (padrão)' },
            { value: 'stateless', label: 'Stateless' },
          ]}
          onChange={setMode}
        />
      </div>
      {stateless && (
        <div className="checkrow">
          <label>
            <input type="checkbox" checked={egress} onChange={(e) => setEgress(e.target.checked)} />
            Existe uma regra de egress stateless liberando a resposta
          </label>
        </div>
      )}
      <div aria-live="polite">
        <div className="verdict-row">
          <span className="verdict verdict--ok">Requisição: entra</span>
          <span className={cx('verdict', responseOk ? 'verdict--ok' : 'verdict--no')}>Resposta: {responseOk ? 'sai' : 'bloqueada'}</span>
        </div>
        <p className="mb0">
          {!stateless
            ? 'Com connection tracking, o OCI lembra da conexão e libera a resposta sem precisar de regra de egress.'
            : responseOk
              ? 'Sem rastreamento de conexão, a resposta só sai porque há uma regra de egress stateless para ela.'
              : 'Sem rastreamento de conexão, a resposta não é liberada sozinha. É preciso uma regra stateless no sentido oposto.'}
        </p>
      </div>
    </Box>
  );
}
