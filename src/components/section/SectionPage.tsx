import { Navigate, useParams } from 'react-router-dom';
import { useProgress } from '../../core/progressStore';
import { summarizeSection } from '../../core/progressMath';
import type { SectionDef } from '../../core/types';
import { LessonScopeProvider } from '../lesson/LessonScope';
import { ComingSoon } from './ComingSoon';
import { LessonFooter } from './LessonFooter';
import { LessonTabs, SKILL_TAB } from './LessonTabs';
import { SectionHero } from './SectionHero';
import { SkillCheckCard } from './SkillCheckCard';

/**
 * Página-base de TODA seção. Recebe a definição da seção (dados) e monta
 * cabeçalho, abas, lição atual, rodapé e skill check.
 * Uma seção nova não escreve uma página: só entrega um SectionDef.
 */
export function SectionPage({ section }: { section: SectionDef }) {
  const { lessonId } = useParams();
  const { state } = useProgress();

  if (section.comingSoon || section.lessons.length === 0) {
    return <ComingSoon section={section} />;
  }

  const progress = state.sections[section.id];
  const summary = summarizeSection(section, progress);

  const isSkill = lessonId === SKILL_TAB;
  const lessonIndex = lessonId && !isSkill ? section.lessons.findIndex((l) => l.id === lessonId) : 0;
  if (lessonId && !isSkill && lessonIndex < 0) {
    return <Navigate to={`/secao/${section.id}`} replace />;
  }

  const lesson = isSkill ? undefined : section.lessons[lessonIndex];
  const Content = lesson?.Component;

  return (
    <>
      <SectionHero section={section} summary={summary} />
      <LessonTabs
        section={section}
        activeId={isSkill ? SKILL_TAB : lesson!.id}
        progress={progress}
        summary={summary}
      />
      <main className="container">
        {lesson && Content ? (
          <LessonScopeProvider
            key={lesson.id}
            value={{
              sectionId: section.id,
              lessonId: lesson.id,
              title: lesson.title,
              number: lessonIndex + 1,
              minutes: lesson.minutes,
            }}
          >
            <Content />
            <LessonFooter section={section} lessonIndex={lessonIndex} />
          </LessonScopeProvider>
        ) : (
          <SkillCheckCard section={section} />
        )}
      </main>
    </>
  );
}
