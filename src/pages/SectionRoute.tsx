import { useParams } from 'react-router-dom';
import { SectionPage } from '../components/section/SectionPage';
import { findSection } from '../sections/registry';
import { NotFoundPage } from './NotFoundPage';

/** Liga a URL (/secao/:sectionId) à definição da seção correspondente. */
export function SectionRoute() {
  const { sectionId } = useParams();
  const section = findSection(sectionId);
  return section ? <SectionPage section={section} /> : <NotFoundPage />;
}
