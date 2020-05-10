import {RepositoryDefinition} from './types';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as util from 'util';
import {Maybe} from '../util';

const readFile = util.promisify(fs.readFile);

export const loadRepositoryDefinition = async (
  repositoryDefinitionPath: string
): Promise<Maybe<RepositoryDefinition>> => {
  const file = await readFile(repositoryDefinitionPath);
  return await yaml.load(file.toString());
};
