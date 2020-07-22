export interface IRead<T> {
  find(item: string): Promise<T[]>;
  findOne(item: string): Promise<T>;
  findById(id: string): Promise<T>;
}
