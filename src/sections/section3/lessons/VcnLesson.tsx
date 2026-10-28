import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Callout } from '../../../components/ui/Callout';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { VcnCidrCheck } from '../interactive/VcnCidrCheck';
import { vcnQuiz } from '../quizzes';
import { DOCS, Review } from './Review';

export function VcnLesson() {
  return (
    <LessonLayout lead="A VCN é a sua rede privada dentro da OCI. Você define o endereçamento, as subnets, as rotas e a segurança. Nada entra ou sai se você não configurar.">
      <LessonBlock tag="Conceito" title="O que é uma VCN">
        <p>
          Uma Virtual Cloud Network é uma rede virtual, privada e definida por software, que você cria em uma região da
          OCI. Ela cobre um ou mais blocos CIDR IPv4 (ou prefixos IPv6) e é dividida em subnets. É o equivalente em nuvem
          da rede de um datacenter tradicional.
        </p>
        <ul className="plain">
          <li>
            O tamanho permitido do CIDR IPv4 vai de <b>/16 a /30</b>. Exemplo: <code>10.0.0.0/16</code>.
          </li>
          <li>Os CIDRs da VCN não podem se sobrepor entre si, nem aos da rede on-premises ou de VCNs com peering.</li>
          <li>Você pode usar uma faixa publicamente roteável, mas a Oracle recomenda as privadas da RFC 1918.</li>
        </ul>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Este CIDR serve para a VCN?">
        <VcnCidrCheck />
      </LessonBlock>

      <LessonBlock tag="Regras" title="O que vem com a VCN">
        <FactGrid>
          <Fact title="Route table padrão">Vem sem regras explícitas. Toda subnet a usa, se você não escolher outra.</Fact>
          <Fact title="Security list padrão">Traz regras básicas de conectividade, como o SSH.</Fact>
          <Fact title="DHCP options padrão">Conjunto com valores padrão, entregue às instâncias.</Fact>
          <Fact title="Não podem ser excluídos">Esses três componentes padrão ficam na VCN. Não existe NSG padrão.</Fact>
          <Fact title="Faixas proibidas">
            169.254.0.0/16 (iSCSI e metadados) e as classes D (224.0.0.0 a 239.255.255.255) e E (240.0.0.0 em diante).
          </Fact>
          <Fact title="IPv6">
            Prefixo alocado pela Oracle é sempre /56. Subnets IPv6 são sempre /64.
          </Fact>
        </FactGrid>
        <Callout title="Planeje o CIDR antes" variant="blue">
          <p>
            Trocar o endereçamento depois que há peering ou VPN é trabalhoso. Reserve um bloco por VCN, sem repetir os da
            empresa.
          </p>
        </Callout>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={vcnQuiz} />
      </LessonBlock>

      <Review
        items={[
          'VCN = rede privada virtual da sua tenancy, em uma região.',
          'CIDR IPv4 de /16 a /30, sem sobrepor on-premises nem VCNs com peering.',
          'Nasce com route table, security list e DHCP options padrão, que não são excluídos.',
          'Proibidos: 169.254.0.0/16 e as classes D e E.',
        ]}
      />
      <LessonSources links={[DOCS.overview]} />
    </LessonLayout>
  );
}
