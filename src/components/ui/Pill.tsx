import type { ReactNode } from 'react';

export function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>;
}

/** Linha de pills que quebra de linha. */
export function PillRow({ children, className = 'chips' }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
