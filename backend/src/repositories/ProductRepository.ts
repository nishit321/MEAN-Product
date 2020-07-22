import { IProduct } from '../interface/Products.interface';
import { BaseRepository } from './base/BaseRepository';

export class ProductRepository<T> extends BaseRepository<IProduct> {
  getProducts(item: string): Promise<T[]> {
    return this.model
      .find(JSON.parse(item))
      .populate("category")
      .populate("userId")
      .exec();
  }

  getProductById(id: string): Promise<T> {
    return this.model
      .findById(id)
      .populate("category")
      .populate("userId")
      .exec();
  }
}
