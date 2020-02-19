import { Injectable } from '@nestjs/common';
import { IParserReply } from '../../interfaces';
import { Port } from '../serialport/port';
import { LoggerGateway } from './logger.gateway';

@Injectable()
export class LoggerService {
  private bracelets: Map<string, number>;
  private static CARD_NO_PREFIX: string = 'cardNo:';
  private static LOG_PREFIX: string = 'log:';
  private static PAD_PREFIX: string = 'PAD:';

  constructor(private readonly loggerGateway: LoggerGateway) {
    this.bracelets = new Map<string, number>();
// BIG BRACELETS
    this.bracelets.set('38386245', 1);
    this.bracelets.set('623737245', 2);
    this.bracelets.set('24617429245', 3);
    this.bracelets.set('2512314033', 4);
    this.bracelets.set('718318759', 5);
    this.bracelets.set('198234245', 6);

// SMALL BRACELETS
    this.bracelets.set('1981338245', 1);
    this.bracelets.set('134173215244', 2);
    this.bracelets.set('246101141245', 3);
    this.bracelets.set('150133192244', 4);
    this.bracelets.set('19879131245', 5);
    this.bracelets.set('38185116244', 6);
  }

  logArduinoCommand(port: Port, command: string) {
    const message = `Команда от администратора: ${command}`;
    console.log(`${port.path}: ${message}`);
    this.loggerGateway.emit(message, port.path);
  }

  logArduinoMessage({ message, path}: IParserReply) {
    if (message.startsWith(LoggerService.CARD_NO_PREFIX)) {
      this.logCardNumber(message.slice(LoggerService.CARD_NO_PREFIX.length), path);
      return;
    }
    if (message.startsWith(LoggerService.PAD_PREFIX)) {
      this.logPadReply(message.slice(LoggerService.PAD_PREFIX.length), path);
      return;
    }
    if (message.startsWith(LoggerService.LOG_PREFIX)) {
      this.logArduinoReply(message.slice(LoggerService.LOG_PREFIX.length), path);
      return;
    }
    console.log(`${path}: ${message}`);
    this.loggerGateway.emit(message, path);
  }

  private logPadReply(message: string, path: string) {
    const log = `Игроки ввели на клавиатуре: ${message}`;
    console.log(`${path}: ${log}`);
    this.loggerGateway.emit(log, path);
  }

  private logArduinoReply(message: string, path: string) {
    const log = message;
    console.log(`${path}: ${log}`);
    this.loggerGateway.emit(log, path);
  }

  private logCardNumber(message: string, path: string) {
    if (this.bracelets.has(message)) {
      const playerNumber = this.bracelets.get(message);
      const log = `Игрок ${playerNumber} приложил браслет (${message})`;
      console.log(`${path}: ${log}`);
      this.loggerGateway.emit(log, path);
    }
  }
}
