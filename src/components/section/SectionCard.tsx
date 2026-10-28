import { Link } from 'react-router-dom';
import { cx } from '../../core/cx';
import { skillCheckLabel, STATUS_LABEL, type SectionSummary } from '../../core/progressMath';
import type { SectionDef } from '../../core/types';
import { ProgressBar } from '../ui/ProgressBar';

interface SectionCardProps {
  section: SectionDef;
  summary: SectionSummary;
}

/** Cartão de uma seção na página principal: status, porcentagem e detalhes. */
export function SectionCard({ section, summary }: SectionCardProps) {
  const soon = summary.status === 'soon';
  return (
    <Link to={`/secao/${section.id}`} className={cx('scard', soon && 'scard--soon')}>
      <div className="scard__top">
        <span className="scard__n">Seção {section.number}</span>
        {!soon && <span className="scard__pct">{summary.percent}%</span>}
      </div>
      <h3 className="scard__t">{section.title}</h3>
      <p className="scard__s">{section.summary}</p>
      {!soon && <ProgressBar percent={summary.percent} label={`Progresso da seção ${section.number}`} />}
      <div className="scard__meta">
        <span className={cx('badge', summary.status === 'doing' && 'badge--doing', summary.status === 'done' && 'badge--done')}>
          {STATUS_LABEL[summary.status]}
        </span>
        {!soon && (
          <span>
            {summary.lessonsRead}/{summary.lessonsTotal} lições · skill check {skillCheckLabel(section, summary)}
          </span>
        )}
      </div>
    </Link>
  );
}
