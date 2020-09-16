import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/typeorm/migrations/middlewares/ensureAuthenticated';

import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', async (req, res) => {
  return providersController.index(req, res);
});

export default providersRouter;
