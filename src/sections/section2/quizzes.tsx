import type { QuizItem } from '../../core/types';

export const inheritanceQuiz: QuizItem[] = [
  {
    q: 'Uma policy está anexada ao compartimento raiz (tenancy). Quem consegue alterá-la ou excluí-la?',
    options: [
      'Qualquer usuário com acesso a pelo menos um compartimento.',
      'Quem pode gerenciar policies no tenancy. Quem só tem acesso a um compartimento filho não consegue.',
      'Só o grupo Administrators, por regra fixa.',
      'Quem criou a policy, independentemente de outras permissões.',
    ],
    answer: 1,
    why: 'O ponto de anexação define quem controla a policy. Em uma policy do tenancy, é quem gerencia policies no tenancy.',
  },
  {
    q: (
      <>
        Anexada ao tenancy: <code>Allow group NetAdmins to manage virtual-network-family in compartment Operations:Prod</code>.
        Onde o grupo NetAdmins administra redes?
      </>
    ),
    options: [
      'Em Operations e em todos os filhos dele.',
      'Em todo o tenancy, porque a policy está na raiz.',
      'Só em Prod e nos compartimentos abaixo de Prod.',
      'Só em Prod, sem os filhos.',
    ],
    answer: 2,
    why: 'Onde a policy está anexada e onde ela concede acesso são coisas diferentes. O alcance vem do “in ...”, e a herança só desce: Prod e seus filhos.',
  },
  {
    q: (
      <>
        A policy anexada em Test diz <code>... in compartment A</code>, e A é movido de Test para Dev. O que acontece com essa
        policy?
      </>
    ),
    options: [
      'Ela é reescrita sozinha para Dev:A.',
      'Ela continua valendo, porque o nome A não mudou.',
      'Ela fica inválida e precisa ser removida e recriada. O grupo perde o acesso até lá.',
      'O IAM bloqueia a movimentação enquanto a policy existir.',
    ],
    answer: 2,
    why: 'A atualização automática só acontece quando a policy está anexada em um ancestral comum do pai antigo e do novo. Test não é ancestral de Dev.',
  },
  {
    q: 'Qual permissão é exigida para mover um compartimento?',
    options: [
      'manage compartments no compartimento de origem.',
      'manage all-resources no compartimento pai comum mais baixo entre origem e destino.',
      'manage policies no tenancy.',
      'use compartments no destino.',
    ],
    answer: 1,
    why: 'É preciso manage all-resources no menor compartimento que contém tanto o pai atual quanto o destino.',
  },
];

