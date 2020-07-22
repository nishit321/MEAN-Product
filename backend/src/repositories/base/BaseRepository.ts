// we imported all types from mongodb driver, to use in code
import { Collection } from 'mongodb';

import { IRead } from '../interfaces/IRead';
// import all interfaces
import { IWrite } from '../interfaces/IWrite';

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly _collection: Collection;
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  async create(item: T): Promise<T> {
    const user = new this.model(item);
    const newUserResponse = await user.save();
    return newUserResponse;
  }

  find(item: string): Promise<T[]> {
    return this.model.find(JSON.parse(item)).exec();
  }

  findOne(item: string): Promise<T> {
    return this.model.findOne(JSON.parse(item)).exec();
  }

  findByIdAndDelete(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).exec();
  }

  findById(id: string): Promise<T> {
    return this.model.findById(id).exec();
  }

  findByIdAndUpdate(id: string, user: T, option: string = null): Promise<T> {
    return this.model.findByIdAndUpdate(id, user, JSON.parse(option)).exec();
  }

  insertUnique(id: any, condition: any, option: string = null): Promise<T> {
    return this.model
      .findOneAndUpdate(id, condition, JSON.parse(option))
      .exec();
  }
}
