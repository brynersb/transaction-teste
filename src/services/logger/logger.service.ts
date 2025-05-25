import { Injectable, Logger } from '@nestjs/common';
import { LoggerServiceInterface } from './logger.interface';

@Injectable()
export class LoggerService implements LoggerServiceInterface {
  private readonly logger: Logger = new Logger(LoggerService.name);

  log(message: string): void {
    this.logger.log(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }
}
