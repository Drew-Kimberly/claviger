// eslint-disable-next-line node/no-unpublished-import
import * as Ajv from 'ajv';
import {UpkeepRepository} from './interfaces';
import * as schema from '../../schema/repository.schema.json';

export const validateRepositoryName = (repositoryPath: string): boolean => {
  return repositoryPath.match(/.+\.repository\.yml/) !== null;
};

export const validateRepositoryConfig = async (
  repository: UpkeepRepository
): Promise<Ajv.ErrorObject[]> => {
  const ajv = new Ajv();
  const result = ajv.validate(schema, repository);

  return result ? [] : (ajv.errors as Ajv.ErrorObject[]);
};
