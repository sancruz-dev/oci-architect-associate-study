import type { ReactNode } from 'react';
import { cx } from '../../core/cx';

interface CalloutProps {
  title: string;
  variant?: 'accent' | 'blue';
  children: ReactNode;
}

/** Destaque lateral com título curto. */
export function Callout({ title, variant = 'accent', children }: CalloutProps) {
  return (
    <div className={cx('callout', variant === 'blue' && 'callout--blue')}>
      <strong>{title}</strong>
      {children}
    </div>
  );
}
