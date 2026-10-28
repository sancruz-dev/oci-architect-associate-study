import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { CodeBlock } from '../../../components/ui/CodeBlock';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { GatewayReachabilityLab } from '../interactive/GatewayReachabilityLab';
import { igwQuiz } from '../quizzes';
import { DOCS, Review } from './Review';

export function IgwLesson() {
  return (
    <LessonLayout lead="O internet gateway é a porta da VCN para a internet, nos dois sentidos. Criar o gateway não abre nada sozinho: ainda faltam IP público, rota e regra de segurança.">
      <LessonBlock tag="Conceito" title="O que é">
        <p>
          É um roteador virtual opcional na borda da VCN. Ele aceita conexões que partem de dentro (egress) e conexões
          que vêm da internet (ingress). Uma VCN tem no máximo <b>um</b>, e todas as subnets públicas podem usá-lo.
        </p>
      </LessonBlock>

      <LessonBlock tag="Passo a passo" title="Os quatro requisitos">
        <ol className="plain">
          <li>
            Recurso em <b>subnet pública</b>.
          </li>
          <li>
            <b>IP público</b>: os dois lados da conexão precisam de IP público para o roteamento.
          </li>
          <li>
            <b>Rota</b> na route table da subnet:
          </li>
        </ol>
        <CodeBlock>{`Destino 0.0.0.0/0  →  Alvo: Internet Gateway`}</CodeBlock>
        <ol className="plain" start={4}>
          <li>
            <b>Regra de segurança</b>. Para HTTPS de entrada: ingress TCP 443 com origem 0.0.0.0/0.
          </li>
        </ol>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Desligue um requisito">
        <GatewayReachabilityLab mode="igw" />
      </LessonBlock>

      <LessonBlock tag="Regras" title="O que costuma cair">
        <FactGrid>
          <Fact title="Criado já habilitado">
            Um gateway novo vem habilitado, mas nada passa sem a rota. Dá para desabilitar e reabilitar quando quiser.
          </Fact>
          <Fact title="Só a própria VCN">
            Hosts de rede on-premises ou de VCNs com peering não usam o internet gateway desta VCN.
          </Fact>
          <Fact title="Serviços Oracle">
            Para falar com IPs públicos da própria OCI, como o Object Storage, prefira o service gateway.
          </Fact>
          <Fact title="Exclusão">Nenhuma route table pode listá-lo como alvo na hora de excluir.</Fact>
        </FactGrid>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={igwQuiz} />
      </LessonBlock>

      <Review
        items={[
          'IGW: entrada e saída, um por VCN.',
          'Precisa de subnet pública, IP público, rota 0.0.0.0/0 → IGW e regra de segurança.',
          'Só atende a própria VCN. Para serviços Oracle, use o service gateway.',
        ]}
      />
      <LessonSources links={[DOCS.igw]} />
    </LessonLayout>
  );
}
