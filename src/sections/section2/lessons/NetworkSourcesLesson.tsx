import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Box } from '../../../components/ui/Box';
import { Callout } from '../../../components/ui/Callout';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { TableScroll } from '../../../components/ui/TableScroll';
import { NetworkSourceSimulator } from '../interactive/NetworkSourceSimulator';
import { networkQuiz } from '../quizzes';

export function NetworkSourcesLesson() {
  return (
    <LessonLayout lead="Um network source é uma lista de IPs que você nomeia e usa em uma policy. Resposta curta para “de onde” a requisição pode vir. Não confunda com “quem” a faz.">
      <LessonBlock tag="Definição" title="O que é e como usar">
        <p>
          É um conjunto de endereços IP ou intervalos, sem custo, que restringe o acesso aos recursos do OCI conforme a
          origem da requisição. Pode misturar dois tipos de entrada:
        </p>
        <ul className="plain">
          <li>
            <b>IPs públicos</b>, para o tráfego de entrada pela internet (norte-sul).
          </li>
          <li>
            <b>IPs privados de uma VCN</b>, para o tráfego interno (leste-oeste). Você escolhe a VCN ao criar.
          </li>
        </ul>
        <p>A policy referencia o network source pelo nome:</p>
        <Box>
          <p className="mono mb0" style={{ overflowWrap: 'anywhere' }}>
            Allow group &lt;grupo&gt; to &lt;verbo&gt; instance-family in tenancy where request.networkSource.name='&lt;NomeDoNetworkSource&gt;'
          </p>
        </Box>
        <p style={{ marginTop: 12 }}>
          O acesso só vale quando a requisição vem de um IP que está no network source. Funciona para todos os serviços do
          OCI.
        </p>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="De onde veio a requisição?">
        <NetworkSourceSimulator />
      </LessonBlock>

      <LessonBlock tag="Regras" title="Onde fica e quem gerencia">
        <FactGrid>
          <Fact title="Só no tenancy">
            É criado apenas no compartimento raiz. Fica na home region e vale para o tenancy todo.
          </Fact>
          <Fact title="Permissão própria">
            <code>Allow group G to manage network-sources in tenancy</code>. O grupo Administrators já tem.
          </Fact>
          <Fact title="Console">Identity &amp; Security → Network Sources.</Fact>
          <Fact title="Login">
            Também pode entrar nas Authentication settings, para restringir de onde o login no Console é aceito.
          </Fact>
        </FactGrid>
        <Callout title="Cuidado com o bloqueio">
          <p>
            Restringir o login por rede pode trancar o próprio administrador. A saída é autenticar por SDK com uma API
            signing key e mudar a restrição por código. Se não der, só o suporte da Oracle resolve.
          </p>
        </Callout>
      </LessonBlock>

      <LessonBlock tag="Comparação" title="Não confunda com estes">
        <TableScroll minWidth={620}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Recurso</th>
                <th>Pergunta que responde</th>
                <th>Atua em</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Network source</td>
                <td>De qual IP vem a requisição?</td>
                <td>Autorização (IAM)</td>
              </tr>
              <tr>
                <td>Dynamic group</td>
                <td>Qual recurso está agindo como principal?</td>
                <td>Quem (IAM)</td>
              </tr>
              <tr>
                <td>Security list / NSG</td>
                <td>Este pacote pode passar pela rede?</td>
                <td>Rede (VCN)</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={networkQuiz} />
      </LessonBlock>

      <LessonBlock tag="Revisão" title="O que levar desta lição">
        <Box>
          <ul className="plain" style={{ maxWidth: 'none' }}>
            <li>
              Network source = lista de IPs nomeada. Policy: <code>where request.networkSource.name='...'</code>.
            </li>
            <li>Aceita IPs públicos e IPs privados de VCN no mesmo network source.</li>
            <li>Criado só no compartimento raiz, na home region, válido para o tenancy.</li>
            <li>É “de onde”. Dynamic group é “quem”. Security list e NSG são rede.</li>
          </ul>
        </Box>
      </LessonBlock>

      <LessonSources
        links={[
          { href: 'https://blogs.oracle.com/cloud-infrastructure/post/network-sources-protect-oci-resources', label: 'Network sources protect OCI resources' },
          { href: 'https://docs.oracle.com/iaas/Content/Identity/Concepts/policyadvancedfeatures.htm', label: 'Advanced Policy Features' },
        ]}
      />
    </LessonLayout>
  );
}
