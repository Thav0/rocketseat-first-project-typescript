import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { day, month, year } = req.body;

    const createAppointment = container.resolve(
      ListProviderAppointmentsService,
    );
    const appointments = await createAppointment.execute({
      provider_id,
      day,
      month,
      year,
    });

    return res.json(appointments);
  }
}
