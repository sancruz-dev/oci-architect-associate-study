import { LessonBlock, LessonSources } from '../../../components/lesson/LessonBlock';
import { LessonLayout } from '../../../components/lesson/LessonLayout';
import { Quiz } from '../../../components/quiz/Quiz';
import { Callout } from '../../../components/ui/Callout';
import { Fact, FactGrid } from '../../../components/ui/FactGrid';
import { SubnetOverlapLab } from '../interactive/SubnetOverlapLab';
import { subnetsQuiz } from '../quizzes';
import { DOCS, Review } from './Review';

export function SubnetsLesson() {
  return (
    <LessonLayout lead="Subnet é a fatia da VCN onde os recursos de fato ficam. Cada uma tem a sua route table, as suas regras de segurança e o seu tipo: pública ou privada.">
      <LessonBlock tag="Conceito" title="O que é uma subnet">
        <p>
          Uma subnet é uma subdivisão do CIDR da VCN, como <code>10.0.1.0/24</code>. As subnets de uma VCN não podem se
          sobrepor, e cada uma precisa caber inteira no CIDR da VCN. Cada subnet usa:
        </p>
        <ul className="plain">
          <li>
            <b>uma</b> route table;
          </li>
          <li>
            <b>uma ou mais</b> security lists (até 5);
          </li>
          <li>
            <b>um</b> conjunto de DHCP options.
          </li>
        </ul>
      </LessonBlock>

      <LessonBlock tag="Escopo" title="Regional ou específica de AD">
        <FactGrid>
          <Fact title="Regional">
            Abrange todos os availability domains da região. É a que a Oracle recomenda, por ser mais flexível.
          </Fact>
          <Fact title="Específica de AD">
            Só aceita recursos de um availability domain. Em tudo mais se comporta como a regional.
          </Fact>
          <Fact title="Convivem">Os dois tipos podem existir na mesma VCN.</Fact>
          <Fact title="Pública ou privada">
            Você escolhe ao criar. Na pública, as VNICs podem ter IP público. Na privada, não.
          </Fact>
        </FactGrid>
      </LessonBlock>

      <LessonBlock tag="Reserva" title="Três endereços a menos">
        <p>Em cada subnet, o OCI reserva três endereços. Exemplo para 192.168.0.0/24:</p>
        <ul className="plain">
          <li>
            <code>192.168.0.0</code>: o endereço de rede (o primeiro do bloco).
          </li>
          <li>
            <code>192.168.0.1</code>: o gateway padrão da subnet (o primeiro host).
          </li>
          <li>
            <code>192.168.0.255</code>: o broadcast (o último).
          </li>
        </ul>
        <p>Sobram <code>192.168.0.2</code> a <code>192.168.0.254</code>, ou seja, 253 endereços.</p>
      </LessonBlock>

      <LessonBlock tag="Interativo" title="A nova subnet cabe?">
        <SubnetOverlapLab />
      </LessonBlock>

      <Callout title="Planeje o tamanho">
        <p>
          Lembre que 3 endereços de cada subnet são reservados. Em subnets muito pequenas, como um /30, sobra 1 endereço
          utilizável. Deixe espaço no CIDR da VCN para subnets futuras.
        </p>
      </Callout>

      <LessonBlock tag="Autoteste" title="Confira o que ficou">
        <Quiz items={subnetsQuiz} />
      </LessonBlock>

      <Review
        items={[
          'Subnet = fatia do CIDR da VCN. Não se sobrepõe a outras e cabe dentro da VCN.',
          'Uma route table, uma ou mais security lists e um DHCP options por subnet.',
          '3 endereços reservados por subnet: rede, gateway padrão (primeiro host) e broadcast.',
          'Prefira subnets regionais. Pública ou privada é decidido na criação.',
        ]}
      />
      <LessonSources links={[DOCS.overview]} />
    </LessonLayout>
  );
}
