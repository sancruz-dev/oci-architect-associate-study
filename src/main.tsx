import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/ui.css';
import './styles/lesson.css';
import './styles/interactive.css';
import './styles/quiz.css';
import './styles/pages.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
