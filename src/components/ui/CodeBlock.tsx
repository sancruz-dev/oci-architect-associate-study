import type { ReactNode } from 'react';

/** Palavra-chave destacada dentro de um CodeBlock (Allow, to, in...). */
export function Kw({ children }: { children: ReactNode }) {
  return <span className="kw">{children}</span>;
}

export function CodeBlock({ children }: { children: ReactNode }) {
  return <pre className="code">{children}</pre>;
}

interface PolicyLineProps {
  subject: ReactNode;
  verb: ReactNode;
  resource: ReactNode;
  location: ReactNode;
}

/** Uma linha de policy OCI com as palavras-chave em destaque. */
export function PolicyLine({ subject, verb, resource, location }: PolicyLineProps) {
  return (
    <CodeBlock>
      <Kw>Allow</Kw> {subject} <Kw>to</Kw> {verb} {resource} <Kw>in</Kw> {location}
    </CodeBlock>
  );
}
