import { ErrorHandler } from '@src/shared/utils/error-handlers/ErrorHandler';
import { Request, Response } from 'express';
import { ICountProductsUseCase, IUpdateProductsUseCase } from './protocols';

export default class ProductController {
  constructor(
    private countProductsUseCase: ICountProductsUseCase,
    private updateProductsUseCase: IUpdateProductsUseCase
  ) {}

  async index(req: Request, res: Response) {
    try {
      const products = await this.countProductsUseCase.execute(req.query);
      return res.json({ products, date: new Date().toLocaleDateString() });
    } catch (error) {
      if (error instanceof ErrorHandler) {
        console.error(error.showOnConsole());
        return error.messageToClient(res);
      }
      console.error(error);
      return res.status(500).json({ error: 'server error' });
    }
  }

  async updateAlfabetaProducts(req: Request, res: Response) {
    try {
      this.updateProductsUseCase.execute();
      return res.json({ message: 'Actualizador de precios iniciado' });
    } catch (error) {
      if (error instanceof ErrorHandler) {
        console.error(error.showOnConsole());
        return error.messageToClient(res);
      }
      console.error(error);
      return res.status(500).json({ error: 'server error' });
    }
  }
}
