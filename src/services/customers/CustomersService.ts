import { callApi } from '../../utils/api';

export type CustomerRevenue = {
  customer_id: number;
  customer_name: string;
  total_revenue: number;
  total_margin: number;
  invoices_count: number
}

export class CustomersService {
  protected static readonly endpoints = {
    customersRevenues: '/api/customers/revenues',
  };

  static async getCustomersRevenues(): Promise<CustomerRevenue[]> {
    return await callApi('GET', CustomersService.endpoints.customersRevenues)
  }
}
