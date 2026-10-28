import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../core/cx';

interface BoxProps {
  /** Borda superior colorida. */
  accent?: 'blue' | 'red';
  title?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** Caixa base. Outras caixas (cartões de tipo, fatos) especializam por composição. */
export function Box({ accent, title, className, style, children }: BoxProps) {
  return (
    <div className={cx('box', accent && `box--${accent}`, className)} style={style}>
      {title && <h4>{title}</h4>}
      {children}
    </div>
  );
}

/** Duas colunas que viram uma só em telas estreitas. */
export function TwoCols({ children }: { children: ReactNode }) {
  return <div className="two">{children}</div>;
}
