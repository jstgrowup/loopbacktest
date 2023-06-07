import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ProductMaster} from '../models';
import {ProductMasterRepository} from '../repositories';

export class ProductMasterController {
  constructor(
    @repository(ProductMasterRepository)
    public productMasterRepository : ProductMasterRepository,
  ) {}

  @post('/product-masters')
  @response(200, {
    description: 'ProductMaster model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductMaster)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductMaster, {
            title: 'NewProductMaster',
            exclude: ['id'],
          }),
        },
      },
    })
    productMaster: Omit<ProductMaster, 'id'>,
  ): Promise<ProductMaster> {
    return this.productMasterRepository.create(productMaster);
  }

  @get('/product-masters/count')
  @response(200, {
    description: 'ProductMaster model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductMaster) where?: Where<ProductMaster>,
  ): Promise<Count> {
    return this.productMasterRepository.count(where);
  }

  @get('/product-masters')
  @response(200, {
    description: 'Array of ProductMaster model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductMaster, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductMaster) filter?: Filter<ProductMaster>,
  ): Promise<ProductMaster[]> {
    return this.productMasterRepository.find(filter);
  }

  @patch('/product-masters')
  @response(200, {
    description: 'ProductMaster PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductMaster, {partial: true}),
        },
      },
    })
    productMaster: ProductMaster,
    @param.where(ProductMaster) where?: Where<ProductMaster>,
  ): Promise<Count> {
    return this.productMasterRepository.updateAll(productMaster, where);
  }

  @get('/product-masters/{id}')
  @response(200, {
    description: 'ProductMaster model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductMaster, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProductMaster, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductMaster>
  ): Promise<ProductMaster> {
    return this.productMasterRepository.findById(id, filter);
  }

  @patch('/product-masters/{id}')
  @response(204, {
    description: 'ProductMaster PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductMaster, {partial: true}),
        },
      },
    })
    productMaster: ProductMaster,
  ): Promise<void> {
    await this.productMasterRepository.updateById(id, productMaster);
  }

  @put('/product-masters/{id}')
  @response(204, {
    description: 'ProductMaster PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productMaster: ProductMaster,
  ): Promise<void> {
    await this.productMasterRepository.replaceById(id, productMaster);
  }

  @del('/product-masters/{id}')
  @response(204, {
    description: 'ProductMaster DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productMasterRepository.deleteById(id);
  }
}
