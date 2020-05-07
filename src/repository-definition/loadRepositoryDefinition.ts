import {RepositoryDefinition} from './types';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

export const loadRepositoryDefinition = async (
  repositoryDefinitionPath: string
): Promise<RepositoryDefinition> => {
  return yaml.load(fs.readFileSync(repositoryDefinitionPath).toString());
};
