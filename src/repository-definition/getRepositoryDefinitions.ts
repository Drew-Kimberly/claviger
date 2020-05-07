import {RepositoryDefinition} from './types';
import * as glob from 'glob';
import {getRepositoryDefinitionByPath} from './getRepositoryDefinitionByPath';
import {isDefined} from '../util';

export const getRepositoryDefinitions = (
  path: string
): Promise<RepositoryDefinition[]> => {
  return new Promise((resolve, reject) => {
    glob(path + '/**/*.yml', (err, matches) => {
      if (err) {
        console.error(
          'An error occurred while loading repository configs',
          err
        );
        reject(err);
      }

      const definitions =
        Promise.all(
          matches.map(getRepositoryDefinitionByPath).filter(isDefined)
        ) as Promise<RepositoryDefinition[]>;

      resolve(definitions);
    });
  });
};
