export interface DomainInfo {
  id: string;
  type: string;
  badge: string;
  heading: string;
  description: string;
  bullets: string[];
  tip: string;
}

export const DOMAINS: DomainInfo[] = [
  {
    id: 'Default',
    type: 'Free',
    badge: 'Padrão',
    heading: 'Default',
    description: 'Criado automaticamente com o tenancy, no compartimento raiz.',
    bullets: [
      'Traz o usuário e o grupo administradores iniciais e uma policy padrão que permite administrar qualquer recurso do tenancy.',
      'Não pode ser excluído. Vive o mesmo tempo que o tenancy.',
      'Começa como tipo Free. Pode mudar de tipo, mas nunca para External User nem External Active User.',
    ],
    tip: 'Use para acessar o control plane do OCI: console, API e CLI.',
  },
  {
    id: 'CorpApps',
    type: 'Premium',
    badge: 'Exemplo',
    heading: 'CorpApps (exemplo)',
    description: 'Domain que você cria para o SSO dos funcionários nas aplicações corporativas.',
    bullets: [
      'Usa o tipo Premium: federação, MFA, provisionamento e integração com apps Oracle e de terceiros.',
      'Pode ficar em qualquer compartimento e ser movido depois.',
      'O Identity Domain Administrator dele controla somente este domain, não o tenancy.',
      'Precisa ser desativado antes de ser excluído.',
    ],
    tip: 'Separar o SSO de aplicações do acesso à infraestrutura isola a administração de cada um.',
  },
  {
    id: 'Clientes',
    type: 'External User',
    badge: 'Exemplo',
    heading: 'Clientes (exemplo)',
    description: 'Domain para os consumidores da sua aplicação web.',
    bullets: [
      'Usa o tipo External User: auto-cadastro, login social, autoatendimento e consentimento.',
      'Tipos External não gerenciam acesso a recursos OCI e não têm dynamic groups.',
      'Cobrança pelos usuários armazenados.',
      'É licenciado para pessoas que não são funcionárias.',
    ],
    tip: 'Se o login fosse por usuários ativos no mês, o tipo seria External Active User.',
  },
];
