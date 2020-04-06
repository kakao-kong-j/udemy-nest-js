import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 54321,
  username: 'sampleuser',
  password: 'samplesecret',
  database: 'sampledb',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
