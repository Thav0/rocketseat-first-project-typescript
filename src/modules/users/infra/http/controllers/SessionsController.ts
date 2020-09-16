import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import AppError from '@shared/errors/AppError';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const autheticateUser = container.resolve(CreateSessionService);

    try {
      const { user, token } = await autheticateUser.execute({
        email,
        password,
      });

      delete user.password;
    } catch (error) {
      throw new AppError(error.message);
    }

    return response.send({ user, token });
  }
}
