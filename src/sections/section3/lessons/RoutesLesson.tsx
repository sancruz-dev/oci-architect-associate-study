import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Callout } from '../../../components/ui/Callout';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { TableScroll } from '../../../components/ui/TableScroll';
import { RouteLab } from '../interactive/RouteLab';
import { routeQuiz } from '../quizzes';
import { DOCS, Review } from './Review';

export function RoutesLesson() {
  return (
    <LessonLayout lead="A route table responde “por onde este pacote sai?”. Ela não libera nem bloqueia acesso: só escolhe o caminho. Quem libera é a regra de segurança.">
      <LessonBlock tag="Conceito" title="Como uma route table funciona">
        <p>
          Cada regra tem um <b>destino</b> (um bloco CIDR, ou um service CIDR label no caso do service gateway) e um{' '}
          <b>alvo</b>, o próximo salto. Cada subnet usa uma única route table, escolhida na criação e trocável depois.
        </p>
        <TableScroll minWidth={560}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Alvo (target)</th>
                <th>Típico destino</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Internet gateway</td>
                <td className="mono">0.0.0.0/0</td>
              </tr>
              <tr>
                <td>NAT gateway</td>
                <td className="mono">0.0.0.0/0</td>
              </tr>
              <tr>
                <td>Service gateway</td>
                <td>Service CIDR label (All &lt;region&gt; Services in OSN)</td>
              </tr>
              <tr>
                <td>DRG</td>
                <td>CIDR do on-premises ou de outra VCN</td>
              </tr>
              <tr>
                <td>Local peering gateway</td>
                <td>CIDR da VCN com peering</td>
              </tr>
              <tr>
                <td>Private IP</td>
                <td>CIDR roteado para uma instância (ex.: firewall virtual)</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Para onde o pacote vai?">
        <p>Troque a route table e o destino. Repare como a regra mais específica vence.</p>
        <RouteLab />
      </LessonBlock>

      <LessonBlock tag="Regras" title="O que costuma cair">
        <FactGrid>
          <Fact title="Longest prefix match">
            Com regras que se sobrepõem, vale a mais específica (o maior prefixo). A ordem na lista não importa.
          </Fact>
          <Fact title="Rota local implícita">
            O tráfego dentro da VCN é roteado sozinho e a regra não aparece na tabela. Uma rota estática para o CIDR da
            VCN, com o mesmo prefixo, tem precedência.
          </Fact>
          <Fact title="Blackhole">
            Sem regra que case com um destino fora da VCN, o tráfego é descartado. Regra errada também pode mandar o
            tráfego para o alvo errado.
          </Fact>
          <Fact title="Route table padrão">
            Toda VCN tem uma, e as subnets a usam se você não escolher outra. Ela não pode ser excluída.
          </Fact>
          <Fact title="Limites">300 route tables por VCN e 200 regras por route table.</Fact>
          <Fact title="Exclusão">
            Não dá para excluir um gateway que é alvo de regra, nem uma route table ainda associada a uma subnet ou
            gateway.
          </Fact>
        </FactGrid>
        <Callout title="Rota de entrada: gateway route table" variant="blue">
          <p>
            O tráfego que sai da subnet usa a route table da subnet. O que entra na VCN por um gateway pode usar uma{' '}
            <b>route table associada ao gateway</b>, em LPG, DRG, IGW, NAT e service gateway. Depois de associar uma,
            o gateway sempre precisa ter uma. Para um IGW, o alvo precisa estar em subnet pública.
          </p>
        </Callout>
        <p style={{ marginTop: 12 }}>
          Existe ainda route table por recurso: se uma VNIC ou um IP tiver a sua, ela vale no lugar da da subnet. A ordem
          é IP, depois VNIC, depois subnet, e só uma se aplica.
        </p>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={routeQuiz} />
      </LessonBlock>

      <Review
        items={[
          'Route table escolhe o caminho. A regra de segurança é que libera ou nega.',
          'Regra = destino + alvo. Vale a mais específica (longest prefix match).',
          'Dentro da VCN a rota local é implícita. Fora, sem regra que case, o pacote é descartado.',
          'Uma route table por subnet. Limites: 300 por VCN e 200 regras por tabela.',
        ]}
      />
      <LessonSources links={[DOCS.routes]} />
    </LessonLayout>
  );
}
