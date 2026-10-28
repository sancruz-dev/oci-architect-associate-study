import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Callout } from '../../../components/ui/Callout';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { GatewayReachabilityLab } from '../interactive/GatewayReachabilityLab';
import { natQuiz } from '../quizzes';
import { DOCS, Review } from './Review';

export function NatLesson() {
  return (
    <LessonLayout lead="O NAT gateway deixa recursos sem IP público saírem para a internet, para baixar patches, por exemplo, sem ficarem expostos a conexões de fora.">
      <LessonBlock tag="Conceito" title="Só saída">
        <p>
          A instância inicia a conexão e recebe a resposta. A internet não consegue iniciar conexão com ela. O IP público
          do NAT gateway vira a origem do tráfego de saída. Ele pode ser gerado pelo serviço ou ser um IP público reservado
          que você informa.
        </p>
        <p>Para a subnet usar o gateway, a route table precisa da regra:</p>
        <CodeBlock>{`Destino 0.0.0.0/0  →  Alvo: NAT Gateway (compartimento do gateway)`}</CodeBlock>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Tente abrir conexão de fora">
        <GatewayReachabilityLab mode="nat" />
      </LessonBlock>

      <LessonBlock tag="Regras" title="O que costuma cair">
        <FactGrid>
          <Fact title="Protocolos">TCP, UDP e ping (ICMP).</Fact>
          <Fact title="Bloquear">
            Dá para bloquear e liberar o gateway a qualquer momento. Bloqueado, nada passa, mesmo com rota e regras
            corretas.
          </Fact>
          <Fact title="Um por subnet">Uma subnet roteia para um único NAT gateway.</Fact>
          <Fact title="Só a própria VCN">
            Recursos de VCN com peering ou da rede on-premises (VPN, FastConnect) não o usam.
          </Fact>
          <Fact title="Limite de conexões">Até 20.000 conexões simultâneas para um mesmo endereço e porta de destino.</Fact>
          <Fact title="Exclusão">Antes, exclua as regras da VCN que o usam como alvo.</Fact>
        </FactGrid>
        <Callout title="NAT × internet gateway" variant="blue">
          <p>
            Internet gateway: IP público, entrada e saída. NAT gateway: sem IP público, só saída. Se a pergunta diz “sem
            ficar exposto à internet”, é NAT.
          </p>
        </Callout>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={natQuiz} />
      </LessonBlock>

      <Review
        items={[
          'NAT gateway: só saída. Respostas voltam, mas conexões iniciadas pela internet, não.',
          'Rota 0.0.0.0/0 → NAT na route table da subnet privada.',
          'Dá para bloquear o gateway sem excluí-lo. Protocolos: TCP, UDP e ICMP ping.',
        ]}
      />
      <LessonSources links={[DOCS.nat]} />
    </LessonLayout>
  );
}
