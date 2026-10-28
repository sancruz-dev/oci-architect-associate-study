import type { SectionDef } from '../../core/types';
import { CidrLesson } from './lessons/CidrLesson';
import { ComponentsLesson } from './lessons/ComponentsLesson';
import { IgwLesson } from './lessons/IgwLesson';
import { NatLesson } from './lessons/NatLesson';
import { NsgLesson } from './lessons/NsgLesson';
import { PrivateSubnetLesson } from './lessons/PrivateSubnetLesson';
import { PublicSubnetLesson } from './lessons/PublicSubnetLesson';
import { RoutesLesson } from './lessons/RoutesLesson';
import { SecurityListsLesson } from './lessons/SecurityListsLesson';
import { SgwLesson } from './lessons/SgwLesson';
import { SubnetsLesson } from './lessons/SubnetsLesson';
import { VcnLesson } from './lessons/VcnLesson';
import { VcnSecurityLesson } from './lessons/VcnSecurityLesson';

/**
 * Seção 3 do curso. Na plataforma da Oracle University aparece como seção 5
 * ("Networking - Virtual Cloud Network"). Os itens "Demo:" e o "Module Overview" ficam de fora, e as
 * partes 1 e 2 de CIDR Blocks/Prefixes, Subnets, Route Tables e Network Security Groups viram uma lição só.
 * Os minutos são a soma dos itens da plataforma.
 */
export const section3: SectionDef = {
  id: 'secao-3',
  number: 3,
  title: 'Networking - Virtual Cloud Network',
  shortTitle: 'VCN',
  summary:
    'CIDR, VCN e subnets, route tables, internet, NAT e service gateways, subnets públicas e privadas, e a segurança da rede com security lists e NSGs.',
  lessons: [
    { id: 'cidr', title: 'CIDR Blocks/Prefixes', minutes: 15, Component: CidrLesson },
    { id: 'vcn', title: 'Virtual Cloud Network', minutes: 10, Component: VcnLesson },
    { id: 'componentes', title: 'VCN Components - Quick Overview', minutes: 11, Component: ComponentsLesson },
    { id: 'subnets', title: 'Subnets', minutes: 14, Component: SubnetsLesson },
    { id: 'route-tables', title: 'Route Tables', minutes: 20, Component: RoutesLesson },
    { id: 'internet-gateway', title: 'Internet Gateway', minutes: 8, Component: IgwLesson },
    { id: 'nat-gateway', title: 'NAT Gateway', minutes: 11, Component: NatLesson },
    { id: 'service-gateway', title: 'Service Gateway', minutes: 9, Component: SgwLesson },
    { id: 'subnet-publica', title: 'Public Subnet', minutes: 4, Component: PublicSubnetLesson },
    { id: 'subnet-privada', title: 'Private Subnet', minutes: 4, Component: PrivateSubnetLesson },
    { id: 'vcn-security', title: 'VCN Security', minutes: 8, Component: VcnSecurityLesson },
    { id: 'nsg', title: 'Network Security Groups', minutes: 15, Component: NsgLesson },
    { id: 'security-lists', title: 'Security Lists', minutes: 6, Component: SecurityListsLesson },
  ],
  skillCheck: { passScore: 80, chatPhrase: 'Pronto para a skill check da Seção 3' },
};
