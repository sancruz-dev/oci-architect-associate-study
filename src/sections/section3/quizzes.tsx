import type { QuizItem } from '../../core/types';

export const cidrQuiz: QuizItem[] = [
  {
    q: 'Quantos endereços tem o bloco 10.0.0.0/22?',
    options: ['256', '512', '1.024', '4.096'],
    answer: 2,
    why: 'Sobram 32 − 22 = 10 bits de host, e 2^10 = 1.024 endereços.',
  },
  {
    q: 'Uma subnet 10.0.1.0/28 no OCI. Quantos endereços ficam disponíveis para as instâncias?',
    options: ['14', '13', '16', '15'],
    answer: 1,
    why: 'Um /28 tem 16 endereços, e o OCI reserva 3 em cada subnet (rede, gateway padrão e broadcast): 16 − 3 = 13.',
  },
  {
    q: 'A rede 10.0.4.0/22 vai de 10.0.4.0 a 10.0.7.255. Qual destes blocos NÃO se sobrepõe a ela?',
    options: ['10.0.6.0/24', '10.0.7.128/25', '10.0.8.0/24', '10.0.0.0/21'],
    answer: 2,
    why: '10.0.6.0/24 e 10.0.7.128/25 estão dentro dela. 10.0.0.0/21 cobre 10.0.0.0 a 10.0.7.255, e a contém. Só 10.0.8.0/24 começa depois do fim.',
  },
  {
    q: 'Comparando /16 e /24, o que é verdade?',
    options: [
      'O /24 é maior, porque o prefixo é maior.',
      'O /16 é maior: quanto menor o prefixo, mais bits de host e mais endereços.',
      'Os dois têm o mesmo tamanho, e muda só a máscara.',
      'O /16 só existe em IPv6.',
    ],
    answer: 1,
    why: 'O /16 tem 65.536 endereços e o /24 tem 256. Prefixo maior significa bloco menor.',
  },
];

export const vcnQuiz: QuizItem[] = [
  {
    q: 'Qual é o intervalo de tamanho permitido para o CIDR IPv4 de uma VCN?',
    options: ['/8 a /24', '/16 a /30', '/16 a /28', '/24 a /32'],
    answer: 1,
    why: 'A Oracle permite de /16 a /30. Exemplo: 10.0.0.0/16.',
  },
  {
    q: 'Você precisa conectar a VCN ao datacenter, que já usa 10.0.0.0/16. O que fazer?',
    options: [
      'Usar o mesmo 10.0.0.0/16 e deixar o DRG resolver.',
      'Escolher para a VCN um CIDR que não se sobreponha ao do datacenter.',
      'Usar um CIDR /8 para cobrir os dois.',
      'Habilitar o NAT gateway.',
    ],
    answer: 1,
    why: 'Os CIDRs da VCN não podem se sobrepor aos da rede on-premises conectada, nem aos de uma VCN com peering.',
  },
  {
    q: 'Quais componentes já vêm com uma VCN nova, e não podem ser excluídos?',
    options: [
      'Internet gateway, NAT gateway e service gateway.',
      'Route table padrão (sem regras), security list padrão e DHCP options padrão.',
      'Uma subnet pública e uma privada.',
      'Um DRG e um NSG padrão.',
    ],
    answer: 1,
    why: 'A VCN vem com route table padrão, security list padrão e DHCP options padrão. Gateways, subnets e NSGs você cria. Não existe NSG padrão.',
  },
  {
    q: 'Qual destes CIDRs é proibido em uma VCN?',
    options: ['10.0.0.0/16', '172.16.0.0/16', '192.168.0.0/16', '169.254.0.0/16'],
    answer: 3,
    why: '169.254.0.0/16 é reservada para iSCSI, metadados da instância e outros serviços. As classes D e E também são proibidas.',
  },
];

export const componentsQuiz: QuizItem[] = [
  {
    q: 'Qual componente liga a VCN a uma rede on-premises por VPN Site-to-Site ou FastConnect?',
    options: ['Internet gateway', 'NAT gateway', 'DRG', 'Service gateway'],
    answer: 2,
    why: 'O DRG é o roteador virtual entre a VCN e redes externas, como o datacenter e outras VCNs.',
  },
  {
    q: 'Quais componentes servem para fazer peering entre VCNs?',
    options: [
      'LPG (mesma região) e RPC (regiões diferentes).',
      'IGW e NAT.',
      'Security list e NSG.',
      'DHCP options e route table.',
    ],
    answer: 0,
    why: 'O local peering gateway liga VCNs da mesma região. A remote peering connection liga VCNs de regiões diferentes, usando o DRG.',
  },
  {
    q: 'Instâncias privadas precisam gravar no Object Storage sem sair pela internet. O que usar?',
    options: ['Internet gateway', 'NAT gateway', 'Service gateway', 'LPG'],
    answer: 2,
    why: 'O service gateway dá acesso privado aos serviços do Oracle Services Network, pela rede da Oracle.',
  },
];

