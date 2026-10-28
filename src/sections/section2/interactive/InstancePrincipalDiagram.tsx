/**
 * Fluxo de um instance principal: a instância pede acesso sem credenciais guardadas,
 * o IAM confere se ela está no dynamic group e se há policy para o grupo.
 */
export function InstancePrincipalDiagram() {
  return (
    <svg
      viewBox="0 0 760 270"
      role="img"
      aria-label="Fluxo: uma instância de um compartimento chama o Object Storage sem credenciais guardadas. O IAM confere as regras do dynamic group e a policy Allow dynamic-group, e então permite ou nega."
    >
      <defs>
        <marker id="ip-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0L10 5L0 10z" className="s-arrow" />
        </marker>
      </defs>
      <rect className="s-outer" x="4" y="4" width="752" height="262" rx="10" />

      <rect className="s-comp" x="24" y="40" width="190" height="190" rx="8" />
      <text className="s-label" x="40" y="30">COMPARTIMENTO PROD</text>
      <rect className="s-prod" x="40" y="62" width="158" height="68" rx="6" />
      <text className="s-tb" x="56" y="88">Instância</text>
      <text className="s-m" x="56" y="108">vm-web-1</text>
      <text className="s-t" x="40" y="160">Sem usuário, sem senha,</text>
      <text className="s-t" x="40" y="180">sem chave guardada no código.</text>

      <rect className="s-dom" x="276" y="40" width="210" height="190" rx="8" />
      <text className="s-label" x="292" y="30">IAM</text>
      <text className="s-tb" x="292" y="66">1. Quem é? </text>
      <text className="s-t" x="292" y="86">Regras do dynamic group</text>
      <text className="s-m" x="292" y="104">instance.compartment.id</text>
      <text className="s-tb" x="292" y="140">2. Pode? </text>
      <text className="s-t" x="292" y="160">Policy do dynamic group</text>
      <text className="s-m" x="292" y="178">Allow dynamic-group AppServers</text>
      <text className="s-m" x="292" y="194">to read objects in ...</text>

      <rect className="s-comp" x="548" y="40" width="190" height="190" rx="8" />
      <text className="s-label" x="564" y="30">SERVIÇO</text>
      <rect className="s-policy" x="564" y="62" width="158" height="68" rx="6" />
      <text className="s-tb" x="580" y="88">Object Storage</text>
      <text className="s-m" x="580" y="108">bucket de dados</text>
      <text className="s-t" x="564" y="160">Recebe a chamada e só</text>
      <text className="s-t" x="564" y="180">responde se o IAM permitir.</text>

      <path className="s-line" d="M198 96 H274" markerEnd="url(#ip-arrow)" />
      <path className="s-line" d="M486 96 H546" markerEnd="url(#ip-arrow)" />
      <text className="s-cap-r" x="206" y="86">pede acesso</text>
      <text className="s-cap-b" x="496" y="86">permite</text>
    </svg>
  );
}
