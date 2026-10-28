import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Callout } from '../../../components/ui/Callout';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { TableScroll } from '../../../components/ui/TableScroll';
import { SecurityRuleSimulator } from '../interactive/SecurityRuleSimulator';
import { securityQuiz } from '../quizzes';
import { DOCS, Review } from './Review';

export function VcnSecurityLesson() {
  return (
    <LessonLayout lead="A segurança da VCN é feita de regras que só permitem. O padrão é negar, e a decisão final é a soma das regras que se aplicam à VNIC.">
      <LessonBlock tag="Visão geral" title="Duas ferramentas">
        <TableScroll minWidth={560}>
          <table className="tbl">
            <thead>
              <tr>
                <th></th>
                <th>Security list</th>
                <th>Network security group (NSG)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vale para</td>
                <td>Todas as VNICs da subnet</td>
                <td>As VNICs que você escolher, na mesma VCN</td>
              </tr>
              <tr>
                <td>Como ativar</td>
                <td>Associar à subnet</td>
                <td>Colocar o recurso (instância, balanceador) no NSG</td>
              </tr>
              <tr>
                <td>Limite</td>
                <td>5 por subnet</td>
                <td>5 por VNIC</td>
              </tr>
              <tr>
                <td>Origem/destino</td>
                <td>CIDR ou service</td>
                <td>CIDR, service ou outro NSG</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>
        <p style={{ marginTop: 12 }}>
          A Oracle recomenda os NSGs, porque separam a arquitetura de subnets dos requisitos de segurança de cada
          aplicação.
        </p>
      </LessonBlock>

      <LessonBlock tag="Regras" title="Como o OCI decide">
        <FactGrid>
          <Fact title="Negar por padrão">Sem regras, nada entra nem sai das VNICs da VCN. As regras só permitem.</Fact>
          <Fact title="União">
            Valem as regras das security lists da subnet mais as dos NSGs da VNIC. Basta uma permitir.
          </Fact>
          <Fact title="Stateful">
            Padrão. Há rastreamento de conexão, então a resposta volta sozinha, sem regra no sentido oposto.
          </Fact>
          <Fact title="Stateless">
            Sem rastreamento. Cada sentido precisa da sua regra. Indicada para sites de alto volume.
          </Fact>
          <Fact title="Precedência">
            Se um tráfego casa com uma regra stateful e uma stateless, a stateless vence e a conexão não é rastreada.
          </Fact>
          <Fact title="Exceção">Não são aplicadas ao tráfego de 169.254.0.0/16 (iSCSI e metadados).</Fact>
        </FactGrid>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Stateful ou stateless?">
        <SecurityRuleSimulator />
      </LessonBlock>

      <Callout title="Camadas além da VCN">
        <p>
          Instâncias de imagens de plataforma também têm firewall no sistema operacional. Quando algo não conecta, confira o
          NSG, a security list da subnet <b>e</b> o firewall da instância. A route table também precisa estar certa.
        </p>
      </Callout>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={securityQuiz} />
      </LessonBlock>

      <Review
        items={[
          'Regras só permitem. Sem regra, nega.',
          'Security list: por subnet. NSG: por VNIC. O resultado é a união.',
          'Stateful rastreia a conexão. Stateless exige regra nos dois sentidos, e vence a stateful em caso de conflito.',
          'Confira também o firewall do SO. 169.254.0.0/16 fica fora das regras.',
        ]}
      />
      <LessonSources links={[DOCS.rules]} />
    </LessonLayout>
  );
}