export const subnetsQuiz: QuizItem[] = [
  {
    q: 'Em uma subnet 192.168.0.0/24 no OCI, quais endereços as instâncias podem usar?',
    options: ['192.168.0.1 a 192.168.0.254', '192.168.0.2 a 192.168.0.254', '192.168.0.0 a 192.168.0.255', '192.168.0.3 a 192.168.0.253'],
    answer: 1,
    why: 'Ficam reservados .0 (rede), .1 (gateway padrão) e .255 (broadcast). Sobram .2 a .254.',
  },
  {
    q: 'Qual tipo de subnet a Oracle recomenda, por ser mais flexível?',
    options: ['Específica de um availability domain.', 'Regional.', 'Só privada.', 'Só pública.'],
    answer: 1,
    why: 'A subnet regional abrange todos os ADs da região. A específica de AD só aceita recursos daquele AD.',
  },
  {
    q: 'Quantas route tables uma subnet usa?',
    options: ['Nenhuma, o roteamento é automático.', 'Uma.', 'Até cinco.', 'Quantas forem anexadas.'],
    answer: 1,
    why: 'Cada subnet usa uma única route table, que pode ser trocada a qualquer momento. Já as security lists podem ser várias.',
  },
  {
    q: 'Duas subnets da mesma VCN podem ter faixas que se sobrepõem?',
    options: ['Sim, se estiverem em ADs diferentes.', 'Sim, se uma for pública e a outra privada.', 'Não. As subnets de uma VCN não podem se sobrepor.', 'Sim, desde que tenham NSGs diferentes.'],
    answer: 2,
    why: 'As subnets de uma VCN não podem se sobrepor entre si, nem sair do CIDR da VCN.',
  },
];

export const routeQuiz: QuizItem[] = [
  {
    q: (
      <>
        A route table tem <code>0.0.0.0/0 → NAT</code> e <code>192.168.0.0/16 → DRG</code>. Para onde vai um pacote com
        destino 192.168.1.10?
      </>
    ),
    options: ['NAT gateway', 'DRG', 'É descartado, pois as duas regras conflitam', 'Para a primeira regra da lista'],
    answer: 1,
    why: 'Quando as regras se sobrepõem, o OCI usa a mais específica (longest prefix match). O /16 vence o /0, e a ordem da lista não importa.',
  },
  {
    q: 'Duas instâncias em subnets diferentes da mesma VCN, com a route table sem nenhuma regra. O tráfego entre elas chega?',
    options: [
      'Não, falta uma regra apontando para a VCN.',
      'Sim quanto à rota, porque a rota local é implícita. As regras de segurança ainda precisam permitir.',
      'Só se houver um internet gateway.',
      'Só se estiverem na mesma subnet.',
    ],
    answer: 1,
    why: 'O roteamento local dentro da VCN é implícito e não aparece na route table. O acesso, porém, depende das regras de segurança.',
  },
  {
    q: 'Nenhuma regra da route table casa com o destino, que está fora da VCN. O que acontece?',
    options: ['Vai pelo internet gateway, se existir.', 'É devolvido à origem com um erro.', 'É descartado (blackhole).', 'Vai pelo DRG.'],
    answer: 2,
    why: 'Sem regra que case, o tráfego que deveria sair da VCN é descartado.',
  },
  {
    q: 'Qual destes NÃO pode ser alvo (target) de uma route rule?',
    options: ['Internet gateway', 'DRG', 'Private IP', 'Security list'],
    answer: 3,
    why: 'Os alvos são DRG, internet gateway, NAT gateway, service gateway, local peering gateway e private IP. Security list é regra de firewall.',
  },
];

