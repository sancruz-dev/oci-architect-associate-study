import { HashRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './core/theme';
import { ProgressProvider } from './core/progressStore';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { SectionRoute } from './pages/SectionRoute';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * HashRouter: as rotas ficam depois do "#", então o app funciona em qualquer
 * hospedagem estática, sem configurar redirecionamento no servidor.
 */
export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <HashRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<HomePage />} />
              <Route path="secao/:sectionId" element={<SectionRoute />} />
              <Route path="secao/:sectionId/:lessonId" element={<SectionRoute />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </ProgressProvider>
    </ThemeProvider>
  );
}
