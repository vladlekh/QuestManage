import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as dot from 'dot-object';

@Injectable()
export class PortConfigService {
  private readonly config: { [key: string]: object };

  constructor(path) {
    this.config = JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));
  }

  get(option?: string) {
    return option ? dot.pick(option, this.config) : this.config;
  }
}
