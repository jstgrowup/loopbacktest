import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductMaster extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<ProductMaster>) {
    super(data);
  }
}

export interface ProductMasterRelations {
  // describe navigational properties here
}

export type ProductMasterWithRelations = ProductMaster & ProductMasterRelations;
