import { Link } from 'react-router-dom';
import { summarizeSection } from '../../core/progressMath';
import type { SectionDef } from '../../core/types';
import { Box } from '../ui/Box';
import { SectionHero } from './SectionHero';

/** Seção cadastrada, mas ainda sem lições escritas. Mostra o roteiro previsto. */
export function ComingSoon({ section }: { section: SectionDef }) {
  const planned = section.planned ?? [];
  return (
    <>
      <SectionHero section={section} summary={summarizeSection(section)} />
      <main className="container">
        <Box title="Conteúdo em breve">
          <p>
            Esta seção ainda não tem lições escritas. Para criar o conteúdo, peça no chat a próxima seção. O roteiro
            abaixo segue a ordem da Oracle University.
          </p>
          {planned.length > 0 && (
            <ul className="outline" aria-label="Roteiro previsto">
              {planned.map((l) => (
                <li key={l.title}>
                  <span>{l.title}</span>
                  <span>{l.minutes} min</span>
                </li>
              ))}
            </ul>
          )}
        </Box>
        <p style={{ marginTop: 16 }}>
          <Link to="/">← Voltar para as seções</Link>
        </p>
      </main>
    </>
  );
}
