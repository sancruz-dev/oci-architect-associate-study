import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Callout } from '../../../components/ui/Callout';
import { TableScroll } from '../../../components/ui/TableScroll';
import { TierPlacement } from '../interactive/TierPlacement';
import { publicQuiz } from '../quizzes';
import { DOCS, Review } from './Review';

export function PublicSubnetLesson() {
  return (
    <LessonLayout lead="Subnet pública é a que permite IP público. Ela é a ponta da arquitetura: só vai nela o que precisa ser alcançado direto da internet.">
      <LessonBlock tag="Definição" title="O que torna a subnet pública">
        <p>
          Em uma subnet pública, as VNICs <b>podem</b> ter IPs públicos IPv4. A palavra é “podem”: o tipo da subnet permite
          o IP público, mas o acesso à internet depende do conjunto todo.
        </p>
        <TableScroll minWidth={520}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Peça</th>
                <th>Na subnet pública</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>IP público</td>
                <td>Permitido na VNIC</td>
              </tr>
              <tr>
                <td>Route table</td>
                <td className="mono">0.0.0.0/0 → Internet Gateway</td>
              </tr>
              <tr>
                <td>Regras de segurança</td>
                <td>Liberam só o que precisa: 443, 80, SSH de IPs conhecidos</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="O que vai em cada subnet?">
        <TierPlacement />
      </LessonBlock>

      <Callout title="Pública não é aberta">
        <p>
          Subnet pública não libera nada por conta própria. Sem regra de segurança, o tráfego continua negado. Mantenha na
          pública o menor número possível de recursos.
        </p>
      </Callout>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={publicQuiz} />
      </LessonBlock>

      <Review
        items={[
          'Subnet pública: VNICs podem ter IP público.',
          'Acesso à internet = IP público + rota para o IGW + regras de segurança.',
          'Na pública ficam load balancers e bastions. Aplicações e bancos ficam na privada.',
        ]}
      />
      <LessonSources links={[DOCS.overview, DOCS.igw]} />
    </LessonLayout>
  );
}
