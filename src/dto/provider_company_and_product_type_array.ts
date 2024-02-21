import { ProviderCompanyType } from '@prisma/client';

export type ProviderCompanyAndProductTypeArray = [
  Exclude<ProviderCompanyType, 'Bonus'>,
  Exclude<ProviderCompanyType, 'Product'>,
];
