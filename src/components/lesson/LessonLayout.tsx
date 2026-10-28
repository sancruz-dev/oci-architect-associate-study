import type { ReactNode } from 'react';
import { useLessonScope } from './LessonScope';

interface LessonLayoutProps {
  /** Frase de abertura da lição. */
  lead: ReactNode;
  children: ReactNode;
}

/**
 * Esqueleto comum a TODAS as lições: título, duração e abertura.
 * Cada lição "herda" esta estrutura por composição e só informa o conteúdo.
 */
export function LessonLayout({ lead, children }: LessonLayoutProps) {
  const { title, number, minutes } = useLessonScope();
  return (
    <article className="lesson">
      <h2>{title}</h2>
      <p className="lesson__time">
        Lição {number} · {minutes} min na plataforma
      </p>
      <p className="lead">{lead}</p>
      {children}
    </article>
  );
}
