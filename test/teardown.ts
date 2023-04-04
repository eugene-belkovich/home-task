import {execSync} from 'child_process';
import {waitForMs} from './helpers';

export default async function teardown(): Promise<void> {
  await waitForMs(3000);
  execSync('docker-compose -f docker-compose.e2e.yml --env-file .env.test -p discovery_service_e2e_test rm -f -s -v');
  await waitForMs(3000);
}
