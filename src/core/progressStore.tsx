import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import { readJSON, removeKey, writeJSON } from './storage';
import type {
  ImportResult,
  ProgressState,
  QuizAnswers,
  SectionProgress,
} from './types';

export const PROGRESS_KEY = 'oci-study:v1:progress';

/* ---------- estado inicial e validação ---------- */

const emptyState = (): ProgressState => ({ version: 1, sections: {} });
const emptySection = (): SectionProgress => ({ lessonsRead: {}, quizzes: {} });

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/**
 * Valida qualquer dado vindo do localStorage ou de um arquivo importado.
 * Devolve um estado limpo, ou null se o formato não for reconhecido.
 */
export function sanitizeProgress(raw: unknown): ProgressState | null {
  if (!isRecord(raw) || raw.version !== 1 || !isRecord(raw.sections)) return null;

  const sections: Record<string, SectionProgress> = {};
  for (const [sectionId, value] of Object.entries(raw.sections)) {
    if (!isRecord(value)) continue;
    const sp = emptySection();

    if (isRecord(value.lessonsRead)) {
      for (const [lessonId, flag] of Object.entries(value.lessonsRead)) {
        if (flag === true) sp.lessonsRead[lessonId] = true;
      }
    }

    if (isRecord(value.quizzes)) {
      for (const [quizId, rawAnswers] of Object.entries(value.quizzes)) {
        if (!isRecord(rawAnswers)) continue;
        const answers: QuizAnswers = {};
        for (const [q, o] of Object.entries(rawAnswers)) {
          const qi = Number(q);
          if (Number.isInteger(qi) && qi >= 0 && typeof o === 'number' && Number.isInteger(o) && o >= 0 && o < 10) {
            answers[qi] = o;
          }
        }
        sp.quizzes[quizId] = answers;
      }
    }

    const sc = value.skillCheck;
    if (isRecord(sc) && typeof sc.bestScore === 'number' && sc.bestScore >= 0 && sc.bestScore <= 100) {
      sp.skillCheck = {
        bestScore: sc.bestScore,
        updatedAt: typeof sc.updatedAt === 'string' ? sc.updatedAt : '',
      };
    }

    sections[sectionId] = sp;
  }
  return { version: 1, sections };
}

function loadInitial(): ProgressState {
  return sanitizeProgress(readJSON<unknown>(PROGRESS_KEY, null)) ?? emptyState();
}

/* ---------- reducer ---------- */

type Action =
  | { type: 'toggleLesson'; sectionId: string; lessonId: string }
  | { type: 'answerQuiz'; sectionId: string; quizId: string; question: number; option: number }
  | { type: 'resetQuiz'; sectionId: string; quizId: string }
  | { type: 'setSkillScore'; sectionId: string; score: number; at: string }
  | { type: 'clearSkillScore'; sectionId: string }
  | { type: 'replace'; state: ProgressState }
  | { type: 'reset' };

function updateSection(
  state: ProgressState,
  sectionId: string,
  fn: (sp: SectionProgress) => SectionProgress,
): ProgressState {
  const current = state.sections[sectionId] ?? emptySection();
  return { ...state, sections: { ...state.sections, [sectionId]: fn(current) } };
}

