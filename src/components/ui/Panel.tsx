import type { ReactNode } from 'react';

interface PanelProps {
  children: ReactNode;
  className?: string;
}

/** Painel de detalhe que anuncia mudanças para leitores de tela. */
export function Panel({ children, className }: PanelProps) {
  return (
    <div className={className ? `panel ${className}` : 'panel'} aria-live="polite">
      {children}
    </div>
  );
}
