export interface Technique {
  id: string;
  chip: string;
  title: string;
  before: string;
  after: string;
  why: string;
  watch: string;
}

export const TECHNIQUES: Technique[] = [
  {
    id: 'dup',
    chip: '1. Duplicadas e superadas',
    title: 'Apague o que a herança e o verbo maior já cobrem',
    before:
      'Allow group NetAdmins to manage virtual-network-family in compartment Operations\nAllow group NetAdmins to use virtual-network-family in compartment Operations:Prod\nAllow group NetAdmins to manage virtual-network-family in compartment Operations:Prod',
    after: 'Allow group NetAdmins to manage virtual-network-family in compartment Operations',
    why: 'O acesso desce para os filhos, então os dois últimos statements não acrescentam nada. Verbos crescem de inspect a manage, e cada um inclui os anteriores: manage cobre use.',
    watch: 'Confira se as permissões realmente coincidem antes de apagar.',
  },
  {
    id: 'child',
    chip: '2. Condição no filho',
    title: 'Condição no filho não limita o que o pai concede',
    before:
      "Allow group NetAdmins to manage virtual-network-family in compartment Operations\nAllow group NetAdmins to manage virtual-network-family in compartment Operations:Prod\n  where request.operation != 'DeleteVcn'",
    after: 'Allow group NetAdmins to manage virtual-network-family in compartment Operations',
    why: 'Permissões se acumulam. Se qualquer policy no alcance concede, vale, mesmo que a condição do outro statement dê falso. O segundo statement é inútil.',
    watch: 'Se a intenção era impedir DeleteVcn em Prod, o erro está no statement do pai: restrinja lá.',
  },
  {
    id: 'sameMembers',
    chip: '3. Grupos com os mesmos membros',
    title: 'Um grupo, uma policy no ancestral comum',
    before:
      'Allow group NetAdmins-A to manage virtual-network-family in compartment Shared:Net-A\nAllow group NetAdmins-B to manage virtual-network-family in compartment Shared:Net-B',
    after:
      "Allow group NetAdmins to manage virtual-network-family in compartment Shared\n  where any {target.compartment.name = 'Net-A', target.compartment.name = 'Net-B'}",
    why: 'Se NetAdmins-A e NetAdmins-B têm os mesmos usuários, junte em um grupo. A condição em target.compartment.name impede que o acesso se espalhe pelo resto de Shared.',
    watch: 'Se os grupos têm membros diferentes, é possível combinar request.groups.id com target.compartment.name, mas o statement fica bem mais complexo.',
  },
  {
    id: 'groups',
    chip: '4. Vários grupos no statement',
    title: 'Liste os grupos juntos',
    before:
      'Allow group NetOps-1 to use subnets in compartment A\nAllow group NetOps-2 to use subnets in compartment A',
    after: 'Allow group NetOps-1, NetOps-2 to use subnets in compartment A',
    why: 'Mesmo verbo, mesmo recurso, mesmo local: um statement só, com os grupos separados por vírgula.',
    watch: 'Só vale quando as permissões são idênticas.',
  },
  {
    id: 'perms',
    chip: '5. Lista de permissões',
    title: 'Junte statements com permissões diretas',
    before:
      'Allow group X to use subnets in compartment A\nAllow group X to manage instances in compartment A',
    after:
      'Allow group X { SUBNET_READ, SUBNET_ATTACH, SUBNET_DETACH,\n  INSTANCE_INSPECT, INSTANCE_READ, ... } in compartment A',
    why: 'Em vez de dois verbos, você lista só as permissões de que o caso de uso precisa. Reduz statements e pode até ser mais restritivo que os verbos.',
    watch: 'Lista abreviada aqui, na sintaxe do artigo da Oracle: confirme na documentação antes de usar. Fica mais difícil de ler, e condições que valem para um statement só (como exigir MFA) impedem a fusão.',
  },
  {
    id: 'pattern',
    chip: '6. Padrões em nomes',
    title: 'Um padrão no lugar de vários compartimentos',
    before:
      'Allow group ProjectXAdmin to manage all-resources in compartment ProjectX-Prod\nAllow group ProjectXAdmin to manage all-resources in compartment ProjectX-Dev\nAllow group ProjectXAdmin to manage all-resources in compartment ProjectX-Test',
    after:
      'Allow group ProjectXAdmin to manage all-resources in tenancy\n  where target.compartment.name=/ProjectX*/',
    why: 'O padrão casa por nome, então compartimentos novos que seguem a convenção já entram.',
    watch: 'Nomear compartimentos passa a ser decisão de segurança. Alternativa parecida: colocar os compartimentos do projeto sob um pai comum e dar acesso no pai.',
  },
  {
    id: 'tags',
    chip: '7. Tags (solução duradoura)',
    title: 'Uma policy por permission tag',
    before:
      'Allow group TeamA to manage all-resources in compartment Finance\nAllow group TeamB to manage all-resources in compartment HR\nAllow group TeamA to manage database-family in compartment HR\n... (cresce a cada equipe e compartimento)',
    after:
      'Allow any-user to manage all-resources in tenancy where\n  sets-intersect(request.groups.name, target.resource.compartment.tag.mgmt.manageall)',
    why: 'A tag do compartimento guarda quais grupos têm o acesso. Dar ou tirar acesso vira editar a tag, e o número de statements não cresce com as equipes.',
    watch: 'Quem pode aplicar tags passa a poder conceder acesso. Controle essa permissão.',
  },
];
