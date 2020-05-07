import {Maybe} from '../util';
import {IRepository} from './types';
import {getRepositoryDefinitionByPath} from '../repository-definition';
import {createRepository} from './createRepository';

export const getRepositoryByPath = async (
  definitionPath: string
): Promise<Maybe<IRepository>> => {
  const definition = await getRepositoryDefinitionByPath(definitionPath);
  return definition ? createRepository(definition) : undefined;
};
