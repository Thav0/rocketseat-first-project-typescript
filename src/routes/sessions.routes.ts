import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const autheticateUser = new CreateSessionService();

    const { user, token } = await autheticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return res.send({ user, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
