import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { ChipGroup, type ChipItem } from '../../../components/ui/ChipGroup';
import { Panel } from '../../../components/ui/Panel';

const PATHS = [
  { id: 'patch', chip: 'Baixar patches da internet', via: 'NAT gateway', rule: '0.0.0.0/0 → NAT Gateway', note: 'Só saída. A internet não consegue iniciar conexão com a instância.' },
  { id: 'os', chip: 'Gravar no Object Storage', via: 'Service gateway', rule: 'All <region> Services in OSN (ou só Object Storage) → Service Gateway', note: 'O tráfego fica na rede da Oracle e não passa pela internet.' },
  { id: 'onprem', chip: 'Falar com o datacenter', via: 'DRG', rule: 'CIDR do on-premises → DRG', note: 'Por VPN Site-to-Site ou FastConnect, com IP privado nos dois lados.' },
  { id: 'subnet', chip: 'Falar com outra subnet da VCN', via: 'Rota local implícita', rule: 'Nenhuma regra necessária', note: 'A rota local existe sozinha. Quem controla o acesso são as regras de segurança.' },
  { id: 'in', chip: 'Receber visita da internet', via: 'Não direto', rule: 'Coloque um load balancer em subnet pública', note: 'Uma subnet privada não tem IP público. O balanceador recebe e repassa por IP privado.' },
];
const CHIPS: ChipItem<string>[] = PATHS.map((p) => ({ id: p.id, label: p.chip }));

export function PrivateEgressPaths() {
  const [id, setId] = useState('patch');
  const p = PATHS.find((x) => x.id === id) ?? PATHS[0];
  return (
    <Box>
      <ChipGroup items={CHIPS} selected={id} onSelect={setId} label="O que a instância privada precisa fazer" />
      <Panel>
        <dl className="kv">
          <dt>Caminho</dt>
          <dd>{p.via}</dd>
          <dt>Regra</dt>
          <dd className="mono">{p.rule}</dd>
          <dt>Atenção</dt>
          <dd>{p.note}</dd>
        </dl>
      </Panel>
    </Box>
  );
}
