import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Callout } from '../../../components/ui/Callout';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { TableScroll } from '../../../components/ui/TableScroll';
import { CidrCalculator } from '../interactive/CidrCalculator';
import { cidrQuiz } from '../quizzes';
import { DOCS, Review } from './Review';

const ROWS: Array<[string, string, string]> = [
  ['/16', '65.536', '65.533'],
  ['/20', '4.096', '4.093'],
  ['/24', '256', '253'],
  ['/28', '16', '13'],
  ['/30', '4', '1'],
];

export function CidrLesson() {
  return (
    <LessonLayout lead="Toda a rede da OCI começa em um bloco CIDR. Se você sabe ler “10.0.1.0/24” e contar quantos endereços cabem nele, o resto do módulo fica muito mais simples.">
      <LessonBlock tag="Conceito" title="Endereço e prefixo">
        <p>
          Um endereço IPv4 tem 32 bits, escritos em quatro números de 0 a 255. A notação CIDR junta o endereço a um{' '}
          <b>prefixo</b>: <code>10.0.1.0/24</code>. O número depois da barra diz quantos bits da esquerda identificam a
          rede. Os bits que sobram identificam os hosts.
        </p>
        <ul className="plain">
          <li>
            <code>/24</code>: 24 bits de rede e 8 de host, então 2^8 = 256 endereços.
          </li>
          <li>
            <code>/16</code>: 16 bits de host, então 2^16 = 65.536 endereços.
          </li>
          <li>
            <b>Prefixo maior, bloco menor.</b> Cada bit a mais no prefixo divide o bloco ao meio.
          </li>
        </ul>
        <TableScroll minWidth={420}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Prefixo</th>
                <th>Endereços no bloco</th>
                <th>Usáveis em uma subnet do OCI</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([p, t, u]) => (
                <tr key={p}>
                  <td className="mono">{p}</td>
                  <td>{t}</td>
                  <td>{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Calcule um bloco">
        <p>Troque o CIDR e veja a máscara, a faixa e quantos endereços sobram para as instâncias.</p>
        <CidrCalculator />
      </LessonBlock>

      <LessonBlock tag="Planejamento" title="Faixas privadas e sobreposição">
        <FactGrid>
          <Fact title="RFC 1918">
            As faixas privadas são 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16. A Oracle recomenda usá-las na VCN.
          </Fact>
          <Fact title="Na prática">
            Como a VCN aceita de /16 a /30, escolha blocos como <code>10.0.0.0/16</code>, <code>172.16.0.0/16</code> ou{' '}
            <code>192.168.0.0/16</code>.
          </Fact>
          <Fact title="Aninhado ou separado">
            Dois blocos CIDR ou se contêm (um dentro do outro) ou não se tocam. Não existe sobreposição parcial.
          </Fact>
          <Fact title="Onde importa">
            VCNs conectadas (peering, VPN, FastConnect) e a rede on-premises não podem ter CIDRs que se sobreponham.
          </Fact>
        </FactGrid>
        <Callout title="Cuidado com o endereço digitado">
          <p>
            <code>10.0.1.77/24</code> não começa no início do bloco. O bloco real é <code>10.0.1.0/24</code>. Em questões de
            sobreposição, calcule primeiro o início e o fim de cada faixa.
          </p>
        </Callout>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={cidrQuiz} />
      </LessonBlock>

      <Review
        items={[
          <>
            Endereços no bloco = 2^(32 − prefixo). <code>/24</code> tem 256 e <code>/16</code> tem 65.536.
          </>,
          'Prefixo maior significa bloco menor.',
          'No OCI, cada subnet perde 3 endereços para reserva.',
          'Use faixas RFC 1918 e nunca deixe os CIDRs da VCN se sobreporem aos da rede conectada.',
        ]}
      />
      <LessonSources links={[DOCS.overview]} />
    </LessonLayout>
  );
}
