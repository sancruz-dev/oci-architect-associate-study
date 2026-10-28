import { LessonBlock } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Box, TwoCols } from '../../../components/ui/Box';
import { Callout } from '../../../components/ui/Callout';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { Diagram, Figcap } from '../../../components/ui/Figcap';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { TableScroll } from '../../../components/ui/TableScroll';
import { introQuiz } from '../quizzes';
import { CompartmentTree } from '../interactive/CompartmentTree';
import { ConceptMapDiagram } from '../interactive/ConceptMapDiagram';
import { Glossary } from '../interactive/Glossary';
import { PolicyBuilder } from '../interactive/PolicyBuilder';

export function IntroLesson() {
  return (
    <LessonLayout
      lead="O IAM do OCI responde duas perguntas: quem é você e o que você pode fazer. A primeira é autenticação. A segunda é autorização."
    >
      <LessonBlock tag="Visão geral" title="Duas metades que trabalham juntas">
        <TwoCols>
          <Box accent="blue" title="Autenticação: quem é você?">
            <p>
              Acontece no <b>identity domain</b>. Aqui entram usuários, senhas, MFA, sign-on policies, federação com outro
              provedor de identidade (IdP) e SSO.
            </p>
          </Box>
          <Box accent="red" title="Autorização: o que você pode fazer?">
            <p>
              Acontece nas <b>policies</b>. Elas dizem qual grupo pode fazer o quê, em qual compartimento ou no tenancy
              inteiro.
            </p>
          </Box>
        </TwoCols>
      </LessonBlock>

      <LessonBlock tag="Mapa" title="Como as peças se encaixam">
        <Diagram>
          <ConceptMapDiagram />
        </Diagram>
        <Figcap>
          A policy liga um grupo (ou dynamic group) do identity domain a um compartimento. Os recursos ficam nos
          compartimentos, nunca dentro do domain.
        </Figcap>
      </LessonBlock>

      <LessonBlock tag="Glossário clicável" title="Os componentes que a prova cobra">
        <p>Toque em cada termo. Os azuis são de identidade. Os vermelhos são de autorização e organização.</p>
        <Glossary />
      </LessonBlock>

      <LessonBlock tag="Quem age" title="Principais: usuários, grupos e recursos">
        <p>Nem sempre quem chama uma API é uma pessoa. Uma instância de compute também pode ser o “ator”.</p>
        <TableScroll minWidth={640}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Principal</th>
                <th>O que é</th>
                <th>Como recebe permissão</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>Usuário</b>
                </td>
                <td>Pessoa ou sistema com credenciais (senha, API key, auth token).</td>
                <td>Entra em um ou mais grupos. Policies falam com grupos, não com usuários soltos.</td>
              </tr>
              <tr>
                <td>
                  <b>Grupo</b>
                </td>
                <td>Coleção de usuários com o mesmo nível de acesso.</td>
                <td>
                  Alvo direto da policy: <code>Allow group …</code>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Dynamic group</b>
                </td>
                <td>
                  Recursos (por exemplo instâncias de compute) que casam com regras de correspondência (<i>matching rules</i>
                  ).
                </td>
                <td>
                  Alvo da policy: <code>Allow dynamic-group …</code>. A instância chama serviços OCI como{' '}
                  <b>instance principal</b>, sem guardar credenciais.
                </td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <Callout title="Exemplo de dynamic group" variant="blue">
          <p>
            A regra abaixo coloca no grupo todas as instâncias de um compartimento. Uma instância nova que casa com a regra
            entra sozinha, e uma instância apagada sai.
          </p>
          <CodeBlock>ALL {'{'}instance.compartment.id = 'ocid1.compartment.oc1..exemplo'{'}'}</CodeBlock>
          <p className="mb0">
            Depois você escreve uma policy normal para ele, por exemplo{' '}
            <code>Allow dynamic-group AppServers to read objects in compartment Prod</code>. A aplicação na instância lê o
            Object Storage sem nenhuma credencial guardada.
          </p>
        </Callout>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Monte uma policy">
        <p>Toda policy segue a mesma frase. Escolha as peças e veja o que a prova espera que você leia.</p>
        <PolicyBuilder />
        <div style={{ marginTop: 12 }}>
          <TableScroll>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Verbo</th>
                  <th>O que inclui</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>inspect</code>
                  </td>
                  <td>Listar recursos, sem ver detalhes ou conteúdo.</td>
                </tr>
                <tr>
                  <td>
                    <code>read</code>
                  </td>
                  <td>Tudo de inspect, mais ler informações e metadados do recurso.</td>
                </tr>
                <tr>
                  <td>
                    <code>use</code>
                  </td>
                  <td>
                    Tudo de read, mais trabalhar com recursos existentes. As ações variam por tipo, mas em geral não inclui
                    criar nem excluir.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>manage</code>
                  </td>
                  <td>Todas as permissões sobre o tipo de recurso, inclusive criar e excluir.</td>
                </tr>
              </tbody>
            </table>
          </TableScroll>
        </div>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Herança entre compartimentos">
        <p>Compartimentos formam uma árvore. Escolha onde a policy concede acesso e veja até onde ele chega.</p>
        <CompartmentTree />
        <Callout title="Para lembrar">
          <p>
            Acesso concedido em um compartimento vale para ele e para todos os filhos. Nunca sobe para o pai e nunca vai
            para os irmãos. Conceder no tenancy cobre tudo.
          </p>
        </Callout>
      </LessonBlock>

      <LessonBlock tag="Regras que caem na prova" title="Fatos para decorar">
        <FactGrid>
          <Fact title="Tudo é negado por padrão">
            O acesso só existe se uma policy o conceder. As policies só têm <code>Allow</code>. Não existe <code>Deny</code>.
          </Fact>
          <Fact title="Grupo Administrators">
            Todo tenancy vem com o grupo Administrators e uma policy que dá acesso a tudo. Você não apaga o grupo, não altera
            a policy e sempre deve haver pelo menos um usuário nele.
          </Fact>
          <Fact title="Home region">
            Os recursos de IAM são globais, mas a definição mestre fica na home region. Você altera lá e a mudança se
            propaga para as outras regiões.
          </Fact>
          <Fact title="Atraso">Depois de aplicar uma policy pode haver uma pequena demora até ela valer.</Fact>
          <Fact title="Policy ou role: duas formas de dar poder">
            Policy é uma frase que dá acesso a recursos em compartimentos. Role é um cargo pronto dentro do domain, como
            Security Administrator (cuida de MFA e federação). Você marca a role para o usuário no console, sem escrever
            policy. O IAM soma as duas: basta uma delas permitir. A Oracle recomenda roles para administrar o domain.
          </Fact>
          <Fact title="Administrador de domain não é administrador do tenancy">
            Em um domain adicional, a role Identity Domain Administrator dá controle total só daquele domain: usuários,
            grupos, apps e segurança dele. Por si só, não dá acesso a VCN, compute nem aos outros domains. Para administrar
            o tenancy inteiro, a pessoa precisa estar no grupo Administrators.
          </Fact>
        </FactGrid>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={introQuiz} />
      </LessonBlock>
    </LessonLayout>
  );
}
