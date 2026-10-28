/** Mapa de uma VCN com subnet pública, subnet privada e os quatro gateways. */
export function VcnTopologyDiagram() {
  return (
    <svg
      viewBox="0 0 760 364"
      role="img"
      aria-label="VCN 10.0.0.0/16 com uma subnet pública e uma privada. A internet chega à subnet pública pelo internet gateway. A subnet privada sai para a internet pelo NAT gateway, só de saída, chega ao Oracle Services Network pelo service gateway e à rede on-premises pelo DRG."
    >
      <defs>
        <marker id="vcn-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0L10 5L0 10z" className="s-arrow" />
        </marker>
      </defs>
      <rect className="s-outer" x="4" y="4" width="752" height="356" rx="10" />

      <rect className="s-comp" x="16" y="34" width="120" height="66" rx="8" />
      <text className="s-tb" x="30" y="62">Internet</text>
      <text className="s-t" x="30" y="84">clientes</text>

      <rect className="s-comp" x="16" y="252" width="120" height="66" rx="8" />
      <text className="s-tb" x="30" y="278">On-premises</text>
      <text className="s-t" x="30" y="300">VPN / FastConnect</text>

      <rect className="s-comp" x="624" y="34" width="120" height="66" rx="8" />
      <text className="s-tb" x="636" y="58">Oracle Services</text>
      <text className="s-tb" x="636" y="76">Network</text>
      <text className="s-t" x="636" y="94" style={{ fontSize: 11 }}>Object Storage...</text>

      <rect className="s-dom" x="176" y="16" width="420" height="332" rx="10" />
      <text className="s-label" x="192" y="12">VCN 10.0.0.0/16 · REGIONAL</text>

      <rect className="s-policy" x="248" y="50" width="276" height="104" rx="8" />
      <text className="s-tb" x="264" y="76">Subnet pública 10.0.1.0/24</text>
      <text className="s-t" x="264" y="100">Load balancer, bastion</text>
      <text className="s-m" x="264" y="124">IP público permitido</text>
      <text className="s-m" x="264" y="140">rota 0.0.0.0/0 → IGW</text>

      <rect className="s-prod" x="248" y="196" width="276" height="120" rx="8" />
      <text className="s-tb" x="264" y="222">Subnet privada 10.0.2.0/24</text>
      <text className="s-t" x="264" y="246">Aplicação, banco de dados</text>
      <text className="s-m" x="264" y="270">sem IP público</text>
      <text className="s-m" x="264" y="286">0.0.0.0/0 → NAT · OSN → SGW</text>
      <text className="s-m" x="264" y="302">192.168.0.0/16 → DRG</text>

      <rect className="s-chip-d" x="190" y="78" width="48" height="26" rx="5" />
      <text className="s-m" x="199" y="95">IGW</text>
      <rect className="s-chip-d" x="190" y="226" width="48" height="26" rx="5" />
      <text className="s-m" x="198" y="243">NAT</text>
      <rect className="s-chip-d" x="190" y="276" width="48" height="26" rx="5" />
      <text className="s-m" x="198" y="293">DRG</text>
      <rect className="s-chip-d" x="534" y="226" width="48" height="26" rx="5" />
      <text className="s-m" x="542" y="243">SGW</text>

      <path className="s-line" d="M136 91 H188" markerEnd="url(#vcn-arrow)" />
      <path className="s-line" d="M238 91 H246" />
      <path className="s-line" d="M246 239 H240" />
      <path className="s-line" strokeDasharray="5 4" d="M190 239 H76 V102" markerEnd="url(#vcn-arrow)" />
      <path className="s-line" d="M246 289 H240" />
      <path className="s-line" d="M190 289 H138" markerEnd="url(#vcn-arrow)" />
      <path className="s-line" d="M524 239 H532" />
      <path className="s-line" d="M582 239 H684 V102" markerEnd="url(#vcn-arrow)" />

      <text className="s-cap-r" x="142" y="82">entra e sai</text>
      <text className="s-cap-b" x="84" y="190" style={{ writingMode: 'horizontal-tb' }}>só sai</text>
    </svg>
  );
}
