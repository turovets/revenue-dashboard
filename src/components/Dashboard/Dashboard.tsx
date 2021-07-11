import { useMemo } from 'react';

import './Dashboard.scss';
import ReportBuilder from '../Report/ReportBuilder';
import { useRouteTabs } from '../../lib/hooks/useRouteTabs';
import { reportsConfig } from './reportsConfig';

const Dashboard = () => {
  const tabConfig = useMemo(() => reportsConfig.map(({ tab, ...reportConfigItem }) => ({
    ...tab,
    // TODO: investigate why ts show type error
    TabComponent: () => <ReportBuilder config={reportConfigItem as any} />,
  })), [reportsConfig])

  const { tabs, reactRoutes } = useRouteTabs(tabConfig);

  return (
    <div>
      <h3 className="Dashboard-title">Company Revenues Dashboard</h3>
      <div>
        {tabs}
        <div>
          {reactRoutes}
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
