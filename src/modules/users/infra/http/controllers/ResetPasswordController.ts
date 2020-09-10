import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    try {
      const resetPassword = container.resolve(ResetPasswordService);

      await resetPassword.execute({
        password,
        token,
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    return response.status(204).json();
  }
}
