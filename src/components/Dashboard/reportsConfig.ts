import { ReportFilter, ReportType } from '../Report/ReportBuilder';
import { InvoicesService } from '../../services/invoices/InvoicesService';
import { InvoicesDataHelper } from './Invoices/dataHelper';
import { ProductCategoryService } from '../../services/productCategories/ProductCategoryService';
import { ProductCategoriesRevenuesDataHelper } from './CategoriesRevenues/dataHelper';
import { CustomersService } from '../../services/customers/CustomersService';
import { CustomerDataHelper } from './Customers/dataHelper';

export const reportsConfig = [
  {
    tab: {
      label: 'Invoices',
      tabUrl: '/dashboard/invoices',
    },
    title: 'Monthly Cumulative Invoices Revenues',
    type: ReportType.Line,
    getData: InvoicesService.getInvoices,
    filters: [ReportFilter.Period, ReportFilter.ValueType],
    transformData: InvoicesDataHelper.transformDataToCumulative,
  },
  {
    tab: {
      label: 'Categories Revenues',
      tabUrl: '/dashboard/categories-revenues',
    },
    title: 'Total Revenues Per Products Categories',
    type: ReportType.Bar,
    getData: ProductCategoryService.getProductCategoriesRevenues,
    filters: [ReportFilter.ValueType],
    transformData: ProductCategoriesRevenuesDataHelper.transformData,
  },
  {
    tab: {
      label: 'Best Customers',
      tabUrl: '/dashboard/customers',
    },
    title: 'Our Best Customers',
    type: ReportType.Table as ReportType.Table,
    getData: CustomersService.getCustomersRevenues,
    filters: [ReportFilter.ValueType],
    transformData: CustomerDataHelper.transformData,
  },
  {
    tab: {
      label: 'Latest Invoices',
      tabUrl: '/dashboard/latest-invoices',
    },
    title: 'Latest Invoices',
    type: ReportType.Table as ReportType.Table,
    getData: InvoicesService.getInvoices,
    filters: [ReportFilter.ValueType],
    transformData: InvoicesDataHelper.transformDataToLatest,
  },
];
