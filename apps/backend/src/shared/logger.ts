
import pino from 'pino';
import { LoggerService } from '@nestjs/common';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
});

export class Logger implements LoggerService {
  log(message: any) { logger.info({ msg: message }); }
  error(message: any, trace?: string) { logger.error({ msg: message, trace }); }
  warn(message: any) { logger.warn({ msg: message }); }
  debug(message: any) { logger.debug({ msg: message }); }
  verbose(message: any) { logger.debug({ msg: message }); }
}

export default logger;