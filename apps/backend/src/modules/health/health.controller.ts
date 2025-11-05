
import { Controller, Get } from '@nestjs/common';
import { register } from 'prom-client';
@Controller()
export class HealthController {
  @Get('healthz') health() { return { status: 'ok', time: new Date().toISOString() }; }
  @Get('metrics') async metrics() { return await register.metrics(); }
}
