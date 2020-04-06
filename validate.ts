import * as path from 'path';
import {
  validateRepositoryName,
  validateRepositoryConfig,
} from './src/repository/validation';
import {getUpkeepRepositories} from './src/repository';
import {UpkeepRepository} from './src/repository';

(async () => {
  const repositories = await getUpkeepRepositories(
    path.join(__dirname, 'repositories')
  );

  const validations = repositories.map((repo: UpkeepRepository) => {
    return new Promise((resolve, reject) => {
      if (!validateRepositoryName(repo.repositoryConfigPath)) {
        return reject(
          new Error(
            `Invalid repository path ${repo.repositoryConfigPath}! Repository config files should be of the form /path/to/upkeep/repositories/custom/path/{{repoId}}.repository.yml`
          )
        );
      }

      validateRepositoryConfig(repo).then(errors => {
        if (errors.length > 0) {
          errors.forEach(error => console.error('Validation error:', error));
          return reject(
            new Error(
              `Repository ${repo.id} found at path ${repo.repositoryConfigPath} failed Upkeep Repository schema validation.`
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
