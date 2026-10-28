import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Box, TwoCols } from '../../../components/ui/Box';
import { Callout } from '../../../components/ui/Callout';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { AttachmentExplorer } from '../interactive/AttachmentExplorer';
import { MoveCompartmentCases } from '../interactive/MoveCompartmentCases';
import { inheritanceQuiz } from '../quizzes';

export function InheritanceLesson() {
  return (
    <LessonLayout lead="Toda policy mora em um compartimento. Onde ela mora decide quem pode editá-la. Onde ela concede acesso é outra decisão, escrita no “in ...” do statement.">
      <Callout title="A confusão mais comum" variant="blue">
        <p>
          <b>Anexação</b> responde “quem gerencia esta policy?”. <b>Localização</b> (o <code>in ...</code>) responde “onde ela
          dá acesso?”. Uma policy anexada no tenancy pode dar acesso só em Prod.
        </p>
      </Callout>

      <LessonBlock tag="Anexação" title="Em qual compartimento a policy fica">
        <p>Toda policy é anexada ao compartimento raiz (o tenancy) ou a um compartimento filho.</p>
        <TwoCols>
          <Box accent="red" title="Anexada no tenancy">
            <p>
              Quem pode gerenciar policies no tenancy pode alterá-la ou excluí-la. Quem só tem acesso a um compartimento
              filho não consegue. É o lugar das policies que valem para o tenancy todo.
            </p>
          </Box>
          <Box accent="blue" title="Anexada em um compartimento filho">
            <p>
              Quem gerencia policies naquele compartimento a controla. Assim, o administrador de Prod cuida das policies de
              Prod, sem ganhar poder sobre o resto do tenancy.
            </p>
          </Box>
        </TwoCols>
        <p style={{ marginTop: 12 }}>
          Para anexar a um compartimento, você precisa estar nele ao criar a policy.
        </p>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Anexar × dar acesso">
        <p>
          Escolha onde a policy fica e onde ela deve dar acesso. Veja o texto do “in ...”, quem a edita e se o alcance é
          possível. Tente anexar em HR e dar acesso em Prod.
        </p>
        <AttachmentExplorer />
      </LessonBlock>

      <LessonBlock tag="Herança" title="O acesso desce, nunca sobe">
        <p>
          Um grupo com acesso a um tipo de recurso em um compartimento tem o mesmo acesso em todos os compartimentos abaixo
          dele. O exemplo clássico é o grupo Administrators: a policy padrão permite gerenciar tudo no tenancy, e por herança
          vale em todos os compartimentos.
        </p>
        <FactGrid>
          <Fact title="Desce">Acesso em Operations vale em Dev e Prod, e em qualquer filho que vier a existir.</Fact>
          <Fact title="Não sobe">Acesso em Prod não vale em Operations nem no tenancy.</Fact>
          <Fact title="Não vai para o lado">Acesso em Prod não vale em Dev, nem em HR.</Fact>
          <Fact title="Anexar não é alcançar">O alcance vem do “in ...”. O ponto de anexação só decide quem edita a policy.</Fact>
        </FactGrid>
      </LessonBlock>

      <LessonBlock tag="Sintaxe" title="Como escrever o compartimento">
        <p>Há três formas de indicar o local:</p>
        <CodeBlock>
          {`in tenancy\nin compartment Project-A\nin compartment Project-A:Project-A2\nin compartment id ocid1.compartment.oc1..<unique_ID>`}
        </CodeBlock>
        <ul className="plain">
          <li>
            Se o compartimento não é filho direto do ponto de anexação, o caminho usa <b>dois-pontos</b>:{' '}
            <code>Project-A:Project-A2</code>.
          </li>
          <li>
            O caminho é lido <b>a partir do compartimento onde a policy está anexada</b>. Anexada no tenancy, escreve-se
            <code> Operations:Prod</code>. Anexada em Operations, só <code>Prod</code>.
          </li>
          <li>
            Com <code>compartment id</code> e o OCID não há dúvida de caminho, e o statement não depende do nome.
          </li>
        </ul>
      </LessonBlock>

      <LessonBlock tag="Cuidado" title="O que acontece ao mover um compartimento">
        <p>
          Mover muda quem herda o quê. Depois do movimento, valem as policies do novo pai, e as do pai antigo deixam de
          valer. Quem tinha acesso na origem perde, e quem tinha acesso no destino ganha.
        </p>
        <p>
          As policies que citam o caminho do compartimento só são reescritas sozinhas quando estão anexadas em um
          <b> ancestral comum</b> ao pai antigo e ao novo. Clique nos três casos:
        </p>
        <MoveCompartmentCases />
        <FactGrid>
          <Fact title="Permissão">
            manage all-resources no menor compartimento que contém a origem e o destino.
          </Fact>
          <Fact title="Quotas">As quotas do destino não são verificadas. O destino pode ficar acima do limite.</Fact>
          <Fact title="Tags">Tags não são atualizadas na mudança. Tags padrão do pai antigo continuam nos recursos.</Fact>
          <Fact title="Bloqueios">
            Não move se origem ou destino estão em uma security zone, ou se o destino já tem um compartimento com o mesmo
            nome.
          </Fact>
          <Fact title="Profundidade">A hierarquia aceita até 6 níveis de compartimentos aninhados.</Fact>
        </FactGrid>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={inheritanceQuiz} />
      </LessonBlock>

      <LessonBlock tag="Revisão" title="O que levar desta lição">
        <Box>
          <ul className="plain" style={{ maxWidth: 'none' }}>
            <li>Toda policy é anexada ao tenancy ou a um compartimento. O ponto de anexação decide quem a gerencia.</li>
            <li>
              O acesso concedido em um compartimento vale nele e nos filhos. Nunca sobe e nunca vai para o lado.
            </li>
            <li>
              Caminho de compartimento: <code>A:B</code>, lido a partir do ponto de anexação. Alternativa: <code>compartment id</code>.
            </li>
            <li>
              Mover um compartimento troca as policies que valem para ele. A atualização automática do caminho exige policy
              em um ancestral comum.
            </li>
          </ul>
        </Box>
      </LessonBlock>

      <LessonSources
        links={[
          { href: 'https://docs.oracle.com/en-us/iaas/Content/Identity/policieshow/Policy_Attachment.htm', label: 'Policy Attachment' },
          { href: 'https://docs.oracle.com/en-us/iaas/Content/Identity/Concepts/policysyntax.htm', label: 'Policy Syntax' },
          { href: 'https://docs.oracle.com/en-us/iaas/Content/Identity/compartments/Working_with_Compartments.htm', label: 'Working with Compartments' },
        ]}
      />
    </LessonLayout>
  );
}
