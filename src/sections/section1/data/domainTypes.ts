export const TYPE_NAMES = [
  'Free',
  'Oracle Apps',
  'Oracle Apps Premium',
  'Premium',
  'External User',
  'External Active User',
] as const;

export interface TypeCardInfo {
  who: string;
  description: string;
  billing: string;
}

/** Mesma ordem de TYPE_NAMES. */
export const TYPE_CARDS: TypeCardInfo[] = [
  {
    who: 'Administradores OCI',
    description:
      'Vem com todo tenancy. Gerencia acesso a recursos OCI de infraestrutura e plataforma. Serve para aprender IAM e operar o OCI.',
    billing: 'Sem meters. Incluído no tenancy.',
  },
  {
    who: 'Serviços Oracle SaaS e PaaS',
    description:
      'Oferecido por alguns serviços Oracle. Um domain existente também vira Oracle Apps quando um serviço registrado é anexado a ele. Gerencia acesso ao serviço contratado e a poucos apps de terceiros.',
    billing: 'Sem meters.',
  },
  {
    who: 'Apps Oracle híbridos',
    description:
      'Acrescenta IAM híbrido para apps Oracle locais ou hospedados no OCI, como E-Business Suite, PeopleSoft e Oracle Database.',
    billing: 'Com meters.',
  },
  {
    who: 'Funcionários, qualquer app',
    description:
      'Conjunto completo de recursos e os maiores limites para workforce. Todos os tipos de integração. É a escolha para padronizar o OCI IAM como IAM corporativo.',
    billing: 'Com meters.',
  },
  {
    who: 'Clientes e não funcionários',
    description:
      'Apps voltados a consumidores, login social, autoatendimento e consentimento. Escala a centenas de milhões de usuários.',
    billing: 'Cobrança por usuários armazenados.',
  },
  {
    who: 'Clientes e não funcionários',
    description: 'Mesmo conjunto do External User, com limite menor de usuários.',
    billing: 'Cobrança por usuários ativos no mês.',
  },
];

export interface Scenario {
  text: string;
  type: string;
  why: string;
}

export const SCENARIOS: Scenario[] = [
  {
    text: 'Os administradores de nuvem da empresa precisam de acesso seguro aos serviços OCI contratados.',
    type: 'Free',
    why: 'É o tipo que já vem no tenancy e cobre o gerenciamento de acesso aos recursos OCI. Basta usar o Default.',
  },
  {
    text: 'A empresa assinou um SaaS Oracle (como HCM ou ERP) e quer gerenciar o acesso a ele, com um ou dois apps de terceiros com SSO.',
    type: 'Oracle Apps',
    why: 'Oracle Apps é o domain entregue com o serviço Oracle contratado e permite poucos apps de terceiros.',
  },
  {
    text: 'A empresa quer SSO para o SaaS Oracle e também para E-Business Suite, PeopleSoft e Oracle Database, com sincronização nos dois sentidos com o Active Directory.',
    type: 'Oracle Apps Premium',
    why: 'É o tipo para cenários híbridos com apps Oracle e traz bridges de sincronização bidirecional, App Gateway e RADIUS proxy para Oracle DB.',
  },
  {
    text: 'A empresa quer padronizar o OCI IAM como IAM corporativo: funcionários, autenticação sem senha, segurança adaptativa e apps de terceiros de qualquer tipo.',
    type: 'Premium',
    why: 'Premium tem o conjunto completo de recursos e os maiores limites para workforce, com App Gateway e RADIUS proxy para qualquer aplicação.',
  },
  {
    text: 'A empresa lança um app para milhões de consumidores, com login social, auto-cadastro e aceite de termos de uso.',
    type: 'External User',
    why: 'É o tipo para não funcionários. Se a cobrança por usuários ativos no mês fizer mais sentido, a variação é External Active User.',
  },
];

/* ---------- matriz de recursos ---------- */

