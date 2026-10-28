import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { NavLink, useLocation, useMatch } from 'react-router-dom';
import { cx } from '../../core/cx';
import { STATUS_LABEL, summarizeSection } from '../../core/progressMath';
import { useProgress } from '../../core/progressStore';
import { findSection, sections } from '../../sections/registry';
import { ProgressBar } from '../ui/ProgressBar';

/** Acima desta quantidade de seções o menu ganha um campo de busca. */
const SEARCH_FROM = 8;

/**
 * Menu de seções em painel lateral. A barra superior mostra só o botão "Seções"
 * (e o número da seção atual), então ela não cresce quando o curso ganha seções.
 * O painel rola por dentro, fecha com Esc, clique fora ou ao navegar.
 */
export function SectionsMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { pathname } = useLocation();
  const { state } = useProgress();
  const match = useMatch('/secao/:sectionId/*');
  const current = findSection(match?.params.sectionId);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const titleId = useId();

  const close = () => setOpen(false);

  // Navegou: fecha o painel e limpa a busca.
  useEffect(() => {
    setOpen(false);
    setQuery('');
  }, [pathname]);

  // Foco: entra no painel ao abrir e volta para o botão ao fechar. Trava a rolagem da página.
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      wasOpen.current = true;
      return () => {
        document.body.style.overflow = previous;
      };
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
    return undefined;
  }, [open]);

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== 'Tab') return;
    const nodes = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input');
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const showSearch = sections.length > SEARCH_FROM;
  const needle = query.trim().toLowerCase();
  const visible = needle
    ? sections.filter((s) => `seção ${s.number} ${s.title} ${s.shortTitle}`.toLowerCase().includes(needle))
    : sections;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="menu-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="menu-trigger__icon" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>Seções</span>
        {current && <span className="menu-trigger__cur">Seção {current.number}</span>}
      </button>

      {open && (
        <div className="drawer" onKeyDown={onKeyDown}>
          <div className="drawer__backdrop" onClick={close} aria-hidden="true" />
          <aside ref={panelRef} className="drawer__panel" role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <div className="drawer__head">
              <h2 id={titleId}>Seções</h2>
              <button ref={closeRef} type="button" className="btn btn--ghost btn--sm" onClick={close}>
                Fechar
              </button>
            </div>

            {showSearch && (
              <div className="drawer__search field">
                <label htmlFor={`${titleId}-q`}>Buscar seção</label>
                <input
                  id={`${titleId}-q`}
                  type="search"
                  value={query}
                  placeholder="Número ou título"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            )}

            <nav aria-label="Seções do curso" className="drawer__nav">
              <ul>
                <li>
                  <NavLink to="/" end className={({ isActive }) => cx('drawer__item', 'drawer__item--home', isActive && 'is-active')}>
                    <span className="drawer__title">Página inicial</span>
                    <span className="drawer__status">Todas as seções e o backup do progresso</span>
                  </NavLink>
                </li>
                {visible.map((s) => {
                  const summary = summarizeSection(s, state.sections[s.id]);
                  const soon = summary.status === 'soon';
                  return (
                    <li key={s.id}>
                      <NavLink
                        to={`/secao/${s.id}`}
                        className={({ isActive }) => cx('drawer__item', isActive && 'is-active', soon && 'is-soon')}
                      >
                        <span className="drawer__n">Seção {s.number}</span>
                        <span className="drawer__title">{s.title}</span>
                        <span className="drawer__status">
                          {STATUS_LABEL[summary.status]}
                          {!soon && ` · ${summary.percent}%`}
                        </span>
                        {!soon && <ProgressBar percent={summary.percent} label={`Progresso da seção ${s.number}`} />}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              {visible.length === 0 && <p className="muted drawer__empty">Nenhuma seção encontrada.</p>}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
