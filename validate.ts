import * as path from 'path';
import {
  validateRepositoryName,
  validateRepositoryDefinition,
} from './src/repository-definition/validation';
import {getRepositoryDefinitions} from './src/repository-definition';
import {RepositoryDefinition} from './src/repository-definition';

(async () => {
  const repositories = await getRepositoryDefinitions(
    path.join(__dirname, 'repositories')
  );

  const validations = repositories.map((repo: RepositoryDefinition) => {
    return new Promise((resolve, reject) => {
      if (!validateRepositoryName(repo.repositoryDefinitionPath)) {
        return reject(
          new Error(
            `Invalid repository path ${repo.repositoryDefinitionPath}! Repository config files should be of the form /path/to/upkeep/repositories/custom/path/{{repoId}}.repository.yml`
          )
        );
      }

      validateRepositoryDefinition(repo).then(errors => {
        if (errors.length > 0) {
          errors.forEach(error => console.error('Validation error:', error));
          return reject(
            new Error(
              `Repository ${repo.id} found at path ${repo.repositoryDefinitionPath} failed Upkeep Repository schema validation.`
            )
          );
        }

        return resolve();
      });
    });
  });

  try {
    await Promise.all(validations);
  } catch (e) {
    console.error(e);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }

  console.log('Validation passed!');
})();
