import type { SectionDef, SectionProgress } from './types';

export type SectionStatus = 'soon' | 'new' | 'doing' | 'done';

export interface SectionSummary {
  status: SectionStatus;
  percent: number;
  lessonsRead: number;
  lessonsTotal: number;
  skillPassed: boolean;
  bestScore?: number;
  unitsDone: number;
  unitsTotal: number;
}

export const STATUS_LABEL: Record<SectionStatus, string> = {
  soon: 'Em breve',
  new: 'Não iniciada',
  doing: 'Em andamento',
  done: 'Concluída',
};

/**
 * Regra do progresso: cada lição lida vale 1 ponto e a skill check da Oracle
 * (nota >= nota mínima) vale 1 ponto. Seção de 3 lições = 4 pontos, 25% cada.
 */
export function summarizeSection(
  section: SectionDef,
  progress?: SectionProgress,
): SectionSummary {
  const lessonsTotal = section.lessons.length;
  if (section.comingSoon || lessonsTotal === 0) {
    return {
      status: 'soon',
      percent: 0,
      lessonsRead: 0,
      lessonsTotal,
      skillPassed: false,
      unitsDone: 0,
      unitsTotal: 0,
    };
  }

  const read = progress?.lessonsRead ?? {};
  const lessonsRead = section.lessons.filter((l) => read[l.id]).length;
  const bestScore = progress?.skillCheck?.bestScore;
  const skillPassed = bestScore !== undefined && bestScore >= section.skillCheck.passScore;

  const unitsTotal = lessonsTotal + 1;
  const unitsDone = lessonsRead + (skillPassed ? 1 : 0);
  const percent = Math.round((unitsDone / unitsTotal) * 100);
  const status: SectionStatus =
    unitsDone === 0 ? 'new' : unitsDone === unitsTotal ? 'done' : 'doing';

  return { status, percent, lessonsRead, lessonsTotal, skillPassed, bestScore, unitsDone, unitsTotal };
}

export function skillCheckLabel(section: SectionDef, summary: SectionSummary): string {
  if (summary.skillPassed) return `aprovada (${summary.bestScore}%)`;
  if (summary.bestScore !== undefined)
    return `${summary.bestScore}% (mínimo ${section.skillCheck.passScore}%)`;
  return 'pendente';
}

export function overallPercent(summaries: SectionSummary[]): number {
  const total = summaries.reduce((n, s) => n + s.unitsTotal, 0);
  const done = summaries.reduce((n, s) => n + s.unitsDone, 0);
  return total === 0 ? 0 : Math.round((done / total) * 100);
}
