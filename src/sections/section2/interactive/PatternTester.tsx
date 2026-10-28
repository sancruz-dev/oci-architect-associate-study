import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { ChipGroup, type ChipItem } from '../../../components/ui/ChipGroup';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { cx } from '../../../core/cx';

const BUCKETS = ['ProjectA_logs', 'ProjectA_data', 'ProjectB_logs', 'billing_prod', 'app_dev_tmp'];

const PATTERNS = [
  { id: 'prefix', pattern: 'ProjectA_*', note: 'Prefixo: tudo que começa com ProjectA_.' },
  { id: 'suffix', pattern: '*_logs', note: 'Sufixo: tudo que termina em _logs.' },
  { id: 'contains', pattern: '*dev*', note: 'Trecho: qualquer nome que contenha dev.' },
] as const;

type PatternId = (typeof PATTERNS)[number]['id'];

const CHIPS: ChipItem<PatternId>[] = PATTERNS.map((p) => ({ id: p.id, label: `/${p.pattern}/` }));

/** O * vira “qualquer sequência de caracteres”. A comparação não diferencia maiúsculas. */
function matches(pattern: string, value: string): boolean {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  return new RegExp(`^${escaped}$`, 'i').test(value);
}

/** Teste padrões com * contra nomes de buckets. */
export function PatternTester() {
  const [id, setId] = useState<PatternId>('prefix');
  const p = PATTERNS.find((x) => x.id === id) ?? PATTERNS[0];
  return (
    <Box>
      <ChipGroup items={CHIPS} selected={id} onSelect={setId} label="Padrão" />
      <CodeBlock>{`Allow group BucketUsers to use buckets in tenancy\n  where target.bucket.name=/${p.pattern}/`}</CodeBlock>
      <div className="rgrid" aria-live="polite">
        {BUCKETS.map((b) => {
          const hit = matches(p.pattern, b);
          return (
            <div key={b} className={cx('rcard', hit && 'is-in')}>
              <b>{b}</b>
              <span className="rcard__flag">{hit ? 'Casa com o padrão' : 'Não casa'}</span>
            </div>
          );
        })}
      </div>
      <p className="muted mb0" style={{ marginTop: 12, fontSize: 14 }}>
        {p.note} Padrões em nomes funcionam como política de acesso: dar nome ao bucket ou ao compartimento passa a
        decidir quem enxerga o quê.
      </p>
    </Box>
  );
}
