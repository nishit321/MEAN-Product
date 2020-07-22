export interface IWrite<T> {
  create(item: T): Promise<T>;
  findByIdAndDelete(id: string): Promise<T>;
  findByIdAndUpdate(id: string, record: T, option: string): Promise<T>;
  insertUnique(id: string, record: any): Promise<T>;
}
