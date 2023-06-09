import {execSync} from 'child_process';
import {waitForMs} from './helpers';

export default async function setup(): Promise<void> {
  execSync('docker-compose -f docker-compose.e2e.yml --env-file .env.test -p discovery_service_e2e_test up -d');
  await waitForMs(2000);
  execSync('npm run seed');
  await waitForMs(2000);
}
