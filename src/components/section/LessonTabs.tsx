import { Link } from 'react-router-dom';
import { cx } from '../../core/cx';
import { skillCheckLabel, type SectionSummary } from '../../core/progressMath';
import type { SectionDef, SectionProgress } from '../../core/types';

export const SKILL_TAB = 'skill-check';

interface LessonTabsProps {
  section: SectionDef;
  /** id da lição aberta, ou SKILL_TAB. */
  activeId: string;
  progress?: SectionProgress;
  summary: SectionSummary;
}

/** Abas fixas no topo da seção, como o índice de lições da Oracle University. */
export function LessonTabs({ section, activeId, progress, summary }: LessonTabsProps) {
  return (
    <div className="subnav">
      <div className="container">
        <nav className="tabs" aria-label={`Lições da seção ${section.number}`}>
          {section.lessons.map((lesson, i) => {
            const read = !!progress?.lessonsRead[lesson.id];
            return (
              <Link
                key={lesson.id}
                to={`/secao/${section.id}/${lesson.id}`}
                className={cx('tab', activeId === lesson.id && 'is-active')}
                aria-current={activeId === lesson.id ? 'page' : undefined}
              >
                <span className="tab__n">
                  <span>
                    Lição {i + 1} · {lesson.minutes} min
                  </span>
                  {read && <span className="tab__flag">lida ✓</span>}
                </span>
                <span className="tab__t">{lesson.title}</span>
              </Link>
            );
          })}
          <Link
            to={`/secao/${section.id}/${SKILL_TAB}`}
            className={cx('tab', activeId === SKILL_TAB && 'is-active')}
            aria-current={activeId === SKILL_TAB ? 'page' : undefined}
          >
            <span className="tab__n">
              <span>Skill check</span>
              {summary.skillPassed && <span className="tab__flag">aprovada ✓</span>}
            </span>
            <span className="tab__t">{skillCheckLabel(section, summary)}</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
