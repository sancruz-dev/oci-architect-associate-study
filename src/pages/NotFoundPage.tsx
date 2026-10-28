import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="container hero">
      <p className="eyebrow">Página não encontrada</p>
      <h1>Esse endereço não existe</h1>
      <p>
        <Link to="/">Voltar para as seções</Link>
      </p>
    </main>
  );
}
