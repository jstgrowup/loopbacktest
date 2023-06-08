import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {ProductList, ProductMasterRelations} from '../models';

export class ProductListRepository extends DefaultCrudRepository<
  ProductList,
  typeof ProductList.prototype.id,
  ProductMasterRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(ProductList, dataSource);
  }
}
