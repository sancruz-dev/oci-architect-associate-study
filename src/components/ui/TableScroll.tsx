import type { ReactNode } from 'react';

interface TableScrollProps {
  /** Largura mínima da tabela; abaixo disso a tabela rola na horizontal. */
  minWidth?: number;
  children: ReactNode;
}

/** Contêiner que rola na horizontal, para a página nunca rolar de lado. */
export function TableScroll({ minWidth, children }: TableScrollProps) {
  return (
    <div className="tablewrap">
      <div style={minWidth ? { minWidth } : undefined}>{children}</div>
    </div>
  );
}
