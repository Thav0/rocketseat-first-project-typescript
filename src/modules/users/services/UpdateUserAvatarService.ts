import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../../../config/upload';
import User from '../entities/User';

import AppError from '../../../shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepo = getRepository(User);

    const user = await usersRepo.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users is allowed', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepo.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
