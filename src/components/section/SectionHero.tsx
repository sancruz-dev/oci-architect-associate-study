import { STATUS_LABEL, type SectionSummary } from '../../core/progressMath';
import type { SectionDef } from '../../core/types';
import { Pill } from '../ui/Pill';

interface SectionHeroProps {
  section: SectionDef;
  summary: SectionSummary;
}

/** Cabeçalho de seção, também usado nas seções "em breve". */
export function SectionHero({ section, summary }: SectionHeroProps) {
  return (
    <header className="hero container">
      <p className="eyebrow">OCI Architect Associate · Trilha de estudo</p>
      <h1>
        Seção {section.number}: {section.title}
      </h1>
      <p>{section.summary}</p>
      <div className="meta">
        <Pill>{STATUS_LABEL[summary.status]}</Pill>
        {summary.status !== 'soon' && (
          <>
            <Pill>
              {summary.lessonsRead} de {summary.lessonsTotal} lições lidas
            </Pill>
            <Pill>{summary.percent}% da seção</Pill>
          </>
        )}
      </div>
    </header>
  );
}
