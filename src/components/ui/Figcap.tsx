import type { ReactNode } from 'react';

export function Figcap({ children }: { children: ReactNode }) {
  return <p className="figcap">{children}</p>;
}

/** Contêiner com rolagem horizontal para figuras largas (SVG, diagramas). */
export function Diagram({ children }: { children: ReactNode }) {
  return <div className="diagram">{children}</div>;
}
