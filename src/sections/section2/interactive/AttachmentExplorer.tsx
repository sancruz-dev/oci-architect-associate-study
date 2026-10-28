import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { PolicyLine } from '../../../components/ui/CodeBlock';
import { SelectField } from '../../../components/ui/SelectField';
import { cx } from '../../../core/cx';
import { COMPS, comp, isWithin, relativePath } from '../data/hierarchy';

const ATTACH_OPTIONS = ['root', 'ops', 'hr'].map((id) => ({ value: id, label: comp(id).name }));
const TARGET_OPTIONS = COMPS.map((c) => ({ value: c.id, label: c.name }));

/**
 * Duas perguntas diferentes que as pessoas misturam:
 * onde a policy está anexada (quem a gerencia) e onde ela concede acesso (o "in ...").
 */
export function AttachmentExplorer() {
  const [attach, setAttach] = useState('root');
  const [target, setTarget] = useState('prod');

  const valid = isWithin(target, attach);
  const location = target === 'root' ? 'tenancy' : `compartment ${relativePath(attach, target)}`;
  const covered = new Set(COMPS.filter((c) => valid && isWithin(c.id, target)).map((c) => c.id));

  return (
    <Box>
      <div className="builder">
        <SelectField label="Policy anexada em" value={attach} options={ATTACH_OPTIONS} onChange={setAttach} />
        <SelectField label="Dar acesso em" value={target} options={TARGET_OPTIONS} onChange={setTarget} />
      </div>

      <div className="split">
        <div>
          <p className="row-label" style={{ marginTop: 0 }}>
            Hierarquia (vermelho = acesso concedido)
          </p>
          <ul className="tree">
            <Tree id="root" attach={attach} covered={covered} />
          </ul>
        </div>

        <div aria-live="polite">
          <div className="verdict-row">
            <span className={cx('verdict', valid ? 'verdict--ok' : 'verdict--no')}>
              {valid ? 'Policy possível' : 'Fora do alcance'}
            </span>
          </div>
          {valid ? (
            <>
              <PolicyLine subject="group NetAdmins" verb="manage" resource="virtual-network-family" location={location} />
              <dl className="kv">
                <dt>Alcance</dt>
                <dd>
                  {target === 'root'
                    ? 'O tenancy inteiro.'
                    : `${comp(target).name} e todos os compartimentos abaixo dele.`}
                </dd>
                <dt>Quem edita</dt>
                <dd>
                  {attach === 'root'
                    ? 'Quem pode gerenciar policies no tenancy. Quem só tem acesso a um compartimento filho não consegue.'
                    : `Quem pode gerenciar policies em ${comp(attach).name}. Administradores do tenancy também, por herança.`}
                </dd>
                <dt>Caminho</dt>
                <dd>
                  {target === 'root'
                    ? 'Não há caminho: o local é o próprio tenancy.'
                    : 'Escrito a partir do ponto de anexação, com “:” entre os níveis. Se preferir, use compartment id com o OCID.'}
                </dd>
              </dl>
            </>
          ) : (
            <p className="mb0">
              O acesso só desce. Uma policy anexada em <b>{comp(attach).name}</b> alcança esse compartimento e os filhos
              dele, nunca {comp(target).name}. Para chegar lá, anexe em {comp(target).name} ou em um compartimento acima
              dele.
            </p>
          )}
        </div>
      </div>
    </Box>
  );
}

function Tree({ id, attach, covered }: { id: string; attach: string; covered: Set<string> }) {
  const c = comp(id);
  const children = COMPS.filter((x) => x.parent === id);
  return (
    <li>
      <span className={cx('node', 'node--static', covered.has(id) && 'covered')}>
        {c.name}
        {id === attach && ' 📎'}
      </span>
      {children.length > 0 && (
        <ul>
          {children.map((ch) => (
            <Tree key={ch.id} id={ch.id} attach={attach} covered={covered} />
          ))}
        </ul>
      )}
    </li>
  );
}
