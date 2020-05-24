import { Router } from 'express';

import CreateSessionService from '../modules/users/services/CreateSessionService';

import AppError from '../shared/errors/AppError';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const autheticateUser = new CreateSessionService();

  const { user, token } = await autheticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return res.send({ user, token });
});

export default sessionsRouter;
