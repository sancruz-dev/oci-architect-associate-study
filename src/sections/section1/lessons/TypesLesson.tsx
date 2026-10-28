import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Box } from '../../../components/ui/Box';
import { Callout } from '../../../components/ui/Callout';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { Figcap } from '../../../components/ui/Figcap';
import { typesQuiz } from '../quizzes';
import { FeatureMatrix } from '../interactive/FeatureMatrix';
import { LimitBars } from '../interactive/LimitBars';
import { ScenarioPicker } from '../interactive/ScenarioPicker';
import { TypeCards } from '../interactive/TypeCards';

export function TypesLesson() {
  return (
    <LessonLayout lead="O tipo do domain define quais recursos você tem, os limites de cada objeto e como a cobrança funciona. Na dúvida, descubra quem são os usuários do domain.">
      <Callout title="Atenção à contagem" variant="blue">
        <p>
          Materiais mais antigos falam em 5 tipos. A documentação atual lista 6, porque acrescentou o External Active User.
          Se a plataforma mostrar 5, o conteúdo é o mesmo, sem esse último.
        </p>
      </Callout>

      <LessonBlock tag="Os tipos" title="Seis tipos, um público para cada">
        <TypeCards />
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Qual tipo escolher?">
        <p>Escolha um cenário e veja o tipo indicado.</p>
        <ScenarioPicker />
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Matriz de recursos">
        <p>Toque no nome de um tipo para destacar a coluna dele.</p>
        <FeatureMatrix />
        <Figcap>
          “sem SMS” significa que o Free faz MFA e recuperação de conta, mas não por mensagem de texto.
        </Figcap>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Limites por tipo">
        <p>
          Os limites crescem com o tipo. Escolha um objeto. As barras usam escala logarítmica, então leia os números à
          direita.
        </p>
        <LimitBars />
      </LessonBlock>

      <LessonBlock tag="Cobrança" title="Quem paga por uso">
        <ul className="plain">
          <li>
            <b>Free</b> e <b>Oracle Apps</b> não usam meters.
          </li>
          <li>
            <b>Oracle Apps Premium, Premium, External User e External Active User</b> usam meters: usuários por mês, SMS,
            tokens e usuários replicados por mês.
          </li>
          <li>
            <b>External User</b> cobra pelos usuários armazenados. <b>External Active User</b> cobra pelos usuários ativos
            no mês.
          </li>
        </ul>
      </LessonBlock>

      <LessonBlock tag="Pegadinhas" title="Regras para trocar o tipo">
        <FactGrid>
          <Fact title="Default nunca vira External">
            O domain Default não pode ser trocado para External User nem External Active User.
          </Fact>
          <Fact title="Oracle Apps é destino fechado">
            Free, Premium e os External não podem virar Oracle Apps.
          </Fact>
          <Fact title="Objetos a mais bloqueiam">
            Se o domain tem mais objetos do que o tipo de destino permite, a troca é recusada.
          </Fact>
          <Fact title="Limite por assinatura">A quantidade de domains de cada tipo depende da sua subscription.</Fact>
          <Fact title="Recursos podem sumir">
            O IAM avisa quando a troca tira funcionalidades. Você pode seguir adiante, mas algumas deixam de funcionar.
          </Fact>
          <Fact title="External é só para não funcionários">
            Funcionários só podem ficar em um External se também existirem em outro domain do tipo Free, Oracle Apps,
            Oracle Apps Premium ou Premium.
          </Fact>
        </FactGrid>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={typesQuiz} />
      </LessonBlock>

      <LessonBlock tag="Revisão" title="O que levar desta seção">
        <Box>
          <ul className="plain" style={{ maxWidth: 'none' }}>
            <li>
              O domain <b>autentica</b>. A policy <b>autoriza</b>.
            </li>
            <li>
              Policy: <code>Allow &lt;sujeito&gt; to &lt;verbo&gt; &lt;recurso&gt; in &lt;local&gt;</code>. Verbos em ordem
              crescente: inspect, read, use, manage.
            </li>
            <li>Acesso concedido em um compartimento vale para os filhos. O padrão é negar.</li>
            <li>
              Todo tenancy tem o domain <b>Default</b>, tipo Free, na raiz, que não pode ser excluído.
            </li>
            <li>
              Grupo em outro domain: <code>'Domain'/'Grupo'</code> na policy. Sem prefixo, vale o Default.
            </li>
            <li>
              Free: administrar o OCI. Oracle Apps: SaaS Oracle. Oracle Apps Premium: Oracle híbrido. Premium: funcionários.
              External: clientes.
            </li>
            <li>Tipos External não gerenciam recursos OCI e não têm dynamic groups.</li>
          </ul>
        </Box>
      </LessonBlock>

      <LessonSources
        links={[
          { href: 'https://docs.oracle.com/iaas/Content/Identity/getstarted/identity-domains.htm', label: 'Overview of IAM' },
          { href: 'https://docs.oracle.com/iaas/Content/Identity/sku/overview.htm', label: 'IAM Identity Domain Types' },
          { href: 'https://docs.oracle.com/iaas/Content/Identity/domains/overview.htm', label: 'Managing Identity Domains' },
          { href: 'https://www.oracle.com/security/cloud-security/identity-cloud/faq/', label: 'Identity and Access Management FAQ' },
        ]}
      />
    </LessonLayout>
  );
}
