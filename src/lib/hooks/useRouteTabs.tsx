import React, { useMemo } from 'react';
import { Link, LinkProps, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab, { TabProps } from '@material-ui/core/Tab';

type Config = {
  label: string;
  TabComponent: React.ComponentType<any>;
  tabUrl: string;
  disabled?: boolean;
  hidden?: boolean;
  customRoutes?: string[];
}[];

export const useRouteTabs = (config: Config): { reactRoutes: React.ReactElement, tabs: React.ReactElement } => {
  const location = useLocation();
  const { path } = useRouteMatch();

  const tabsItems = useMemo(() => config.map((configItem) =>
    configItem.hidden
      ? null
      : <Tab
        key={configItem.label}
        {...{component: Link, to: configItem.tabUrl} as TabProps & LinkProps}
        label={configItem.label}
        value={configItem.tabUrl}
        disabled={configItem.disabled}
      />
  ), [config]);

  const activeTabValue = useMemo(() => {
    const matchRoutes = config.filter((i) => location.pathname.startsWith(i.tabUrl) && !i.hidden);
    return matchRoutes[0]?.tabUrl;
  }, [config, location.pathname]);

  const tabs = (
    <Tabs value={activeTabValue ?? config[0]?.tabUrl} variant="scrollable" scrollButtons="on">
      {tabsItems}
    </Tabs>
  );
  const reactRoutesItems = useMemo(() => config.map(({
    label, tabUrl, customRoutes,
    TabComponent, hidden,
  }) => (
      hidden
        ? null
        : <Route
            exact
            key={label}
            path={customRoutes ?? tabUrl}
            component={TabComponent}
        />
    )),
    [config]
  );
  const reactRoutes = (
    <Switch>
      {reactRoutesItems}
      <Route path={path} render={()=> <div>No Page Found</div>} />
    </Switch>
  );

  return {
    reactRoutes,
    tabs,
  };
};
