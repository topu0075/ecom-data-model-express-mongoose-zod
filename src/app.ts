import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { OrderRoutes } from './app/modules/orders/order.route';
import { ProductRoutes } from './app/modules/products/products.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
