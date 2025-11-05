
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger } from './shared/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersService } from './modules/auth/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });
  const config = new DocumentBuilder()
    .setTitle('Teddy Tech Manager API')
    .setVersion('0.2.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
  await app.listen(process.env.PORT || 3000);
  console.log('Backend started on', process.env.PORT || 3000);

  // seed user
  try {
    const users = app.get(UsersService);
    const exists = await users.findByEmail('admin@teddy.com');
    if (!exists) {
      await users.create('admin@teddy.com', 'password');
      console.log('Seeded admin@teddy.com');
    }
  } catch(e) {
    console.warn('Seeding skipped', e);
  }
}
bootstrap();
