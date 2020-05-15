import * as yaml from 'js-yaml';
import * as util from 'util';
import * as fs from 'fs';
import {RepositoryDefinition} from '../../../repository-definition';

const readFileAsync = util.promisify(fs.readFile);

export const getRepositoryDefinition = async (
  path: string
): Promise<RepositoryDefinition> => {
  const fileContents = await readFileAsync(path);
  return (await yaml.load(fileContents.toString())) as RepositoryDefinition;
};