/** true = incluído, false = não incluído, texto = incluído com restrição. */
export type Cell = boolean | string;

export type MatrixRow =
  | { category: string }
  | { feature: string; cells: [Cell, Cell, Cell, Cell, Cell, Cell] };

const SEM_SMS = 'sem SMS';

export const FEATURE_MATRIX: MatrixRow[] = [
  { category: 'Núcleo de IAM' },
  { feature: 'Usuários e grupos', cells: [true, true, true, true, true, true] },
  { feature: 'Auto-cadastro de usuários', cells: [false, true, true, true, true, true] },
  { feature: 'Redefinição de senha (e-mail, SMS, perguntas)', cells: [SEM_SMS, true, true, true, true, true] },
  { category: 'Acesso à infraestrutura OCI' },
  { feature: 'Gerenciar acesso a recursos OCI', cells: [true, true, true, true, false, false] },
  { feature: 'Dynamic groups', cells: [true, true, true, true, false, false] },
  { feature: 'Credenciais específicas do OCI (API key, auth token)', cells: [true, true, true, true, false, false] },
  { category: 'Segurança e integração' },
  { feature: 'Federação com IdP externo e login social', cells: [true, true, true, true, true, true] },
  { feature: 'MFA e segurança adaptativa', cells: [SEM_SMS, true, true, true, true, true] },
  { feature: 'Autenticação sem senha', cells: [true, true, true, true, true, true] },
  { feature: 'Sign-on policies', cells: [true, true, true, true, true, true] },
  { feature: 'Sincronização do Active Directory para o domain (um sentido)', cells: [true, true, true, true, false, false] },
  { feature: 'Provisionamento para apps de terceiros (App Catalog)', cells: [true, true, true, true, false, false] },
  { feature: 'Tela de login hospedada', cells: [false, false, true, true, true, true] },
  { category: 'IAM híbrido' },
  { feature: 'Sincronização nos dois sentidos (LDAP e AD bridge)', cells: [false, false, true, true, false, false] },
  { feature: 'App Gateway', cells: [false, false, 'só apps Oracle', 'qualquer app', 'qualquer app', 'qualquer app'] },
  { feature: 'EBS Asserter', cells: [false, false, true, true, true, true] },
  { feature: 'RADIUS proxy', cells: [false, false, 'só Oracle DB', 'todos', false, false] },
  { feature: 'Linux PAM', cells: [false, false, true, true, false, false] },
];

/* ---------- limites ---------- */

export interface LimitMetric {
  name: string;
  /** Mesma ordem de TYPE_NAMES. 0 = não existe no tipo. */
  values: [number, number, number, number, number, number];
  note: string;
}

export const LIMITS: LimitMetric[] = [
  {
    name: 'Usuários',
    values: [2000, 1000000, 1000000, 1000000, 100000000, 10000000],
    note: 'External User chega a 100 milhões de usuários. External Active User, a 10 milhões.',
  },
  {
    name: 'Grupos',
    values: [250, 10000, 100000, 100000, 100000, 100000],
    note: 'O Free tem só 250 grupos.',
  },
  {
    name: 'Apps não Oracle',
    values: [2, 2, 10, 5000, 5000, 5000],
    note: 'Para Oracle Apps e Oracle Apps Premium, a documentação informa que o limite de 2 e de 10 apps de terceiros ainda não é aplicado, mas será no futuro.',
  },
  {
    name: 'IdPs externos',
    values: [5, 5, 30, 30, 30, 30],
    note: 'Quantidade de provedores de identidade externos e logins sociais configurados.',
  },
  {
    name: 'Sign-on policies',
    values: [5, 50, 200, 200, 200, 200],
    note: 'Free permite 5. Os tipos Premium e External, 200.',
  },
  {
    name: 'Dynamic groups',
    values: [50, 50, 50, 50, 0, 0],
    note: 'Os tipos External não têm dynamic groups, pois não gerenciam recursos OCI.',
  },
];
