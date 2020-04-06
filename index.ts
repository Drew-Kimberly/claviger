import * as path from 'path';
import {getUpkeepRepositories} from './src/repository';

getUpkeepRepositories(path.join(__dirname, 'repositories')).then(configs =>
  console.log(configs)
);

export * from './src';
