import 'reflect-metadata';
import { format, getHours, isBefore, startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appoiment';

import AppError from '@shared/errors/AppError';

/**
 * Dependency Inversion
 */

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  date: Date;
  provider_id: string;
  user_id: string;
}

@injectable()
class CreateAppointmentServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    // regra de negocio
    const appointmentDate = startOfHour(date);

    // Se a data do agendamento for inferior a agora apresentar erro
    if (isBefore(appointmentDate, Date.now()))
      throw new AppError("You can't create an appointment on a past date");

    if (user_id === provider_id)
      throw new AppError("You can't create an appointment with yourself");

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new AppError(
        'You can only create apoointments between 8am and 5pm',
      );

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmentServices;
