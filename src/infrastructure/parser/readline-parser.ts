import * as SerialPort from 'serialport';
import Readline = SerialPort.parsers.Readline;
import { IParserOptions } from '../../interfaces';
import { Parser } from '../../enums';
import { IReadlineParser } from './readline-parser.interface';

export class ReadlineParser extends Readline implements IReadlineParser {
    constructor({path, ...options}: IParserOptions) {
        super({...options});
        this.on('data', (data) => this.emit(Parser.reply, { message: data, path }));
    }
}