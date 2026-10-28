import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Callout } from '../../../components/ui/Callout';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { TableScroll } from '../../../components/ui/TableScroll';
import { TroubleshootChecklist } from '../interactive/TroubleshootChecklist';
import { secListQuiz } from '../quizzes';
import { DOCS, Review } from './Review';

export function SecurityListsLesson() {
  return (
    <LessonLayout lead="A security list é o firewall no nível da subnet. Toda VNIC da subnet recebe as regras da lista. É o mecanismo original da VCN, e a lista padrão já vem pronta.">
      <LessonBlock tag="Conceito" title="Como funciona">
        <p>
          Você associa uma ou mais security lists à subnet, e as regras valem para todas as VNICs dela. Ao criar uma
          subnet, se você não escolher outra, ela usa a security list padrão da VCN. As regras podem ser stateful ou
          stateless, com origem ou destino do tipo CIDR ou service. Security list <b>não</b> cita NSG.
        </p>
      </LessonBlock>

      <LessonBlock tag="Padrão" title="Regras da security list padrão (IPv4)">
        <TableScroll minWidth={620}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Sentido</th>
                <th>Protocolo</th>
                <th>Origem / destino</th>
                <th>Porta ou ICMP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ingress</td>
                <td>TCP</td>
                <td>Origens autorizadas</td>
                <td>Destino 22 (SSH)</td>
              </tr>
              <tr>
                <td>Ingress</td>
                <td>ICMP</td>
                <td>Origens autorizadas</td>
                <td>Tipo 3, código 4 (Path MTU Discovery)</td>
              </tr>
              <tr>
                <td>Ingress</td>
                <td>ICMP</td>
                <td>CIDR da VCN</td>
                <td>Tipo 3, todos os códigos</td>
              </tr>
              <tr>
                <td>Egress</td>
                <td>Todos</td>
                <td>Qualquer destino</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>
        <p style={{ marginTop: 12 }}>
          Todas são stateful. A lista <b>não</b> inclui ping (ICMP echo) nem RDP (TCP 3389, para imagens Windows): se
          precisar, adicione. Para o ping, uma regra stateful de ingress ICMP tipo 8.
        </p>
      </LessonBlock>

      <LessonBlock tag="Limites" title="O que costuma cair">
        <FactGrid>
          <Fact title="Por subnet">Até 5 security lists. Não aumenta.</Fact>
          <Fact title="Por VCN">Até 300 security lists.</Fact>
          <Fact title="Por lista">Até 200 regras de ingress e 200 de egress.</Fact>
          <Fact title="Stateless primeiro">
            Entre as listas da subnet, as regras stateless são avaliadas antes e têm precedência sobre as stateful.
          </Fact>
          <Fact title="Path MTU">
            Para tráfego de fora da VCN, libere ingress ICMP tipo 3, código 4, de 0.0.0.0/0.
          </Fact>
          <Fact title="UDP fragmentado">
            Se esperar pacotes UDP grandes, use portas ALL, ou os fragmentos seguintes são descartados.
          </Fact>
        </FactGrid>
        <Callout title="Não apague as padrão sem conferir">
          <p>As regras padrão garantem a conectividade básica. Só as remova se tiver certeza de que nada depende delas.</p>
        </Callout>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Não conecta. O que conferir?">
        <TroubleshootChecklist />
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={secListQuiz} />
      </LessonBlock>

      <Review
        items={[
          'Security list: regras no nível da subnet. Até 5 por subnet, 200 regras de ingress e 200 de egress por lista.',
          'A padrão libera SSH, ICMP 3/4, ICMP 3 da VCN e toda a saída. Não tem ping nem RDP.',
          'Pode ser stateful (padrão) ou stateless. A stateless vence em conflito.',
          'Security list só cita CIDR ou service. Para citar outro grupo, use NSG.',
        ]}
      />
      <LessonSources links={[DOCS.lists, DOCS.rules]} />
    </LessonLayout>
  );
}
