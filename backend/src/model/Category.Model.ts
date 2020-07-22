import {
  model,
  Schema,
} from 'mongoose';

import { ICategory } from '../interface/Category.interface';

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const CategoryModel = model<ICategory>("categories", CategorySchema);
export default CategoryModel;
