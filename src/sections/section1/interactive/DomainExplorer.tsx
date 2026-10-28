import { useState } from 'react';
import { Panel } from '../../../components/ui/Panel';
import { DOMAINS } from '../data/domains';

/** Um tenancy com três domains. Toque em um para ver o que o caracteriza. */
export function DomainExplorer() {
  const [index, setIndex] = useState(0);
  const domain = DOMAINS[index];

  return (
    <>
      <div className="tenancy">
        <div className="tenancy__lab">Tenancy · compartimento raiz</div>
        <div className="dgrid">
          {DOMAINS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              className="dcard"
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <span className="dcard__badge">{d.badge}</span>
              <span className="dcard__nm">{d.id}</span>
              <span className="dcard__ty">Tipo {d.type}</span>
            </button>
          ))}
        </div>
      </div>
      <Panel>
        <h4>{domain.heading}</h4>
        <p>{domain.description}</p>
        <ul className="plain">
          {domain.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="tip">{domain.tip}</p>
      </Panel>
    </>
  );
}
