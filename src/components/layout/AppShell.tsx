import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useProgress } from '../../core/progressStore';
import { SectionsMenu } from './SectionsMenu';
import { ThemeToggle } from './ThemeToggle';

/** Moldura de todas as páginas: barra superior, menu de seções, aviso de salvamento e rodapé. */
export function AppShell() {
  const { pathname } = useLocation();
  const { saveFailed } = useProgress();

  // Ao trocar de página, volta ao topo.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <header className="appbar">
        <div className="container appbar__in">
          <Link to="/" className="brand">
            OCI <span>Architect</span>
          </Link>
          <SectionsMenu />
          <span className="appbar__spacer" />
          <ThemeToggle />
        </div>
      </header>

      {saveFailed && (
        <div className="notice" role="alert">
          <div className="container">
            <p>
              O navegador não deixou salvar o progresso (janela privada ou dados do site bloqueados). O que você marcar
              agora some ao fechar a página.
            </p>
          </div>
        </div>
      )}

      <Outlet />

      <div className="container">
        <footer className="footer">
          <p>O progresso fica salvo só neste navegador (localStorage). Use o backup na página inicial para levar para outro.</p>
        </footer>
      </div>
    </>
  );
}
