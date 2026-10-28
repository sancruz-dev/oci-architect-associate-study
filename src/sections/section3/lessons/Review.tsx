import type { ReactNode } from 'react';
import { LessonBlock } from '../../../components/lesson/LessonBlock';
import { Box } from '../../../components/ui/Box';

/** Bloco “O que levar desta lição”, igual em todas as lições da seção. */
export function Review({ items }: { items: ReactNode[] }) {
  return (
    <LessonBlock tag="Revisão" title="O que levar desta lição">
      <Box>
        <ul className="plain" style={{ maxWidth: 'none' }}>
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </Box>
    </LessonBlock>
  );
}

export const DOCS = {
  overview: { href: 'https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/overview.htm', label: 'Networking Overview' },
  routes: { href: 'https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/managingroutetables.htm', label: 'VCN Route Tables' },
  igw: { href: 'https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/managingIGs.htm', label: 'Internet Gateway' },
  nat: { href: 'https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/NATgateway.htm', label: 'NAT Gateway' },
  sgw: { href: 'https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/servicegateway.htm', label: 'Service Gateway' },
  rules: { href: 'https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/securityrules.htm', label: 'Security Rules' },
  lists: { href: 'https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/securitylists.htm', label: 'Security Lists' },
};
