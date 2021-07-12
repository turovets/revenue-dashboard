# Revenue Dashboards

Author: `VARVARA TURAVETS`

Email: `variaturovets@gmail.com`

## Task
We want you to create a single page with a filters box and a page content. The filters box will contain inputs and
selectors to interact with the data shown in the page content.

## Notes
1.  In the documentation there is a requirement to use Period Selector for Revenue Bar Chart to display total revenues
per products categories. Unfortunately api server doesn’t provide such information (there is only category name and 
revenue/margin and no any data based information) so only Value type Selector was applied for that type of chart. 
2. List of the latest invoices by date. Unfortunately it was not clear for me if we need to display just 15 latest
invoices or provide opportunity to display latest reports by some data. So I implemented both tables.

## Solution
The task is about creation a single page application with a filters and a page content with reports (charts and tables). 
I decided to put each report on a separate tab, so that it would be possible to load data separately for each tab.
This will allow to display of the initial information to the user much faster and avoid downloading unnecessary
information if the user does want to open any other report. Also it improves the user experience because allows user to
concentrate their attention on specific information.

There are 2 possible solutions. The first is to implement each report as a separate independent component. And the
second one is to create one general component with configuration that will handle it and build report based on provided
config. Each solution has its own pros and cons.

1. Independent components:
- Ability to customize the report more flexibly;
- Simpler logic;
- More code duplication;
- Require more time for adding new report.

2. One general component with configuration:
- Less duplicate code;
- Quickly add a new report;
- The ability to provide the user in the future to create new reports on their own and save their configuration on the server.

I have implemented both solutions. The first is in the `main` branch and the second can be find in the `feature/builder` branch.

## Improvements
I have several ideas for improvements that would be great to implement in the feature (and were not implemented because
of time limits).
1. `Refactoring` - Refactor some folder structure with in variables name, and simplify logic.
1. `Test coverage` - Add more tests. Did not paid a lot of attention to this, to save time.
1. `Caching mechanism` - To avoid extra requests to the server.
1. `Report builder` - Provide ability to user build their own reports. Users can select the data source, report type, key columns, filters.
This could be done based on the second approach with component configuration.
1. `Logger` - Add logger that you can switch on/off during configuration. This logger can show the amount of time we need to display component/page.