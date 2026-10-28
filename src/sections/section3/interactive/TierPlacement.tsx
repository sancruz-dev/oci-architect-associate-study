import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { ChipGroup, type ChipItem } from '../../../components/ui/ChipGroup';
import { Panel } from '../../../components/ui/Panel';

const TIERS = [
  { id: 'lb', chip: 'Load balancer público', subnet: 'Pública', ip: 'Sim (IP público)', why: 'Recebe clientes da internet pelo Internet Gateway. Precisa de IP público e da rota 0.0.0.0/0 → IGW.' },
  { id: 'app', chip: 'Servidor de aplicação', subnet: 'Privada', ip: 'Não', why: 'Não deve ser alcançado direto da internet. Recebe só do load balancer e sai pelo NAT para atualizações.' },
  { id: 'db', chip: 'Banco de dados', subnet: 'Privada', ip: 'Não', why: 'Só a aplicação o acessa. Backups para o Object Storage vão pelo service gateway, sem internet.' },
  { id: 'bastion', chip: 'Bastion host', subnet: 'Pública', ip: 'Sim (IP público)', why: 'Ponto de entrada administrativo, liberado só para os IPs de quem administra. Dele você chega às instâncias privadas.' },
];
const CHIPS: ChipItem<string>[] = TIERS.map((t) => ({ id: t.id, label: t.chip }));

export function TierPlacement() {
  const [id, setId] = useState('lb');
  const t = TIERS.find((x) => x.id === id) ?? TIERS[0];
  return (
    <Box>
      <ChipGroup items={CHIPS} selected={id} onSelect={setId} label="Tipo de recurso" />
      <Panel>
        <dl className="kv">
          <dt>Subnet</dt>
          <dd>{t.subnet}</dd>
          <dt>IP público</dt>
          <dd>{t.ip}</dd>
          <dt>Por quê</dt>
          <dd>{t.why}</dd>
        </dl>
      </Panel>
    </Box>
  );
}
