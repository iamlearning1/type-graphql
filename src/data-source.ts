import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'test.sqlite',
  entities: ['src/entity/*.*'],
  synchronize: true,
  logging: true,
});

(async () => {
  try {
    await AppDataSource.initialize();
  } catch {
    console.error('Database not initialized');
  }
})();
