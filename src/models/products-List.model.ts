import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductList extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: 'string',
  })
  brand?: string;
  @property({
    type: 'string',
  })
  imgLink?: string;
  @property({
    type: 'number',
  })
  maxPrice?: number;
  @property({
    type: 'number',
    minimum:0
  })
  minPrice?: number;
  @property({
    type: 'string',
  })
  model?: string;
  @property({
    type: 'string',
  })
  ram?: string;
  @property({
    type: 'string',
  })
  rom?: string;

  constructor(data?: Partial<ProductList>) {
    super(data);
  }
}

export interface ProductMasterRelations {
  // describe navigational properties here
}

export type ProductMasterWithRelations = ProductList & ProductMasterRelations;
