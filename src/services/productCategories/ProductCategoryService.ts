import { callApi } from '../../utils/api';

export type TProductCategoriesRevenues = {
  category_name: string;
  total_revenue: number;
  total_margin: number;
}

export class ProductCategoryService {
  protected static readonly endpoints = {
    revenues: '/api/categories/revenues',
  };

  static async getProductCategoriesRevenues(): Promise<TProductCategoriesRevenues[]> {
    return await callApi('GET', ProductCategoryService.endpoints.revenues)
  }
}