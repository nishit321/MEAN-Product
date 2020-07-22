import {
  model,
  Schema,
} from 'mongoose';

import { IProduct } from '../interface/Products.interface';

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: "categories" }],
    image: { type: String, required: false },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    netPrice: { type: Number, required: true },
    description: { type: String, required: false },
    userId: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

const ProductModel = model<IProduct>("products", ProductSchema);
export default ProductModel;