export const igwQuiz: QuizItem[] = [
  {
    q: 'O que uma instância precisa para trocar tráfego com a internet por um internet gateway?',
    options: [
      'Só estar em uma subnet pública.',
      'IP público, rota para o IGW na route table e regra de segurança permitindo o tráfego.',
      'Só a rota 0.0.0.0/0 → IGW.',
      'Um NAT gateway ao lado do IGW.',
    ],
    answer: 1,
    why: 'Os hosts dos dois lados precisam de IP público, a route table precisa apontar para o IGW e as regras de segurança precisam liberar o tráfego.',
  },
  {
    q: 'Quantos internet gateways uma VCN pode ter?',
    options: ['Um.', 'Um por subnet.', 'Um por availability domain.', 'Quantos quiser.'],
    answer: 0,
    why: 'Uma VCN tem no máximo um internet gateway, e todas as subnets públicas podem usá-lo.',
  },
  {
    q: 'Como o internet gateway trata o sentido do tráfego?',
    options: ['Só saída.', 'Só entrada.', 'Os dois: saída e entrada.', 'Depende do shape da instância.'],
    answer: 2,
    why: 'Ele aceita conexões iniciadas de dentro da VCN (egress) e da internet (ingress). É isso que o diferencia do NAT.',
  },
  {
    q: 'Uma VCN com peering ou uma rede on-premises pode usar o internet gateway desta VCN?',
    options: ['Sim, pelo DRG.', 'Sim, pelo LPG.', 'Não. Só os recursos da própria VCN o usam.', 'Sim, se tiverem IP público.'],
    answer: 2,
    why: 'O internet gateway só atende recursos da sua própria VCN.',
  },
];

export const natQuiz: QuizItem[] = [
  {
    q: 'Qual é a característica principal do NAT gateway?',
    options: [
      'Permite entrada e saída, como o internet gateway.',
      'Dá saída para a internet a recursos sem IP público, sem aceitar conexões iniciadas de fora.',
      'Dá acesso privado ao Object Storage.',
      'Liga a VCN ao datacenter.',
    ],
    answer: 1,
    why: 'A instância inicia conexões e recebe as respostas, mas a internet não consegue abrir conexão com ela.',
  },
  {
    q: 'Qual rota coloca uma subnet privada para sair pelo NAT gateway?',
    options: ['10.0.0.0/16 → NAT Gateway', '0.0.0.0/0 → NAT Gateway', '0.0.0.0/0 → Internet Gateway', 'All Services in OSN → NAT Gateway'],
    answer: 1,
    why: 'A regra no route table da subnet tem destino 0.0.0.0/0 e alvo NAT Gateway. Sem a rota, o tráfego não passa pelo NAT.',
  },
  {
    q: 'Você bloqueia o NAT gateway no Console. O que acontece?',
    options: [
      'Só as regras de segurança mais restritivas passam a valer.',
      'Todo o tráfego pelo gateway para, qualquer que seja a route table ou a security list, e ele não precisa ser excluído.',
      'O gateway é excluído.',
      'Só o tráfego de entrada é bloqueado.',
    ],
    answer: 1,
    why: 'Bloquear impede todo o tráfego, independentemente das regras da VCN, e dá para liberar depois.',
  },
  {
    q: 'Que IP aparece como origem do tráfego que sai pelo NAT gateway?',
    options: ['O IP privado da instância.', 'O IP público do próprio NAT gateway.', 'O IP do internet gateway.', 'Um IP aleatório da região.'],
    answer: 1,
    why: 'O NAT traduz a origem para o seu IP público, que pode ser gerado pelo serviço ou um IP público reservado que você informe.',
  },
];

export const sgwQuiz: QuizItem[] = [
  {
    q: 'Para que serve o service gateway?',
    options: [
      'Dar acesso à internet em geral.',
      'Dar acesso privado a serviços da Oracle, como o Object Storage, sem passar pela internet.',
      'Conectar duas VCNs.',
      'Substituir as security lists.',
    ],
    answer: 1,
    why: 'O tráfego segue pela rede da Oracle e nunca atravessa a internet.',
  },
  {
    q: 'Qual é o destino de uma route rule para o service gateway?',
    options: [
      'Um CIDR qualquer, como 0.0.0.0/0.',
      'Um service CIDR label, como “All <region> Services in Oracle Services Network”.',
      'O OCID da instância.',
      'O nome da subnet.',
    ],
    answer: 1,
    why: 'O destino é um service CIDR label, e a Oracle mantém as faixas por trás dele. Você não precisa ajustar nada se elas mudarem.',
  },
  {
    q: 'Instâncias numa subnet privada precisam usar o Object Storage pelo service gateway. Elas precisam de IP público, internet gateway ou NAT?',
    options: ['Dos três.', 'De IP público e internet gateway.', 'Só de NAT.', 'De nenhum deles.'],
    answer: 3,
    why: 'Podem ficar em subnet privada, só com IP privado. O NAT só entra se houver tráfego para a internet, como baixar patches de terceiros.',
  },
  {
    q: 'Quais labels de serviço existem para o service gateway?',
    options: [
      '“OCI <region> Object Storage” e “All <region> Services in Oracle Services Network”.',
      '“Internet” e “Private”.',
      '“OCI Compute” e “OCI Network”.',
      '“All Regions” e “Local”.',
    ],
    answer: 0,
    why: 'Um label cobre só o Object Storage da região, e o outro cobre todos os serviços do Oracle Services Network da região.',
  },
];

