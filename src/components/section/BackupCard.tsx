import { useRef, useState, type ChangeEvent } from 'react';
import { cx } from '../../core/cx';
import { useProgress } from '../../core/progressStore';
import { Box } from '../ui/Box';

/**
 * Backup do progresso. O localStorage vive só em um navegador e some se o
 * usuário limpar os dados do site; exportar e importar resolve os dois casos.
 */
export function BackupCard() {
  const { exportJSON, importJSON, resetAll } = useProgress();
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [confirming, setConfirming] = useState(false);

  const doExport = () => {
    const blob = new Blob([exportJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oci-study-progresso-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setMessage({ ok: true, text: 'Backup exportado. Guarde o arquivo .json.' });
  };

  const doImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const result = importJSON(await file.text());
      setMessage({ ok: result.ok, text: result.message });
    } catch {
      setMessage({ ok: false, text: 'Não foi possível abrir o arquivo.' });
    }
  };

  const doReset = () => {
    resetAll();
    setConfirming(false);
    setMessage({ ok: true, text: 'Progresso zerado.' });
  };

  return (
    <section className="backup" aria-labelledby="backup-title">
      <Box>
        <h3 id="backup-title">Backup do progresso</h3>
        <p className="muted">
          Seu progresso fica salvo só neste navegador. Exporte um arquivo para guardar ou para abrir em outro navegador.
        </p>
        <div className="backup__actions">
          <button type="button" className="btn btn--sm" onClick={doExport}>
            Exportar progresso
          </button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => fileRef.current?.click()}>
            Importar progresso
          </button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => setConfirming(true)}>
            Zerar progresso
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={doImport} aria-label="Arquivo de backup" />
        </div>

        {confirming && (
          <div className="confirm" role="alert">
            <p>Isso apaga lições lidas, respostas dos autotestes e notas. Não dá para desfazer.</p>
            <button type="button" className="btn btn--danger btn--sm" onClick={doReset}>
              Sim, zerar tudo
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setConfirming(false)}>
              Cancelar
            </button>
          </div>
        )}

        {message && (
          <p className={cx('backup__msg', !message.ok && 'error')} aria-live="polite">
            {message.text}
          </p>
        )}
      </Box>
    </section>
  );
}
