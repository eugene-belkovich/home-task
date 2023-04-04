import {Module} from '@nestjs/common';
import {HealthCheckModule} from './modules/health-check/health-check.module';
import {BuildModule} from './modules/build/build.module';
import {ConfigModule} from './modules/config/config.module';
import {DiscoveryModule} from './modules/discovery/discovery.module';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigService} from './modules/config/config.service';

const configService = ConfigService.getDefaultInstance();

@Module({
  imports: [
    ConfigModule,
    BuildModule,
    HealthCheckModule,
    DiscoveryModule,
    MongooseModule.forRoot(configService.get('MONGODB_URI') ?? 'mongodb://mongodb:27017/discovery'), // for compose
    // MongooseModule.forRoot('mongodb://localhost:27017/discovery'), // todo works for local only. fix it
  ],
})
export class AppModule {}
