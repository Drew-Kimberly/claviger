import {RepositoryDefinition} from '../types';
// eslint-disable-next-line node/no-unpublished-import
import * as Ajv from 'ajv';
import * as schema from '../../../schema/repository.schema.json';

export const validateRepositoryDefinition = async (
  repository: RepositoryDefinition
): Promise<Ajv.ErrorObject[]> => {
  const ajv = new Ajv();
  const result = ajv.validate(schema, repository);

  return result ? [] : (ajv.errors as Ajv.ErrorObject[]);
};
