import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Box } from '../../../components/ui/Box';
import { Callout } from '../../../components/ui/Callout';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { TableScroll } from '../../../components/ui/TableScroll';
import { AnyAllLab } from '../interactive/AnyAllLab';
import { ConditionPresets } from '../interactive/ConditionPresets';
import { conditionsQuiz } from '../quizzes';

const VARIABLES: Array<[string, string, string]> = [
  ['request.operation', 'A chamada de API', "request.operation='ListGroups'"],
  ['request.permission', 'A permissão exigida, em maiúsculas', "request.permission='GROUP_INSPECT'"],
  ['request.networkSource.name', 'O network source de origem', "request.networkSource.name='corpnet'"],
  ['request.utc-timestamp', 'Data e hora da requisição em UTC, com partes: month-of-year, day-of-month, day-of-week, time-of-day', "request.utc-timestamp.day-of-month = '1'"],
  ['request.user.mfaTotpVerified', 'Se o usuário passou por MFA TOTP', "request.user.mfaTotpVerified='true'"],
  ['target.*', 'O recurso ou compartimento alvo', "target.group.name != 'Administrators'"],
];

const OPERATORS: Array<[string, string]> = [
  ['=  e  !=', 'Igual e diferente'],
  ['in', "Está em uma lista: month-of-year in ('6', '7', '8')"],
  ['before  /  after', 'Antes ou depois de uma data: request.utc-timestamp before ...'],
  ['between', "Entre dois horários: time-of-day between '17:00:00Z' and '01:00:00Z'"],
];

export function ConditionsLesson() {
  return (
    <LessonLayout lead="Uma condição é o where no fim do statement. Ela transforma “o grupo pode fazer isso” em “o grupo pode fazer isso, quando...”: em certo horário, de certa rede, até certa data.">
      <LessonBlock tag="Sintaxe" title="O where">
        <CodeBlock>
          {`Allow group GroupAdmins to use users in tenancy\n  where target.group.name != 'Administrators'`}
        </CodeBlock>
        <p>
          O statement só concede se a condição for <b>verdadeira</b>. Os valores são comparados <b>sem diferenciar maiúsculas
          de minúsculas</b>: uma condição sobre <code>'BucketA'</code> vale também para <code>bucketA</code>.
        </p>
        <p>
          Para várias condições, agrupe com <code>any {'{ }'}</code> (OU) ou <code>all {'{ }'}</code> (E), separando por
          vírgula:
        </p>
        <CodeBlock>
          {`Allow group XYZ to manage groups in tenancy\n  where any {request.permission='GROUP_INSPECT',\n             request.permission='GROUP_CREATE',\n             request.permission='GROUP_UPDATE'}`}
        </CodeBlock>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="any × all">
        <p>Marque quais condições são verdadeiras e compare as duas formas de combiná-las.</p>
        <AnyAllLab />
      </LessonBlock>

      <LessonBlock tag="Referência" title="Variáveis e operadores">
        <p>
          As variáveis começam com <b>request</b> (sobre quem pede e como) ou <b>target</b> (sobre o recurso ou compartimento
          que sofre a ação).
        </p>
        <TableScroll minWidth={620}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Variável</th>
                <th>O que descreve</th>
                <th>Exemplo</th>
              </tr>
            </thead>
            <tbody>
              {VARIABLES.map(([v, d, e]) => (
                <tr key={v}>
                  <td>
                    <code>{v}</code>
                  </td>
                  <td>{d}</td>
                  <td>
                    <code>{e}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
        <TableScroll minWidth={520}>
          <table className="tbl" style={{ marginTop: 12 }}>
            <thead>
              <tr>
                <th>Operador</th>
                <th>Uso</th>
              </tr>
            </thead>
            <tbody>
              {OPERATORS.map(([o, u]) => (
                <tr key={o}>
                  <td>
                    <code>{o}</code>
                  </td>
                  <td>{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Condições do dia a dia">
        <p>Os casos de uso mais comuns, com o que cada um faz e o cuidado que pede.</p>
        <ConditionPresets />
      </LessonBlock>

      <LessonBlock tag="Pegadinhas" title="O que costuma cair">
        <FactGrid>
          <Fact title="Variável que não se aplica">
            Se a operação não tem a variável, a condição vale falso e o pedido é negado. Foi assim que ListUsers falhou no
            exemplo de target.group.name.
          </Fact>
          <Fact title="Tudo em UTC">
            Data, dia da semana e hora são em UTC. Há uma tolerância de 5 minutos entre o horário da requisição e o da
            avaliação.
          </Fact>
          <Fact title="Condição não limita outras policies">
            Ela só restringe o statement em que está. Se outra policy no alcance, inclusive de um compartimento pai,
            concede a permissão sem condição, o acesso existe.
          </Fact>
          <Fact title="Permissão em maiúsculas">
            request.permission usa o nome da permissão em maiúsculas, como GROUP_INSPECT.
          </Fact>
        </FactGrid>
        <Callout title="Sem Deny" variant="blue">
          <p>
            Policies do OCI só têm Allow. Para “tudo, menos isso”, use <code>!=</code> em uma condição. Não existe regra de
            negação para sobrepor outra policy.
          </p>
        </Callout>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={conditionsQuiz} />
      </LessonBlock>

      <LessonBlock tag="Revisão" title="O que levar desta lição">
        <Box>
          <ul className="plain" style={{ maxWidth: 'none' }}>
            <li>
              Condição = <code>where</code> no fim do statement. Verdadeira concede, falsa nega.
            </li>
            <li>
              <code>all</code> é E, <code>any</code> é OU. Valores não diferenciam maiúsculas.
            </li>
            <li>
              Variáveis <code>request.*</code> descrevem a requisição. Variáveis <code>target.*</code> descrevem o alvo.
            </li>
            <li>Variável que não existe na operação torna a condição falsa.</li>
            <li>Tempo é sempre UTC. Condição não reduz o que outra policy já concede.</li>
          </ul>
        </Box>
      </LessonBlock>

      <LessonSources
        links={[
          { href: 'https://docs.oracle.com/iaas/Content/Identity/Concepts/policyadvancedfeatures.htm', label: 'Advanced Policy Features: Conditions' },
          { href: 'https://docs.oracle.com/en-us/iaas/Content/Identity/Reference/policyreference.htm', label: 'Policy Reference' },
          { href: 'https://www.ateam-oracle.com/minimize-oci-iam-policy-statements-part-1', label: 'Minimize OCI IAM policy statements, Part 1' },
        ]}
      />
    </LessonLayout>
  );
}
