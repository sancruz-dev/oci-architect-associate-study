import type { ReactNode } from 'react';

interface LessonBlockProps {
  /** Rótulo pequeno acima do título (Interativo, Regras que caem na prova...). */
  tag?: string;
  title: string;
  children: ReactNode;
}

/** Bloco de conteúdo com título dentro de uma lição. */
export function LessonBlock({ tag, title, children }: LessonBlockProps) {
  return (
    <section>
      <h3>
        {tag && <span className="tag">{tag}</span>}
        {title}
      </h3>
      {children}
    </section>
  );
}

interface SourcesProps {
  links: Array<{ href: string; label: string }>;
}

export function LessonSources({ links }: SourcesProps) {
  return (
    <div className="lesson-sources">
      Fontes (documentação Oracle):
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
