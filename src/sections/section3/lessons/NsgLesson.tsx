import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Callout } from '../../../components/ui/Callout';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { NsgTierDemo } from '../interactive/NsgTierDemo';
import { nsgQuiz } from '../quizzes';
import { DOCS, Review } from './Review';

export function NsgLesson() {
  return (
    <LessonLayout lead="NSG é um grupo de VNICs com regras próprias. Em vez de liberar IPs, você libera “quem está no grupo”, e a regra acompanha os recursos onde quer que estejam.">
      <LessonBlock tag="Conceito" title="Segurança por função, não por subnet">
        <p>
          Com NSGs você agrupa recursos pelo papel (web, app, banco) e escreve regras entre os grupos, sem depender de
          como as subnets foram desenhadas. As regras são ingress ou egress, stateful ou stateless, com origem ou destino
          do tipo CIDR, service ou <b>outro NSG</b>.
        </p>
        <p>
          A associação é feita no <b>recurso pai</b> (instância, load balancer...), e as regras valem para a sua VNIC. Em
          uma instância, a VNIC primária.
        </p>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="Três camadas, três NSGs">
        <p>Mude origem, destino e porta. Repare que as regras citam os NSGs, não IPs.</p>
        <NsgTierDemo />
      </LessonBlock>

      <LessonBlock tag="Regras" title="Limites e restrições">
        <FactGrid>
          <Fact title="Por VNIC">Até 5 NSGs. Não aumenta.</Fact>
          <Fact title="Por NSG">Até 120 regras, somando ingress e egress.</Fact>
          <Fact title="Por VCN">Até 1.000 NSGs.</Fact>
          <Fact title="Mesma VCN">
            Todas as VNICs do NSG, e os NSGs citados nas regras, precisam estar na VCN do NSG.
          </Fact>
          <Fact title="Sem NSG padrão">Diferente da security list, a VCN não vem com um NSG padrão.</Fact>
          <Fact title="Descrição">Só as regras de NSG aceitam descrição.</Fact>
        </FactGrid>
        <Callout title="IP público dentro da VCN">
          <p>
            Se duas VNICs da mesma VCN falam entre si usando IPs públicos, o tráfego passa pelo internet gateway e a
            referência a NSG não funciona. Use o IP público da VNIC como origem ou destino.
          </p>
        </Callout>
      </LessonBlock>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={nsgQuiz} />
      </LessonBlock>

      <Review
        items={[
          'NSG = grupo de VNICs com regras. Regras podem citar outro NSG como origem ou destino.',
          '5 NSGs por VNIC, 120 regras por NSG, 1.000 NSGs por VCN. Tudo na mesma VCN.',
          'A associação é no recurso pai. Não há NSG padrão.',
          'É a opção recomendada pela Oracle.',
        ]}
      />
      <LessonSources links={[DOCS.rules]} />
    </LessonLayout>
  );
}
