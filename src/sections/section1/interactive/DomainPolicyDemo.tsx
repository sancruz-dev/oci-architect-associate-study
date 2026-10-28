import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { ChipGroup } from '../../../components/ui/ChipGroup';
import { PolicyLine } from '../../../components/ui/CodeBlock';

type Where = 'default' | 'corpapps';

const OPTIONS = [
  { id: 'default' as const, label: 'Grupo está no Default' },
  { id: 'corpapps' as const, label: 'Grupo está em CorpApps' },
];

/** Mostra como o nome do domain entra na policy. */
export function DomainPolicyDemo() {
  const [where, setWhere] = useState<Where>('default');

  return (
    <Box>
      <ChipGroup items={OPTIONS} selected={where} onSelect={setWhere} label="Domain onde o grupo existe" />

      {where === 'default' ? (
        <>
          <p className="muted" style={{ fontSize: 14, marginBottom: 6 }}>
            Sem prefixo:
          </p>
          <PolicyLine subject="group Auditores" verb="read" resource="all-resources" location="compartment Prod" />
          <p className="muted" style={{ fontSize: 14, marginBottom: 6 }}>
            Forma equivalente, explícita:
          </p>
          <PolicyLine subject="group 'Default'/'Auditores'" verb="read" resource="all-resources" location="compartment Prod" />
          <p className="mb0" aria-live="polite">
            Sem prefixo, o IAM assume que o grupo está no Default. As duas linhas significam a mesma coisa.
          </p>
        </>
      ) : (
        <>
          <PolicyLine subject="group 'CorpApps'/'Auditores'" verb="read" resource="all-resources" location="compartment Prod" />
          <p className="mb0" aria-live="polite">
            Aqui o prefixo é obrigatório. Se você escrever só <code>group Auditores</code>, o IAM procura o grupo no
            Default e não o encontra.
          </p>
        </>
      )}
    </Box>
  );
}
