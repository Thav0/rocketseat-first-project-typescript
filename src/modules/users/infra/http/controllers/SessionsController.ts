import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import { classToClass } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const autheticateUser = container.resolve(CreateSessionService);

    const { user, token } = await autheticateUser.execute({
      email,
      password,
    });

    return response.send({ user: classToClass(user), token });
  }
}
