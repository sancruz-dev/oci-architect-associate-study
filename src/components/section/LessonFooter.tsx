import { Link } from 'react-router-dom';
import { cx } from '../../core/cx';
import { useProgress } from '../../core/progressStore';
import type { SectionDef } from '../../core/types';
import { SKILL_TAB } from './LessonTabs';

interface LessonFooterProps {
  section: SectionDef;
  lessonIndex: number;
}

/** Anterior, marcar como lida e próxima. Igual em todas as lições. */
export function LessonFooter({ section, lessonIndex }: LessonFooterProps) {
  const { state, toggleLesson } = useProgress();
  const lesson = section.lessons[lessonIndex];
  const read = !!state.sections[section.id]?.lessonsRead[lesson.id];

  const prev = section.lessons[lessonIndex - 1];
  const next = section.lessons[lessonIndex + 1];
  const nextTo = `/secao/${section.id}/${next ? next.id : SKILL_TAB}`;

  return (
    <div className="foot">
      {prev ? (
        <Link className="btn btn--ghost" to={`/secao/${section.id}/${prev.id}`}>
          ← Lição anterior
        </Link>
      ) : (
        <span />
      )}
      <button
        type="button"
        className={cx('btn', read && 'btn--done')}
        onClick={() => toggleLesson(section.id, lesson.id)}
        aria-pressed={read}
      >
        {read ? 'Lida ✓ (desfazer)' : 'Marcar como lida'}
      </button>
      <Link className="btn btn--ghost" to={nextTo}>
        {next ? 'Próxima lição →' : 'Skill check →'}
      </Link>
    </div>
  );
}
