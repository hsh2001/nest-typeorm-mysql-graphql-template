import { Connection } from 'typeorm';

export function mockTypeORMConnection() {
  return {
    provide: Connection,
    useValue: {},
  };
}
