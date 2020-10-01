import { container } from 'tsyringe';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import IStorageProvider from './models/IStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  diskStorage: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>('StorageProvider', providers.s3);