export const publicQuiz: QuizItem[] = [
  {
    q: 'O que define uma subnet pública?',
    options: [
      'Ter um internet gateway criado.',
      'Permitir que as VNICs tenham IPs públicos.',
      'Estar na região home.',
      'Ter uma security list própria.',
    ],
    answer: 1,
    why: 'Na subnet pública as VNICs podem receber IPs públicos IPv4. Na privada, não.',
  },
  {
    q: 'A instância está em subnet pública. Isso basta para ela acessar a internet?',
    options: [
      'Sim, é o que define o acesso.',
      'Não: também precisa de IP público, rota para o internet gateway e regras de segurança.',
      'Sim, se houver NAT gateway.',
      'Não, precisa de um service gateway.',
    ],
    answer: 1,
    why: 'Ser pública só permite ter IP público. O caminho depende de IGW, rota, IP e regras de segurança.',
  },
  {
    q: 'Qual recurso normalmente fica em uma subnet pública?',
    options: ['Banco de dados.', 'Load balancer que atende clientes da internet.', 'Servidor de batch.', 'Instância que só fala com o Object Storage.'],
    answer: 1,
    why: 'O load balancer público precisa receber clientes da internet. Os bancos e as aplicações ficam nas subnets privadas.',
  },
];

export const privateQuiz: QuizItem[] = [
  {
    q: 'O que acontece com a VNIC de uma instância em uma subnet privada?',
    options: ['Pode receber IP público se pedir.', 'Não pode ter IP público.', 'Só pode ter IPv6.', 'Não tem IP.'],
    answer: 1,
    why: 'Em uma subnet privada, as VNICs não podem ter IPs públicos IPv4.',
  },
  {
    q: 'Uma instância privada precisa baixar atualizações da internet. Qual a solução?',
    options: ['Dar IP público a ela.', 'NAT gateway e rota 0.0.0.0/0 → NAT na route table.', 'Um LPG.', 'Mover para a região home.'],
    answer: 1,
    why: 'O NAT gateway permite saída sem expor a instância a conexões vindas da internet.',
  },
  {
    q: 'Como uma aplicação em subnet privada atende clientes da internet?',
    options: [
      'Pelo NAT gateway.',
      'Por um load balancer em subnet pública, que repassa o tráfego por IP privado.',
      'Pelo service gateway.',
      'Não é possível.',
    ],
    answer: 1,
    why: 'O balanceador recebe na subnet pública e encaminha à aplicação pelo IP privado. O NAT não aceita conexões de entrada.',
  },
  {
    q: 'Uma instância em subnet privada fala com outra em subnet pública da mesma VCN. Precisa de gateway?',
    options: ['Sim, de um internet gateway.', 'Sim, de um NAT gateway.', 'Não: a rota local é implícita. Só as regras de segurança precisam permitir.', 'Sim, de um DRG.'],
    answer: 2,
    why: 'Dentro da VCN o roteamento é local. O que controla o acesso são as security lists e os NSGs.',
  },
];

export const securityQuiz: QuizItem[] = [
  {
    q: 'Sem nenhuma regra de segurança aplicada a uma VNIC, o que acontece com o tráfego?',
    options: ['Tudo é permitido.', 'Só a saída é permitida.', 'Nada entra nem sai.', 'Só ICMP é permitido.'],
    answer: 2,
    why: 'As regras do OCI só permitem. Sem regra, o padrão é negar.',
  },
  {
    q: 'A VNIC está na subnet de uma security list e pertence a dois NSGs. Que regras valem?',
    options: ['Só as do NSG.', 'Só as da security list.', 'A união: um pacote passa se qualquer regra, de qualquer lista ou NSG, o permitir.', 'A interseção das regras.'],
    answer: 2,
    why: 'As regras aplicáveis são a união das security lists da subnet com todos os NSGs da VNIC.',
  },
  {
    q: 'A conexão falha, e o NSG e a security list estão certos. O que mais conferir?',
    options: ['O firewall do sistema operacional da instância.', 'O nome da VCN.', 'O tamanho do disco.', 'Nada, a Oracle cuida disso.'],
    answer: 0,
    why: 'As imagens de plataforma têm também regras de firewall no SO. Confira NSG, security list e o firewall da instância.',
  },
  {
    q: 'As regras de segurança são aplicadas ao tráfego para 169.254.0.0/16 (metadados da instância, iSCSI)?',
    options: ['Sim, sempre.', 'Só as stateless.', 'Não: não são aplicadas a esse tráfego.', 'Só quando a instância está em subnet pública.'],
    answer: 2,
    why: 'A Oracle informa que as regras não são aplicadas ao tráfego de 169.254.0.0/16.',
  },
];

