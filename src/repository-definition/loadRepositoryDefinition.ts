import {RepositoryDefinition} from './types';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import {Maybe} from '../util';

export const loadRepositoryDefinition = async (
  repositoryDefinitionPath: string
): Promise<Maybe<RepositoryDefinition>> => {
  return yaml.load(fs.readFileSync(repositoryDefinitionPath).toString());
};
