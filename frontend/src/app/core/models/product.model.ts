import { UserRegistration } from "./userregistration.model";
import { Category } from "./category.model";

export class Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  image: string;
  price: number;
  discount: number;
  netPrice: number;
  userId: UserRegistration;
}
