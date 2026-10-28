import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Box } from '../../../components/ui/Box';
import { Callout } from '../../../components/ui/Callout';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { OptimizationLab } from '../interactive/OptimizationLab';
import { optimizationQuiz } from '../quizzes';

export function OptimizationLesson() {
  return (
    <LessonLayout lead="O OCI limita quantas policies e statements você pode ter. Quem cresce sem cuidado esbarra no limite. Otimizar é dizer o mesmo acesso com menos statements, sem abrir mais do que devia.">
      <LessonBlock tag="Por que" title="O limite">
        <p>
          A Oracle limita o número de documentos de policy e de statements para evitar problemas de latência e escala. O
          valor documentado é de <b>500 statements por hierarquia de compartimentos</b>, e a conta soma os statements da
          raiz até o compartimento alvo. Por isso:
        </p>
        <ul className="plain">
          <li>Um statement na raiz entra na conta de todas as hierarquias.</li>
          <li>
            Statements da raiz que só servem a um ramo (como <code>Finance:Payments</code>) aliviam as outras
            ramificações se descerem para perto do alvo.
          </li>
        </ul>
        <Callout title="Confira os números atuais" variant="blue">
          <p>
            Os limites mudam. Veja a página “IAM With Identity Domains Limits”, nos service limits da Oracle, para os valores
            atuais de policies, statements e tamanhos.
          </p>
        </Callout>
      </LessonBlock>

      <LessonBlock tag="Duas regras que sustentam tudo" title="Permissões se acumulam e verbos se contêm">
        <FactGrid>
          <Fact title="Acumulam">
            Se qualquer policy no alcance concede a permissão, ela vale. Nenhum statement reduz o que outro concede.
          </Fact>
          <Fact title="Herdam">
            O que o pai concede o filho já tem. Repetir no filho é desperdício.
          </Fact>
          <Fact title="Verbos se contêm">
            inspect ⊂ read ⊂ use ⊂ manage. manage cobre use no mesmo recurso.
          </Fact>
          <Fact title="Condição não corrige o pai">
            Restringir só no filho não funciona. Para limitar, restrinja onde a permissão nasce.
          </Fact>
        </FactGrid>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="As técnicas, com antes e depois">
        <p>
          Sete técnicas, da mais simples à mais duradoura. A contagem de statements aparece em cada caso. Atenção: as seis
          primeiras são em geral paliativos para quem está perto do limite.
        </p>
        <OptimizationLab />
      </LessonBlock>

      <LessonBlock tag="Cuidados" title="Antes de apagar ou fundir">
        <ul className="plain">
          <li>
            Só funde quando as permissões e as condições <b>não conflitam</b>. Uma condição que vale para um statement só,
            como exigir MFA, impede a fusão.
          </li>
          <li>
            Variáveis específicas de um recurso (como <code>target.cluster.id</code>) são falsas para outros tipos. Juntar
            tipos diferentes pode bloquear justamente o que você queria preservar.
          </li>
          <li>
            <code>target.compartment.id</code> e <code>target.compartment.name</code> não servem para filtrar o resultado de
            operações de lista pelo acesso do usuário.
          </li>
          <li>
            Padrões de permissão como <code>/CLUSTER_*/</code> também casam permissões de outros tipos de recurso da mesma
            família. Revise o que o padrão alcança.
          </li>
          <li>Faça a mudança com revisão, e guarde um jeito de voltar atrás.</li>
        </ul>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={optimizationQuiz} />
      </LessonBlock>

      <LessonBlock tag="Revisão" title="O que levar desta lição">
        <Box>
          <ul className="plain" style={{ maxWidth: 'none' }}>
            <li>O limite documentado é de 500 statements por hierarquia de compartimentos, somados da raiz até o alvo.</li>
            <li>
              Apague duplicatas e o que o pai ou o verbo maior já cobrem. Condição no filho não limita o pai.
            </li>
            <li>
              Funda grupos de mesma lista de membros, liste grupos no mesmo statement, use padrões em nomes e listas de
              permissões quando fizer sentido.
            </li>
            <li>Desça statements da raiz para perto do alvo.</li>
            <li>Tags (TBAC) são a saída duradoura: o número de policies para de crescer com as equipes.</li>
          </ul>
        </Box>
      </LessonBlock>

      <LessonSources
        links={[
          { href: 'https://www.ateam-oracle.com/minimize-oci-iam-policy-statements-part-1', label: 'Minimize OCI IAM policy statements, Part 1' },
          { href: 'https://www.ateam-oracle.com/post/minimize-oci-iam-policy-statements-part-2', label: 'Minimize OCI IAM policy statements, Part 2' },
          { href: 'https://blogs.oracle.com/cloud-infrastructure/oci-policy-analysis-part-4-consolidation', label: 'OCI Policy Analysis, Part 4: Consolidation' },
        ]}
      />
    </LessonLayout>
  );
}
