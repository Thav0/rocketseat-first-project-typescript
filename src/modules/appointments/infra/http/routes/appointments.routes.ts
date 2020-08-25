import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/typeorm/migrations/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();
//   return res.json(appointments);
// });

appointmentsRouter.post('/', async (req, res) => {
  return appointmentsController.create(req, res);
});

export default appointmentsRouter;
