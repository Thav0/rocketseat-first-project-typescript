import { startOfHour } from 'date-fns';
import Appointment from '../models/Appoiment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * [x]Recebimento das informações
 * [/]Tratar os erros/excessões
 * []Acesso ao reposítório
 */

interface Request {
  date: Date;
  provider: string;
}

/**
 * Dependency Inversion
 */

class CreateAppointmentServices {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    // regra de negocio
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
      // return res.status(400).json({ error: 'Please choose another date' });
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentServices;
