import { LessonBlock } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Box, TwoCols } from '../../../components/ui/Box';
import { Pill, PillRow } from '../../../components/ui/Pill';
import { TableScroll } from '../../../components/ui/TableScroll';
import { domainsQuiz } from '../quizzes';
import { DomainExplorer } from '../interactive/DomainExplorer';
import { DomainPolicyDemo } from '../interactive/DomainPolicyDemo';

const DEFAULT_VS_EXTRA: Array<[string, string, string]> = [
  ['Criação', 'Automática com o tenancy, no compartimento raiz', 'Você cria quando precisa'],
  ['Exclusão', 'Não pode. Vive o mesmo tempo que o tenancy.', 'Pode, depois de desativar'],
  [
    'Conteúdo inicial',
    'Usuário e grupo administradores iniciais e a policy padrão de administração',
    'Vazio, só com o que você configurar',
  ],
  ['Administrador do domain', 'Controla o domain Default', 'Controla somente aquele domain'],
  ['Uso recomendado', 'Acesso ao control plane do OCI', 'Apps, clientes, parceiros, administração separada'],
  [
    'Trocar de tipo',
    'Pode, mas nunca para External User ou External Active User',
    'Pode, respeitando as regras da lição 3',
  ],
  ['Local', 'Raiz', 'Qualquer compartimento, e pode ser movido entre eles'],
];

const CONTENTS = [
  'Usuários e roles',
  'SSO',
  'Federação com IdP',
  'Provisionamento (SCIM)',
  'MFA e segurança adaptativa',
  'Sign-on policies',
  'OAuth',
  'Autoatendimento de senha e perfil',
  'Auditoria e relatórios',
  'Branding da tela de login',
];

export function DomainsLesson() {
  return (
    <LessonLayout lead="Um identity domain é uma população de usuários com as suas próprias regras de segurança. Todo tenancy novo já nasce com um.">
      <LessonBlock tag="Definição" title="O que cabe dentro de um domain">
        <p>
          Cada identity domain é uma solução de IAM completa e independente, com seus usuários, grupos, aplicações e
          configurações. Ele cuida de:
        </p>
        <PillRow>
          {CONTENTS.map((c) => (
            <Pill key={c}>{c}</Pill>
          ))}
        </PillRow>
      </LessonBlock>

      <LessonBlock tag="Contexto" title="De onde vem o domain">
        <TwoCols>
          <Box title="Antes">
            <p>
              Duas coisas separadas: o IAM nativo do OCI (para recursos de infraestrutura) e o Oracle Identity Cloud
              Service, o IDCS (para aplicações e SaaS).
            </p>
          </Box>
          <Box accent="blue" title="Agora">
            <p>
              O IAM com identity domains junta os dois. O IAM nativo antigo virou o <b>Default domain</b>. As instâncias do
              IDCS (os <i>stripes</i>) viram domains. Você escolhe o domain ao entrar no console, depois de informar o
              tenancy.
            </p>
          </Box>
        </TwoCols>
        <p style={{ marginTop: 12 }}>
          Como saber se o seu tenancy já usa domains: no console, abra <b>Identity &amp; Security → Identity</b>. Se
          aparecer <b>Domains</b>, ele usa.
        </p>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Domains dentro de um tenancy">
        <p>
          Toque em um domain para ver o que muda entre o Default e os que você cria. Os domains <b>CorpApps</b> e{' '}
          <b>Clientes</b> são exemplos.
        </p>
        <DomainExplorer />
      </LessonBlock>

      <LessonBlock tag="Comparação" title="Default × domain adicional">
        <TableScroll minWidth={640}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Aspecto</th>
                <th>Default</th>
                <th>Adicional</th>
              </tr>
            </thead>
            <tbody>
              {DEFAULT_VS_EXTRA.map(([aspect, def, extra]) => (
                <tr key={aspect}>
                  <td>{aspect}</td>
                  <td>{def}</td>
                  <td>{extra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Policies e domains">
        <p>
          Grupos agora pertencem a um domain. Na policy, o nome do domain vem antes do grupo, separado por barra. Sem o
          prefixo, o IAM assume o Default.
        </p>
        <DomainPolicyDemo />
        <p style={{ marginTop: 12 }}>
          Policies também podem permitir que usuários de um domain acessem recursos que pertencem a outro domain. É assim
          que domains separados continuam conversando com a infraestrutura.
        </p>
      </LessonBlock>

      <LessonBlock tag="Operação" title="Dois níveis de gerenciamento">
        <TwoCols>
          <Box accent="red" title="O domain em si">
            <p>
              Criar, listar, editar, mover entre compartimentos, ativar, desativar, trocar de tipo, replicar para outras
              regiões, redefinir todas as senhas e excluir.
            </p>
            <p className="muted" style={{ fontSize: 14 }}>
              Feito pelo console ou pela <b>IAM API</b>.
            </p>
          </Box>
          <Box accent="blue" title="O que existe dentro do domain">
            <p>Usuários, grupos, aplicações, sign-on policies e demais objetos.</p>
            <p className="muted" style={{ fontSize: 14 }}>
              Feito pelo console ou pela <b>IAM Identity Domains API</b>, baseada em SCIM.
            </p>
          </Box>
        </TwoCols>
        <ul className="plain" style={{ marginTop: 12 }}>
          <li>
            Para gerenciar domains você precisa da role <b>Identity Domain Administrator</b>.
          </li>
          <li>
            Um domain precisa estar <b>desativado</b> antes de ser excluído.
          </li>
          <li>
            Domains podem ser replicados para várias regiões e oferecem recuperação de desastre entre regiões no modelo
            ativo-passivo.
          </li>
        </ul>
      </LessonBlock>

      <LessonBlock tag="Segurança" title="Como o login é protegido">
        <ul className="plain">
          <li>
            Uma <b>sign-on policy</b> define as condições para um usuário entrar no domain. A do OCI Console de um domain
            novo já exige MFA.
          </li>
          <li>
            Com <b>federação</b>, você gerencia usuários e grupos no IdP externo (como Okta ou Microsoft Entra ID) e
            continua gerenciando a autorização no IAM do OCI.
          </li>
          <li>
            O domain Default mantém sempre um caminho de entrada de reserva, para o administrador nunca ficar trancado do
            lado de fora.
          </li>
        </ul>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={domainsQuiz} />
      </LessonBlock>
    </LessonLayout>
  );
}
