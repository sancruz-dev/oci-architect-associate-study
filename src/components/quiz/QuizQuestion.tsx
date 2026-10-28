import { cx } from '../../core/cx';
import type { QuizItem } from '../../core/types';

interface QuizQuestionProps {
  index: number;
  item: QuizItem;
  /** Alternativa escolhida, ou undefined se ainda não respondeu. */
  selected: number | undefined;
  onSelect: (option: number) => void;
}

/** Uma pergunta de múltipla escolha. Não sabe onde a resposta é salva. */
export function QuizQuestion({ index, item, selected, onSelect }: QuizQuestionProps) {
  const answered = selected !== undefined;
  const correct = selected === item.answer;

  return (
    <div className="q">
      <p className="qt">
        {index + 1}. {item.q}
      </p>
      <div className="opts">
        {item.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            className={cx('opt', answered && i === item.answer && 'right', answered && i === selected && !correct && 'wrong')}
            disabled={answered}
            onClick={() => onSelect(i)}
          >
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <p className="fb">
          <b>{correct ? 'Certo.' : 'Não é essa.'}</b> {item.why}
        </p>
      )}
    </div>
  );
}
