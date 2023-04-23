import express from 'express';
import { productControllerFactory } from './factories';

const productController = productControllerFactory();
const productRouter = express.Router({ mergeParams: true });

productRouter.get('', (req, res) => productController.index(req, res));
productRouter.get('/update-alfabeta-products', (req, res) =>
  productController.updateAlfabetaProducts(req, res)
);

export { productRouter };
