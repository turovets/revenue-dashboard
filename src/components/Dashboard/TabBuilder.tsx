import { useMemo } from 'react';
import Invoices from './Invoices';

import { useRouteTabs } from '../../lib/hooks/useRouteTabs';
import CategoriesRevenue from './CategoriesRevenues';

const TabBuilder = () => {
  const routes = useMemo(() => [
    {
      label: 'Invoices',
      TabComponent: Invoices,
      tabUrl: '/dashboard/invoices',
    },
    {
      label: 'Categories Revenue',
      TabComponent: CategoriesRevenue,
      tabUrl: '/dashboard/categories-revenues',
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
