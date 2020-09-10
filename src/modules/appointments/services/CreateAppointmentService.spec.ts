import AppError from '@shared/errors/AppError';
import CreateAppointmentServices from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentServices;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentServices(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create an Appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '11111',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('11111');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 8, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '11111',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '11111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
