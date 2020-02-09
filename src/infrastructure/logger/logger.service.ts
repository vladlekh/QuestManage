import { Injectable } from '@nestjs/common';
import { IParserReply } from '../../interfaces';
import { Port } from '../serialport/port';

@Injectable()
export class LoggerService {
  private bracelets: Map<string, number>;
  private static CARD_NO_PREFIX: string = 'cardNo:';

  constructor() {
    this.bracelets = new Map<string, number>();
// BIG BRACELETS
    this.bracelets.set('38386245', 1);
    this.bracelets.set('198234245', 2);
    this.bracelets.set('24617429245', 3);
    this.bracelets.set('2512314033', 4);
    this.bracelets.set('718318759', 5);
    this.bracelets.set('623737245', 6);

// SMALL BRACELETS
    this.bracelets.set('150133192244', 1);
    this.bracelets.set('19879131245', 2);
    this.bracelets.set('246101141245', 3);
    this.bracelets.set('134173215244', 4);
    this.bracelets.set('38185116244', 5);
    this.bracelets.set('1981338245', 6);
  }

  logArduinoCommand(port: Port, command: string) {
    console.log(`Команда от администратора на Arduino ${port.path}: ${command}`);
  }

  logArduinoMessage({ message, path}: IParserReply) {
    console.log(`Ответ ARDUINO ${path}: ${message}`);
    if (message.startsWith(LoggerService.CARD_NO_PREFIX)) {
      this.logCardNumber(message.slice(LoggerService.CARD_NO_PREFIX.length), path);
    }
  }

  private logCardNumber(message: string, path: string) {
    if (this.bracelets.has(message)) {
      const playerNumber = this.bracelets.get(message);
      console.log(`${path}: Игрок ${playerNumber} приложил браслет (${message})`);
    }
  }
}
