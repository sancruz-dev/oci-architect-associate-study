import type { SectionDef } from '../../core/types';
import { AdvancedPoliciesLesson } from './lessons/AdvancedPoliciesLesson';
import { ConditionsLesson } from './lessons/ConditionsLesson';
import { DynamicGroupsLesson } from './lessons/DynamicGroupsLesson';
import { InheritanceLesson } from './lessons/InheritanceLesson';
import { NetworkSourcesLesson } from './lessons/NetworkSourcesLesson';
import { OptimizationLesson } from './lessons/OptimizationLesson';
import { TbacLesson } from './lessons/TbacLesson';

/**
 * Seção 2 do curso. Na plataforma da Oracle University aparece como seção 3
 * ("Identity and Access Management - Advanced"). Os itens "Demo:" e "Use-Case:" ficam de fora, e as
 * duas partes de IAM Policy Optimization viram uma lição só.
 */
export const section2: SectionDef = {
  id: 'secao-2',
  number: 2,
  title: 'Identity and Access Management - Advanced',
  shortTitle: 'IAM Advanced',
  summary:
    'Herança e anexação de policies, condições, recursos avançados da sintaxe, controle de acesso por tags, network sources, dynamic groups e otimização de policies.',
  lessons: [
    { id: 'heranca', title: 'Herança e anexação de policies em compartimentos', minutes: 7, Component: InheritanceLesson },
    { id: 'condicionais', title: 'Conditional Policies', minutes: 7, Component: ConditionsLesson },
    { id: 'avancadas', title: 'Advanced Policies', minutes: 6, Component: AdvancedPoliciesLesson },
    { id: 'tbac', title: 'Tag Based Access Control', minutes: 10, Component: TbacLesson },
    { id: 'network-sources', title: 'Network Sources', minutes: 3, Component: NetworkSourcesLesson },
    { id: 'dynamic-groups', title: 'Dynamic Groups', minutes: 8, Component: DynamicGroupsLesson },
    { id: 'otimizacao', title: 'IAM Policy Optimization', minutes: 17, Component: OptimizationLesson },
  ],
  skillCheck: { passScore: 80, chatPhrase: 'Pronto para a skill check da Seção 2' },
};
