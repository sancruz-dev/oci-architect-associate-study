export type GlossaryGroup = 'identity' | 'access';

export interface GlossaryTerm {
  id: string;
  group: GlossaryGroup;
  term: string;
  definition: string;
  tip?: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    id: 'domain',
    group: 'identity',
    term: 'Identity domain',
    definition:
      'Contêiner de usuários e roles, federação, provisionamento, configuração de SSO e administração de OAuth. Representa uma população de usuários e as suas configurações de segurança, como MFA.',
    tip: 'É a unidade de autenticação. Todo tenancy novo tem o Default.',
  },
  {
    id: 'user',
    group: 'identity',
    term: 'Usuário',
    definition:
      'Pessoa ou sistema que precisa gerenciar ou usar recursos OCI. Tem uma ou mais credenciais.',
    tip: 'Os usuários finais de uma aplicação sua normalmente não são usuários IAM.',
  },
  {
    id: 'group',
    group: 'identity',
    term: 'Grupo',
    definition:
      'Coleção de usuários com o mesmo conjunto de privilégios. Todos herdam as mesmas permissões.',
    tip: 'Um usuário pode estar em vários grupos, e um grupo tem vários usuários.',
  },
  {
    id: 'dynamic-group',
    group: 'identity',
    term: 'Dynamic group',
    definition:
      'Grupo de recursos, como instâncias de compute, que casam com regras escritas por você. A participação muda conforme os recursos são criados ou apagados.',
    tip: 'Eles agem como principal e chamam APIs conforme as policies que você escrever para o dynamic group.',
  },
  {
    id: 'federation',
    group: 'identity',
    term: 'Federação e IdP',
    definition:
      'Relação de confiança entre um provedor de identidade e o OCI. Você gerencia usuários e grupos no IdP e a autorização no IAM do OCI.',
    tip: 'Usuários federados são redirecionados ao IdP quando entram no console.',
  },
  {
    id: 'mfa',
    group: 'identity',
    term: 'MFA',
    definition: 'Autenticação que exige mais de um fator para confirmar quem é o usuário.',
    tip: 'A sign-on policy do OCI Console em domains novos já exige MFA.',
  },
  {
    id: 'signon',
    group: 'identity',
    term: 'Sign-on policy',
    definition:
      'Conjunto de critérios definidos por administradores que decide se um usuário pode entrar no domain.',
    tip: 'Não confunda com policy de autorização: a sign-on policy fala de login.',
  },
  {
    id: 'role',
    group: 'identity',
    term: 'Role',
    definition:
      'Conjunto de privilégios administrativos atribuído a um usuário dentro de um identity domain.',
    tip: 'Permite delegar administração sem escrever policy.',
  },
  {
    id: 'tenancy',
    group: 'access',
    term: 'Tenancy',
    definition:
      'Compartimento raiz que contém todos os recursos da sua organização. A Oracle o cria para você. Usuários, grupos, compartimentos e algumas policies ficam diretamente nele.',
    tip: 'Os demais recursos ficam dentro de compartimentos que você cria.',
  },
  {
    id: 'compartment',
    group: 'access',
    term: 'Compartimento',
    definition:
      'Coleção de recursos relacionados, usada para organizar e isolar. Serve para medir uso e cobrança, controlar acesso por policy e separar projetos ou unidades de negócio.',
    tip: 'É onde a policy diz “in compartment”.',
  },
  {
    id: 'policy',
    group: 'access',
    term: 'Policy',
    definition:
      'Documento que diz quem pode acessar quais recursos e de que forma. O acesso é dado a grupos, em um compartimento ou no tenancy.',
    tip: 'Cobrir o tenancy cobre automaticamente todos os compartimentos dentro dele.',
  },
  {
    id: 'resource',
    group: 'access',
    term: 'Recurso',
    definition:
      'Objeto de nuvem que você cria e usa: instância de compute, volume, VCN, subnet, banco de dados, aplicação.',
    tip: 'Cada tipo tem um nome na policy, como instance-family.',
  },
  {
    id: 'network-source',
    group: 'access',
    term: 'Network source',
    definition:
      'Grupo de endereços IP, públicos ou de uma VCN, autorizados a acessar recursos do tenancy.',
    tip: 'Você usa na policy para aceitar só requisições que vêm desses IPs.',
  },
  {
    id: 'tags',
    group: 'access',
    term: 'Tags',
    definition: 'Rótulos que organizam recursos entre compartimentos, para relatórios e ações em lote.',
  },
  {
    id: 'home-region',
    group: 'access',
    term: 'Home region',
    definition:
      'Região onde ficam os recursos de IAM. Eles são globais, mas a definição mestre está em uma só região.',
    tip: 'Alterações são feitas na home region e se propagam sozinhas.',
  },
];
