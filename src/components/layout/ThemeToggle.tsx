import { useTheme, type ThemeChoice } from '../../core/theme';

const OPTIONS: Array<{ id: ThemeChoice; label: string }> = [
  { id: 'system', label: 'Auto' },
  { id: 'light', label: 'Claro' },
  { id: 'dark', label: 'Escuro' },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="theme-toggle" role="group" aria-label="Tema">
      {OPTIONS.map((o) => (
        <button key={o.id} type="button" aria-pressed={theme === o.id} onClick={() => setTheme(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
