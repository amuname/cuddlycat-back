import { Injectable, OnModuleInit } from '@nestjs/common';
import { PostgresSelectColumn } from '../dto/postgres_select_column';
import { PrismaService } from '../prisma/prisma.service';
// import { ProviderCompanyType } from '@prisma/client';
// import { ProviderCompanyAndProductTypeArray } from '../dto/provider_company_and_product_type_array';
// import { UserNoHash } from '../../dto/user_no_hash';
// import { ProviderCompanyType } from '@prisma/client';

const USER_DEFINED_POSTGRES_PRODUCT_DATA_TYPE = 'USER-DEFINED';

@Injectable()
export class AdminService implements OnModuleInit {
  providerCompanyAndProductTypeArray: string[];

  constructor(private prismaService: PrismaService) {}

  async onModuleInit() {
    this.providerCompanyAndProductTypeArray =
      await this.getTProductAndCompanyTypes();
  }

  async getCompanyFields(): Promise<PostgresSelectColumn[]> {
    const res = (await this.prismaService
      .$queryRaw`SELECT column_name, is_nullable, data_type
      FROM information_schema.columns
      WHERE table_schema = 'cuddly_cat'
      AND table_name   = 'ProviderCompany'
    ;`) as PostgresSelectColumn[];

    // console.log(res);
    this.patchUserDefinedDataType(res);
    return res;
  }

  async getProductFields() {
    const res = (await this.prismaService
      .$queryRaw`SELECT column_name, is_nullable, data_type
      FROM information_schema.columns
      WHERE table_schema = 'cuddly_cat'
      AND table_name   = 'ProviderProduct'
    ;`) as PostgresSelectColumn[];

    // console.log(res);
    this.patchUserDefinedDataType(res);
    return res;
  }

  async getProductQuestionFields() {
    const res = await this.prismaService
      .$queryRaw`SELECT column_name, is_nullable, data_type
      FROM information_schema.columns
      WHERE table_schema = 'cuddly_cat'
      AND table_name   = 'ProviderProductInputFieldsConfig'
    ;`;

    // console.log(res);
    return res as PostgresSelectColumn[];
  }

  async getTProductAndCompanyTypes() {
    return (
      (await this.prismaService.$queryRaw`
      SELECT enumlabel
      FROM pg_enum
      WHERE enumtypid=(SELECT typelem
                       FROM pg_type
                       WHERE typname='_ProviderCompanyType' AND
                       typnamespace=(SELECT oid
                                     FROM pg_namespace
                                     WHERE nspname='cuddly_cat'))
                                     `) as {
        enumlabel: string;
      }[]
    ).map((e) => e.enumlabel);
  }

  async patchUserDefinedDataType(columns: PostgresSelectColumn[]) {
    columns.forEach(
      (e) =>
        e.data_type === USER_DEFINED_POSTGRES_PRODUCT_DATA_TYPE &&
        (e.data_type = this.providerCompanyAndProductTypeArray),
    );
  }

  async generateAdminHTMLPage() {
    const company_db_data = await this.getCompanyFields();
    await this.patchUserDefinedDataType(company_db_data);

    console.log(company_db_data);
    return company_db_data;
    // const company_html = company_db_data.map(
    //   (e) =>
    //     `<p>Введи ${e.column_name}</p><input type="${e.data_type}" required=${
    //       e.is_nullable === 'YES' ? false : true
    //     }/>`,
    // );

    // return (
    //   `<html>
    // <head>
    // </head>
    // <body>

    // <select>
    //    <option value="company" selected>company</option>
    //   <option value="product">product</option>
    // </select>
    // <button id="pickSelect">pick</button>

    // <div id="company" style="display: none">
    // <h3>Companies</h3>`.concat(company_html.join()) +
    //   `</div>
    // <div id="product" style="display: none">
    // <h3>Products</h3>
    // </div>

    // <script>
    //   const select = document.getElementsByTagName('select')[0]
    //     const button = document.getElementById('pickSelect')

    //     const company = document.getElementById('company')
    //     const product = document.getElementById('product')

    //     const tabs = [company, product]

    //     button.addEventListener('click', (e) => {
    //         tabs.forEach( e => e.id === select.value ? e.style.display = 'block' : e.style.display = 'none' )
    //     })

    // </script>
    // </body>`
    // );
  }
}
