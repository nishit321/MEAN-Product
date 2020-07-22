import ProductController from '../../../src/controller/Product.Controller';

const product = (router: any) => {
  const productController = new ProductController();
  const path = "/product";

  /* Get Product private route */
  router.get(path, productController.getProducts);

  /* Store Product private route */
  router.post(path, productController.addProduct);

  /* Get Product By Id private route */
  router.get(`${path}/:id`, productController.getProductById);

  /* Delete Product By Id private route */
  router.delete(`${path}/:id`, productController.deleteProduct);

  /* Update Product By Id private route */
  router.put(path, productController.updateProduct);
};
export default product;
