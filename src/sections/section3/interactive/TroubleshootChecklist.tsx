import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { ChipGroup, type ChipItem } from '../../../components/ui/ChipGroup';
import { Panel } from '../../../components/ui/Panel';

const CASES = [
  {
    id: 'ssh',
    chip: 'SSH da internet dá timeout',
    steps: ['Subnet pública e instância com IP público.', 'Route table da subnet com 0.0.0.0/0 → Internet Gateway.', 'Ingress TCP 22 vindo do seu IP, na security list ou no NSG.', 'Firewall do sistema operacional da instância.'],
  },
  {
    id: 'patch',
    chip: 'Instância privada não baixa pacotes',
    steps: ['Route table com 0.0.0.0/0 → NAT Gateway.', 'NAT gateway não está bloqueado.', 'Regra de egress liberando a saída (a padrão libera tudo).', 'DNS e firewall do sistema operacional.'],
  },
  {
    id: 'ping',
    chip: 'Ping não responde',
    steps: ['A security list padrão não tem ICMP echo. Adicione ingress ICMP tipo 8, stateful.', 'Confira a rota de volta, se o ping vem de fora da VCN.', 'Firewall do sistema operacional.'],
  },
  {
    id: 'os',
    chip: 'Instância privada não alcança o Object Storage',
    steps: ['Existe service gateway na VCN.', 'Route table com o service CIDR label → Service Gateway.', 'Egress com destino do tipo Service, no label certo.', 'Sem NAT: o service gateway basta para os serviços Oracle.'],
  },
];
const CHIPS: ChipItem<string>[] = CASES.map((c) => ({ id: c.id, label: c.chip }));

/** O que conferir, na ordem, em cada sintoma. */
export function TroubleshootChecklist() {
  const [id, setId] = useState('ssh');
  const c = CASES.find((x) => x.id === id) ?? CASES[0];
  return (
    <Box>
      <ChipGroup items={CHIPS} selected={id} onSelect={setId} label="Sintoma" />
      <Panel>
        <ol className="plain mb0">
          {c.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </Panel>
    </Box>
  );
}
