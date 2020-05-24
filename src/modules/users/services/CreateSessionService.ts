import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../../../shared/errors/AppError';

import authConfig from '../../../config/auth';

import User from '../entities/User';

interface Request {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ user: User; token: string }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError("Password and Email doesn't match!", 401);
    }

    // user.password senha criptografada
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Password and Email doesn't match!", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
