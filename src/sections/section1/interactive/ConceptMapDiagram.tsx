/**
 * Mapa do tenancy: o identity domain Default (autenticação) à esquerda,
 * uma policy no meio e os compartimentos (autorização) à direita.
 */
export function ConceptMapDiagram() {
  return (
    <svg
      viewBox="0 0 760 340"
      role="img"
      aria-label="Mapa do tenancy: o identity domain Default com usuários, grupos e dynamic groups à esquerda, uma policy no meio apontando para o compartimento Prod à direita."
    >
      <defs>
        <marker id="concept-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0L10 5L0 10z" className="s-arrow" />
        </marker>
      </defs>

      <rect className="s-outer" x="4" y="4" width="752" height="332" rx="10" />
      <text className="s-label" x="20" y="27">TENANCY · COMPARTIMENTO RAIZ</text>

      {/* identity domain */}
      <rect className="s-dom" x="24" y="40" width="300" height="270" rx="8" />
      <text className="s-tb" x="40" y="66">Identity domain · Default</text>
      <rect className="s-chip-d" x="40" y="80" width="268" height="34" rx="5" />
      <text className="s-t" x="54" y="102">Usuários</text>
      <rect className="s-chip-d" x="40" y="122" width="268" height="34" rx="5" />
      <text className="s-t" x="54" y="144">Grupos</text>
      <rect className="s-chip-d" x="40" y="164" width="268" height="34" rx="5" />
      <text className="s-t" x="54" y="186">Dynamic groups (instâncias como principal)</text>
      <rect className="s-chip-d" x="40" y="206" width="268" height="34" rx="5" />
      <text className="s-t" x="54" y="228">Sign-on policies e MFA</text>
      <rect className="s-chip-d" x="40" y="248" width="268" height="34" rx="5" />
      <text className="s-t" x="54" y="270">Federação com IdP externo</text>
      <text className="s-cap-b" x="40" y="300">AUTENTICAÇÃO</text>

      {/* policy */}
      <rect className="s-policy" x="338" y="100" width="86" height="104" rx="6" />
      <text className="s-tb" x="381" y="124" textAnchor="middle">Policy</text>
      <text className="s-m" x="381" y="148" textAnchor="middle">Allow group</text>
      <text className="s-m" x="381" y="164" textAnchor="middle">to manage</text>
      <text className="s-m" x="381" y="180" textAnchor="middle">in Prod</text>
      <path className="s-line" d="M308 139 H336" markerEnd="url(#concept-arrow)" />
      <path className="s-line" d="M308 181 H336" markerEnd="url(#concept-arrow)" />
      <path className="s-line" d="M424 139 H452" markerEnd="url(#concept-arrow)" />

      {/* compartimentos */}
      <rect className="s-comp" x="436" y="40" width="300" height="270" rx="8" />
      <text className="s-tb" x="452" y="66">Compartimentos</text>
      <rect className="s-prod" x="452" y="80" width="268" height="84" rx="6" />
      <text className="s-tb" x="468" y="102">Prod</text>
      <rect className="s-chip-r" x="468" y="116" width="66" height="30" rx="4" />
      <text className="s-t" x="478" y="136">VCN</text>
      <rect className="s-chip-r" x="542" y="116" width="84" height="30" rx="4" />
      <text className="s-t" x="552" y="136">Compute</text>
      <rect className="s-chip-r" x="634" y="116" width="72" height="30" rx="4" />
      <text className="s-t" x="644" y="136">Banco</text>
      <rect className="s-dev" x="452" y="178" width="268" height="84" rx="6" />
      <text className="s-tb" x="468" y="200">Dev</text>
      <rect className="s-chip-r" x="468" y="214" width="84" height="30" rx="4" />
      <text className="s-t" x="478" y="234">Compute</text>
      <rect className="s-chip-r" x="560" y="214" width="124" height="30" rx="4" />
      <text className="s-t" x="570" y="234">Object Storage</text>
      <text className="s-cap-r" x="452" y="300">AUTORIZAÇÃO</text>
    </svg>
  );
}
