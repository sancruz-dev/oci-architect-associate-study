import { useState, type FormEvent } from 'react';
import { cx } from '../../core/cx';
import { useProgress } from '../../core/progressStore';
import { summarizeSection } from '../../core/progressMath';
import type { SectionDef } from '../../core/types';
import { CopyButton } from '../ui/CopyButton';

/**
 * Fluxo de validação da seção:
 * 1) skill check de 5 questões com o Claude no chat,
 * 2) skill check oficial na plataforma da Oracle,
 * 3) registrar aqui a nota obtida, que alimenta a porcentagem da seção.
 */
export function SkillCheckCard({ section }: { section: SectionDef }) {
  const { state, setSkillScore, clearSkillScore } = useProgress();
  const result = state.sections[section.id]?.skillCheck;
  const summary = summarizeSection(section, state.sections[section.id]);
  const pass = section.skillCheck.passScore;

  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const n = Number(value.replace(',', '.'));
    if (value.trim() === '' || !Number.isFinite(n) || n < 0 || n > 100) {
      setError('Digite uma nota entre 0 e 100.');
      return;
    }
    setError('');
    setSkillScore(section.id, Math.round(n));
    setValue('');
  };

  return (
    <article className="skill">
      <h2>Skill check · Seção {section.number}</h2>
      <p className="muted">São 5 questões. A nota para passar é {pass}%, como na plataforma.</p>

      <ol className="steps">
        <li>
          <div>
            <h4>Pratique com o Claude no chat</h4>
            <p>Escreva a frase abaixo no chat. Ele aplica 5 questões e corrige as respostas com explicação.</p>
            <div className="cta">
              <span className="mono">{section.skillCheck.chatPhrase}</span>
              <CopyButton text={section.skillCheck.chatPhrase} />
            </div>
          </div>
        </li>
        <li>
          <div>
            <h4>Faça a skill check na plataforma da Oracle</h4>
            <p className="mb0">Na Oracle University, abra a skill check desta seção e responda sem consultar o material.</p>
          </div>
        </li>
        <li>
          <div>
            <h4>Registre a nota aqui</h4>
            <p>A seção só conta a skill check como feita quando a nota é de pelo menos {pass}%. O app guarda a maior nota.</p>
            <form className="scoreform" onSubmit={submit} noValidate>
              <div className="field">
                <label htmlFor={`score-${section.id}`}>Nota (0 a 100)</label>
                <input
                  id={`score-${section.id}`}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={100}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <button type="submit" className="btn">
                Registrar nota
              </button>
              {result && (
                <button type="button" className="btn btn--ghost" onClick={() => clearSkillScore(section.id)}>
                  Limpar nota
                </button>
              )}
            </form>
            {error && <p className="error">{error}</p>}
            {result && (
              <p className={cx('result', summary.skillPassed ? 'result--ok' : 'result--low')} aria-live="polite">
                <b>Maior nota: {result.bestScore}%.</b>{' '}
                {summary.skillPassed
                  ? 'Skill check aprovada.'
                  : `Abaixo de ${pass}%. Revise as lições e tente de novo.`}
              </p>
            )}
          </div>
        </li>
      </ol>
    </article>
  );
}
