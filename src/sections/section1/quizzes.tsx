import type { QuizItem } from '../../core/types';

export const introQuiz: QuizItem[] = [
  {
    q: 'Um usuário novo está em um grupo que não tem nenhuma policy. Ele tenta listar instâncias. O que acontece?',
    options: [
      'O acesso é negado.',
      'Ele consegue listar, mas não alterar.',
      'Ele herda o acesso do grupo Administrators.',
      'Depende do compartimento em que está o usuário.',
    ],
    answer: 0,
    why: 'No OCI tudo é negado por padrão. Só existe acesso se uma policy conceder, e as policies só têm Allow.',
  },
  {
    q: (
      <>
        Existe a policy <code>Allow group DevOps to manage all-resources in compartment Dev</code>. O compartimento Dev tem
        um filho chamado Teste. O grupo DevOps administra recursos em Teste?
      </>
    ),
    options: [
      'Não, só em Dev.',
      'Sim, por herança.',
      'Só se houver outra policy apontando para Teste.',
      'Só para recursos criados antes da policy.',
    ],
    answer: 1,
    why: 'O acesso concedido em um compartimento vale para ele e para todos os seus filhos.',
  },
  {
    q: 'Qual verbo permite ver detalhes de um recurso, mas não alterá-lo?',
    options: ['inspect', 'read', 'use', 'manage'],
    answer: 1,
    why: 'inspect só lista. read acrescenta ler os detalhes. use e manage já permitem alterar.',
  },
];

export const domainsQuiz: QuizItem[] = [
  {
    q: 'Qual afirmação sobre o domain Default é verdadeira?',
    options: [
      'Pode ser excluído depois de desativado.',
      'É criado com o tenancy, fica no compartimento raiz e não pode ser excluído.',
      'Só existe em tenancies pagos.',
      'Precisa ser criado manualmente pelo administrador.',
    ],
    answer: 1,
    why: 'Ele nasce com o tenancy e vive o mesmo tempo que ele. Os domains adicionais é que podem ser desativados e excluídos.',
  },
  {
    q: 'O grupo Auditores existe no domain CorpApps. Como ele aparece em uma policy?',
    options: [
      <code key="a">group Auditores</code>,
      <code key="b">group 'CorpApps'/'Auditores'</code>,
      <code key="c">group CorpApps.Auditores</code>,
      'Não é possível usar grupos de outro domain.',
    ],
    answer: 1,
    why: 'O domain vem antes do grupo, separado por barra. Sem o prefixo o IAM procura o grupo no Default.',
  },
  {
    q: 'O que é preciso fazer antes de excluir um identity domain adicional?',
    options: [
      'Mover para o compartimento raiz.',
      'Trocar o tipo para Free.',
      'Desativá-lo.',
      'Excluir o grupo Administrators dele.',
    ],
    answer: 2,
    why: 'Um domain precisa estar desativado antes de ser excluído.',
  },
];

export const typesQuiz: QuizItem[] = [
  {
    q: 'Uma empresa quer login social e auto-cadastro para milhões de clientes finais. Qual tipo combina?',
    options: ['Free', 'Oracle Apps', 'Premium', 'External User'],
    answer: 3,
    why: 'External User (ou External Active User) é para quem não é funcionário: consumidores, login social, autoatendimento e escala enorme.',
  },
  {
    q: 'Por que não dá para trocar o domain Default para External User?',
    options: [
      'Porque o Default tem usuários demais.',
      'É uma regra do serviço: o Default não pode virar External User nem External Active User.',
      'Porque External User não existe em todas as regiões.',
      'Só dá com um pedido de suporte.',
    ],
    answer: 1,
    why: 'O Default existe para administrar o OCI, e os tipos External não gerenciam recursos OCI.',
  },
  {
    q: 'Quais tipos de domain não usam meters de cobrança?',
    options: [
      'Free e Oracle Apps',
      'Premium e External User',
      'Oracle Apps Premium e Premium',
      'Todos usam meters.',
    ],
    answer: 0,
    why: 'Free e Oracle Apps não usam meters. Os demais cobram por usuários, SMS, tokens e replicação.',
  },
];
