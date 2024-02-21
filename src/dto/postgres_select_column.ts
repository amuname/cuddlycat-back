// import { ProviderCompanyAndProductTypeArray } from './provider_company_and_product_type_array';

export interface PostgresSelectColumn {
  column_name: string;
  is_nullable: 'NO' | 'YES';
  data_type: string | string[];
}
