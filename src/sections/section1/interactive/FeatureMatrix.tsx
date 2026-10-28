import { useState } from 'react';
import { cx } from '../../../core/cx';
import { FEATURE_MATRIX, TYPE_NAMES, type Cell } from '../data/domainTypes';

function CellView({ value, highlighted }: { value: Cell; highlighted: boolean }) {
  const hl = highlighted ? 'hl ' : '';
  if (value === true) return <td className={`${hl}y`}>✓</td>;
  if (value === false) return <td className={`${hl}n`}>—</td>;
  return <td className={`${hl}p`}>{value}</td>;
}

/** Matriz recurso × tipo. Toque no nome de um tipo para destacar a coluna. */
export function FeatureMatrix() {
  const [highlight, setHighlight] = useState<number | null>(null);

  return (
    <div className="tablewrap">
      <table className="cmp">
        <thead>
          <tr>
            <th scope="col">Recurso</th>
            {TYPE_NAMES.map((name, i) => (
              <th key={name} scope="col" className={cx(highlight === i && 'hl')}>
                <button
                  type="button"
                  className="thbtn"
                  aria-pressed={highlight === i}
                  onClick={() => setHighlight(highlight === i ? null : i)}
                >
                  {name}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FEATURE_MATRIX.map((row) =>
            'category' in row ? (
              <tr key={row.category} className="cat">
                <td colSpan={TYPE_NAMES.length + 1}>{row.category}</td>
              </tr>
            ) : (
              <tr key={row.feature}>
                <td>{row.feature}</td>
                {row.cells.map((cell, i) => (
                  <CellView key={TYPE_NAMES[i]} value={cell} highlighted={highlight === i} />
                ))}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
