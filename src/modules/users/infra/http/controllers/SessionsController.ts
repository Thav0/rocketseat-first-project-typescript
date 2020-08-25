import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionService from '@modules/users/services/CreateSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const autheticateUser = container.resolve(CreateSessionService);

    const { user, token } = await autheticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.send({ user, token });
  }
}
