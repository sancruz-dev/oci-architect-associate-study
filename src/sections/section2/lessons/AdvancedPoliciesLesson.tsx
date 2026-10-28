import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Box } from '../../../components/ui/Box';
import { Callout } from '../../../components/ui/Callout';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { AdvancedFeaturePicker } from '../interactive/AdvancedFeaturePicker';
import { PatternTester } from '../interactive/PatternTester';
import { advancedQuiz } from '../quizzes';

export function AdvancedPoliciesLesson() {
  return (
    <LessonLayout lead="Quando verbo + recurso + local não é fino o bastante, o OCI deixa você descer ao nível da permissão, casar nomes por padrão, falar de qualquer usuário com uma condição e até dar acesso entre tenancies.">
      <Callout title="Verbos são pacotes" variant="blue">
        <p>
          inspect, read, use e manage são <b>pacotes de permissões</b>, em ordem crescente, e cada um inclui o anterior. As
          condições <code>request.permission</code> e <code>request.operation</code> permitem tirar uma peça do pacote.
        </p>
      </Callout>

      <LessonBlock tag="Interativo" title="Recursos avançados da sintaxe">
        <p>Escolha um recurso para ver um exemplo, o que ele significa e o cuidado necessário.</p>
        <AdvancedFeaturePicker />
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Padrões com *">
        <p>
          Padrões comparam nomes de buckets, objetos ou compartimentos. Escolha um padrão e veja quais nomes entram.
        </p>
        <PatternTester />
        <p style={{ marginTop: 12 }}>
          O mesmo vale para objetos, com o curinga entre aspas: <code>target.object.name = 'prod/*'</code> ou{' '}
          <code>target.object.name = '*.pdf'</code>.
        </p>
      </LessonBlock>

      <LessonBlock tag="Acesso entre tenancies" title="Define, Endorse e Admit">
        <FactGrid>
          <Fact title="Define">
            Dá um apelido a um OCID de tenancy ou de grupo. Fica na mesma policy do Endorse ou do Admit.
          </Fact>
          <Fact title="Endorse">
            Escrito no tenancy de <b>origem</b>, onde está o grupo: permite que ele aja em outro tenancy.
          </Fact>
          <Fact title="Admit">
            Escrito no tenancy de <b>destino</b>, onde estão os recursos: admite o grupo de fora.
          </Fact>
          <Fact title="Os dois lados">
            Sem o statement correspondente do outro lado, nenhum dos dois concede acesso. Para compartilhar entre regiões,
            também é preciso estar inscrito na região.
          </Fact>
        </FactGrid>
        <p style={{ marginTop: 12 }}>
          <code>Endorse ... in any-tenancy</code> vale para todos os tenancies. Para limitar a um, use o apelido criado por
          Define.
        </p>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={advancedQuiz} />
      </LessonBlock>

      <LessonBlock tag="Revisão" title="O que levar desta lição">
        <Box>
          <ul className="plain" style={{ maxWidth: 'none' }}>
            <li>
              Sem Deny: para tirar uma permissão do verbo, use <code>request.permission != '...'</code>.
            </li>
            <li>
              Padrões: <code>/ProjectA_*/</code> ou <code>'*.pdf'</code>. O nome vira controle de acesso.
            </li>
            <li>
              <code>any-user</code> = qualquer principal do tenancy. A condição é o que restringe.
            </li>
            <li>Entre tenancies: Define (apelido), Endorse (origem) e Admit (destino). Os dois lados precisam concordar.</li>
          </ul>
        </Box>
      </LessonBlock>

      <LessonSources
        links={[
          { href: 'https://docs.oracle.com/iaas/Content/Identity/Concepts/policyadvancedfeatures.htm', label: 'Advanced Policy Features' },
          { href: 'https://docs.oracle.com/en-us/iaas/Content/Object/Concepts/accessingresourcesacrosstenancies.htm', label: 'Accessing Resources Across Tenancies' },
          { href: 'https://blogs.oracle.com/cloud-infrastructure/post/configuring-oci-object-storage-access-control-policies', label: 'Configuring OCI Object Storage access control policies' },
        ]}
      />
    </LessonLayout>
  );
}
