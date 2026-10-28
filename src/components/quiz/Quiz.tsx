import { useLessonScope } from '../lesson/LessonScope';
import { useProgress } from '../../core/progressStore';
import type { QuizItem } from '../../core/types';
import { QuizQuestion } from './QuizQuestion';

/**
 * Autoteste de uma lição. As respostas vão para o localStorage
 * (seção -> lição -> pergunta), então sobrevivem a recarregar a página.
 */
export function Quiz({ items }: { items: QuizItem[] }) {
  const { sectionId, lessonId } = useLessonScope();
  const { state, answerQuiz, resetQuiz } = useProgress();

  const answers = state.sections[sectionId]?.quizzes[lessonId] ?? {};
  const answeredCount = items.filter((_, i) => answers[i] !== undefined).length;
  const correctCount = items.filter((it, i) => answers[i] === it.answer).length;

  return (
    <div className="quiz">
      {items.map((item, i) => (
        <QuizQuestion
          key={i}
          index={i}
          item={item}
          selected={answers[i] as number | undefined}
          onSelect={(option) => answerQuiz(sectionId, lessonId, i, option)}
        />
      ))}
      {answeredCount > 0 && (
        <div className="quiz__summary">
          <span>
            {correctCount} de {items.length} corretas · {answeredCount} respondidas
          </span>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => resetQuiz(sectionId, lessonId)}>
            Refazer autoteste
          </button>
        </div>
      )}
    </div>
  );
}
