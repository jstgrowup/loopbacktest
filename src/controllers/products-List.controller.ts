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
import {ProductList} from '../models';
import {ProductListRepository} from '../repositories';

export class ProductListController {
  constructor(
    @repository(ProductListRepository)
    public productMasterRepository: ProductListRepository,
  ) {}

  @post('/product-list')
  @response(200, {
    description: 'ProductMaster model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductList)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductList, {
            title: 'NewProductMaster',
            exclude: ['id'],
          }),
        },
      },
    })
    productMaster: Omit<ProductList, 'id'>,
  ): Promise<ProductList> {
    return this.productMasterRepository.create(productMaster);
  }

  @get('/product-list/count')
  @response(200, {
    description: 'ProductMaster model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductList) where?: Where<ProductList>,
  ): Promise<Count> {
    return this.productMasterRepository.count(where);
  }

  @get('/product-list')
  @response(200, {
    description: 'Array of ProductMaster model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductList, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductList) filter?: Filter<ProductList>,
  ): Promise<ProductList[]> {
    return this.productMasterRepository.find(filter);
  }

  @patch('/product-list')
  @response(200, {
    description: 'ProductMaster PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductList, {partial: true}),
        },
      },
    })
    ProductList: ProductList,
    @param.where(ProductList) where?: Where<ProductList>,
  ): Promise<Count> {
    return this.productMasterRepository.updateAll(ProductList, where);
  }

  @get('/product-list/{id}')
  @response(200, {
    description: 'ProductList model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductList, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProductList, {exclude: 'where'})
    filter?: FilterExcludingWhere<ProductList>,
  ): Promise<ProductList> {
    return this.productMasterRepository.findById(id, filter);
  }

  @patch('/product-list/{id}')
  @response(204, {
    description: 'ProductMaster PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductList, {partial: true}),
        },
      },
    })
    ProductList: ProductList,
  ): Promise<void> {
    await this.productMasterRepository.updateById(id, ProductList);
  }

  @put('/product-list/{id}')
  @response(204, {
    description: 'ProductMaster PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productList: ProductList,
  ): Promise<void> {
    await this.productMasterRepository.replaceById(id, productList);
  }

  @del('/product-list/{id}')
  @response(204, {
    description: 'ProductMaster DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productMasterRepository.deleteById(id);
  }
}
