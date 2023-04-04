import {Module} from '@nestjs/common';
import {HealthCheckModule} from './modules/health-check/health-check.module';
import {BuildModule} from './modules/build/build.module';
import {ConfigModule} from './modules/config/config.module';

@Module({
  imports: [ConfigModule, BuildModule, HealthCheckModule],
})
export class AppModule {}
