import * as path from 'path';
import {validateRepositoryDefinition} from './src/repository-definition/validation';
import {
  createRepositoryDefinitionLoader,
  FailedLoadHandler,
} from './src/repository-loader';
import {createYamlSource} from './src/repository-loader/sources';
import {loggerFactory} from './src/logger';

(async () => {
  const logger = loggerFactory.createLogger();

  const onFailedLoad: FailedLoadHandler = (source, e) =>
    logger.error(`An error occurred loading from source ${source.id()}`, e);

  const repositoryLoader = createRepositoryDefinitionLoader(
    [createYamlSource(path.join(__dirname, 'repositories'))],
    onFailedLoad
  );

  repositoryLoader.subscribe(async definition => {
    const validationResults = await validateRepositoryDefinition(definition);

    if (validationResults.length > 0) {
      validationResults.forEach(error =>
        logger.error('Validation error:', error)
      );
      throw new Error(
        `Repository ${definition.id} failed Claviger Repository schema validation.`
      );
    }
  });
})();