function reducer(state: ProgressState, action: Action): ProgressState {
  switch (action.type) {
    case 'toggleLesson':
      return updateSection(state, action.sectionId, (sp) => ({
        ...sp,
        lessonsRead: { ...sp.lessonsRead, [action.lessonId]: !sp.lessonsRead[action.lessonId] },
      }));

    case 'answerQuiz':
      return updateSection(state, action.sectionId, (sp) => ({
        ...sp,
        quizzes: {
          ...sp.quizzes,
          [action.quizId]: { ...(sp.quizzes[action.quizId] ?? {}), [action.question]: action.option },
        },
      }));

    case 'resetQuiz':
      return updateSection(state, action.sectionId, (sp) => {
        const quizzes = { ...sp.quizzes };
        delete quizzes[action.quizId];
        return { ...sp, quizzes };
      });

    case 'setSkillScore':
      return updateSection(state, action.sectionId, (sp) => ({
        ...sp,
        // Como na plataforma da Oracle, guarda sempre a maior nota ("Highest score").
        skillCheck: {
          bestScore: Math.max(sp.skillCheck?.bestScore ?? 0, action.score),
          updatedAt: action.at,
        },
      }));

    case 'clearSkillScore':
      return updateSection(state, action.sectionId, (sp) => {
        const { skillCheck: _removed, ...rest } = sp;
        void _removed;
        return rest;
      });

    case 'replace':
      return action.state;

    case 'reset':
      return emptyState();

    default:
      return state;
  }
}

/* ---------- contexto ---------- */

interface ProgressApi {
  state: ProgressState;
  /** true quando o navegador recusou salvar (janela privada, dados bloqueados). */
  saveFailed: boolean;
  toggleLesson(sectionId: string, lessonId: string): void;
  answerQuiz(sectionId: string, quizId: string, question: number, option: number): void;
  resetQuiz(sectionId: string, quizId: string): void;
  setSkillScore(sectionId: string, score: number): void;
  clearSkillScore(sectionId: string): void;
  exportJSON(): string;
  importJSON(text: string): ImportResult;
  resetAll(): void;
}

const ProgressContext = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);
  const [saveFailed, setSaveFailed] = useState(false);

  // Persiste a cada mudança.
  useEffect(() => {
    setSaveFailed(!writeJSON(PROGRESS_KEY, state));
  }, [state]);

  // Mantém várias abas do mesmo navegador em sincronia.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === PROGRESS_KEY || e.key === null) {
        dispatch({ type: 'replace', state: loadInitial() });
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleLesson = useCallback(
    (sectionId: string, lessonId: string) => dispatch({ type: 'toggleLesson', sectionId, lessonId }),
    [],
  );
  const answerQuiz = useCallback(
    (sectionId: string, quizId: string, question: number, option: number) =>
      dispatch({ type: 'answerQuiz', sectionId, quizId, question, option }),
    [],
  );
  const resetQuiz = useCallback(
    (sectionId: string, quizId: string) => dispatch({ type: 'resetQuiz', sectionId, quizId }),
    [],
  );
  const setSkillScore = useCallback(
    (sectionId: string, score: number) =>
      dispatch({ type: 'setSkillScore', sectionId, score, at: new Date().toISOString() }),
    [],
  );
  const clearSkillScore = useCallback(
    (sectionId: string) => dispatch({ type: 'clearSkillScore', sectionId }),
    [],
  );

  const exportJSON = useCallback(() => JSON.stringify(state, null, 2), [state]);

  const importJSON = useCallback((text: string): ImportResult => {
    try {
      const clean = sanitizeProgress(JSON.parse(text));
      if (!clean) return { ok: false, message: 'Arquivo inválido: não parece um backup deste app.' };
      dispatch({ type: 'replace', state: clean });
      return { ok: true, message: 'Progresso importado.' };
    } catch {
      return { ok: false, message: 'Não foi possível ler o arquivo. Use um .json exportado por este app.' };
    }
  }, []);

  const resetAll = useCallback(() => {
    removeKey(PROGRESS_KEY);
    dispatch({ type: 'reset' });
  }, []);

  const value = useMemo<ProgressApi>(
    () => ({
      state,
      saveFailed,
      toggleLesson,
      answerQuiz,
      resetQuiz,
      setSkillScore,
      clearSkillScore,
      exportJSON,
      importJSON,
      resetAll,
    }),
    [state, saveFailed, toggleLesson, answerQuiz, resetQuiz, setSkillScore, clearSkillScore, exportJSON, importJSON, resetAll],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressApi {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress precisa estar dentro de <ProgressProvider>.');
  return ctx;
}
