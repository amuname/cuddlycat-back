import { ProviderProduct } from '@prisma/client';

export type ProviderProductCreate = Pick<
  ProviderProduct,
  'name' | 'description' | 'price' | 'type'
>;
