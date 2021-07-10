import { callApi } from '../../utils/api';

type InvoiceLine = {
  product_id: number;
  product_name: string;
  unit_price: number;
  quantity: number;
  total_line: number;
  total_margin: number;
}
export type Invoice = {
  id: number;
  customer_id: number;
  customer_name: string;
  date: string;
  total_invoice: number;
  total_margin: number;
  region: string;
  invoice_lines: InvoiceLine[];
}

export class InvoicesService {
  protected static readonly endpoints = {
    invoices: '/api/invoices',
  };

  static async getInvoices(): Promise<Invoice[]> {
    return await callApi('GET', InvoicesService.endpoints.invoices)
  }
}
