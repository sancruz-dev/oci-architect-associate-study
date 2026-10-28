import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Box } from '../../../components/ui/Box';
import { Callout } from '../../../components/ui/Callout';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { Diagram, Figcap } from '../../../components/ui/Figcap';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { TableScroll } from '../../../components/ui/TableScroll';
import { InstancePrincipalDiagram } from '../interactive/InstancePrincipalDiagram';
import { MatchingRuleLab } from '../interactive/MatchingRuleLab';
import { dynamicQuiz } from '../quizzes';

const ATTRIBUTES: Array<[string, string]> = [
  ['instance.id', 'OCID da instância'],
  ['instance.compartment.id', 'OCID do compartimento onde a instância está'],
  ['resource.id', 'OCID do recurso (qualquer tipo suportado)'],
  ['resource.compartment.id', 'OCID do compartimento do recurso'],
  ['resource.type', 'Tipo do recurso, igual ao trecho do OCID: fnfunc, apigateway, domain...'],
  ['tag.<namespace>.<chave>.value', 'Recurso que tem a tag, com qualquer valor'],
  ["tag.<namespace>.<chave>.value = '45'", 'Recurso que tem a tag com esse valor'],
];

export function DynamicGroupsLesson() {
  return (
    <LessonLayout lead="Grupo normal reúne pessoas. Dynamic group reúne recursos, como instâncias e funções, para que eles mesmos sejam o sujeito de uma policy, sem usuário e sem senha.">
      <LessonBlock tag="Conceito" title="Instance principal">
        <p>
          Uma aplicação rodando em uma instância precisa chamar serviços do OCI, como ler um bucket. Em vez de guardar uma
          chave de API no código, a própria instância é autenticada pelo IAM. Para que ela receba permissões, você:
        </p>
        <ol className="plain">
          <li>
            Cria um <b>dynamic group</b> com <b>matching rules</b> que dizem quais recursos pertencem a ele.
          </li>
          <li>
            Escreve uma <b>policy</b> com <code>dynamic-group</code> como sujeito:{' '}
            <code>Allow dynamic-group AppServers to read objects in compartment Prod</code>.
          </li>
        </ol>
        <Diagram>
          <InstancePrincipalDiagram />
        </Diagram>
        <Figcap>Dois conferes no IAM: quem é (as regras) e o que pode (a policy).</Figcap>
        <p style={{ marginTop: 12 }}>
          A associação é <b>dinâmica</b>: instâncias que existem agora e as criadas depois, e que cumprem as regras, entram
          sozinhas.
        </p>
      </LessonBlock>

      <LessonBlock tag="Sintaxe" title="Matching rules">
        <CodeBlock>
          {`variável = | != 'valor'\n\nany|all { <condição>, <condição>, ... }`}
        </CodeBlock>
        <ul className="plain">
          <li>
            <code>any</code>: o recurso entra se <b>pelo menos uma</b> condição for verdadeira.
          </li>
          <li>
            <code>all</code>: entra só se <b>todas</b> forem verdadeiras.
          </li>
        </ul>
        <TableScroll minWidth={560}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>O que casa</th>
              </tr>
            </thead>
            <tbody>
              {ATTRIBUTES.map(([a, d]) => (
                <tr key={a}>
                  <td>
                    <code>{a}</code>
                  </td>
                  <td>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Quem entra no dynamic group?">
        <p>
          Escolha uma regra e veja quais dos cinco recursos viram membros. Compare <code>all</code> e <code>any</code>.
        </p>
        <MatchingRuleLab />
      </LessonBlock>

      <LessonBlock tag="Regras" title="O que costuma cair">
        <FactGrid>
          <Fact title="Grupo só define quem">
            Sem uma policy para o dynamic group, os membros não têm permissão alguma. Vale o padrão: negar.
          </Fact>
          <Fact title="Só defined tags">
            As policies do IAM não suportam free-form tags. Use <code>tag.namespace.chave.value</code>.
          </Fact>
          <Fact title="Rule builder">
            O construtor do Console só cobre as variáveis de instância e de compartimento. As demais, escreva à mão.
          </Fact>
          <Fact title="Domains">
            O dynamic group pertence a um identity domain. Fora do Default, a policy cita{' '}
            <code>'Domain'/'Nome'</code>, como nos grupos. Domains do tipo External não têm dynamic groups.
          </Fact>
        </FactGrid>
        <Callout title="Dynamic group × network source" variant="blue">
          <p>
            Dynamic group responde “quem” (qual recurso age como principal). Network source responde “de onde” (qual IP).
            Se a regra do enunciado fala de IP, é network source.
          </p>
        </Callout>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={dynamicQuiz} />
      </LessonBlock>

      <LessonBlock tag="Revisão" title="O que levar desta lição">
        <Box>
          <ul className="plain" style={{ maxWidth: 'none' }}>
            <li>Dynamic group = conjunto de recursos por matching rules. Eles agem como instance principals.</li>
            <li>
              Regras: <code>instance.compartment.id</code>, <code>resource.type</code>, tags... Combine com <code>any</code> ou{' '}
              <code>all</code>.
            </li>
            <li>
              Precisa de policy: <code>Allow dynamic-group X to ...</code>. Sozinho, não dá acesso.
            </li>
            <li>Só defined tags. Recursos novos que cumprem as regras entram sozinhos.</li>
          </ul>
        </Box>
      </LessonBlock>

      <LessonSources
        links={[
          { href: 'https://docs.oracle.com/en-us/iaas/Content/Identity/dynamicgroups/Writing_Matching_Rules_to_Define_Dynamic_Groups.htm', label: 'Writing Matching Rules to Define Dynamic Groups' },
          { href: 'https://docs.oracle.com/iaas/Content/Identity/Tasks/managingdynamicgroups.htm', label: 'Managing Dynamic Groups' },
          { href: 'https://docs.oracle.com/iaas/Content/Identity/dynamicgroups/Using_the_Rule_Builder.htm', label: 'Using the Rule Builder' },
        ]}
      />
    </LessonLayout>
  );
}
