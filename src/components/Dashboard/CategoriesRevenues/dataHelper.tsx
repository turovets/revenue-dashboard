import { ReportSelectedFilter } from '../../Report/ReportBuilder';
import { TProductCategoriesRevenues } from '../../../services/productCategories/ProductCategoryService';
import { ValueType } from '../types';
import { BarChartProps } from '../../shared/charts/BarChart/BarChart';

export const ProductCategoriesRevenuesDataHelper = {
  transformData: (data: TProductCategoriesRevenues[], filters: ReportSelectedFilter): BarChartProps => {
    return data.reduce<{x: string[], y: number[]}>((acc, curr) => {
      acc.x.push(curr.category_name);
      acc.y.push(filters.valueType === ValueType.Revenues ? curr.total_revenue : curr.total_margin);
      return acc;
    }, { x: [], y: [] })
  },
}
