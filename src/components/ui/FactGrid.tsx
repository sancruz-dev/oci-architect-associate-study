import type { ReactNode } from 'react';

export function FactGrid({ children }: { children: ReactNode }) {
  return <div className="facts">{children}</div>;
}

export function Fact({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="fact">
      <b>{title}</b>
      <p>{children}</p>
    </div>
  );
}
