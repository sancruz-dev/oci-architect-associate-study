import { useState } from 'react';
import { Panel } from '../../../components/ui/Panel';
import { SCENARIOS } from '../data/domainTypes';

/** Escolha um cenário e veja qual tipo de domain se encaixa. */
export function ScenarioPicker() {
  const [picked, setPicked] = useState<number | null>(null);
  const scenario = picked === null ? null : SCENARIOS[picked];

  return (
    <>
      <div className="scen">
        {SCENARIOS.map((s, i) => (
          <button key={s.text} type="button" aria-pressed={picked === i} onClick={() => setPicked(i)}>
            {s.text}
          </button>
        ))}
      </div>
      <Panel className="answer">
        {scenario ? (
          <>
            <span className="answer__ty">{scenario.type}</span>
            <p className="mb0">{scenario.why}</p>
          </>
        ) : (
          <p className="muted mb0">Escolha um cenário para ver o tipo indicado.</p>
        )}
      </Panel>
    </>
  );
}
