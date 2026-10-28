import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Callout } from '../../../components/ui/Callout';
import { PrivateEgressPaths } from '../interactive/PrivateEgressPaths';
import { privateQuiz } from '../quizzes';
import { DOCS, Review } from './Review';

export function PrivateSubnetLesson() {
  return (
    <LessonLayout lead="Subnet privada é onde ficam os recursos que a internet não deve alcançar. Eles têm só IP privado e saem pelos gateways certos.">
      <LessonBlock tag="Definição" title="O que torna a subnet privada">
        <p>
          Em uma subnet privada, as VNICs <b>não podem</b> ter IPs públicos IPv4. Ninguém da internet chega até elas
          diretamente. Para o que a instância precisa fazer, cada caminho tem o seu gateway.
        </p>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Por onde a instância privada sai?">
        <PrivateEgressPaths />
      </LessonBlock>

      <Callout title="Arquitetura clássica em três camadas" variant="blue">
        <p>
          Load balancer na subnet pública. Aplicação e banco em subnets privadas. A aplicação sai pelo NAT, o banco faz
          backup pelo service gateway, e as regras de segurança deixam cada camada falar só com a vizinha.
        </p>
      </Callout>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={privateQuiz} />
      </LessonBlock>

      <Review
        items={[
          'Subnet privada: sem IP público. A internet não a alcança direto.',
          'Saída para a internet: NAT. Serviços Oracle: service gateway. Datacenter: DRG.',
          'Entrada da internet: load balancer em subnet pública.',
          'Entre subnets da mesma VCN a rota é local. Quem controla é a regra de segurança.',
        ]}
      />
      <LessonSources links={[DOCS.overview, DOCS.nat, DOCS.sgw]} />
    </LessonLayout>
  );
}
