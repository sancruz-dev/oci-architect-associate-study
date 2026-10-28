import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Callout } from '../../../components/ui/Callout';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { SgwRoutingLab } from '../interactive/SgwRoutingLab';
import { sgwQuiz } from '../quizzes';
import { DOCS, Review } from './Review';

export function SgwLesson() {
  return (
    <LessonLayout lead="O service gateway leva o tráfego da VCN aos serviços da Oracle pela rede interna da OCI. Sem internet, sem NAT e sem IP público.">
      <LessonBlock tag="Conceito" title="Oracle Services Network">
        <p>
          O <b>Oracle Services Network</b> (OSN) é uma rede conceitual reservada aos serviços da Oracle, como o Object
          Storage. Esses serviços têm IPs públicos que, sem o service gateway, você alcançaria pela internet. Com ele, o
          tráfego segue pela rede da Oracle e nunca atravessa a internet.
        </p>
        <p>Um service gateway por VCN basta. Ele é regional e só fala com serviços da mesma região da VCN.</p>
      </LessonBlock>

      <LessonBlock tag="Labels" title="Service CIDR labels">
        <p>
          O destino da rota não é um CIDR, e sim um <b>service CIDR label</b>: um apelido para as faixas públicas do
          serviço. Se as faixas mudarem, você não ajusta nem rotas nem regras de segurança.
        </p>
        <ul className="plain">
          <li>
            <code>OCI &lt;region&gt; Object Storage</code>: só o Object Storage da região.
          </li>
          <li>
            <code>All &lt;region&gt; Services in Oracle Services Network</code>: todos os serviços do OSN na região.
          </li>
        </ul>
        <p>Para o Object Storage, o gateway usa um label de cada vez.</p>
        <CodeBlock>{`Rota:    Destino (service) All <region> Services in OSN  →  Service Gateway\nEgress:  Destino tipo Service, label acima · TCP · porta 443`}</CodeBlock>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Que rotas fazem o tráfego chegar?">
        <SgwRoutingLab />
      </LessonBlock>

      <LessonBlock tag="Regras" title="O que costuma cair">
        <FactGrid>
          <Fact title="Subnet privada basta">Os recursos usam só IP privado. Não precisam de IGW nem de NAT para os serviços Oracle.</Fact>
          <Fact title="NAT continua útil">
            Para destinos fora do OSN, como baixar de um site de terceiros, o service gateway não ajuda. Use o NAT.
          </Fact>
          <Fact title="Segurança stateful">Basta uma regra de egress com destino do tipo Service.</Fact>
          <Fact title="Segurança stateless">Precisa de egress (destino Service) e de ingress (origem Service).</Fact>
          <Fact title="On-premises">
            Quem está no datacenter alcança o OSN por IP privado, passando pela VCN e pelo service gateway, via
            FastConnect ou VPN Site-to-Site.
          </Fact>
          <Fact title="Mais restrição">
            Com um network source da VCN, uma policy IAM pode exigir que o acesso ao bucket venha por esse gateway.
          </Fact>
        </FactGrid>
        <Callout title="Service gateway × internet gateway" variant="blue">
          <p>
            Para falar com serviços Oracle, o service gateway é o caminho recomendado: privado e sem passar pela internet.
            O IGW é para a internet pública.
          </p>
        </Callout>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={sgwQuiz} />
      </LessonBlock>

      <Review
        items={[
          'Service gateway = acesso privado ao Oracle Services Network, sem internet.',
          'Destino da rota é um service CIDR label, não um CIDR.',
          'Um por VCN, regional. Não exige IP público, IGW nem NAT.',
          'Terceiros e atualizações de fora do OSN continuam precisando do NAT.',
        ]}
      />
      <LessonSources links={[DOCS.sgw, DOCS.rules]} />
    </LessonLayout>
  );
}