export const conditionsQuiz: QuizItem[] = [
  {
    q: (
      <>
        <code>Allow group Interns to manage instance-family in tenancy where ANY {'{'}request.utc-timestamp.month-of-year in
        ('6', '7', '8'){'}'}</code>. Esse é o <b>único</b> statement que se aplica ao grupo Interns: nenhuma outra policy, em
        qualquer compartimento, dá acesso a ele. Um estagiário tenta criar uma instância em outubro. Resultado?
      </>
    ),
    options: [
      'Permitido: any basta que uma condição exista.',
      'Negado: outubro (mês 10) não está na lista.',
      'Permitido, porque a avaliação usa o fuso do usuário.',
      'Permitido, porque o statement vale no tenancy inteiro.',
    ],
    answer: 1,
    why: 'O mês é calculado em UTC e 10 não está em (6, 7, 8). A condição é falsa e, como nenhum outro statement concede acesso, a requisição é negada. Se existisse outro statement concedendo a mesma permissão sem essa condição, o acesso seria permitido: cada statement é avaliado separadamente e basta um conceder.',
  },
  {
    q: (
      <>
        A condição é <code>all {'{'}request.networkSource.name='corpnet', request.user.mfaTotpVerified='true'{'}'}</code>. A
        requisição vem da corpnet, mas o usuário não usou MFA. O que acontece?
      </>
    ),
    options: [
      'Permitido: uma condição verdadeira já basta.',
      'Permitido, porque a rede corporativa é de confiança.',
      'Negado: all exige que todas as condições sejam verdadeiras.',
      'Negado só se o usuário for administrador.',
    ],
    answer: 2,
    why: 'all é E lógico. Com uma condição falsa, a policy não concede. any é que aceitaria só uma.',
  },
  {
    q: (
      <>
        A policy é <code>Allow group GroupAdmins to use users in tenancy where target.group.name != 'Administrators'</code>. Um
        membro tenta listar usuários (ListUsers). Por que é negado?
      </>
    ),
    options: [
      'Porque use não inclui listar.',
      'Porque ListUsers não tem target.group.name. Variável que não se aplica faz a condição ser falsa.',
      'Porque != não é suportado.',
      'Porque o grupo Administrators está bloqueado.',
    ],
    answer: 1,
    why: 'Se a variável não se aplica à operação, a condição vale falso e o pedido é negado. Resolva com outro statement sem condição, como inspect users.',
  },
  {
    q: 'O compartimento pai concede manage sem condição. No filho existe outra policy para o mesmo grupo, com condição. O que vale?',
    options: [
      'A condição do filho restringe o que o pai concede.',
      'Vale a mais restritiva das duas.',
      'O acesso do pai continua. A condição do filho não o limita, porque permissões se acumulam.',
      'As duas se anulam e o grupo fica sem acesso.',
    ],
    answer: 2,
    why: 'Se qualquer policy no alcance concede a permissão, ela vale. Condições só restringem o statement em que estão.',
  },
];

export const advancedQuiz: QuizItem[] = [
  {
    q: 'Qual statement deixa o grupo gerenciar objetos, menos excluí-los?',
    options: [
      <code key="a">Allow group G to use objects in tenancy</code>,
      <code key="b">Allow group G to manage objects in tenancy where request.permission != 'OBJECT_DELETE'</code>,
      <code key="c">Allow group G to manage objects in tenancy except delete</code>,
      <code key="d">Deny group G to delete objects in tenancy</code>,
    ],
    answer: 1,
    why: 'Policies só têm Allow, não existe Deny nem except. Para tirar uma permissão do pacote do verbo, use request.permission com !=.',
  },
  {
    q: (
      <>
        <code>where target.bucket.name=/ProjectA_*/</code> casa com qual bucket?
      </>
    ),
    options: ['logs_ProjectA', 'ProjectB_data', 'ProjectA_logs', 'projecta'],
    answer: 2,
    why: 'O * vale por qualquer sequência. O padrão exige o prefixo ProjectA_ (sem diferenciar maiúsculas) e aceita qualquer coisa depois.',
  },
  {
    q: 'Para um grupo do tenancy A acessar buckets do tenancy B, o que é necessário?',
    options: [
      'Um Endorse em A, porque A é quem sai.',
      'Um Admit em B, porque B é quem recebe.',
      'Os dois: um Endorse em A e um Admit em B. Sem o par, nada é concedido.',
      'Só um Define com o OCID do outro tenancy.',
    ],
    answer: 2,
    why: 'Os dois tenancies precisam concordar. Define só cria apelidos para OCIDs. O acesso vem do par Endorse (origem) e Admit (destino).',
  },
];

