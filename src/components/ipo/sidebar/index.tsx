import { MarketStats } from './market-stats';
import { MarketInsights } from './market-insights';
import { CommunityActivity } from './community-activity';
import { WatchlistSection } from './watchlist';

export { MarketStats } from './market-stats';
export { MarketInsights } from './market-insights';
export { CommunityActivity } from './community-activity';
export { WatchlistSection } from './watchlist';

export function Sidebar() {
  return (
    <div className="space-y-6">
      <MarketStats />
      <WatchlistSection />
      <MarketInsights />
      <CommunityActivity />
    </div>
  );
}
