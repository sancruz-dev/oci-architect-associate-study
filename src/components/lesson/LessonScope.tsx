import { createContext, useContext } from 'react';

/**
 * Contexto que a SectionPage entrega a cada lição.
 * Assim os componentes de lição não recebem props: leem daqui o que precisam
 * (título, número, ids para salvar o progresso do autoteste).
 */
export interface LessonScopeValue {
  sectionId: string;
  lessonId: string;
  title: string;
  number: number;
  minutes: number;
}

const LessonScopeContext = createContext<LessonScopeValue | null>(null);

export const LessonScopeProvider = LessonScopeContext.Provider;

export function useLessonScope(): LessonScopeValue {
  const ctx = useContext(LessonScopeContext);
  if (!ctx) throw new Error('Componente de lição usado fora de <LessonScopeProvider>.');
  return ctx;
}