export const tbacQuiz: QuizItem[] = [
  {
    q: (
      <>
        <code>allow group GroupA to manage all-resources in compartment HR where target.resource.tag.Operations.Project='Prod'</code>.
        GroupA consegue criar uma instância nova em HR com essa policy?
      </>
    ),
    options: [
      'Sim, manage inclui criar.',
      'Sim, se a instância for marcada Prod depois.',
      'Não: o recurso novo não tem tag para a condição avaliar. Policies por tag do alvo não concedem criação.',
      'Não, porque manage não vale em compartimentos com tag.',
    ],
    answer: 2,
    why: 'A condição olha a tag do recurso alvo, que ainda não existe na criação. É preciso uma policy sem essa condição para criar.',
  },
  {
    q: 'Os usuários de GroupA têm a policy por tag do alvo, mas não acham as instâncias na lista do Console. O que falta?',
    options: [
      'Uma policy separada com inspect (ou read) nos recursos do compartimento.',
      'Renomear a tag.',
      'Subir o verbo para manage em todo o tenancy.',
      'Nada: é um atraso normal de propagação.',
    ],
    answer: 0,
    why: 'Policies por tag do alvo não concedem listar nem inspecionar. Sem isso, só se chega ao recurso pelo OCID, via SDK ou CLI.',
  },
  {
    q: 'O recurso tem a tag Operations.Project = prod (minúsculas). A condição é Project = \'Prod\'. O que acontece?',
    options: [
      'Não casa: valores de tag diferenciam maiúsculas.',
      'Casa: valores de tag não diferenciam maiúsculas de minúsculas.',
      'Dá erro de sintaxe.',
      'Casa só se a tag for de namespace padrão.',
    ],
    answer: 1,
    why: 'Os valores de tag na policy são comparados sem diferenciar maiúsculas de minúsculas.',
  },
  {
    q: 'Qual variável faz a tag valer para um compartimento e todos os seus subcompartimentos?',
    options: [
      <code key="a">request.principal.group.tag</code>,
      <code key="b">target.resource.tag</code>,
      <code key="c">target.resource.compartment.tag</code>,
      <code key="d">request.operation</code>,
    ],
    answer: 2,
    why: 'Uma tag no compartimento alvo se aplica a todos os compartimentos aninhados. Já target.resource.tag olha a tag do recurso em si.',
  },
];

export const networkQuiz: QuizItem[] = [
  {
    q: 'Você quer que o grupo FinanceAdmins só gerencie buckets quando a requisição vier do IP do escritório. O que usar?',
    options: [
      'Um dynamic group com o IP do escritório.',
      'Uma regra de entrada em uma security list.',
      'Um network source e a condição request.networkSource.name na policy.',
      'Uma tag de IP no grupo.',
    ],
    answer: 2,
    why: 'Network source define de onde a requisição pode vir (IPs) e a policy o referencia pelo nome. Dynamic group define quem (recursos como principal), não o IP.',
  },
  {
    q: 'Onde um network source pode ser criado?',
    options: [
      'Em qualquer compartimento.',
      'Só no compartimento raiz (tenancy), na home region, e é usado no tenancy todo.',
      'Em cada região separadamente.',
      'Só dentro de um identity domain adicional.',
    ],
    answer: 1,
    why: 'Network sources são criados no compartimento raiz, ficam na home region e valem para o tenancy inteiro.',
  },
  {
    q: 'Qual a diferença entre um network source e uma security list ou NSG?',
    options: [
      'Nenhuma: são o mesmo recurso.',
      'Security list e NSG filtram pacotes na rede. O network source restringe o acesso do IAM, conforme a origem da requisição.',
      'O network source só funciona para o Compute.',
      'A security list é por usuário e o network source é por VCN.',
    ],
    answer: 1,
    why: 'São camadas diferentes. O network source é uma camada a mais sobre security lists e NSGs, aplicada na autorização.',
  },
];

