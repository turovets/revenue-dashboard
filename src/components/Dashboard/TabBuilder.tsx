import { useMemo } from 'react';

import { useRouteTabs } from '../../lib/hooks/useRouteTabs';
import CategoriesRevenue from './CategoriesRevenues';
import Invoices from './Invoices';
import Customers from './Customers';

const TabBuilder = () => {
  const routes = useMemo(() => [
    {
      label: 'Invoices',
      TabComponent: Invoices,
      tabUrl: '/dashboard/invoices',
    },
    {
      label: 'Categories Revenues',
      TabComponent: CategoriesRevenue,
      tabUrl: '/dashboard/categories-revenues',
    },
    {
      label: 'Best Customers',
      TabComponent: Customers,
      tabUrl: '/dashboard/customers',
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
