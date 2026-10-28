import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Box, TwoCols } from '../../../components/ui/Box';
import { Callout } from '../../../components/ui/Callout';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { TagAccessSimulator } from '../interactive/TagAccessSimulator';
import { TagVariableExplorer } from '../interactive/TagVariableExplorer';
import { tbacQuiz } from '../quizzes';

export function TbacLesson() {
  return (
    <LessonLayout lead="Em vez de listar grupos e recursos em cada policy, você coloca tags neles e escreve a policy sobre a tag. Uma policy cobre milhares de recursos, e dar ou tirar acesso vira aplicar ou remover uma tag.">
      <LessonBlock tag="A ideia" title="Tag em quem pede, tag em quem sofre a ação">
        <TwoCols>
          <Box accent="blue" title="Tag no solicitante">
            <p>
              No grupo de usuários, no dynamic group ou no compartimento onde está o recurso que faz a requisição. “Quem tem
              esta tag pode...”.
            </p>
          </Box>
          <Box accent="red" title="Tag no alvo">
            <p>
              No recurso ou no compartimento em que a ação acontece. “Tudo que tem esta tag pode ser alterado por...”.
            </p>
          </Box>
        </TwoCols>
        <p style={{ marginTop: 12 }}>
          Funciona com <b>defined tags</b>, referenciadas pelo namespace e pela chave. A comparação de valores não diferencia
          maiúsculas de minúsculas.
        </p>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="As variáveis de tag">
        <p>Clique em cada uma para ver a variável, quem leva a tag e uma policy de exemplo.</p>
        <TagVariableExplorer />
      </LessonBlock>

      <LessonBlock tag="Interativo" title="O que a policy por tag do alvo concede de verdade">
        <p>
          Esta é a parte que mais cai: o que acontece em criar, em alterar e em listar. Mude a tag, a ação e a existência de
          uma policy de inspect.
        </p>
        <TagAccessSimulator />
      </LessonBlock>

      <LessonBlock tag="Padrão de mercado" title="Uma policy por permission tag">
        <p>
          O guia “OCI policy deep dive”, da Oracle, usa tags nos compartimentos para guardar <b>quais grupos</b> têm cada
          nível de acesso, e escreve uma única policy por tag:
        </p>
        <CodeBlock>
          {`Allow any-user to manage all-resources in tenancy where\n  sets-intersect(request.groups.name, target.resource.compartment.tag.mgmt.manageall)`}
        </CodeBlock>
        <p>
          <code>sets-intersect</code> compara os grupos do solicitante com a lista guardada na tag do compartimento. Para dar
          acesso a uma equipe, edita-se a tag. O número de policies depende de quantas permission tags existem, não de
          quantas equipes ou compartimentos.
        </p>
      </LessonBlock>

      <LessonBlock tag="Regras e limites" title="O que sabe quem acerta a prova">
        <FactGrid>
          <Fact title="Create não funciona">
            Policy por tag do alvo não concede criação, porque o recurso novo ainda não tem tag.
          </Fact>
          <Fact title="List/inspect à parte">
            Para ver os recursos no Console, é preciso outra policy com inspect. Sem ela, só pelo OCID, via SDK ou CLI.
          </Fact>
          <Fact title="Compartimento aninhado">
            Tag em um compartimento vale para todos os subcompartimentos dele.
          </Fact>
          <Fact title="Quem aplica tag manda">
            Quem pode aplicar a tag pode conceder acesso. Revise as policies existentes antes de marcar um recurso e controle
            quem pode aplicar tags.
          </Fact>
          <Fact title="Nomes limitados">
            Namespace e chave usados em policies só aceitam letras, números e _ @ - :. Não podem ser renomeados.
          </Fact>
          <Fact title="Suporte por serviço">
            As variáveis request.principal.* e target.resource.compartment.tag valem para todos os serviços. Já
            target.resource.tag vale só para os serviços listados na documentação.
          </Fact>
          <Fact title="Object Storage">
            Objetos não recebem tags. Use as tags do bucket com target.bucket.tag.
          </Fact>
          <Fact title="Operações com vários recursos">
            Anexar um volume, por exemplo, mexe em mais de um recurso e costuma exigir policy para cada um, algumas sem
            condição de tag.
          </Fact>
        </FactGrid>
        <Callout title="Wildcard de valor">
          <p>
            <code>target.resource.tag.HR.Project= '*'</code> aceita qualquer valor, mas o recurso precisa ter a chave.
          </p>
        </Callout>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={tbacQuiz} />
      </LessonBlock>

      <LessonBlock tag="Revisão" title="O que levar desta lição">
        <Box>
          <ul className="plain" style={{ maxWidth: 'none' }}>
            <li>
              Quatro lugares para a tag: grupo ou dynamic group, compartimento do solicitante, recurso alvo, compartimento
              alvo.
            </li>
            <li>Tag no alvo não concede create nem list. Inspect precisa de policy própria.</li>
            <li>Valores de tag não diferenciam maiúsculas. Tag de compartimento vale para os aninhados.</li>
            <li>Quem pode aplicar tag pode conceder acesso: governe essa permissão.</li>
            <li>Tags reduzem o número de statements, o que ajuda no limite de policies (próximas lições).</li>
          </ul>
        </Box>
      </LessonBlock>

      <LessonSources
        links={[
          { href: 'https://docs.oracle.com/en-us/iaas/Content/Tagging/Tasks/managingaccesswithtags.htm', label: 'Using Tags to Manage Access' },
          { href: 'https://docs.oracle.com/en/learn/oci-policy-deep-dive/index.html', label: 'OCI policy deep dive' },
          { href: 'https://blogs.oracle.com/cloudsecurity/post/manage-access-to-thousands-of-oci-resources', label: 'Manage access to thousands of OCI resources with a single policy' },
        ]}
      />
    </LessonLayout>
  );
}
