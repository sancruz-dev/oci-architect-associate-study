import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { cx } from '../../../core/cx';

const CONDITIONS = [
  { id: 'net', code: "request.networkSource.name='corpnet'", label: 'A requisição vem da rede corporativa' },
  { id: 'mfa', code: "request.user.mfaTotpVerified='true'", label: 'O usuário entrou com MFA' },
  { id: 'prazo', code: "request.utc-timestamp before '2027-01-01T00:00Z'", label: 'Ainda estamos antes do prazo' },
] as const;

type Id = (typeof CONDITIONS)[number]['id'];

/** Marque quais condições são verdadeiras e compare any {} com all {}. */
export function AnyAllLab() {
  const [on, setOn] = useState<Record<Id, boolean>>({ net: true, mfa: false, prazo: true });
  const values = CONDITIONS.map((c) => on[c.id]);
  const anyOk = values.some(Boolean);
  const allOk = values.every(Boolean);
  const body = CONDITIONS.map((c) => `    ${c.code}`).join(',\n');

  return (
    <Box>
      <p className="row-label" style={{ marginTop: 0 }}>
        Marque o que é verdade nesta requisição
      </p>
      <div className="checkrow">
        {CONDITIONS.map((c) => (
          <label key={c.id}>
            <input type="checkbox" checked={on[c.id]} onChange={() => setOn({ ...on, [c.id]: !on[c.id] })} />
            {c.label}
          </label>
        ))}
      </div>

      <div className="ba" aria-live="polite">
        <div>
          <h5>all {'{ }'} (E): todas precisam ser verdade</h5>
          <CodeBlock>{`where all {\n${body}\n  }`}</CodeBlock>
          <span className={cx('verdict', allOk ? 'verdict--ok' : 'verdict--no')}>{allOk ? 'Permitido' : 'Negado'}</span>
        </div>
        <div>
          <h5>any {'{ }'} (OU): basta uma ser verdade</h5>
          <CodeBlock>{`where any {\n${body}\n  }`}</CodeBlock>
          <span className={cx('verdict', anyOk ? 'verdict--ok' : 'verdict--no')}>{anyOk ? 'Permitido' : 'Negado'}</span>
        </div>
      </div>
      <p className="muted mb0" style={{ fontSize: 14 }}>
        Para segurança, o normal é <code>all</code>. Use <code>any</code> quando houver caminhos alternativos válidos, como
        vários valores aceitos para a mesma variável.
      </p>
    </Box>
  );
}
