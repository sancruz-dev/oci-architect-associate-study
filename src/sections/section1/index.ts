import type { SectionDef } from '../../core/types';
import { DomainsLesson } from './lessons/DomainsLesson';
import { IntroLesson } from './lessons/IntroLesson';
import { TypesLesson } from './lessons/TypesLesson';

export const section1: SectionDef = {
  id: 'secao-1',
  number: 1,
  title: 'Identity and Access Management Overview',
  shortTitle: 'IAM Overview',
  summary:
    'Como o OCI autentica e autoriza: identity domains, policies, compartimentos e os tipos de domain.',
  lessons: [
    { id: 'intro', title: 'Introdução ao OCI IAM', minutes: 9, Component: IntroLesson },
    { id: 'dominios', title: 'Visão geral de Identity Domains', minutes: 9, Component: DomainsLesson },
    { id: 'tipos', title: 'Tipos de Identity Domain', minutes: 5, Component: TypesLesson },
  ],
  skillCheck: { passScore: 80, chatPhrase: 'Pronto para a skill check da Seção 1' },
};
