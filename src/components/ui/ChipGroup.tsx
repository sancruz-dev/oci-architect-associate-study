import type { ReactNode } from 'react';
import { cx } from '../../core/cx';

export interface ChipItem<Id extends string | number> {
  id: Id;
  label: ReactNode;
  tone?: 'blue' | 'red';
}

interface ChipGroupProps<Id extends string | number> {
  items: ChipItem<Id>[];
  selected: Id | null;
  onSelect: (id: Id) => void;
  /** Rótulo para leitores de tela. */
  label: string;
}

/**
 * Seletor base: uma fileira de botões em que um fica marcado.
 * Glossário, limites e demonstrações de policy especializam este componente.
 */
export function ChipGroup<Id extends string | number>({ items, selected, onSelect, label }: ChipGroupProps<Id>) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {items.map((item) => (
        <button
          key={String(item.id)}
          type="button"
          className={cx('chip', item.tone && `chip--${item.tone}`)}
          aria-pressed={selected === item.id}
          onClick={() => onSelect(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
