export const VERBS = ['inspect', 'read', 'use', 'manage'] as const;
export type Verb = (typeof VERBS)[number];

export const VERB_TEXT: Record<Verb, string> = {
  inspect: 'listar os recursos, sem ver detalhes',
  read: 'listar e ler os detalhes, sem alterar',
  use: 'trabalhar com recursos que já existem (em geral sem criar nem excluir)',
  manage: 'fazer tudo, inclusive criar e excluir',
};

export const SUBJECTS = [
  'group Auditores',
  'group AdminsDeRede',
  'group DevOps',
  'dynamic-group AppServers',
];

export const RESOURCES: Record<string, string> = {
  'all-resources': 'todos os tipos de recurso',
  'instance-family': 'instâncias de compute e itens relacionados',
  'virtual-network-family': 'VCNs, subnets, gateways e tabelas de rota',
  'volume-family': 'volumes de bloco e seus backups',
  'object-family': 'buckets e objetos do Object Storage',
};

export const LOCATIONS: Record<string, string> = {
  tenancy: 'em todo o tenancy, o que inclui todos os compartimentos por herança',
  'compartment Prod': 'no compartimento Prod e nos filhos dele, App e Banco',
  'compartment Dev': 'no compartimento Dev e no filho dele, Teste',
};
