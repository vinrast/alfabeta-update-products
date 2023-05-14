import { createServer, Server } from 'http';
import express, { Express } from 'express';

import { APP_CONFIG } from '../config';
import { bodyParser, cors, urlEncoded } from './middlewares';
import { productRouter } from '@src/product/product.router';

export default class App {
  private port: number;
  private application: Express;
  private baseUrl: string;
  private server: Server;

  constructor() {
    this.port = APP_CONFIG.APP_PORT;
    this.baseUrl = '/api';
    this.application = express();
    this.server = createServer(this.application);
    this.beforeMiddlewares();
    this.routes();
    this.afterMiddlewares();
    this.jobs();
    this.services();
  }

  beforeMiddlewares() {
    this.application.use(bodyParser);
    this.application.use(cors);
    this.application.use(urlEncoded);
  }

  afterMiddlewares() {}

  routes() {
    this.application.get('/', (req, res) => {
      res.json({
        message: 'Actualizador de productos de Alfabeta ' + new Date(),
      });
    });
    this.application.use(`${this.baseUrl}/products`, productRouter);
  }

  jobs() {}

  services() {}

  create() {
    this.server.listen(this.port, () =>
      console.log(
        `SERVIDOR  DISPONIBLE PARA PETICIONES EN LA PUERTA: ${this.port}`
      )
    );
  }
}
