import {ValidationPipe, Logger} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ConfigModule} from './modules/config/config.module';
import {ConfigService} from './modules/config/config.service';
import {DiscoveryApplication} from './modules/application/discovery.application';

import {AppModule} from './app.module';
import {version} from '../package.json';

const logger = new Logger();

async function bootstrap() {
  const app = await DiscoveryApplication.create(AppModule);

  const configService = app.select(ConfigModule).get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle('Discovery service')
    .setDescription('Discovery service API')
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe({transform: true}));

  const port = configService.get('PORT');

  try {
    await app.listen(port);

    logger.log(`Service is up on ${port} port, version: ${version}`);
  } catch (e) {
    logger.error('Failed to up the service', e);
  }
}

bootstrap();
