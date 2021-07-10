import { useMemo } from 'react';

import { useRouteTabs } from '../../lib/hooks/useRouteTabs';

const TabBuilder = () => {
  const routes = useMemo(() => [
    {
      label: 'Invoices',
      TabComponent: () => <div>Invoices</div>,
      tabUrl: '/dashboard/invoices',
    },
    {
      label: 'Categories Revenue',
      TabComponent: () => <div>CategoriesRevenue</div>,
      tabUrl: '/dashboard/categories-revenue',
    },
    {
      label: 'Tab3',
      TabComponent: () => <div>component 3</div>,
      tabUrl: '/dashboard/tab3',
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
