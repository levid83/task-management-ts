import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
  app.set('trust proxy', 1);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.origin });
  }

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
}
bootstrap();
