import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { ChipGroup } from '../../../components/ui/ChipGroup';
import { cx } from '../../../core/cx';
import { LIMITS, TYPE_NAMES } from '../data/domainTypes';

const CHIPS = LIMITS.map((m, i) => ({ id: i, label: m.name }));

const format = (n: number) => (n === 0 ? '—' : n.toLocaleString('pt-BR'));

/** Barras em escala logarítmica, para comparar limites que variam de 2 a 100 milhões. */
export function LimitBars() {
  const [index, setIndex] = useState(0);
  const metric = LIMITS[index];
  const max = Math.max(...metric.values);
  const logMax = Math.log10(max) || 1;

  return (
    <>
      <ChipGroup items={CHIPS} selected={index} onSelect={setIndex} label="Objeto" />
      <Box>
        <div className="bars">
          {metric.values.map((v, i) => {
            const width = v <= 0 ? 0 : max === 1 ? 100 : Math.max(3, (Math.log10(v) / logMax) * 100);
            return (
              <div key={TYPE_NAMES[i]} className={cx('bar', v === max && 'bar--max')}>
                <span>{TYPE_NAMES[i]}</span>
                <span className="bar__track">
                  <span className="bar__fill" style={{ width: `${width.toFixed(1)}%` }} />
                </span>
                <span className="bar__v">{format(v)}</span>
              </div>
            );
          })}
        </div>
        <p className="figcap" style={{ marginTop: 12 }}>
          {metric.note}
        </p>
      </Box>
    </>
  );
}
