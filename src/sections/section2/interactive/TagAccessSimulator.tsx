import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { SelectField } from '../../../components/ui/SelectField';
import { cx } from '../../../core/cx';

const TAGS = [
  { value: 'prod', label: 'Operations.Project = Prod' },
  { value: 'prodlower', label: 'Operations.Project = prod (minúsculas)' },
  { value: 'dev', label: 'Operations.Project = Dev' },
  { value: 'none', label: 'Sem a tag' },
];

const ACTIONS = [
  { value: 'change', label: 'Atualizar ou excluir um recurso que já existe' },
  { value: 'create', label: 'Criar um recurso novo' },
  { value: 'list', label: 'Procurar o recurso na lista do Console' },
];

interface Outcome {
  ok: boolean;
  why: string;
}

function evaluate(tag: string, action: string, hasInspect: boolean): Outcome {
  const matches = tag === 'prod' || tag === 'prodlower';
  if (action === 'create') {
    return {
      ok: false,
      why: 'O recurso novo ainda não tem tag para a condição avaliar. Policies por tag do alvo não concedem criação.',
    };
  }
  if (action === 'list') {
    return hasInspect
      ? { ok: true, why: 'A policy separada de inspect permite listar. A policy com tag não faz isso sozinha.' }
      : {
          ok: false,
          why: 'A policy por tag não concede listar nem inspecionar. Sem outra policy, o usuário não acha o recurso no Console e só chega nele pelo OCID, via SDK ou CLI.',
        };
  }
  if (!matches) {
    return {
      ok: false,
      why:
        tag === 'none'
          ? 'O recurso não tem a tag, então a condição é falsa.'
          : 'O valor da tag é Dev, diferente de Prod.',
    };
  }
  return {
    ok: true,
    why:
      tag === 'prodlower'
        ? 'Os valores de tag não diferenciam maiúsculas de minúsculas: “prod” casa com “Prod”.'
        : 'A tag do recurso casa com a condição.',
  };
}

/** Policy fixa por tag do alvo. Varie a tag, a ação e a existência de um inspect separado. */
export function TagAccessSimulator() {
  const [tag, setTag] = useState('prod');
  const [action, setAction] = useState('change');
  const [hasInspect, setHasInspect] = useState(false);
  const out = evaluate(tag, action, hasInspect);

  return (
    <Box>
      <CodeBlock>{`allow group GroupA to manage all-resources in compartment HR where\n  target.resource.tag.Operations.Project='Prod'`}</CodeBlock>
      <div className="builder">
        <SelectField label="Tag do recurso" value={tag} options={TAGS} onChange={setTag} />
        <SelectField label="O que GroupA tenta fazer" value={action} options={ACTIONS} onChange={setAction} />
      </div>
      <div className="checkrow">
        <label>
          <input type="checkbox" checked={hasInspect} onChange={() => setHasInspect(!hasInspect)} />
          Existe também: allow group GroupA to inspect all-resources in compartment HR
        </label>
      </div>
      <div aria-live="polite">
        <div className="verdict-row">
          <span className={cx('verdict', out.ok ? 'verdict--ok' : 'verdict--no')}>{out.ok ? 'Permitido' : 'Negado'}</span>
        </div>
        <p className="mb0">{out.why}</p>
      </div>
    </Box>
  );
}
