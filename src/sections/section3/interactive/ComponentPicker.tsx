import { useState } from 'react';
import { Box } from '../../../components/ui/Box';
import { ChipGroup, type ChipItem } from '../../../components/ui/ChipGroup';
import { Panel } from '../../../components/ui/Panel';

const ITEMS = [
  { id: 'subnet', chip: 'Subnet', what: 'Divisão do CIDR da VCN onde ficam os recursos. Pode ser pública ou privada.', use: 'Separar camadas (web, app, banco) e aplicar rota e segurança diferentes a cada uma.' },
  { id: 'rt', chip: 'Route table', what: 'Lista de regras destino → alvo. Cada subnet usa uma route table.', use: 'Decidir por qual gateway o tráfego que sai da subnet vai.' },
  { id: 'sec', chip: 'Security list / NSG', what: 'Regras de firewall virtual que só permitem tráfego. Sem regra, nada entra nem sai.', use: 'Security list vale para a subnet toda. NSG vale para as VNICs que você escolher.' },
  { id: 'dhcp', chip: 'DHCP options', what: 'Configuração entregue às instâncias, como o resolvedor de DNS e o domínio de busca.', use: 'Cada subnet usa um conjunto. A VCN já vem com um padrão.' },
  { id: 'igw', chip: 'Internet gateway', what: 'Roteador virtual na borda da VCN. Aceita tráfego de saída e de entrada.', use: 'Subnets públicas com IP público falando com a internet nos dois sentidos.' },
  { id: 'nat', chip: 'NAT gateway', what: 'Dá saída para a internet a quem não tem IP público. Não aceita conexão iniciada de fora.', use: 'Subnet privada que precisa baixar patches e pacotes.' },
  { id: 'sgw', chip: 'Service gateway', what: 'Acesso privado aos serviços da Oracle (Oracle Services Network), sem passar pela internet.', use: 'Subnet privada gravando no Object Storage, por exemplo.' },
  { id: 'drg', chip: 'DRG', what: 'Roteador virtual entre a VCN e redes fora dela: on-premises (VPN Site-to-Site, FastConnect) e outras VCNs.', use: 'Conectar a VCN ao datacenter ou a outra região.' },
  { id: 'lpg', chip: 'LPG', what: 'Local peering gateway: liga duas VCNs da mesma região.', use: 'Comunicar VCNs próximas por IP privado, sem internet.' },
  { id: 'rpc', chip: 'RPC', what: 'Remote peering connection: liga VCNs de regiões diferentes, por meio de um DRG em cada lado.', use: 'Comunicar VCNs em regiões distintas por IP privado.' },
];
const CHIPS: ChipItem<string>[] = ITEMS.map((i) => ({ id: i.id, label: i.chip }));

export function ComponentPicker() {
  const [id, setId] = useState('subnet');
  const i = ITEMS.find((x) => x.id === id) ?? ITEMS[0];
  return (
    <Box>
      <ChipGroup items={CHIPS} selected={id} onSelect={setId} label="Componente da VCN" />
      <Panel>
        <dl className="kv">
          <dt>O que é</dt>
          <dd>{i.what}</dd>
          <dt>Quando usar</dt>
          <dd>{i.use}</dd>
        </dl>
      </Panel>
    </Box>
  );
}
