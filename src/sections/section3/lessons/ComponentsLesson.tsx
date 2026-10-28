import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Diagram, Figcap } from '../../../components/ui/Figcap';
import { TableScroll } from '../../../components/ui/TableScroll';
import { ComponentPicker } from '../interactive/ComponentPicker';
import { VcnTopologyDiagram } from '../interactive/VcnTopologyDiagram';
import { componentsQuiz } from '../quizzes';
import { DOCS, Review } from './Review';

export function ComponentsLesson() {
  return (
    <LessonLayout lead="Uma visão geral das peças da VCN. As próximas lições entram em cada uma, então aqui o objetivo é saber para que serve cada uma e como se encaixam.">
      <LessonBlock tag="Mapa" title="Uma VCN, vista de cima">
        <Diagram>
          <VcnTopologyDiagram />
        </Diagram>
        <Figcap>As setas contínuas entram e saem. A tracejada, do NAT gateway, só sai.</Figcap>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Para que serve cada componente">
        <ComponentPicker />
      </LessonBlock>

      <LessonBlock tag="Comparação" title="Qual gateway escolher">
        <TableScroll minWidth={640}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Gateway</th>
                <th>Leva a</th>
                <th>Sentido</th>
                <th>Precisa de IP público</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Internet gateway</td>
                <td>Internet</td>
                <td>Entrada e saída</td>
                <td>Sim</td>
              </tr>
              <tr>
                <td>NAT gateway</td>
                <td>Internet</td>
                <td>Só saída</td>
                <td>Não</td>
              </tr>
              <tr>
                <td>Service gateway</td>
                <td>Serviços Oracle (OSN)</td>
                <td>Saída (acesso privado)</td>
                <td>Não</td>
              </tr>
              <tr>
                <td>DRG</td>
                <td>On-premises e outras VCNs</td>
                <td>Os dois</td>
                <td>Não (IPs privados)</td>
              </tr>
              <tr>
                <td>LPG</td>
                <td>VCN da mesma região</td>
                <td>Os dois</td>
                <td>Não</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={componentsQuiz} />
      </LessonBlock>

      <Review
        items={[
          'Componentes: subnets, VNICs, IPs, route tables, regras de segurança, DHCP options e gateways (IGW, NAT, SGW, DRG, LPG, RPC).',
          'IGW: internet nos dois sentidos. NAT: só saída. SGW: serviços Oracle por caminho privado.',
          'DRG liga a on-premises e a outras VCNs. LPG é peering na mesma região. RPC é entre regiões.',
          'A route table decide por qual gateway sai. As regras de segurança decidem o que pode passar.',
        ]}
      />
      <LessonSources links={[DOCS.overview]} />
    </LessonLayout>
  );
}
