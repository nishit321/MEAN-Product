import { Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  discount: number;
  netPrice: number;
  description: string;
  userId: string;
}
