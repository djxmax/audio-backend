import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { createRouteHandler } from "uploadthing/express";
import { ourFileRouter } from "./uploadthing/uploadthing";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;

  // Intégration de Uploadthing pour les routes d'upload
  app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: ourFileRouter,
  }),
);

  await app.listen(port,'0.0.0.0');
}
bootstrap();
