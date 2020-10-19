import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appoiment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    const cachedKey = `provider-appointments:${provider_id}-${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cachedKey,
    );

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          provider_id,
          year,
          month,
          day,
        },
      );

      console.log('buscou');

      await this.cacheProvider.save(cachedKey, appointments);
    }

    return appointments;
  }
}

export default ListProviderAppointmentsService;
