import { useMemo } from 'react';
import Invoices from './Invoices';

import { useRouteTabs } from '../../lib/hooks/useRouteTabs';

const TabBuilder = () => {
  const routes = useMemo(() => [
    {
      label: 'Invoices',
      TabComponent: Invoices,
      tabUrl: '/dashboard/invoices',
    },
    {
      label: 'Categories Revenue',
      TabComponent: () => <div>CategoriesRevenue</div>,
      tabUrl: '/dashboard/categories-revenue',
    },
  ], []);
  const { tabs, reactRoutes } = useRouteTabs(routes);

  return (
    <div>
      {tabs}
      <div>
        {reactRoutes}
      </div>
    </div>
  )
}

export default TabBuilder;
