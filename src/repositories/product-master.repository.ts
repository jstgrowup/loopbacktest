import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {ProductMaster, ProductMasterRelations} from '../models';

export class ProductMasterRepository extends DefaultCrudRepository<
  ProductMaster,
  typeof ProductMaster.prototype.id,
  ProductMasterRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(ProductMaster, dataSource);
  }
}
