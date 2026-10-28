import { useState } from 'react';

interface CopyButtonProps {
  text: string;
}

/** Copia um texto. Se o navegador recusar, pede para o usuário copiar à mão. */
export function CopyButton({ text }: CopyButtonProps) {
  const [msg, setMsg] = useState('');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setMsg('Copiado.');
    } catch {
      setMsg('Selecione a frase e copie.');
    }
  };

  return (
    <>
      <button type="button" className="btn btn--ghost btn--sm" onClick={copy}>
        Copiar frase
      </button>
      <span className="figcap" style={{ margin: 0 }} aria-live="polite">
        {msg}
      </span>
    </>
  );
}
