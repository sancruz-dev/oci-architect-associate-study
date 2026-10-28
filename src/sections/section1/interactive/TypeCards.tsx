import { Box } from '../../../components/ui/Box';
import { TYPE_CARDS, TYPE_NAMES } from '../data/domainTypes';

/** Um cartão por tipo de identity domain: para quem serve e como cobra. */
export function TypeCards() {
  return (
    <div className="types">
      {TYPE_CARDS.map((card, i) => (
        <Box key={TYPE_NAMES[i]} title={TYPE_NAMES[i]}>
          <span className="types__who">{card.who}</span>
          <p className="mb0">{card.description}</p>
          <span className="types__bill">{card.billing}</span>
        </Box>
      ))}
    </div>
  );
}