export const dynamicQuiz: QuizItem[] = [
  {
    q: 'Qual é a função de um dynamic group?',
    options: [
      'Agrupar usuários humanos que entram e saem com frequência.',
      'Agrupar recursos do OCI (instâncias, funções...) por regras, para que eles ajam como principals em policies.',
      'Limitar de quais IPs vêm as requisições.',
      'Replicar grupos entre regiões.',
    ],
    answer: 1,
    why: 'O dynamic group reúne recursos por matching rules. Com isso, uma instância chama serviços do OCI sem credenciais guardadas (instance principal).',
  },
  {
    q: (
      <>
        <code>All {'{'}instance.compartment.id = '&lt;Prod&gt;', tag.department.operations.value = '45'{'}'}</code>. Uma instância em Prod
        sem essa tag pertence ao dynamic group?
      </>
    ),
    options: [
      'Sim, porque está em Prod.',
      'Não: all exige as duas condições.',
      'Sim, porque tags são opcionais.',
      'Depende da região.',
    ],
    answer: 1,
    why: 'all é E lógico. Sem a tag, a segunda condição é falsa e a instância fica de fora.',
  },
  {
    q: 'Uma instância já cai nas regras do dynamic group AppServers. Quais permissões ela tem?',
    options: [
      'As mesmas de quem criou a instância.',
      'Todas as do grupo Administrators.',
      'Nenhuma ainda. É preciso uma policy como Allow dynamic-group AppServers to read objects in compartment ...',
      'As do compartimento em que ela está, automaticamente.',
    ],
    answer: 2,
    why: 'Dynamic group só define quem. O acesso sai de uma policy escrita para ele. O padrão do OCI é negar.',
  },
  {
    q: 'Uma regra de dynamic group pode usar tags free-form?',
    options: [
      'Sim, qualquer tag.',
      'Só as de valor numérico.',
      'Não: a documentação diz que as policies do IAM não suportam free-form tags. Use defined tags.',
      'Só em tenancies pagos.',
    ],
    answer: 2,
    why: 'Matching rules referenciam tag.<namespace>.<chave>.value, que é uma defined tag. Free-form não é suportada.',
  },
];

export const optimizationQuiz: QuizItem[] = [
  {
    q: 'Por que statements no compartimento raiz pesam mais no limite de policies do que statements em um compartimento folha?',
    options: [
      'Porque policies na raiz são mais lentas.',
      'Porque o limite documentado é por hierarquia de compartimentos e o total conta os statements da raiz até o compartimento alvo. Um statement na raiz entra na conta de todas as hierarquias.',
      'Porque só a raiz tem limite.',
      'Não pesam mais: o limite é por usuário.',
    ],
    answer: 1,
    why: 'A Oracle documenta o máximo de 500 statements por hierarquia de compartimentos, somando do tenancy até o alvo. Por isso mover statements para perto do alvo alivia outras ramificações.',
  },
  {
    q: 'O pai concede manage em uma família de recursos. O filho tem um statement condicional para um subconjunto das mesmas permissões. O que fazer na otimização?',
    options: [
      'Manter, porque a condição restringe o acesso.',
      'Mover o statement do pai para o filho.',
      'Trocar manage por use no pai e manter o filho.',
      'Remover o statement do filho: a condição não limita o que o pai concede.',
    ],
    answer: 3,
    why: 'Permissões se acumulam e uma condição em outro statement não as reduz. O statement do filho é redundante.',
  },
  {
    q: 'Dois grupos, NetAdmins-A e NetAdmins-B, têm exatamente os mesmos usuários e cada um administra redes em um compartimento filho de Shared. Como reduzir?',
    options: [
      'Dar manage all-resources na raiz para os dois.',
      'Unir em um só grupo e escrever um statement em Shared com where any {target.compartment.name = ...} listando os dois compartimentos.',
      'Criar um dynamic group com os dois.',
      'Apagar as policies e usar só tags free-form.',
    ],
    answer: 1,
    why: 'Mesma lista de membros permite um grupo só, com a policy no ancestral comum e a condição limitando aos compartimentos desejados.',
  },
  {
    q: 'Segundo o material da Oracle, qual abordagem é mais duradoura do que as técnicas de enxugar statements?',
    options: [
      'Duplicar as policies em cada região.',
      'Aumentar o número de grupos.',
      'Controle de acesso baseado em tags (tag-based access control).',
      'Usar apenas o verbo manage.',
    ],
    answer: 2,
    why: 'As técnicas de otimização são em geral paliativas para quem está perto do limite. Com tags, dar ou tirar acesso vira editar a tag, e as policies deixam de crescer.',
  },
];
