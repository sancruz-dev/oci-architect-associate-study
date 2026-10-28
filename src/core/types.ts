import type { ComponentType, ReactNode } from 'react';

/* ---------- Conteúdo (dados estáticos das seções) ---------- */

/** Uma lição é só metadados + um componente sem props. O conteúdo vive no componente. */
export interface LessonDef {
  id: string;
  title: string;
  minutes: number;
  Component: ComponentType;
}

/** Lição prevista, mostrada em seções ainda sem conteúdo. */
export interface PlannedLesson {
  title: string;
  minutes: number;
}

export interface SkillCheckDef {
  /** Nota mínima (em %) para considerar a skill check aprovada. */
  passScore: number;
  /** Frase que o aluno escreve no chat para iniciar a skill check com o Claude. */
  chatPhrase: string;
}

export interface SectionDef {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  summary: string;
  lessons: LessonDef[];
  planned?: PlannedLesson[];
  skillCheck: SkillCheckDef;
  comingSoon?: boolean;
}

export interface QuizItem {
  q: ReactNode;
  options: ReactNode[];
  /** Índice da alternativa correta. */
  answer: number;
  why: ReactNode;
}

/* ---------- Progresso (o que vai para o localStorage) ---------- */

/** pergunta -> alternativa escolhida */
export type QuizAnswers = Record<number, number>;

export interface SkillCheckResult {
  bestScore: number;
  updatedAt: string;
}

export interface SectionProgress {
  lessonsRead: Record<string, boolean>;
  /** quizId (id da lição) -> respostas */
  quizzes: Record<string, QuizAnswers>;
  skillCheck?: SkillCheckResult;
}

export interface ProgressState {
  version: 1;
  sections: Record<string, SectionProgress>;
}

export interface ImportResult {
  ok: boolean;
  message: string;
}
