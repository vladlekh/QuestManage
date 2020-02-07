import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as dot from 'dot-object';
import { IConfig, IPort } from '../../interfaces';
import { reduce } from 'lodash';

@Injectable()
export class PortConfigService {
  private readonly config: { [key: string]: object };

  constructor(path) {
    this.config = JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));
  }

  getPortsList(): IPort[] {
    const config = this.get();
    return reduce(config, (acc, value, key) => {
      return [...acc, ...value.ports.map(({ path, name }) => ({ path, name }))];
    }, []);
  }
  get(): IConfig;
  get<T>(option: string = ''): Partial<T> {
    return option ? dot.pick(option, this.config) : this.config;
  }
}
