import { ProviderProductInputFieldsConfig } from '@prisma/client';

export type ProviderProductConfigCreate = Pick<
  ProviderProductInputFieldsConfig,
  'quantity'
>;
