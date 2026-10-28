import { overallPercent, summarizeSection } from '../core/progressMath';
import { useProgress } from '../core/progressStore';
import { BackupCard } from '../components/section/BackupCard';
import { SectionCard } from '../components/section/SectionCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { sections } from '../sections/registry';

/** Página principal: escolher uma seção e ver o status de cada uma. */
export function HomePage() {
  const { state } = useProgress();
  const rows = sections.map((section) => ({
    section,
    summary: summarizeSection(section, state.sections[section.id]),
  }));
  const overall = overallPercent(rows.map((r) => r.summary));

  return (
    <>
      <header className="hero container">
        <p className="eyebrow">Oracle Cloud Infrastructure</p>
        <h1>Trilha de estudo: OCI Architect Associate</h1>
        <p>
          Leia cada seção, mexa nos exemplos, confira com os autotestes e valide com a skill check da Oracle. A
          porcentagem soma as lições lidas e a skill check aprovada.
        </p>
        <div className="overall">
          <div className="overall__row">
            <span>Progresso geral</span>
            <span className="overall__pct">{overall}%</span>
          </div>
          <ProgressBar percent={overall} label="Progresso geral" />
        </div>
      </header>

      <main className="container">
        <div className="sgrid">
          {rows.map(({ section, summary }) => (
            <SectionCard key={section.id} section={section} summary={summary} />
          ))}
        </div>
        <BackupCard />
      </main>
    </>
  );
}