export const nsgQuiz: QuizItem[] = [
  {
    q: 'Quantos NSGs uma VNIC pode ter?',
    options: ['1', '5', '10', '120'],
    answer: 1,
    why: 'O limite é de 5 NSGs por VNIC, e não pode ser aumentado. As 120 regras são o limite por NSG.',
  },
  {
    q: 'Qual a vantagem de uma regra de NSG sobre a de uma security list ao liberar o acesso à camada de banco?',
    options: [
      'A regra pode ter como origem outro NSG, como app-nsg, sem depender de IPs.',
      'A regra de NSG é sempre stateless.',
      'O NSG vale para a VCN inteira.',
      'O NSG não precisa de VNICs.',
    ],
    answer: 0,
    why: 'Regras de NSG aceitam outro NSG como origem ou destino. Security list só aceita CIDRs (ou service).',
  },
  {
    q: 'Quais VNICs podem entrar em um NSG?',
    options: ['Qualquer VNIC da região.', 'Só VNICs da mesma VCN do NSG.', 'Só VNICs da mesma subnet.', 'Só VNICs com IP público.'],
    answer: 1,
    why: 'Todas as VNICs de um NSG precisam estar na VCN a que o NSG pertence. As origens e destinos referenciados também.',
  },
  {
    q: 'Como se coloca uma instância em um NSG?',
    options: [
      'Pelo NSG, listando as VNICs.',
      'Pelo recurso pai, como a instância ou o load balancer. As regras valem para a VNIC dele.',
      'Pela route table.',
      'Pela security list.',
    ],
    answer: 1,
    why: 'A associação é feita no recurso pai. Para uma instância, as regras valem para a VNIC primária.',
  },
];

export const secListQuiz: QuizItem[] = [
  {
    q: 'Quantas security lists uma subnet pode usar?',
    options: ['1', '5', '10', '120'],
    answer: 1,
    why: 'Até 5 security lists por subnet. Esse limite não pode ser aumentado.',
  },
  {
    q: 'Quais são as regras da security list padrão (IPv4)?',
    options: [
      'Entrada: tudo. Saída: nada.',
      'Entrada: TCP 22, ICMP tipo 3 código 4 e ICMP tipo 3 da própria VCN. Saída: todo o tráfego. Todas stateful.',
      'Entrada: HTTP e HTTPS. Saída: nada.',
      'Nenhuma regra.',
    ],
    answer: 1,
    why: 'A lista padrão libera SSH, ICMP de Path MTU Discovery e ICMP tipo 3 da VCN na entrada, e toda a saída.',
  },
  {
    q: 'Com a security list padrão, o ping (ICMP echo) funciona?',
    options: [
      'Sim, sempre.',
      'Não. É preciso adicionar uma regra de ingress ICMP tipo 8.',
      'Sim, mas só dentro da VCN.',
      'Não, o OCI bloqueia ICMP.',
    ],
    answer: 1,
    why: 'A lista padrão não inclui o ping. Adicione uma regra stateful de ingress ICMP tipo 8, com a origem desejada.',
  },
  {
    q: 'Um tráfego casa com uma regra stateful e uma stateless na mesma direção. O que vale?',
    options: ['A stateful.', 'A stateless, e a conexão não é rastreada.', 'Nenhuma: o tráfego é negado.', 'A regra criada primeiro.'],
    answer: 1,
    why: 'A regra stateless tem precedência, e a conexão deixa de ser rastreada. A resposta precisa de regra no sentido oposto.',
  },
  {
    q: 'Quantas regras cabem em uma security list?',
    options: ['5 no total.', '120 no total.', '200 de ingress e 200 de egress.', 'Sem limite.'],
    answer: 2,
    why: 'Uma security list tem até 200 regras de ingress e 200 de egress. O NSG é que tem 120 no total.',
  },
];
