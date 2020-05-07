import {RepositoryDefinition} from './types';
import * as glob from 'glob';
import {getRepositoryDefinitionByPath} from './getRepositoryDefinitionByPath';

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

      resolve(Promise.all(matches.map(getRepositoryDefinitionByPath)));
    });
  });
};
